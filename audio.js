// 8-bit Retro Audio Engine using Web Audio API
class SoundFX {
    constructor() {
        this.ctx = null;
        this.enabled = true;
        this.setupVisibilityListeners();
    }

    setupVisibilityListeners() {
        if (typeof document !== 'undefined') {
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.onTabHidden();
                } else {
                    this.onTabVisible();
                }
            });

            window.addEventListener('blur', () => {
                this.onTabHidden();
            });

            window.addEventListener('focus', () => {
                this.onTabVisible();
            });

            window.addEventListener('pagehide', () => {
                this.onTabHidden();
            });
        }
    }

    onTabHidden() {
        if (this.ctx && this.ctx.state === 'running') {
            try {
                this.ctx.suspend();
            } catch (e) {}
        }
    }

    onTabVisible() {
        // Only resume if user has not disabled audio and no fullscreen ad is playing
        if (this.enabled && this.ctx && this.ctx.state === 'suspended') {
            if (!window.platformBridge || !window.platformBridge.isAdShowing) {
                try {
                    this.ctx.resume();
                } catch (e) {}
            }
        }
    }

    init() {
        if (!this.ctx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) {
                this.ctx = new AudioContext();
            }
        }
        if (this.ctx && this.ctx.state === 'suspended' && (!window.platformBridge || !window.platformBridge.isAdShowing)) {
            this.ctx.resume();
        }
    }

    toggle() {
        this.enabled = !this.enabled;
        if (!this.enabled && this.ctx && this.ctx.state === 'running') {
            try { this.ctx.suspend(); } catch(e) {}
        } else if (this.enabled && this.ctx && this.ctx.state === 'suspended' && (!window.platformBridge || !window.platformBridge.isAdShowing)) {
            try { this.ctx.resume(); } catch(e) {}
        }
        return this.enabled;
    }

    playClick(pitchMultiplier = 1.0) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        const baseFreq = 220 * Math.min(pitchMultiplier, 3.5);
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 2.2, now + 0.06);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.08);
    }

    playSpark() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600 + Math.random() * 400, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.05);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.05);
    }

    playLaunch() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.6);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.7);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.7);
    }

    playDive() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;

            const now = Math.max(this.ctx.currentTime + 0.002, 0.005);
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(880, now);
            osc.frequency.exponentialRampToValueAtTime(130, now + 0.35);

            gain.gain.setValueAtTime(0.25, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.35);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.35);
        } catch(e) {}
    }

    playCoin() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        const freqs = [987.77, 1318.51]; // B5, E6
        osc.frequency.setValueAtTime(freqs[0], now);
        osc.frequency.setValueAtTime(freqs[1], now + 0.05);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.2);
    }

    playMilestone() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
            const now = this.ctx.currentTime + idx * 0.08;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'square';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.15);
        });
    }

    playUpgrade() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.2);
    }

    playBoxOpen() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;

        const chord = [440, 554.37, 659.25, 880];
        chord.forEach((freq, i) => {
            const now = this.ctx.currentTime + i * 0.06;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now);

            gain.gain.setValueAtTime(0.2, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.3);
        });
    }

    // High-tech scanner radar pulse / frequency sweep sound
    playScanSweep(step = 0) {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;

            const now = Math.max(this.ctx.currentTime + 0.002, 0.005);
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            const baseFreq = 700 + ((step % 6) * 90);
            osc.frequency.setValueAtTime(baseFreq, now);
            osc.frequency.linearRampToValueAtTime(baseFreq * 1.5, now + 0.04);

            gain.gain.setValueAtTime(0.12, now);
            gain.gain.linearRampToValueAtTime(0.01, now + 0.05);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now);
            osc.stop(now + 0.05);
        } catch(e) {
            // Audio error gracefully suppressed
        }
    }

    // High-resonance target lock-on chime
    playScanLock() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;

            const now = Math.max(this.ctx.currentTime + 0.002, 0.005);
            [980, 1960].forEach((freq, i) => {
                const t = now + i * 0.08;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = 'square';
                osc.frequency.setValueAtTime(freq, t);

                gain.gain.setValueAtTime(0.2, t);
                gain.gain.linearRampToValueAtTime(0.01, t + 0.12);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start(t);
                osc.stop(t + 0.12);
            });
        } catch(e) {
            // Audio error gracefully suppressed
        }
    }

    // Rarity reveal fanfare with distinct tiers
    playRarityReveal(rarityKey) {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;

            const now = Math.max(this.ctx.currentTime + 0.002, 0.005);

            if (rarityKey === 'mythic') {
                const freqs = [329.63, 493.88, 659.25, 987.77, 1318.51, 1975.53];
                freqs.forEach((freq, idx) => {
                    const t = now + idx * 0.06;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();

                    osc.type = (idx % 2 === 0) ? 'sawtooth' : 'sine';
                    osc.frequency.setValueAtTime(freq, t);

                    gain.gain.setValueAtTime(0.2, t);
                    gain.gain.linearRampToValueAtTime(0.01, t + 0.45);

                    osc.connect(gain);
                    gain.connect(this.ctx.destination);

                    osc.start(t);
                    osc.stop(t + 0.45);
                });
            } else if (rarityKey === 'legendary') {
                const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51];
                freqs.forEach((freq, idx) => {
                    const t = now + idx * 0.07;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();

                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, t);

                    gain.gain.setValueAtTime(0.22, t);
                    gain.gain.linearRampToValueAtTime(0.01, t + 0.35);

                    osc.connect(gain);
                    gain.connect(this.ctx.destination);

                    osc.start(t);
                    osc.stop(t + 0.35);
                });
            } else if (rarityKey === 'epic') {
                const freqs = [587.33, 739.99, 880.00, 1174.66];
                freqs.forEach((freq, idx) => {
                    const t = now + idx * 0.08;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();

                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, t);

                    gain.gain.setValueAtTime(0.2, t);
                    gain.gain.linearRampToValueAtTime(0.01, t + 0.3);

                    osc.connect(gain);
                    gain.connect(this.ctx.destination);

                    osc.start(t);
                    osc.stop(t + 0.3);
                });
            } else if (rarityKey === 'rare') {
                const freqs = [659.25, 830.61, 987.77];
                freqs.forEach((freq, idx) => {
                    const t = now + idx * 0.08;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();

                    osc.type = 'triangle';
                    osc.frequency.setValueAtTime(freq, t);

                    gain.gain.setValueAtTime(0.18, t);
                    gain.gain.linearRampToValueAtTime(0.01, t + 0.25);

                    osc.connect(gain);
                    gain.connect(this.ctx.destination);

                    osc.start(t);
                    osc.stop(t + 0.25);
                });
            } else {
                const freqs = [523.25, 783.99];
                freqs.forEach((freq, idx) => {
                    const t = now + idx * 0.09;
                    const osc = this.ctx.createOscillator();
                    const gain = this.ctx.createGain();

                    osc.type = 'sine';
                    osc.frequency.setValueAtTime(freq, t);

                    gain.gain.setValueAtTime(0.18, t);
                    gain.gain.linearRampToValueAtTime(0.01, t + 0.2);

                    osc.connect(gain);
                    gain.connect(this.ctx.destination);

                    osc.start(t);
                    osc.stop(t + 0.2);
                });
            }
        } catch(e) {
            // Audio error gracefully suppressed
        }
    }

    playCritTap() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;

            // Zap burst (square)
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.exponentialRampToValueAtTime(1760, now + 0.05);
            osc.frequency.exponentialRampToValueAtTime(320, now + 0.12);

            gain.gain.setValueAtTime(0.35, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.14);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.14);

            // Punch sub pop
            const sub = this.ctx.createOscillator();
            const subGain = this.ctx.createGain();
            sub.type = 'triangle';
            sub.frequency.setValueAtTime(260, now);
            sub.frequency.exponentialRampToValueAtTime(80, now + 0.1);
            subGain.gain.setValueAtTime(0.25, now);
            subGain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            sub.connect(subGain);
            subGain.connect(this.ctx.destination);
            sub.start(now);
            sub.stop(now + 0.1);
        } catch(e) {}
    }

    playBoostRing() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;

            // 3-note harmonic ascent
            const freqs = [587.33, 880.00, 1174.66]; // D5, A5, D6
            freqs.forEach((f, idx) => {
                const t = now + idx * 0.04;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(f, t);
                osc.frequency.exponentialRampToValueAtTime(f * 1.5, t + 0.15);

                gain.gain.setValueAtTime(0.2, t);
                gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(t);
                osc.stop(t + 0.18);
            });
        } catch(e) {}
    }

    playSonicBoom() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;

            // Deep supersonic shockwave rumble
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(220, now);
            osc.frequency.exponentialRampToValueAtTime(38, now + 0.35);

            gain.gain.setValueAtTime(0.55, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.45);

            // Crisp white noise crack
            const bufferSize = this.ctx.sampleRate * 0.12;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
            }
            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;
            const noiseGain = this.ctx.createGain();
            noiseGain.gain.setValueAtTime(0.4, now);
            noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
            noise.connect(noiseGain);
            noiseGain.connect(this.ctx.destination);
            noise.start(now);
        } catch(e) {}
    }

    playFusionSuccess() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;

            // 4-note ascending triumph chord (C5, E5, G5, C6)
            const chord = [523.25, 659.25, 783.99, 1046.50];
            chord.forEach((freq, idx) => {
                const t = now + idx * 0.08;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, t);

                gain.gain.setValueAtTime(0.28, t);
                gain.gain.linearRampToValueAtTime(0.01, t + 0.45);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(t);
                osc.stop(t + 0.45);
            });
        } catch(e) {}
    }

    playCrystalPickup() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;

            // Shimmering twin chime (high E6 + B6)
            [1318.5, 1975.5, 2637.0].forEach((freq, idx) => {
                const t = now + idx * 0.09;
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, t);
                osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + 0.35);

                gain.gain.setValueAtTime(0.35, t);
                gain.gain.exponentialRampToValueAtTime(0.005, t + 0.45);

                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.start(t);
                osc.stop(t + 0.45);
            });
        } catch(e) {}
    }

    playAsteroidHit() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;

            // Low crunch impact
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(240, now);
            osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);

            gain.gain.setValueAtTime(0.4, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.18);

            // Noise burst for rock shatter
            const bufferSize = this.ctx.sampleRate * 0.15;
            const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
            }
            const noise = this.ctx.createBufferSource();
            noise.buffer = buffer;
            const nGain = this.ctx.createGain();
            nGain.gain.setValueAtTime(0.3, now);
            nGain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            noise.connect(nGain);
            nGain.connect(this.ctx.destination);
            noise.start(now);
        } catch(e) {}
    }

    playAnomalyEnter() {
        if (!this.enabled) return;
        try {
            this.init();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;

            // Mysterious resonant sweeping hum
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(320, now);
            osc.frequency.exponentialRampToValueAtTime(640, now + 0.25);
            osc.frequency.exponentialRampToValueAtTime(440, now + 0.5);

            gain.gain.setValueAtTime(0.3, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.55);

            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + 0.55);
        } catch(e) {}
    }
}

window.soundFX = new SoundFX();
