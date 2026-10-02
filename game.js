// Main Game Engine for TAP & JUMP (E-Ink Edition)

const t = (key, ...args) => (typeof window.t === 'function' ? window.t(key, ...args) : key);

class JumpGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');

        // State Machine: 'IDLE' | 'CHARGING' | 'LAUNCH' | 'FALL' | 'MONEY_RAIN'
        this.state = 'IDLE';

        // Base Economy & Progress
        this.money = 0;
        this.rubies = 1; // 1 starting crystal
        this.record = 0;
        this.rebirthCount = 0;
        this.rebirthCost = 8000;
        this.skin = 'ninja';
        this.unlockedSkins = ['ninja'];
        this.selectedSkinId = 'ninja';
        this.isVip = (window.platformBridge && window.platformBridge.isVip) || (localStorage.getItem('antigravity_vip_status') === 'true');
        if (this.isVip && !this.unlockedSkins.includes('celestial')) {
            this.unlockedSkins.push('celestial');
        }

        // Complete Pilot Skins & Suits Catalog (localized via t() at runtime)
        this.skinsCatalog = [
            {
                id: 'ninja',
                get name() { return t('skin_ninja_name'); },
                get title() { return t('skin_ninja_title'); },
                icon: '🥷',
                get desc() { return t('skin_ninja_desc'); },
                get perk() { return t('skin_ninja_perk'); },
                get unlockDesc() { return t('skin_ninja_unlock'); },
                condition: (game) => true
            },
            {
                id: 'zombie',
                get name() { return t('skin_zombie_name'); },
                get title() { return t('skin_zombie_title'); },
                icon: '🧟',
                get desc() { return t('skin_zombie_desc'); },
                get perk() { return t('skin_zombie_perk'); },
                get unlockDesc() { return t('skin_zombie_unlock'); },
                canBuyWithCrystals: 15,
                condition: (game) => game.rebirthCount >= 1
            },
            {
                id: 'cyborg',
                get name() { return t('skin_cyborg_name'); },
                get title() { return t('skin_cyborg_title'); },
                icon: '🤖',
                get desc() { return t('skin_cyborg_desc'); },
                get perk() { return t('skin_cyborg_perk'); },
                get unlockDesc() { return t('skin_cyborg_unlock'); },
                canBuyWithCrystals: 25,
                condition: (game) => game.rebirthCount >= 2 || game.record >= 25000
            },
            {
                id: 'astronaut',
                get name() { return t('skin_astro_name'); },
                get title() { return t('skin_astro_title'); },
                icon: '👨‍🚀',
                get desc() { return t('skin_astro_desc'); },
                get perk() { return t('skin_astro_perk'); },
                get unlockDesc() { return t('skin_astro_unlock'); },
                canBuyWithCrystals: 40,
                condition: (game) => game.record >= 100000
            },
            {
                id: 'phantom',
                get name() { return t('skin_phantom_name'); },
                get title() { return t('skin_phantom_title'); },
                icon: '⚡',
                get desc() { return t('skin_phantom_desc'); },
                get perk() { return t('skin_phantom_perk'); },
                get unlockDesc() { return t('skin_phantom_unlock'); },
                canBuyWithCrystals: 75,
                condition: (game) => game.rebirthCount >= 3 || game.record >= 500000
            },
            {
                id: 'aviator',
                get name() { return t('skin_aviator_name'); },
                get title() { return t('skin_aviator_title'); },
                icon: '🛩️',
                get desc() { return t('skin_aviator_desc'); },
                get perk() { return t('skin_aviator_perk'); },
                get unlockDesc() { return t('skin_aviator_unlock'); },
                canUnlockWithAd: true
            },
            {
                id: 'shaman',
                get name() { return t('skin_shaman_name'); },
                get title() { return t('skin_shaman_title'); },
                icon: '🔮',
                get desc() { return t('skin_shaman_desc'); },
                get perk() { return t('skin_shaman_perk'); },
                get unlockDesc() { return t('skin_shaman_unlock'); },
                canUnlockWithAd: true
            },
            {
                id: 'samurai',
                get name() { return t('skin_samurai_name'); },
                get title() { return t('skin_samurai_title'); },
                icon: '⚔️',
                get desc() { return t('skin_samurai_desc'); },
                get perk() { return t('skin_samurai_perk'); },
                get unlockDesc() { return t('skin_samurai_unlock'); },
                canBuyWithCrystals: 60,
                condition: (game) => game.record >= 1000000
            },
            {
                id: 'titan',
                get name() { return t('skin_titan_name'); },
                get title() { return t('skin_titan_title'); },
                icon: '🛡️',
                get desc() { return t('skin_titan_desc'); },
                get perk() { return t('skin_titan_perk'); },
                get unlockDesc() { return t('skin_titan_unlock'); },
                canBuyWithCrystals: 100,
                condition: (game) => game.rebirthCount >= 5 || game.record >= 5000000
            },
            {
                id: 'celestial',
                get name() { return t('skin_celestial_name'); },
                get title() { return t('skin_celestial_title'); },
                icon: '👑',
                get desc() { return t('skin_celestial_desc'); },
                get perk() { return t('skin_celestial_perk'); },
                get unlockDesc() { return t('skin_celestial_unlock'); },
                canUnlockWithAd: true
            }
        ];

        // Upgrades
        this.upgrades = {
            jumpPower: { level: 1, basePower: 6, cost: 400 },
            boostSpeed: { level: 1, duration: 2.8, multStep: 0.10, cost: 800 },
            aerodynamics: { level: 0, cost: 600, multStep: 0.08 },
            critTap: { level: 1, cost: 1200, chance: 0.08 }
        };

        // Lifetime Statistics & Records
        this.hallOfFame = [];
        this.stats = {
            totalDistance: 0,
            totalJumps: 0,
            maxMult: 1.0,
            totalPetsDiscovered: 1
        };

        // Drone Fusion State
        this.droneFusionBoosted = false;

        // In-Flight Mechanics & Rings
        this.rings = [];
        this.sonicBooms = [];
        this.passedSonicBooms = new Set();
        this.flightAsteroids = [];
        this.flightCrystal = null;
        this.flightAnomaly = null;
        this.flightAnomalyMult = 1.0;
        this.seenEncounterLandmarks = new Set();
        this.activeEncounter = null;
        this.exitingEncounter = null;

        // Pets / Companions (E-Ink Geometric Drones)
        this.pets = [
            { id: 'pet_init', name: t('pet_common_name'), icon: '⧁', level: 1, mult: 1.10, bonusEnergy: 2, rarity: t('pet_common_rarity'), rarityKey: 'common', desc: t('pet_common_desc'), equipped: true }
        ];
        this.selectedPetId = this.pets[0].id;
        this.careerMilestones = [];

        // Round/Charge Variables
        this.timerMax = 4.0;
        this.timerRemaining = 0;
        this.chargeMultiplier = 1.0;
        this.currentCharge = 10;
        this.clicksThisRound = 0;

        // Flight & Physics Variables
        this.altitude = 0;
        this.peakAltitude = 0;
        this.velocity = 0;
        this.gravity = 980; // pixels/sec^2
        this.metresPerPixel = 0.25;

        // Milestones passed this flight
        this.reachedMilestones = new Set();
        this.floatingTexts = [];

        // Particles & Modern Visual Effects
        this.lightnings = [];
        this.chargeParticles = [];
        this.fallingMoney = [];
        this.shockwaves = [];
        this.motionTrail = [];
        this.characterSquash = 1.0;
        this.screenShake = 0;

        // Monetization & Offline Income
        this.lastExitTimestamp = Date.now();
        this.lastFreeScanTimestamp = 0;
        this.isTurboBoosted = false;
        this.pendingOfflineCredits = 0;
        this.lastFlightReward = 0;
        this.hasClaimedDoubleForThisFlight = false;

        // Animation timing
        this.lastTime = performance.now();
        this.time = 0;

        // DOM elements
        this.initDOM();
        this.loadSave();
        this.isInitialized = true;
        this.updateHUD();
        window.game = this;
        this.setupEvents();
        this.resize();
        this.checkOfflineIncome();
        this.updateTurboUI();
        this.updateFreeScanUI();

        // Start render loop
        requestAnimationFrame(this.loop.bind(this));

        // WHO STUDIOS Splash Screen (1.5s loader)
        this.initSplashScreen();

        // Yandex Games 2026: Sync cloud progress
        if (window.platformBridge) {
            window.platformBridge.loadCloudData().then(cloudData => {
                if (cloudData && typeof cloudData === 'object') {
                    this.mergeCloudSave(cloudData);
                }
            }).catch(() => {});
        }
    }

    initSplashScreen() {
        const splash = document.getElementById('splash-screen');
        const bar = document.getElementById('splash-progress-bar');
        const status = document.getElementById('splash-status');
        const pctEl = document.getElementById('splash-pct');
        if (!splash) {
            if (window.platformBridge) window.platformBridge.notifyLoadingReady();
            return;
        }

        // Smooth progress fill over 1.2s
        requestAnimationFrame(() => {
            setTimeout(() => {
                if (bar) bar.style.width = '100%';
            }, 60);
        });

        // Numeric tick-up for E-Ink telemetry
        let pct = 0;
        const pctInterval = setInterval(() => {
            pct = Math.min(100, pct + 8);
            if (pctEl) pctEl.innerText = `${pct}%`;
            if (pct >= 100) clearInterval(pctInterval);
        }, 90);

        // 1.2s: Ready signal
        setTimeout(() => {
            if (status) status.innerText = t('splash_ready');
            if (pctEl) pctEl.innerText = '100%';
        }, 1200);

        // 1.5s: Fade out splash screen & notify Yandex LoadingAPI
        setTimeout(() => {
            clearInterval(pctInterval);
            splash.classList.add('fade-out');
            if (window.platformBridge) {
                window.platformBridge.notifyLoadingReady();
            }
            setTimeout(() => {
                try { splash.remove(); } catch(e) {}
            }, 400);
        }, 1500);
    }

    initDOM() {
        this.moneyEl = document.getElementById('val-money');
        this.rubiesEl = document.getElementById('val-rubies');
        this.energyBadgeEl = document.getElementById('badge-energy');
        this.chargeHudEl = document.getElementById('charge-hud');
        this.promptIdle = document.getElementById('prompt-idle');
        this.timerFillEl = document.getElementById('timer-fill');
        this.multValEl = document.getElementById('val-mult');
        this.multValChargeEl = document.getElementById('val-mult-charge');
        this.energyValHudEl = document.getElementById('val-energy-hud');
        this.decayBadge = document.getElementById('decay-badge');
        this.decayIcon = document.getElementById('decay-icon');
        this.decayText = document.getElementById('decay-text');
        this.rebirthBarFill = document.getElementById('rebirth-fill');
        this.rebirthTextEl = document.getElementById('rebirth-text');
        this.altitudeBanner = document.getElementById('altitude-banner');
        this.altitudeText = document.getElementById('altitude-text');
        this.altVector = document.getElementById('alt-vector');
        this.visorSubText = document.getElementById('visor-sub-text');
        this.visorTicker = document.getElementById('visor-event-ticker');
        this.visorTickerText = document.getElementById('visor-event-text');
        this.bottomNav = document.getElementById('bottom-nav');

        // Monetization & Ads Elements
        this.modalOffline = document.getElementById('modal-offline-income');
        this.offlineTimeText = document.getElementById('offline-time-text');
        this.offlineAmountVal = document.getElementById('offline-amount-val');
        this.btnClaimOfflineX3 = document.getElementById('btn-claim-offline-x3');
        this.btnClaimOfflineReg = document.getElementById('btn-claim-offline-reg');
        this.landingDoubleBanner = document.getElementById('landing-double-banner');
        this.landingDoubleVal = document.getElementById('landing-double-val');
        this.btnClaimDoubleReward = document.getElementById('btn-claim-double-reward');
        this.btnTurboBoost = document.getElementById('btn-turbo-boost');
        this.btnUnboxAd = document.getElementById('btn-unbox-ad');
        this.unboxAdStatus = document.getElementById('unbox-ad-status');

        // Dynamic tap & decay state
        this.lastTapTime = 0;
        this.lastTapTimestamp = 0;
        this.isDecaying = false;
        this.isFastDive = false;
        this.moneyRainTimeout = null;

        // Ascent & Apogee trajectory mechanics
        this.targetAltitude = 0;
        this.ascentDuration = 2.5;
        this.ascentElapsed = 0;
        this.apogeeLockTimer = 0;
        this.apogeeMarkAltitude = 0;

        // Modals
        this.upgradesModal = document.getElementById('modal-upgrades');
        this.petsModal = document.getElementById('modal-pets');
        this.rebirthModal = document.getElementById('modal-rebirth');
        this.scannerModal = document.getElementById('modal-scanner');
        this.settingsModal = document.getElementById('modal-settings');
        this.skinsModal = document.getElementById('modal-skins');
        this.btnOpenSkins = document.getElementById('btn-open-skins');
        this.skinPreviewCanvas = document.getElementById('skinPreviewCanvas');
        if (this.skinPreviewCanvas) {
            this.skinPreviewCtx = this.skinPreviewCanvas.getContext('2d');
        }
        this.btnSkinEquip = document.getElementById('btn-skin-equip');
        this.btnSkinBuy = document.getElementById('btn-skin-buy');
        this.btnSkinAd = document.getElementById('btn-skin-ad');

        // Settings Elements
        this.btnOpenSettings = document.getElementById('btn-open-settings');
        this.btnSettingsSound = document.getElementById('btn-settings-sound');
        this.settingsSoundIcon = document.getElementById('settings-sound-icon');
        this.settingsSoundText = document.getElementById('settings-sound-text');
        this.btnSettingsReset = document.getElementById('btn-settings-reset');
        this.resetConfirmBox = document.getElementById('reset-confirm-box');
        this.btnConfirmResetYes = document.getElementById('btn-confirm-reset-yes');
        this.btnConfirmResetNo = document.getElementById('btn-confirm-reset-no');

        // Drones sorting
        this.btnSortPets = document.getElementById('btn-sort-pets');
        this.sortPetsLabel = document.getElementById('sort-pets-label');
        this.droneSortMode = 'rarity'; // 'rarity' | 'level'
        this.petCurrentTab = 'hangar';

        // Quantum Scanner elements
        this.scannerStatusText = document.getElementById('scanner-status-text');
        this.scannerFreqVal = document.getElementById('scanner-freq-val');
        this.scannerLaser = document.getElementById('scanner-laser');
        this.scannerActiveSearch = document.getElementById('scanner-active-search');
        this.scannerGlyphCipher = document.getElementById('scanner-glyph-cipher');
        this.scannerTelemetryText = document.getElementById('scanner-telemetry-text');
        this.scannerProgressBar = document.getElementById('scanner-progress-bar');
        this.scannerRevealCard = document.getElementById('scanner-reveal-card');
        this.scannerRevealBadge = document.getElementById('scanner-reveal-badge');
        this.scannerRevealIcon = document.getElementById('scanner-reveal-icon');
        this.scannerRevealName = document.getElementById('scanner-reveal-name');
        this.scannerRevealMult = document.getElementById('scanner-reveal-mult');
        this.scannerRevealEnergy = document.getElementById('scanner-reveal-energy');
        this.scannerRevealDesc = document.getElementById('scanner-reveal-desc');
        this.scannerLockTag = document.getElementById('scanner-lock-tag');
        this.btnScannerEquip = document.getElementById('btn-scanner-equip');
        this.btnScannerStash = document.getElementById('btn-scanner-stash');

        this.scannerInterval = null;
        this.scannerTimeout = null;
        this.pendingWonPet = null;

        // Fullscreen Toggle
        this.btnToggleFullscreen = document.getElementById('btn-toggle-fullscreen');

        // New Upgrades DOM
        this.upgradeAeroLvl = document.getElementById('upgrade-aero-lvl');
        this.upgradeAeroCost = document.getElementById('upgrade-aero-cost');
        this.btnBuyAero = document.getElementById('btn-buy-aero');

        this.upgradeCritLvl = document.getElementById('upgrade-crit-lvl');
        this.upgradeCritCost = document.getElementById('upgrade-crit-cost');
        this.btnBuyCrit = document.getElementById('btn-buy-crit');

        // Drone Fusion DOM
        this.btnFuseDrones = document.getElementById('btn-fuse-drones');
        this.btnFuseBoostAd = document.getElementById('btn-fuse-boost-ad');
        this.fusionStatusText = document.getElementById('fusion-status-text');
        this.fuseAdTag = document.getElementById('fuse-ad-tag');

        // Stats & Hall of Fame DOM
        this.statsModal = document.getElementById('modal-stats');
        this.btnOpenStats = document.getElementById('btn-open-stats');
        this.hallOfFameList = document.getElementById('hall-of-fame-list');
        this.statTotalDist = document.getElementById('stat-total-dist');
        this.statTotalJumps = document.getElementById('stat-total-jumps');
        this.statMaxMult = document.getElementById('stat-max-mult');
        this.statTotalPets = document.getElementById('stat-total-pets');

        this.updateHUD();
        this.updateSettingsUI();
    }

    setupEvents() {
        window.addEventListener('resize', () => this.resize());

        // Full-screen tap interaction on the game frame
        const frame = document.getElementById('game-frame');
        frame.addEventListener('pointerdown', (e) => {
            // NEVER trigger tap if any modal is currently visible/open!
            if (this.isModalOpen()) return;

            // Ignore taps inside modals, bottom-nav buttons, top deck, settings toggle, fullscreen toggle, turbo boost, or double reward banner
            if (e.target.closest('.modal-overlay') || e.target.closest('.modal-content') || e.target.closest('#bottom-nav') || e.target.closest('#top-hud') || e.target.closest('#btn-open-settings') || e.target.closest('#btn-toggle-fullscreen') || e.target.closest('#btn-turbo-boost') || e.target.closest('.prompt-turbo-wrap') || e.target.closest('#landing-double-banner') || e.target.closest('#btn-claim-double-reward')) {
                return;
            }
            if (this.state === 'IDLE' || this.state === 'CHARGING' || this.state === 'APOGEE' || this.state === 'FALL' || this.state === 'MONEY_RAIN') {
                e.preventDefault();
                this.handleTap();
            } else if (this.state === 'LAUNCH') {
                e.preventDefault();
                const rect = this.canvas.getBoundingClientRect();
                const tapX = (e.clientX - rect.left) * (this.canvas.width / rect.width);
                const tapY = (e.clientY - rect.top) * (this.canvas.height / rect.height);
                this.handleFlightTap(tapX, tapY);
            }
        });

        // Block pointerdown on all modals from bubbling to background game frame
        document.querySelectorAll('.modal-overlay').forEach(overlay => {
            overlay.addEventListener('pointerdown', (e) => {
                e.stopPropagation();
            });
        });

        // Isolate pointerdown/touchstart/mousedown on all ad & interactive buttons
        const isolatedButtons = [
            this.btnTurboBoost,
            this.btnClaimDoubleReward,
            this.btnUnboxAd,
            this.btnClaimOfflineX3,
            this.btnClaimOfflineReg,
            this.btnFuseBoostAd,
            this.btnFuseDrones,
            this.btnToggleFullscreen,
            this.btnOpenSettings,
            this.btnOpenSkins,
            this.btnOpenStats,
            this.btnSkinEquip,
            this.btnSkinBuy,
            this.btnSkinAd,
            document.getElementById('btn-mock-ad-skip')
        ].filter(Boolean);

        isolatedButtons.forEach(btn => {
            ['pointerdown', 'touchstart', 'mousedown'].forEach(evt => {
                btn.addEventListener(evt, (e) => {
                    e.stopPropagation();
                });
            });
        });

        window.addEventListener('keydown', (e) => {
            // Block OS key-repeat from spamming taps when holding Space or hotkeys
            if (e.repeat) return;

            if (e.code === 'Space') {
                if (this.isModalOpen()) return;
                e.preventDefault();
                if (this.state === 'IDLE' || this.state === 'CHARGING' || this.state === 'APOGEE' || this.state === 'FALL' || this.state === 'MONEY_RAIN') {
                    this.handleTap();
                } else if (this.state === 'LAUNCH') {
                    this.handleFlightTap(this.canvas.width / 2, this.canvas.height * 0.55);
                }
            } else if (e.key === '1') {
                e.preventDefault();
                this.toggleModal('upgrades');
            } else if (e.key === '2') {
                e.preventDefault();
                this.toggleModal('pets');
            } else if (e.key === '3') {
                e.preventDefault();
                this.toggleModal('rebirth');
            } else if (e.key === '4') {
                e.preventDefault();
                this.toggleModal('skins');
            } else if (e.key === '5') {
                e.preventDefault();
                this.toggleModal('stats');
            } else if (e.key === 'f' || e.key === 'F' || e.key === 'а' || e.key === 'А') {
                e.preventDefault();
                this.toggleFullscreen();
            } else if (e.key === 'o' || e.key === 'O' || e.key === 'щ' || e.key === 'Щ') {
                e.preventDefault();
                this.toggleModal('settings');
            } else if (e.key === 'm' || e.key === 'M' || e.key === 'ь' || e.key === 'Ь') {
                e.preventDefault();
                window.soundFX.toggle();
                this.updateSettingsUI();
            } else if (e.key === 'Escape') {
                e.preventDefault();
                this.closeAllModals();
            }
        });

        // Fullscreen Toggle Button
        if (this.btnToggleFullscreen) {
            this.btnToggleFullscreen.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleFullscreen();
            });

            const onFsChange = () => {
                const isFull = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
                if (this.btnToggleFullscreen) {
                    this.btnToggleFullscreen.innerText = isFull ? '✕' : '⛶';
                    this.btnToggleFullscreen.title = isFull ? 'Exit Fullscreen' : 'Fullscreen';
                }
                this.resize();
                setTimeout(() => this.resize(), 50);
                setTimeout(() => this.resize(), 150);
            };
            document.addEventListener('fullscreenchange', onFsChange);
            document.addEventListener('webkitfullscreenchange', onFsChange);
            document.addEventListener('mozfullscreenchange', onFsChange);
        }

        // Top Deck Settings Button
        if (this.btnOpenSettings) {
            this.btnOpenSettings.addEventListener('click', () => this.openModal('settings'));
        }

        // Inside Settings Modal Actions
        if (this.btnSettingsSound) {
            this.btnSettingsSound.addEventListener('click', () => {
                window.soundFX.toggle();
                this.updateSettingsUI();
            });
        }

        if (this.btnSettingsReset) {
            this.btnSettingsReset.addEventListener('click', () => {
                if (this.resetConfirmBox) this.resetConfirmBox.classList.remove('hidden');
            });
        }

        if (this.btnConfirmResetYes) {
            this.btnConfirmResetYes.addEventListener('click', () => {
                this.resetAllProgress();
            });
        }

        if (this.btnConfirmResetNo) {
            this.btnConfirmResetNo.addEventListener('click', () => {
                if (this.resetConfirmBox) this.resetConfirmBox.classList.add('hidden');
            });
        }

        const btnBuyVip = document.getElementById('btn-buy-vip');
        if (btnBuyVip) {
            btnBuyVip.addEventListener('click', (e) => {
                e.stopPropagation();
                this.buyVipStatus();
            });
        }

        // Pets Sorting Action
        if (this.btnSortPets) {
            this.btnSortPets.addEventListener('click', (e) => {
                e.stopPropagation();
                this.droneSortMode = (this.droneSortMode === 'rarity') ? 'level' : 'rarity';
                if (this.sortPetsLabel) {
                    this.sortPetsLabel.innerText = (this.droneSortMode === 'rarity') ? t('pet_sort_rarity') : t('pet_sort_level');
                }
                this.renderPetsModal();
            });
        }

        // Bottom Nav Buttons
        const btnUpgrades = document.getElementById('btn-open-upgrades');
        if (btnUpgrades) {
            btnUpgrades.addEventListener('click', (e) => { e.stopPropagation(); this.openModal('upgrades'); });
            btnUpgrades.addEventListener('pointerdown', (e) => { e.stopPropagation(); });
        }
        const btnPets = document.getElementById('btn-open-pets');
        if (btnPets) {
            btnPets.addEventListener('click', (e) => { e.stopPropagation(); this.openModal('pets'); });
            btnPets.addEventListener('pointerdown', (e) => { e.stopPropagation(); });
        }
        const btnRebirth = document.getElementById('btn-open-rebirth');
        if (btnRebirth) {
            btnRebirth.addEventListener('click', (e) => { e.stopPropagation(); this.openModal('rebirth'); });
            btnRebirth.addEventListener('pointerdown', (e) => { e.stopPropagation(); });
        }
        const btnSkins = document.getElementById('btn-open-skins');
        if (btnSkins) {
            btnSkins.addEventListener('click', (e) => { e.stopPropagation(); this.openModal('skins'); });
            btnSkins.addEventListener('pointerdown', (e) => { e.stopPropagation(); });
        }
        const btnSkinEquip = document.getElementById('btn-skin-equip');
        if (btnSkinEquip) {
            btnSkinEquip.addEventListener('click', (e) => { e.stopPropagation(); this.equipSelectedSkin(); });
            btnSkinEquip.addEventListener('pointerdown', (e) => { e.stopPropagation(); });
        }
        const btnSkinBuy = document.getElementById('btn-skin-buy');
        if (btnSkinBuy) {
            btnSkinBuy.addEventListener('click', (e) => { e.stopPropagation(); this.buySelectedSkin(); });
            btnSkinBuy.addEventListener('pointerdown', (e) => { e.stopPropagation(); });
        }
        const btnSkinAd = document.getElementById('btn-skin-ad');
        if (btnSkinAd) {
            btnSkinAd.addEventListener('click', (e) => { e.stopPropagation(); this.unlockSelectedSkinWithAd(); });
            btnSkinAd.addEventListener('pointerdown', (e) => { e.stopPropagation(); });
        }
        const btnOpenStats = document.getElementById('btn-open-stats');
        if (btnOpenStats) {
            btnOpenStats.addEventListener('click', (e) => { e.stopPropagation(); this.openModal('stats'); });
            btnOpenStats.addEventListener('pointerdown', (e) => { e.stopPropagation(); });
        }

        // Close Modal buttons
        document.querySelectorAll('.btn-close-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalId = btn.dataset.modal;
                if (modalId) {
                    document.getElementById(modalId).classList.add('hidden');
                    if (modalId === 'modal-settings' && this.resetConfirmBox) {
                        this.resetConfirmBox.classList.add('hidden');
                    }
                }
            });
        });

        // Upgrades purchase
        const btnPower = document.getElementById('btn-buy-power');
        if (btnPower) btnPower.addEventListener('click', (e) => { e.stopPropagation(); this.buyUpgrade('power'); });

        const btnSpeed = document.getElementById('btn-buy-speed');
        if (btnSpeed) btnSpeed.addEventListener('click', (e) => { e.stopPropagation(); this.buyUpgrade('speed'); });

        const btnAero = document.getElementById('btn-buy-aero');
        if (btnAero) btnAero.addEventListener('click', (e) => { e.stopPropagation(); this.buyUpgrade('aero'); });

        const btnCrit = document.getElementById('btn-buy-crit');
        if (btnCrit) btnCrit.addEventListener('click', (e) => { e.stopPropagation(); this.buyUpgrade('crit'); });

        // Drone fusion actions
        if (this.btnFuseDrones) {
            this.btnFuseDrones.addEventListener('click', (e) => {
                e.stopPropagation();
                this.performDroneFusion();
            });
        }
        if (this.btnFuseBoostAd) {
            this.btnFuseBoostAd.addEventListener('click', (e) => {
                e.stopPropagation();
                this.boostFusionWithAd();
            });
        }

        // Pet Subnav Tabs
        document.querySelectorAll('.pets-subnav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const tab = btn.getAttribute('data-pettab');
                if (tab) this.switchPetTab(tab);
            });
        });

        // Pets box unbox
        document.getElementById('btn-unbox-pet').addEventListener('click', () => this.unboxPet());

        // Pet actions
        document.getElementById('btn-pet-equip').addEventListener('click', () => this.equipSelectedPet());
        document.getElementById('btn-pet-upgrade').addEventListener('click', () => this.upgradeSelectedPet());
        document.getElementById('btn-pet-delete').addEventListener('click', () => this.deleteSelectedPet());

        // Scanner reveal actions
        if (this.btnScannerEquip) {
            this.btnScannerEquip.addEventListener('click', (e) => {
                e.stopPropagation();
                this.equipScannerPet();
            });
        }
        if (this.btnScannerStash) {
            this.btnScannerStash.addEventListener('click', (e) => {
                e.stopPropagation();
                this.stashScannerPet();
            });
        }
        const btnCloseScanner = document.getElementById('btn-close-scanner');
        if (btnCloseScanner) {
            btnCloseScanner.addEventListener('click', (e) => {
                e.stopPropagation();
                this.closeScannerModal();
            });
        }

        // Rebirth action
        document.getElementById('btn-confirm-rebirth').addEventListener('click', () => this.performRebirth());

        // Monetization & Rewarded actions
        if (this.btnTurboBoost) {
            this.btnTurboBoost.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleTurboBoost();
            });
        }
        if (this.btnClaimDoubleReward) {
            this.btnClaimDoubleReward.addEventListener('click', (e) => {
                e.stopPropagation();
                this.claimDoubleReward();
            });
        }
        if (this.btnUnboxAd) {
            this.btnUnboxAd.addEventListener('click', (e) => {
                e.stopPropagation();
                this.unboxPetWithAd();
            });
        }
        if (this.btnClaimOfflineX3) {
            this.btnClaimOfflineX3.addEventListener('click', (e) => {
                e.stopPropagation();
                this.claimOfflineIncome(true);
            });
        }
        if (this.btnClaimOfflineReg) {
            this.btnClaimOfflineReg.addEventListener('click', (e) => {
                e.stopPropagation();
                this.claimOfflineIncome(false);
            });
        }

        // Window lifecycle listeners for offline income & persistence
        window.addEventListener('beforeunload', () => {
            this.lastExitTimestamp = Date.now();
            this.save();
        });
        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                this.lastExitTimestamp = Date.now();
                this.save();
            }
        });
    }

    resize() {
        const frame = document.getElementById('game-frame');
        const rect = (this.canvas && this.canvas.getBoundingClientRect().width > 0)
            ? this.canvas.getBoundingClientRect()
            : (frame ? frame.getBoundingClientRect() : { width: 440, height: 880 });
        this.canvas.width = Math.round(rect.width) || 440;
        this.canvas.height = Math.round(rect.height) || 880;
    }

    getEquippedPet() {
        return this.pets.find(p => p.equipped);
    }

    getTotalBasePower() {
        let power = this.upgrades.jumpPower.basePower;
        const pet = this.getEquippedPet();
        if (pet) power += pet.bonusEnergy;
        return power;
    }

    getMoneyMultiplier() {
        let mult = 1.0 + (this.rebirthCount * 1.0);
        const pet = this.getEquippedPet();
        if (pet) mult *= pet.mult;
        if (this.isVip) mult *= 2.0;
        return mult;
    }

    formatCompact(n) {
        if (n === null || n === undefined || isNaN(n)) return '0';
        const num = Math.floor(n);
        if (num < 1000000) {
            return num.toLocaleString('ru-RU');
        }
        if (num < 1000000000) {
            const val = num / 1e6;
            return (val >= 100 ? val.toFixed(1) : (val >= 10 ? val.toFixed(1) : val.toFixed(2))) + 'M';
        }
        if (num < 1000000000000) {
            const val = num / 1e9;
            return (val >= 100 ? val.toFixed(1) : (val >= 10 ? val.toFixed(1) : val.toFixed(2))) + 'B';
        }
        if (num < 1000000000000000) {
            const val = num / 1e12;
            return (val >= 100 ? val.toFixed(1) : (val >= 10 ? val.toFixed(1) : val.toFixed(2))) + 'T';
        }
        return (num / 1e15).toFixed(2) + 'Q';
    }

    updateHUD() {
        this.moneyEl.innerText = this.formatCompact(this.money);
        this.moneyEl.title = `${Math.floor(this.money).toLocaleString('ru-RU')} CRED`;
        this.rubiesEl.innerText = this.formatCompact(this.rubies);
        this.rubiesEl.title = `${this.rubies.toLocaleString('ru-RU')} 💎`;
        this.energyBadgeEl.innerText = this.getTotalBasePower();

        const vipBadge = document.getElementById('vip-hud-badge');
        if (vipBadge) {
            if (this.isVip) vipBadge.classList.remove('hidden');
            else vipBadge.classList.add('hidden');
        }

        // Rebirth progress
        const prog = Math.min(1.0, this.money / this.rebirthCost);
        this.rebirthBarFill.style.width = `${prog * 100}%`;
        this.rebirthTextEl.innerText = `${this.formatCompact(this.money)} / ${this.formatCompact(this.rebirthCost)}`;

        // Rebirth modal content
        const nextCrystals = Math.min(5, 1 + (this.rebirthCount + 1));
        const curBonusEl = document.getElementById('rebirth-current-bonus');
        if (curBonusEl) curBonusEl.innerText = `+${this.rebirthCount * 100}%`;
        const nextBonusEl = document.getElementById('rebirth-next-bonus');
        if (nextBonusEl) nextBonusEl.innerText = `+${(this.rebirthCount + 1) * 100}% & +${nextCrystals} 💎`;
        const reqTextEl = document.getElementById('rebirth-req-text');
        if (reqTextEl) reqTextEl.innerText = `${this.formatCompact(this.money)} / ${this.formatCompact(this.rebirthCost)} CRED`;
        const btnRebirth = document.getElementById('btn-confirm-rebirth');
        if (this.money >= this.rebirthCost) {
            btnRebirth.removeAttribute('disabled');
            btnRebirth.classList.add('pulse');
        } else {
            btnRebirth.setAttribute('disabled', 'true');
            btnRebirth.classList.remove('pulse');
        }

        // Upgrades modal content
        if (!this.upgrades.jumpPower) this.upgrades.jumpPower = { level: 1, basePower: 6, cost: 400 };
        if (!this.upgrades.boostSpeed) this.upgrades.boostSpeed = { level: 1, duration: 2.8, multStep: 0.10, cost: 800 };
        if (!this.upgrades.aerodynamics) this.upgrades.aerodynamics = { level: 0, cost: 600, multStep: 0.08 };
        if (!this.upgrades.critTap) this.upgrades.critTap = { level: 1, cost: 1200, chance: 0.08 };

        const powerLvlEl = document.getElementById('upgrade-power-lvl');
        const powerCostEl = document.getElementById('upgrade-power-cost');
        if (powerLvlEl) powerLvlEl.innerText = this.upgrades.jumpPower.basePower;
        if (powerCostEl) powerCostEl.innerText = this.upgrades.jumpPower.cost;

        const speedLvlEl = document.getElementById('upgrade-speed-lvl');
        const speedCostEl = document.getElementById('upgrade-speed-cost');
        if (speedLvlEl) speedLvlEl.innerText = this.upgrades.boostSpeed.duration.toFixed(1) + 's';
        if (speedCostEl) speedCostEl.innerText = this.upgrades.boostSpeed.cost;

        const aeroLvlEl = document.getElementById('upgrade-aero-lvl');
        const aeroCostEl = document.getElementById('upgrade-aero-cost');
        if (aeroLvlEl) aeroLvlEl.innerText = `+${Math.round(this.upgrades.aerodynamics.level * 8)}%`;
        if (aeroCostEl) aeroCostEl.innerText = this.upgrades.aerodynamics.cost;

        const critLvlEl = document.getElementById('upgrade-crit-lvl');
        const critCostEl = document.getElementById('upgrade-crit-cost');
        const critPct = Math.round((this.upgrades.critTap.chance || 0.08) * 100);
        if (critLvlEl) critLvlEl.innerText = `${critPct}%`;
        if (critCostEl) critCostEl.innerText = this.upgrades.critTap.cost;

        const btnP = document.getElementById('btn-buy-power');
        const btnS = document.getElementById('btn-buy-speed');
        const btnA = document.getElementById('btn-buy-aero');
        const btnC = document.getElementById('btn-buy-crit');

        if (btnP) {
            if (this.money >= this.upgrades.jumpPower.cost) btnP.removeAttribute('disabled');
            else btnP.setAttribute('disabled', 'true');
        }
        if (btnS) {
            if (this.money >= this.upgrades.boostSpeed.cost) btnS.removeAttribute('disabled');
            else btnS.setAttribute('disabled', 'true');
        }
        if (btnA) {
            if (this.money >= this.upgrades.aerodynamics.cost) btnA.removeAttribute('disabled');
            else btnA.setAttribute('disabled', 'true');
        }
        if (btnC) {
            if (this.money >= this.upgrades.critTap.cost) btnC.removeAttribute('disabled');
            else btnC.setAttribute('disabled', 'true');
        }

        // Pets list render
        this.renderPetsModal();
        this.updateAltitudeLadder();
    }

        getCritChance() {
        if (!this.upgrades.critTap) return 0.08;
        return Math.min(0.50, 0.08 + (this.upgrades.critTap.level - 1) * 0.03);
    }

    handleFlightTap(screenX, screenY) {
        if (this.state !== 'LAUNCH') return;
        const scale = 2.5;
        const flightHeroY = this.canvas.height * 0.55;
        let currentHeroY = flightHeroY;
        if (this.altitude < 25) {
            const t = Math.max(0, Math.min(1.0, this.altitude / 25));
            const ease = 1 - Math.pow(1 - t, 2);
            currentHeroY = (this.canvas.height - 165) - ((this.canvas.height - 165) - flightHeroY) * ease;
        }

        // 1. Priority check: Ultra-rare Crystal Geode (💎)
        if (this.flightCrystal && !this.flightCrystal.collected) {
            const cY = currentHeroY - (this.flightCrystal.alt - this.altitude) * scale;
            const cX = this.canvas.width * this.flightCrystal.xRatio;
            if (Math.hypot(screenX - cX, screenY - cY) < 65) {
                this.collectFlightCrystal(cX, cY);
                return;
            }
        }

        // 2. Check tap on Interactive Asteroids (CRED)
        if (this.flightAsteroids) {
            for (let i = 0; i < this.flightAsteroids.length; i++) {
                const ast = this.flightAsteroids[i];
                if (!ast.collected) {
                    const astY = currentHeroY - (ast.alt - this.altitude) * scale;
                    const astX = this.canvas.width * ast.xRatio;
                    if (Math.hypot(screenX - astX, screenY - astY) < (ast.radius + 35)) {
                        this.hitFlightAsteroid(ast, astX, astY);
                        return;
                    }
                }
            }
        }

        // 3. Check tap on In-flight Kinetic Booster Rings
        if (this.rings) {
            const nearRing = this.rings.find(r => r.active && Math.abs(this.altitude - r.alt) < 95);
            if (nearRing) {
                nearRing.active = false;
                window.soundFX.playBoostRing();
                this.safeVibrate([50, 40, 60]);
                this.screenShake = 10;
                const ringBoostMult = (this.skin === 'celestial') ? 1.35 : ((this.skin === 'shaman') ? 1.25 : 1.15);
                this.targetAltitude = Math.floor(this.targetAltitude * ringBoostMult);
                this.showFlightAlert(t('alert_ring_intercept'));
            }
        }
    }

    collectFlightCrystal(x, y) {
        if (!this.flightCrystal || this.flightCrystal.collected) return;
        this.flightCrystal.collected = true;
        this.rubies += 1;
        this.save();
        this.updateHUD();
        try { window.soundFX.playCrystalPickup(); } catch(e) {}
        this.safeVibrate([50, 30, 70]);
        this.screenShake = 12;
        this.floatingTexts.push({
            text: t('float_crystal'),
            x: x || (this.canvas.width / 2),
            y: y || (this.canvas.height * 0.45),
            life: 2.2,
            color: '#38bdf8'
        });
        this.showFlightAlert(t('alert_crystal_collected'));
    }

    hitFlightAsteroid(ast, x, y) {
        if (!ast || ast.collected) return;
        ast.collected = true;
        this.money += ast.points;
        this.save();
        this.updateHUD();
        try { window.soundFX.playAsteroidHit(); } catch(e) {}
        this.safeVibrate([30, 20, 40]);
        this.screenShake = 8;
        this.floatingTexts.push({
            text: `+${ast.points} CRED`,
            x: x || (this.canvas.width / 2),
            y: y || (this.canvas.height * 0.45),
            life: 1.6,
            color: '#10b981'
        });
    }

    handleTap() {
        if (window.platformBridge && window.platformBridge.isAdShowing) return;
        if (this.isModalOpen()) return;

        if (this.state === 'LAUNCH') {
            // In-flight interactive ring interception!
            if (this.rings) {
                const nearRing = this.rings.find(r => r.active && Math.abs(this.altitude - r.alt) < 95);
                if (nearRing) {
                    nearRing.active = false;
                    window.soundFX.playBoostRing();
                    this.safeVibrate([50, 40, 60]);
                    this.screenShake = 10;
                    const ringBoostMult = (this.skin === 'celestial') ? 1.35 : ((this.skin === 'shaman') ? 1.25 : 1.15);
                    this.targetAltitude = Math.floor(this.targetAltitude * ringBoostMult);
                    this.showFlightAlert(t('alert_ring_intercept'));
                    return;
                }
            }
        }

        if (this.state === 'APOGEE' || this.state === 'FALL') {
            this.triggerFastDive();
            return;
        }

        if (this.state === 'MONEY_RAIN') {
            this.finishMoneyRainAndCharge();
            return;
        }

        if (this.state === 'IDLE') {
            // Dismiss landing double banner if still showing
            if (this.landingDoubleBanner) this.landingDoubleBanner.classList.add('hidden');

            // Start Charge Phase!
            this.state = 'CHARGING';
            if (window.platformBridge) window.platformBridge.startGameplay();

            if (this.isTurboBoosted) {
                this.chargeMultiplier = 2.50;
                this.timerMax = this.upgrades.boostSpeed.duration + 1.5;
                this.isTurboBoosted = false;
                this.updateTurboUI();
                this.floatingTexts.push({
                    text: t('float_turbo_charged'),
                    x: this.canvas.width / 2,
                    y: this.canvas.height * 0.45,
                    life: 2.0,
                    color: '#121315'
                });
            } else {
                this.chargeMultiplier = 1.0;
                this.timerMax = this.upgrades.boostSpeed.duration;
            }

            this.timerRemaining = this.timerMax;
            this.currentCharge = Math.floor(this.getTotalBasePower() * this.chargeMultiplier);
            this.clicksThisRound = 0;
            this.lastTapTime = performance.now();
            this.isDecaying = false;

            if (this.promptIdle) this.promptIdle.classList.add('hidden');
            this.chargeHudEl.classList.remove('hidden');
            this.bottomNav.classList.add('hidden');
        }

        if (this.state === 'CHARGING') {
            const now = performance.now();
            // Tap rate limiter: max ~22 taps/sec (human limit ~12-14 cps)
            // Prevents autoclicker macro abuse from breaking the game
            if (this.lastTapTimestamp && (now - this.lastTapTimestamp) < 45) {
                return;
            }
            this.lastTapTimestamp = now;

            this.clicksThisRound++;
            this.lastTapTime = now;
            this.isDecaying = false;

            // Increment multiplier on tap
            this.chargeMultiplier += this.upgrades.boostSpeed.multStep;

            const heroX = this.canvas.width / 2;
            const heroY = this.canvas.height - 165;

            // Roll Crit Tap
            const critChance = this.getCritChance();
            const isCrit = Math.random() < critChance;
            if (isCrit) {
                this.chargeMultiplier += 0.25; // Massive critical surge!
                try { window.soundFX.playCritTap(); } catch(e) {}
                this.safeVibrate([35, 20, 45]);
                this.screenShake = 9;
                this.floatingTexts.push({
                    text: t('float_crit'),
                    x: heroX + (Math.random() - 0.5) * 50,
                    y: heroY - 45,
                    life: 1.2,
                    color: '#121315',
                    isLocal: true
                });
            } else {
                this.safeVibrate([15]);
                this.screenShake = 5;
            }

            this.currentCharge = Math.floor(this.getTotalBasePower() * this.chargeMultiplier);

            // Audio & tactile juice
            window.soundFX.playClick(this.chargeMultiplier);
            window.soundFX.playSpark();
            this.characterSquash = 0.82; // Tactile squash on hit!

            // Spawn modern vector shockwave ripple at hero's feet (capped against spam)
            if (this.shockwaves.length < 10) {
                this.shockwaves.push({
                    x: heroX,
                    y: heroY + 20,
                    radius: 6,
                    maxRadius: 38,
                    speed: 140,
                    alpha: 0.9
                });
            }

            // Spawn skin-tailored unique charging particles
            this.spawnSkinChargeParticles(heroX, heroY, 1);

            // Spawn sharp razor electric sparks around hero (capped against spam)
            if (this.lightnings.length < 12) {
                for (let i = 0; i < 2; i++) {
                    this.lightnings.push({
                        x: heroX + (Math.random() - 0.5) * 120,
                        y: heroY + (Math.random() - 0.5) * 90,
                        scale: 0.7 + Math.random() * 0.6,
                        life: 0.22,
                        maxLife: 0.22
                    });
                }
            }

            // Update charge HUD displays
            this.multValEl.innerText = this.chargeMultiplier.toFixed(2);
            if (this.multValChargeEl) this.multValChargeEl.innerText = `✖ ${this.chargeMultiplier.toFixed(2)}`;
            this.energyValHudEl.innerText = `${this.currentCharge} ⚡`;

            if (this.decayBadge) {
                this.decayBadge.className = 'charge-flow-badge rising';
                if (this.decayIcon) this.decayIcon.innerText = '▲';
                if (this.decayText) this.decayText.innerText = t('charge_rising');
            }
        }
    }

    spawnSkinChargeParticles(heroX, heroY, countMultiplier = 1) {
        if (!this.chargeParticles) this.chargeParticles = [];
        if (this.chargeParticles.length >= 28) return;

        const skin = this.skin || 'ninja';

        if (skin === 'zombie') {
            const num = Math.max(1, Math.round(3 * countMultiplier));
            for (let i = 0; i < num; i++) {
                this.chargeParticles.push({
                    type: 'zombie_bubble',
                    x: heroX + (Math.random() - 0.5) * 55,
                    y: heroY + 15 - Math.random() * 40,
                    vx: (Math.random() - 0.5) * 30,
                    vy: -50 - Math.random() * 60,
                    radius: 3 + Math.random() * 4,
                    life: 0.35,
                    maxLife: 0.35
                });
            }
        } else if (skin === 'cyborg') {
            const num = Math.max(1, Math.round(2 * countMultiplier));
            for (let i = 0; i < num; i++) {
                this.chargeParticles.push({
                    type: 'cyborg_bracket',
                    x: heroX + (Math.random() - 0.5) * 70,
                    y: heroY + (Math.random() - 0.5) * 60,
                    vx: (Math.random() - 0.5) * 20,
                    vy: (Math.random() - 0.5) * 20,
                    size: 7 + Math.random() * 5,
                    life: 0.28,
                    maxLife: 0.28
                });
            }
        } else if (skin === 'astronaut') {
            const num = Math.max(1, Math.round(3 * countMultiplier));
            for (let i = 0; i < num; i++) {
                this.chargeParticles.push({
                    type: 'astronaut_steam',
                    x: heroX + (Math.random() - 0.5) * 40,
                    y: heroY + 10 + Math.random() * 20,
                    vx: (Math.random() - 0.5) * 70,
                    vy: 20 + Math.random() * 40,
                    radius: 5 + Math.random() * 6,
                    gx: (Math.random() - 0.5) * 10,
                    gy: (Math.random() - 0.5) * 10,
                    life: 0.30,
                    maxLife: 0.30
                });
            }
        } else if (skin === 'phantom') {
            const num = Math.max(1, Math.round(3 * countMultiplier));
            for (let i = 0; i < num; i++) {
                this.chargeParticles.push({
                    type: 'phantom_plasma',
                    x: heroX + (Math.random() - 0.5) * 60,
                    y: heroY + (Math.random() - 0.5) * 60,
                    x1: (Math.random() - 0.5) * 30,
                    y1: (Math.random() - 0.5) * 30,
                    x2: (Math.random() - 0.5) * 20,
                    y2: (Math.random() - 0.5) * 20,
                    x3: (Math.random() - 0.5) * 30,
                    y3: (Math.random() - 0.5) * 30,
                    life: 0.22,
                    maxLife: 0.22
                });
            }
        } else if (skin === 'aviator') {
            const num = Math.max(1, Math.round(2 * countMultiplier));
            for (let i = 0; i < num; i++) {
                this.chargeParticles.push({
                    type: 'aviator_gear',
                    x: heroX + (Math.random() - 0.5) * 60,
                    y: heroY + (Math.random() - 0.5) * 50,
                    vx: (Math.random() - 0.5) * 40,
                    vy: -40 - Math.random() * 40,
                    rot: Math.random() * Math.PI * 2,
                    vRot: (Math.random() - 0.5) * 15,
                    size: 6 + Math.random() * 4,
                    life: 0.35,
                    maxLife: 0.35
                });
            }
        } else if (skin === 'shaman') {
            const glyphs = ['✦', 'ᚴ', 'ᛟ', '⚡', '᚛', '◈'];
            const num = Math.max(1, Math.round(2 * countMultiplier));
            for (let i = 0; i < num; i++) {
                this.chargeParticles.push({
                    type: 'shaman_rune',
                    x: heroX + (Math.random() - 0.5) * 65,
                    y: heroY + 15 - Math.random() * 45,
                    vx: (Math.random() - 0.5) * 25,
                    vy: -60 - Math.random() * 50,
                    glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
                    life: 0.38,
                    maxLife: 0.38
                });
            }
        } else if (skin === 'samurai') {
            if (countMultiplier >= 1) {
                this.chargeParticles.push({
                    type: 'samurai_slash',
                    x: heroX + (Math.random() - 0.5) * 40,
                    y: heroY + (Math.random() - 0.5) * 40,
                    rot: (Math.random() - 0.5) * Math.PI,
                    len: 35 + Math.random() * 25,
                    life: 0.20,
                    maxLife: 0.20
                });
            }
            const num = Math.max(1, Math.round(2 * countMultiplier));
            for (let i = 0; i < num; i++) {
                this.chargeParticles.push({
                    type: 'samurai_petal',
                    x: heroX + (Math.random() - 0.5) * 55,
                    y: heroY + (Math.random() - 0.5) * 50,
                    vx: (Math.random() - 0.5) * 50,
                    vy: -30 - Math.random() * 40,
                    rot: Math.random() * Math.PI * 2,
                    vRot: (Math.random() - 0.5) * 10,
                    len: 6 + Math.random() * 4,
                    life: 0.35,
                    maxLife: 0.35
                });
            }
        } else if (skin === 'titan') {
            const num = Math.max(1, Math.round(3 * countMultiplier));
            for (let i = 0; i < num; i++) {
                this.chargeParticles.push({
                    type: 'titan_plume',
                    x: heroX + (Math.random() > 0.5 ? -14 : 14) + (Math.random() - 0.5) * 10,
                    y: heroY + 10 + Math.random() * 15,
                    vx: (Math.random() - 0.5) * 50,
                    vy: 40 + Math.random() * 80,
                    radius: 5 + Math.random() * 6,
                    life: 0.26,
                    maxLife: 0.26
                });
            }
        } else if (skin === 'celestial') {
            const num = Math.max(1, Math.round(3 * countMultiplier));
            for (let i = 0; i < num; i++) {
                if (Math.random() > 0.35) {
                    this.chargeParticles.push({
                        type: 'celestial_spark',
                        x: heroX + (Math.random() - 0.5) * 65,
                        y: heroY + (Math.random() - 0.5) * 60,
                        vx: (Math.random() - 0.5) * 40,
                        vy: -40 - Math.random() * 50,
                        rot: Math.random() * Math.PI * 2,
                        sz: 6 + Math.random() * 5,
                        life: 0.32,
                        maxLife: 0.32
                    });
                } else {
                    this.chargeParticles.push({
                        type: 'celestial_blade',
                        x: heroX + (Math.random() - 0.5) * 55,
                        y: heroY - 10 + (Math.random() - 0.5) * 40,
                        vx: (Math.random() - 0.5) * 15,
                        vy: -70 - Math.random() * 60,
                        len: 20 + Math.random() * 25,
                        life: 0.28,
                        maxLife: 0.28
                    });
                }
            }
        } else {
            // Ninja
            const num = Math.max(1, Math.round(2 * countMultiplier));
            for (let i = 0; i < num; i++) {
                this.chargeParticles.push({
                    type: 'ninja_slash',
                    x: heroX + (Math.random() - 0.5) * 60,
                    y: heroY + (Math.random() - 0.5) * 60,
                    rot: (Math.random() - 0.5) * Math.PI,
                    len: 25 + Math.random() * 20,
                    life: 0.20,
                    maxLife: 0.20
                });
            }
        }
    }

    triggerFastDive() {
        if (this.state === 'APOGEE') {
            this.state = 'FALL';
        }
        if (this.isFastDive) return;
        this.isFastDive = true;

        try {
            window.soundFX.playDive();
        } catch(e) {}

        this.screenShake = 6;

        if (this.altVector) {
            this.altVector.innerText = t('visor_launch');
        }
        if (this.visorSubText) {
            this.visorSubText.innerText = t('visor_sub_default');
        }

        this.floatingTexts.push({
            text: t('alert_dive'),
            x: this.canvas.width / 2,
            y: this.canvas.height * 0.45,
            life: 1.1,
            color: '#121315'
        });
    }

    finishMoneyRainAndCharge() {
        if (this.moneyRainTimeout) clearTimeout(this.moneyRainTimeout);
        this.resetToIdle();
        this.handleTap();
    }

    resetToIdle() {
        if (window.platformBridge) window.platformBridge.stopGameplay();
        this.state = 'IDLE';
        this.isFastDive = false;
        this.apogeeMarkAltitude = 0;
        this.activeEncounter = null;
        this.exitingEncounter = null;
        this.bottomNav.classList.remove('hidden');

        // Only show promptIdle if landing banner is NOT currently showing
        const isLandingBannerShowing = this.landingDoubleBanner && !this.landingDoubleBanner.classList.contains('hidden');
        if (this.promptIdle) {
            if (isLandingBannerShowing) {
                this.promptIdle.classList.add('hidden');
            } else {
                this.promptIdle.classList.remove('hidden');
            }
        }

        if (this.chargeHudEl) this.chargeHudEl.classList.add('hidden');
        this.chargeMultiplier = 1.0;
        this.currentCharge = this.getTotalBasePower();
        this.multValEl.innerText = '1.00';
        if (this.multValChargeEl) this.multValChargeEl.innerText = '✖ 1.00';

        // Auto-dismiss landing double banner after 6 seconds in idle, and restore promptIdle
        if (this.landingBannerTimer) clearTimeout(this.landingBannerTimer);
        this.landingBannerTimer = setTimeout(() => {
            if (this.landingDoubleBanner && !this.landingDoubleBanner.classList.contains('hidden')) {
                this.landingDoubleBanner.classList.add('hidden');
                if (this.state === 'IDLE' && this.promptIdle) {
                    this.promptIdle.classList.remove('hidden');
                }
            }
        }, 6000);

        // Record flight completed & check smart interstitial
        if (window.platformBridge) {
            window.platformBridge.recordFlightCompleted();
            if (window.platformBridge.canShowInterstitial() && !this.isModalOpen()) {
                window.platformBridge.showInterstitial();
            }
        }
    }

    launchHero() {
        this.state = 'LAUNCH';
        if (window.platformBridge) window.platformBridge.startGameplay();
        this.isFastDive = false;
        if (this.landingDoubleBanner) this.landingDoubleBanner.classList.add('hidden');
        if (this.moneyRainTimeout) clearTimeout(this.moneyRainTimeout);
        this.chargeHudEl.classList.add('hidden');
        if (this.promptIdle) this.promptIdle.classList.add('hidden');
        this.altitudeBanner.classList.remove('hidden');
        if (this.visorSubText) this.visorSubText.innerText = t('visor_sub_default');
        if (this.visorTicker) this.visorTicker.classList.add('hidden');
        this.ringBoostCombo = 0;
        this.lastRingBoostTime = 0;
        this.floatingTexts = [];
        this.chargeParticles = [];

        // Non-linear altitude potential: rewards active tapping and upgrades with sky-high cosmic altitudes!
        const aeroMult = 1 + (this.upgrades.aerodynamics ? this.upgrades.aerodynamics.level * 0.08 : 0);
        let skinAltitudeMult = 1.0;
        if (this.skin === 'cyborg') skinAltitudeMult *= 1.05;
        if (this.skin === 'samurai') skinAltitudeMult *= 1.15;
        if (this.skin === 'celestial') skinAltitudeMult *= 1.50;
        let launchPower = this.currentCharge;
        if (this.skin === 'titan') launchPower *= 1.10;
        if (this.skin === 'celestial') launchPower *= 1.15;
        this.targetAltitude = Math.pow(launchPower, 1.18) * 45 * aeroMult * skinAltitudeMult;
        // Dynamic ascent duration: quickly reaches height (2.2s - 3.4s)
        this.ascentDuration = Math.min(3.4, Math.max(2.2, 1.8 + Math.log10(Math.max(10, this.targetAltitude)) * 0.32));
        this.ascentElapsed = 0;
        this.apogeeLockTimer = 0;
        this.apogeeMarkAltitude = 0;
        this.altitude = 0;
        this.peakAltitude = 0;
        this.reachedMilestones.clear();

        // Spawn kinetic booster rings across the trajectory
        const baseRingAltitudes = [800, 2500, 6000, 15000, 35000, 80000, 180000, 400000];
        this.rings = baseRingAltitudes
            .filter(a => a < this.targetAltitude * 1.3)
            .map(alt => ({ alt, active: true, scale: 1.0, alpha: 1.0 }));

        // Reset sonic booms, landmarks, escort encounters, and anomaly multiplier
        this.passedSonicBooms = new Set();
        this.sonicBooms = [];
        this.seenEncounterLandmarks = new Set();
        this.activeEncounter = null;
        this.exitingEncounter = null;
        this.flightAnomalyMult = 1.0;

        // Procedural Interactive Asteroids (Tappable debris for CRED)
        this.flightAsteroids = [];
        if (this.targetAltitude >= 800) {
            const astCount = Math.min(6, Math.max(2, Math.floor(Math.log10(Math.max(10, this.targetAltitude)) * 1.5)));
            for (let i = 0; i < astCount; i++) {
                const stepMin = (i + 0.15) / astCount;
                const stepMax = (i + 0.85) / astCount;
                const alt = Math.floor(this.targetAltitude * (stepMin + Math.random() * (stepMax - stepMin)));
                if (alt > 350) {
                    this.flightAsteroids.push({
                        alt,
                        xRatio: 0.18 + Math.random() * 0.64,
                        radius: 18 + Math.random() * 8,
                        vertices: [-0.22, 0.28, -0.14, 0.24, -0.18, 0.19, -0.26, 0.12].map(v => v + (Math.random() - 0.5) * 0.08),
                        rotation: Math.random() * Math.PI * 2,
                        rotSpeed: (Math.random() - 0.5) * 1.8,
                        points: Math.max(15, Math.floor(Math.sqrt(alt) * 6)),
                        collected: false
                    });
                }
            }
        }

        // Ultra-Rare In-Flight Crystal Geode (15% chance only on flights >= 40,000m, max 1 per flight)
        this.flightCrystal = null;
        if (this.targetAltitude >= 40000 && Math.random() < 0.15) {
            this.flightCrystal = {
                alt: Math.floor(this.targetAltitude * (0.35 + Math.random() * 0.45)),
                xRatio: 0.25 + Math.random() * 0.50,
                collected: false
            };
        }

        // Cosmic Anomalies / Sky Buffs (35% chance on flights >= 25,000m)
        this.flightAnomaly = null;
        if (this.targetAltitude >= 25000 && Math.random() < 0.35) {
            const isSolarWind = Math.random() < 0.5;
            if (isSolarWind) {
                this.flightAnomaly = {
                    type: 'SOLAR_WIND',
                    name: t('anomaly_solar_name'),
                    minAlt: Math.floor(this.targetAltitude * 0.30),
                    maxAlt: Math.floor(this.targetAltitude * 0.70),
                    active: false,
                    triggered: false
                };
            } else {
                this.flightAnomaly = {
                    type: 'ION_STREAM',
                    name: t('anomaly_ion_name'),
                    minAlt: Math.floor(this.targetAltitude * 0.25),
                    maxAlt: Math.floor(this.targetAltitude * 0.55),
                    active: false,
                    triggered: false
                };
            }
        }

        const heroX = this.canvas.width / 2;
        const heroY = this.canvas.height - 165;

        // Big explosive shockwave ring on blastoff!
        this.shockwaves.push({
            x: heroX,
            y: heroY + 20,
            radius: 8,
            maxRadius: 130,
            speed: 360,
            alpha: 1.0
        });
        this.screenShake = 10;

        window.soundFX.playLaunch();
    }

    buyUpgrade(type) {
        let key = null;
        if (type === 'power' || type === 'jumpPower') key = 'jumpPower';
        else if (type === 'speed' || type === 'boostSpeed') key = 'boostSpeed';
        else if (type === 'aero' || type === 'aerodynamics') key = 'aerodynamics';
        else if (type === 'crit' || type === 'critTap') key = 'critTap';
        if (!key) return;

        if (!this.upgrades[key]) {
            if (key === 'jumpPower') this.upgrades.jumpPower = { level: 1, basePower: 6, cost: 400 };
            else if (key === 'boostSpeed') this.upgrades.boostSpeed = { level: 1, duration: 2.8, multStep: 0.10, cost: 800 };
            else if (key === 'aerodynamics') this.upgrades.aerodynamics = { level: 0, cost: 600, multStep: 0.08 };
            else if (key === 'critTap') this.upgrades.critTap = { level: 1, cost: 1200, chance: 0.08 };
        }

        const upg = this.upgrades[key];
        const cost = upg.cost;

        if (this.money < cost) {
            try { window.soundFX.playClick(); } catch(e) {}
            this.safeVibrate([30]);
            this.floatingTexts.push({
                text: (typeof LOCALES !== 'undefined' && LOCALES[window.currentLang || 'en']?.float_pet_need_cred) ? LOCALES[window.currentLang || 'en'].float_pet_need_cred(cost) : `NEED ${cost.toLocaleString()} CRED`,
                x: this.canvas.width / 2,
                y: this.canvas.height * 0.45,
                life: 1.8,
                color: '#e11d48'
            });
            this.updateHUD();
            return;
        }

        this.money -= cost;
        if (key === 'jumpPower') {
            upg.level++;
            upg.basePower += 2;
            upg.cost = Math.floor(cost * 1.60);
        } else if (key === 'boostSpeed') {
            upg.level++;
            upg.duration = parseFloat((upg.duration + 0.20).toFixed(2));
            upg.multStep = parseFloat((upg.multStep + 0.015).toFixed(3));
            upg.cost = Math.floor(cost * 1.85);
        } else if (key === 'aerodynamics') {
            upg.level++;
            upg.cost = Math.floor(cost * 1.55);
        } else if (key === 'critTap') {
            upg.level++;
            upg.chance = Math.min(0.50, 0.08 + (upg.level - 1) * 0.03);
            upg.cost = Math.floor(cost * 1.65);
        }

        window.soundFX.playUpgrade();
        this.safeVibrate([30, 20]);
        this.save();
        this.updateHUD();
    }

    unboxPetWithAd() {
        if (this.isScanning) return;
        const cooldown = (window.platformBridge && window.platformBridge.freeScanCooldownMs) ? window.platformBridge.freeScanCooldownMs : 15 * 60 * 1000;
        const elapsed = Date.now() - (this.lastFreeScanTimestamp || 0);
        if (elapsed < cooldown) {
            const remSec = Math.ceil((cooldown - elapsed) / 1000);
            const m = Math.floor(remSec / 60);
            const s = String(remSec % 60).padStart(2, '0');
            this.floatingTexts.push({
                text: (typeof LOCALES !== 'undefined' && LOCALES[window.currentLang || 'en']?.scan_cooldown) ? LOCALES[window.currentLang || 'en'].scan_cooldown(m, s) : `SCAN AVAILABLE IN ${m}:${s}`,
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                life: 2.2,
                color: '#121315'
            });
            try { window.soundFX.playClick(); } catch(e) {}
            return;
        }

        if (window.platformBridge) {
            window.platformBridge.showRewarded('free_scan', () => {
                this.lastFreeScanTimestamp = Date.now();
                this.save();
                this.updateFreeScanUI();
                this.unboxPet(true);
            });
        } else {
            this.unboxPet(true);
        }
    }

    updateFreeScanUI() {
        if (!this.btnUnboxAd || !this.unboxAdStatus) return;
        const cooldown = (window.platformBridge && window.platformBridge.freeScanCooldownMs) ? window.platformBridge.freeScanCooldownMs : 15 * 60 * 1000;
        const elapsed = Date.now() - (this.lastFreeScanTimestamp || 0);
        if (elapsed < cooldown) {
            const remSec = Math.ceil((cooldown - elapsed) / 1000);
            const m = Math.floor(remSec / 60);
            const s = String(remSec % 60).padStart(2, '0');
            this.unboxAdStatus.innerText = `${m}:${s}`;
            this.btnUnboxAd.setAttribute('disabled', 'true');
        } else {
            this.unboxAdStatus.innerText = t('scan_free_label');
            this.btnUnboxAd.removeAttribute('disabled');
        }
    }

    unboxPet(isFreeWithAd = false) {
        if (this.isScanning) return;
        if (!isFreeWithAd) {
            if (this.rubies < 2) {
                this.floatingTexts.push({
                    text: t('scanner_need_rubies'),
                    x: this.canvas.width / 2,
                    y: this.canvas.height / 2,
                    life: 2.2,
                    color: '#121315'
                });
                try { window.soundFX.playClick(); } catch(e) {}
                return;
            }
            this.rubies -= 2;
        }
        this.isScanning = true;

        const petRoster = [
            { name: t('pet_common_name'), icon: '⬡', rarity: t('pet_common_rarity'), rarityKey: 'common', mult: 1.10, bonusEnergy: 2, desc: t('pet_common_desc') },
            { name: t('pet_rare_name'), icon: '◈', rarity: t('pet_rare_rarity'), rarityKey: 'rare', mult: 1.25, bonusEnergy: 5, desc: t('pet_rare_desc') },
            { name: t('pet_epic_name'), icon: '✦', rarity: t('pet_epic_rarity'), rarityKey: 'epic', mult: 1.50, bonusEnergy: 12, desc: t('pet_epic_desc') },
            { name: t('pet_legendary_name'), icon: '◉', rarity: t('pet_legendary_rarity'), rarityKey: 'legendary', mult: 2.00, bonusEnergy: 25, desc: t('pet_legendary_desc') },
            { name: t('pet_mythic_name'), icon: '🜂', rarity: t('pet_mythic_rarity'), rarityKey: 'mythic', mult: 3.00, bonusEnergy: 50, desc: t('pet_mythic_desc') }
        ];

        // Random selection with weights: 45% Common, 30% Rare, 15% Epic, 7% Legendary, 3% Mythic
        const roll = Math.random();
        let selectedTemplate;
        if (roll < 0.45) selectedTemplate = petRoster[0];
        else if (roll < 0.75) selectedTemplate = petRoster[1];
        else if (roll < 0.90) selectedTemplate = petRoster[2];
        else if (roll < 0.97) selectedTemplate = petRoster[3];
        else selectedTemplate = petRoster[4];

        const newPet = {
            id: 'drone_' + Date.now(),
            name: selectedTemplate.name,
            icon: selectedTemplate.icon,
            level: 1,
            mult: selectedTemplate.mult,
            bonusEnergy: selectedTemplate.bonusEnergy,
            rarity: selectedTemplate.rarity,
            rarityKey: selectedTemplate.rarityKey,
            desc: selectedTemplate.desc,
            equipped: false
        };

        this.pets.push(newPet);
        this.selectedPetId = newPet.id;
        this.pendingWonPet = newPet;
        this.save();
        this.updateHUD();

        // Start the tactile quantum scanner sequence!
        this.startScannerSequence(newPet);
    }

    startScannerSequence(pet) {
        if (!this.scannerModal) return;

        // Clear existing timers
        if (this.scannerInterval) clearInterval(this.scannerInterval);
        if (this.scannerTimeout) clearTimeout(this.scannerTimeout);
        if (this.scannerWatchdog) clearTimeout(this.scannerWatchdog);

        this.isScanning = true;

        // Open Scanner Modal
        this.scannerModal.classList.remove('hidden');

        // Reset elements
        if (this.scannerActiveSearch) this.scannerActiveSearch.classList.remove('hidden');
        if (this.scannerRevealCard) this.scannerRevealCard.classList.add('hidden');
        if (this.scannerLaser) this.scannerLaser.classList.remove('locked');
        if (this.scannerLockTag) this.scannerLockTag.innerText = `[ ${t('scanner_lock_tag_search')} ]`;
        if (this.scannerStatusText) this.scannerStatusText.innerText = t('scanner_status_searching');
        if (this.scannerProgressBar) this.scannerProgressBar.style.width = '0%';

        const cipherGlyphs = ['⬡', '◈', '✦', '◉', '🜂', '⬢', '✧', '⬟'];
        const startTime = performance.now();
        const duration = 1200; // ms to lock
        let step = 0;

        // Watchdog fallback: guaranteed reveal after 2.5s if anything gets delayed
        this.scannerWatchdog = setTimeout(() => {
            if (this.isScanning) {
                this.lockAndRevealScanner(pet);
            }
        }, 2500);

        this.scannerInterval = setInterval(() => {
            const elapsed = performance.now() - startTime;
            const progress = Math.min(1.0, elapsed / duration);
            step++;

            // Update Progress Bar
            if (this.scannerProgressBar) {
                this.scannerProgressBar.style.width = `${progress * 100}%`;
            }

            // Scramble Glyph & Frequency
            if (this.scannerGlyphCipher) {
                this.scannerGlyphCipher.innerText = cipherGlyphs[Math.floor(Math.random() * cipherGlyphs.length)];
            }
            if (this.scannerFreqVal) {
                this.scannerFreqVal.innerText = (110 + Math.random() * 88).toFixed(2);
            }

            // Radar audio sweep
            if (step % 2 === 0) {
                try { window.soundFX.playScanSweep(step); } catch(e) {}
            }

            // Dynamic telemetry readout
            if (this.scannerTelemetryText) {
                if (elapsed < 350) {
                    this.scannerTelemetryText.innerText = `> ${t('scanner_telemetry_1')}`;
                } else if (elapsed < 750) {
                    this.scannerTelemetryText.innerText = `> ${t('scanner_telemetry_2')}`;
                } else {
                    this.scannerTelemetryText.innerText = `> ${t('scanner_telemetry_3')}`;
                }
            }

            // Signal Lock Trigger
            if (elapsed >= duration) {
                clearInterval(this.scannerInterval);
                this.scannerInterval = null;
                this.lockAndRevealScanner(pet);
            }
        }, 60);
    }

    lockAndRevealScanner(pet) {
        if (this.scannerInterval) {
            clearInterval(this.scannerInterval);
            this.scannerInterval = null;
        }

        try {
            // Step 1: Signal Locked visuals
            if (this.scannerGlyphCipher) this.scannerGlyphCipher.innerText = (pet && pet.icon) ? pet.icon : '⬡';
            if (this.scannerLaser) this.scannerLaser.classList.add('locked');
            if (this.scannerStatusText) this.scannerStatusText.innerText = `>> ${t('scanner_status_lock')} <<`;
            if (this.scannerLockTag) this.scannerLockTag.innerText = `[ ${t('scanner_lock_tag_lock')} ]`;
            if (this.scannerFreqVal) this.scannerFreqVal.innerText = '142.85 (LOCK)';
            if (this.scannerProgressBar) this.scannerProgressBar.style.width = '100%';
            this.screenShake = 6;
        } catch(e) {
            console.warn('Scanner lock visuals warning:', e);
        }

        try {
            window.soundFX.playScanLock();
        } catch(e) {}

        // Step 2: Transition to Reveal Card after 320ms
        if (this.scannerTimeout) clearTimeout(this.scannerTimeout);
        this.scannerTimeout = setTimeout(() => {
            this.showRevealCard(pet);
        }, 320);
    }

    showRevealCard(pet) {
        this.isScanning = false;
        if (this.scannerWatchdog) clearTimeout(this.scannerWatchdog);

        try {
            if (this.scannerActiveSearch) this.scannerActiveSearch.classList.add('hidden');
            if (this.scannerRevealCard) {
                this.scannerRevealCard.classList.remove('hidden');

                const rKey = (pet && pet.rarityKey) ? pet.rarityKey : 'common';
                const rName = (pet && pet.rarityKey) ? (t('pet_' + pet.rarityKey + '_rarity') || pet.rarity) : 'Common';
                const icon = (pet && pet.icon) ? pet.icon : '⬡';
                const name = (pet && pet.rarityKey) ? (t('pet_' + pet.rarityKey + '_name') || pet.name) : 'Drone';
                const mult = (pet && pet.mult) ? pet.mult.toFixed(1) : '1.0';
                const energy = (pet && pet.bonusEnergy) ? pet.bonusEnergy : 2;
                const desc = (pet && pet.rarityKey) ? (t('pet_' + pet.rarityKey + '_desc') || pet.desc) : `${t('to_coins')} ✖ ${mult}, ${t('to_thrust')} +${energy} ⚡`;

                if (this.scannerRevealBadge) {
                    this.scannerRevealBadge.className = `scanner-rarity-banner badge-${rKey}`;
                    this.scannerRevealBadge.innerText = `★ ${rName.toUpperCase()} ${t('scanner_reveal_drone') || 'DRONE'} ★`;
                }
                if (this.scannerRevealIcon) {
                    this.scannerRevealIcon.innerText = icon;
                    this.scannerRevealIcon.className = `scanner-reveal-icon icon-${rKey}`;
                }
                if (this.scannerRevealName) this.scannerRevealName.innerText = name;
                if (this.scannerRevealMult) this.scannerRevealMult.innerText = `✖ ${mult} 💵 ${t('to_coins')}`;
                if (this.scannerRevealEnergy) this.scannerRevealEnergy.innerText = `+${energy} ⚡ ${t('to_thrust')}`;
                if (this.scannerRevealDesc) this.scannerRevealDesc.innerText = desc;
            }

            try {
                window.soundFX.playRarityReveal(pet ? pet.rarityKey : 'common');
            } catch(e) {}

            if (this.floatingTexts) {
                this.floatingTexts.push({
                    text: (typeof LOCALES !== 'undefined' && LOCALES[window.currentLang || 'en']?.float_new_module) ? LOCALES[window.currentLang || 'en'].float_new_module(pet ? (t('pet_' + pet.rarityKey + '_rarity') || pet.rarity) : 'MODULE', pet ? pet.icon : '⬡', pet ? (t('pet_' + pet.rarityKey + '_name') || pet.name) : '') : `NEW MODULE: [${pet ? pet.rarity : 'MODULE'}] ${pet ? pet.icon : '⬡'} ${pet ? pet.name : ''}!`,
                    x: this.canvas.width / 2,
                    y: this.canvas.height / 2,
                    life: 3.0,
                    color: '#121315'
                });
            }
        } catch(err) {
            console.error('Error in showRevealCard:', err);
            // Bulletproof fallback
            if (this.scannerActiveSearch) this.scannerActiveSearch.classList.add('hidden');
            if (this.scannerRevealCard) this.scannerRevealCard.classList.remove('hidden');
        }
    }

    equipScannerPet() {
        if (!this.pendingWonPet) return;
        this.pets.forEach(p => p.equipped = false);
        this.pendingWonPet.equipped = true;
        this.selectedPetId = this.pendingWonPet.id;
        try { window.soundFX.playClick(); } catch(e) {}
        this.closeScannerModal();
    }

    stashScannerPet() {
        if (this.pendingWonPet) {
            this.selectedPetId = this.pendingWonPet.id;
        }
        try { window.soundFX.playClick(); } catch(e) {}
        this.closeScannerModal();
    }

    closeScannerModal() {
        this.isScanning = false;
        if (this.scannerInterval) clearInterval(this.scannerInterval);
        if (this.scannerTimeout) clearTimeout(this.scannerTimeout);
        if (this.scannerWatchdog) clearTimeout(this.scannerWatchdog);
        if (this.scannerModal) this.scannerModal.classList.add('hidden');
        this.save();
        this.updateHUD();
        this.renderPetsModal();
    }

    isModalOpen() {
        return !!document.querySelector('.modal-overlay:not(.hidden)');
    }

    renderPetsModal() {
        const countEl = document.getElementById('pet-hangar-count');
        if (countEl) {
            countEl.innerText = `(${this.pets.length})`;
        }

        const listEl = document.getElementById('pets-grid');
        if (!listEl) return;
        listEl.innerHTML = '';

        // Sorting by rarity or level
        const rarityWeights = { 'mythic': 5, 'legendary': 4, 'epic': 3, 'rare': 2, 'common': 1 };
        const sortedPets = [...this.pets].sort((a, b) => {
            if (this.droneSortMode === 'level') {
                const diffLvl = (b.level || 1) - (a.level || 1);
                if (diffLvl !== 0) return diffLvl;
                return (rarityWeights[b.rarityKey] || 0) - (rarityWeights[a.rarityKey] || 0);
            } else {
                // Default: Rarity descending
                const diffRarity = (rarityWeights[b.rarityKey] || 0) - (rarityWeights[a.rarityKey] || 0);
                if (diffRarity !== 0) return diffRarity;
                return (b.level || 1) - (a.level || 1);
            }
        });

        sortedPets.forEach(pet => {
            const rKey = pet.rarityKey || 'common';
            const card = document.createElement('div');
            card.className = `pet-card pet-rarity-${rKey} ${pet.id === this.selectedPetId ? 'selected' : ''} ${pet.equipped ? 'equipped' : ''}`;
            card.innerHTML = `
                ${pet.equipped ? `<div class="pet-equipped-badge">${t('badge_equipped')}</div>` : ''}
                <div class="pet-card-top">
                    <span class="pet-rarity-pill ${rKey}">${t('pet_' + rKey + '_rarity') || pet.rarity || 'Common'}</span>
                    <span class="pet-lvl-pill">${t('pet_lvl_label')} ${pet.level}</span>
                </div>
                <div class="pet-card-icon-wrap">
                    <span class="pet-card-icon">${pet.icon}</span>
                </div>
                <div class="pet-card-name">${t('pet_' + rKey + '_name') || pet.name}</div>
                <div class="pet-card-stats-chips">
                    <span class="pet-chip chip-money" title="${t('to_coins')}">✖ ${pet.mult.toFixed(1)} 💵</span>
                    <span class="pet-chip chip-power" title="${t('to_thrust')}">+${pet.bonusEnergy} ⚡</span>
                </div>
            `;
            card.onclick = (e) => {
                e.stopPropagation();
                this.selectedPetId = pet.id;
                this.renderPetsModal();
            };
            listEl.appendChild(card);
        });

        // Selected pet details
        const selected = this.pets.find(p => p.id === this.selectedPetId) || this.pets[0];
        const detailsEl = document.getElementById('selected-pet-details');
        if (selected && detailsEl) {
            this.selectedPetId = selected.id;
            const rKey = selected.rarityKey || 'common';

            const iconEl = document.getElementById('sel-pet-icon');
            if (iconEl) {
                iconEl.innerText = selected.icon;
                iconEl.className = `sel-pet-icon-big icon-${rKey}`;
            }

            const nameEl = document.getElementById('sel-pet-name');
            if (nameEl) nameEl.innerText = selected.name;

            const rarityEl = document.getElementById('sel-pet-rarity-badge');
            if (rarityEl) {
                rarityEl.innerText = t('pet_' + rKey + '_rarity') || selected.rarity || 'Common';
                rarityEl.className = `pet-rarity-badge badge-${rKey}`;
            }

            const lvlEl = document.getElementById('sel-pet-lvl');
            if (lvlEl) lvlEl.innerText = `${t('pet_lvl_label')} ${selected.level}`;

            const multEl = document.getElementById('sel-pet-mult');
            if (multEl) multEl.innerText = `✖ ${selected.mult.toFixed(1)} ${t('to_coins')}`;

            const energyEl = document.getElementById('sel-pet-energy');
            if (energyEl) energyEl.innerText = `+${selected.bonusEnergy} ⚡ ${t('to_thrust')}`;

            const descEl = document.getElementById('sel-pet-desc');
            if (descEl) {
                descEl.innerText = t('pet_' + rKey + '_desc') || selected.desc || '';
            }

            const equipBtn = document.getElementById('btn-pet-equip');
            if (equipBtn) {
                if (selected.equipped) {
                    equipBtn.innerText = t('btn_pet_unequip');
                    equipBtn.className = 'btn-pet-action action-unequip';
                } else {
                    equipBtn.innerText = t('btn_pet_equip_action');
                    equipBtn.className = 'btn-pet-action action-equip';
                }
            }

            const upgCost = Math.floor(1000 * Math.pow(1.75, selected.level - 1));
            const upgCostEl = document.getElementById('sel-pet-upg-cost');
            if (upgCostEl) upgCostEl.innerText = upgCost;
        }
        this.updateDroneFusionUI();
    }

    switchPetTab(tabName) {
        this.petCurrentTab = tabName;
        try { window.soundFX.playClick(); } catch(e) {}

        document.querySelectorAll('.pets-subnav-btn').forEach(btn => {
            if (btn.getAttribute('data-pettab') === tabName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        const panels = {
            hangar: document.getElementById('pet-tab-hangar'),
            scanner: document.getElementById('pet-tab-scanner'),
            fusion: document.getElementById('pet-tab-fusion')
        };

        Object.keys(panels).forEach(key => {
            const panel = panels[key];
            if (panel) {
                if (key === tabName) {
                    panel.classList.remove('hidden');
                } else {
                    panel.classList.add('hidden');
                }
            }
        });

        if (tabName === 'hangar') {
            this.renderPetsModal();
        } else if (tabName === 'scanner') {
            this.updateFreeScanUI();
        } else if (tabName === 'fusion') {
            this.updateDroneFusionUI();
        }
    }

    equipSelectedPet() {
        const pet = this.pets.find(p => p.id === this.selectedPetId);
        if (!pet) return;

        if (pet.equipped) {
            pet.equipped = false;
        } else {
            // Unequip others and equip this one
            this.pets.forEach(p => p.equipped = false);
            pet.equipped = true;
        }
        window.soundFX.playClick();
        this.save();
        this.updateHUD();
        this.renderPetsModal();
    }

    upgradeSelectedPet() {
        const pet = this.pets.find(p => p.id === this.selectedPetId);
        if (!pet) return;
        const cost = Math.floor(1000 * Math.pow(1.75, pet.level - 1));
        if (this.money >= cost) {
            this.money -= cost;
            pet.level += 1;
            pet.mult = parseFloat((pet.mult + 0.03).toFixed(2));
            pet.bonusEnergy += 1;
            window.soundFX.playUpgrade();
            this.save();
            this.updateHUD();
            this.renderPetsModal();
        } else {
            this.floatingTexts.push({
                text: (typeof LOCALES !== 'undefined' && LOCALES[window.currentLang || 'en']?.float_pet_need_cred) ? LOCALES[window.currentLang || 'en'].float_pet_need_cred(cost) : `NEED ${cost.toLocaleString()} CRED`,
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                life: 2.0,
                color: '#121315'
            });
            try { window.soundFX.playClick(); } catch(e) {}
        }
    }

    deleteSelectedPet() {
        if (this.pets.length <= 1) {
            this.floatingTexts.push({
                text: t('float_no_delete'),
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                life: 2.0,
                color: '#121315'
            });
            try { window.soundFX.playClick(); } catch(e) {}
            return;
        }
        const idx = this.pets.findIndex(p => p.id === this.selectedPetId);
        if (idx !== -1) {
            const wasEquipped = this.pets[idx].equipped;
            this.pets.splice(idx, 1);
            this.selectedPetId = this.pets[0].id;
            if (wasEquipped && this.pets.length > 0) {
                this.pets[0].equipped = true;
            }
            window.soundFX.playClick();
            this.save();
            this.updateHUD();
            this.renderPetsModal();
        }
    }

    checkSkinUnlocks(notify = false) {
        if (!Array.isArray(this.unlockedSkins)) {
            this.unlockedSkins = ['ninja'];
        }
        if (!this.unlockedSkins.includes('ninja')) {
            this.unlockedSkins.push('ninja');
        }

        if (Array.isArray(this.skinsCatalog)) {
            this.skinsCatalog.forEach(item => {
                if (!this.unlockedSkins.includes(item.id) && item.condition && item.condition(this)) {
                    this.unlockedSkins.push(item.id);
                    if (notify) {
                        this.floatingTexts.push({
                            text: (typeof LOCALES !== 'undefined' && LOCALES[window.currentLang || 'en']?.float_skin_new) ? LOCALES[window.currentLang || 'en'].float_skin_new(item.name) : `🔓 NEW SUIT: ${item.name}!`,
                            x: this.canvas.width / 2,
                            y: this.canvas.height * 0.42,
                            life: 3.0,
                            color: '#121315'
                        });
                        try { window.soundFX.playMilestone(); } catch(e) {}
                    }
                }
            });
        }

        // Ensure current skin is unlocked and valid
        if (!this.unlockedSkins.includes(this.skin)) {
            this.skin = this.unlockedSkins[0] || 'ninja';
        }
    }

    equipSelectedSkin() {
        const item = this.skinsCatalog.find(s => s.id === this.selectedSkinId);
        if (!this.unlockedSkins.includes(this.selectedSkinId)) {
            if (item && item.isVipExclusive) {
                this.buyVipStatus();
            }
            return;
        }
        this.skin = this.selectedSkinId;
        try { window.soundFX.playClick(); } catch(e) {}
        this.save();
        this.renderSkinsModal();
        const found = this.skinsCatalog.find(s => s.id === this.skin);
        this.floatingTexts.push({
            text: (typeof LOCALES !== 'undefined' && LOCALES[window.currentLang || 'en']?.float_skin_equipped) ? LOCALES[window.currentLang || 'en'].float_skin_equipped(found ? found.name : this.skin) : `SUIT EQUIPPED: ${found ? found.name : this.skin}!`,
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            life: 2.0,
            color: '#121315'
        });
    }

    buySelectedSkin() {
        const item = this.skinsCatalog.find(s => s.id === this.selectedSkinId);
        if (!item || !item.canBuyWithCrystals) return;
        if (this.rubies < item.canBuyWithCrystals) {
            this.floatingTexts.push({
                text: (typeof LOCALES !== 'undefined' && LOCALES[window.currentLang || 'en']?.float_skin_need_gems) ? LOCALES[window.currentLang || 'en'].float_skin_need_gems(item.canBuyWithCrystals) : `NEED ${item.canBuyWithCrystals} 💎!`,
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                life: 2.0,
                color: '#121315'
            });
            try { window.soundFX.playClick(); } catch(e) {}
            return;
        }

        this.rubies -= item.canBuyWithCrystals;
        if (!this.unlockedSkins.includes(item.id)) {
            this.unlockedSkins.push(item.id);
        }
        this.skin = item.id;
        try { window.soundFX.playMilestone(); } catch(e) {}
        this.save();
        this.updateHUD();
        this.renderSkinsModal();
        this.floatingTexts.push({
            text: (typeof LOCALES !== 'undefined' && LOCALES[window.currentLang || 'en']?.float_skin_unlocked) ? LOCALES[window.currentLang || 'en'].float_skin_unlocked(item.name) : `UNLOCKED: ${item.name}!`,
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            life: 2.5,
            color: '#121315'
        });
    }

    unlockSelectedSkinWithAd() {
        const item = this.skinsCatalog.find(s => s.id === this.selectedSkinId);
        if (!item || !item.canUnlockWithAd) return;
        if (this.unlockedSkins.includes(item.id)) return;

        const completeUnlock = () => {
            if (!this.unlockedSkins.includes(item.id)) {
                this.unlockedSkins.push(item.id);
            }
            this.skin = item.id;
            try { window.soundFX.playMilestone(); } catch(e) {}
            this.save();
            this.updateHUD();
            this.renderSkinsModal();
            this.floatingTexts.push({
                text: (typeof LOCALES !== 'undefined' && LOCALES[window.currentLang || 'en']?.float_skin_unlocked) ? LOCALES[window.currentLang || 'en'].float_skin_unlocked(item.name) : `UNLOCKED: ${item.name}!`,
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                life: 2.5,
                color: '#121315'
            });
        };

        if (window.platformBridge && typeof window.platformBridge.showRewarded === 'function') {
            window.platformBridge.showRewarded('skin_unlock_' + item.id, () => {
                completeUnlock();
            }, () => {
                // Ad closed or dismissed
            });
        } else {
            completeUnlock();
        }
    }

    renderSkinsModal() {
        this.checkSkinUnlocks();
        const gridEl = document.getElementById('skins-grid');
        if (!gridEl) return;
        gridEl.innerHTML = '';

        if (!this.selectedSkinId) {
            this.selectedSkinId = this.skin || 'ninja';
        }

        this.skinsCatalog.forEach(s => {
            const isUnlocked = this.unlockedSkins.includes(s.id);
            const isEquipped = (this.skin === s.id);
            const isSelected = (this.selectedSkinId === s.id);
            const isVipSkin = !!s.isVipExclusive;

            const card = document.createElement('div');
            card.className = `skin-card ${isSelected ? 'selected' : ''} ${isEquipped ? 'equipped' : ''} ${!isUnlocked ? 'locked' : ''} ${isVipSkin ? 'vip-skin' : ''}`;
            card.innerHTML = `
                ${isEquipped ? `<div class="skin-equipped-pill">${t('badge_equipped')}</div>` : ''}
                ${!isUnlocked ? `<div class="skin-lock-badge">${isVipSkin ? '★' : '🔒'}</div>` : ''}
                <span class="skin-card-icon">${s.icon}</span>
                <div class="skin-card-name">${s.name}</div>
                <div class="skin-card-tag">${isEquipped ? t('skin_card_active') : (isUnlocked ? t('skin_card_open') : (isVipSkin ? 'VIP' : t('skin_card_closed')))}</div>
            `;
            card.onclick = (e) => {
                e.stopPropagation();
                this.selectedSkinId = s.id;
                this.renderSkinsModal();
            };
            gridEl.appendChild(card);
        });

        // Render inspection details
        const selected = this.skinsCatalog.find(s => s.id === this.selectedSkinId) || this.skinsCatalog[0];
        const isUnlocked = this.unlockedSkins.includes(selected.id);
        const isEquipped = (this.skin === selected.id);

        const nameEl = document.getElementById('sel-skin-name');
        if (nameEl) nameEl.innerText = selected.name;

        const titleEl = document.getElementById('sel-skin-title');
        if (titleEl) titleEl.innerText = selected.title || t('skins_title');

        const badgeEl = document.getElementById('sel-skin-badge');
        if (badgeEl) {
            if (selected.isVipExclusive && !isUnlocked) {
                badgeEl.innerText = t('skin_badge_vip') || '★ VIP';
                badgeEl.className = 'skin-badge-status vip';
            } else {
                badgeEl.innerText = isEquipped ? t('skin_badge_equipped') : (isUnlocked ? t('skin_badge_unlocked') : t('skin_badge_locked'));
                badgeEl.className = isEquipped ? 'skin-badge-status equipped' : (isUnlocked ? 'skin-badge-status available' : 'skin-badge-status locked');
            }
        }

        const descEl = document.getElementById('sel-skin-desc');
        if (descEl) descEl.innerText = selected.desc;

        const perkEl = document.getElementById('sel-skin-perk');
        if (perkEl) perkEl.innerText = selected.perk || '';

        const unlockEl = document.getElementById('sel-skin-unlock');
        if (unlockEl) unlockEl.innerText = selected.unlockDesc || '';

        const btnEquip = document.getElementById('btn-skin-equip');
        const btnBuy = document.getElementById('btn-skin-buy');
        const btnAd = document.getElementById('btn-skin-ad');

        if (btnEquip) {
            if (isEquipped) {
                btnEquip.innerText = t('skin_btn_current');
                btnEquip.className = 'btn-skin-action action-equipped';
                btnEquip.disabled = true;
                btnEquip.classList.remove('hidden');
            } else if (isUnlocked) {
                btnEquip.innerText = t('btn_skin_equip');
                btnEquip.className = 'btn-skin-action action-equip';
                btnEquip.disabled = false;
                btnEquip.classList.remove('hidden');
            } else if (selected.isVipExclusive) {
                btnEquip.innerText = t('btn_skin_get_vip') || 'ПОЛУЧИТЬ VIP (99 ЯН)';
                btnEquip.className = 'btn-skin-action action-vip';
                btnEquip.disabled = false;
                btnEquip.classList.remove('hidden');
            } else {
                if (selected.canUnlockWithAd || selected.canBuyWithCrystals) {
                    btnEquip.classList.add('hidden');
                } else {
                    btnEquip.innerText = t('skin_btn_locked');
                    btnEquip.className = 'btn-skin-action action-locked';
                    btnEquip.disabled = true;
                    btnEquip.classList.remove('hidden');
                }
            }
        }

        if (btnBuy) {
            if (!isUnlocked && selected.canBuyWithCrystals) {
                btnBuy.innerText = t('btn_skin_buy_crystals').replace('{n}', selected.canBuyWithCrystals);
                btnBuy.className = 'btn-skin-action action-buy';
                btnBuy.classList.remove('hidden');
            } else {
                btnBuy.classList.add('hidden');
            }
        }

        if (btnAd) {
            if (!isUnlocked && selected.canUnlockWithAd) {
                btnAd.innerText = t('btn_skin_unlock_ad');
                btnAd.className = 'btn-skin-action action-ad';
                btnAd.classList.remove('hidden');
            } else {
                btnAd.classList.add('hidden');
            }
        }

        // Draw animated preview on skinPreviewCanvas
        try {
            if (this.skinPreviewCanvas && this.skinPreviewCtx && typeof Sprites !== 'undefined') {
                const ctx = this.skinPreviewCtx;
                const w = this.skinPreviewCanvas.width;
                const h = this.skinPreviewCanvas.height;
                ctx.clearRect(0, 0, w, h);

                // Draw a subtle floor line
                ctx.strokeStyle = '#c7c5bc';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(10, h - 25);
                ctx.lineTo(w - 10, h - 25);
                ctx.stroke();

                // Draw character centered
                if (typeof Sprites.drawCharacterPreview === 'function') {
                    Sprites.drawCharacterPreview(ctx, w / 2, h - 35, selected.id, this.time, 2.2);
                }
            }
        } catch (err) {
            console.error('Skin preview render error:', err);
        }
    }

    performRebirth() {
        if (this.money < this.rebirthCost) return;

        this.rebirthCount++;
        const crystalReward = Math.min(5, 1 + this.rebirthCount);
        this.rubies += crystalReward;
        this.money = 0;
        this.rebirthCost = Math.floor(this.rebirthCost * 4.2);

        // Reset base upgrades for a fresh, fast-scaling run with high multiplier!
        this.upgrades = {
            jumpPower: { level: 1, basePower: 6, cost: 400 },
            boostSpeed: { level: 1, duration: 2.8, multStep: 0.10, cost: 800 },
            aerodynamics: { level: 0, cost: 600, multStep: 0.08 },
            critTap: { level: 1, cost: 1200, chance: 0.08 }
        };

        // Unlock new skins (e.g. Zombie on Rebirth 1, Cyborg on Rebirth 2, Phantom on Rebirth 3)
        this.checkSkinUnlocks(true);

        window.soundFX.playMilestone();
        this.floatingTexts.push({
            text: (typeof LOCALES !== 'undefined' && LOCALES[window.currentLang || 'en']?.float_rebirth) ? LOCALES[window.currentLang || 'en'].float_rebirth(this.rebirthCount, crystalReward) : `REBIRTH #${this.rebirthCount}! +100% INCOME AND +${crystalReward} 💎!`,
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            life: 3.5,
            color: '#121315'
        });

        document.getElementById('modal-rebirth').classList.add('hidden');
        this.save();
        this.updateHUD();

        // Major milestone interstitial ad & viral hooks
        if (window.platformBridge) {
            window.platformBridge.showInterstitial();
            window.platformBridge.requestReview();
            window.platformBridge.requestShortcut();
        }
    }

    openModal(name) {
        if (window.platformBridge) window.platformBridge.stopGameplay();

        // Exploit prevention: only Settings can be opened during flight/charge.
        // Upgrades, Pets, and Rebirth are only accessible during IDLE / MONEY_RAIN.
        if (name !== 'settings' && this.state !== 'IDLE' && this.state !== 'MONEY_RAIN') {
            return;
        }

        window.soundFX.playClick();
        if (name === 'upgrades') this.upgradesModal.classList.remove('hidden');
        if (name === 'pets') {
            this.updateFreeScanUI();
            this.switchPetTab(this.petCurrentTab || 'hangar');
            this.petsModal.classList.remove('hidden');
        }
        if (name === 'rebirth') this.rebirthModal.classList.remove('hidden');
        if (name === 'skins') {
            if (this.skinsModal) this.skinsModal.classList.remove('hidden');
            try {
                this.renderSkinsModal();
            } catch (err) {
                console.error('Error rendering skins modal:', err);
            }
        }
        if (name === 'stats') {
            this.renderStatsModal();
            if (this.statsModal) this.statsModal.classList.remove('hidden');
        }
        if (name === 'settings') {
            this.updateSettingsUI();
            if (this.resetConfirmBox) this.resetConfirmBox.classList.add('hidden');
            if (this.settingsModal) this.settingsModal.classList.remove('hidden');
        }
    }

    toggleModal(name) {
        if (name !== 'settings' && this.state !== 'IDLE' && this.state !== 'MONEY_RAIN') {
            return;
        }

        let modal = null;
        if (name === 'upgrades') modal = this.upgradesModal;
        else if (name === 'pets') modal = this.petsModal;
        else if (name === 'rebirth') modal = this.rebirthModal;
        else if (name === 'skins') modal = this.skinsModal;
        else if (name === 'stats') modal = this.statsModal;
        else if (name === 'settings') modal = this.settingsModal;

        if (!modal) return;
        if (modal.classList.contains('hidden')) {
            this.openModal(name);
        } else {
            modal.classList.add('hidden');
            if (name === 'settings' && this.resetConfirmBox) {
                this.resetConfirmBox.classList.add('hidden');
            }
            try { window.soundFX.playClick(); } catch(e) {}
        }
    }

    closeAllModals() {
        if (this.upgradesModal) this.upgradesModal.classList.add('hidden');
        if (this.petsModal) this.petsModal.classList.add('hidden');
        if (this.rebirthModal) this.rebirthModal.classList.add('hidden');
        if (this.skinsModal) this.skinsModal.classList.add('hidden');
        if (this.modalOffline) this.modalOffline.classList.add('hidden');
        if (this.landingDoubleBanner) this.landingDoubleBanner.classList.add('hidden');
        if (this.settingsModal) {
            this.settingsModal.classList.add('hidden');
            if (this.resetConfirmBox) this.resetConfirmBox.classList.add('hidden');
        }
        if (this.scannerModal) this.closeScannerModal();
    }

    // --- MONETIZATION & ADS LOGIC ---

    toggleTurboBoost() {
        if (this.state !== 'IDLE') return;
        if (this.isTurboBoosted) {
            this.isTurboBoosted = false;
            this.updateTurboUI();
            this.save();
            return;
        }

        if (window.platformBridge) {
            window.platformBridge.showRewarded('turbo_boost', () => {
                this.isTurboBoosted = true;
                this.updateTurboUI();
                this.save();
                try { window.soundFX.playUpgrade(); } catch(e) {}
                this.floatingTexts.push({
                    text: t('float_turbo_ready'),
                    x: this.canvas.width / 2,
                    y: this.canvas.height * 0.45,
                    life: 2.2,
                    color: '#121315'
                });
            });
        }
    }

    updateTurboUI() {
        if (!this.btnTurboBoost) return;
        if (this.isTurboBoosted) {
            this.btnTurboBoost.classList.add('turbo-active');
            this.btnTurboBoost.innerHTML = `<span class="turbo-badge">${t('turbo_active')}</span><span class="turbo-ad-tag">${t('turbo_ready')}</span>`;
        } else {
            this.btnTurboBoost.classList.remove('turbo-active');
            this.btnTurboBoost.innerHTML = `<span class="turbo-badge">${t('turbo_badge')}</span><span class="turbo-ad-tag">${t('turbo_ad_tag')}</span>`;
        }
    }

    claimDoubleReward() {
        if (this.hasClaimedDoubleForThisFlight || this.lastFlightReward <= 0) return;

        if (window.platformBridge) {
            window.platformBridge.showRewarded('flight_double', () => {
                this.hasClaimedDoubleForThisFlight = true;
                this.money += this.lastFlightReward;
                if (this.landingDoubleBanner) this.landingDoubleBanner.classList.add('hidden');
                if (this.state === 'IDLE' && this.promptIdle) {
                    this.promptIdle.classList.remove('hidden');
                }
                try { window.soundFX.playCoin(); } catch(e) {}
                this.floatingTexts.push({
                    text: (typeof LOCALES !== 'undefined' && LOCALES[window.currentLang || 'en']?.float_double_bonus) ? LOCALES[window.currentLang || 'en'].float_double_bonus(this.lastFlightReward) : `★ ✖2 BONUS: +${this.lastFlightReward.toLocaleString()} CRED! ★`,
                    x: this.canvas.width / 2,
                    y: this.canvas.height * 0.4,
                    life: 2.8,
                    color: '#121315'
                });
                this.save();
                this.updateHUD();
            });
        }
    }

    checkOfflineIncome() {
        const now = Date.now();
        const elapsedSec = Math.floor((now - (this.lastExitTimestamp || now)) / 1000);
        // Minimum absence 60 seconds (1 minute)
        if (elapsedSec >= 60) {
            const cappedSec = Math.min(36000, elapsedSec); // 10 hours max
            const totalDroneEnergy = this.pets.reduce((acc, p) => acc + (p.bonusEnergy || 0), 0);
            const ratePerSec = 0.5 * (1 + this.rebirthCount) + totalDroneEnergy * 0.25;
            this.pendingOfflineCredits = Math.max(10, Math.floor(ratePerSec * cappedSec));

            const hrs = Math.floor(elapsedSec / 3600);
            const mins = Math.floor((elapsedSec % 3600) / 60);

            if (this.offlineTimeText) {
                this.offlineTimeText.innerText = `${t('offline_absence_label')}: ${hrs}${t('h_short')} ${mins}${t('m_short')}`;
            }
            if (this.offlineAmountVal) {
                this.offlineAmountVal.innerText = `+${this.pendingOfflineCredits.toLocaleString('ru-RU')}`;
            }
            if (this.modalOffline) {
                this.modalOffline.classList.remove('hidden');
            }
        }
        this.lastExitTimestamp = now;
        this.save();
    }

    claimOfflineIncome(isX3WithAd = false) {
        if (this.pendingOfflineCredits <= 0) {
            if (this.modalOffline) this.modalOffline.classList.add('hidden');
            return;
        }

        if (isX3WithAd) {
            if (window.platformBridge) {
                window.platformBridge.showRewarded('offline_x2', () => {
                    const totalCred = this.pendingOfflineCredits * 2;
                    this.money += totalCred;
                    this.rubies += 1;
                    this.pendingOfflineCredits = 0;
                    if (this.modalOffline) this.modalOffline.classList.add('hidden');
                    try { window.soundFX.playMilestone(); } catch(e) {}
                    const lang = window.currentLang || 'en';
                    const floatFn = (typeof LOCALES !== 'undefined' && LOCALES[lang]?.float_offline_x3) 
                        ? LOCALES[lang].float_offline_x3 
                        : (n) => `★ OFFLINE ✖2: +${n.toLocaleString()} CRED AND +1 💎! ★`;
                    this.floatingTexts.push({
                        text: floatFn(totalCred),
                        x: this.canvas.width / 2,
                        y: this.canvas.height / 2,
                        life: 3.5,
                        color: '#121315'
                    });
                    this.save();
                    this.updateHUD();
                });
            }
        } else {
            const cred = this.pendingOfflineCredits;
            this.money += cred;
            this.pendingOfflineCredits = 0;
            if (this.modalOffline) this.modalOffline.classList.add('hidden');
            try { window.soundFX.playCoin(); } catch(e) {}
            this.floatingTexts.push({
                text: (typeof LOCALES !== 'undefined' && LOCALES[window.currentLang || 'en']?.float_offline) ? LOCALES[window.currentLang || 'en'].float_offline(cred) : `OFFLINE: +${cred.toLocaleString()} CRED!`,
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                life: 2.5,
                color: '#121315'
            });
            this.save();
            this.updateHUD();
        }
    }

    updateSettingsUI() {
        const isSoundOn = window.soundFX && window.soundFX.enabled;
        if (this.settingsSoundIcon) {
            this.settingsSoundIcon.innerText = isSoundOn ? '🔊' : '🔇';
        }
        if (this.settingsSoundText) {
            this.settingsSoundText.innerText = isSoundOn ? t('settings_sound_on') : t('settings_sound_off');
        }
        if (this.btnSettingsSound) {
            if (isSoundOn) {
                this.btnSettingsSound.classList.remove('is-muted');
            } else {
                this.btnSettingsSound.classList.add('is-muted');
            }
        }

        const btnBuyVip = document.getElementById('btn-buy-vip');
        const vipActiveBanner = document.getElementById('vip-active-banner');
        if (this.isVip) {
            if (btnBuyVip) btnBuyVip.classList.add('hidden');
            if (vipActiveBanner) vipActiveBanner.classList.remove('hidden');
        } else {
            if (btnBuyVip) btnBuyVip.classList.remove('hidden');
            if (vipActiveBanner) vipActiveBanner.classList.add('hidden');
        }
    }

    buyVipStatus() {
        if (this.isVip) {
            this.floatingTexts.push({
                text: t('vip_active_badge') || '★ VIP СТАТУС АКТИВЕН',
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                life: 2.0,
                color: '#f59e0b'
            });
            return;
        }

        if (window.platformBridge && typeof window.platformBridge.purchaseVip === 'function') {
            window.platformBridge.purchaseVip(() => {
                this.applyVipStatus(true);
                try { window.soundFX.playMilestone(); } catch(e) {}
                this.floatingTexts.push({
                    text: t('vip_purchased_alert') || '★ VIP СТАТУС АКТИВИРОВАН! НЕБОЖИТЕЛЬ РАЗБЛОКИРОВАН!',
                    x: this.canvas.width / 2,
                    y: this.canvas.height / 2,
                    life: 3.5,
                    color: '#f59e0b'
                });
            }, (err) => {
                console.warn('VIP purchase cancelled or failed:', err);
            });
        }
    }

    applyVipStatus(active = true) {
        this.isVip = !!active;
        try {
            localStorage.setItem('antigravity_vip_status', active ? 'true' : 'false');
        } catch(e) {}

        if (active) {
            if (!this.unlockedSkins.includes('celestial')) {
                this.unlockedSkins.push('celestial');
            }
            this.skin = 'celestial';
            this.selectedSkinId = 'celestial';
        }
        this.save();
        this.updateHUD();
        this.updateSettingsUI();
        const modalSkins = document.getElementById('modal-skins');
        if (modalSkins && !modalSkins.classList.contains('hidden')) {
            this.renderSkinsModal();
        }
    }

    resetAllProgress() {
        try {
            localStorage.removeItem('pixel_jump_save');
        } catch(e) {
            console.warn('Storage reset warning:', e);
        }

        this.money = 0;
        this.rubies = 1;
        this.record = 0;
        this.rebirthCount = 0;
        this.rebirthCost = 8000;
        this.skin = 'ninja';
        this.unlockedSkins = ['ninja'];
        this.selectedSkinId = 'ninja';
        this.lastExitTimestamp = Date.now();
        this.lastFreeScanTimestamp = 0;
        this.isTurboBoosted = false;
        this.pendingOfflineCredits = 0;
        this.lastFlightReward = 0;
        this.hasClaimedDoubleForThisFlight = false;
        this.updateTurboUI();
        this.updateFreeScanUI();
        this.upgrades = {
            jumpPower: { level: 1, basePower: 6, cost: 400 },
            boostSpeed: { level: 1, duration: 2.8, multStep: 0.10, cost: 800 },
            aerodynamics: { level: 0, cost: 600, multStep: 0.08 },
            critTap: { level: 1, cost: 1200, chance: 0.08 }
        };
        this.hallOfFame = [];
        this.stats = {
            totalDistance: 0,
            totalJumps: 0,
            maxMult: 1.0,
            totalPetsDiscovered: 1
        };
        this.droneFusionBoosted = false;
        this.pets = [
            { id: 'pet_init', name: t('pet_common_name'), icon: '⬡', level: 1, mult: 1.10, bonusEnergy: 2, rarity: t('pet_common_rarity'), rarityKey: 'common', desc: t('pet_common_desc'), equipped: true }
        ];
        this.selectedPetId = this.pets[0].id;
        this.careerMilestones = [];
        this.reachedMilestones.clear();

        this.save();
        this.closeAllModals();
        this.updateHUD();
        this.updateAltitudeLadder();

        try { window.soundFX.playMilestone(); } catch(e) {}

        this.floatingTexts.push({
            text: t('float_reset'),
            x: this.canvas.width / 2,
            y: this.canvas.height / 2,
            life: 3.0,
            color: '#121315'
        });
    }

    updateAltitudeLadder() {
        const ladder = document.getElementById('desktop-altitude-ladder');
        if (!ladder) return;
        const marks = ladder.querySelectorAll('.scale-mark');
        const maxActiveAlt = Math.max(this.altitude || 0, this.peakAltitude || 0, this.record || 0);

        marks.forEach(mark => {
            const markAlt = parseInt(mark.dataset.alt || '0', 10);
            if (markAlt <= maxActiveAlt) {
                mark.classList.add('active');
            } else {
                mark.classList.remove('active');
            }
        });
    }

    applyLocale() {
        this.updateHUD();
        this.updateTurboUI();
        this.updateFreeScanUI();
        this.updateDroneFusionUI();
        this.updateSettingsUI();
    }

    save() {
        if (!this.isInitialized) return;
        const data = {
            saveVersion: 2,
            money: (typeof this.money === 'number' && !isNaN(this.money)) ? Math.max(0, Math.floor(this.money)) : 0,
            rubies: (typeof this.rubies === 'number' && !isNaN(this.rubies)) ? Math.max(0, Math.floor(this.rubies)) : 1,
            record: (typeof this.record === 'number' && !isNaN(this.record)) ? Math.max(0, Math.floor(this.record)) : 0,
            rebirthCount: (typeof this.rebirthCount === 'number' && !isNaN(this.rebirthCount)) ? Math.max(0, Math.floor(this.rebirthCount)) : 0,
            rebirthCost: (typeof this.rebirthCost === 'number' && !isNaN(this.rebirthCost)) ? Math.max(8000, Math.floor(this.rebirthCost)) : 8000,
            skin: this.skin || 'ninja',
            unlockedSkins: this.unlockedSkins || ['ninja'],
            upgrades: this.upgrades,
            hallOfFame: this.hallOfFame || [],
            stats: this.stats || {
                totalDistance: 0,
                totalJumps: 0,
                maxMult: 1.0,
                totalPetsDiscovered: 1
            },
            pets: this.pets,
            careerMilestones: this.careerMilestones,
            lastExitTimestamp: this.lastExitTimestamp || Date.now(),
            lastFreeScanTimestamp: this.lastFreeScanTimestamp || 0,
            isTurboBoosted: this.isTurboBoosted || false
        };
        try {
            localStorage.setItem('pixel_jump_save', JSON.stringify(data));
        } catch (e) {
            console.error('Save failed:', e);
        }
        if (window.platformBridge) {
            window.platformBridge.saveCloudData(data);
        }
    }

    loadSave() {
        try {
            const raw = localStorage.getItem('pixel_jump_save');
            if (raw) {
                const data = JSON.parse(raw);
                if (typeof data.money === 'number' && !isNaN(data.money)) {
                    this.money = Math.max(0, Math.floor(data.money));
                }
                if (typeof data.rubies === 'number' && !isNaN(data.rubies)) {
                    this.rubies = Math.max(0, Math.floor(data.rubies));
                }
                if (typeof data.record === 'number' && !isNaN(data.record)) {
                    this.record = Math.max(0, Math.floor(data.record));
                }
                if (typeof data.rebirthCount === 'number' && !isNaN(data.rebirthCount)) {
                    this.rebirthCount = Math.max(0, Math.floor(data.rebirthCount));
                }
                if (typeof data.rebirthCost === 'number' && !isNaN(data.rebirthCost)) {
                    this.rebirthCost = Math.max(8000, Math.floor(data.rebirthCost));
                }
                if (data.skin) this.skin = data.skin;
                if (Array.isArray(data.unlockedSkins)) this.unlockedSkins = data.unlockedSkins;
                if (Array.isArray(data.careerMilestones)) this.careerMilestones = data.careerMilestones;
                if (Array.isArray(data.hallOfFame)) this.hallOfFame = data.hallOfFame;
                if (data.stats) this.stats = data.stats;
                if (data.lastExitTimestamp) this.lastExitTimestamp = data.lastExitTimestamp;
                if (data.lastFreeScanTimestamp) this.lastFreeScanTimestamp = data.lastFreeScanTimestamp;
                if (typeof data.isTurboBoosted === 'boolean') this.isTurboBoosted = data.isTurboBoosted;

                this.checkSkinUnlocks();

                if (data.upgrades) {
                    this.upgrades = data.upgrades;
                    if (!this.upgrades.jumpPower) this.upgrades.jumpPower = { level: 1, basePower: 6, cost: 400 };
                    if (!this.upgrades.boostSpeed) this.upgrades.boostSpeed = { level: 1, duration: 2.8, multStep: 0.10, cost: 800 };
                    if (!this.upgrades.aerodynamics) this.upgrades.aerodynamics = { level: 0, cost: 600, multStep: 0.08 };
                    if (!this.upgrades.critTap) this.upgrades.critTap = { level: 1, cost: 1200, chance: 0.08 };
                    if (this.upgrades.jumpPower.cost < 400) this.upgrades.jumpPower.cost = 400;
                    if (this.upgrades.boostSpeed.cost < 800) this.upgrades.boostSpeed.cost = 800;
                    if (this.upgrades.aerodynamics.cost < 600) this.upgrades.aerodynamics.cost = 600;
                    if (this.upgrades.critTap.cost < 1200) this.upgrades.critTap.cost = 1200;
                }

                if (data.pets && Array.isArray(data.pets) && data.pets.length > 0) {
                    // Seamlessly convert and rebalance pets to the tight, exciting tier curve
                    this.pets = data.pets.map(p => {
                        const lvl = Math.max(1, p.level || 1);
                        if (p.icon === '😊' || p.name === 'Счастливчик' || p.name === 'Lucky' || p.icon === '⬡' || p.name === 'Гексагон' || p.name === 'Hexagon') {
                            return {
                                ...p, icon: '⬡', name: t('pet_common_name'), rarity: t('pet_common_rarity'), rarityKey: 'common',
                                mult: parseFloat((1.10 + (lvl - 1) * 0.02).toFixed(2)),
                                bonusEnergy: 2 + (lvl - 1) * 2,
                                desc: t('pet_common_desc')
                            };
                        }
                        if (p.icon === '😎' || p.name === 'Крутой' || p.name === 'Cool' || p.icon === '◈' || p.name === 'Ромб' || p.name === 'Rhomb') {
                            return {
                                ...p, icon: '◈', name: t('pet_rare_name'), rarity: t('pet_rare_rarity'), rarityKey: 'rare',
                                mult: parseFloat((1.25 + (lvl - 1) * 0.03).toFixed(2)),
                                bonusEnergy: 5 + (lvl - 1) * 2,
                                desc: t('pet_rare_desc')
                            };
                        }
                        if (p.icon === '🤑' || p.name === 'Богач' || p.name === 'Rich' || p.icon === '✦' || p.name === 'Квазар' || p.name === 'Quasar') {
                            return {
                                ...p, icon: '✦', name: t('pet_epic_name'), rarity: t('pet_epic_rarity'), rarityKey: 'epic',
                                mult: parseFloat((1.50 + (lvl - 1) * 0.04).toFixed(2)),
                                bonusEnergy: 12 + (lvl - 1) * 3,
                                desc: t('pet_epic_desc')
                            };
                        }
                        if (p.icon === '😉' || p.name === 'Подмигивающий' || p.name === 'Winker' || p.icon === '◉' || p.name === 'Сфера' || p.name === 'Sphere') {
                            return {
                                ...p, icon: '◉', name: t('pet_legendary_name'), rarity: t('pet_legendary_rarity'), rarityKey: 'legendary',
                                mult: parseFloat((2.00 + (lvl - 1) * 0.05).toFixed(2)),
                                bonusEnergy: 25 + (lvl - 1) * 5,
                                desc: t('pet_legendary_desc')
                            };
                        }
                        if (p.icon === '😈' || p.name === 'Дьяволёнок' || p.name === 'Imp' || p.icon === '◬' || p.name === 'Дельта' || p.name === 'Delta' || p.name === 'Сингуляр' || p.name === 'Singular' || p.icon === '🜂') {
                            return {
                                ...p, icon: '🜂', name: t('pet_mythic_name'), rarity: t('pet_mythic_rarity'), rarityKey: 'mythic',
                                mult: parseFloat((3.00 + (lvl - 1) * 0.08).toFixed(2)),
                                bonusEnergy: 50 + (lvl - 1) * 8,
                                desc: t('pet_mythic_desc')
                            };
                        }
                        return {
                            ...p,
                            rarity: p.rarity || t('pet_common_rarity'),
                            rarityKey: p.rarityKey || 'common',
                            desc: p.desc || t('pet_common_desc')
                        };
                    });
                    const equipped = this.getEquippedPet();
                    this.selectedPetId = equipped ? equipped.id : this.pets[0]?.id;
                }
            }
        } catch (e) {
            console.error('Load save error, using defaults:', e);
        }
        this.updateHUD();
    }

    mergeCloudSave(cloudData) {
        if (!cloudData || typeof cloudData !== 'object') return;
        let modified = false;

        if (typeof cloudData.record === 'number' && !isNaN(cloudData.record) && cloudData.record > this.record) {
            this.record = Math.floor(cloudData.record);
            modified = true;
        }
        if (typeof cloudData.money === 'number' && !isNaN(cloudData.money) && cloudData.money > this.money) {
            this.money = Math.floor(cloudData.money);
            modified = true;
        }
        if (typeof cloudData.rubies === 'number' && !isNaN(cloudData.rubies) && cloudData.rubies > this.rubies) {
            this.rubies = Math.floor(cloudData.rubies);
            modified = true;
        }
        if (typeof cloudData.rebirthCount === 'number' && !isNaN(cloudData.rebirthCount) && cloudData.rebirthCount > this.rebirthCount) {
            this.rebirthCount = Math.floor(cloudData.rebirthCount);
            if (cloudData.rebirthCost) this.rebirthCost = Math.floor(cloudData.rebirthCost);
            modified = true;
        }
        if (Array.isArray(cloudData.pets) && cloudData.pets.length > this.pets.length) {
            this.pets = cloudData.pets;
            modified = true;
        }
        if (Array.isArray(cloudData.unlockedSkins)) {
            cloudData.unlockedSkins.forEach(s => {
                if (!this.unlockedSkins.includes(s)) {
                    this.unlockedSkins.push(s);
                    modified = true;
                }
            });
        }
        if (modified) {
            this.save();
            this.updateHUD();
            this.renderPetsModal();
            console.log('[JumpGame] Cloud save merged successfully');
        }
    }

    loop(timestamp) {
        if (!this.lastTime) {
            this.lastTime = timestamp;
        }
        const dt = Math.min((timestamp - this.lastTime) / 1000, 0.1);
        this.lastTime = timestamp;
        this.time += dt;

        this.update(dt);
        this.render();

        requestAnimationFrame(this.loop.bind(this));
    }

    update(dt) {
        // Periodic countdown refresh for ads UI
        if (Math.floor(this.time * 2) !== Math.floor((this.time - dt) * 2)) {
            if (this.petsModal && !this.petsModal.classList.contains('hidden')) {
                this.updateFreeScanUI();
            }
        }

        // Live preview animation for skins modal
        if (this.skinsModal && !this.skinsModal.classList.contains('hidden') && this.skinPreviewCanvas && this.skinPreviewCtx) {
            try {
                const ctx = this.skinPreviewCtx;
                const w = this.skinPreviewCanvas.width;
                const h = this.skinPreviewCanvas.height;
                ctx.clearRect(0, 0, w, h);
                ctx.strokeStyle = '#c7c5bc';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(10, h - 25);
                ctx.lineTo(w - 10, h - 25);
                ctx.stroke();
                const selId = this.selectedSkinId || this.skin || 'ninja';
                if (typeof Sprites !== 'undefined' && typeof Sprites.drawSkinChargeGroundAura === 'function') {
                    Sprites.drawSkinChargeGroundAura(ctx, w / 2, h - 25, selId, 1.0, this.time);
                }
                if (typeof Sprites !== 'undefined' && typeof Sprites.drawCharacterPreview === 'function') {
                    Sprites.drawCharacterPreview(ctx, w / 2, h - 35, selId, this.time, 2.2);
                }
            } catch (err) {}
        }

        // Screen shake decay
        if (this.screenShake > 0) {
            this.screenShake -= dt * 25;
            if (this.screenShake < 0) this.screenShake = 0;
        }

        // Smooth squash recovery
        this.characterSquash += (1.0 - this.characterSquash) * Math.min(1, dt * 14);

        // Shockwaves update
        this.shockwaves.forEach(sw => {
            sw.radius += sw.speed * dt;
            sw.alpha = Math.max(0, 1 - (sw.radius / sw.maxRadius));
        });
        this.shockwaves = this.shockwaves.filter(sw => sw.radius < sw.maxRadius && sw.alpha > 0);

        // Motion trail update during flight
        if (this.state === 'LAUNCH' || this.state === 'FALL') {
            const flightHeroY = this.canvas.height * 0.55;
            this.motionTrail.unshift({ y: flightHeroY, alpha: 0.6, velocity: this.velocity });
            if (this.motionTrail.length > 8) this.motionTrail.pop();
            this.motionTrail.forEach(t => t.alpha -= dt * 2.2);
            this.motionTrail = this.motionTrail.filter(t => t.alpha > 0);
        } else {
            this.motionTrail = [];
        }

        // Particle updates
        if (this.chargeParticles) {
            this.chargeParticles.forEach(p => {
                p.life -= dt;
                if (p.vx) p.x += p.vx * dt;
                if (p.vy) p.y += p.vy * dt;
                if (p.vRot) p.rot = (p.rot || 0) + p.vRot * dt;
            });
            this.chargeParticles = this.chargeParticles.filter(p => p.life > 0);
        }

        // Ambient charging micro-effects
        if (this.state === 'CHARGING' && Math.random() < 0.28) {
            const heroX = this.canvas.width / 2;
            const groundY = this.canvas.height - 175;
            this.spawnSkinChargeParticles(heroX, groundY, 0.4);
        }

        this.lightnings.forEach(p => {
            p.life -= dt;
        });
        this.lightnings = this.lightnings.filter(p => p.life > 0);

        if (this.sonicBooms) {
            this.sonicBooms.forEach(sb => {
                sb.radius += dt * 180;
                sb.alpha -= dt * 1.8;
            });
            this.sonicBooms = this.sonicBooms.filter(sb => sb.alpha > 0);
        }

        this.fallingMoney.forEach(m => {
            m.y += m.vy * dt;
            m.rotation += m.vRot * dt;
        });
        this.fallingMoney = this.fallingMoney.filter(m => m.y < this.canvas.height + 20);

        this.floatingTexts.forEach(ft => {
            ft.life -= dt;
            if (ft.isLocal) {
                ft.y -= 35 * dt;
            }
        });
        this.floatingTexts = this.floatingTexts.filter(ft => ft.life > 0);

        // State Machine Updates
        if (this.state === 'CHARGING') {
            this.timerRemaining -= dt;
            const progress = Math.max(0, this.timerRemaining / this.timerMax);
            if (this.timerFillEl) this.timerFillEl.style.width = `${progress * 100}%`;

            // Multiplier decay if player taps slowly
            const timeSinceTap = (performance.now() - this.lastTapTime) / 1000;
            if (timeSinceTap > 0.20 && this.chargeMultiplier > 1.0) {
                this.isDecaying = true;
                const decayBase = 0.65 + (this.chargeMultiplier - 1.0) * 0.28;
                const decayRate = (this.skin === 'zombie') ? decayBase * 0.75 : decayBase;
                this.chargeMultiplier = Math.max(1.0, this.chargeMultiplier - decayRate * dt);
                this.currentCharge = Math.floor(this.getTotalBasePower() * this.chargeMultiplier);
            } else {
                this.isDecaying = false;
            }

            // Update multiplier & energy displays live
            this.multValEl.innerText = this.chargeMultiplier.toFixed(2);
            if (this.multValChargeEl) this.multValChargeEl.innerText = `✖ ${this.chargeMultiplier.toFixed(2)}`;
            this.energyValHudEl.innerText = `${this.currentCharge} ⚡`;

            // Update decay warning badge
            if (this.decayBadge) {
                if (this.isDecaying && this.chargeMultiplier > 1.05) {
                    this.decayBadge.className = 'charge-flow-badge decaying';
                    if (this.decayIcon) this.decayIcon.innerText = '▼';
                    if (this.decayText) this.decayText.innerText = t('charge_peak');
                } else {
                    this.decayBadge.className = 'charge-flow-badge rising';
                    if (this.decayIcon) this.decayIcon.innerText = '▲';
                    if (this.decayText) this.decayText.innerText = t('charge_rising');
                }
            }

            if (this.timerRemaining <= 0) {
                this.launchHero();
            }
        } else if (this.state === 'LAUNCH') {
            this.ascentElapsed += dt;
            const progress = Math.min(1.0, this.ascentElapsed / this.ascentDuration);

            // Fast approach, smooth cubic ease-out deceleration to max point
            const ease = 1 - Math.pow(1 - progress, 2.8);
            this.altitude = this.targetAltitude * ease;

            // Velocity is derivative of ease curve: d(alt)/dt
            const remaining = Math.max(0, 1 - progress);
            const velMps = (progress < 1.0)
                ? (this.targetAltitude * 2.8 * Math.pow(remaining, 1.8)) / this.ascentDuration
                : 0;
            this.velocity = velMps / this.metresPerPixel;

            if (this.altitude > this.peakAltitude) {
                this.peakAltitude = this.altitude;
            }
            this.updateAltitudeLadder();

            this.altitudeText.innerText = `${Math.floor(this.altitude)}m`;
            if (this.altVector) {
                this.altVector.innerText = `▲ ${Math.floor(velMps)} m/s`;
            }

            // Procedural Milestone checks up to infinity
            this.checkFlightMilestones();

            // In-flight Kinetic Ring detection
            if (this.rings) {
                this.rings.forEach(ring => {
                    if (ring.active && Math.abs(this.altitude - ring.alt) < 45) {
                        ring.active = false;
                        window.soundFX.playBoostRing();
                        this.safeVibrate([40, 20, 50]);
                        this.screenShake = 12;
                        const ringBoostMult = (this.skin === 'celestial') ? 1.35 : ((this.skin === 'shaman') ? 1.25 : 1.15);
                        this.targetAltitude = Math.floor(this.targetAltitude * ringBoostMult);
                        this.showFlightAlert(t('alert_ring_intercept'));
                    }
                });
            }

            // Sonic Boom checks at 1,000m and 3,000m
            if (this.altitude >= 1000 && !this.passedSonicBooms.has(1000)) {
                this.passedSonicBooms.add(1000);
                window.soundFX.playSonicBoom();
                this.safeVibrate([60, 40, 80]);
                this.screenShake = 14;
                this.sonicBooms.push({
                    x: this.canvas.width / 2,
                    y: this.canvas.height * 0.55,
                    radius: 20,
                    alpha: 1.0
                });
                this.showFlightAlert(t('alert_mach1'));
            }
            if (this.altitude >= 3000 && !this.passedSonicBooms.has(3000)) {
                this.passedSonicBooms.add(3000);
                window.soundFX.playSonicBoom();
                this.safeVibrate([70, 50, 90]);
                this.screenShake = 16;
                this.sonicBooms.push({
                    x: this.canvas.width / 2,
                    y: this.canvas.height * 0.55,
                    radius: 24,
                    alpha: 1.0
                });
                this.showFlightAlert(t('alert_hypersonic'));
            }

            // Encounter landmark detection & cinematic escort companion (0 - 15,000,000m)
            if (Sprites.ENCOUNTER_LANDMARKS) {
                Sprites.ENCOUNTER_LANDMARKS.forEach(lm => {
                    if (this.altitude >= lm.alt && !this.seenEncounterLandmarks.has(lm.id)) {
                        this.seenEncounterLandmarks.add(lm.id);
                        try { window.soundFX.playMilestone(); } catch(e) {}
                        const lmName = (typeof Sprites.getLandmarkName === 'function') ? Sprites.getLandmarkName(lm) : lm.name;
                        this.showFlightAlert(`${t('alert_landmark_prefix')}: ${lmName}`);

                        // If an active companion already exists, smoothly eject it so they never cluster
                        if (this.activeEncounter) {
                            this.activeEncounter.state = 'exiting';
                            this.exitingEncounter = this.activeEncounter;
                            this.activeEncounter = null;
                        }

                        // Spawn new escort companion flying alongside the hero
                        this.activeEncounter = {
                            id: lm.id,
                            type: lm.type,
                            get name() { return (typeof Sprites.getLandmarkName === 'function') ? Sprites.getLandmarkName(this) : (lm.name || ''); },
                            get sub() { return (typeof Sprites.getLandmarkSub === 'function') ? Sprites.getLandmarkSub(this) : (lm.sub || ''); },
                            xRatio: lm.xRatio || 0.25,
                            currentY: -90,
                            targetY: this.canvas.height * 0.48,
                            alpha: 0,
                            state: 'entering',
                            timer: 4.5
                        };
                    }
                });
            }

            // In-flight Asteroid updates & proximity auto-intercept
            if (this.flightAsteroids) {
                this.flightAsteroids.forEach(ast => {
                    if (!ast.collected) {
                        ast.rotation = (ast.rotation || 0) + (ast.rotSpeed || 1.2) * dt;
                        // Proximity auto-intercept if player path intersects asteroid directly (horizontal center +/- 40px, altitude diff < 28m)
                        if (Math.abs(this.altitude - ast.alt) < 28 && Math.abs(ast.xRatio - 0.5) < 0.12) {
                            this.hitFlightAsteroid(ast, this.canvas.width * ast.xRatio, this.canvas.height * 0.55);
                        }
                    }
                });
            }

            // In-flight Crystal Geode proximity auto-intercept
            if (this.flightCrystal && !this.flightCrystal.collected) {
                if (Math.abs(this.altitude - this.flightCrystal.alt) < 30 && Math.abs(this.flightCrystal.xRatio - 0.5) < 0.14) {
                    this.collectFlightCrystal(this.canvas.width * this.flightCrystal.xRatio, this.canvas.height * 0.55);
                }
            }

            // Cosmic Anomaly detection & buff activation
            if (this.flightAnomaly) {
                if (!this.flightAnomaly.triggered && this.altitude >= this.flightAnomaly.minAlt && this.altitude <= this.flightAnomaly.maxAlt) {
                    this.flightAnomaly.triggered = true;
                    this.flightAnomaly.active = true;
                    try { window.soundFX.playAnomalyEnter(); } catch(e) {}
                    this.safeVibrate([50, 30, 70]);
                    this.screenShake = 12;
                    if (this.flightAnomaly.type === 'SOLAR_WIND') {
                        this.flightAnomalyMult = 2.0;
                        this.showFlightAlert(t('alert_anomaly'));
                    } else if (this.flightAnomaly.type === 'ION_STREAM') {
                        this.targetAltitude = Math.floor(this.targetAltitude * 1.20);
                        this.showFlightAlert(t('alert_anomaly_ion'));
                    }
                } else if (this.flightAnomaly.active && this.altitude > this.flightAnomaly.maxAlt) {
                    this.flightAnomaly.active = false;
                }
            }

            // Dynamic visor sector label
            if (this.visorSubText && typeof Sprites !== 'undefined' && Sprites.getSectorName) {
                this.visorSubText.innerText = Sprites.getSectorName(this.altitude);
            }

            // Exactly when velocity stops / reaches max point:
            if (progress >= 1.0 || velMps <= 0.05) {
                this.velocity = 0;
                this.altitude = this.targetAltitude;
                this.peakAltitude = Math.max(this.peakAltitude, this.altitude);
                this.state = 'APOGEE';
                this.apogeeLockTimer = 0.55; // Brief 0.55s apex pause to lock and mark altitude
                this.apogeeMarkAltitude = Math.floor(this.altitude);

                // Audio & visual mark lock
                try {
                    window.soundFX.playScanLock();
                } catch(e) {}
                this.screenShake = 8;

                // Beacon pulse shockwave at hero height
                const h = this.canvas.height;
                this.shockwaves.push({
                    x: this.canvas.width / 2,
                    y: h * 0.55,
                    radius: 8,
                    maxRadius: 110,
                    speed: 260,
                    alpha: 1.0
                });

                this.showFlightAlert(`${t('alert_apogee')} ${this.apogeeMarkAltitude.toLocaleString('ru-RU')}m`, 2200);

                if (this.visorSubText) {
                    this.visorSubText.innerText = `${t('visor_apogee_prefix')} ${this.apogeeMarkAltitude.toLocaleString('ru-RU')}m`;
                }
                if (this.altVector) {
                    this.altVector.innerText = `● 0 m/s`;
                }
            }
        } else if (this.state === 'APOGEE') {
            this.apogeeLockTimer -= dt;
            this.velocity = 0;
            this.altitude = this.targetAltitude;
            this.altitudeText.innerText = `${Math.floor(this.altitude)}m`;
            if (this.altVector) {
                this.altVector.innerText = `● 0 m/s`;
            }

            // After apex mark pause, begin fall!
            if (this.apogeeLockTimer <= 0) {
                this.state = 'FALL';
                if (this.visorSubText) this.visorSubText.innerText = t('visor_sub_default');
            }
        } else if (this.state === 'FALL') {
            if (this.isFastDive) {
                // Smooth and rapid downward descent
                const descentSpeed = Math.max(4000, this.altitude * 6.5);
                this.altitude -= descentSpeed * dt;
                this.velocity = -descentSpeed / this.metresPerPixel;
            } else {
                // Progressive fall speed: accelerates with altitude so player doesn't wait forever at 100k+ meters
                const fallRate = Math.max(1000, Math.min(30000, this.altitude * 2.0));
                this.altitude -= fallRate * dt;
                this.velocity = -fallRate / this.metresPerPixel;
            }

            if (this.altitude <= 0) {
                this.landHero();
            } else {
                this.altitudeText.innerText = `${Math.floor(this.altitude)}m`;
                if (this.altVector) {
                    const velMps = Math.floor(Math.abs(this.velocity * this.metresPerPixel));
                    this.altVector.innerText = this.isFastDive ? `▼▼ ${velMps} m/s` : `▼ ${velMps} m/s`;
                }
            }
        }

        // Update cinematic encounter companions during flight
        if (this.state === 'LAUNCH' || this.state === 'APOGEE' || this.state === 'FALL') {
            this.updateEncounterCompanions(dt);
        }
    }

    updateEncounterCompanions(dt) {
        const h = this.canvas.height;

        // 1. Update exiting companion (accelerates downward and fades out quickly to clear the space)
        if (this.exitingEncounter) {
            const ex = this.exitingEncounter;
            ex.currentY += dt * 680;
            ex.alpha = Math.max(0, ex.alpha - dt * 2.5);
            if (ex.currentY > h + 120 || ex.alpha <= 0) {
                this.exitingEncounter = null;
            }
        }

        // 2. Update active escort companion
        if (this.activeEncounter) {
            const enc = this.activeEncounter;
            if (enc.state === 'entering') {
                enc.alpha = Math.min(1.0, enc.alpha + dt * 2.8);
                enc.currentY += (enc.targetY - enc.currentY) * Math.min(1.0, dt * 6.5);
                if (Math.abs(enc.currentY - enc.targetY) < 4 || enc.alpha >= 0.98) {
                    enc.state = 'cruising';
                    enc.baseY = enc.targetY;
                }
            } else if (enc.state === 'cruising') {
                enc.timer -= dt;
                enc.currentY = (enc.baseY || enc.targetY) + Math.sin(this.time * 2.2) * 6;
                // If cruise time expired or hero has begun falling, initiate graceful exit
                if (enc.timer <= 0 || this.state === 'FALL') {
                    enc.state = 'exiting';
                }
            } else if (enc.state === 'exiting') {
                enc.currentY += dt * 550;
                enc.alpha = Math.max(0, enc.alpha - dt * 2.2);
                if (enc.currentY > h + 120 || enc.alpha <= 0) {
                    this.activeEncounter = null;
                }
            }
        }
    }

    showFlightAlert(text, duration = 1800) {
        if (!this.visorTicker || !this.visorTickerText) return;

        // Smart combo aggregator for rapid consecutive ring boosts
        if (text.includes('ИНДУКЦИОННЫЙ РАЗГОН') || text.includes('ПЕРЕХВАТ КОЛЬЦА') || text.includes('INDUCTION BOOST') || text.includes('RING INTERCEPT')) {
            const now = Date.now();
            if (this.lastRingBoostTime && (now - this.lastRingBoostTime < 1800)) {
                this.ringBoostCombo = (this.ringBoostCombo || 1) + 1;
                const totalPct = Math.round((Math.pow(1.15, this.ringBoostCombo) - 1) * 100);
                text = (typeof LOCALES !== 'undefined' && LOCALES[window.currentLang || 'en']?.alert_ring_combo) ? LOCALES[window.currentLang || 'en'].alert_ring_combo(this.ringBoostCombo, totalPct) : `⚡ INDUCTION BOOST ✖${this.ringBoostCombo} (+${totalPct}%)`;
            } else {
                this.ringBoostCombo = 1;
                text = t('alert_ring_intercept');
            }
            this.lastRingBoostTime = now;
        }

        this.visorTickerText.innerText = text;
        this.visorTicker.classList.remove('hidden');

        // Retrigger CSS animation
        this.visorTicker.style.animation = 'none';
        void this.visorTicker.offsetWidth;
        this.visorTicker.style.animation = '';

        if (this.visorTickerTimer) clearTimeout(this.visorTickerTimer);
        this.visorTickerTimer = setTimeout(() => {
            if (this.visorTicker) this.visorTicker.classList.add('hidden');
        }, duration);
    }

    landHero() {
        if (window.platformBridge) window.platformBridge.stopGameplay();
        this.altitude = 0;
        const wasDive = this.isFastDive;
        this.isFastDive = false;
        this.state = 'MONEY_RAIN';
        this.altitudeBanner.classList.add('hidden');
        if (this.visorTicker) this.visorTicker.classList.add('hidden');
        this.screenShake = wasDive ? 16 : 12;

        const heroX = this.canvas.width / 2;
        const groundY = this.canvas.height - 165;

        // Ground impact shockwave
        this.shockwaves.push({
            x: heroX,
            y: groundY + 20,
            radius: 8,
            maxRadius: wasDive ? 140 : 110,
            speed: wasDive ? 360 : 280,
            alpha: 1.0
        });
        this.characterSquash = wasDive ? 0.60 : 0.72; // Deep tactile squash on slam!

        // Check record
        if (this.peakAltitude > this.record) {
            this.record = Math.floor(this.peakAltitude);
            try { window.soundFX.playMilestone(); } catch(e) {}
            this.floatingTexts.push({
                text: (typeof LOCALES !== 'undefined' && LOCALES[window.currentLang || 'en']?.float_new_record) ? LOCALES[window.currentLang || 'en'].float_new_record(this.record) : `NEW RECORD: ${this.record.toLocaleString()}m!`,
                x: this.canvas.width / 2,
                y: this.canvas.height * 0.35,
                life: 2.5,
                color: '#121315'
            });
            this.checkSkinUnlocks(true);
            if (window.platformBridge) {
                window.platformBridge.submitLeaderboardScore(this.record);
                if (this.record >= 50000) {
                    window.platformBridge.requestReview();
                }
            }
        }

        // Calculate reward: strictly proportional to altitude (1 meter = 1 credit base)
        const baseReward = Math.max(10, Math.floor(this.peakAltitude));
        const anomalyMult = this.flightAnomalyMult || 1.0;
        let skinRewardMult = 1.0;
        if (this.skin === 'astronaut') skinRewardMult += 0.10;
        if (this.skin === 'aviator') skinRewardMult += 0.15;
        if (this.skin === 'celestial') skinRewardMult += 1.0;
        const totalReward = Math.floor(baseReward * this.getMoneyMultiplier() * anomalyMult * skinRewardMult);
        this.money += totalReward;

        this.lastFlightReward = totalReward;
        this.hasClaimedDoubleForThisFlight = false;

        // Show Post-Flight Double Banner if reward is significant
        if (totalReward >= 30 && this.landingDoubleBanner && this.landingDoubleVal) {
            this.landingDoubleVal.innerText = `+${totalReward.toLocaleString('ru-RU')} CRED`;
            this.landingDoubleBanner.classList.remove('hidden');
            if (this.promptIdle) this.promptIdle.classList.add('hidden');
        }

        // Spawn falling money shower (clean logarithmic particle count)
        const billCount = Math.min(35, Math.max(8, Math.floor(Math.sqrt(totalReward))));
        for (let i = 0; i < billCount; i++) {
            this.fallingMoney.push({
                x: 30 + Math.random() * (this.canvas.width - 60),
                y: -20 - Math.random() * 200,
                vy: 200 + Math.random() * 250,
                rotation: Math.random() * Math.PI,
                vRot: (Math.random() - 0.5) * 6
            });
        }

        try { window.soundFX.playCoin(); } catch(e) {}
        this.recordJumpStats(Math.floor(this.peakAltitude), totalReward);
        this.safeVibrate(wasDive ? [80, 50, 100] : [60, 40, 70]);
        this.save();
        this.updateHUD();

        // Return to IDLE quickly (350ms for fast dive, 1100ms for normal) so player can immediately jump!
        const delay = wasDive ? 350 : 1100;
        if (this.moneyRainTimeout) clearTimeout(this.moneyRainTimeout);
        this.moneyRainTimeout = setTimeout(() => {
            if (this.state === 'MONEY_RAIN') {
                this.resetToIdle();
            }
        }, delay);
    }

    getMilestoneReward(altitude) {
        if (altitude <= 3000) return 1;   // 1000m, 3000m
        if (altitude <= 10000) return 1;  // 10000m
        if (altitude <= 25000) return 2;  // 25000m
        if (altitude <= 50000) return 2;  // 50000m
        if (altitude <= 100000) return 3; // 100000m
        if (altitude <= 250000) return 3; // 250000m
        return 5; // 500000m, 1000000m+
    }

    checkFlightMilestones() {
        if (typeof Sprites === 'undefined' || !Sprites.getMilestonesInRange) return;
        const currentAlt = Math.floor(this.altitude);
        const milestones = Sprites.getMilestonesInRange(0, currentAlt);

        milestones.forEach(m => {
            if (!this.reachedMilestones.has(m)) {
                this.reachedMilestones.add(m);

                // CAREER CHECK: Crystals are awarded ONLY the first time you ever reach this milestone!
                const isCareerFirst = !this.careerMilestones.includes(m);
                if (isCareerFirst) {
                    this.careerMilestones.push(m);
                    const reward = this.getMilestoneReward(m);
                    this.rubies += reward;
                    try { window.soundFX.playMilestone(); } catch(e) {}
                    const crystalWord = (reward === 1) ? t('crystal_word_single') : (window.currentLang === 'ru' && reward < 5 ? t('crystal_word_few') : t('crystal_word_many'));
                    this.showFlightAlert(`${t('alert_milestone_prefix')} ${m.toLocaleString('ru-RU')}m! +${reward} ${crystalWord} 💎`, 2600);
                    this.save();
                    this.updateHUD();
                }
            }
        });
    }

    render() {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        if (!w || !h) {
            this.resize();
            return;
        }

        ctx.save();

        // Screen Shake
        if (this.screenShake > 0) {
            const sx = (Math.random() - 0.5) * this.screenShake;
            const sy = (Math.random() - 0.5) * this.screenShake;
            ctx.translate(sx, sy);
        }

        ctx.clearRect(0, 0, w, h);

        const heroX = w / 2;
        const groundY = h - 165;

        if (this.state === 'IDLE' || this.state === 'CHARGING' || this.state === 'MONEY_RAIN') {
            // Draw Rooftop environment
            const isCharging = (this.state === 'CHARGING');
            Sprites.drawRooftop(ctx, w, h, this.record, null, isCharging, this.chargeMultiplier, this.time);

            // Draw Shockwaves
            this.shockwaves.forEach(sw => {
                Sprites.drawShockwave(ctx, sw.x, sw.y, sw.radius, sw.maxRadius, sw.alpha);
            });

            // Draw Skin Charge Ground Aura when charging
            if (this.state === 'CHARGING' && typeof Sprites.drawSkinChargeGroundAura === 'function') {
                Sprites.drawSkinChargeGroundAura(ctx, heroX, groundY + 18, this.skin, this.chargeMultiplier, this.time);
            }

            // Draw Hero with tactile squash
            const charState = (this.state === 'CHARGING') ? 'charging' : 'idle';
            const squashX = this.characterSquash;
            const squashY = 1 / Math.max(0.5, this.characterSquash);
            Sprites.drawCharacter(ctx, heroX, groundY, this.skin, charState, this.time, 1.4, squashX, squashY);

            // Draw Equipped Pet floating next to hero
            const pet = this.getEquippedPet();
            if (pet) {
                Sprites.drawPet(ctx, heroX - 42, groundY - 26, pet, this.time);
            }

            // Draw Skin-Tailored Charge Particles
            if (this.chargeParticles && this.chargeParticles.length > 0 && typeof Sprites.drawSkinChargeParticles === 'function') {
                Sprites.drawSkinChargeParticles(ctx, this.chargeParticles, this.skin, this.time);
            }

            // Draw Lightning sparks around hero during charging
            this.lightnings.forEach(l => {
                Sprites.drawLightning(ctx, l.x, l.y, l.scale);
            });

            // Draw falling money bills
            this.fallingMoney.forEach(m => {
                Sprites.drawMoneyBill(ctx, m.x, m.y, m.rotation);
            });
        } else if (this.state === 'LAUNCH' || this.state === 'APOGEE' || this.state === 'FALL') {
            // Flight in Sky / Space with unified downward parallax & speed streaks
            Sprites.drawFlightSky(ctx, w, h, this.altitude, this.velocity, this.time);

            const flightHeroY = h * 0.55;
            const scale = 2.5;

            // Launch Deck scrolls physically downward as you ascend
            const groundDeckY = (h - 175) + (this.altitude * scale);
            if (groundDeckY < h + 160) {
                Sprites.drawRooftop(ctx, w, h, this.record, groundDeckY, false, 1.0, this.time);
            }

            // Hero position:
            // At altitude 0, hero is exactly at groundY (h - 165).
            // As altitude increases from 0 to 25m, hero smoothly settles at flightHeroY
            let currentHeroY = flightHeroY;
            if (this.altitude < 25) {
                const t = Math.max(0, Math.min(1.0, this.altitude / 25));
                const ease = 1 - Math.pow(1 - t, 2);
                currentHeroY = (h - 165) - ((h - 165) - flightHeroY) * ease;
            }

            // Draw Cosmic Anomaly Effects (Solar Wind / Ion Stream)
            if (Sprites.drawCosmicAnomalyEffects) {
                Sprites.drawCosmicAnomalyEffects(ctx, w, h, this.flightAnomaly, this.altitude, this.time);
            }

            const isDarkSky = this.altitude > 1000;

            // Draw In-Flight Interactive Asteroids
            if (this.flightAsteroids) {
                this.flightAsteroids.forEach(ast => {
                    if (!ast.collected) {
                        const astDist = ast.alt - this.altitude;
                        const astY = currentHeroY - (astDist * scale);
                        if (astY >= -80 && astY <= h + 80) {
                            const astX = w * ast.xRatio;
                            Sprites.drawInteractiveAsteroid(ctx, ast, astX, astY, this.time, isDarkSky);
                        }
                    }
                });
            }

            // Draw Ultra-Rare Crystal Geode
            if (this.flightCrystal && !this.flightCrystal.collected) {
                const cDist = this.flightCrystal.alt - this.altitude;
                const cY = currentHeroY - (cDist * scale);
                if (cY >= -80 && cY <= h + 80) {
                    const cX = w * this.flightCrystal.xRatio;
                    Sprites.drawCrystalGeode(ctx, this.flightCrystal, cX, cY, this.time, isDarkSky);
                }
            }

            // Draw In-Flight Kinetic Booster Rings in sky coordinates
            if (this.rings) {
                this.rings.forEach(ring => {
                    const ringDist = ring.alt - this.altitude;
                    const ringY = currentHeroY - (ringDist * scale);
                    if (ringY >= -80 && ringY <= h + 80) {
                        Sprites.drawKineticRing(ctx, heroX, ringY, ring.active, this.time, ring.scale || 1.0);
                    }
                });
            }

            // Draw Supersonic Mach Cone / Sonic Booms
            if (this.sonicBooms) {
                this.sonicBooms.forEach(sb => {
                    Sprites.drawSonicBoom(ctx, sb.x, sb.y, sb.radius, sb.alpha);
                });
            }

            // Draw Apogee Marked Horizon Line in world coordinates
            if (this.apogeeMarkAltitude > 0) {
                const beaconDist = this.apogeeMarkAltitude - this.altitude;
                const beaconY = currentHeroY - (beaconDist * scale);
                if (beaconY >= -60 && beaconY <= h + 60) {
                    const isDarkSky = this.altitude > 1000;
                    const strokeColor = isDarkSky ? 'rgba(255, 255, 255, 0.45)' : 'rgba(18, 19, 21, 0.45)';
                    const textColor = isDarkSky ? '#ffffff' : '#121315';
                    const tagBg = isDarkSky ? '#121315' : '#ffffff';
                    const tagBorder = isDarkSky ? '#ffffff' : '#121315';

                    ctx.save();
                    ctx.strokeStyle = strokeColor;
                    ctx.lineWidth = 1.5;
                    ctx.setLineDash([6, 5]);

                    // Technical horizon line with center gap to never intersect the hero
                    ctx.beginPath();
                    ctx.moveTo(15, beaconY);
                    ctx.lineTo(w / 2 - 45, beaconY);
                    ctx.moveTo(w / 2 + 45, beaconY);
                    ctx.lineTo(w - 15, beaconY);
                    ctx.stroke();
                    ctx.setLineDash([]);

                    // Clean right-flank telemetry label (never under or behind hero)
                    const badgeText = `📍 ${this.apogeeMarkAltitude.toLocaleString('ru-RU')}m`;
                    ctx.font = '800 9.5px "JetBrains Mono", monospace';
                    const textW = ctx.measureText(badgeText).width;
                    const bPadX = 6;
                    const bH = 18;
                    const badgeW = textW + bPadX * 2;
                    const badgeX = w - 16 - badgeW;

                    // Tag background and border
                    ctx.fillStyle = tagBg;
                    ctx.fillRect(badgeX, beaconY - bH / 2, badgeW, bH);
                    ctx.strokeStyle = tagBorder;
                    ctx.lineWidth = 1;
                    ctx.strokeRect(badgeX, beaconY - bH / 2, badgeW, bH);

                    ctx.fillStyle = textColor;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(badgeText, badgeX + badgeW / 2, beaconY);
                    ctx.restore();
                }
            }

            // Compute dynamic stretch according to velocity & flight state
            let squashX = 1.0;
            let squashY = 1.0;
            if (this.state === 'LAUNCH') {
                const stretch = 1 + Math.min(0.35, Math.abs(this.velocity) / 2000);
                squashY = stretch;
                squashX = 1 / Math.sqrt(stretch);
            } else if (this.state === 'APOGEE') {
                squashX = 1.08;
                squashY = 0.92;
            } else {
                const stretch = 1 + (this.isFastDive ? 0.45 : Math.min(0.25, Math.abs(this.velocity) / 2000));
                squashY = stretch;
                squashX = 1 / Math.sqrt(stretch);
            }

            // Draw Shockwaves
            this.shockwaves.forEach(sw => {
                Sprites.drawShockwave(ctx, sw.x, sw.y, sw.radius, sw.maxRadius, sw.alpha);
            });

            // Draw Motion Trail after-images
            this.motionTrail.forEach((tr, i) => {
                const trailOffset = (i + 1) * (this.velocity > 0 ? 12 : -12);
                ctx.save();
                ctx.globalAlpha = tr.alpha * 0.35;
                Sprites.drawCharacter(ctx, heroX, currentHeroY + trailOffset, this.skin, 'launching', this.time, 1.2, squashX, squashY);
                ctx.restore();
            });

            // Draw Cinematic Encounter Companions (Escort alongside hero)
            const encInk = isDarkSky ? '#ffffff' : '#121315';
            const encMuted = isDarkSky ? 'rgba(255, 255, 255, 0.65)' : 'rgba(18, 19, 21, 0.65)';
            if (this.exitingEncounter) {
                Sprites.drawEncounterCompanion(ctx, w, h, this.exitingEncounter, this.time, encInk, encMuted);
            }
            if (this.activeEncounter) {
                Sprites.drawEncounterCompanion(ctx, w, h, this.activeEncounter, this.time, encInk, encMuted);
            }

            // Draw Hero
            const charState = (this.state === 'LAUNCH') ? 'launching' : 'idle';
            Sprites.drawCharacter(ctx, heroX, currentHeroY, this.skin, charState, this.time, 1.3, squashX, squashY);

            // Pet flies along with hero
            const pet = this.getEquippedPet();
            if (pet) {
                Sprites.drawPet(ctx, heroX - 36, currentHeroY - 20, pet, this.time);
            }
        }

        // Draw Floating texts with clean technical E-Ink badges
        // Separate into local floaters (crits, near character) and system toasts (milestones, alerts, records)
        const localFloaters = [];
        const systemToasts = [];

        this.floatingTexts.forEach(ft => {
            if (ft.isLocal || Math.abs(ft.x - w / 2) > 40 || ft.y > h * 0.65) {
                localFloaters.push(ft);
            } else {
                systemToasts.push(ft);
            }
        });

        // 1. Render Local Floaters (e.g. crits near character feet)
        localFloaters.forEach(ft => {
            ctx.save();
            const alpha = Math.min(1.0, Math.max(0, ft.life / 0.3));
            ctx.globalAlpha = alpha;
            ctx.font = '800 12px "JetBrains Mono", monospace';
            const metrics = ctx.measureText(ft.text);
            const padX = 8;
            const padY = 5;

            // Box shadow & border
            ctx.fillStyle = '#121315';
            ctx.fillRect(ft.x - metrics.width / 2 - padX + 2, ft.y - 10 - padY + 2, metrics.width + padX * 2, 20 + padY);

            ctx.fillStyle = '#f5f4ef';
            ctx.fillRect(ft.x - metrics.width / 2 - padX, ft.y - 10 - padY, metrics.width + padX * 2, 20 + padY);

            ctx.strokeStyle = '#121315';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(ft.x - metrics.width / 2 - padX, ft.y - 10 - padY, metrics.width + padX * 2, 20 + padY);

            ctx.fillStyle = ft.color || '#121315';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(ft.text, ft.x, ft.y);
            ctx.restore();
        });

        // 2. Render System Toasts in a Dynamic Non-Overlapping Vertical Stack (only outside flight)
        if (this.state !== 'LAUNCH' && this.state !== 'APOGEE' && this.state !== 'FALL') {
            const maxVisibleToasts = 3;
            const activeToasts = systemToasts.slice(-maxVisibleToasts);
            const stackTopY = h * 0.28;
            const rowHeight = 34;

            activeToasts.forEach((ft, idx) => {
                ctx.save();
                const alpha = Math.min(1.0, Math.max(0, ft.life / 0.4));
                ctx.globalAlpha = alpha;

                const targetY = stackTopY + (idx * rowHeight);
                if (ft.displayY === undefined) {
                    ft.displayY = targetY - 10;
                }
                // Smoothly ease into vertical slot so toasts slide gracefully
                ft.displayY += (targetY - ft.displayY) * Math.min(1.0, 0.25);

                ctx.font = '800 12px "JetBrains Mono", monospace';
                const metrics = ctx.measureText(ft.text);
                const padX = 10;
                const padY = 6;
                const badgeW = metrics.width + padX * 2;
                const badgeH = 22 + padY;
                const drawX = w / 2;
                const drawY = ft.displayY;

                // Crisp E-Ink Drop Shadow
                ctx.fillStyle = '#121315';
                ctx.fillRect(drawX - badgeW / 2 + 2, drawY - badgeH / 2 + 2, badgeW, badgeH);

                // Crisp White/Cream Surface
                ctx.fillStyle = '#f5f4ef';
                ctx.fillRect(drawX - badgeW / 2, drawY - badgeH / 2, badgeW, badgeH);

                // Technical Dark Border
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 1.5;
                ctx.strokeRect(drawX - badgeW / 2, drawY - badgeH / 2, badgeW, badgeH);

                // Badge Text
                ctx.fillStyle = ft.color || '#121315';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(ft.text, drawX, drawY);
                ctx.restore();
            });
        }

        ctx.restore();
    }

    // --- HAPTICS & FULLSCREEN ---

    safeVibrate(pattern) {
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            try { navigator.vibrate(pattern); } catch(e) {}
        }
    }

    toggleFullscreen() {
        const doc = document;
        const isFull = !!(doc.fullscreenElement || doc.webkitFullscreenElement || doc.mozFullScreenElement || doc.msFullscreenElement);
        if (!isFull) {
            // First try documentElement so desktop flanking companion panels & arcade proportions are preserved
            const target = doc.documentElement;
            const req = target.requestFullscreen || target.webkitRequestFullscreen || target.mozRequestFullScreen || target.msRequestFullscreen;
            if (req) {
                req.call(target).catch(err => {
                    console.warn('Document fullscreen failed, attempting frame:', err);
                    const frame = document.getElementById('game-frame');
                    if (frame && frame.requestFullscreen) {
                        frame.requestFullscreen().catch(e => console.warn('Frame fullscreen failed:', e));
                    }
                });
            } else {
                const frame = document.getElementById('game-frame');
                if (frame && frame.requestFullscreen) frame.requestFullscreen();
            }
        } else {
            const exit = doc.exitFullscreen || doc.webkitExitFullscreen || doc.mozCancelFullScreen || doc.msExitFullscreen;
            if (exit) exit.call(doc);
        }
    }

    // --- HALL OF FAME & LIFETIME STATISTICS ---

    recordJumpStats(alt, reward) {
        if (!this.stats) {
            this.stats = { totalDistance: 0, totalJumps: 0, maxMult: 1.0, totalPetsDiscovered: 1 };
        }
        this.stats.totalDistance += alt;
        this.stats.totalJumps += 1;
        this.stats.maxMult = Math.max(this.stats.maxMult, this.chargeMultiplier);
        this.stats.totalPetsDiscovered = Math.max(this.stats.totalPetsDiscovered, this.pets.length);

        if (alt > 0) {
            if (!this.hallOfFame) this.hallOfFame = [];
            const equippedPet = this.getEquippedPet();
            const petName = equippedPet ? equippedPet.name : t('no_drone_label');
            const now = new Date();
            const dateStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}`;
            this.hallOfFame.push({
                alt: alt,
                reward: reward,
                petName: petName,
                date: dateStr
            });
            // Sort descending by altitude, keep top 5
            this.hallOfFame.sort((a, b) => b.alt - a.alt);
            if (this.hallOfFame.length > 5) {
                this.hallOfFame = this.hallOfFame.slice(0, 5);
            }
        }
    }

    renderStatsModal() {
        if (this.statTotalDist) {
            const km = (this.stats.totalDistance / 1000).toFixed(1);
            this.statTotalDist.innerText = `${km} km`;
        }
        if (this.statTotalJumps) {
            this.statTotalJumps.innerText = this.stats.totalJumps.toLocaleString('ru-RU');
        }
        if (this.statMaxMult) {
            this.statMaxMult.innerText = `✖ ${this.stats.maxMult.toFixed(2)}`;
        }
        if (this.statTotalPets) {
            this.statTotalPets.innerText = `${this.pets.length} / 5+`;
        }

        if (this.hallOfFameList) {
            this.hallOfFameList.innerHTML = '';
            if (!this.hallOfFame || this.hallOfFame.length === 0) {
                this.hallOfFameList.innerHTML = `<div style="font-size:9px;color:var(--eink-muted);padding:8px;text-align:center;">${t('hall_no_records')}</div>`;
                return;
            }
            this.hallOfFame.forEach((item, index) => {
                const row = document.createElement('div');
                row.className = 'hof-item';
                const rankLabels = ['#1 ★', '#2', '#3', '#4', '#5'];
                row.innerHTML = `
                    <div class="hof-left">
                        <span class="hof-rank">${rankLabels[index] || `#${index + 1}`}</span>
                        <span class="hof-alt">${item.alt.toLocaleString('ru-RU')}m</span>
                    </div>
                    <div class="hof-right">
                        <span>[${item.petName}]</span>
                        <span class="hof-reward">+${item.reward.toLocaleString('ru-RU')} 💵</span>
                        <span>${item.date || ''}</span>
                    </div>
                `;
                this.hallOfFameList.appendChild(row);
            });
        }
    }

    // --- QUANTUM DRONE FUSION (3-IN-1 CRAFTING) ---

    getDroneFusionOptions() {
        // Group pets by rarityKey
        const counts = {};
        this.pets.forEach(p => {
            const rk = p.rarityKey || 'common';
            if (!counts[rk]) counts[rk] = [];
            counts[rk].push(p);
        });

        // Hierarchy
        const tiers = [
            { from: 'common', to: 'rare', fromName: t('fusion_tier_common'), toName: t('pet_rare_rarity'), baseChance: 0.75 },
            { from: 'rare', to: 'epic', fromName: t('fusion_tier_rare'), toName: t('pet_epic_rarity'), baseChance: 0.60 },
            { from: 'epic', to: 'legendary', fromName: t('fusion_tier_epic'), toName: t('pet_legendary_rarity'), baseChance: 0.45 },
            { from: 'legendary', to: 'mythic', fromName: t('fusion_tier_legendary'), toName: t('pet_mythic_rarity'), baseChance: 0.30 }
        ];

        for (const t of tiers) {
            const list = counts[t.from] || [];
            if (list.length >= 3) {
                return {
                    available: true,
                    tier: t,
                    drones: list.slice(0, 3)
                };
            }
        }
        return { available: false, tier: null, drones: [] };
    }

    updateDroneFusionUI() {
        const fusionInfo = this.getDroneFusionOptions();
        if (!this.btnFuseDrones || !this.fusionStatusText) return;

        if (fusionInfo.available) {
            const t = fusionInfo.tier;
            const boost = this.droneFusionBoosted ? 0.25 : 0;
            const finalChance = Math.min(1.0, t.baseChance + boost);
            const pct = Math.round(finalChance * 100);
            this.fusionStatusText.innerText = (typeof LOCALES !== 'undefined' && LOCALES[window.currentLang || 'en']?.fusion_available) ? LOCALES[window.currentLang || 'en'].fusion_available(t.fromName, t.toName, pct) : `AVAILABLE: 3 ${t.fromName.toUpperCase()} ➔ 1 ${t.toName.toUpperCase()} (${pct}% SUCCESS)`;
            this.btnFuseDrones.removeAttribute('disabled');
        } else {
            this.fusionStatusText.innerText = t('fusion_select');
            this.btnFuseDrones.setAttribute('disabled', 'true');
        }

        const fusionAlertEl = document.getElementById('pet-fusion-alert');
        if (fusionAlertEl) {
            if (fusionInfo.available) {
                fusionAlertEl.classList.remove('hidden');
            } else {
                fusionAlertEl.classList.add('hidden');
            }
        }

        if (this.fuseAdTag) {
            if (this.droneFusionBoosted) {
                this.fuseAdTag.innerText = t('fuse_ad_active');
            } else {
                this.fuseAdTag.innerText = t('fuse_ad');
            }
        }
    }

    boostFusionWithAd() {
        if (this.droneFusionBoosted) return;
        if (window.platformBridge) {
            window.platformBridge.showRewarded('fusion_boost', () => {
                this.droneFusionBoosted = true;
                this.updateDroneFusionUI();
                try { window.soundFX.playSpark(); } catch(e) {}
                this.safeVibrate([30, 20]);
                this.floatingTexts.push({
                    text: t('float_fuse_boost'),
                    x: this.canvas.width / 2,
                    y: this.canvas.height / 2,
                    life: 2.2,
                    color: '#121315'
                });
            });
        }
    }

    performDroneFusion() {
        const fusionInfo = this.getDroneFusionOptions();
        if (!fusionInfo.available) return;

        const t = fusionInfo.tier;
        const boost = this.droneFusionBoosted ? 0.25 : 0;
        const finalChance = Math.min(1.0, t.baseChance + boost);
        this.droneFusionBoosted = false;

        const roll = Math.random();
        if (roll <= finalChance) {
            // SUCCESS! Remove 3 duplicates
            const toRemoveIds = fusionInfo.drones.map(d => d.id);
            this.pets = this.pets.filter(p => !toRemoveIds.includes(p.id));

            // Roster of created drones by target rarity
            const targetTiers = {
                rare: { name: t('pet_rare_name'), icon: '◈', rarity: t('pet_rare_rarity'), rarityKey: 'rare', mult: 1.25, bonusEnergy: 5, desc: t('pet_rare_desc') },
                epic: { name: t('pet_epic_name'), icon: '✦', rarity: t('pet_epic_rarity'), rarityKey: 'epic', mult: 1.50, bonusEnergy: 12, desc: t('pet_epic_desc') },
                legendary: { name: t('pet_legendary_name'), icon: '◉', rarity: t('pet_legendary_rarity'), rarityKey: 'legendary', mult: 2.00, bonusEnergy: 25, desc: t('pet_legendary_desc') },
                mythic: { name: t('pet_mythic_name'), icon: '🜂', rarity: t('pet_mythic_rarity'), rarityKey: 'mythic', mult: 3.00, bonusEnergy: 50, desc: t('pet_mythic_desc') }
            };

            const proto = targetTiers[t.to] || targetTiers.rare;
            const newPet = {
                id: 'pet_' + Date.now(),
                name: proto.name,
                icon: proto.icon,
                level: 1,
                mult: proto.mult,
                bonusEnergy: proto.bonusEnergy,
                rarity: proto.rarity,
                rarityKey: proto.rarityKey,
                desc: proto.desc,
                equipped: false
            };
            this.pets.push(newPet);
            this.selectedPetId = newPet.id;

            // Make sure at least one pet is equipped
            if (!this.pets.some(p => p.equipped)) {
                newPet.equipped = true;
            }

            try { window.soundFX.playFusionSuccess(); } catch(e) {}
            this.safeVibrate([60, 40, 80]);
            this.floatingTexts.push({
                text: (typeof LOCALES !== 'undefined' && LOCALES[window.currentLang || 'en']?.float_fuse_success) ? LOCALES[window.currentLang || 'en'].float_fuse_success(newPet.rarity, newPet.name) : `★ QUANTUM FUSION SUCCESS: ${newPet.rarity.toUpperCase()} [${newPet.name}]! ★`,
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                life: 3.5,
                color: '#121315'
            });
        } else {
            // FAILURE: consume 2 duplicates, keep 1
            const toRemoveIds = fusionInfo.drones.slice(0, 2).map(d => d.id);
            this.pets = this.pets.filter(p => !toRemoveIds.includes(p.id));

            try { window.soundFX.playClick(); } catch(e) {}
            this.safeVibrate([100]);
            this.floatingTexts.push({
                text: t('fusion_failed'),
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                life: 2.5,
                color: '#8c1d1d'
            });
        }

        this.save();
        this.updateHUD();
        this.renderPetsModal();
    }
}

window.addEventListener('DOMContentLoaded', () => {
    window.game = new JumpGame();
});

