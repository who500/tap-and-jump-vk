// PlatformBridge — Universal Multi-Platform Monetization & SDK Bridge
// Supports: Yandex Games, VK Play / VK Bridge, CrazyGames, and Local/Standalone Mock

class PlatformBridge {
    constructor() {
        this.platform = 'mock'; // 'yandex' | 'vk' | 'crazygames' | 'mock'
        this.ysdk = null;
        this.player = null;
        this.vkBridge = null;
        this.crazySdk = null;
        this.isGameplayActive = false;
        this.isLoadingReadySent = false;

        // Smart Interstitial Pacing variables
        this.lastInterstitialTime = Date.now();
        this.flightsSinceLastAd = 0;
        this.minInterstitialIntervalMs = 75000; // 75 seconds minimum between interstitials
        this.flightsBetweenAds = 3; // Every 3-4 flights
        this.isAdShowing = false;
        this.soundWasMuted = false;

        // Free scan cooldown tracking
        this.freeScanCooldownMs = 15 * 60 * 1000; // 15 minutes

        // In-App Payments & VIP Status
        this.payments = null;
        this.isVip = (typeof localStorage !== 'undefined' && localStorage.getItem('antigravity_vip_status') === 'true');

        this.init();
    }

    async init() {
        // 1. Detect Yandex Games
        if (typeof window.YaGames !== 'undefined') {
            try {
                this.ysdk = await window.YaGames.init();
                this.platform = 'yandex';
                console.log('[PlatformBridge] Yandex Games SDK initialized');

                // Initialize Player object for Cloud Saves
                try {
                    this.player = await this.ysdk.getPlayer({ scopes: false });
                    console.log('[PlatformBridge] Yandex Player initialized, mode:', this.player.getMode());
                } catch (pe) {
                    console.warn('[PlatformBridge] Yandex Player init notice (playing as guest):', pe);
                    this.player = null;
                }

                // Initialize In-App Payments (VIP status, Yan purchases)
                try {
                    this.payments = await this.ysdk.getPayments(); // signed: false (client-side only, no backend)
                    console.log('[PlatformBridge] Yandex Payments initialized');
                    await this.checkExistingPurchases();
                } catch (payErr) {
                    console.warn('[PlatformBridge] Yandex Payments init notice:', payErr);
                }

                // §2.14 — Auto-detect language from Yandex SDK environment
                try {
                    const sdkLang = this.ysdk.environment.i18n.lang;
                    if (sdkLang && typeof window.setLang === 'function') {
                        const normalizedLang = sdkLang.startsWith('ru') ? 'ru' : 'en';
                        window.setLang(normalizedLang);
                        console.log('[PlatformBridge] Language set from Yandex SDK:', normalizedLang);
                    }
                } catch (le) {
                    console.warn('[PlatformBridge] Language detection notice:', le);
                }

                // Notify Yandex LoadingAPI that engine has loaded
                this.notifyLoadingReady();
                return;
            } catch (e) {
                console.warn('[PlatformBridge] Yandex Games init failed, fallback:', e);
            }
        }

        // 2. Detect VK Play / VK Bridge
        if (typeof window.vkBridge !== 'undefined') {
            try {
                await window.vkBridge.send('VKWebAppInit');
                this.vkBridge = window.vkBridge;
                this.platform = 'vk';
                console.log('[PlatformBridge] VK Bridge initialized');
                return;
            } catch (e) {
                console.warn('[PlatformBridge] VK Bridge init failed, fallback:', e);
            }
        }

        // 3. Detect CrazyGames
        if (typeof window.CrazyGames !== 'undefined' && window.CrazyGames.SDK) {
            this.crazySdk = window.CrazyGames.SDK;
            this.platform = 'crazygames';
            console.log('[PlatformBridge] CrazyGames SDK initialized');
            return;
        }

        // 4. Default: Standalone / Localhost Mock
        this.platform = 'mock';
        console.log('[PlatformBridge] Standalone / Localhost mode with E-Ink Mock Ad player active');
    }

    // --- SMART INTERSTITIAL PACING ---

    recordFlightCompleted() {
        this.flightsSinceLastAd++;
    }

    canShowInterstitial() {
        if (this.isVip || (window.game && window.game.isVip)) return false;
        if (this.isAdShowing) return false;
        const timeSinceLastAd = Date.now() - this.lastInterstitialTime;
        return (timeSinceLastAd >= this.minInterstitialIntervalMs && this.flightsSinceLastAd >= this.flightsBetweenAds);
    }

