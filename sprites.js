// E-Ink Minimalist Procedural Vector Engine & Aesthetics

const Sprites = {
    // E-Ink Color Palette Tokens
    colors: {
        bgPaper: '#f5f4ef',
        bgPaperDark: '#121315',
        cardPaper: '#eae8e1',
        inkDark: '#121315',
        inkMid: '#484c55',
        inkFaint: '#8d919a',
        inkBorder: '#1c1e22',
        inkWhite: '#fbfbfa',
        inkAccent: '#000000'
    },

    // 1. Draw Player Character with distinctive procedural skins in E-Ink aesthetic
    drawCharacter(ctx, x, y, skin = 'ninja', state = 'idle', time = 0, scale = 1, squashX = 1, squashY = 1) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));
        ctx.scale(scale * squashX, scale * squashY);

        const bob = 0; // Character stands steady without bobbing in idle
        const shake = (state === 'charging') ? (Math.random() - 0.5) * 3 : 0;
        ctx.translate(shake, bob);

        // Dynamic shadow under hero on rooftop
        if (state === 'idle' || state === 'charging') {
            ctx.save();
            ctx.fillStyle = (skin === 'phantom') ? 'rgba(0, 0, 0, 0.12)' : 'rgba(18, 19, 21, 0.22)';
            ctx.beginPath();
            ctx.ellipse(0, 22, 16 * squashX, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }

        const isLaunching = (state === 'launching');

        // ==========================================
        // SKIN: CYBORG (Хром-Киборг MK-II) - Inverted White Titanium Plate Aesthetic
        // ==========================================
        if (skin === 'cyborg') {
            ctx.save();
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#121315';
            ctx.lineWidth = 2.2;

            if (isLaunching) {
                // Rocket stream pose
                ctx.beginPath();
                ctx.ellipse(0, -5, 9, 23, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Mechanical shoulder pauldrons
                ctx.fillStyle = '#eae8e0';
                ctx.fillRect(-13, -19, 5, 10);
                ctx.strokeRect(-13, -19, 5, 10);
                ctx.fillRect(8, -19, 5, 10);
                ctx.strokeRect(8, -19, 5, 10);

                // Angular Helm
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-8, -36, 16, 15);
                ctx.strokeRect(-8, -36, 16, 15);

                // Ruby horizontal optic sensor
                ctx.fillStyle = '#e53935';
                ctx.fillRect(-6, -30, 12, 3);
                ctx.fillStyle = '#00ffff';
                ctx.fillRect(-1, -30, 2, 3);

                // Reactor core chest slit
                ctx.fillStyle = '#00ffff';
                ctx.beginPath();
                ctx.arc(0, -5, 3.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Dual trailing fiber-optic cables
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2;
                ctx.beginPath();
                const w1 = Math.sin(time * 16) * 7;
                ctx.moveTo(-5, 10);
                ctx.quadraticCurveTo(-5 + w1, 25, -2 - w1 * 0.5, 38);
                ctx.moveTo(5, 10);
                ctx.quadraticCurveTo(5 - w1, 25, 2 + w1 * 0.5, 38);
                ctx.stroke();

                // Hydraulic legs
                ctx.fillStyle = '#eae8e0';
                ctx.fillRect(-5, 14, 4, 15);
                ctx.strokeRect(-5, 14, 4, 15);
                ctx.fillRect(1, 14, 4, 15);
                ctx.strokeRect(1, 14, 4, 15);
            } else {
                // Standing / Charging pose
                // Angular Head with antenna
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-8, -25, 16, 16);
                ctx.strokeRect(-8, -25, 16, 16);

                // Top antenna
                ctx.beginPath();
                ctx.moveTo(4, -25);
                ctx.lineTo(4, -32);
                ctx.stroke();
                ctx.fillStyle = '#e53935';
                ctx.fillRect(3, -34, 2, 2);

                // Ruby optic slit with cyan tracker
                ctx.fillStyle = '#e53935';
                ctx.fillRect(-6, -19, 12, 3.5);
                const eyePulse = Math.sin(time * 8) * 3;
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(eyePulse - 1, -19, 2, 3.5);

                // Neck servo joint
                ctx.fillStyle = '#121315';
                ctx.fillRect(-4, -9, 8, 3);

                // Chest plate (Chiseled geometric armor)
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.moveTo(-10, -6);
                ctx.lineTo(10, -6);
                ctx.lineTo(7, 10);
                ctx.lineTo(-7, 10);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Core reactor
                ctx.fillStyle = '#00ffff';
                ctx.beginPath();
                ctx.arc(0, 1, 3.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 1.2;
                ctx.stroke();

                // Angular plate shoulders
                ctx.fillStyle = '#eae8e0';
                ctx.lineWidth = 2;
                ctx.fillRect(-14, -7, 5, 8);
                ctx.strokeRect(-14, -7, 5, 8);
                ctx.fillRect(9, -7, 5, 8);
                ctx.strokeRect(9, -7, 5, 8);

                // Arms
                ctx.fillStyle = '#ffffff';
                if (state === 'charging') {
                    ctx.fillRect(-15, 1, 5, 10);
                    ctx.strokeRect(-15, 1, 5, 10);
                    ctx.fillRect(10, 1, 5, 10);
                    ctx.strokeRect(10, 1, 5, 10);
                } else {
                    ctx.fillRect(-14, 1, 4, 10);
                    ctx.strokeRect(-14, 1, 4, 10);
                    ctx.fillRect(10, 1, 4, 10);
                    ctx.strokeRect(10, 1, 4, 10);
                }

                // Hydraulic legs
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-6, 10, 4, 12);
                ctx.strokeRect(-6, 10, 4, 12);
                ctx.fillRect(2, 10, 4, 12);
                ctx.strokeRect(2, 10, 4, 12);
            }
            ctx.restore();
            ctx.restore();
            return;
        }

        // ==========================================
        // SKIN: ASTRONAUT (Орбитальный Космонавт) - Pressurized Suit & Sphere Helmet
        // ==========================================
        if (skin === 'astronaut') {
            ctx.save();
            ctx.fillStyle = '#e8e5dc';
            ctx.strokeStyle = '#121315';
            ctx.lineWidth = 2.2;

            if (isLaunching) {
                // EVA Rocket Ascent
                // Heavy backpack
                ctx.fillStyle = '#32363e';
                ctx.fillRect(-12, -22, 24, 28);
                ctx.strokeRect(-12, -22, 24, 28);

                // Body
                ctx.fillStyle = '#f0eee6';
                ctx.beginPath();
                ctx.ellipse(0, -2, 11, 22, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Spherical helmet
                ctx.fillStyle = '#f7f6f2';
                ctx.beginPath();
                ctx.arc(0, -28, 12, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Golden reflective dome visor
                ctx.fillStyle = '#e6c875';
                ctx.beginPath();
                ctx.ellipse(0, -28, 9, 6.5, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Visor reflection shine
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(-3, -30, 2.5, 0, Math.PI * 2);
                ctx.fill();

                // Micro-thruster exhaust puffs downwards
                ctx.strokeStyle = '#8d919a';
                ctx.lineWidth = 2;
                ctx.beginPath();
                const pWave = Math.sin(time * 24) * 4;
                ctx.moveTo(-7, 16);
                ctx.lineTo(-9 + pWave, 32);
                ctx.moveTo(7, 16);
                ctx.lineTo(9 - pWave, 32);
                ctx.stroke();

                // Padded legs
                ctx.fillStyle = '#f0eee6';
                ctx.fillRect(-6, 12, 5, 16);
                ctx.strokeRect(-6, 12, 5, 16);
                ctx.fillRect(1, 12, 5, 16);
                ctx.strokeRect(1, 12, 5, 16);
            } else {
                // Standing / Charging pose
                // Oxygen Backpack behind
                ctx.fillStyle = '#32363e';
                ctx.fillRect(-14, -14, 28, 20);
                ctx.strokeRect(-14, -14, 28, 20);
                // Oxygen tank ribs
                ctx.fillStyle = '#e53935';
                ctx.fillRect(-12, -18, 6, 4);
                ctx.fillRect(6, -18, 6, 4);

                // Round Astronaut Helmet
                ctx.fillStyle = '#f7f6f2';
                ctx.beginPath();
                ctx.arc(0, -17, 13, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Big panoramic reflective visor
                ctx.fillStyle = '#e6c875';
                ctx.beginPath();
                ctx.ellipse(0, -17, 9.5, 7.5, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 1.5;
                ctx.stroke();

                // Glare arc
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(-3, -19, 2.5, 0, Math.PI * 2);
                ctx.fill();

                // Torso with EVA Chest Console
                ctx.fillStyle = '#f0eee6';
                ctx.beginPath();
                if (typeof ctx.roundRect === 'function') {
                    ctx.roundRect(-10, -4, 20, 15, 3);
                } else {
                    ctx.rect(-10, -4, 20, 15);
                }
                ctx.fill();
                ctx.stroke();

                // Life-support console
                ctx.fillStyle = '#22252a';
                ctx.fillRect(-5, 0, 10, 7);
                // LED indicator dots
                ctx.fillStyle = '#2ecc71';
                ctx.fillRect(-3.5, 2, 2, 2);
                ctx.fillStyle = '#f39c12';
                ctx.fillRect(1.5, 2, 2, 2);

                // Padded arms
                ctx.fillStyle = '#e8e5dc';
                ctx.fillRect(-15, -2, 5, 12);
                ctx.strokeRect(-15, -2, 5, 12);
                ctx.fillRect(10, -2, 5, 12);
                ctx.strokeRect(10, -2, 5, 12);

                // Bulky boots
                ctx.fillStyle = '#32363e';
                ctx.fillRect(-7, 11, 6, 11);
                ctx.strokeRect(-7, 11, 6, 11);
                ctx.fillRect(1, 11, 6, 11);
                ctx.strokeRect(1, 11, 6, 11);
            }
            ctx.restore();
            ctx.restore();
            return;
        }

        // ==========================================
        // SKIN: PHANTOM (Квантовый Фантом) - Ethereal Electric Plasma Aura
        // ==========================================
        if (skin === 'phantom') {
            ctx.save();
            const pulse = 0.75 + Math.sin(time * 8) * 0.25;
            ctx.globalAlpha = pulse;

            // Outer crackling kinetic aura
            ctx.strokeStyle = 'rgba(18, 19, 21, 0.4)';
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.ellipse(0, isLaunching ? -5 : 2, 18, isLaunching ? 32 : 24, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);

            // Orbiting plasma particles
            for (let i = 0; i < 3; i++) {
                const pAngle = time * 6 + (i * Math.PI * 2 / 3);
                const px = Math.cos(pAngle) * 16;
                const py = Math.sin(pAngle) * 12 - (isLaunching ? 8 : 0);
                ctx.fillStyle = '#121315';
                ctx.fillRect(px - 1.5, py - 1.5, 3, 3);
            }

            // Body contour with dithered ink hatch
            ctx.fillStyle = '#121315';
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 2.2;

            if (isLaunching) {
                // Plasma needle ascent
                ctx.beginPath();
                ctx.moveTo(0, -36);
                ctx.lineTo(8, -12);
                ctx.lineTo(6, 18);
                ctx.lineTo(0, 36);
                ctx.lineTo(-6, 18);
                ctx.lineTo(-8, -12);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Energy Horns / Crest
                ctx.beginPath();
                ctx.moveTo(-6, -26);
                ctx.lineTo(-12, -40);
                ctx.lineTo(-4, -32);
                ctx.moveTo(6, -26);
                ctx.lineTo(12, -40);
                ctx.lineTo(4, -32);
                ctx.stroke();

                // Radiant core
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.ellipse(0, -6, 3, 10, 0, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Standing Phantom Silhouette
                // Crown / horns
                ctx.beginPath();
                ctx.moveTo(-8, -14);
                ctx.lineTo(-14, -28);
                ctx.lineTo(-4, -20);
                ctx.lineTo(0, -26);
                ctx.lineTo(4, -20);
                ctx.lineTo(14, -28);
                ctx.lineTo(8, -14);
                ctx.fill();
                ctx.stroke();

                // Head
                ctx.beginPath();
                ctx.arc(0, -14, 9, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Piercing glowing diamond eyes
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(-3, -14, 1.8, 0, Math.PI * 2);
                ctx.arc(3, -14, 1.8, 0, Math.PI * 2);
                ctx.fill();

                // Segmented kinetic torso
                ctx.beginPath();
                ctx.moveTo(-8, -4);
                ctx.lineTo(8, -4);
                ctx.lineTo(5, 8);
                ctx.lineTo(-5, 8);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Central glowing plasma rune
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.moveTo(0, -2);
                ctx.lineTo(3, 2);
                ctx.lineTo(0, 6);
                ctx.lineTo(-3, 2);
                ctx.closePath();
                ctx.fill();

                // Ethereal arms
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2.4;
                ctx.beginPath();
                ctx.moveTo(-6, -3);
                ctx.lineTo(-11, 7);
                ctx.moveTo(6, -3);
                ctx.lineTo(11, 7);
                ctx.stroke();

                // Pointed hover legs
                ctx.beginPath();
                ctx.moveTo(-4, 9);
                ctx.lineTo(-3, 22);
                ctx.moveTo(4, 9);
                ctx.lineTo(3, 22);
                ctx.stroke();
            }
            ctx.restore();
            ctx.restore();
            return;
        }

        // ==========================================
        // SKIN: ZOMBIE (Кибер-Зомби) - Toxic Bio-Ink with Cyber Implants & Ripped Clothes
        // ==========================================
        if (skin === 'zombie') {
            ctx.save();
            ctx.fillStyle = '#263a2c'; // Dark bio-toxin decayed green-ink
            ctx.strokeStyle = '#121315';
            ctx.lineWidth = 2;

            if (isLaunching) {
                // Stretched launch pose
                ctx.beginPath();
                ctx.ellipse(0, -5, 8.5, 22, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Ripped biomech head
                ctx.beginPath();
                ctx.arc(0, -28, 9, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Asymmetric eyes: glowing red cyber-optic & dark socket
                ctx.fillStyle = '#e53935';
                ctx.fillRect(-4, -29, 3, 3);
                ctx.fillStyle = '#111111';
                ctx.fillRect(1, -29, 3, 3);

                // Exposed cybernetic screw/antenna on head
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(3, -37);
                ctx.lineTo(3, -42);
                ctx.lineTo(6, -42);
                ctx.stroke();

                // Shredded, tattered sawtooth scarf
                ctx.save();
                ctx.strokeStyle = '#263a2c';
                ctx.lineWidth = 3.5;
                ctx.beginPath();
                const zWave = Math.sin(time * 20) * 8;
                ctx.moveTo(0, -18);
                ctx.lineTo(-4 + zWave, 6);
                ctx.lineTo(3 + zWave, 20);
                ctx.lineTo(-2 + zWave * 0.5, 34);
                ctx.stroke();
                ctx.restore();

                // Arms with claws
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(-6, -20);
                ctx.lineTo(-13, -38);
                ctx.moveTo(6, -20);
                ctx.lineTo(13, -38);
                ctx.stroke();

                // Legs
                ctx.beginPath();
                ctx.moveTo(-4, 14);
                ctx.lineTo(-5, 28);
                ctx.moveTo(4, 14);
                ctx.lineTo(4, 28);
                ctx.stroke();
            } else {
                // Standing / Charging pose
                // Jagged Zombie Head
                ctx.beginPath();
                ctx.arc(0, -16, 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Exposed cyber antenna / bolt
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(4, -25);
                ctx.lineTo(4, -30);
                ctx.stroke();
                ctx.fillStyle = '#121315';
                ctx.fillRect(2, -31, 4, 2);

                // Red cyber-optic & dead hollow eye
                ctx.fillStyle = '#e53935';
                ctx.fillRect(-5, -17, 3.5, 3);
                ctx.fillStyle = '#0a0a0b';
                ctx.fillRect(1.5, -17, 3.5, 3);
                // Stitched mouth
                ctx.fillStyle = '#121315';
                ctx.fillRect(-3, -11, 6, 1.5);
                ctx.fillRect(-1, -13, 1.5, 4);

                // Torso (Tattered clothes with exposed phosphor-green circuit ribs)
                ctx.fillStyle = '#263a2c';
                ctx.beginPath();
                ctx.moveTo(-9, -6);
                ctx.lineTo(9, -6);
                ctx.lineTo(6, 10);
                ctx.lineTo(-6, 10);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Phosphor circuit ribs
                ctx.strokeStyle = '#81c784';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(-4, -1);
                ctx.lineTo(4, -1);
                ctx.moveTo(-3, 3);
                ctx.lineTo(3, 3);
                ctx.moveTo(0, -3);
                ctx.lineTo(0, 7);
                ctx.stroke();

                // Arms
                ctx.strokeStyle = '#263a2c';
                ctx.lineWidth = 2.8;
                if (state === 'charging') {
                    ctx.beginPath();
                    ctx.moveTo(-8, -4);
                    ctx.lineTo(-14, 4);
                    ctx.lineTo(-9, 10);
                    ctx.moveTo(8, -4);
                    ctx.lineTo(14, 4);
                    ctx.lineTo(9, 10);
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.moveTo(-8, -4);
                    ctx.lineTo(-13, 6);
                    ctx.moveTo(8, -4);
                    ctx.lineTo(13, 6);
                    ctx.stroke();
                }

                // Legs & Boots
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(-4, 10);
                ctx.lineTo(-5, 20);
                ctx.moveTo(4, 10);
                ctx.lineTo(5, 20);
                ctx.stroke();
            }
            ctx.restore();
            ctx.restore();
            return;
        }

        // ==========================================
        // SKIN: AVIATOR (Ретро-Авиатор) - Steampunk Pilot with Goggles & Scarf
        // ==========================================
        if (skin === 'aviator') {
            ctx.save();
            ctx.fillStyle = '#3a2818';
            ctx.strokeStyle = '#121315';
            ctx.lineWidth = 2.2;

            if (isLaunching) {
                // Ascent Pose
                // Aerodynamic silk scarf tails fluttering back into the slipstream (drawn behind body)
                const sw1 = Math.sin(time * 24) * 6;
                const sw2 = Math.cos(time * 20) * 5;
                ctx.fillStyle = '#f8f8f6';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 1.6;

                // Left fluttering scarf ribbon
                ctx.beginPath();
                ctx.moveTo(-5, -18);
                ctx.quadraticCurveTo(-14 + sw1, -6, -18 + sw2, 12);
                ctx.lineTo(-13 + sw2, 13);
                ctx.quadraticCurveTo(-9 + sw1, -4, -2, -16);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Right fluttering scarf ribbon
                ctx.beginPath();
                ctx.moveTo(3, -18);
                ctx.quadraticCurveTo(12 - sw2, -7, 16 - sw1, 10);
                ctx.lineTo(11 - sw1, 11);
                ctx.quadraticCurveTo(8 - sw2, -5, 0, -16);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Streamline leather body
                ctx.fillStyle = '#3a2818';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2.2;
                ctx.beginPath();
                ctx.ellipse(0, -5, 8.5, 22, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Flight Helm
                ctx.fillStyle = '#4a3320';
                ctx.beginPath();
                ctx.arc(0, -28, 9, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Top mini-propeller spinning
                const propSpin = Math.cos(time * 35) * 11;
                ctx.strokeStyle = '#d4a373';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(-propSpin, -39);
                ctx.lineTo(propSpin, -39);
                ctx.stroke();
                ctx.fillStyle = '#121315';
                ctx.fillRect(-1.5, -39, 3, 3);

                // Brass Goggles
                ctx.fillStyle = '#c8963e';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(-3.5, -28, 3.5, 0, Math.PI * 2);
                ctx.arc(3.5, -28, 3.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                // Cyan lens reflections
                ctx.fillStyle = '#80deea';
                ctx.fillRect(-4.5, -29, 2, 2);
                ctx.fillRect(2.5, -29, 2, 2);

                // Silk scarf neck wrap collar
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.rect(-7, -20, 14, 5);
                ctx.fill();
                ctx.stroke();
                // Golden neck clasp
                ctx.fillStyle = '#c8963e';
                ctx.fillRect(-1.5, -19, 3, 3);

                // Leather boots
                ctx.fillStyle = '#2a1d12';
                ctx.fillRect(-5, 12, 4, 15);
                ctx.strokeRect(-5, 12, 4, 15);
                ctx.fillRect(1, 12, 4, 15);
                ctx.strokeRect(1, 12, 4, 15);
            } else {
                // Standing / Charging pose
                // Flight helmet with earflaps
                ctx.fillStyle = '#4a3320';
                ctx.beginPath();
                ctx.arc(0, -16, 10, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                // Earflaps
                ctx.fillRect(-10, -16, 3, 9);
                ctx.fillRect(7, -16, 3, 9);

                // Micro propeller on top of cap
                const propSpin = Math.cos(time * 8) * 8;
                ctx.strokeStyle = '#d4a373';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, -26);
                ctx.lineTo(0, -28);
                ctx.moveTo(-propSpin, -28);
                ctx.lineTo(propSpin, -28);
                ctx.stroke();
                ctx.fillStyle = '#121315';
                ctx.fillRect(-1.5, -29, 3, 2);

                // Brass Goggles pushed down or across forehead
                ctx.fillStyle = '#c8963e';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(-4, -16, 4, 0, Math.PI * 2);
                ctx.arc(4, -16, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                // Goggle lenses
                ctx.fillStyle = '#80deea';
                ctx.fillRect(-5, -17, 2.5, 2.5);
                ctx.fillRect(3, -17, 2.5, 2.5);
                // Goggle strap
                ctx.strokeStyle = '#121315';
                ctx.beginPath();
                ctx.moveTo(-10, -16);
                ctx.lineTo(-8, -16);
                ctx.moveTo(8, -16);
                ctx.lineTo(10, -16);
                ctx.stroke();

                // Silk scarf tied at neck with animated wave
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.rect(-6, -8, 12, 5);
                ctx.fill();
                ctx.stroke();
                // Scarf tails waving
                const scarfWave = Math.sin(time * 5) * 5;
                ctx.beginPath();
                ctx.moveTo(4, -5);
                ctx.quadraticCurveTo(12 + scarfWave, 2, 14 + scarfWave * 1.5, 12);
                ctx.lineTo(10 + scarfWave * 1.5, 12);
                ctx.quadraticCurveTo(8 + scarfWave, 2, 1, -4);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Brown leather jacket
                ctx.fillStyle = '#3a2818';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(-9, -4);
                ctx.lineTo(9, -4);
                ctx.lineTo(7, 10);
                ctx.lineTo(-7, 10);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                // Zipper & shearling collar
                ctx.strokeStyle = '#d4a373';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(0, -4);
                ctx.lineTo(0, 9);
                ctx.stroke();

                // Arms
                ctx.fillStyle = '#3a2818';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2;
                ctx.fillRect(-13, -2, 4, 11);
                ctx.strokeRect(-13, -2, 4, 11);
                ctx.fillRect(9, -2, 4, 11);
                ctx.strokeRect(9, -2, 4, 11);

                // Flight boots
                ctx.fillStyle = '#22160d';
                ctx.fillRect(-6, 10, 4, 11);
                ctx.strokeRect(-6, 10, 4, 11);
                ctx.fillRect(2, 10, 4, 11);
                ctx.strokeRect(2, 10, 4, 11);
            }
            ctx.restore();
            ctx.restore();
            return;
        }

        // ==========================================
        // SKIN: SHAMAN (Кибер-Шаман) - Neon Druid with Antlers & Floating Orbs
        // ==========================================
        if (skin === 'shaman') {
            ctx.save();
            ctx.fillStyle = '#1c1b29';
            ctx.strokeStyle = '#121315';
            ctx.lineWidth = 2.2;

            // 3 Orbiting Neon Plasma Orbs
            for (let i = 0; i < 3; i++) {
                const orbAngle = time * 4.5 + (i * Math.PI * 2 / 3);
                const orbDistX = 18;
                const orbDistY = isLaunching ? 20 : 10;
                const ox = Math.cos(orbAngle) * orbDistX;
                const oy = Math.sin(orbAngle) * orbDistY + (isLaunching ? -5 : 0);

                ctx.save();
                ctx.fillStyle = '#00f5d4';
                ctx.shadowColor = '#00f5d4';
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.arc(ox, oy, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            if (isLaunching) {
                // Rocket Ascent - Mystic cyber conduit
                ctx.beginPath();
                ctx.ellipse(0, -5, 8.5, 23, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Antler Sensor Crest
                ctx.strokeStyle = '#00f5d4';
                ctx.lineWidth = 2;
                ctx.beginPath();
                // Left antler
                ctx.moveTo(-4, -28);
                ctx.lineTo(-12, -42);
                ctx.lineTo(-15, -38);
                ctx.moveTo(-8, -35);
                ctx.lineTo(-5, -44);
                // Right antler
                ctx.moveTo(4, -28);
                ctx.lineTo(12, -42);
                ctx.lineTo(15, -38);
                ctx.moveTo(8, -35);
                ctx.lineTo(5, -44);
                ctx.stroke();

                // Head hood
                ctx.fillStyle = '#232038';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(0, -26, 8.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Glowing runic visor line
                ctx.fillStyle = '#00f5d4';
                ctx.fillRect(-5, -27, 10, 2.5);

                // Trailing energy ribbons
                ctx.strokeStyle = '#9d4edd';
                ctx.lineWidth = 2;
                ctx.beginPath();
                const rw1 = Math.sin(time * 20) * 8;
                ctx.moveTo(-5, 12);
                ctx.quadraticCurveTo(-10 + rw1, 26, -3 - rw1, 38);
                ctx.moveTo(5, 12);
                ctx.quadraticCurveTo(10 - rw1, 26, 3 + rw1, 38);
                ctx.stroke();
            } else {
                // Standing Mystic Pose
                // Antler Sensor Crown
                ctx.strokeStyle = '#00f5d4';
                ctx.lineWidth = 2.2;
                ctx.beginPath();
                // Left antler branches
                ctx.moveTo(-4, -18);
                ctx.lineTo(-11, -30);
                ctx.lineTo(-15, -27);
                ctx.moveTo(-8, -24);
                ctx.lineTo(-6, -32);
                // Right antler branches
                ctx.moveTo(4, -18);
                ctx.lineTo(11, -30);
                ctx.lineTo(15, -27);
                ctx.moveTo(8, -24);
                ctx.lineTo(6, -32);
                ctx.stroke();

                // Cowl Hood
                ctx.fillStyle = '#232038';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, -26);
                ctx.lineTo(9, -15);
                ctx.lineTo(7, -8);
                ctx.lineTo(-7, -8);
                ctx.lineTo(-9, -15);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Glowing Cyan Visor / Shaman Mask Slit
                ctx.fillStyle = '#00f5d4';
                ctx.fillRect(-5, -15, 10, 2.5);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-1, -15, 2, 2.5);

                // Flowing Cyber Cloak / Robes
                ctx.fillStyle = '#1c1b29';
                ctx.beginPath();
                ctx.moveTo(-8, -8);
                ctx.lineTo(8, -8);
                ctx.lineTo(12, 12);
                ctx.lineTo(-12, 12);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Cyber-runic pattern on robe
                ctx.strokeStyle = '#00f5d4';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(0, -5);
                ctx.lineTo(0, 9);
                ctx.moveTo(-4, 0);
                ctx.lineTo(4, 0);
                ctx.moveTo(-6, 6);
                ctx.lineTo(6, 6);
                ctx.stroke();

                // Violet energy core talisman
                ctx.fillStyle = '#9d4edd';
                ctx.beginPath();
                ctx.arc(0, -2, 3, 0, Math.PI * 2);
                ctx.fill();

                // Robe sleeves & Hands
                ctx.fillStyle = '#232038';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2;
                ctx.fillRect(-14, -6, 5, 14);
                ctx.strokeRect(-14, -6, 5, 14);
                ctx.fillRect(9, -6, 5, 14);
                ctx.strokeRect(9, -6, 5, 14);

                // Hover base / Feet under robe
                ctx.fillStyle = '#121315';
                ctx.fillRect(-5, 12, 3, 8);
                ctx.fillRect(2, 12, 3, 8);
            }
            ctx.restore();
            ctx.restore();
            return;
        }

        // ==========================================
        // SKIN: SAMURAI (Самурай Пустоты) - Void Ronin with Kasa & Dual Katanas
        // ==========================================
        if (skin === 'samurai') {
            ctx.save();
            ctx.fillStyle = '#18191c';
            ctx.strokeStyle = '#121315';
            ctx.lineWidth = 2.2;

            if (isLaunching) {
                // Sleek Aerodynamic Katana Dive
                ctx.beginPath();
                ctx.ellipse(0, -5, 8.5, 23, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Dual Energized Katanas sticking out backward
                ctx.strokeStyle = '#ff2a5f';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(-8, -15);
                ctx.lineTo(-14, 25);
                ctx.moveTo(8, -15);
                ctx.lineTo(14, 25);
                ctx.stroke();

                // Conical Kasa Hat slicing air
                ctx.fillStyle = '#22252a';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, -38);
                ctx.lineTo(15, -25);
                ctx.lineTo(-15, -25);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Crimson visor gleam
                ctx.fillStyle = '#ff2a5f';
                ctx.fillRect(-5, -23, 10, 2.5);

                // Haori streaming ribbons
                ctx.strokeStyle = '#ffb703';
                ctx.lineWidth = 2;
                const kw = Math.sin(time * 22) * 6;
                ctx.beginPath();
                ctx.moveTo(-4, 12);
                ctx.lineTo(-7 + kw, 34);
                ctx.moveTo(4, 12);
                ctx.lineTo(7 - kw, 34);
                ctx.stroke();
            } else {
                // Standing Ronin Pose
                // Dual Katana Hilts & Blades over back
                ctx.strokeStyle = '#ff2a5f';
                ctx.lineWidth = 2.4;
                ctx.beginPath();
                // Left katana hilt & blade
                ctx.moveTo(-5, -12);
                ctx.lineTo(-14, -28);
                // Right katana hilt & blade
                ctx.moveTo(5, -12);
                ctx.lineTo(14, -28);
                ctx.stroke();

                // Tsuba (handguards)
                ctx.fillStyle = '#ffb703';
                ctx.fillRect(-15, -23, 5, 2);
                ctx.fillRect(10, -23, 5, 2);

                // Conical Kasa Hat
                ctx.fillStyle = '#252830';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, -28);
                ctx.lineTo(18, -16);
                ctx.lineTo(-18, -16);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Hat apex ornament & optic cables
                ctx.fillStyle = '#ff2a5f';
                ctx.fillRect(-2, -30, 4, 3);
                ctx.strokeStyle = '#ff2a5f';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(-12, -16);
                ctx.lineTo(-14, -8);
                ctx.moveTo(12, -16);
                ctx.lineTo(14, -8);
                ctx.stroke();

                // Glowing Ronin Visor / Cyber Eye beneath the brim
                ctx.fillStyle = '#121315';
                ctx.fillRect(-8, -16, 16, 8);
                ctx.fillStyle = '#ff2a5f';
                ctx.fillRect(-4, -13, 8, 2.5);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-1, -13, 2, 2.5);

                // Haori Armor / Cyber Kimono
                ctx.fillStyle = '#18191c';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(-10, -7);
                ctx.lineTo(10, -7);
                ctx.lineTo(8, 10);
                ctx.lineTo(-8, 10);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Golden Obi Sash
                ctx.fillStyle = '#ffb703';
                ctx.fillRect(-8, 3, 16, 4);
                ctx.strokeStyle = '#121315';
                ctx.strokeRect(-8, 3, 16, 4);

                // Wide Haori Sleeves
                ctx.fillStyle = '#22252a';
                ctx.fillRect(-15, -5, 5, 12);
                ctx.strokeRect(-15, -5, 5, 12);
                ctx.fillRect(10, -5, 5, 12);
                ctx.strokeRect(10, -5, 5, 12);

                // Hakama Pants & Tabi Boots
                ctx.fillStyle = '#121315';
                ctx.fillRect(-6, 10, 4, 11);
                ctx.strokeRect(-6, 10, 4, 11);
                ctx.fillRect(2, 10, 4, 11);
                ctx.strokeRect(2, 10, 4, 11);
            }
            ctx.restore();
            ctx.restore();
            return;
        }

        // ==========================================
        // SKIN: TITAN (Меха-Титан MK-IV) - Apex Heavy Armor & Plasma Thrusters
        // ==========================================
        if (skin === 'titan') {
            ctx.save();
            ctx.fillStyle = '#2b2d42';
            ctx.strokeStyle = '#121315';
            ctx.lineWidth = 2.4;

            if (isLaunching) {
                // Heavy booster ascent
                // Twin back booster rockets
                ctx.fillStyle = '#8d99ae';
                ctx.fillRect(-14, -18, 6, 26);
                ctx.strokeRect(-14, -18, 6, 26);
                ctx.fillRect(8, -18, 6, 26);
                ctx.strokeRect(8, -18, 6, 26);

                // Dual Plasma Thruster Flames
                ctx.fillStyle = '#ff6b35';
                const flameH = 20 + Math.sin(time * 30) * 8;
                ctx.beginPath();
                ctx.moveTo(-14, 8);
                ctx.lineTo(-11, 8 + flameH);
                ctx.lineTo(-8, 8);
                ctx.moveTo(8, 8);
                ctx.lineTo(11, 8 + flameH);
                ctx.lineTo(14, 8);
                ctx.fill();

                // Heavy Armored Torso
                ctx.fillStyle = '#edf2f4';
                ctx.beginPath();
                ctx.ellipse(0, -6, 11, 24, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Heavy angular helm
                ctx.fillStyle = '#2b2d42';
                ctx.fillRect(-9, -36, 18, 16);
                ctx.strokeRect(-9, -36, 18, 16);

                // Crosshair Visor
                ctx.fillStyle = '#ff6b35';
                ctx.fillRect(-6, -30, 12, 3);
                ctx.fillRect(-1, -33, 2, 9);

                // Reinforced Heavy Pauldrons
                ctx.fillStyle = '#8d99ae';
                ctx.fillRect(-17, -22, 7, 12);
                ctx.strokeRect(-17, -22, 7, 12);
                ctx.fillRect(10, -22, 7, 12);
                ctx.strokeRect(10, -22, 7, 12);

                // Hydraulic Legs
                ctx.fillStyle = '#2b2d42';
                ctx.fillRect(-6, 14, 5, 14);
                ctx.strokeRect(-6, 14, 5, 14);
                ctx.fillRect(1, 14, 5, 14);
                ctx.strokeRect(1, 14, 5, 14);
            } else {
                // Massive Stance / Charging Pose
                // Back Jump Thrusters
                ctx.fillStyle = '#8d99ae';
                ctx.fillRect(-16, -16, 6, 24);
                ctx.strokeRect(-16, -16, 6, 24);
                ctx.fillRect(10, -16, 6, 24);
                ctx.strokeRect(10, -16, 6, 24);

                // Massive Angular Pauldrons (Shoulders)
                ctx.fillStyle = '#8d99ae';
                ctx.beginPath();
                ctx.moveTo(-18, -10);
                ctx.lineTo(-10, -18);
                ctx.lineTo(-9, -4);
                ctx.lineTo(-17, -2);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(18, -10);
                ctx.lineTo(10, -18);
                ctx.lineTo(9, -4);
                ctx.lineTo(17, -2);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Reinforced Heavy Helm
                ctx.fillStyle = '#2b2d42';
                ctx.fillRect(-9, -26, 18, 16);
                ctx.strokeRect(-9, -26, 18, 16);

                // Tactical Orange Crosshair Visor
                ctx.fillStyle = '#ff6b35';
                ctx.fillRect(-7, -20, 14, 3);
                ctx.fillRect(-1.5, -23, 3, 9);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-1, -20, 2, 3);

                // Heavy Chest Chobham Plate
                ctx.fillStyle = '#edf2f4';
                ctx.beginPath();
                ctx.moveTo(-11, -8);
                ctx.lineTo(11, -8);
                ctx.lineTo(8, 10);
                ctx.lineTo(-8, 10);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Hexagonal Plasma Core
                ctx.fillStyle = '#ff6b35';
                ctx.beginPath();
                ctx.arc(0, 1, 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();

                // Armored Arms
                ctx.fillStyle = '#2b2d42';
                ctx.fillRect(-16, -2, 5, 13);
                ctx.strokeRect(-16, -2, 5, 13);
                ctx.fillRect(11, -2, 5, 13);
                ctx.strokeRect(11, -2, 5, 13);

                // Heavy Hydraulic Leg Servos
                ctx.fillStyle = '#2b2d42';
                ctx.fillRect(-7, 10, 5, 12);
                ctx.strokeRect(-7, 10, 5, 12);
                ctx.fillRect(2, 10, 5, 12);
                ctx.strokeRect(2, 10, 5, 12);
            }
            ctx.restore();
            ctx.restore();
            return;
        }

        // ==========================================
        // SKIN: CELESTIAL (Небожитель / Cosmic Demiurge) - Hyper Ultra Legendary VIP Exclusive
        // Epic Mecha-Seraph: Layered Razor Blade Wings, Solar Eclipse Spiked Mandala,
        // Angular Horned War-Helm, Dark Singularity Event-Horizon Reactor & Titanium Pauldrons
        // ==========================================
        if (skin === 'celestial') {
            ctx.save();
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#121315';
            ctx.lineWidth = 2.2;

            const flutter = Math.sin(time * 7) * 4;
            const haloRot = time * 0.85;
            const corePulse = 1.0 + Math.sin(time * 8) * 0.2;
            const floatBob = Math.sin(time * 3.5) * 3;

            if (isLaunching) {
                // =========================================================
                // ASCENT / LAUNCHING POSE:
                // Hypersonic Divine Weapon Silhouette with Swept-Back Razor Wings
                // =========================================================

                // 1. Massive Hypersonic Plasma Ion Exhaust Plumes & Shockwave Rings
                ctx.save();
                const plumeLen = 46 + Math.sin(time * 30) * 14;
                const grad = ctx.createLinearGradient(0, 16, 0, 16 + plumeLen);
                grad.addColorStop(0, '#ffffff');
                grad.addColorStop(0.18, '#fef08a');
                grad.addColorStop(0.5, '#f59e0b');
                grad.addColorStop(0.82, '#00f0ff');
                grad.addColorStop(1, 'rgba(0, 240, 255, 0)');
                ctx.fillStyle = grad;
                ctx.shadowColor = '#f59e0b';
                ctx.shadowBlur = 20;

                // Central hypersonic thrust needle
                ctx.beginPath();
                ctx.moveTo(-11, 16);
                ctx.lineTo(0, 16 + plumeLen);
                ctx.lineTo(11, 16);
                ctx.closePath();
                ctx.fill();

                // Twin secondary side booster plumes
                ctx.fillStyle = 'rgba(0, 240, 255, 0.7)';
                ctx.beginPath();
                ctx.moveTo(-16, 12);
                ctx.lineTo(-10, 12 + plumeLen * 0.6);
                ctx.lineTo(-6, 12);
                ctx.closePath();
                ctx.fill();
                ctx.beginPath();
                ctx.moveTo(16, 12);
                ctx.lineTo(10, 12 + plumeLen * 0.6);
                ctx.lineTo(6, 12);
                ctx.closePath();
                ctx.fill();

                // Mach Diamond Shockwave Rings in exhaust
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2;
                for (let m = 0; m < 4; m++) {
                    const my = 20 + m * 9 + Math.sin(time * 25 + m) * 2;
                    ctx.strokeRect(-5, my, 10, 3);
                }
                ctx.restore();

                // 2. Swept-Back Layered Razor Photon Blades (Wings in High-Speed Flight)
                ctx.save();
                ctx.shadowColor = '#facc15';
                ctx.shadowBlur = 16;

                // Left wing: 3 sharp swept-back razor blades
                ctx.fillStyle = '#fef08a';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(-6, -8);
                ctx.lineTo(-26, -32);
                ctx.lineTo(-48, -14 + flutter);
                ctx.lineTo(-28, -4);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#f59e0b';
                ctx.beginPath();
                ctx.moveTo(-8, -2);
                ctx.lineTo(-32, 2 + flutter);
                ctx.lineTo(-52, 24 + flutter);
                ctx.lineTo(-22, 14);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#00f0ff';
                ctx.beginPath();
                ctx.moveTo(-6, 6);
                ctx.lineTo(-22, 20);
                ctx.lineTo(-35, 38 + flutter);
                ctx.lineTo(-14, 18);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Right wing: 3 sharp swept-back razor blades (Mirrored)
                ctx.fillStyle = '#fef08a';
                ctx.beginPath();
                ctx.moveTo(6, -8);
                ctx.lineTo(26, -32);
                ctx.lineTo(48, -14 - flutter);
                ctx.lineTo(28, -4);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#f59e0b';
                ctx.beginPath();
                ctx.moveTo(8, -2);
                ctx.lineTo(32, 2 - flutter);
                ctx.lineTo(52, 24 - flutter);
                ctx.lineTo(22, 14);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                ctx.fillStyle = '#00f0ff';
                ctx.beginPath();
                ctx.moveTo(6, 6);
                ctx.lineTo(22, 20);
                ctx.lineTo(35, 38 - flutter);
                ctx.lineTo(14, 18);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.restore();

                // 3. Spiked Eclipse Halo in Flight (Compresses into focus ring behind shoulders)
                ctx.save();
                ctx.shadowColor = '#f59e0b';
                ctx.shadowBlur = 14;
                ctx.strokeStyle = '#f59e0b';
                ctx.lineWidth = 2.4;
                ctx.beginPath();
                ctx.ellipse(0, -28, 20, 7, 0, 0, Math.PI * 2);
                ctx.stroke();
                for (let s = 0; s < 6; s++) {
                    const sa = -Math.PI + (s + 0.5) * (Math.PI / 3);
                    const sx = Math.cos(sa) * 20;
                    const sy = -28 + Math.sin(sa) * 7;
                    ctx.fillStyle = '#fef08a';
                    ctx.beginPath();
                    ctx.moveTo(sx, sy);
                    ctx.lineTo(sx * 1.35, sy - 8);
                    ctx.lineTo(sx * 0.85, sy);
                    ctx.closePath();
                    ctx.fill();
                }
                ctx.restore();

                // 4. Heavy Aerodynamic Mecha Chassis / Torso
                ctx.fillStyle = '#1c1917';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2.4;
                ctx.beginPath();
                ctx.moveTo(-11, -18);
                ctx.lineTo(11, -18);
                ctx.lineTo(9, 14);
                ctx.lineTo(-9, 14);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // White Titanium Center Breastplate
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.moveTo(-8, -16);
                ctx.lineTo(8, -16);
                ctx.lineTo(6, 6);
                ctx.lineTo(-6, 6);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Heavy Sharp Pauldrons (Shoulders)
                ctx.fillStyle = '#f59e0b';
                ctx.strokeStyle = '#121315';
                ctx.beginPath();
                ctx.moveTo(-11, -18);
                ctx.lineTo(-21, -26);
                ctx.lineTo(-19, -9);
                ctx.lineTo(-11, -7);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(11, -18);
                ctx.lineTo(21, -26);
                ctx.lineTo(19, -9);
                ctx.lineTo(11, -7);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // 5. Singularity Event-Horizon Core (Chest)
                ctx.save();
                ctx.shadowColor = '#00f0ff';
                ctx.shadowBlur = 18;
                ctx.fillStyle = '#00f0ff';
                ctx.beginPath();
                ctx.arc(0, -5, 5.5 * corePulse, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(0, -5, 2.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#0a0a0c';
                ctx.beginPath();
                ctx.arc(0, -5, 1.2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                // 6. Angular Horned Demiurge War-Helm
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2.2;
                ctx.beginPath();
                ctx.moveTo(0, -32);
                ctx.lineTo(9, -24);
                ctx.lineTo(8, -15);
                ctx.lineTo(0, -13);
                ctx.lineTo(-8, -15);
                ctx.lineTo(-9, -24);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Sharp Golden Crest / Horns
                ctx.fillStyle = '#f59e0b';
                ctx.strokeStyle = '#121315';
                ctx.beginPath();
                ctx.moveTo(-8, -21);
                ctx.lineTo(-16, -35);
                ctx.lineTo(-6, -28);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(8, -21);
                ctx.lineTo(16, -35);
                ctx.lineTo(6, -28);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Menacing Predatory Slit Visor Optics
                ctx.save();
                ctx.shadowColor = '#00f0ff';
                ctx.shadowBlur = 12;
                ctx.strokeStyle = '#00f0ff';
                ctx.lineWidth = 2.5;
                ctx.beginPath();
                ctx.moveTo(-6, -20);
                ctx.lineTo(-1.5, -21);
                ctx.lineTo(1.5, -21);
                ctx.lineTo(6, -20);
                ctx.stroke();
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-3, -22, 6, 1.5);
                ctx.restore();

                // Heavy Armored Greaves & Boosters
                ctx.fillStyle = '#1c1917';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2.2;
                ctx.fillRect(-8, 9, 6, 10);
                ctx.strokeRect(-8, 9, 6, 10);
                ctx.fillRect(2, 9, 6, 10);
                ctx.strokeRect(2, 9, 6, 10);
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(-7, 12, 4, 6);
                ctx.fillRect(3, 12, 4, 6);

            } else {
                // =========================================================
                // IDLE / CHARGING POSE:
                // Ultra-Badass Cosmic Demiurge: Layered Razor Blade Wings,
                // Astrolabe Spiked Solar Mandala, Floating Blade Bits,
                // Armored Gauntlets & Heavy Titanium Mecha Chassis
                // =========================================================

                // 1. Grand Rotating Spiked Astrolabe Mandala (Centered behind neck/helm at y = -22)
                ctx.save();
                ctx.translate(0, -22);
                ctx.rotate(haloRot);
                ctx.shadowColor = '#f59e0b';
                ctx.shadowBlur = 20;

                // 8 Primary Gold Sun Rays (Long Razor Lances)
                ctx.fillStyle = '#f59e0b';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 1.8;
                for (let r = 0; r < 8; r++) {
                    const ra = r * (Math.PI / 4);
                    ctx.save();
                    ctx.rotate(ra);
                    ctx.beginPath();
                    ctx.moveTo(-4, -18);
                    ctx.lineTo(0, -38);
                    ctx.lineTo(4, -18);
                    ctx.closePath();
                    ctx.fill();
                    ctx.stroke();

                    // Razor inner bevel
                    ctx.fillStyle = '#fef08a';
                    ctx.beginPath();
                    ctx.moveTo(-2, -18);
                    ctx.lineTo(0, -34);
                    ctx.lineTo(2, -18);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }

                // 8 Secondary Cyan Energy Plasma Teeth
                ctx.fillStyle = '#00f0ff';
                for (let r = 0; r < 8; r++) {
                    const ra = r * (Math.PI / 4) + (Math.PI / 8);
                    ctx.save();
                    ctx.rotate(ra);
                    ctx.beginPath();
                    ctx.moveTo(-2.5, -17);
                    ctx.lineTo(0, -28);
                    ctx.lineTo(2.5, -17);
                    ctx.closePath();
                    ctx.fill();
                    ctx.restore();
                }

                // Outer Sacred Astrolabe Ring
                ctx.strokeStyle = '#f59e0b';
                ctx.lineWidth = 2.4;
                ctx.beginPath();
                ctx.arc(0, 0, 21, 0, Math.PI * 2);
                ctx.stroke();

                // Inner Tech Gear Ring (Dotted Tick Marks)
                ctx.strokeStyle = '#00f0ff';
                ctx.lineWidth = 1.6;
                ctx.setLineDash([3, 4]);
                ctx.beginPath();
                ctx.arc(0, 0, 15, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);

                // 8 Orbital Light Focus Nodes
                for (let n = 0; n < 8; n++) {
                    const na = n * (Math.PI / 4);
                    const nx = Math.cos(na) * 21;
                    const ny = Math.sin(na) * 21;
                    ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.arc(nx, ny, 2.5, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();

                // 2. Floating Anti-Gravity Orbiting Blade Bits (Levitating beside shoulders)
                ctx.save();
                ctx.shadowColor = '#00f0ff';
                ctx.shadowBlur = 14;
                const bitBobL = Math.sin(time * 4) * 4;
                const bitBobR = Math.cos(time * 4) * 4;

                // Left Bit Drone (Hovering near left pauldron)
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.moveTo(-25, -28 + bitBobL);
                ctx.lineTo(-20, -42 + bitBobL);
                ctx.lineTo(-17, -25 + bitBobL);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = '#00f0ff';
                ctx.fillRect(-22, -36 + bitBobL, 2.5, 8);

                // Right Bit Drone (Hovering near right pauldron)
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.moveTo(25, -28 + bitBobR);
                ctx.lineTo(20, -42 + bitBobR);
                ctx.lineTo(17, -25 + bitBobR);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = '#00f0ff';
                ctx.fillRect(19.5, -36 + bitBobR, 2.5, 8);
                ctx.restore();

                // 3. Massive Multi-Tiered Razor Blade Seraph Wings (Aggressive Archangel Span)
                ctx.save();
                const wingWiggle = Math.sin(time * 3.5) * 3;
                ctx.shadowColor = '#facc15';
                ctx.shadowBlur = 18;

                // LEFT WING - 4 Layered Sharp Razor Blades
                // Layer 1: Highest Arching Razor Blade
                ctx.fillStyle = '#fef08a';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2.2;
                ctx.beginPath();
                ctx.moveTo(-6, -6);
                ctx.lineTo(-26, -38 + wingWiggle);
                ctx.lineTo(-46, -46 + wingWiggle);
                ctx.lineTo(-34, -22 + wingWiggle);
                ctx.lineTo(-14, -6);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                // Blade spine glowing channel
                ctx.strokeStyle = '#f59e0b';
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.moveTo(-10, -10);
                ctx.lineTo(-40, -40 + wingWiggle);
                ctx.stroke();

                // Layer 2: Main Primary Blade
                ctx.fillStyle = '#fde047';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2.2;
                ctx.beginPath();
                ctx.moveTo(-8, -2);
                ctx.lineTo(-36, -16 + wingWiggle);
                ctx.lineTo(-58, -14 + wingWiggle);
                ctx.lineTo(-40, 4 + wingWiggle);
                ctx.lineTo(-12, 2);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Layer 3: Lower Swept Razor Blade
                ctx.fillStyle = '#f59e0b';
                ctx.beginPath();
                ctx.moveTo(-6, 2);
                ctx.lineTo(-30, 8 + wingWiggle);
                ctx.lineTo(-48, 20 + wingWiggle);
                ctx.lineTo(-26, 18 + wingWiggle);
                ctx.lineTo(-6, 8);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Layer 4: Cyan Energy Fin Underneath
                ctx.fillStyle = '#00f0ff';
                ctx.shadowColor = '#00f0ff';
                ctx.beginPath();
                ctx.moveTo(-4, 6);
                ctx.lineTo(-20, 20 + wingWiggle);
                ctx.lineTo(-32, 34 + wingWiggle);
                ctx.lineTo(-14, 22 + wingWiggle);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // RIGHT WING - 4 Layered Sharp Razor Blades (Mirrored)
                ctx.shadowColor = '#facc15';
                // Layer 1: Highest Arching Razor Blade
                ctx.fillStyle = '#fef08a';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2.2;
                ctx.beginPath();
                ctx.moveTo(6, -6);
                ctx.lineTo(26, -38 - wingWiggle);
                ctx.lineTo(46, -46 - wingWiggle);
                ctx.lineTo(34, -22 - wingWiggle);
                ctx.lineTo(14, -6);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                // Blade spine glowing channel
                ctx.strokeStyle = '#f59e0b';
                ctx.lineWidth = 1.8;
                ctx.beginPath();
                ctx.moveTo(10, -10);
                ctx.lineTo(40, -40 - wingWiggle);
                ctx.stroke();

                // Layer 2: Main Primary Blade
                ctx.fillStyle = '#fde047';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2.2;
                ctx.beginPath();
                ctx.moveTo(8, -2);
                ctx.lineTo(36, -16 - wingWiggle);
                ctx.lineTo(58, -14 - wingWiggle);
                ctx.lineTo(40, 4 - wingWiggle);
                ctx.lineTo(12, 2);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Layer 3: Lower Swept Razor Blade
                ctx.fillStyle = '#f59e0b';
                ctx.beginPath();
                ctx.moveTo(6, 2);
                ctx.lineTo(30, 8 - wingWiggle);
                ctx.lineTo(48, 20 - wingWiggle);
                ctx.lineTo(26, 18 - wingWiggle);
                ctx.lineTo(6, 8);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Layer 4: Cyan Energy Fin Underneath
                ctx.fillStyle = '#00f0ff';
                ctx.shadowColor = '#00f0ff';
                ctx.beginPath();
                ctx.moveTo(4, 6);
                ctx.lineTo(20, 20 - wingWiggle);
                ctx.lineTo(32, 34 - wingWiggle);
                ctx.lineTo(14, 22 - wingWiggle);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.restore();

                // 4. Heavy Armored Torso Chassis & Battle Standards
                // Dark Obsidian / Carbon Fiber Chassis Under-Armor
                ctx.fillStyle = '#1c1917';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2.4;
                ctx.beginPath();
                ctx.moveTo(-10, -16);
                ctx.lineTo(10, -16);
                ctx.lineTo(8, 12);
                ctx.lineTo(-8, 12);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Flowing Twin Angular Combat Standards / Mantle Tails
                const tailWiggle = Math.sin(time * 4.5) * 4;
                ctx.fillStyle = '#121315';
                ctx.strokeStyle = '#f59e0b';
                ctx.lineWidth = 1.8;
                // Left banner
                ctx.beginPath();
                ctx.moveTo(-8, 8);
                ctx.lineTo(-14 + tailWiggle, 22);
                ctx.lineTo(-8 + tailWiggle, 29);
                ctx.lineTo(-3, 10);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                // Right banner
                ctx.beginPath();
                ctx.moveTo(8, 8);
                ctx.lineTo(14 - tailWiggle, 22);
                ctx.lineTo(8 - tailWiggle, 29);
                ctx.lineTo(3, 10);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Angular White Titanium Breastplate
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2.2;
                ctx.beginPath();
                ctx.moveTo(-8, -15);
                ctx.lineTo(0, -4);
                ctx.lineTo(8, -15);
                ctx.lineTo(6, 6);
                ctx.lineTo(-6, 6);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Gold Chevron Inlays
                ctx.fillStyle = '#f59e0b';
                ctx.beginPath();
                ctx.moveTo(-6, -13);
                ctx.lineTo(0, -3);
                ctx.lineTo(6, -13);
                ctx.lineTo(4, -15);
                ctx.lineTo(0, -7);
                ctx.lineTo(-4, -15);
                ctx.closePath();
                ctx.fill();

                // 5. Heavy Segmented Pauldrons (Shoulders with Razor Edge Fins)
                ctx.fillStyle = '#f59e0b';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2.2;
                // Left Pauldron
                ctx.beginPath();
                ctx.moveTo(-9, -17);
                ctx.lineTo(-21, -25);
                ctx.lineTo(-19, -8);
                ctx.lineTo(-9, -6);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-18, -15, 6, 4);

                // Right Pauldron
                ctx.fillStyle = '#f59e0b';
                ctx.beginPath();
                ctx.moveTo(9, -17);
                ctx.lineTo(21, -25);
                ctx.lineTo(19, -8);
                ctx.lineTo(9, -6);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(12, -15, 6, 4);

                // 6. Armored Mecha Arms & Gauntlets
                ctx.fillStyle = '#1c1917';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2.2;

                const armTense = (state === 'charging') ? -3 : 0;
                // Left Arm & Gauntlet
                ctx.beginPath();
                ctx.moveTo(-11, -8);
                ctx.lineTo(-17, 2 + armTense);
                ctx.lineTo(-13, 10 + armTense);
                ctx.lineTo(-8, 4);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                // Gauntlet gold plate & cyan conduit
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(-16, 3 + armTense, 4, 6);
                ctx.fillStyle = '#00f0ff';
                ctx.fillRect(-15, 4 + armTense, 2, 4);

                // Right Arm & Gauntlet
                ctx.fillStyle = '#1c1917';
                ctx.beginPath();
                ctx.moveTo(11, -8);
                ctx.lineTo(17, 2 + armTense);
                ctx.lineTo(13, 10 + armTense);
                ctx.lineTo(8, 4);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                // Gauntlet gold plate & cyan conduit
                ctx.fillStyle = '#f59e0b';
                ctx.fillRect(12, 3 + armTense, 4, 6);
                ctx.fillStyle = '#00f0ff';
                ctx.fillRect(13, 4 + armTense, 2, 4);

                // Charging energy crackle around gauntlets
                if (state === 'charging') {
                    ctx.strokeStyle = '#00f0ff';
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(-17, 6);
                    ctx.lineTo(-22, 12);
                    ctx.lineTo(-16, 14);
                    ctx.moveTo(17, 6);
                    ctx.lineTo(22, 12);
                    ctx.lineTo(16, 14);
                    ctx.stroke();
                }

                // 7. Singularity Event-Horizon Reactor (Concentric Pulsing Arc Core)
                ctx.save();
                ctx.shadowColor = '#00f0ff';
                ctx.shadowBlur = 20;
                // Outer Cyan Plasma Halo
                ctx.fillStyle = '#00f0ff';
                ctx.beginPath();
                ctx.arc(0, -5, 6.5 * corePulse, 0, Math.PI * 2);
                ctx.fill();
                // Golden Geometric Diamond Core Ring
                ctx.fillStyle = '#fef08a';
                ctx.beginPath();
                ctx.arc(0, -5, 4.0, 0, Math.PI * 2);
                ctx.fill();
                // Obsidian Event-Horizon Void
                ctx.fillStyle = '#0a0a0c';
                ctx.beginPath();
                ctx.arc(0, -5, 1.9, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                // 8. Angular Horned Demiurge War-Helm (Menacing Mecha Archangel)
                ctx.fillStyle = '#ffffff';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2.2;
                ctx.beginPath();
                ctx.moveTo(0, -33);
                ctx.lineTo(9.5, -24);
                ctx.lineTo(8.5, -15);
                ctx.lineTo(0, -13);
                ctx.lineTo(-8.5, -15);
                ctx.lineTo(-9.5, -24);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Heavy Dual V-Fin Golden Battle Crests (Horns)
                ctx.fillStyle = '#f59e0b';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2;
                // Left Horn
                ctx.beginPath();
                ctx.moveTo(-8, -21);
                ctx.lineTo(-18, -36);
                ctx.lineTo(-6, -28);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                // Right Horn
                ctx.beginPath();
                ctx.moveTo(8, -21);
                ctx.lineTo(18, -36);
                ctx.lineTo(6, -28);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Forehead Crown Diamond Inset
                ctx.fillStyle = '#00f0ff';
                ctx.shadowColor = '#00f0ff';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.moveTo(0, -31);
                ctx.lineTo(3.5, -27);
                ctx.lineTo(0, -23);
                ctx.lineTo(-3.5, -27);
                ctx.closePath();
                ctx.fill();
                ctx.shadowBlur = 0;

                // Menacing Predatory Slit Visor Optics (Twin angled cyber eyes)
                ctx.save();
                ctx.shadowColor = '#00f0ff';
                ctx.shadowBlur = 14;
                ctx.fillStyle = '#00f0ff';
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 2.2;
                ctx.beginPath();
                ctx.moveTo(-6.5, -20);
                ctx.lineTo(-1.5, -21.5);
                ctx.lineTo(0, -21.5);
                ctx.lineTo(1.5, -21.5);
                ctx.lineTo(6.5, -20);
                ctx.stroke();
                // Sharp optic pupils
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-5, -22, 2.5, 1.5);
                ctx.fillRect(2.5, -22, 2.5, 1.5);
                ctx.restore();

                // 9. Heavy Armored Greaves & Sabatons (Boots)
                ctx.fillStyle = '#1c1917';
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2.2;
                ctx.fillRect(-8, 9, 6, 14);
                ctx.strokeRect(-8, 9, 6, 14);
                ctx.fillRect(2, 9, 6, 14);
                ctx.strokeRect(2, 9, 6, 14);

                // Golden knee spikes & armor plates
                ctx.fillStyle = '#f59e0b';
                ctx.beginPath();
                ctx.moveTo(-8, 9);
                ctx.lineTo(-5, 4);
                ctx.lineTo(-2, 9);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(2, 9);
                ctx.lineTo(5, 4);
                ctx.lineTo(8, 9);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();

                // Gold vertical boot vents & cyan ground thruster glow
                ctx.fillStyle = '#fef08a';
                ctx.fillRect(-6, 15, 2, 6);
                ctx.fillRect(4, 15, 2, 6);
                ctx.fillStyle = '#00f0ff';
                ctx.fillRect(-7, 21, 4, 2);
                ctx.fillRect(3, 21, 4, 2);
            }

            ctx.restore();
            ctx.restore();
            return;
        }

        // ==========================================
        // DEFAULT / SKIN: NINJA (Бегун Полигона) - Classic Monochrome Ink Cyberpunk
        // ==========================================
        ctx.fillStyle = '#121315';
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;

        if (isLaunching) {
            // STRETCHED ASCENT POSE
            // Body Streamline
            ctx.beginPath();
            ctx.ellipse(0, -5, 8, 22, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Minimalist Head
            ctx.beginPath();
            ctx.arc(0, -28, 9, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // White Visor Slit
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-4, -29, 8, 2.5);

            // Scarf / Technical ribbon trailing downward
            ctx.save();
            ctx.strokeStyle = '#121315';
            ctx.lineWidth = 3;
            ctx.beginPath();
            const wave = Math.sin(time * 18) * 6;
            ctx.moveTo(0, -18);
            ctx.quadraticCurveTo(wave, 12, -wave * 0.5, 34);
            ctx.stroke();
            ctx.restore();

            // Arms reached upward
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = '#121315';
            ctx.beginPath();
            ctx.moveTo(-6, -20);
            ctx.lineTo(-11, -38);
            ctx.moveTo(6, -20);
            ctx.lineTo(11, -38);
            ctx.stroke();

            // Streamlined Legs
            ctx.beginPath();
            ctx.moveTo(-4, 14);
            ctx.lineTo(-3, 28);
            ctx.moveTo(4, 14);
            ctx.lineTo(3, 28);
            ctx.stroke();
        } else {
            // STANDING / CHARGING POSE
            // Head
            ctx.beginPath();
            ctx.arc(0, -16, 10, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Visor / Eye
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(-5, -17, 10, 2.5);

            // Torso (Geometric athletic silhouette)
            ctx.fillStyle = '#121315';
            ctx.beginPath();
            ctx.moveTo(-9, -6);
            ctx.lineTo(9, -6);
            ctx.lineTo(6, 10);
            ctx.lineTo(-6, 10);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Chest decal / geometric crosshair
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(-3, 0);
            ctx.lineTo(3, 0);
            ctx.moveTo(0, -3);
            ctx.lineTo(0, 3);
            ctx.stroke();

            // Arms
            ctx.strokeStyle = '#121315';
            ctx.lineWidth = 2.5;
            if (state === 'charging') {
                ctx.beginPath();
                ctx.moveTo(-8, -4);
                ctx.lineTo(-14, 4);
                ctx.lineTo(-7, 8);
                ctx.moveTo(8, -4);
                ctx.lineTo(14, 4);
                ctx.lineTo(7, 8);
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.moveTo(-8, -4);
                ctx.lineTo(-12, 6);
                ctx.moveTo(8, -4);
                ctx.lineTo(12, 6);
                ctx.stroke();
            }

            // Legs & Boots
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(-4, 10);
            ctx.lineTo(-5, 20);
            ctx.moveTo(4, 10);
            ctx.lineTo(5, 20);
            ctx.stroke();
        }

        ctx.restore();
    },

    // 1b. Standalone Animated Character Preview for UI Modals
    drawCharacterPreview(ctx, x, y, skin = 'ninja', time = 0, scale = 2.2) {
        this.drawCharacter(ctx, x, y, skin, 'idle', time, scale, 1, 1);
    },

    // 2. Draw Author Kinetic Launch Deck & Deep Space Tracking Horizon
    drawRooftop(ctx, width, height, recordHeight = 0, customDeckY = null, isCharging = false, chargeMult = 1.0, time = 0) {
        const deckY = (customDeckY !== null) ? customDeckY : height - 175;
        const horizonY = deckY - 40;

        // Base Paper Canvas Background (only when not embedded in flight sky)
        if (customDeckY === null) {
            ctx.fillStyle = this.colors.bgPaper;
            ctx.fillRect(0, 0, width, height);
        }

        // Distant polygonal mountain massif (Geometric low-poly peaks)
        ctx.strokeStyle = '#c5c2b6';
        ctx.fillStyle = '#eae7dd';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, horizonY + 20);
        ctx.lineTo(60, horizonY - 45);
        ctx.lineTo(130, horizonY - 15);
        ctx.lineTo(210, horizonY - 65);
        ctx.lineTo(290, horizonY - 25);
        ctx.lineTo(370, horizonY - 55);
        ctx.lineTo(width, horizonY - 10);
        ctx.lineTo(width, horizonY + 20);
        ctx.lineTo(0, horizonY + 20);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Deep Space Tracking Parabolic Radars
        const drawRadar = (rx, ry, radius, angle) => {
            ctx.save();
            ctx.translate(rx, ry);
            ctx.strokeStyle = this.colors.inkDark;
            ctx.lineWidth = 1.5;

            // Pylon base tripod
            ctx.beginPath();
            ctx.moveTo(-10, 0);
            ctx.lineTo(0, -18);
            ctx.lineTo(10, 0);
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -18);
            ctx.stroke();

            // Parabolic dish
            ctx.save();
            ctx.translate(0, -18);
            ctx.rotate(angle);
            ctx.beginPath();
            ctx.arc(0, 0, radius, -Math.PI * 0.7, -Math.PI * 0.3);
            ctx.stroke();

            // Feed horn and strut
            ctx.beginPath();
            ctx.moveTo(0, -radius * 0.5);
            ctx.lineTo(0, -radius * 1.1);
            ctx.stroke();
            ctx.fillRect(-1.5, -radius * 1.1 - 2, 3, 3);
            ctx.restore();

            ctx.restore();
        };

        // Radar 1 (Left) & Radar 2 (Mid-right)
        drawRadar(width * 0.22, horizonY, 26, -0.35);
        drawRadar(width * 0.48, horizonY + 10, 18, 0.25);

        // Telemetry Transmission Mast on far left
        const mastX = width * 0.08;
        ctx.strokeStyle = this.colors.inkDark;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(mastX, horizonY + 20);
        ctx.lineTo(mastX, horizonY - 70);
        ctx.moveTo(mastX - 8, horizonY - 40);
        ctx.lineTo(mastX + 8, horizonY - 40);
        ctx.moveTo(mastX - 5, horizonY - 20);
        ctx.lineTo(mastX + 5, horizonY - 20);
        ctx.stroke();

        // Radiating electromagnetic field rings
        ctx.strokeStyle = '#9ca0aa';
        ctx.beginPath();
        ctx.arc(mastX, horizonY - 70, 8, -Math.PI * 0.7, -Math.PI * 0.3);
        ctx.arc(mastX, horizonY - 70, 16, -Math.PI * 0.7, -Math.PI * 0.3);
        ctx.stroke();

        // MAIN KINETIC LAUNCH DECK (Monolithic Aerospace Platform)
        // Platform base
        ctx.fillStyle = this.colors.cardPaper;
        ctx.fillRect(0, deckY, width, Math.max(120, height - deckY + 120));

        // Platform top armored rim
        ctx.fillStyle = this.colors.inkDark;
        ctx.fillRect(0, deckY, width, 8);

        // Chamfered elevation struts & joints
        ctx.strokeStyle = '#c5c2b6';
        ctx.lineWidth = 1.5;
        for (let x = 40; x < width; x += 70) {
            ctx.beginPath();
            ctx.moveTo(x, deckY + 8);
            ctx.lineTo(x, deckY + 120);
            ctx.stroke();

            // Diagonal bracing
            ctx.beginPath();
            ctx.moveTo(x, deckY + 12);
            ctx.lineTo(x + 35, deckY + 50);
            ctx.stroke();
        }

        // ACCELERATION PAD under player: Concentric Induction Rings
        const heroX = width / 2;
        // Exactly centered at hero feet position (groundY + 31)
        const padCenterY = deckY + 41;

        ctx.save();
        ctx.translate(heroX, padCenterY);

        if (isCharging) {
            // Charging glow & magnetic wave effects
            const pulse = 0.5 + 0.5 * Math.sin(time * 14);
            const chargeIntensity = Math.min(1.0, Math.max(0, (chargeMult - 1.0) / 2.0));

            // 1. Radiant Energy Glow Aura
            ctx.save();
            const auraGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 68 + chargeIntensity * 16);
            auraGrad.addColorStop(0, `rgba(56, 189, 248, ${0.35 + 0.25 * pulse})`);
            auraGrad.addColorStop(0.55, `rgba(56, 189, 248, ${0.14 + 0.18 * chargeIntensity})`);
            auraGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
            ctx.fillStyle = auraGrad;
            ctx.beginPath();
            ctx.ellipse(0, 0, 72 + chargeIntensity * 16, 20 + chargeIntensity * 6, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();

            // 2. Expanding Magnetic Ripple Shockwaves
            for (let wIdx = 0; wIdx < 2; wIdx++) {
                const waveProgress = ((time * (3.2 + chargeIntensity * 2.5)) + (wIdx * 0.5)) % 1;
                const waveAlpha = (1 - waveProgress) * (0.6 + 0.4 * chargeIntensity);
                ctx.save();
                ctx.strokeStyle = `rgba(56, 189, 248, ${waveAlpha})`;
                ctx.lineWidth = 1.6 + chargeIntensity * 0.8;
                ctx.beginPath();
                ctx.ellipse(0, 0, 18 + waveProgress * 48, 5 + waveProgress * 13, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // 3. Rotating Outer High-Voltage Induction Ring
            ctx.save();
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 8 + 10 * chargeIntensity;
            ctx.strokeStyle = this.colors.inkDark;
            ctx.lineWidth = 2.2;
            ctx.setLineDash([14, 8]);
            ctx.lineDashOffset = -time * 50;
            ctx.beginPath();
            ctx.ellipse(0, 0, 56, 15, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            // 4. Luminous Inner Transducer Ring
            ctx.save();
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 6 + 6 * pulse;
            ctx.strokeStyle = '#38bdf8';
            ctx.lineWidth = 1.8;
            ctx.setLineDash([5, 5]);
            ctx.lineDashOffset = time * 25;
            ctx.beginPath();
            ctx.ellipse(0, 0, 38, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.restore();

            // 5. Charged Core Dot
            ctx.save();
            ctx.shadowColor = '#38bdf8';
            ctx.shadowBlur = 8;
            ctx.fillStyle = '#38bdf8';
            ctx.beginPath();
            ctx.ellipse(0, 0, 8, 3, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        } else {
            // Idle Steady Pad: Crisp High-Contrast E-Ink Rings
            ctx.strokeStyle = this.colors.inkDark;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            ctx.ellipse(0, 0, 56, 15, 0, 0, Math.PI * 2);
            ctx.stroke();

            // Inner transducer ring
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.ellipse(0, 0, 38, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);

            // Core central pulse dot
            ctx.fillStyle = this.colors.inkDark;
            ctx.beginPath();
            ctx.ellipse(0, 0, 6, 2.5, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        // Sector coordinate stamping
        ctx.fillStyle = this.colors.inkMid;
        ctx.font = '800 7px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PAD // SEC-ALPHA // 0-G', 0, 24);
        ctx.restore();

        // VERTICAL APOGEE MONOLITH (Replacing the traditional record sign)
        const pylonW = 86;
        const pylonH = 75;
        const pylonX = width * 0.82 - pylonW / 2;
        const pylonY = deckY - 45;

        // Monolith body
        ctx.fillStyle = this.colors.bgPaper;
        ctx.fillRect(pylonX, pylonY, pylonW, pylonH);
        ctx.strokeStyle = this.colors.inkDark;
        ctx.lineWidth = 2;
        ctx.strokeRect(pylonX, pylonY, pylonW, pylonH);

        // Technical corner brackets & notch
        ctx.fillStyle = this.colors.inkDark;
        ctx.fillRect(pylonX, pylonY, 5, 5);
        ctx.fillRect(pylonX + pylonW - 5, pylonY, 5, 5);

        // Vernier tick marks on left edge of monolith
        ctx.strokeStyle = this.colors.inkDark;
        ctx.lineWidth = 1;
        for (let ty = pylonY + 8; ty < pylonY + pylonH - 8; ty += 8) {
            ctx.beginPath();
            ctx.moveTo(pylonX, ty);
            ctx.lineTo(pylonX + 4, ty);
            ctx.stroke();
        }

        // Monolith telemetry readout
        ctx.fillStyle = this.colors.inkMid;
        ctx.font = '800 7px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.fillText('PEAK APOGEE', pylonX + pylonW / 2 + 2, pylonY + 16);

        ctx.fillStyle = this.colors.inkDark;
        ctx.font = '800 15px "JetBrains Mono", monospace';
        ctx.fillText(`${Math.floor(recordHeight)}m`, pylonX + pylonW / 2 + 2, pylonY + 36);

        ctx.fillStyle = this.colors.inkMid;
        ctx.font = '700 7px "JetBrains Mono", monospace';
        ctx.fillText('CALIBRATED', pylonX + pylonW / 2 + 2, pylonY + 54);
    },

    // 3. Draw Author Atmospheric & Orbital Flight Sectors (Consistent Downward Motion on Ascent)
    drawFlightSky(ctx, width, height, altitude, velocity = 0, time = 0) {
        // E-Ink Optical Inversion Transition
        let bgStyle, inkColor, mutedColor;

        if (altitude < 600) {
            bgStyle = this.colors.bgPaper;
            inkColor = this.colors.inkDark;
            mutedColor = '#a8a599';
        } else if (altitude < 1400) {
            const t = (altitude - 600) / 800;
            const c = Math.floor(245 - t * (245 - 18));
            bgStyle = `rgb(${c}, ${c}, ${Math.floor(c * 0.98)})`;
            inkColor = (t > 0.5) ? '#ffffff' : this.colors.inkDark;
            mutedColor = (t > 0.5) ? '#888c94' : '#6a6e78';
        } else {
            bgStyle = this.colors.bgPaperDark;
            inkColor = '#ffffff';
            mutedColor = '#686d77';
        }

        ctx.fillStyle = bgStyle;
        ctx.fillRect(0, 0, width, height);

        const heroFlightY = height * 0.55;
        const scale = 2.5; // Pixels per meter

        // Helper: Convert world altitude to screen Y
        // When altitude increases (flying UP), screenY increases (moves DOWNWARDS towards bottom of screen)
        const toScreenY = (objAlt) => heroFlightY + (altitude - objAlt) * scale;

        // 1. Technical side vernier telemetry rules & tick marks (Moving strictly downwards on ascent)
        ctx.strokeStyle = mutedColor;
        ctx.lineWidth = 1;
        const tickSpacing = 32;
        const offset = (altitude * scale) % tickSpacing;

        for (let y = -tickSpacing; y < height + tickSpacing; y += tickSpacing) {
            const actualY = y + offset;
            ctx.beginPath();
            ctx.moveTo(0, actualY);
            ctx.lineTo(8, actualY);
            ctx.moveTo(width, actualY);
            ctx.lineTo(width - 8, actualY);
            ctx.stroke();

            // Upward chevron indicator along border confirming ascent
            if (actualY > 20 && actualY < height - 20 && (Math.floor(actualY / tickSpacing) % 4 === 0)) {
                ctx.fillStyle = mutedColor;
                ctx.beginPath();
                ctx.moveTo(12, actualY);
                ctx.lineTo(15, actualY + 4);
                ctx.lineTo(9, actualY + 4);
                ctx.closePath();
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(width - 12, actualY);
                ctx.lineTo(width - 9, actualY + 4);
                ctx.lineTo(width - 15, actualY + 4);
                ctx.closePath();
                ctx.fill();
            }
        }

        // 2. Vertical Kinetic Speed Streaks (Rocket Ascent Lines)
        // High-speed air streaks streaming downward past the hero when climbing
        if (Math.abs(velocity) > 60) {
            const speedRatio = Math.min(1.0, Math.abs(velocity) / 1800);
            const streakCount = Math.floor(10 + speedRatio * 16);
            const dir = velocity >= 0 ? 1 : -1; // 1 = downward when climbing, -1 = upward when falling

            ctx.save();
            ctx.strokeStyle = (altitude > 1000) ? 'rgba(255, 255, 255, 0.45)' : 'rgba(18, 19, 21, 0.35)';
            ctx.lineWidth = 1.2;

            for (let i = 0; i < streakCount; i++) {
                const sx = ((i * 47) % (width - 40)) + 20;
                const seed = (i * 137.5);
                const speed = 600 + (i % 5) * 200;
                const sy = ((seed + dir * (altitude * 3.5 + time * speed)) % (height + 120)) - 60;
                const len = 30 + speedRatio * 50;

                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.lineTo(sx, sy + dir * len);
                ctx.stroke();
            }
            ctx.restore();
        }

        // 3. Fixed Atmospheric Layers (Strict Downward Scrolling)
        // Isobaric Streamline Vectors (low troposphere)
        const isobars = [
            { alt: 75, label: '1013 hPa // SEA LEVEL' },
            { alt: 160, label: '850 hPa // TROPOSPHERE' },
            { alt: 280, label: '700 hPa // BOUNDARY LAYER' }
        ];

        isobars.forEach(iso => {
            const y = toScreenY(iso.alt);
            if (y > -30 && y < height + 30) {
                ctx.save();
                ctx.strokeStyle = mutedColor;
                ctx.setLineDash([8, 8]);
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(15, y);
                ctx.lineTo(width - 15, y);
                ctx.stroke();

                ctx.fillStyle = mutedColor;
                ctx.font = '700 8px "JetBrains Mono", monospace';
                ctx.textAlign = 'right';
                ctx.fillText(iso.label, width - 20, y - 4);
                ctx.restore();
            }
        });

        // Fixed Scientific Aerostats & Probes at world heights
        const probes = [
            { alt: 180, x: width * 0.22, type: 'aerostat' },
            { alt: 380, x: width * 0.78, type: 'aerostat' },
            { alt: 720, x: width * 0.35, type: 'balloon' }
        ];

        probes.forEach(p => {
            const py = toScreenY(p.alt);
            if (py > -80 && py < height + 80) {
                if (p.type === 'aerostat') {
                    this.drawResearchAerostat(ctx, p.x, py, inkColor, mutedColor);
                } else {
                    this.drawMinimalBalloon(ctx, p.x, py, inkColor, mutedColor);
                }
            }
        });

        // Fixed Geometric Cloud Banks at world heights
        const clouds = [
            { alt: 220, x: 70, r1: 20, r2: 30, r3: 22 },
            { alt: 310, x: width - 80, r1: 18, r2: 26, r3: 20 },
            { alt: 540, x: width * 0.3, r1: 24, r2: 36, r3: 26 },
            { alt: 680, x: width * 0.75, r1: 22, r2: 32, r3: 24 },
            { alt: 880, x: 90, r1: 18, r2: 28, r3: 20 }
        ];

        clouds.forEach(c => {
            const cy = toScreenY(c.alt);
            if (cy > -60 && cy < height + 60) {
                ctx.save();
                ctx.strokeStyle = mutedColor;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.arc(c.x - c.r1, cy, c.r1, Math.PI * 0.7, Math.PI * 1.8);
                ctx.arc(c.x, cy - c.r2 * 0.4, c.r2, Math.PI * 1.1, Math.PI * 1.9);
                ctx.arc(c.x + c.r3, cy, c.r3, Math.PI * 1.2, Math.PI * 0.3);
                ctx.lineTo(c.x - c.r1, cy + c.r1 * 0.8);
                ctx.stroke();
                ctx.restore();
            }
        });

        // 4. Stars & Constellations in Upper Atmosphere / Space
        if (altitude > 400) {
            const starAlpha = Math.min(1.0, (altitude - 400) / 400);
            ctx.save();
            ctx.globalAlpha = starAlpha;
            ctx.fillStyle = inkColor;
            ctx.strokeStyle = inkColor;

            // Constellation nodes with consistent downward parallax scroll
            const nodes = [
                { x: width * 0.20, alt: 800 },
                { x: width * 0.35, alt: 950 },
                { x: width * 0.45, alt: 900 },
                { x: width * 0.15, alt: 1100 },
                { x: width * 0.85, alt: 1200 },
                { x: width * 0.65, alt: 1350 },
                { x: width * 0.80, alt: 1500 }
            ];

            const nodeScreen = nodes.map(n => ({
                x: n.x,
                y: toScreenY(n.alt)
            }));

            // Lines between nodes that are on screen
            ctx.lineWidth = 0.8;
            ctx.setLineDash([3, 3]);
            ctx.beginPath();
            ctx.moveTo(nodeScreen[0].x, nodeScreen[0].y);
            ctx.lineTo(nodeScreen[1].x, nodeScreen[1].y);
            ctx.lineTo(nodeScreen[2].x, nodeScreen[2].y);
            ctx.moveTo(nodeScreen[0].x, nodeScreen[0].y);
            ctx.lineTo(nodeScreen[3].x, nodeScreen[3].y);

            ctx.moveTo(nodeScreen[4].x, nodeScreen[4].y);
            ctx.lineTo(nodeScreen[5].x, nodeScreen[5].y);
            ctx.lineTo(nodeScreen[6].x, nodeScreen[6].y);
            ctx.stroke();
            ctx.setLineDash([]);

            nodeScreen.forEach((n, idx) => {
                if (n.y > -20 && n.y < height + 20) {
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, (idx % 2 === 0) ? 2.5 : 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // Deep background distant stars (gentle downward parallax)
            const count = 30;
            for (let i = 0; i < count; i++) {
                const sx = (i * 97) % width;
                const sy = ((i * 153 + altitude * 0.8) % height);
                ctx.fillRect(sx, sy, 1.5, 1.5);
            }

            ctx.restore();
        }

        // 5. Celestial Ringed Exoplanet Landmark (Anchored at High Orbit)
        if (altitude > 600 && altitude < 6000) {
            const moonAlpha = Math.min(1.0, (altitude - 600) / 300);
            ctx.save();
            ctx.globalAlpha = moonAlpha;
            const planetScreenY = heroFlightY - 200 + (altitude - 800) * 0.15;
            this.drawRingedExoplanet(ctx, width * 0.78, planetScreenY, inkColor);
            ctx.restore();
        }

        // 6. Scientific Milestone Boundary Scans (Consistent Downward Motion, Infinite Procedural)
        const minVisibleAlt = Math.max(0, altitude - (height - heroFlightY + 50) / scale);
        const maxVisibleAlt = altitude + (heroFlightY + 50) / scale;
        const visibleMilestones = this.getMilestonesInRange(minVisibleAlt, maxVisibleAlt);

        visibleMilestones.forEach(mAlt => {
            const lineY = toScreenY(mAlt);
            if (lineY > -20 && lineY < height + 20) {
                ctx.save();
                ctx.strokeStyle = inkColor;
                ctx.setLineDash([4, 4]);
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(15, lineY);
                ctx.lineTo(width - 15, lineY);
                ctx.stroke();

                // Modern scientific crosshair tag with sector name
                const sector = this.getSectorName(mAlt);
                const tagText = `[ ${sector} // ${mAlt.toLocaleString('ru-RU')}m ]`;
                ctx.font = '800 10px "JetBrains Mono", monospace';
                const tw = ctx.measureText(tagText).width + 16;
                ctx.fillStyle = bgStyle;
                ctx.fillRect(width / 2 - tw / 2, lineY - 9, tw, 18);
                ctx.setLineDash([]);
                ctx.strokeRect(width / 2 - tw / 2, lineY - 9, tw, 18);

                ctx.fillStyle = inkColor;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(tagText, width / 2, lineY);
                ctx.restore();
            }
        });
    },

    // Helper: Procedural Sector Naming by Altitude
    getSectorName(altitude) {
        if (typeof window.t !== 'function') {
            if (altitude < 1000) return 'STRATOSPHERE';
            if (altitude < 1500) return 'MESOSPHERE';
            if (altitude < 3000) return 'KARMAN LINE';
            if (altitude < 5000) return 'ORBITAL SECTOR';
            if (altitude < 10000) return 'EXOSPHERE';
            if (altitude < 25000) return 'DEEP SPACE';
            if (altitude < 50000) return 'ASTEROID BELT';
            if (altitude < 100000) return 'INTERPLANETARY ETHER';
            return 'QUANTUM VACUUM';
        }
        if (altitude < 1000) return window.t('sector_strato');
        if (altitude < 1500) return window.t('sector_meso');
        if (altitude < 3000) return window.t('sector_karman');
        if (altitude < 5000) return window.t('sector_orbital');
        if (altitude < 10000) return window.t('sector_exo');
        if (altitude < 25000) return window.t('sector_deep');
        if (altitude < 50000) return window.t('sector_belt');
        if (altitude < 100000) return window.t('sector_ether');
        return window.t('sector_vacuum');
    },

    // Helper: Generate all milestones within any altitude window (Rebalanced for valuable crystals)
    getMilestonesInRange(minAlt, maxAlt) {
        const baseMilestones = [1000, 3000, 7500, 15000, 30000, 60000, 100000, 250000, 500000, 1000000];
        let m = 1500000;
        const maxCheck = Math.min(10000000, maxAlt);
        while (m <= maxCheck + 500000) {
            baseMilestones.push(m);
            m += 500000;
        }
        return baseMilestones.filter(val => val >= minAlt && val <= maxAlt);
    },

    // Scientific Polyhedral Aerostat (Replacing generic balloon)
    drawResearchAerostat(ctx, x, y, inkColor, mutedColor) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));

        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 1.5;

        // Faceted Diamond / Hex Envelope
        ctx.beginPath();
        ctx.moveTo(0, -28);
        ctx.lineTo(20, -10);
        ctx.lineTo(14, 12);
        ctx.lineTo(0, 20);
        ctx.lineTo(-14, 12);
        ctx.lineTo(-20, -10);
        ctx.closePath();
        ctx.stroke();

        // Internal isometric facet ribs
        ctx.strokeStyle = mutedColor;
        ctx.beginPath();
        ctx.moveTo(0, -28);
        ctx.lineTo(0, 20);
        ctx.moveTo(-20, -10);
        ctx.lineTo(20, -10);
        ctx.moveTo(-14, 12);
        ctx.lineTo(14, 12);
        ctx.stroke();

        // Sensor Payload Module suspended below
        ctx.strokeStyle = inkColor;
        ctx.beginPath();
        ctx.moveTo(-6, 20);
        ctx.lineTo(-4, 30);
        ctx.moveTo(6, 20);
        ctx.lineTo(4, 30);
        ctx.stroke();

        // Instrument pack with antenna
        ctx.strokeRect(-5, 30, 10, 6);
        ctx.beginPath();
        ctx.moveTo(0, 36);
        ctx.lineTo(0, 44);
        ctx.stroke();

        ctx.restore();
    },

    // Minimalist Constellation Chart with Greek Alpha Stars
    drawConstellations(ctx, width, height, alpha, altitude, inkColor) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = inkColor;
        ctx.fillStyle = inkColor;

        // Deterministic constellation nodes
        const nodes = [
            { x: width * 0.20, y: ((120 + altitude * 0.15) % height) },
            { x: width * 0.35, y: ((80 + altitude * 0.15) % height) },
            { x: width * 0.45, y: ((150 + altitude * 0.15) % height) },
            { x: width * 0.15, y: ((240 + altitude * 0.15) % height) },
            { x: width * 0.85, y: ((180 + altitude * 0.18) % height) },
            { x: width * 0.65, y: ((220 + altitude * 0.18) % height) },
            { x: width * 0.80, y: ((290 + altitude * 0.18) % height) }
        ];

        // Draw fine connecting vector lines
        ctx.lineWidth = 0.75;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.lineTo(nodes[1].x, nodes[1].y);
        ctx.lineTo(nodes[2].x, nodes[2].y);
        ctx.moveTo(nodes[0].x, nodes[0].y);
        ctx.lineTo(nodes[3].x, nodes[3].y);

        ctx.moveTo(nodes[4].x, nodes[4].y);
        ctx.lineTo(nodes[5].x, nodes[5].y);
        ctx.lineTo(nodes[6].x, nodes[6].y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw star nodes
        nodes.forEach((n, idx) => {
            ctx.beginPath();
            ctx.arc(n.x, n.y, (idx % 2 === 0) ? 2.5 : 1.5, 0, Math.PI * 2);
            ctx.fill();

            if (idx === 1 || idx === 4) {
                // Crosshair marker
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(n.x - 5, n.y);
                ctx.lineTo(n.x + 5, n.y);
                ctx.moveTo(n.x, n.y - 5);
                ctx.lineTo(n.x, n.y + 5);
                ctx.stroke();
            }
        });

        // Scatter background point stars
        const count = 28;
        for (let i = 0; i < count; i++) {
            const sx = (i * 97) % width;
            const sy = (i * 153 + (altitude * 0.2)) % height;
            ctx.fillRect(sx, sy, 1.5, 1.5);
        }

        ctx.restore();
    },

    // Ringed Exoplanet with Orbital Tether
    drawRingedExoplanet(ctx, x, y, inkColor) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));
        const r = 28;

        // Orbital Ring (Back half)
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 2.2, 8, -Math.PI * 0.18, Math.PI, Math.PI * 2);
        ctx.stroke();

        // Planet Body
        ctx.fillStyle = inkColor;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.fill();

        // Inner negative space crescent / shadow (Paper white cutout)
        ctx.fillStyle = (inkColor === '#ffffff') ? this.colors.bgPaperDark : this.colors.bgPaper;
        ctx.beginPath();
        ctx.arc(r * 0.4, 0, r * 0.88, 0, Math.PI * 2);
        ctx.fill();

        // Orbital Ring (Front half)
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 2.2, 8, -Math.PI * 0.18, 0, Math.PI);
        ctx.stroke();

        // Vertical Space Elevator cable passing through planet
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -r * 2.2);
        ctx.lineTo(0, r * 2.2);
        ctx.stroke();

        ctx.restore();
    },

    // Minimalist Vector Balloon
    drawMinimalBalloon(ctx, x, y, inkColor, mutedColor) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));

        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 1.5;

        // Circular envelope
        ctx.beginPath();
        ctx.arc(0, -20, 22, 0, Math.PI * 2);
        ctx.stroke();

        // Longitudinal ribs
        ctx.strokeStyle = mutedColor;
        ctx.beginPath();
        ctx.ellipse(0, -20, 12, 22, 0, 0, Math.PI * 2);
        ctx.moveTo(0, -42);
        ctx.lineTo(0, 2);
        ctx.stroke();

        // Ropes & Basket
        ctx.strokeStyle = inkColor;
        ctx.beginPath();
        ctx.moveTo(-8, -2);
        ctx.lineTo(-4, 10);
        ctx.moveTo(8, -2);
        ctx.lineTo(4, 10);
        ctx.stroke();

        // Basket
        ctx.strokeRect(-5, 10, 10, 8);
        ctx.restore();
    },

    // Halftone Geometric Clouds
    drawMinimalClouds(ctx, width, height, offset, inkColor, mutedColor) {
        ctx.save();
        ctx.strokeStyle = mutedColor;
        ctx.lineWidth = 1.5;

        const cloudClusters = [
            { x: 50, y: height - offset + 60, r1: 18, r2: 26, r3: 20 },
            { x: 190, y: height - offset + 90, r1: 22, r2: 32, r3: 24 },
            { x: width - 70, y: height - offset + 40, r1: 16, r2: 24, r3: 18 }
        ];

        cloudClusters.forEach(c => {
            // Drawn as clean intersecting arcs
            ctx.beginPath();
            ctx.arc(c.x - c.r1, c.y, c.r1, Math.PI * 0.7, Math.PI * 1.8);
            ctx.arc(c.x, c.y - c.r2 * 0.4, c.r2, Math.PI * 1.1, Math.PI * 1.9);
            ctx.arc(c.x + c.r3, c.y, c.r3, Math.PI * 1.2, Math.PI * 0.3);
            ctx.lineTo(c.x - c.r1, c.y + c.r1 * 0.8);
            ctx.stroke();
        });

        ctx.restore();
    },

    // Minimalist Asterisks / Space Stars
    drawMinimalStars(ctx, width, height, alpha, altitude, inkColor) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = inkColor;
        ctx.fillStyle = inkColor;

        const count = 35;
        for (let i = 0; i < count; i++) {
            const sx = (i * 97) % width;
            const sy = (i * 149 + (altitude * 0.2)) % height;

            if (i % 5 === 0) {
                // Precise 4-point cross star (+)
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(sx - 3, sy);
                ctx.lineTo(sx + 3, sy);
                ctx.moveTo(sx, sy - 3);
                ctx.lineTo(sx, sy + 3);
                ctx.stroke();
            } else if (i % 9 === 0) {
                // Diamond glyph (✦)
                ctx.beginPath();
                ctx.moveTo(sx, sy - 4);
                ctx.lineTo(sx + 3, sy);
                ctx.lineTo(sx, sy + 4);
                ctx.lineTo(sx - 3, sy);
                ctx.closePath();
                ctx.fill();
            } else {
                // Fine dot
                ctx.fillRect(sx, sy, 1.5, 1.5);
            }
        }
        ctx.restore();
    },

    // Gravure / Woodcut Minimalist Moon
    drawMinimalMoon(ctx, x, y, inkColor) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));
        const r = 34;

        // Outer Moon Outline
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 2);
        ctx.stroke();

        // Inner concentric gravure contours
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, r - 4, 0, Math.PI * 2);
        ctx.arc(0, 0, r - 8, 0, Math.PI * 2);
        ctx.stroke();

        // Craters as fine cross-hatched circles
        const craters = [
            { x: -9, y: -10, r: 7 },
            { x: 8, y: 12, r: 9 },
            { x: 12, y: -8, r: 5 },
            { x: -14, y: 10, r: 4 }
        ];

        craters.forEach(c => {
            ctx.beginPath();
            ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
            ctx.stroke();
            // Stippled center
            ctx.fillRect(c.x - 1, c.y - 1, 2, 2);
        });

        ctx.restore();
    },

    // 4. Skin-Tailored Charging Aura & Particle Engine
    drawSkinChargeGroundAura(ctx, x, y, skin = 'ninja', mult = 1.0, time = 0) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));
        const pulse = 0.85 + Math.sin(time * 8) * 0.15;
        const radius = Math.min(68, 42 + mult * 4);

        if (skin === 'zombie') {
            // Bio-Hazard Acid Ring
            ctx.save();
            ctx.shadowColor = '#22c55e';
            ctx.shadowBlur = 10;
            ctx.strokeStyle = '#22c55e';
            ctx.lineWidth = 2.2;
            ctx.setLineDash([8, 6]);
            ctx.lineDashOffset = -time * 25;
            ctx.beginPath();
            ctx.ellipse(0, 0, radius, radius * 0.32, 0, 0, Math.PI * 2);
            ctx.stroke();
            // Inner toxic pool
            ctx.fillStyle = 'rgba(34, 197, 94, 0.18)';
            ctx.beginPath();
            ctx.ellipse(0, 0, radius * 0.75, radius * 0.24, 0, 0, Math.PI * 2);
            ctx.fill();
            // Biohazard hazard ticks
            for (let a = 0; a < 3; a++) {
                const angle = time * 2 + a * (Math.PI * 2 / 3);
                const bx = Math.cos(angle) * (radius * 0.55);
                const by = Math.sin(angle) * (radius * 0.18);
                ctx.fillStyle = '#16a34a';
                ctx.beginPath();
                ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        } else if (skin === 'cyborg') {
            // Digital Holographic Targeting Ring & Brackets
            ctx.save();
            ctx.shadowColor = '#00f0ff';
            ctx.shadowBlur = 12;
            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.ellipse(0, 0, radius, radius * 0.30, 0, 0, Math.PI * 2);
            ctx.stroke();
            // Rotating degree reticles
            ctx.setLineDash([12, 12]);
            ctx.lineDashOffset = time * 40;
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
            ctx.beginPath();
            ctx.ellipse(0, 0, radius * 1.15, radius * 0.35, 0, 0, Math.PI * 2);
            ctx.stroke();
            // 4 Targeting Crosshairs
            ctx.fillStyle = '#00f0ff';
            ctx.fillRect(-2, -radius * 0.30 - 4, 4, 8);
            ctx.fillRect(-2, radius * 0.30 - 4, 4, 8);
            ctx.fillRect(-radius - 4, -2, 8, 4);
            ctx.fillRect(radius - 4, -2, 8, 4);
            ctx.restore();
        } else if (skin === 'astronaut') {
            // Cryo Steam Venting Pad & Cosmic Pressure Ring
            ctx.save();
            ctx.shadowColor = '#e0f2fe';
            ctx.shadowBlur = 8;
            ctx.strokeStyle = 'rgba(240, 246, 255, 0.85)';
            ctx.lineWidth = 2.4;
            ctx.beginPath();
            ctx.ellipse(0, 0, radius, radius * 0.30, 0, 0, Math.PI * 2);
            ctx.stroke();
            // Twin booster frost pads
            ctx.fillStyle = 'rgba(224, 242, 254, 0.28)';
            ctx.beginPath();
            ctx.ellipse(-14, 0, 10, 5, 0, 0, Math.PI * 2);
            ctx.ellipse(14, 0, 10, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            // Golden solar dust accents
            ctx.fillStyle = '#facc15';
            for (let i = 0; i < 4; i++) {
                const ga = time * 3 + (i * Math.PI / 2);
                ctx.fillRect(Math.cos(ga) * (radius * 0.8), Math.sin(ga) * (radius * 0.25), 2.5, 2.5);
            }
            ctx.restore();
        } else if (skin === 'phantom') {
            // Quantum Singularity Rift in Violet & Magenta
            ctx.save();
            ctx.shadowColor = '#c084fc';
            ctx.shadowBlur = 15;
            ctx.strokeStyle = '#c084fc';
            ctx.lineWidth = 2.2;
            ctx.setLineDash([6, 6]);
            ctx.lineDashOffset = -time * 60;
            ctx.beginPath();
            ctx.ellipse(0, 0, radius, radius * 0.32, 0, 0, Math.PI * 2);
            ctx.stroke();
            // Swirling black hole core
            ctx.fillStyle = 'rgba(168, 85, 247, 0.24)';
            ctx.beginPath();
            ctx.ellipse(0, 0, radius * 0.65, radius * 0.20, 0, 0, Math.PI * 2);
            ctx.fill();
            // Reality warp spokes
            ctx.strokeStyle = '#f472b6';
            ctx.lineWidth = 1.5;
            for (let i = 0; i < 5; i++) {
                const ra = time * 4 + (i * Math.PI * 2 / 5);
                ctx.beginPath();
                ctx.moveTo(Math.cos(ra) * (radius * 0.3), Math.sin(ra) * (radius * 0.1));
                ctx.lineTo(Math.cos(ra) * (radius * 1.1), Math.sin(ra) * (radius * 0.34));
                ctx.stroke();
            }
            ctx.restore();
        } else if (skin === 'aviator') {
            // Steampunk Brass Compass & Gear Ring
            ctx.save();
            ctx.shadowColor = '#d4a373';
            ctx.shadowBlur = 8;
            ctx.strokeStyle = '#d4a373';
            ctx.lineWidth = 2.4;
            ctx.beginPath();
            ctx.ellipse(0, 0, radius, radius * 0.30, 0, 0, Math.PI * 2);
            ctx.stroke();
            // Rotating cogs on border
            ctx.setLineDash([4, 8]);
            ctx.lineDashOffset = time * 20;
            ctx.lineWidth = 3.5;
            ctx.beginPath();
            ctx.ellipse(0, 0, radius, radius * 0.30, 0, 0, Math.PI * 2);
            ctx.stroke();
            // Compass needle projection
            ctx.strokeStyle = '#c8963e';
            ctx.lineWidth = 2;
            ctx.setLineDash([]);
            const needleAngle = Math.sin(time * 6) * 0.4;
            ctx.beginPath();
            ctx.moveTo(-Math.cos(needleAngle) * radius * 0.7, -Math.sin(needleAngle) * radius * 0.22);
            ctx.lineTo(Math.cos(needleAngle) * radius * 0.7, Math.sin(needleAngle) * radius * 0.22);
            ctx.stroke();
            ctx.restore();
        } else if (skin === 'shaman') {
            // Mystic Cyber Runic Summoning Circle
            ctx.save();
            ctx.shadowColor = '#00f5d4';
            ctx.shadowBlur = 14;
            ctx.strokeStyle = '#00f5d4';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.ellipse(0, 0, radius, radius * 0.32, 0, 0, Math.PI * 2);
            ctx.stroke();
            // Inner heptagram star arcs
            ctx.setLineDash([5, 5]);
            ctx.lineDashOffset = -time * 30;
            ctx.beginPath();
            ctx.ellipse(0, 0, radius * 0.72, radius * 0.23, 0, 0, Math.PI * 2);
            ctx.stroke();
            // 6 Glowing runic nodes
            for (let i = 0; i < 6; i++) {
                const sa = time * 1.5 + (i * Math.PI / 3);
                const rx = Math.cos(sa) * radius;
                const ry = Math.sin(sa) * (radius * 0.32);
                ctx.fillStyle = '#00f5d4';
                ctx.fillRect(rx - 2, ry - 2, 4, 4);
            }
            ctx.restore();
        } else if (skin === 'samurai') {
            // Scarlet Zen Blade Circle & Sakura Petals
            ctx.save();
            ctx.shadowColor = '#ff2a5f';
            ctx.shadowBlur = 12;
            ctx.strokeStyle = '#ff2a5f';
            ctx.lineWidth = 2.4;
            ctx.beginPath();
            ctx.ellipse(0, 0, radius, radius * 0.30, 0, 0, Math.PI * 2);
            ctx.stroke();
            // Crossed crimson laser katana shadows
            ctx.strokeStyle = '#ffb703';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            ctx.moveTo(-radius * 0.7, -radius * 0.2);
            ctx.lineTo(radius * 0.7, radius * 0.2);
            ctx.moveTo(-radius * 0.7, radius * 0.2);
            ctx.lineTo(radius * 0.7, -radius * 0.2);
            ctx.stroke();
            ctx.restore();
        } else if (skin === 'titan') {
            // Molten Hydraulic Blast Grate & Heat Shockwave
            ctx.save();
            ctx.shadowColor = '#ff6b35';
            ctx.shadowBlur = 16;
            ctx.strokeStyle = '#ff6b35';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.ellipse(0, 0, radius * 1.05, radius * 0.33, 0, 0, Math.PI * 2);
            ctx.stroke();
            // Molten exhaust vents glowing
            ctx.fillStyle = 'rgba(255, 107, 53, 0.35)';
            ctx.beginPath();
            ctx.ellipse(0, 0, radius * 0.8, radius * 0.25, 0, 0, Math.PI * 2);
            ctx.fill();
            // Grate hazard lines
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 1.8;
            for (let gx = -radius * 0.6; gx <= radius * 0.6; gx += 12) {
                const norm = Math.max(0, 1 - (gx / (radius * 0.8)) ** 2);
                const gy = Math.sqrt(norm) * (radius * 0.25);
                ctx.beginPath();
                ctx.moveTo(gx, -gy);
                ctx.lineTo(gx, gy);
                ctx.stroke();
            }
            ctx.restore();
        } else if (skin === 'celestial') {
            // Metatron's Cube / Divine Sacred Hexagram Seal
            ctx.save();
            ctx.shadowColor = '#facc15';
            ctx.shadowBlur = 18;
            ctx.strokeStyle = '#f59e0b';
            ctx.lineWidth = 2.4;

            // Outer radiant halo ring
            ctx.beginPath();
            ctx.ellipse(0, 0, radius, radius * 0.32, 0, 0, Math.PI * 2);
            ctx.stroke();

            // Inner golden pulsing glow disc
            ctx.fillStyle = 'rgba(250, 204, 21, 0.14)';
            ctx.beginPath();
            ctx.ellipse(0, 0, radius * 0.85, radius * 0.28, 0, 0, Math.PI * 2);
            ctx.fill();

            // Interlaced sacred triangles (Hexagram) rotating
            const hexR = radius * 0.72;
            const hexRY = radius * 0.23;

            // Triangle 1 (Clockwise)
            ctx.save();
            ctx.strokeStyle = '#fef08a';
            ctx.lineWidth = 1.8;
            ctx.beginPath();
            for (let i = 0; i < 3; i++) {
                const a = (time * 1.2) + i * (Math.PI * 2 / 3);
                const px = Math.cos(a) * hexR;
                const py = Math.sin(a) * hexRY;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();

            // Triangle 2 (Counter-Clockwise)
            ctx.beginPath();
            for (let i = 0; i < 3; i++) {
                const a = (-time * 1.2) + Math.PI + i * (Math.PI * 2 / 3);
                const px = Math.cos(a) * hexR;
                const py = Math.sin(a) * hexRY;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.restore();

            // 6 Orbiting Singularity Star Nodes
            for (let s = 0; s < 6; s++) {
                const sa = time * 2.0 + s * (Math.PI / 3);
                const sx = Math.cos(sa) * (radius * 0.95);
                const sy = Math.sin(sa) * (radius * 0.30);

                ctx.fillStyle = '#38bdf8';
                ctx.shadowColor = '#38bdf8';
                ctx.shadowBlur = 10;
                ctx.beginPath();
                ctx.arc(sx, sy, 3, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(sx, sy, 1.2, 0, Math.PI * 2);
                ctx.fill();
            }

            // Divine light rays shooting upwards from nodes
            for (let r = 0; r < 4; r++) {
                const ra = time * 1.5 + r * (Math.PI / 2);
                const rx = Math.cos(ra) * (radius * 0.5);
                const ry = Math.sin(ra) * (radius * 0.16);
                const rayH = 20 + Math.sin(time * 10 + r) * 12;

                ctx.strokeStyle = 'rgba(254, 240, 138, 0.6)';
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(rx, ry);
                ctx.lineTo(rx, ry - rayH);
                ctx.stroke();
            }

            ctx.restore();
        } else {
            // Default / Ninja: High-Contrast Geometric Razor Slices
            ctx.save();
            ctx.strokeStyle = this.colors.inkDark;
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.ellipse(0, 0, radius, radius * 0.30, 0, 0, Math.PI * 2);
            ctx.stroke();
            // Rapid rotating diamond
            ctx.rotate(time * 4);
            ctx.strokeRect(-radius * 0.45, -radius * 0.45, radius * 0.9, radius * 0.9);
            ctx.restore();
        }

        ctx.restore();
    },

    drawSkinChargeParticles(ctx, particles, skin = 'ninja', time = 0) {
        if (!particles || !particles.length) return;

        particles.forEach(p => {
            const alpha = Math.max(0, Math.min(1, p.life / (p.maxLife || 0.25)));
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.translate(Math.floor(p.x), Math.floor(p.y));

            if (p.type === 'ninja_slash') {
                ctx.rotate(p.rot || 0);
                ctx.strokeStyle = '#121315';
                ctx.lineWidth = 2.8;
                ctx.beginPath();
                ctx.moveTo(-p.len * 0.5, 0);
                ctx.lineTo(p.len * 0.5, 0);
                ctx.stroke();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1.2;
                ctx.stroke();
            } else if (p.type === 'zombie_bubble') {
                ctx.fillStyle = '#22c55e';
                ctx.shadowColor = '#4ade80';
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(0, 0, p.radius || 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#14532d';
                ctx.lineWidth = 1;
                ctx.stroke();
            } else if (p.type === 'cyborg_spark') {
                ctx.fillStyle = '#00f0ff';
                ctx.shadowColor = '#00f0ff';
                ctx.shadowBlur = 8;
                ctx.fillRect(-p.size * 0.5, -p.size * 0.5, p.size, p.size);
            } else if (p.type === 'astronaut_star') {
                ctx.fillStyle = '#ffffff';
                ctx.shadowColor = '#93c5fd';
                ctx.shadowBlur = 10;
                ctx.font = '800 13px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('★', 0, 0);
            } else if (p.type === 'phantom_spark') {
                ctx.fillStyle = '#b5179e';
                ctx.shadowColor = '#7209b7';
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.arc(0, 0, p.radius || 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(0, 0, (p.radius || 4) * 0.4, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.type === 'aviator_steam') {
                ctx.fillStyle = '#b08968';
                ctx.beginPath();
                ctx.arc(0, 0, p.radius || 6, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.type === 'aviator_gear') {
                ctx.rotate(p.rot || 0);
                ctx.fillStyle = '#7f5539';
                ctx.beginPath();
                ctx.arc(0, 0, p.radius || 5, 0, Math.PI * 2);
                ctx.fill();
                const teeth = 6;
                const gr = (p.radius || 5) * 1.25;
                for (let t = 0; t < teeth; t++) {
                    const ta = t * (Math.PI / 3);
                    ctx.fillRect(Math.cos(ta) * gr - 1.5, Math.sin(ta) * gr - 1.5, 3, 3);
                }
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(0, 0, 2, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.type === 'shaman_rune') {
                ctx.fillStyle = '#00f5d4';
                ctx.shadowColor = '#00f5d4';
                ctx.shadowBlur = 10;
                ctx.font = '800 12px "JetBrains Mono", monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(p.glyph || '✦', 0, 0);
            } else if (p.type === 'samurai_petal') {
                ctx.rotate(p.rot || 0);
                ctx.fillStyle = '#ff2a5f';
                ctx.shadowColor = '#ff2a5f';
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.ellipse(0, 0, p.len || 8, (p.len || 8) * 0.4, 0, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.type === 'samurai_slash') {
                ctx.rotate(p.rot || 0);
                ctx.strokeStyle = '#ff2a5f';
                ctx.shadowColor = '#ff2a5f';
                ctx.shadowBlur = 12;
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(-p.len * 0.5, 0);
                ctx.lineTo(p.len * 0.5, 0);
                ctx.stroke();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1.2;
                ctx.stroke();
            } else if (p.type === 'titan_plume') {
                ctx.fillStyle = (Math.random() > 0.4) ? '#ff6b35' : '#f59e0b';
                ctx.shadowColor = '#ff6b35';
                ctx.shadowBlur = 12;
                ctx.beginPath();
                ctx.arc(0, 0, p.radius || 7, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.type === 'celestial_spark') {
                ctx.rotate(p.rot || 0);
                ctx.fillStyle = '#facc15';
                ctx.shadowColor = '#facc15';
                ctx.shadowBlur = 12;
                const sz = p.sz || 6;
                ctx.beginPath();
                for (let i = 0; i < 8; i++) {
                    const a = i * Math.PI / 4;
                    const r = (i % 2 === 0) ? sz : sz * 0.38;
                    const sx = Math.cos(a) * r;
                    const sy = Math.sin(a) * r;
                    if (i === 0) ctx.moveTo(sx, sy);
                    else ctx.lineTo(sx, sy);
                }
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(0, 0, sz * 0.25, 0, Math.PI * 2);
                ctx.fill();
            } else if (p.type === 'celestial_blade') {
                ctx.fillStyle = 'rgba(250, 204, 21, 0.7)';
                ctx.shadowColor = '#38bdf8';
                ctx.shadowBlur = 10;
                ctx.fillRect(-1.5, -p.len * 0.5, 3, p.len);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-0.75, -p.len * 0.3, 1.5, p.len * 0.6);
            } else {
                // Fallback default spark
                Sprites.drawLightning(ctx, 0, 0, p.scale || 1.0);
            }

            ctx.restore();
        });
    },

    // 4b. Sharp Razor Vector Electric Sparks during Charging
    drawLightning(ctx, x, y, scale = 1.0) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));
        ctx.scale(scale, scale);

        ctx.strokeStyle = this.colors.inkDark;
        ctx.fillStyle = this.colors.inkDark;
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.lineTo(6, -2);
        ctx.lineTo(1, -2);
        ctx.lineTo(5, 14);
        ctx.lineTo(-5, 2);
        ctx.lineTo(0, 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    },

    // 5. Minimalist Currency Paper Notes (Floating Credits)
    drawMoneyBill(ctx, x, y, rotation = 0) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));
        ctx.rotate(rotation);

        // Clean white paper note with crisp ink borders
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-13, -7, 26, 14);

        ctx.strokeStyle = this.colors.inkDark;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-13, -7, 26, 14);

        // Micro-border
        ctx.lineWidth = 0.75;
        ctx.strokeRect(-11, -5, 22, 10);

        // Center Symbol (◈)
        ctx.fillStyle = this.colors.inkDark;
        ctx.font = '800 8px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('◈', 0, 0);

        ctx.restore();
    },

    // 6. Geometric Companion Drone with Noble Subdued Rarity Tinting
    drawPet(ctx, x, y, pet, time = 0) {
        if (!pet) return;
        ctx.save();
        const floatY = Math.sin(time * 5) * 5;
        ctx.translate(Math.floor(x), Math.floor(y + floatY));

        const rarityKey = pet.rarityKey || (
            (pet.rarity === 'Мифический' || pet.rarity === 'Mythic') ? 'mythic' :
            (pet.rarity === 'Легендарный' || pet.rarity === 'Legendary') ? 'legendary' :
            (pet.rarity === 'Эпический' || pet.rarity === 'Epic') ? 'epic' :
            (pet.rarity === 'Редкий' || pet.rarity === 'Rare') ? 'rare' : 'common'
        );

        // Subdued, noble rarity color tokens (not too flashy/neon)
        const rarityThemes = {
            common: {
                stroke: '#3b3e46',
                fill: '#f4f4ee',
                core: '#1c1e22',
                ring: 'rgba(75, 85, 99, 0.45)'
            },
            rare: {
                stroke: '#15803d',
                fill: '#f0fdf4',
                core: '#14532d',
                ring: 'rgba(22, 163, 74, 0.5)'
            },
            epic: {
                stroke: '#1e40af',
                fill: '#eff6ff',
                core: '#1e3a8a',
                ring: 'rgba(37, 99, 235, 0.55)'
            },
            legendary: {
                stroke: '#b45309',
                fill: '#fffbeb',
                core: '#78350f',
                ring: 'rgba(217, 119, 6, 0.6)'
            },
            mythic: {
                stroke: '#b91c1c',
                fill: '#fef2f2',
                core: '#7f1d1d',
                ring: 'rgba(220, 38, 38, 0.65)'
            }
        };

        const theme = rarityThemes[rarityKey] || rarityThemes.common;

        ctx.strokeStyle = theme.stroke;
        ctx.fillStyle = theme.fill;
        ctx.lineWidth = 1.6;

        // Orbiting dashed ring in subtle rarity tint
        ctx.save();
        ctx.rotate(time * 2);
        ctx.strokeStyle = theme.ring;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        // Core Drone Geometry based on pet type/icon
        const icon = pet.icon || '⬡';
        const pName = pet.name || '';

        if (icon === '⬡' || pName.includes('Гексагон') || pName.includes('Hexagon') || pName.includes('Счастливчик') || pName.includes('Lucky')) {
            // Hexagon Shield Drone
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI) / 3;
                const px = Math.cos(angle) * 11;
                const py = Math.sin(angle) * 11;
                if (i === 0) ctx.moveTo(px, py);
                else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            // Core dot
            ctx.fillStyle = theme.core;
            ctx.beginPath();
            ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
            ctx.fill();
        } else if (icon === '◈' || pName.includes('Ромб') || pName.includes('Rhomb') || pName.includes('Diamond') || pName.includes('Крутой') || pName.includes('Cool')) {
            // Diamond Core Drone
            ctx.beginPath();
            ctx.moveTo(0, -12);
            ctx.lineTo(10, 0);
            ctx.lineTo(0, 12);
            ctx.lineTo(-10, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.strokeStyle = theme.core;
            ctx.strokeRect(-3.5, -3.5, 7, 7);
        } else if (icon === '✦' || pName.includes('Звезда') || pName.includes('Star') || pName.includes('Богач') || pName.includes('Rich') || pName.includes('Квазар') || pName.includes('Quasar')) {
            // Nova Star Drone
            ctx.beginPath();
            ctx.arc(0, 0, 8.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // 4 Fin blades
            ctx.fillStyle = theme.core;
            ctx.fillRect(-1.5, -14, 3, 28);
            ctx.fillRect(-14, -1.5, 28, 3);
        } else {
            // Quantum Sphere / Delta Drone
            ctx.beginPath();
            ctx.arc(0, 0, 9.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.fillStyle = theme.core;
            ctx.beginPath();
            ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    },

    // 7. Shockwave Ring (Vector expanding ripples)
    drawShockwave(ctx, x, y, radius, maxRadius, alpha = 1.0) {
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = this.colors.inkDark;
        ctx.lineWidth = 2;

        // Primary outer ring
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();

        // Secondary subtle inner ring
        if (radius > 10) {
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.arc(x, y, radius * 0.75, 0, Math.PI * 2);
            ctx.stroke();
        }

        ctx.restore();
    },

    // 8. In-Flight Kinetic Booster Ring
    drawKineticRing(ctx, x, y, active = true, time = 0, scale = 1.0) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));
        ctx.scale(scale, scale);

        const pulse = active ? Math.sin(time * 6) * 3 : 0;
        const radius = 34 + pulse;

        if (active) {
            // High-voltage active ring
            ctx.strokeStyle = this.colors.inkDark;
            ctx.lineWidth = 2.5;

            // Outer ring with dashed tick pattern
            ctx.setLineDash([8, 6]);
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2);
            ctx.stroke();

            // Inner solid ring
            ctx.setLineDash([]);
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(0, 0, radius - 6, 0, Math.PI * 2);
            ctx.stroke();

            // 3 Animated Boost Chevrons in center pointing UP
            const chevronOffset = (time * 40) % 18;
            ctx.fillStyle = this.colors.inkDark;
            for (let i = -1; i <= 1; i++) {
                const cy = (i * 10) - chevronOffset + 6;
                if (cy > -radius + 8 && cy < radius - 8) {
                    ctx.beginPath();
                    ctx.moveTo(0, cy - 5);
                    ctx.lineTo(9, cy + 3);
                    ctx.lineTo(5, cy + 3);
                    ctx.lineTo(0, cy - 1);
                    ctx.lineTo(-5, cy + 3);
                    ctx.lineTo(-9, cy + 3);
                    ctx.closePath();
                    ctx.fill();
                }
            }

            // Technical side wings / emitter brackets
            ctx.fillRect(-radius - 10, -2, 8, 4);
            ctx.fillRect(radius + 2, -2, 8, 4);

            // Technical tag badge
            ctx.fillStyle = this.colors.inkDark;
            ctx.font = '800 8px "JetBrains Mono", monospace';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('⚡ BOOST +15%', 0, -radius - 10);
        } else {
            // Triggered / Faded Ring
            ctx.strokeStyle = this.colors.inkFaint;
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.arc(0, 0, radius + 12, 0, Math.PI * 2);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        ctx.restore();
    },

    // 9. Supersonic Mach Cone / Sonic Boom Shockwave
    drawSonicBoom(ctx, x, y, radius, alpha = 1.0) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));
        ctx.globalAlpha = Math.max(0, Math.min(1.0, alpha));

        // Sharp Mach cone lines expanding backwards/downwards
        ctx.strokeStyle = this.colors.inkDark;
        ctx.lineWidth = 3;

        ctx.beginPath();
        // Apex at nose (0, -10), flared cone wings to left and right downwards
        ctx.moveTo(-radius * 1.4, radius * 1.1);
        ctx.lineTo(0, -8);
        ctx.lineTo(radius * 1.4, radius * 1.1);
        ctx.stroke();

        // Secondary inner vapor condensation veil
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(-radius * 1.1, radius * 0.9);
        ctx.lineTo(0, -2);
        ctx.lineTo(radius * 1.1, radius * 0.9);
        ctx.stroke();
        ctx.setLineDash([]);

        // Sonic pressure halo
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(0, 0, radius * 0.6, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    },

    // =========================================================================
    // ENCOUNTER LANDMARKS & PASS-BY EASTER EGGS (0 - 15,000,000 METERS)
    // =========================================================================
    ENCOUNTER_LANDMARKS: [
        { id: 'probe_tetra', alt: 5000, get name() { return Sprites.getLandmarkName(this); }, get sub() { return Sprites.getLandmarkSub(this); }, type: 'tetra_probe', xRatio: 0.24 },
        { id: 'strato_glider', alt: 45000, get name() { return Sprites.getLandmarkName(this); }, get sub() { return Sprites.getLandmarkSub(this); }, type: 'strato_glider', xRatio: 0.78 },
        { id: 'relay_satellite', alt: 350000, get name() { return Sprites.getLandmarkName(this); }, get sub() { return Sprites.getLandmarkSub(this); }, type: 'satellite_relay', xRatio: 0.22 },
        { id: 'space_citadel', alt: 1800000, get name() { return Sprites.getLandmarkName(this); }, get sub() { return Sprites.getLandmarkSub(this); }, type: 'space_citadel', xRatio: 0.76 },
        { id: 'lost_astronaut', alt: 5200000, get name() { return Sprites.getLandmarkName(this); }, get sub() { return Sprites.getLandmarkSub(this); }, type: 'lost_astronaut', xRatio: 0.28 },
        { id: 'star_roadster', alt: 9800000, get name() { return Sprites.getLandmarkName(this); }, get sub() { return Sprites.getLandmarkSub(this); }, type: 'star_roadster', xRatio: 0.72 },
        { id: 'quantum_ufo', alt: 14500000, get name() { return Sprites.getLandmarkName(this); }, get sub() { return Sprites.getLandmarkSub(this); }, type: 'quantum_ufo', xRatio: 0.50 }
    ],

    getLandmarkName(landmark) {
        if (!landmark) return '';
        const keyMap = {
            'probe_tetra': 'landmark_probe',
            'strato_glider': 'landmark_glider',
            'relay_satellite': 'landmark_relay',
            'space_citadel': 'landmark_citadel',
            'lost_astronaut': 'landmark_astronaut',
            'star_roadster': 'landmark_roadster',
            'quantum_ufo': 'landmark_ufo'
        };
        const key = keyMap[landmark.id];
        if (key && typeof window.t === 'function') {
            return window.t(key);
        }
        return landmark.name || '';
    },

    getLandmarkSub(landmark) {
        if (!landmark) return '';
        const keyMap = {
            'probe_tetra': 'landmark_probe_sub',
            'strato_glider': 'landmark_glider_sub',
            'relay_satellite': 'landmark_relay_sub',
            'space_citadel': 'landmark_citadel_sub',
            'lost_astronaut': 'landmark_astronaut_sub',
            'star_roadster': 'landmark_roadster_sub',
            'quantum_ufo': 'landmark_ufo_sub'
        };
        const key = keyMap[landmark.id];
        if (key && typeof window.t === 'function') {
            return window.t(key);
        }
        return landmark.sub || '';
    },

    drawEncounterCompanion(ctx, width, height, enc, time, inkColor, mutedColor) {
        if (!enc || enc.alpha <= 0) return;
        const sway = Math.sin(time * 1.8) * 6;
        const sx = width * (enc.xRatio || 0.25) + sway;
        const sy = enc.currentY;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1.0, enc.alpha));

        const isRight = (enc.xRatio || 0.25) > 0.5;

        // Radar telemetry laser connecting player center to the escort object
        ctx.strokeStyle = (enc.alpha > 0.6) ? 'rgba(56, 189, 248, 0.45)' : 'rgba(120, 120, 120, 0.25)';
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.moveTo(width / 2, height * 0.55);
        ctx.lineTo(sx, sy);
        ctx.stroke();
        ctx.setLineDash([]);

        // Render the specialized landmark sprite
        if (enc.type === 'tetra_probe') this.drawTetraProbe(ctx, sx, sy, time, inkColor, mutedColor);
        else if (enc.type === 'strato_glider') this.drawStratoGlider(ctx, sx, sy, time, inkColor, mutedColor);
        else if (enc.type === 'satellite_relay') this.drawSatelliteRelay(ctx, sx, sy, time, inkColor, mutedColor);
        else if (enc.type === 'space_citadel') this.drawSpaceCitadel(ctx, sx, sy, time, inkColor, mutedColor);
        else if (enc.type === 'lost_astronaut') this.drawLostAstronaut(ctx, sx, sy, time, inkColor, mutedColor);
        else if (enc.type === 'star_roadster') this.drawStarRoadster(ctx, sx, sy, time, inkColor, mutedColor);
        else if (enc.type === 'quantum_ufo') this.drawQuantumUFO(ctx, sx, sy, time, inkColor, mutedColor);

        // Technical telemetry tag badge beside the escort (dynamically localized)
        const tagX = isRight ? sx - 35 : sx + 35;
        const displayName = (typeof this.getLandmarkName === 'function') ? this.getLandmarkName(enc) : enc.name;
        const displaySub = (typeof this.getLandmarkSub === 'function') ? this.getLandmarkSub(enc) : enc.sub;

        ctx.font = '800 8.5px "JetBrains Mono", monospace';
        ctx.fillStyle = inkColor;
        ctx.textAlign = isRight ? 'right' : 'left';
        ctx.fillText(`🛰️ ${displayName}`, tagX, sy - 5);

        ctx.font = '700 7px "JetBrains Mono", monospace';
        ctx.fillStyle = mutedColor;
        ctx.fillText(displaySub, tagX, sy + 7);

        ctx.restore();
    },

    // 1. Weather Tetra-Probe (5,000m)
    drawTetraProbe(ctx, x, y, time, inkColor, mutedColor) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));
        const rot = time * 1.5;
        const w = 18 * Math.cos(rot);
        
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, -18);
        ctx.lineTo(w, 10);
        ctx.lineTo(-w, 10);
        ctx.closePath();
        ctx.stroke();

        ctx.strokeStyle = mutedColor;
        ctx.beginPath();
        ctx.moveTo(0, -18);
        ctx.lineTo(0, 10);
        ctx.stroke();

        // Antenna with blinking LED
        ctx.strokeStyle = inkColor;
        ctx.beginPath();
        ctx.moveTo(0, -18);
        ctx.lineTo(0, -28);
        ctx.stroke();

        if (Math.sin(time * 6) > 0) {
            ctx.fillStyle = '#ef4444';
            ctx.beginPath();
            ctx.arc(0, -28, 2.5, 0, Math.PI * 2);
            ctx.fill();
        }

        // Hanging scientific sensor payload
        ctx.strokeRect(-5, 16, 10, 8);
        ctx.beginPath();
        ctx.moveTo(-3, 10);
        ctx.lineTo(-3, 16);
        ctx.moveTo(3, 10);
        ctx.lineTo(3, 16);
        ctx.stroke();
        ctx.restore();
    },

    // 2. Stratospheric Supersonic Glider (45,000m)
    drawStratoGlider(ctx, x, y, time, inkColor, mutedColor) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 1.5;

        // Swept delta-wing body
        ctx.beginPath();
        ctx.moveTo(0, -22);
        ctx.lineTo(24, 14);
        ctx.lineTo(8, 10);
        ctx.lineTo(0, 16);
        ctx.lineTo(-8, 10);
        ctx.lineTo(-24, 14);
        ctx.closePath();
        ctx.stroke();

        // Cockpit visor line
        ctx.fillStyle = inkColor;
        ctx.fillRect(-2.5, -12, 5, 8);

        // Wingtip strobe beacons
        if (Math.sin(time * 8) > 0) {
            ctx.fillStyle = '#38bdf8';
            ctx.fillRect(23, 12, 3, 3);
            ctx.fillRect(-26, 12, 3, 3);
        }
        ctx.restore();
    },

    // 3. Orbital Relay Satellite (350,000m)
    drawSatelliteRelay(ctx, x, y, time, inkColor, mutedColor) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));
        const tilt = Math.sin(time * 0.5) * 0.15;
        ctx.rotate(tilt);

        // Central satellite chassis
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-9, -9, 18, 18);
        ctx.fillStyle = inkColor;
        ctx.fillRect(-4, -4, 8, 8);

        // Solar panel arrays left and right
        ctx.strokeStyle = inkColor;
        ctx.strokeRect(-36, -7, 22, 14);
        ctx.strokeRect(14, -7, 22, 14);

        // Solar cell grid wireframe
        ctx.strokeStyle = mutedColor;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(-25, -7); ctx.lineTo(-25, 7);
        ctx.moveTo(-14, -7); ctx.lineTo(-14, 7);
        ctx.moveTo(25, -7); ctx.lineTo(25, 7);
        ctx.moveTo(36, -7); ctx.lineTo(36, 7);
        ctx.stroke();

        // Dish antenna
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, -14, 8, Math.PI, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.lineTo(0, -22);
        ctx.stroke();

        // Signal wave rings
        if (Math.sin(time * 4) > 0.2) {
            ctx.strokeStyle = mutedColor;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.arc(0, -22, 6, Math.PI * 1.2, Math.PI * 1.8);
            ctx.stroke();
        }
        ctx.restore();
    },

    // 4. Modular Space Citadel (1,800,000m)
    drawSpaceCitadel(ctx, x, y, time, inkColor, mutedColor) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));
        
        // Rotating Torus Habitat Ring
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 1.5;
        const ringAngle = time * 0.6;
        const ringY = Math.sin(ringAngle) * 5;
        ctx.beginPath();
        ctx.ellipse(0, ringY, 34, 12, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Central Habitation Axis
        ctx.fillStyle = inkColor;
        ctx.fillRect(-6, -24, 12, 48);

        // Docking Node
        ctx.strokeStyle = inkColor;
        ctx.strokeRect(-10, -32, 20, 8);

        // Extended Solar Wings
        ctx.lineWidth = 1.2;
        ctx.strokeRect(-44, -22, 30, 8);
        ctx.strokeRect(14, -22, 30, 8);
        ctx.strokeRect(-44, 14, 30, 8);
        ctx.strokeRect(14, 14, 30, 8);

        // Blinking Navigation Beacon
        ctx.fillStyle = (Math.sin(time * 5) > 0) ? '#22c55e' : '#dc2626';
        ctx.beginPath();
        ctx.arc(0, -34, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    },

    // 5. Lost Astronaut in Open Space (5,200,000m)
    drawLostAstronaut(ctx, x, y, time, inkColor, mutedColor) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));
        const floatRoll = Math.sin(time * 0.8) * 0.2;
        ctx.rotate(floatRoll);

        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 1.5;

        // Helmet
        ctx.beginPath();
        ctx.arc(0, -12, 9, 0, Math.PI * 2);
        ctx.stroke();
        // Golden/bright Visor
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.ellipse(2, -12, 5, 4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Spacesuit Torso & Backpack
        ctx.strokeRect(-7, -3, 14, 16);
        ctx.strokeRect(-11, -2, 4, 14);

        // Legs floating
        ctx.beginPath();
        ctx.moveTo(-4, 13); ctx.lineTo(-6, 22);
        ctx.moveTo(4, 13); ctx.lineTo(6, 22);
        ctx.stroke();

        // Left arm stable
        ctx.beginPath();
        ctx.moveTo(-7, 0); ctx.lineTo(-14, 6);
        ctx.stroke();

        // Right arm waving!
        const wave = Math.sin(time * 4) * 0.45;
        ctx.beginPath();
        ctx.moveTo(7, 0);
        ctx.lineTo(14, -10 + wave * 6);
        ctx.lineTo(18, -16 + wave * 8);
        ctx.stroke();

        // Safety tether drifting away
        ctx.strokeStyle = mutedColor;
        ctx.lineWidth = 0.8;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(-11, 8);
        ctx.bezierCurveTo(-22, 18, -30, 8, -45, 24);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
    },

    // 6. Orbital Star Roadster / Space Convertible (9,800,000m)
    drawStarRoadster(ctx, x, y, time, inkColor, mutedColor) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));
        const carPitch = -0.18 + Math.sin(time * 0.6) * 0.08;
        ctx.rotate(carPitch);

        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 1.8;

        // Car chassis silhouette
        ctx.beginPath();
        ctx.moveTo(-28, 4);
        ctx.lineTo(-24, -4);
        ctx.lineTo(-12, -4);
        ctx.lineTo(-4, -12);
        ctx.lineTo(8, -12);
        ctx.lineTo(16, -2);
        ctx.lineTo(28, 0);
        ctx.lineTo(28, 6);
        ctx.lineTo(-28, 6);
        ctx.closePath();
        ctx.stroke();

        // Wheels
        ctx.fillStyle = inkColor;
        ctx.beginPath();
        ctx.arc(-16, 7, 5, 0, Math.PI * 2);
        ctx.arc(18, 7, 5, 0, Math.PI * 2);
        ctx.fill();

        // Dummy Astronaut Driver sitting at wheel
        ctx.beginPath();
        ctx.arc(-6, -7, 4.5, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-4, -5); ctx.lineTo(3, -6);
        ctx.stroke();

        // Headlights faint beam in space
        ctx.strokeStyle = mutedColor;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(28, 1); ctx.lineTo(50, -4);
        ctx.moveTo(28, 5); ctx.lineTo(50, 10);
        ctx.stroke();
        ctx.restore();
    },

    // 7. Mysterious Quantum UFO (14,500,000m)
    drawQuantumUFO(ctx, x, y, time, inkColor, mutedColor) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));
        const hover = Math.sin(time * 2.5) * 4;
        ctx.translate(0, hover);

        // Tractor beam / propulsion light cone
        const beamGrad = ctx.createLinearGradient(0, 8, 0, 48);
        beamGrad.addColorStop(0, 'rgba(34, 211, 238, 0.4)');
        beamGrad.addColorStop(1, 'rgba(34, 211, 238, 0.0)');
        ctx.fillStyle = beamGrad;
        ctx.beginPath();
        ctx.moveTo(-10, 6);
        ctx.lineTo(10, 6);
        ctx.lineTo(28, 48);
        ctx.lineTo(-28, 48);
        ctx.closePath();
        ctx.fill();

        // Saucer Cockpit Dome
        ctx.strokeStyle = inkColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(0, -4, 12, Math.PI, Math.PI * 2);
        ctx.stroke();

        // Alien silhouette inside dome
        ctx.fillStyle = inkColor;
        ctx.beginPath();
        ctx.arc(0, -8, 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Main Disc Hull
        ctx.beginPath();
        ctx.ellipse(0, 0, 32, 8, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Rotating Hull Lights
        const lightCount = 6;
        for (let i = 0; i < lightCount; i++) {
            const angle = time * 3 + (i * (Math.PI * 2 / lightCount));
            const lx = Math.cos(angle) * 26;
            const ly = Math.sin(angle) * 5;
            ctx.fillStyle = (i % 2 === 0) ? '#38bdf8' : '#e0e7ff';
            ctx.beginPath();
            ctx.arc(lx, ly, 1.8, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    },

    // =========================================================================
    // INTERACTIVE FLIGHT OBJECTS: ASTEROIDS, CRYSTALS & ANOMALIES
    // =========================================================================

    // Interactive Space Asteroid (Tappable for CRED)
    drawInteractiveAsteroid(ctx, ast, x, y, time, isDarkSky) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));
        ctx.rotate(ast.rotation || 0);

        const strokeColor = isDarkSky ? '#ffffff' : this.colors.inkDark;
        const fillColor = isDarkSky ? '#1e2126' : '#e5e3db';
        ctx.strokeStyle = strokeColor;
        ctx.fillStyle = fillColor;
        ctx.lineWidth = 1.8;

        // Polygonal faceted asteroid shape
        ctx.beginPath();
        const r = ast.radius || 20;
        const verts = ast.vertices || [-0.2, 0.3, -0.1, 0.25, -0.15, 0.2, -0.3, 0.1];
        const sides = 7;
        for (let i = 0; i < sides; i++) {
            const a = (i / sides) * Math.PI * 2;
            const rad = r * (1 + (verts[i % verts.length] || 0));
            const px = Math.cos(a) * rad;
            const py = Math.sin(a) * rad;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Inner rocky facet lines
        ctx.strokeStyle = isDarkSky ? 'rgba(255,255,255,0.35)' : 'rgba(18,19,21,0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(-r * 0.5, -r * 0.3);
        ctx.lineTo(r * 0.3, 0);
        ctx.lineTo(-r * 0.1, r * 0.6);
        ctx.stroke();

        // Value chip tag
        ctx.rotate(-(ast.rotation || 0));
        ctx.font = '800 8.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#10b981';
        ctx.textAlign = 'center';
        ctx.fillText(`+${ast.points} 💵`, 0, r + 12);

        ctx.restore();
    },

    // Ultra-Rare Sparkling Crystal Geode (Tappable for +1 💎)
    drawCrystalGeode(ctx, geode, x, y, time, isDarkSky) {
        ctx.save();
        ctx.translate(Math.floor(x), Math.floor(y));

        // Pulsing orbital beacons
        const pulse = 1 + Math.sin(time * 5) * 0.15;
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1.2;
        ctx.setLineDash([4, 4]);

        ctx.beginPath();
        ctx.arc(0, 0, 22 * pulse, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Shimmering Diamond Core
        ctx.fillStyle = '#38bdf8';
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        
        ctx.beginPath();
        ctx.moveTo(0, -14);
        ctx.lineTo(12, -2);
        ctx.lineTo(0, 14);
        ctx.lineTo(-12, -2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Inner facets
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -14); ctx.lineTo(0, 14);
        ctx.moveTo(-12, -2); ctx.lineTo(12, -2);
        ctx.stroke();

        // Floating sparkling crosshairs
        for (let i = 0; i < 3; i++) {
            const a = time * 2 + (i * Math.PI * 2 / 3);
            const spX = Math.cos(a) * 26;
            const spY = Math.sin(a) * 26;
            ctx.fillStyle = '#ffffff';
            ctx.font = '900 10px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('✦', spX, spY);
        }

        // Shimmering Tag
        ctx.font = '800 8.5px "JetBrains Mono", monospace';
        ctx.fillStyle = '#38bdf8';
        ctx.textAlign = 'center';
        const crystLabel = (typeof window.t === 'function' ? window.t('hud_cryst') : 'CRYST');
        ctx.fillText(`💎 ${crystLabel}`, 0, 24);

        ctx.restore();
    },

    // Cosmic Anomaly Particle Effects (Solar Wind / Ion Stream)
    drawCosmicAnomalyEffects(ctx, width, height, anomaly, altitude, time) {
        if (!anomaly || !anomaly.active) return;
        ctx.save();

        if (anomaly.type === 'SOLAR_WIND') {
            // Golden Solar Flare Stream
            ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)';
            ctx.lineWidth = 1.5;
            const count = 16;
            for (let i = 0; i < count; i++) {
                const sx = (i * 37 + time * 120) % (width + 60) - 30;
                const sy = (i * 53 + time * 240) % (height + 60) - 30;
                ctx.beginPath();
                ctx.moveTo(sx, sy);
                ctx.lineTo(sx - 20, sy + 35);
                ctx.stroke();
            }
        } else if (anomaly.type === 'ION_STREAM') {
            // Cyan-White Ion Arc Discharge
            ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
            ctx.lineWidth = 1.5;
            const count = 12;
            for (let i = 0; i < count; i++) {
                const sx = (i * 43) % width;
                const sy = (i * 71 + time * 320) % height;
                ctx.beginPath();
                ctx.moveTo(sx - 25, sy);
                ctx.lineTo(sx + 25, sy);
                ctx.stroke();
            }
        }

        ctx.restore();
    }
};

window.Sprites = Sprites;

