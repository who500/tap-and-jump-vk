// ============================================================
// TAP & JUMP — Localization System (i18n)
// Supports: 'en' (English), 'ru' (Russian)
// ============================================================

const LOCALES = {
    en: {
        // --- Splash Screen ---
        splash_subtitle: '// HIGH-ALTITUDE JUMP RANGE //',
        splash_loading: '> LOADING CORE...',
        splash_ready: '> SYSTEM READY',

        // --- Top HUD ---
        hud_center: 'POLYGON // SECTOR-01',
        hud_cryst: 'CRYST',

        // --- Desktop Sidebar ---
        flank_tag_left: '[ SECTOR // TEST-01 ]',
        flank_title_left: 'JUMP RANGE',
        flank_status_label: 'STATUS:',
        flank_status_val: 'READY TO LAUNCH',
        alt_0: '0m // START',
        alt_1000: '1 000m // MESO',
        alt_3000: '3 000m // POCKET',
        alt_10000: '10 000m // ORBIT',
        alt_25000: '25 000m // EXO',
        alt_50000: '50 000m // ASTEROIDS',
        alt_100000: '100 000m // ETHER',
        alt_250000: '250 000m+ // VACUUM',

        // --- Right Sidebar Hotkeys ---
        flank_tag_right: '[ CONTROLS // PC ]',
        flank_title_right: 'HOTKEYS',
        hotkey_space: 'TAP / DIVE',
        hotkey_1: 'UPGRADES',
        hotkey_2: 'DRONES',
        hotkey_3: 'REBIRTH',
        hotkey_4: 'SKINS',
        hotkey_5: 'RECORDS',
        hotkey_f: 'FULLSCREEN',
        hotkey_o: 'SETTINGS',
        hotkey_m: 'SOUND ON/OFF',
        hotkey_esc: 'CLOSE WINDOWS',

        // --- Idle Prompt ---
        prompt_title: 'TAP THE SCREEN',
        prompt_sub: 'Fast taps charge power and jump multiplier',
        turbo_badge: '⚡ TURBO-START ✖2.50',
        turbo_ad_tag: 'AD 📺',
        turbo_active: '⚡ BOOST ACTIVE!',
        turbo_ready: 'READY',

        // --- Charging HUD ---
        charge_mult_label: 'MULTIPLIER',
        charge_energy_label: 'ENERGY',
        charge_action: '🔥 TAP FASTER! 🔥',
        charge_rising: 'CHARGING',
        charge_falling: 'FALLING!',

        // --- Landing Double Banner ---
        landing_tag: 'LANDING:',
        double_main: 'DOUBLE ✖2',
        double_ad: 'AD 📺',

        // --- Altitude Visor ---
        visor_tag: 'ALTIMETER',
        visor_sub_default: 'STRATOSPHERE',
        visor_ascent: 'CLIMBING TO PEAK',
        visor_apex_tap: 'TAP: LAND ▼',
        visor_dive: 'DIVE!',

        // --- Bottom Nav ---
        nav_upgrades: 'UPGRADES',
        nav_drones: 'DRONES',
        nav_skins: 'SKINS',
        nav_records: 'RECORDS',
        nav_rebirth: 'REBIRTH',

        // --- Upgrades Modal ---
        upgrades_code: 'CHARACTER UPGRADES',
        upgrades_title: 'UPGRADES',
        upg_power_name: 'JUMP POWER',
        upg_power_desc: 'Base launch force per tap',
        upg_power_prefix: 'POWER:',
        upg_speed_name: 'BOOST TIME',
        upg_speed_desc: 'Tap duration and multiplier growth per tap',
        upg_speed_prefix: 'TIME:',
        upg_aero_name: 'AERODYNAMICS',
        upg_aero_desc: 'Reduces air drag (+8% height per level)',
        upg_aero_prefix: 'FAIRING:',
        upg_crit_name: 'CRITICAL TAP',
        upg_crit_desc: 'Chance to land a critical pulse (+0.25x per tap)',
        upg_crit_prefix: 'CRIT CHANCE:',
        btn_upgrade: 'UPGRADE',

        // --- Pets / Drones Modal ---
        pets_code: 'COMPANIONS & HELPERS',
        pets_title: 'DRONES IN FLIGHT',
        pet_tab_hangar: 'HANGAR',
        pet_tab_scanner: 'SCAN',
        pet_tab_fusion: 'FUSION',
        pet_hangar_label: 'DRONES IN HANGAR',
        pet_sort_rarity: 'RARITY ▼',
        pet_sort_level: 'LEVEL ▼',
        btn_find: '+ FIND',
        sel_pet_default_name: 'Hexagon',
        sel_pet_default_rarity: 'Common',
        sel_pet_default_lvl: 'LVL. 1',
        sel_pet_default_mult: '✖ 1.0 to coins',
        sel_pet_default_energy: '+2 to thrust ⚡',
        sel_pet_default_desc: 'Basic drone. Provides initial jump thrust.',
        btn_equip: 'EQUIP',
        btn_unequip: 'UNEQUIP',
        badge_equipped: '✓ EQUIPPED',

        // Scanner Tab
        scanner_hero_title: 'ORBITAL SCANNER',
        scanner_hero_sub: 'Scan deep space to discover new companions',
        btn_scan_crystals: 'EXPLORE SECTOR',
        scan_crystals_cost: '2 CRYSTALS 💎',
        btn_scan_free: 'SCAN FREE 📺',
        scan_free_label: 'FREE',
        scanner_chances_title: 'MODULE DISCOVERY RATES:',
        chance_common: 'Common (Hexagon)',
        chance_rare: 'Rare (Rhombus)',
        chance_epic: 'Epic (Quasar)',
        chance_legendary: 'Legendary (Sphere)',
        chance_mythic: 'Mythic (Singular)',

        // Fusion Tab
        fusion_tag: 'QUANTUM FUSION',
        fusion_sub: 'COMBINE 3 DUPLICATES INTO A RARER TIER',
        fusion_select: 'SELECT TIER FOR FUSION',
        btn_fuse: 'FUSE (3 ➔ 1)',
        fuse_ad: '⚡ +25% BOOST FOR 📺',
        fuse_ad_active: '⚡ +25% BOOST ACTIVE!',
        matrix_title: 'FUSION MATRIX:',

        // --- Rebirth Modal ---
        rebirth_code: 'CYCLE RESTART',
        rebirth_title: 'REBIRTH',
        rebirth_desc: 'Resets coins and base upgrades, but permanently increases all future income by +100%, grants rare CRYSTALS 💎 and saves all your drones!',
        rebirth_cur_bonus: 'CURRENT BONUS:',
        rebirth_next_bonus: 'AFTER REBIRTH:',
        rebirth_need_coins: 'COINS NEEDED:',
        btn_rebirth: 'PERFORM REBIRTH',

        // --- Skins Modal ---
        skins_code: 'PILOT WARDROBE',
        skins_title: 'SUITS & GEAR',
        skin_perk_label: 'EFFECT:',
        skin_unlock_label: 'CONDITION:',
        btn_skin_equip: 'EQUIP SUIT',
        skin_badge_equipped: '✓ EQUIPPED',
        skin_badge_available: 'AVAILABLE',
        skin_badge_locked: '🔒 LOCKED',
        skin_card_active: 'ACTIVE',
        skin_card_open: 'UNLOCKED',
        skin_card_closed: 'LOCKED',
        btn_skin_buy: 'BUY FOR 💎',
        btn_skin_unlock_ad: 'UNLOCK FOR 📺',
        skin_btn_current: '✓ CURRENT GEAR',
        skin_btn_locked: '🔒 LOCKED',
        skin_badge_vip: '★ VIP EXCLUSIVE',
        btn_skin_get_vip: 'UNLOCK VIA VIP (99 YAN)',

        // --- Scanner Modal ---
        scanner_status_searching: 'SEARCHING SIGNAL...',
        scanner_lock_tag_search: '[ SEARCHING ]',
        scanner_lock_tag_found: '[ FOUND ]',
        scanner_signal_caught: '>> SIGNAL LOCKED! <<',
        scanner_telemetry_1: '> SCANNING FREQUENCY...',
        scanner_telemetry_2: '> SEARCHING SIGNAL...',
        scanner_telemetry_3: '> SIGNAL FOUND!...',
        scanner_footer: 'RADAR: DRONE-SCANNER 01',
        scanner_reveal_drone: 'DRONE',
        scanner_reveal_mult: '💵 to coins',
        scanner_reveal_energy: '⚡ to thrust',
        btn_scanner_equip: '⚡ EQUIP NOW',
        btn_scanner_stash: 'TO HANGAR 📦',

        // --- Settings Modal ---
        settings_code: 'PARAMETERS // SYSTEM',
        settings_title: 'SETTINGS',
        settings_sound_title: 'SOUND EFFECTS',
        settings_sound_sub: 'Clicks, synthesizer and radar scanner',
        settings_sound_on: 'ON',
        settings_sound_off: 'OFF',
        settings_sound_label_on: 'SOUND: ON',
        settings_sound_label_off: 'SOUND: OFF',
        settings_lang_title: 'LANGUAGE',
        settings_lang_sub: 'Interface language / Язык интерфейса',
        settings_reset_title: 'RESET DATA',
        settings_reset_sub: 'Full reset of coins, crystals and drones',
        btn_reset: 'RESET ⚠️',
        reset_confirm_title: '⚠️ CONFIRM RESET',
        reset_confirm_desc: 'Are you sure? All coin balance, crystals, records and discovered drones will be permanently deleted.',
        btn_confirm_yes: 'YES, DELETE ALL',
        btn_confirm_no: 'CANCEL',
        settings_vip_title: 'VIP STATUS // YANDEX PASS',
        settings_vip_sub: 'Permanent No-Ads, ✖2 CRED & Legendary Skin',
        settings_vip_perk_no_ads: 'Permanent removal of all interstitial ads',
        settings_vip_perk_skin: 'Hyper Ultra Legendary Skin «Celestial»',
        settings_vip_perk_mult: 'Permanent ✖2 CRED multiplier & +50% altitude',
        btn_buy_vip: '★ BUY VIP STATUS — 99 YAN ★',
        vip_active_badge: '★ VIP STATUS ACTIVE ★',
        vip_purchased_alert: '👑 VIP STATUS UNLOCKED! Welcome, Celestial.',

        // --- Offline Income Modal ---
        offline_code: 'ORBITAL TELEMETRY // AUTONOMOUS MODE',
        offline_title: 'OFFLINE EARNINGS',
        offline_msg: 'While you were away, your autonomous modules patrolled the orbit and collected resources:',
        btn_triple_label: '★ DOUBLE (✖2) AND +1 💎 ★',
        btn_triple_ad: 'AD 📺',
        btn_claim_reg: 'CLAIM REGULAR REWARD',

        // --- Mock Ad Modal ---
        mock_ad_title: 'SPONSOR SIGNAL BROADCAST',
        mock_ad_promo: 'TECH SECTOR // JUMP RANGE',
        mock_ad_sub: 'Your reward will be credited automatically after the broadcast ends.',
        btn_mock_skip: 'SKIP TEST ⏩',

        // --- Stats Modal ---
        stats_code: 'TELEMETRY // ACHIEVEMENTS',
        stats_title: 'RECORDS & STATISTICS',
        stats_hof_title: '🏆 HALL OF FAME // TOP-5 JUMPS',
        stats_career_title: '📊 CAREER STATISTICS',
        stat_distance: 'DISTANCE:',
        stat_jumps: 'JUMPS:',
        stat_max_mult: 'MAX MULTIPLIER:',
        stat_drones: 'DRONES IN HANGAR:',
        hof_empty: 'NO RECORDS YET. MAKE YOUR FIRST JUMP!',

        // --- Sector Names (in-flight) ---
        sector_strato: 'STRATOSPHERE',
        sector_meso: 'MESOSPHERE',
        sector_karman: 'KARMAN LINE',
        sector_orbital: 'ORBITAL SECTOR',
        sector_exo: 'EXOSPHERE',
        sector_deep: 'DEEP SPACE',
        sector_belt: 'ASTEROID BELT',
        sector_ether: 'INTERPLANETARY ETHER',
        sector_vacuum: 'QUANTUM VACUUM',

        // --- Encounter Landmarks ---
        enc_tetra: 'TETRA-PROBE',
        enc_glider: 'STRATO-GLIDER',
        enc_satellite: 'RELAY SAT «BEACON»',
        enc_citadel: 'ORBITAL CITADEL',
        enc_astronaut: 'LOST ASTRONAUT',
        enc_roadster: 'ORBITAL ROADSTER',
        enc_ufo: 'QUANTUM UFO',

        // --- Skin Catalog ---
        skin_ninja_name: 'Polygon Runner',
        skin_ninja_title: 'BASIC SUIT',
        skin_ninja_desc: 'Classic tactical suit with a long flowing scarf and white visor.',
        skin_ninja_perk: 'Standard aerodynamics.',
        skin_ninja_unlock: 'Available immediately',
        skin_zombie_name: 'Cyber-Zombie',
        skin_zombie_title: 'REANIMATED',
        skin_zombie_desc: 'Experimental biocyborg with exposed circuits, torn suit and cyber-eye.',
        skin_zombie_perk: '+10% to boost multiplier retention.',
        skin_zombie_unlock: 'Rebirth (Rank #1+) or 15 💎',
        skin_cyborg_name: 'Chrome-Cyborg MK-II',
        skin_cyborg_title: 'TITANIUM ALLOY',
        skin_cyborg_desc: 'Inverted chrome titanium armor with dual sensor visor and servos.',
        skin_cyborg_perk: '+5% to flight height.',
        skin_cyborg_unlock: 'Height 25 000m or Rebirth #2+ (or 25 💎)',
        skin_astro_name: 'Orbital Cosmonaut',
        skin_astro_title: 'VACUUM SPACESUIT',
        skin_astro_desc: 'Heavy helmet with gold visor, oxygen pack and reaction thrusters.',
        skin_astro_perk: '+10% CRED per flight.',
        skin_astro_unlock: 'Height 100 000m (or 40 💎)',
        skin_phantom_name: 'Quantum Phantom',
        skin_phantom_title: 'PLASMA ENTITY',
        skin_phantom_desc: 'Pure kinetic energy in a silhouette form with pulsing flicker and force field.',
        skin_phantom_perk: 'Enhanced apogee shockwave.',
        skin_phantom_unlock: 'Height 500 000m or Rebirth #3+ (or 75 💎)',
        skin_aviator_name: 'Retro Aviator',
        skin_aviator_title: 'VINTAGE FLIGHT',
        skin_aviator_desc: 'Steampunk flight helmet with brass goggles, white wind-scarf and mechanical micro-propeller.',
        skin_aviator_perk: '+15% CRED on landing.',
        skin_aviator_unlock: 'Watch 1 Ad 📺',
        skin_shaman_name: 'Cyber Shaman',
        skin_shaman_title: 'NEON DRUID',
        skin_shaman_desc: 'Antler sensor headgear, ritual high-tech cloak with cyber-runes and 3 orbiting plasma orbs.',
        skin_shaman_perk: '+20% faster ring boost charging.',
        skin_shaman_unlock: 'Watch 1 Ad 📺',
        skin_samurai_name: 'Void Ronin',
        skin_samurai_title: 'CYBER BLADE',
        skin_samurai_desc: 'Conical Kasa hat with optical cables, dual energized katanas in back scabbards, high-tech haori.',
        skin_samurai_perk: '+15% to peak altitude.',
        skin_samurai_unlock: 'Height 1 000 000m (or 60 💎)',
        skin_titan_name: 'Apex Mecha Titan',
        skin_titan_title: 'HEAVY EXOSKELETON',
        skin_titan_desc: 'Reinforced composite battle armor, massive pauldrons, crosshair visor and high-thrust plasma vents.',
        skin_titan_perk: '+25% launch thrust energy retention.',
        skin_titan_unlock: 'Height 5 000 000m or Rebirth #5+ (or 100 💎)',
        skin_celestial_name: 'Celestial Demiurge',
        skin_celestial_title: 'HYPER ULTRA LEGENDARY',
        skin_celestial_desc: 'Supreme solar crown, radiant photon wings, singularity core with divine light aura.',
        skin_celestial_perk: '+50% height, ✖2 CRED, +30% impulse, +25% ring boost.',
        skin_celestial_unlock: 'Unlocked by watching an Ad',

        // --- Pet Catalog ---
        pet_common_name: 'Hexagon',
        pet_common_rarity: 'Common',
        pet_common_desc: 'Basic drone. Provides initial jump thrust.',
        pet_rare_name: 'Rhombus',
        pet_rare_rarity: 'Rare',
        pet_rare_desc: 'Rare module. Multiplies flight income by +25% and gives +5 thrust.',
        pet_epic_name: 'Quasar',
        pet_epic_rarity: 'Epic',
        pet_epic_desc: 'Epic module! +50% income and powerful +12 thrust!',
        pet_legendary_name: 'Sphere',
        pet_legendary_rarity: 'Legendary',
        pet_legendary_desc: 'Legendary module! Income ✖ 2.00 and super-thrust +25!',
        pet_mythic_name: 'Singular',
        pet_mythic_rarity: 'Mythic',
        pet_mythic_desc: 'Mythic module! Income ✖ 3.00 and quantum thrust +50!',
        pet_default_rarity: 'Common',
        pet_no_drone: 'No drone',
        pet_upgrade_cost_label: 'NEED',

        // Fusion tiers
        tier_common: 'Commons',
        tier_rare_from: 'Rares',
        tier_epic_from: 'Epics',
        tier_legendary_from: 'Legendaries',
        tier_rare_to: 'Rare',
        tier_epic_to: 'Epic',
        tier_legendary_to: 'Legendary',
        tier_mythic_to: 'Mythic',

        // --- Floating Texts ---
        float_crit: '⚡ CRIT! +0.25x ⚡',
        float_turbo_charged: '⚡ TURBO BOOST: ✖ 2.50! ⚡',
        float_turbo_ready: '⚡ TURBO CHARGED! ⚡',
        float_dive: '▼ FAST DESCENT ▼',
        float_rebirth: (count, crystals) => `REBIRTH #${count}! +100% INCOME AND +${crystals} 💎!`,
        float_skin_equipped: (name) => `SUIT EQUIPPED: ${name}!`,
        float_skin_new: (name) => `🔓 NEW SUIT: ${name}!`,
        float_skin_unlocked: (name) => `UNLOCKED: ${name}!`,
        float_skin_need_gems: (n) => `NEED ${n} 💎!`,
        float_need_cred: (cost) => `NEED ${cost.toLocaleString()} CRED`,
        float_need_crystals: 'NEED 2 CRYSTALS 💎',
        float_scan_cooldown: (m, s) => `SCAN AVAILABLE IN ${m}:${s}`,
        float_new_module: (rarity, icon, name) => `NEW MODULE: [${rarity}] ${icon} ${name}!`,
        float_no_delete: 'CANNOT DELETE LAST MODULE!',
        float_pet_need_cred: (cost) => `NEED ${cost.toLocaleString()} CRED`,
        float_new_record: (m) => `NEW RECORD: ${m.toLocaleString()}m!`,
        float_double_bonus: (n) => `★ ✖2 BONUS: +${n.toLocaleString()} CRED! ★`,
        float_offline_x3: (n) => `★ OFFLINE ✖2: +${n.toLocaleString()} CRED AND +1 💎! ★`,
        float_offline: (n) => `OFFLINE: +${n.toLocaleString()} CRED!`,
        float_fuse_success: (rarity, name) => `★ QUANTUM FUSION SUCCESS: ${rarity.toUpperCase()} [${name}]! ★`,
        float_fuse_fail: 'FUSION FAILED: 2 MODULES LOST',
        float_fuse_boost: '⚡ FUSION BOOST +25% ACTIVATED! ⚡',
        float_reset: 'PROGRESS RESET!',
        float_crystal: '+1 💎 RARE CRYSTAL!',
        float_crystal_alert: '💎 RARE CRYSTAL FOUND IN SPACE! (+1 💎)',

        // --- Flight Alerts ---
        alert_ring_intercept: '⚡ INDUCTION BOOST: +15%',
        alert_ring_combo: (n, pct) => `⚡ INDUCTION BOOST ✖${n} (+${pct}%)`,
        alert_sonic_1: '💥 SOUND BARRIER: MACH 1.0',
        alert_sonic_2: '⚡ HYPERSONIC: MACH 3.0+',
        alert_encounter: (name) => `🛰️ DETECTED: ${name}`,
        alert_anomaly_solar: '⚡ ANOMALY: SOLAR WIND (INCOME ✖2.0)',
        alert_anomaly_ion: '⚡ ION STREAM: +20% HEIGHT!',
        alert_apogee: (m) => `📍 APOGEE: ${m.toLocaleString()}m`,
        alert_milestone: (m, reward, word) => `★ MILESTONE ${m.toLocaleString()}m! +${reward} ${word} 💎`,
        crystal_word: (n) => n === 1 ? 'CRYSTAL' : 'CRYSTALS',

        // --- Visor ---
        visor_accelerating: 'CHARGING',
        visor_dive_accel: '▼▼ THRUST',
        visor_apex_label: (m) => `📍 APOGEE: ${m.toLocaleString()}m`,

        // --- Offline Time Format ---
        offline_absence: (h, m) => `ABSENCE: ${h}h ${m}m`,

        // --- Rebirth fill bar ---
        rebirth_bar_label: 'CRED',

        // --- Pet Level Tag ---
        pet_lvl: (n) => `LVL. ${n}`,

        // --- Sort / filter ---
        fusion_available: (fromName, toName, pct) => `AVAILABLE: 3 ${fromName.toUpperCase()} ➔ 1 ${toName.toUpperCase()} (${pct}% SUCCESS)`,
        fusion_need: 'NEED 3 DRONES OF THE SAME TIER',

        // --- Extra dynamic keys ---
        alert_crystal_collected: '💎 RARE CRYSTAL FOUND IN SPACE! (+1 💎)',
        alert_mach1: '💥 SOUND BARRIER: MACH 1.0',
        alert_hypersonic: '⚡ HYPERSONIC: MACH 3.0+',
        alert_landmark_prefix: '🛰️ DETECTED',
        alert_encounter_double: '👥 ENCOUNTER: REWARD (✖x2.0)',
        alert_encounter_bonus: '⚡ COMPANION NEARBY: +20% INCOME!',
        alert_apogee: '📍 APOGEE:',
        alert_milestone_prefix: '★ MILESTONE',
        alert_anomaly: '⚡ ANOMALY: SOLAR WIND (INCOME ✖2.0)',
        alert_dive: '▼ FAST DESCENT ▼',
        visor_launch: '▼▼ THRUST',
        visor_apogee_prefix: '📍 APOGEE:',
        visor_descent_label: 'DESCENT: FINAL',
        charge_peak: 'PEAK!',
        to_coins: 'to coins',
        to_thrust: 'to thrust ⚡',
        no_drone_label: 'No drone',
        btn_pet_equip_action: 'EQUIP',
        btn_pet_unequip: 'UNEQUIP',
        pet_lvl_label: 'LVL.',
        skin_badge_unlocked: 'AVAILABLE',
        btn_skin_buy_crystals: 'BUY FOR {n} 💎',
        h_short: 'h',
        m_short: 'm',
        offline_absence_label: 'ABSENCE',
        scanner_status_lock: 'SIGNAL LOCKED!',
        scanner_lock_tag_lock: 'LOCKED',
        fusion_failed: 'FUSION FAILED: 2 MODULES LOST',
        anomaly_solar_name: 'SOLAR WIND',
        anomaly_ion_name: 'ION STREAM',
        scanner_need_rubies: 'NEED 2 CRYSTALS 💎',
        hall_no_records: 'NO RECORDS YET. MAKE YOUR FIRST JUMP!',
        interstitial_title: 'INTERSTITIAL AD',
        rewarded_title: 'REWARDED AD',
        crystal_word_single: 'CRYSTAL',
        crystal_word_few: 'CRYSTALS',
        crystal_word_many: 'CRYSTALS',
        landmark_probe: 'TETRA-PROBE',
        landmark_glider: 'STRATO-GLIDER',
        landmark_relay: 'BEACON RELAY SAT',
        landmark_citadel: 'SPACE CITADEL',
        landmark_astronaut: 'DRIFTING ASTRONAUT',
        landmark_roadster: 'ORBITAL ROADSTER',
        landmark_ufo: 'QUANTUM UFO',
        landmark_probe_sub: 'METEO-PROBE // 5,000m',
        landmark_glider_sub: 'STRATO-DRONE // 45,000m',
        landmark_relay_sub: 'ORBITAL RELAY // 350,000m',
        landmark_citadel_sub: 'SPACE CITADEL // 1,800,000m',
        landmark_astronaut_sub: 'LOST PILOT // 5,200,000m',
        landmark_roadster_sub: 'STAR ROADSTER // 9,800,000m',
        landmark_ufo_sub: 'ANOMALOUS OBJECT // 14,500,000m',
        hud_pwr: 'PWR',
        hud_flow: 'FLOW',
        fusion_tier_common: 'Common',
        fusion_tier_rare: 'Rare',
        fusion_tier_epic: 'Epic',
        fusion_tier_legendary: 'Legendary',
        fusion_tier_mythic: 'Mythic',
    },

    ru: {
        // --- Splash Screen ---
        splash_subtitle: '// ПОЛИГОН ВЫСОТНЫХ ПРЫЖКОВ //',
        splash_loading: '> ЗАГРУЗКА ЯДРА...',
        splash_ready: '> СИСТЕМА ГОТОВА',

        // --- Top HUD ---
        hud_center: 'ПОЛИГОН // СЕКТОР-01',
        hud_cryst: 'КРИСТ',

        // --- Desktop Sidebar ---
        flank_tag_left: '[ СЕКТОР // ТЕСТ-01 ]',
        flank_title_left: 'ПОЛИГОН ПРЫЖКОВ',
        flank_status_label: 'СТАТУС:',
        flank_status_val: 'ГОТОВ К ЗАПУСКУ',
        alt_0: '0m // СТАРТ',
        alt_1000: '1 000m // МЕЗО',
        alt_3000: '3 000m // КАРМАН',
        alt_10000: '10 000m // ОРБИТА',
        alt_25000: '25 000m // ЭКЗО',
        alt_50000: '50 000m // АСТЕРОИДЫ',
        alt_100000: '100 000m // ЭФИР',
        alt_250000: '250 000m+ // ВАКУУМ',

        // --- Right Sidebar Hotkeys ---
        flank_tag_right: '[ УПРАВЛЕНИЕ // ПК ]',
        flank_title_right: 'КЛАВИШИ',
        hotkey_space: 'ТАП / ПИКИРОВАНИЕ',
        hotkey_1: 'ПРОКАЧКА',
        hotkey_2: 'ДРОНЫ',
        hotkey_3: 'ПЕРЕРОЖДЕНИЕ',
        hotkey_4: 'СКИНИ',
        hotkey_5: 'РЕКОРДЫ',
        hotkey_f: 'ПОЛНЫЙ ЭКРАН',
        hotkey_o: 'НАСТРОЙКИ',
        hotkey_m: 'ЗВУК ВКЛ/ВЫКЛ',
        hotkey_esc: 'ЗАКРЫТЬ ОКНА',

        // --- Idle Prompt ---
        prompt_title: 'ТАПАЙТЕ ПО ЭКРАНУ',
        prompt_sub: 'Быстрые тапы разгоняют силу и множитель прыжка',
        turbo_badge: '⚡ ТУРБО-СТАРТ ✖2.50',
        turbo_ad_tag: 'РЕКЛАМА 📺',
        turbo_active: '⚡ ФОРСАЖ АКТИВЕН!',
        turbo_ready: 'ГОТОВ',

        // --- Charging HUD ---
        charge_mult_label: 'МНОЖИТЕЛЬ',
        charge_energy_label: 'ЭНЕРГИЯ',
        charge_action: '🔥 ТАПАЙТЕ БЫСТРЕЕ! 🔥',
        charge_rising: 'РАЗГОН',
        charge_falling: 'ПАДАЕТ!',

        // --- Landing Double Banner ---
        landing_tag: 'ПРИЗЕМЛЕНИЕ:',
        double_main: 'УДВОИТЬ ✖2',
        double_ad: 'РЕКЛАМА 📺',

        // --- Altitude Visor ---
        visor_tag: 'ВЫСОТОМЕР',
        visor_sub_default: 'СТРАТОСФЕРА',
        visor_ascent: 'РАЗГОН К ВЕРШИНЕ',
        visor_apex_tap: 'ТАП: ПОСАДКА ▼',
        visor_dive: 'ПИКИРОВАНИЕ!',

        // --- Bottom Nav ---
        nav_upgrades: 'ПРОКАЧКА',
        nav_drones: 'ДРОНЫ',
        nav_skins: 'СКИНЫ',
        nav_records: 'РЕКОРДЫ',
        nav_rebirth: 'ПЕРЕРОЖДЕНИЕ',

        // --- Upgrades Modal ---
        upgrades_code: 'ПРОКАЧКА ПЕРСОНАЖА',
        upgrades_title: 'УЛУЧШЕНИЯ',
        upg_power_name: 'СИЛА ПРЫЖКА',
        upg_power_desc: 'Базовая сила отталкивания за каждый тап',
        upg_power_prefix: 'СИЛА:',
        upg_speed_name: 'ВРЕМЯ РАЗГОНА',
        upg_speed_desc: 'Сколько секунд можно тапать и рост множителя',
        upg_speed_prefix: 'ВРЕМЯ:',
        upg_aero_name: 'АЭРОДИНАМИКА',
        upg_aero_desc: 'Снижает сопротивление воздуха (+8% к высоте за уровень)',
        upg_aero_prefix: 'ОБТЕКАТЕЛЬ:',
        upg_crit_name: 'КРИТИЧЕСКИЙ ТАП',
        upg_crit_desc: 'Шанс выбить критический импульс (+0.25x за тап)',
        upg_crit_prefix: 'ШАНС КРИТА:',
        btn_upgrade: 'УЛУЧШИТЬ',

        // --- Pets / Drones Modal ---
        pets_code: 'СПУТНИКИ И ПОМОЩНИКИ',
        pets_title: 'ДРОНЫ В ПОЛЁТЕ',
        pet_tab_hangar: 'АНГАР',
        pet_tab_scanner: 'ПОИСК',
        pet_tab_fusion: 'СИНТЕЗ',
        pet_hangar_label: 'ДРОНЫ В АНГАРЕ',
        pet_sort_rarity: 'РЕДКОСТЬ ▼',
        pet_sort_level: 'УРОВЕНЬ ▼',
        btn_find: '+ НАЙТИ',
        sel_pet_default_name: 'Гексагон',
        sel_pet_default_rarity: 'Обычный',
        sel_pet_default_lvl: 'УР. 1',
        sel_pet_default_mult: '✖ 1.0 к монетам',
        sel_pet_default_energy: '+2 к тяге ⚡',
        sel_pet_default_desc: 'Базовый дрон. Дает начальную тягу к прыжку.',
        btn_equip: 'НАДЕТЬ В ПОЛЁТ',
        btn_unequip: 'СНЯТЬ С ПОЛЁТА',
        badge_equipped: '✓ НАДЕТ',

        // Scanner Tab
        scanner_hero_title: 'ОРБИТАЛЬНЫЙ СКАНЕР',
        scanner_hero_sub: 'Сканируйте дальний космос для обнаружения новых спутников',
        btn_scan_crystals: 'ИССЛЕДОВАТЬ СЕКТОР',
        scan_crystals_cost: '2 КРИСТАЛЛА 💎',
        btn_scan_free: 'СКАНИРОВАТЬ 📺',
        scan_free_label: 'БЕСПЛАТНО',
        scanner_chances_title: 'ВЕРОЯТНОСТЬ ОБНАРУЖЕНИЯ МОДУЛЕЙ:',
        chance_common: 'Обычный (Гексагон)',
        chance_rare: 'Редкий (Ромб)',
        chance_epic: 'Эпический (Спутник)',
        chance_legendary: 'Легендарный (Сфера)',
        chance_mythic: 'Мифический (Квазар)',

        // Fusion Tab
        fusion_tag: 'КВАНТОВЫЙ СИНТЕЗ',
        fusion_sub: 'ОБЪЕДИНЕНИЕ 3 ДУБЛИКАТОВ В БОЛЕЕ РЕДКИЙ РАНГ',
        fusion_select: 'ВЫБЕРИТЕ РАНГ ДЛЯ СИНТЕЗА',
        btn_fuse: 'СИНТЕЗИРОВАТЬ (3 ➔ 1)',
        fuse_ad: '⚡ +25% К ШАНСУ ЗА 📺',
        fuse_ad_active: '⚡ +25% БУСТ АКТИВЕН!',
        matrix_title: 'МАТРИЦА СИНТЕЗА:',

        // --- Rebirth Modal ---
        rebirth_code: 'ПЕРЕЗАПУСК ЦИКЛА',
        rebirth_title: 'ПЕРЕРОЖДЕНИЕ',
        rebirth_desc: 'Сбрасывает монеты и базовые улучшения, но навсегда увеличивает весь будущий доход на +100%, дарит редкие КРИСТАЛЛЫ 💎 и сохраняет всех ваших дронов!',
        rebirth_cur_bonus: 'ТЕКУЩИЙ БОНУС:',
        rebirth_next_bonus: 'ПОСЛЕ ПЕРЕРОЖДЕНИЯ:',
        rebirth_need_coins: 'НУЖНО МОНЕТ:',
        btn_rebirth: 'СДЕЛАТЬ ПЕРЕРОЖДЕНИЕ',

        // --- Skins Modal ---
        skins_code: 'ГАРДЕРОБ ПИЛОТА',
        skins_title: 'КОСТЮМЫ И ЭКИПИРОВКА',
        skin_perk_label: 'ЭФФЕКТ:',
        skin_unlock_label: 'УСЛОВИЕ:',
        btn_skin_equip: 'НАДЕТЬ КОСТЮМ',
        skin_badge_equipped: '✓ НАДЕТ',
        skin_badge_available: 'ДОСТУПЕН',
        skin_badge_locked: '🔒 ЗАКРЫТ',
        skin_card_active: 'АКТИВЕН',
        skin_card_open: 'ОТКРЫТ',
        skin_card_closed: 'ЗАКРЫТ',
        btn_skin_buy: 'КУПИТЬ ЗА 💎',
        btn_skin_unlock_ad: 'ОТКРЫТЬ ЗА 📺',
        skin_btn_current: '✓ ТЕКУЩИЙ ЭКИП',
        skin_btn_locked: '🔒 ЗАБЛОКИРОВАН',
        skin_badge_vip: '★ VIP ЭКСКЛЮЗИВ',
        btn_skin_get_vip: 'ОТКРЫТЬ ЧЕРЕЗ VIP (99 ЯН)',

        // --- Scanner Modal ---
        scanner_status_searching: 'ПОИСК СИГНАЛА...',
        scanner_lock_tag_search: '[ ПОИСК ]',
        scanner_lock_tag_found: '[ НАЙДЕНО ]',
        scanner_signal_caught: '>> СИГНАЛ ПОЙМАН! <<',
        scanner_telemetry_1: '> ПОИСК ЧАСТОТЫ...',
        scanner_telemetry_2: '> ПОИСК СИГНАЛА...',
        scanner_telemetry_3: '> СИГНАЛ НАЙДЕН!...',
        scanner_footer: 'РАДАР: ДРОН-СКАНЕР 01',
        scanner_reveal_drone: 'ДРОН',
        scanner_reveal_mult: '💵 к монетам',
        scanner_reveal_energy: '⚡ к тяге',
        btn_scanner_equip: '⚡ СРАЗУ НАДЕТЬ',
        btn_scanner_stash: 'В АНГАР 📦',

        // --- Settings Modal ---
        settings_code: 'ПАРАМЕТРЫ // СИСТЕМА',
        settings_title: 'НАСТРОЙКИ',
        settings_sound_title: 'ЗВУКОВЫЕ ЭФФЕКТЫ',
        settings_sound_sub: 'Щелчки, синтезатор и радарный сканер',
        settings_sound_on: 'ВКЛ',
        settings_sound_off: 'ВЫКЛ',
        settings_sound_label_on: 'ЗВУК: ВКЛЮЧЕН',
        settings_sound_label_off: 'ЗВУК: ВЫКЛЮЧЕН',
        settings_lang_title: 'ЯЗЫК',
        settings_lang_sub: 'Язык интерфейса / Interface language',
        settings_reset_title: 'СБРОС ДАННЫХ',
        settings_reset_sub: 'Полное обнуление монет, кристаллов и дронов',
        btn_reset: 'СБРОСИТЬ ⚠️',
        reset_confirm_title: '⚠️ ПОДТВЕРЖДЕНИЕ СБРОСА',
        reset_confirm_desc: 'Вы уверены? Весь баланс монет, кристаллы, рекорды и найденные дроны будут безвозвратно удалены.',
        btn_confirm_yes: 'ДА, УДАЛИТЬ ВСЁ',
        btn_confirm_no: 'ОТМЕНА',
        settings_vip_title: 'ВИП СТАТУС // YANDEX PASS',
        settings_vip_sub: 'Навсегда без рекламы, ✖2 CRED и Легендарный скин',
        settings_vip_perk_no_ads: 'Полное отключение межстраничной рекламы',
        settings_vip_perk_skin: 'Гипер-Ультра Легендарный скин «Небожитель»',
        settings_vip_perk_mult: 'Постоянный ✖2 множитель CRED и +50% к высоте',
        btn_buy_vip: '★ КУПИТЬ VIP СТАТУС — 99 ЯН ★',
        vip_active_badge: '★ VIP СТАТУС АКТИВЕН ★',
        vip_purchased_alert: '👑 VIP СТАТУС РАЗБЛОКИРОВАН! Добро пожаловать, Небожитель.',

        // --- Offline Income Modal ---
        offline_code: 'ОРБИТАЛЬНАЯ ТЕЛЕМЕТРИЯ // АВТОНОМНЫЙ РЕЖИМ',
        offline_title: 'НАКОПЛЕНИЯ ОФЛАЙН',
        offline_msg: 'Пока вы отсутствовали, ваши автономные модули патрулировали орбиту и собрали ресурсы:',
        btn_triple_label: '★ УДВОИТЬ (✖2) И +1 💎 ★',
        btn_triple_ad: 'РЕКЛАМА 📺',
        btn_claim_reg: 'ЗАБРАТЬ ОБЫЧНУЮ НАГРАДУ',

        // --- Mock Ad Modal ---
        mock_ad_title: 'ТРАНСЛЯЦИЯ СПОНСОРСКОГО СИГНАЛА',
        mock_ad_promo: 'ТЕХНОЛОГИЧЕСКИЙ СЕКТОР // ПОЛИГОН ПРЫЖКОВ',
        mock_ad_sub: 'Ваша награда будет начислена автоматически после завершения трансляции.',
        btn_mock_skip: 'ПРОПУСТИТЬ ТЕСТ ⏩',

        // --- Stats Modal ---
        stats_code: 'ТЕЛЕМЕТРИЯ // ДОСТИЖЕНИЯ',
        stats_title: 'РЕКОРДЫ И СТАТИСТИКА',
        stats_hof_title: '🏆 ЗАЛ СЛАВЫ // ТОП-5 ПРЫЖКОВ',
        stats_career_title: '📊 СТАТИСТИКА КАРЬЕРЫ',
        stat_distance: 'ДИСТАНЦИЯ:',
        stat_jumps: 'ПРЫЖКОВ:',
        stat_max_mult: 'МАКС. МНОЖИТЕЛЬ:',
        stat_drones: 'ДРОНОВ В АНГАРЕ:',
        hof_empty: 'ПОКА НЕТ РЕКОРДОВ. СОВЕРШИТЕ ПЕРВЫЙ ПРЫЖОК!',

        // --- Sector Names (in-flight) ---
        sector_strato: 'СТРАТОСФЕРА',
        sector_meso: 'МЕЗОСФЕРА',
        sector_karman: 'ЛИНИЯ КАРМАНА',
        sector_orbital: 'ОРБИТАЛЬНЫЙ СЕКТОР',
        sector_exo: 'ЭКЗОСФЕРА',
        sector_deep: 'ДАЛЬНИЙ КОСМОС',
        sector_belt: 'ПОЯС АСТЕРОИДОВ',
        sector_ether: 'МЕЖПЛАНЕТНЫЙ ЭФИР',
        sector_vacuum: 'КВАНТОВЫЙ ВАКУУМ',

        // --- Encounter Landmarks ---
        enc_tetra: 'ЗОНД-ТЕТРАЭДР',
        enc_glider: 'СТРАТО-ГЛАЙДЕР',
        enc_satellite: 'СПУТНИК СВЯЗИ «МАЯК»',
        enc_citadel: 'ОРБИТАЛЬНАЯ ЦИТАДЕЛЬ',
        enc_astronaut: 'ДРЕЙФУЮЩИЙ АСТРОНАВТ',
        enc_roadster: 'ОРБИТАЛЬНЫЙ РОДСТЕР',
        enc_ufo: 'КВАНТОВОЕ НЛО',

        skin_ninja_name: 'Бегун Полигона',
        skin_ninja_title: 'БАЗОВЫЙ КОСТЮМ',
        skin_ninja_desc: 'Классический тактический костюм с длинным развевающимся шарфом и белым визором.',
        skin_ninja_perk: 'Стандартная аэродинамика.',
        skin_ninja_unlock: 'Доступен сразу',
        skin_zombie_name: 'Кибер-Зомби',
        skin_zombie_title: 'РЕАНИМИРОВАННЫЙ',
        skin_zombie_desc: 'Экспериментальный биокиборг с обнаженными микросхемами, разорванным костюмом и кибер-глазом.',
        skin_zombie_perk: '+10% к удержанию множителя разгона.',
        skin_zombie_unlock: 'Перерождение (Ранг #1+) или 15 💎',
        skin_cyborg_name: 'Хром-Киборг MK-II',
        skin_cyborg_title: 'ТИТАНОВЫЙ СПЛАВ',
        skin_cyborg_desc: 'Инвертированная хромированная титановая броня с двойным сенсорным визором и сервоприводами.',
        skin_cyborg_perk: '+5% к высоте полета.',
        skin_cyborg_unlock: 'Высота 25 000m или Перерождение #2+ (или 25 💎)',
        skin_astro_name: 'Орбитальный Космонавт',
        skin_astro_title: 'ВАКУУМНЫЙ СКАФАНДР',
        skin_astro_desc: 'Тяжелый гермошлем с золотым забралом, кислородным ранцем и реактивными маневровыми соплами.',
        skin_astro_perk: '+10% к CRED за полет.',
        skin_astro_unlock: 'Высота 100 000m (или 40 💎)',
        skin_phantom_name: 'Квантовый Фантом',
        skin_phantom_title: 'ПЛАЗМЕННАЯ СУЩНОСТЬ',
        skin_phantom_desc: 'Чистая кинетическая энергия в форме силуэта с пульсирующим мерцанием и силовым полем.',
        skin_phantom_perk: 'Усиленная ударная волна апогея.',
        skin_phantom_unlock: 'Высота 500 000m или Перерождение #3+ (или 75 💎)',
        skin_aviator_name: 'Ретро-Авиатор',
        skin_aviator_title: 'ВИНТАЖНЫЙ ПОЛЕТ',
        skin_aviator_desc: 'Стимпанк-шлем пилота с медными очками, белым ветровым шарфом и механическим микропропеллером.',
        skin_aviator_perk: '+15% к CRED при приземлении.',
        skin_aviator_unlock: 'Посмотреть 1 рекламу 📺',
        skin_shaman_name: 'Кибер-Шаман',
        skin_shaman_title: 'НЕОНОВЫЙ ДРУИД',
        skin_shaman_desc: 'Рогатый сенсорный венец, ритуальный нано-плащ с кибер-рунами и 3 вращающиеся плазменные сферы.',
        skin_shaman_perk: '+20% к скорости зарядки кольцевого буста.',
        skin_shaman_unlock: 'Посмотреть 1 рекламу 📺',
        skin_samurai_name: 'Самурай Пустоты',
        skin_samurai_title: 'КИБЕР-КЛИНОК',
        skin_samurai_desc: 'Коническая шляпа аса с оптическими кабелями, две энерго-катаны за спиной и хаори из нановолокна.',
        skin_samurai_perk: '+15% к пиковой высоте полета.',
        skin_samurai_unlock: 'Высота 1 000 000m (или 60 💎)',
        skin_titan_name: 'Меха-Титан MK-IV',
        skin_titan_title: 'ТЯЖЕЛЫЙ ЭКЗОСКЕЛЕТ',
        skin_titan_desc: 'Усиленная композитная броня, массивные наплечники, прицельный визор и плазменные сопла тяги.',
        skin_titan_perk: '+25% к сохранению энергии стартовой тяги.',
        skin_titan_unlock: 'Высота 5 000 000m или Перерождение #5+ (или 100 💎)',
        skin_celestial_name: 'Небожитель-Демиург',
        skin_celestial_title: 'ГИПЕР УЛЬТРА ЛЕГЕНДАРНЫЙ',
        skin_celestial_desc: 'Священный солнечный венец, сияющие фотонные крылья и сингулярный реактор небесного света.',
        skin_celestial_perk: '+50% к высоте, ✖2 CRED, +30% импульса, +25% от колец.',
        skin_celestial_unlock: 'Открывается за просмотр рекламы',

        // --- Pet Catalog ---
        pet_common_name: 'Гексагон',
        pet_common_rarity: 'Обычный',
        pet_common_desc: 'Базовый дрон. Дает начальную тягу к прыжку.',
        pet_rare_name: 'Ромб',
        pet_rare_rarity: 'Редкий',
        pet_rare_desc: 'Редкий модуль. Умножает доход за прыжок на +25% и дает +5 тяги.',
        pet_epic_name: 'Квазар',
        pet_epic_rarity: 'Эпический',
        pet_epic_desc: 'Эпический модуль! Доход +50% и мощная тяга +12!',
        pet_legendary_name: 'Сфера',
        pet_legendary_rarity: 'Легендарный',
        pet_legendary_desc: 'Легендарный модуль! Доход ✖ 2.00 и сверх-тяга +25!',
        pet_mythic_name: 'Сингуляр',
        pet_mythic_rarity: 'Мифический',
        pet_mythic_desc: 'Мифический модуль! Доход ✖ 3.00 и квантовая тяга +50!',
        pet_default_rarity: 'Обычный',
        pet_no_drone: 'Без дрона',
        pet_upgrade_cost_label: 'ТРЕБУЕТСЯ',

        // Fusion tiers
        tier_common: 'Обычных',
        tier_rare_from: 'Редких',
        tier_epic_from: 'Эпических',
        tier_legendary_from: 'Легендарных',
        tier_rare_to: 'Редкий',
        tier_epic_to: 'Эпический',
        tier_legendary_to: 'Легендарный',
        tier_mythic_to: 'Мифический',

        // --- Floating Texts ---
        float_crit: '⚡ КРИТ! +0.25x ⚡',
        float_turbo_charged: '⚡ ТУРБО-ФОРСАЖ: ✖ 2.50! ⚡',
        float_turbo_ready: '⚡ ТУРБО-ФОРСАЖ ЗАРЯЖЕН! ⚡',
        float_dive: '▼ БЫСТРЫЙ СПУСК ▼',
        float_rebirth: (count, crystals) => `ПЕРЕРОЖДЕНИЕ #${count}! +100% ДОХОД И +${crystals} 💎!`,
        float_skin_equipped: (name) => `КОСТЮМ НАДЕТ: ${name}!`,
        float_skin_new: (name) => `🔓 НОВЫЙ КОСТЮМ: ${name}!`,
        float_skin_unlocked: (name) => `РАЗБЛОКИРОВАН: ${name}!`,
        float_skin_need_gems: (n) => `ТРЕБУЕТСЯ ${n} 💎!`,
        float_need_cred: (cost) => `ТРЕБУЕТСЯ ${cost.toLocaleString()} CRED`,
        float_need_crystals: 'ТРЕБУЕТСЯ 2 КРИСТАЛЛА 💎',
        float_scan_cooldown: (m, s) => `СКАНИРОВАНИЕ ДОСТУПНО ЧЕРЕЗ ${m}:${s}`,
        float_new_module: (rarity, icon, name) => `НОВЫЙ МОДУЛЬ: [${rarity}] ${icon} ${name}!`,
        float_no_delete: 'НЕЛЬЗЯ УДАЛИТЬ ПОСЛЕДНИЙ МОДУЛЬ!',
        float_pet_need_cred: (cost) => `ТРЕБУЕТСЯ ${cost.toLocaleString('ru-RU')} CRED`,
        float_new_record: (m) => `НОВЫЙ РЕКОРД: ${m.toLocaleString('ru-RU')}m!`,
        float_double_bonus: (n) => `★ ✖2 БОНУС: +${n.toLocaleString('ru-RU')} CRED! ★`,
        float_offline_x3: (n) => `★ ОФЛАЙН ✖2: +${n.toLocaleString('ru-RU')} CRED И +1 💎! ★`,
        float_offline: (n) => `ОФЛАЙН: +${n.toLocaleString('ru-RU')} CRED!`,
        float_fuse_success: (rarity, name) => `★ КВАНТОВЫЙ СИНТЕЗ УСПЕШЕН: ${rarity.toUpperCase()} [${name}]! ★`,
        float_fuse_fail: 'СИНТЕЗ НЕ УДАЛСЯ: ПОТЕРЯНО 2 МОДУЛЯ',
        float_fuse_boost: '⚡ БУСТ СИНТЕЗА +25% АКТИВИРОВАН! ⚡',
        float_reset: 'ПРОГРЕСС СБРОШЕН!',
        float_crystal: '+1 💎 РЕДКИЙ КРИСТАЛЛ!',
        float_crystal_alert: '💎 НАЙДЕН РЕДКИЙ КРИСТАЛЛ В КОСМОСЕ! (+1 💎)',

        // --- Flight Alerts ---
        alert_ring_intercept: '⚡ ИНДУКЦИОННЫЙ РАЗГОН: +15%',
        alert_ring_combo: (n, pct) => `⚡ ИНДУКЦИОННЫЙ РАЗГОН ✖${n} (+${pct}%)`,
        alert_sonic_1: '💥 ЗВУКОВОЙ БАРЬЕР: MACH 1.0',
        alert_sonic_2: '⚡ ГИПЕРЗВУК: MACH 3.0+',
        alert_encounter: (name) => `🛰️ ОБНАРУЖЕНО: ${name}`,
        alert_anomaly_solar: '⚡ АНОМАЛИЯ: СОЛНЕЧНЫЙ ВЕТЕР (ДОХОД ✖2.0)',
        alert_anomaly_ion: '⚡ ИОННЫЙ ПОТОК: +20% К ВЫСОТЕ!',
        alert_apogee: (m) => `📍 АПОГЕЙ: ${m.toLocaleString('ru-RU')}m`,
        alert_milestone: (m, reward, word) => `★ РУБЕЖ ${m.toLocaleString('ru-RU')}m! +${reward} ${word} 💎`,
        crystal_word: (n) => n === 1 ? 'КРИСТАЛЛ' : (n < 5 ? 'КРИСТАЛЛА' : 'КРИСТАЛЛОВ'),

        // --- Visor ---
        visor_accelerating: 'РАЗГОН',
        visor_dive_accel: '▼▼ ФОРСАЖ',
        visor_apex_label: (m) => `📍 АПОГЕЙ: ${m.toLocaleString('ru-RU')}m`,

        // --- Offline Time Format ---
        offline_absence: (h, m) => `ОТСУТСТВИЕ: ${h}ч ${m}м`,

        // --- Rebirth fill bar ---
        rebirth_bar_label: 'CRED',

        // --- Pet Level Tag ---
        pet_lvl: (n) => `УР. ${n}`,

        // --- Sort / filter ---
        fusion_available: (fromName, toName, pct) => `ДОСТУПНО: 3 ${fromName.toUpperCase()} ➔ 1 ${toName.toUpperCase()} (${pct}% УСПЕХА)`,
        fusion_need: 'ТРЕБУЕТСЯ 3 ДРОНА ОДИНАКОВОГО РАНГА',

        // --- Extra dynamic keys ---
        alert_crystal_collected: '💎 НАЙДЕН РЕДКИЙ КРИСТАЛЛ В КОСМОСЕ! (+1 💎)',
        alert_mach1: '💥 ЗВУКОВОЙ БАРЬЕР: MACH 1.0',
        alert_hypersonic: '⚡ ГИПЕРЗВУК: MACH 3.0+',
        alert_landmark_prefix: '🛰️ ОБНАРУЖЕНО',
        alert_encounter_double: '👥 ВСТРЕЧА: НАГРАДА (✖x2.0)',
        alert_encounter_bonus: '⚡ КТО-ТО РЯДОМ: +20% К ДОХОДУ!',
        alert_apogee: '📍 АПОГЕЙ:',
        alert_milestone_prefix: '★ РУБЕЖ',
        alert_anomaly: '⚡ АНОМАЛИЯ: СОЛНЕЧНЫЙ ВЕТЕР (ДОХОД ✖2.0)',
        alert_dive: '▼ БЫСТРЫЙ СПУСК ▼',
        visor_launch: '▼▼ ФОРСАЖ',
        visor_apogee_prefix: '📍 АПОГЕЙ:',
        visor_descent_label: 'СНИЖЕНИЕ: ФИНАЛ',
        charge_peak: 'ПИК!',
        to_coins: 'к монетам',
        to_thrust: 'к тяге ⚡',
        no_drone_label: 'Без дрона',
        btn_pet_equip_action: 'НАДЕТЬ В ПОЛЁТ',
        btn_pet_unequip: 'СНЯТЬ С ПОЛЁТА',
        pet_lvl_label: 'УР.',
        skin_badge_unlocked: 'ДОСТУПЕН',
        btn_skin_buy_crystals: 'КУПИТЬ ЗА {n} 💎',
        h_short: 'ч',
        m_short: 'м',
        offline_absence_label: 'ОТСУТСТВИЕ',
        scanner_status_lock: 'СИГНАЛ ПОЙМАН!',
        scanner_lock_tag_lock: 'ЗАХВАТ',
        fusion_failed: 'СИНТЕЗ НЕ УДАЛСЯ: ПОТЕРЯНО 2 МОДУЛЯ',
        anomaly_solar_name: 'СОЛНЕЧНЫЙ ВЕТЕР',
        anomaly_ion_name: 'ИОННЫЙ ПОТОК',
        scanner_need_rubies: 'ТРЕБУЕТСЯ 2 КРИСТАЛЛА 💎',
        hall_no_records: 'ПОКА НЕТ РЕКОРДОВ. СОВЕРШИТЕ ПЕРВЫЙ ПРЫЖОК!',
        interstitial_title: 'МЕЖСТРАНИЧНАЯ РЕКЛАМА',
        rewarded_title: 'НАГРАДА ЗА ПРОСМОТР',
        crystal_word_single: 'КРИСТАЛЛ',
        crystal_word_few: 'КРИСТАЛЛА',
        crystal_word_many: 'КРИСТАЛЛОВ',
        landmark_probe: 'ЗОНД-ТЕТРАЭДР',
        landmark_glider: 'СТРАТО-ГЛАЙДЕР',
        landmark_relay: 'СПУТНИК СВЯЗИ «МАЯК»',
        landmark_citadel: 'ОРБИТАЛЬНАЯ ЦИТАДЕЛЬ',
        landmark_astronaut: 'ДРЕЙФУЮЩИЙ АСТРОНАВТ',
        landmark_roadster: 'ОРБИТАЛЬНЫЙ РОДСТЕР',
        landmark_ufo: 'КВАНТОВОЕ НЛО',
        landmark_probe_sub: 'МЕТЕО-ЗОНД // 5 000m',
        landmark_glider_sub: 'СТРАТО-ДРОН // 45 000m',
        landmark_relay_sub: 'ОРБИТАЛЬНЫЙ РЕЛЕ // 350 000m',
        landmark_citadel_sub: 'КОСМИЧЕСКАЯ ЦИТАДЕЛЬ // 1 800 000m',
        landmark_astronaut_sub: 'ПОТЕРЯННЫЙ ПИЛОТ // 5 200 000m',
        landmark_roadster_sub: 'ЗВЕЗДНЫЙ РОДСТЕР // 9 800 000m',
        landmark_ufo_sub: 'АНОМАЛЬНЫЙ ОБЪЕКТ // 14 500 000m',
        hud_pwr: 'PWR',
        hud_flow: 'FLOW',
        fusion_tier_common: 'Обычных',
        fusion_tier_rare: 'Редких',
        fusion_tier_epic: 'Эпических',
        fusion_tier_legendary: 'Легендарных',
        fusion_tier_mythic: 'Мифических',
    }
};