    showInterstitial(onComplete = null) {
        if (this.isVip || (window.game && window.game.isVip)) {
            console.log('[PlatformBridge] Interstitial skipped: Player has VIP status');
            if (onComplete) onComplete();
            return;
        }

        if (this.isAdShowing) {
            if (onComplete) onComplete();
            return;
        }

        this.isAdShowing = true;
        this.pauseGameAudio();

        const finishAd = () => {
            this.isAdShowing = false;
            this.lastInterstitialTime = Date.now();
            this.flightsSinceLastAd = 0;
            this.resumeGameAudio();
            if (onComplete) onComplete();
        };

        if (this.platform === 'yandex' && this.ysdk && this.ysdk.adv) {
            this.ysdk.adv.showFullscreenAdv({
                callbacks: {
                    onClose: (wasShown) => finishAd(),
                    onError: (err) => finishAd()
                }
            });
        } else if (this.platform === 'vk' && this.vkBridge) {
            this.vkBridge.send('VKWebAppCheckNativeAds', { ad_format: 'interstitial' })
                .then((data) => {
                    if (data.result) {
                        this.vkBridge.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' })
                            .then(() => finishAd())
                            .catch(() => finishAd());
                    } else {
                        finishAd();
                    }
                })
                .catch(() => finishAd());
        } else if (this.platform === 'crazygames' && this.crazySdk && this.crazySdk.ad) {
            this.crazySdk.ad.requestAd('midgame', {
                adStarted: () => {},
                adFinished: () => finishAd(),
                adError: () => finishAd()
            });
        } else {
            // Standalone Mock Ad Player
            const title = (typeof window.t === 'function' ? window.t('interstitial_title') : 'INTERSTITIAL AD');
            this.showMockAdModal('interstitial', title, finishAd);
        }
    }

    // --- REWARDED VIDEO ADS ---

    showRewarded(placement = 'generic', onSuccess = null, onDismiss = null) {
        if (this.isAdShowing) {
            console.warn('[PlatformBridge] Previous ad state was stuck, auto-recovering...');
            if (this.mockInterval) clearInterval(this.mockInterval);
            this.mockInterval = null;
            const oldModal = document.getElementById('mock-ad-modal');
            if (oldModal) oldModal.classList.add('hidden');
            this.isAdShowing = false;
        }

        this.isAdShowing = true;
        this.pauseGameAudio();

        let rewardedEarned = false;

        const handleSuccess = () => {
            rewardedEarned = true;
            this.lastInterstitialTime = Date.now();
            this.flightsSinceLastAd = 0;
            if (onSuccess) onSuccess();
        };

        const handleClose = () => {
            this.isAdShowing = false;
            this.resumeGameAudio();
            if (!rewardedEarned && onDismiss) {
                onDismiss('closed_early');
            }
        };

        if (this.platform === 'yandex' && this.ysdk && this.ysdk.adv) {
            this.ysdk.adv.showRewardedVideo({
                callbacks: {
                    onOpen: () => {},
                    onRewarded: () => handleSuccess(),
                    onClose: () => handleClose(),
                    onError: (err) => {
                        console.warn('[PlatformBridge] Yandex Rewarded error or blocked:', err);
                        handleClose();
                    }
                }
            });
        } else if (this.platform === 'vk' && this.vkBridge) {
            this.vkBridge.send('VKWebAppCheckNativeAds', { ad_format: 'reward' })
                .then((data) => {
                    if (data.result) {
                        this.vkBridge.send('VKWebAppShowNativeAds', { ad_format: 'reward' })
                            .then((showData) => {
                                if (showData && showData.result) handleSuccess();
                                handleClose();
                            })
                            .catch((err) => {
                                console.warn('[PlatformBridge] VK Rewarded show error:', err);
                                handleClose();
                            });
                    } else {
                        console.log('[PlatformBridge] No VK rewarded ads available');
                        handleClose();
                    }
                })
                .catch((err) => {
                    console.warn('[PlatformBridge] VK Rewarded check error:', err);
                    handleClose();
                });
        } else if (this.platform === 'crazygames' && this.crazySdk && this.crazySdk.ad) {
            this.crazySdk.ad.requestAd('rewarded', {
                adStarted: () => {},
                adFinished: () => {
                    handleSuccess();
                    handleClose();
                },
                adError: () => {
                    handleSuccess();
                    handleClose();
                }
            });
        } else {
            // Standalone Mock Ad Player
            const rTitle = (typeof window.t === 'function' ? window.t('rewarded_title') : 'REWARDED AD');
            this.showMockAdModal('rewarded', `${rTitle} [${placement.toUpperCase()}]`, () => {
                handleSuccess();
                handleClose();
            });
        }
    }

    // --- E-INK MOCK AD SIMULATOR (FOR DEV & STANDALONE) ---

    showMockAdModal(type, title, onFinished) {
        const modal = document.getElementById('mock-ad-modal');
        const titleEl = document.getElementById('mock-ad-title');
        const timerEl = document.getElementById('mock-ad-timer');
        const barEl = document.getElementById('mock-ad-progress-fill');
        const btnSkip = document.getElementById('btn-mock-ad-skip');

        let isDone = false;
        const cleanup = () => {
            if (isDone) return;
            isDone = true;
            if (this.mockInterval) clearInterval(this.mockInterval);
            this.mockInterval = null;
            if (this.mockSafetyTimeout) clearTimeout(this.mockSafetyTimeout);
            this.mockSafetyTimeout = null;
            if (modal) modal.classList.add('hidden');
        };

        const complete = () => {
            cleanup();
            if (onFinished) onFinished();
        };

        if (!modal) {
            // Bulletproof fallback if DOM element is missing
            setTimeout(() => complete(), 100);
            return;
        }

        if (titleEl) titleEl.innerText = title;
        modal.classList.remove('hidden');

        let remainingSec = 3;
        if (timerEl) timerEl.innerText = `${remainingSec}s`;
        if (barEl) barEl.style.width = '0%';

        const duration = 2500;
        const startTime = performance.now();

        if (btnSkip) {
            btnSkip.onclick = (e) => {
                e.stopPropagation();
                complete();
            };
        }

        this.mockInterval = setInterval(() => {
            const elapsed = performance.now() - startTime;
            const progress = Math.min(1.0, elapsed / duration);

            if (barEl) barEl.style.width = `${progress * 100}%`;
            const currentRem = Math.max(0, Math.ceil((duration - elapsed) / 1000));
            if (timerEl) timerEl.innerText = `${currentRem}s`;

            if (elapsed >= duration) {
                complete();
            }
        }, 100);

        // Safety watchdog: complete after 3.2s even if setInterval is throttled
        this.mockSafetyTimeout = setTimeout(() => {
            complete();
        }, 3200);
    }

    // --- AUDIO SUSPEND / RESUME ---

    pauseGameAudio() {
        if (window.soundFX && window.soundFX.enabled) {
            this.soundWasMuted = false;
            if (window.soundFX.ctx && window.soundFX.ctx.state === 'running') {
                try { window.soundFX.ctx.suspend(); } catch(e) {}
            }
        } else {
            this.soundWasMuted = true;
        }
    }

    resumeGameAudio() {
        if (!this.soundWasMuted && window.soundFX && window.soundFX.enabled) {
            if (window.soundFX.ctx && window.soundFX.ctx.state === 'suspended') {
                try { window.soundFX.ctx.resume(); } catch(e) {}
            }
        }
    }

    // --- LIFECYCLE & GAMEPLAY APIS (YANDEX GAMES 2026) ---

    notifyLoadingReady() {
        if (this.isLoadingReadySent) return;
        if (this.platform === 'yandex' && this.ysdk && this.ysdk.features && this.ysdk.features.LoadingAPI) {
            try {
                this.ysdk.features.LoadingAPI.ready();
                this.isLoadingReadySent = true;
                console.log('[PlatformBridge] Yandex LoadingAPI.ready() transmitted');
            } catch (e) {
                console.warn('[PlatformBridge] LoadingAPI.ready() exception:', e);
            }
        }
    }

    startGameplay() {
        if (this.isGameplayActive) return;
        this.isGameplayActive = true;
        if (this.platform === 'yandex' && this.ysdk && this.ysdk.features && this.ysdk.features.GameplayAPI) {
            try {
                this.ysdk.features.GameplayAPI.start();
                console.log('[PlatformBridge] GameplayAPI.start()');
            } catch (e) {
                console.warn('[PlatformBridge] GameplayAPI.start() notice:', e);
            }
        }
    }