// Global active language — initialized from localStorage or default 'en'
window.currentLang = (function() {
    try {
        return localStorage.getItem('tapjump_lang') || 'en';
    } catch(e) {
        return 'en';
    }
})();

window.LOCALES = LOCALES;

// Translation helper: t(key) returns localized string
window.t = function(key, ...args) {
    const loc = LOCALES[window.currentLang] || LOCALES['en'];
    const val = loc[key];
    if (val === undefined) {
        // fallback to English
        const enVal = LOCALES['en'][key];
        if (enVal === undefined) return key;
        return typeof enVal === 'function' ? enVal(...args) : enVal;
    }
    return typeof val === 'function' ? val(...args) : val;
};

// Set language and persist it
window.setLang = function(lang) {
    if (!LOCALES[lang]) return;
    window.currentLang = lang;
    try {
        localStorage.setItem('tapjump_lang', lang);
    } catch(e) {}

    // Update html lang attribute
    const htmlEl = document.getElementById('html-root');
    if (htmlEl) htmlEl.lang = lang;

    // Update active class on lang buttons
    document.querySelectorAll('.btn-lang').forEach(btn => {
        btn.classList.toggle('active', btn.id === `btn-lang-${lang}`);
    });

    // Apply all static i18n elements
    window.applyStaticI18n();

    // Notify the game to re-render all text
    if (window.game && typeof window.game.applyLocale === 'function') {
        window.game.applyLocale();
    }
};

// Apply static data-i18n attributes to DOM elements
window.applyStaticI18n = function() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = window.t(key);
        if (text && text !== key) {
            el.innerText = text;
        }
    });
};

// On DOM load, apply saved lang to button states
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = window.currentLang || 'en';
    const htmlEl = document.getElementById('html-root');
    if (htmlEl) htmlEl.lang = savedLang;
    document.querySelectorAll('.btn-lang').forEach(btn => {
        btn.classList.toggle('active', btn.id === `btn-lang-${savedLang}`);
    });
    // Apply static translations on first load
    window.applyStaticI18n();
});