    stopGameplay() {
        if (!this.isGameplayActive) return;
        this.isGameplayActive = false;
        if (this.platform === 'yandex' && this.ysdk && this.ysdk.features && this.ysdk.features.GameplayAPI) {
            try {
                this.ysdk.features.GameplayAPI.stop();
                console.log('[PlatformBridge] GameplayAPI.stop()');
            } catch (e) {
                console.warn('[PlatformBridge] GameplayAPI.stop() notice:', e);
            }
        }
    }

    // --- CLOUD STORAGE SYNC (YANDEX PLAYER DATA) ---

    async saveCloudData(data) {
        if (this.platform === 'yandex' && this.player) {
            try {
                await this.player.setData(data, true);
                console.log('[PlatformBridge] Cloud save synchronized with Yandex server');
            } catch (e) {
                console.warn('[PlatformBridge] Cloud save error:', e);
            }
        }
    }

    async loadCloudData() {
        if (this.platform === 'yandex' && this.player) {
            try {
                const data = await this.player.getData();
                if (data && typeof data === 'object' && Object.keys(data).length > 0) {
                    console.log('[PlatformBridge] Cloud save loaded from Yandex server');
                    return data;
                }
            } catch (e) {
                console.warn('[PlatformBridge] Cloud load error:', e);
            }
        }
        return null;
    }

    // --- LEADERBOARDS & VIRAL HOOKS ---

    async submitLeaderboardScore(score, leaderboardName = 'highScore') {
        if (this.platform === 'yandex' && this.ysdk && this.ysdk.getLeaderboards) {
            try {
                const lb = await this.ysdk.getLeaderboards();
                await lb.setLeaderboardScore(leaderboardName, Math.floor(score));
                console.log(`[PlatformBridge] Submitted score ${score} to leaderboard [${leaderboardName}]`);
            } catch (e) {
                console.warn('[PlatformBridge] Leaderboard submission notice:', e);
            }
        }
    }

    async requestReview() {
        if (this.platform === 'yandex' && this.ysdk && this.ysdk.feedback) {
            try {
                const check = await this.ysdk.feedback.canReview();
                if (check && check.value) {
                    const res = await this.ysdk.feedback.requestReview();
                    console.log('[PlatformBridge] Review feedback status:', res);
                } else if (check) {
                    console.log('[PlatformBridge] Cannot review:', check.reason);
                }
            } catch (e) {
                console.warn('[PlatformBridge] Review dialog notice:', e);
            }
        }
    }

    async requestShortcut() {
        if (this.platform === 'yandex' && this.ysdk && this.ysdk.shortcut) {
            try {
                const check = await this.ysdk.shortcut.canShowPrompt();
                if (check && check.canShow) {
                    const res = await this.ysdk.shortcut.showPrompt();
                    console.log('[PlatformBridge] Shortcut prompt outcome:', res);
                }
            } catch (e) {
                console.warn('[PlatformBridge] Shortcut prompt notice:', e);
            }
        }
    }

    // --- IN-APP PURCHASES (YANDEX PAYMENTS & VIP STATUS) ---

    async checkExistingPurchases() {
        if (!this.payments) return false;
        try {
            const purchases = await this.payments.getPurchases();
            const hasVip = purchases && purchases.some(p => p.productID === 'vip_status');
            if (hasVip) {
                this.isVip = true;
                if (typeof localStorage !== 'undefined') localStorage.setItem('antigravity_vip_status', 'true');
                if (window.game && typeof window.game.applyVipStatus === 'function') {
                    window.game.applyVipStatus(true);
                }
            }
            return hasVip;
        } catch (err) {
            console.warn('[PlatformBridge] Purchases check notice:', err);
            return false;
        }
    }

    async purchaseVip(onSuccess = null, onError = null) {
        if (this.isVip) {
            if (onSuccess) onSuccess({ alreadyOwned: true });
            return;
        }

        if (this.platform === 'yandex' && this.payments) {
            try {
                const purchase = await this.payments.purchase({ id: 'vip_status' });
                if (purchase) {
                    this.isVip = true;
                    if (typeof localStorage !== 'undefined') localStorage.setItem('antigravity_vip_status', 'true');
                    if (window.game && typeof window.game.applyVipStatus === 'function') {
                        window.game.applyVipStatus(true);
                    }
                    if (onSuccess) onSuccess(purchase);
                }
            } catch (err) {
                console.warn('[PlatformBridge] Yandex purchase error or cancelled:', err);
                if (onError) onError(err);
            }
        } else {
            // Standalone / Localhost Mock Simulator
            this.showMockPaymentModal('VIP STATUS (99 YAN)', () => {
                this.isVip = true;
                if (typeof localStorage !== 'undefined') localStorage.setItem('antigravity_vip_status', 'true');
                if (window.game && typeof window.game.applyVipStatus === 'function') {
                    window.game.applyVipStatus(true);
                }
                if (onSuccess) onSuccess({ mock: true });
            }, () => {
                if (onError) onError('cancelled');
            });
        }
    }

    showMockPaymentModal(productTitle, onConfirmed, onCancelled) {
        let modal = document.getElementById('mock-payment-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'mock-payment-modal';
            modal.className = 'modal-overlay hidden';
            modal.innerHTML = `
                <div class="modal-content vip-confirm-content">
                    <div class="modal-header">
                        <div class="modal-title-group">
                            <span class="modal-code">YANDEX GAMES // IN-APP PAYMENTS</span>
                            <span class="modal-title">YANDEX PAY SIMULATOR</span>
                        </div>
                    </div>
                    <div class="modal-body" style="text-align:center; padding: 14px 4px; display: flex; flex-direction: column; gap: 12px; align-items: center;">
                        <div style="font-size: 32px;">👑</div>
                        <div style="font-size: 14px; font-weight: 800; color: var(--eink-dark);">PURCHASE ${productTitle}</div>
                        <div style="font-size: 11px; color: var(--eink-muted); max-width: 280px; line-height: 1.4;">
                            Unlock permanent No-Ads, Celestial Legendary Skin and ✖2 CRED bonus for 99 Yan.
                        </div>
                        <div style="display: flex; gap: 8px; width: 100%; max-width: 260px; margin-top: 6px;">
                            <button type="button" id="btn-mock-pay-confirm" class="btn-skin-action action-buy" style="flex: 1; padding: 8px 10px; font-size: 11px;">
                                PAY 99 YAN 💳
                            </button>
                            <button type="button" id="btn-mock-pay-cancel" class="btn-skin-action action-locked" style="flex: 1; padding: 8px 10px; font-size: 11px;">
                                CANCEL ✕
                            </button>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        modal.classList.remove('hidden');

        const btnConfirm = document.getElementById('btn-mock-pay-confirm');
        const btnCancel = document.getElementById('btn-mock-pay-cancel');

        const cleanup = () => {
            modal.classList.add('hidden');
            if (btnConfirm) btnConfirm.onclick = null;
            if (btnCancel) btnCancel.onclick = null;
        };

        if (btnConfirm) {
            btnConfirm.onclick = (e) => {
                e.stopPropagation();
                cleanup();
                if (onConfirmed) onConfirmed();
            };
        }
        if (btnCancel) {
            btnCancel.onclick = (e) => {
                e.stopPropagation();
                cleanup();
                if (onCancelled) onCancelled();
            };
        }
    }
}

window.platformBridge = new PlatformBridge();

// -------------------------------------------------------
// § 1.3 — Pause audio when user switches tab / minimizes
// § 1.6 — Disable browser context menu in the game area
// -------------------------------------------------------

// Pause audio on tab switch / window blur
document.addEventListener('visibilitychange', () => {
    if (!window.soundFX) return;
    if (document.hidden) {
        if (window.soundFX.ctx && window.soundFX.ctx.state === 'running') {
            try { window.soundFX.ctx.suspend(); } catch(e) {}
        }
    } else {
        if (window.soundFX.enabled && window.soundFX.ctx && window.soundFX.ctx.state === 'suspended') {
            try { window.soundFX.ctx.resume(); } catch(e) {}
        }
    }
});

window.addEventListener('blur', () => {
    if (window.soundFX && window.soundFX.ctx && window.soundFX.ctx.state === 'running') {
        try { window.soundFX.ctx.suspend(); } catch(e) {}
    }
});

window.addEventListener('focus', () => {
    if (window.soundFX && window.soundFX.enabled && window.soundFX.ctx && window.soundFX.ctx.state === 'suspended') {
        try { window.soundFX.ctx.resume(); } catch(e) {}
    }
});

// Disable right-click context menu in the game canvas area
document.addEventListener('contextmenu', (e) => {
    const gameArea = document.getElementById('game-canvas') || document.getElementById('desktop-wrapper');
    if (gameArea && gameArea.contains(e.target)) {
        e.preventDefault();
    }
});
