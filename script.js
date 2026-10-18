// ===== ВЕРСИЯ =====
const GAME_VERSION = "13.9";
const ADMIN_PASSWORD = "6769";
let ysdk = null;

// Ссылки на файлы
const UPDATE_CHECK_URL = "https://dimakolmakov41-source.github.io/neural-game676767/update.json";
const CLOSE_CHECK_URL = "https://dimakolmakov41-source.github.io/neural-game676767/close.json";
const NEWS_URL = "https://dimakolmakov41-source.github.io/neural-game676767/news.json";
const EVENT_URL = "https://dimakolmakov41-source.github.io/neural-game676767/event.json";
const SALE_URL = "https://dimakolmakov41-source.github.io/neural-game676767/sale.json";
const ROULETTE_COST_URL = "https://dimakolmakov41-source.github.io/neural-game676767/roulette_cost.json";
const AUTOCLICKER_URL = "https://dimakolmakov41-source.github.io/neural-game676767/autoclicker.json";
const THEME_URL = "https://dimakolmakov41-source.github.io/neural-game676767/theme.json";
const WEATHER_URL = "https://dimakolmakov41-source.github.io/neural-game676767/weather.json";
const PHRASES_URL = "https://dimakolmakov41-source.github.io/neural-game676767/phrases.json";
const TICKER_URL = "https://dimakolmakov41-source.github.io/neural-game676767/ticker.json";
const STARS_CHANCE_URL = "https://dimakolmakov41-source.github.io/neural-game676767/stars_chance.json";

// Глобальные переменные для JSON
let globalEventMultiplier = 1;
let saleData = { active: false, discount_percent: 0 };
let rouletteCost = 50;
let autoclickerRateBonus = 0;
let customTheme = "normal";
let weatherData = { active: false, type: "none" };
let phrasesData = { sleep: "😴 Спишь?", combo: "🔥 x2 КОМБО!", crit: "💥 КРИТИЧЕСКИЙ КЛИК! x10!" };
let tickerData = { active: false, text: "" };
let starsData = { chance: 0.001, amount: 3 };

// ===== ЯЗЫК =====
const TRANSLATIONS = {
    ru: {
        loading: "ЗАГРУЗКА...", title: "🧠 КЛИКЕР: ЭВОЛЮЦИЯ НЕЙРОСЕТЕЙ",
        play: "🎮 ИГРАТЬ", settings: "⚙️ НАСТРОЙКИ", news: "📢 НОВОСТИ", share: "📤 ПОДЕЛИТЬСЯ",
        min: "мин", stat_total_clicks: "Всего кликов", stat_neurons: "Нейросетей", stat_session: "За сессию",
        reload: "🔄 ПЕРЕЗАГРУЗКА:", sleep: "😴 Спишь?", combo: "🔥 x2 КОМБО!",
        boost: "⚡ БУСТ X5 — 20⭐", boost_active: "⚡ X5 АКТИВЕН —",
        open_tasks: "📋 ОТКРЫТЬ ЗАДАНИЯ", shop_neurons: "🧠 НЕЙРОСЕТИ", shop_stars: "⭐ ЗВЁЗДЫ", shop_skins: "💎 СКИНЫ", shop_helpers: "👷 ПОМОЩНИКИ",
        buy_all: "💰 КУПИТЬ ВСЁ ДОСТУПНОЕ", close: "ЗАКРЫТЬ", back_menu: "◀ МЕНЮ", shop: "🛒 МАГАЗИН",
        autosave: "💾 автосохранение", yes: "Да", no: "Нет", ok: "ПОНЯЛ",
        robot1: ": Привет я робот !<br>Я вижу ты тут впервые ?", robot2: ": Нажми на мозг !",
        tutorial_text: "Потом пролистай вниз и нажми<br>магазин , потом купи любую<br>нейросеть (нажми на неё)",
        conv1: "Ваши алмазы конвертированы в звёзды", conv2: "Алмазы полностью удалены",
        settings_title: "⚙️ НАСТРОЙКИ", btn_color: "🎨 Цвет кнопок",
        save_progress: "💾 Сохранить прогресс", download_json: "Скачать JSON",
        load_progress: "📂 Загрузить прогресс", choose_file: "Выбрать файл",
        promo: "🎫 Промокоды", open: "Открыть", sound: "🔊 Звук клика", sound_toggle: "Сменить",
        fullscreen: "⛶ Полный экран", on: "Включить", off: "Выключить",
        language: "🌐 Язык / Language", reset_all: "⚠️ СБРОСИТЬ ВСЁ",
        promo_title: "🎫 ПРОМОКОД", activate: "АКТИВИРОВАТЬ", news_title: "📢 НОВОСТИ", news_text: "Загрузка...",
        pass_no_active: "✨ НЕТ АКТИВНОГО ПАССА ✨", pass_tasks_title: "ЗАДАНИЯ",
        level: "Уровень", clicks_done: "кликов", done: "✅ ВЫПОЛНЕНО", claim: "ЗАБРАТЬ",
        lock_first: "🔒 Сначала пройди уровень", until_end: "До конца AI Pass",
        days: "дн.", hours: "ч.", minutes: "мин.", pass_finished: "ЗАВЕРШЁН!",
        soon: "скоро", need_stars: "Нужно", need_points: "Нужно",
        bought: "куплена!", not_enough: "❌ Не хватает очков",
        boost_already: "⚡ Буст уже активен", boost_activated: "⚡ БУСТ X5 АКТИВЕН (5 минут)!", boost_ended: "⏳ Буст закончился",
        promo_ok: "✅ Промокод активирован!", promo_bad: "❌ Неверный код",
        star_got: "⭐ ЗВЁЗДЫ! +3", candy_got: "🍬 КОНФЕТЫ! +3", snowflake_got: "❄️ СНЕЖИНКИ! +3",
        triple_click: "⚡ ТРОЙНОЙ КЛИК! x3!", crit_click: "💥 КРИТИЧЕСКИЙ КЛИК! x10!",
        banned: "🌚 Ты забанен на", banned_min: "минут", ban_lifted: "✅ Бан снят.",
        copied: "✅ Скопировано!", saved: "💾 Сохранено!", loaded: "📂 Загружено!", load_error: "❌ Ошибка",
        reload_toast: "Перезагрузка...", bought_count: "Куплено сетей",
        all_neurons: "Все нейросети куплены!", all_passes: "Все AI Pass открыты!",
        god_on: "БОГ ВКЛ", god_off: "БОГ ВЫКЛ", soon_feature: "⏳ Скоро!",
        task_claimed: "Уровень", task_received: "получен!", pass_reward: "Награда AI Pass",
        fact_title: "ФАКТ ДНЯ", roulette_no_stars: "❌ Нужно 50⭐", roulette_win: "🎉 ВЫИГРЫШ",
        roulette_spinning: "🎲 КРУТИТСЯ...", roulette_spin: "🎲 КРУТИТЬ",
        roulette_nothing: "🕳️ ПУСТО!", roulette_jackpot: "🎉 ДЖЕКПОТ!!!",
        first_page: "⏮ НАЧАЛО", last_page: "КОНЕЦ ⏭", prev_page: "⬅️ НАЗАД", next_page: "ВПЕРЁД ➡️",
        prestige: "🌟 ПРЕСТИЖ", prestige_level: "Уровень:", prestige_bonus: "Бонус:", prestige_need: "Нужно:",
        prestige_warning: "⚠️ Сбросятся очки и сети. Звёзды останутся.",
        prestige_yes: "ДА, ПРЕСТИЖ!", prestige_done: "🌟 ПРЕСТИЖ! Уровень",
        prestige_not_enough: "❌ Нужно 100 000 000 🧠", prestige_confirm: "Точно престиж?",
        offline_title: "С ВОЗВРАЩЕНИЕМ!", offline_text: "Пока тебя не было, накапало:", offline_capped: "(макс 8ч)",
        meteor_win: "📢 МЕТЕОРИТ! +", birthday_boost: "🎂 БУСТ X10!", march8_boost: "🌷 БУСТ X15!",
        ghost_win: "👻 ПРИЗРАК! +", spider_win: "🕷️ ПАУК! +3⭐", witch_win: "🧙 ВЕДЬМА! +", web_destroyed: "🕸️ ПАУТИНА РАЗБИТА! +",
        web_progress: "🕸️ Паутина:", web_hint: "Кликни 20 раз чтобы разбить",
        autoclicker: "🤖 АВТОКЛИКЕР — 500⭐", autoclicker_active: "🤖 АВТОКЛИКЕР АКТИВЕН", autoclicker_bought: "✅ Автокликер куплен!", autoclicker_no_stars: "❌ Нужно 500⭐",
        daily_gift: "🎁 ПОДАРОК", daily_gift_got: "🎁 Подарок получен!", daily_gift_already: "⏰ Уже получен сегодня",
        pumpkin_click: "🎃 ТЫКВА! +5⭐", x10_boost: "🧠 БУСТ X10! 5 часов!",
        achievements: "🏆 ДОСТИЖЕНИЯ", ach_unlocked: "🏆 Достижение:", bat_win: "🦇 МЫШЬ! +500🧠",
        admin_wrong_pass: "❌ Неверный пароль!",
        skin_normal: "Обычный", skin_halloween: "Тыква", skin_amethyst: "Аметист",
        skin_mult: "Множитель: ×", skin_free: "Бесплатно", skin_event_free: "Бесплатно (Ивент)", skin_equipped: "✅ Надет", skin_equip: "Одеть", skin_buy: "Купить за ", skin_equipped_toast: "Скин надет!", skin_bought: "куплен!",
        leaderboard_title: "🏅 ТОП ИГРОКОВ", leaderboard_error: "❌ Ошибка лидерборда", leaderboard_no_sdk: "⏳ Только в Яндекс Играх", leaderboard_wait: "⏳ Подожди 5 сек", leaderboard_login_required: "🔑 Войдите в аккаунт!", leaderboard_login_error: "❌ Ошибка входа",
        update_title: "🚨 ОБНОВЛЕНИЕ 🚨", update_text: "Эта версия устарела. Скачайте новую.", closed_title: "🚫 ИГРА ЗАКРЫТА 🚫", closed_text: "Зайдите позже.",
        event_active: "🔥 ГЛОБАЛЬНЫЙ ИВЕНТ!",
        helpers_buy: "Купить", helpers_upgrade: "Прокачать", helpers_level: "Ур.",
        boss_title: "🐛 СЕКРЕТНЫЙ БОСС: БАГ 🐛", boss_hint: "Кликай по багу, чтобы убить его!", boss_killed: "🐛 БАГ УБИТ! Награда:",
        ticker_title: "📢 Объявление"
    },
    en: {
        loading: "LOADING...", title: "🧠 CLICKER: NEURAL EVOLUTION",
        play: "🎮 PLAY", settings: "⚙️ SETTINGS", news: "📢 NEWS", share: "📤 SHARE",
        min: "min", stat_total_clicks: "Total clicks", stat_neurons: "Neurons", stat_session: "Session",
        reload: "🔄 RELOAD:", sleep: "😴 Sleeping?", combo: "🔥 x2 COMBO!",
        boost: "⚡ BOOST X5 — 20⭐", boost_active: "⚡ X5 ACTIVE —",
        open_tasks: "📋 OPEN TASKS", shop_neurons: "🧠 NEURONS", shop_stars: "⭐ STARS", shop_skins: "💎 SKINS", shop_helpers: "👷 HELPERS",
        buy_all: "💰 BUY ALL", close: "CLOSE", back_menu: "◀ MENU", shop: "🛒 SHOP", autosave: "💾 autosave",
        yes: "Yes", no: "No", ok: "GOT IT",
        robot1: ": Hi I'm a robot !<br>I see you're new here?", robot2: ": Tap the brain!",
        tutorial_text: "Then scroll down and tap<br>shop, then buy any<br>neuron (tap it)",
        conv1: "Diamonds converted to stars", conv2: "Diamonds removed",
        settings_title: "⚙️ SETTINGS", btn_color: "🎨 Button color",
        save_progress: "💾 Save progress", download_json: "Download JSON",
        load_progress: "📂 Load progress", choose_file: "Choose file",
        promo: "🎫 Promo codes", open: "Open", sound: "🔊 Sound", sound_toggle: "Change",
        fullscreen: "⛶ Fullscreen", on: "Enable", off: "Disable",
        language: "🌐 Language / Язык", reset_all: "⚠️ RESET ALL",
        promo_title: "🎫 PROMO CODE", activate: "ACTIVATE", news_title: "📢 NEWS", news_text: "Loading...",
        pass_no_active: "✨ NO ACTIVE PASS ✨", pass_tasks_title: "TASKS",
        level: "Level", clicks_done: "clicks", done: "✅ DONE", claim: "CLAIM",
        lock_first: "🔒 Complete level first", until_end: "Until AI Pass",
        days: "d", hours: "h", minutes: "m", pass_finished: "FINISHED!", soon: "soon",
        need_stars: "Need", need_points: "Need", bought: "bought!", not_enough: "❌ Not enough",
        boost_already: "⚡ Boost active", boost_activated: "⚡ X5 ACTIVE!", boost_ended: "⏳ Boost ended",
        promo_ok: "✅ Promo activated!", promo_bad: "❌ Invalid code",
        star_got: "⭐ STARS! +3", candy_got: "🍬 CANDY! +3", snowflake_got: "❄️ SNOWFLAKES! +3",
        triple_click: "⚡ TRIPLE CLICK! x3!", crit_click: "💥 CRITICAL! x10!",
        banned: "🌚 Banned for", banned_min: "min", ban_lifted: "✅ Ban lifted.",
        copied: "✅ Copied!", saved: "💾 Saved!", loaded: "📂 Loaded!", load_error: "❌ Error",
        reload_toast: "Reloading...", bought_count: "Bought",
        all_neurons: "All neurons bought!", all_passes: "All passes opened!",
        god_on: "GOD ON", god_off: "GOD OFF", soon_feature: "⏳ Soon!",
        task_claimed: "Level", task_received: "received!", pass_reward: "AI Pass reward",
        fact_title: "FACT OF THE DAY", roulette_no_stars: "❌ Need 50⭐", roulette_win: "🎉 YOU WON",
        roulette_spinning: "🎲 SPINNING...", roulette_spin: "🎲 SPIN",
        roulette_nothing: "🕳️ NOTHING!", roulette_jackpot: "🎉 JACKPOT!!!",
        first_page: "⏮ FIRST", last_page: "LAST ⏭", prev_page: "⬅️ BACK", next_page: "NEXT ➡️",
        prestige: "🌟 PRESTIGE", prestige_level: "Level:", prestige_bonus: "Bonus:", prestige_need: "Need:",
        prestige_warning: "⚠️ Points and neurons reset. Stars stay.",
        prestige_yes: "YES, PRESTIGE!", prestige_done: "🌟 PRESTIGE! Level",
        prestige_not_enough: "❌ Need 100 000 000 🧠", prestige_confirm: "Confirm prestige?",
        offline_title: "WELCOME BACK!", offline_text: "While you were away, you earned:", offline_capped: "(max 8h)",
        meteor_win: "📢 METEOR! +", birthday_boost: "🎂 BOOST X10!", march8_boost: "🌷 BOOST X15!",
        ghost_win: "👻 GHOST! +", spider_win: "🕷️ SPIDER! +3⭐", witch_win: "🧙 WITCH! +", web_destroyed: "🕸️ WEB DESTROYED! +",
        web_progress: "🕸️ Web:", web_hint: "Click 20 times",
        autoclicker: "🤖 AUTOCLICKER — 500⭐", autoclicker_active: "🤖 AUTOCLICKER ACTIVE", autoclicker_bought: "✅ Autoclicker bought!", autoclicker_no_stars: "❌ Need 500⭐",
        daily_gift: "🎁 GIFT", daily_gift_got: "🎁 Gift received!", daily_gift_already: "⏰ Already got today",
        pumpkin_click: "🎃 PUMPKIN! +5⭐", x10_boost: "🧠 BOOST X10! 5 hours!",
        achievements: "🏆 ACHIEVEMENTS", ach_unlocked: "🏆 Achievement:", bat_win: "🦇 BAT! +500🧠",
        admin_wrong_pass: "❌ Wrong password!",
        skin_normal: "Normal", skin_halloween: "Pumpkin", skin_amethyst: "Amethyst",
        skin_mult: "Multiplier: ×", skin_free: "Free", skin_event_free: "Free (Event)", skin_equipped: "✅ Equipped", skin_equip: "Equip", skin_buy: "Buy for ", skin_equipped_toast: "Skin equipped!", skin_bought: "bought!",
        leaderboard_title: "🏅 TOP PLAYERS", leaderboard_error: "❌ Error", leaderboard_no_sdk: "⏳ Only in Yandex Games", leaderboard_wait: "⏳ Wait 5 sec", leaderboard_login_required: "🔑 Log in!", leaderboard_login_error: "❌ Login error",
        update_title: "🚨 UPDATE 🚨", update_text: "Outdated. Download new version.", closed_title: "🚫 GAME CLOSED 🚫", closed_text: "Check back later.",
        event_active: "🔥 GLOBAL EVENT!",
        helpers_buy: "Buy", helpers_upgrade: "Upgrade", helpers_level: "Lvl.",
        boss_title: "🐛 SECRET BOSS: BUG 🐛", boss_hint: "Click the bug to kill it!", boss_killed: "🐛 BUG KILLED! Reward:",
        ticker_title: "📢 Announcement"
    }
};

let currentLang = localStorage.getItem('gameLang') || 'ru';
function t(key) {
    return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || TRANSLATIONS.ru[key] || key;
}

function formatNumber(num) {
    if (num >= 1e21) return (num / 1e21).toFixed(2) + 'Sx';
    if (num >= 1e18) return (num / 1e18).toFixed(2) + 'Qi';
    if (num >= 1e15) return (num / 1e15).toFixed(2) + 'Qa';
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9)  return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6)  return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3)  return (num / 1e3).toFixed(2) + 'K';
    return Math.floor(num).toString();
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        el.innerText = t(key);
    });
    const r1 = document.getElementById('robotText1'); if (r1) r1.innerHTML = t('robot1');
    const r2 = document.getElementById('robotText2'); if (r2) r2.innerHTML = t('robot2');
    const tt = document.getElementById('tutorialText'); if (tt) tt.innerHTML = t('tutorial_text');
    
    if (typeof updateBoostUI === 'function') updateBoostUI();
    if (typeof applyPassStyle === 'function') applyPassStyle();
    if (typeof applyTheme === 'function') applyTheme();
    if (typeof updatePassEndTimer === 'function') updatePassEndTimer();
    if (typeof updateAutoClickerUI === 'function') updateAutoClickerUI();
    
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === currentLang));
    document.querySelectorAll('#setLangRu, #setLangEn').forEach(btn => {
        const isRu = btn.id === 'setLangRu';
        btn.classList.toggle('active', (isRu && currentLang === 'ru') || (!isRu && currentLang === 'en'));
    });
}

function setLanguage(lang) {
    if (lang !== 'ru' && lang !== 'en') return;
    currentLang = lang; localStorage.setItem('gameLang', lang); applyTranslations();
    showToast(lang === 'ru' ? "✅ Язык: Русский" : "✅ Language: English");
}

const FACTS = {
    ru: ["Первый перцептрон создан в 1958 году.", "ChatGPT обучался на 570 ГБ текста.", "Мозг содержит около 86 млрд нейронов."],
    en: ["First perceptron created in 1958.", "ChatGPT trained on 570 GB of text.", "Brain has about 86 billion neurons."]
};

function getFactOfDay() {
    const now = new Date(); const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    return FACTS[currentLang][dayOfYear % FACTS[currentLang].length];
}

function checkDailyFact() {
    const today = new Date().toISOString().slice(0, 10);
    if (localStorage.getItem('factShownDate') !== today) {
        localStorage.setItem('factShownDate', today);
        const factText = document.getElementById('factText'); if (factText) factText.innerText = getFactOfDay();
        setTimeout(() => document.getElementById('factOverlay')?.classList.add('show'), 2500);
    }
}

if (localStorage.getItem('gameVersion') !== GAME_VERSION) {
    localStorage.removeItem('neuralEvoSave'); localStorage.removeItem('aiPassSeason'); localStorage.removeItem('banEnd');
    localStorage.setItem('gameVersion', GAME_VERSION);
}

// ===== ИВЕНТЫ И ТЕМЫ =====
function isHalloween() { 
    if (customTheme === 'halloween') return true;
    if (customTheme !== 'normal' && customTheme !== '') return false;
    const n = new Date(); return n.getMonth() === 9 && n.getDate() >= 5 && n.getDate() <= 31; 
}
function isNewYear() { 
    if (customTheme === 'newyear') return true;
    if (customTheme !== 'normal' && customTheme !== '') return false;
    const n = new Date(); return (n.getMonth() === 11 && n.getDate() === 31) || (n.getMonth() === 0 && n.getDate() === 1); 
}
function isHackerMode() { const n = Date.now(); return n >= new Date(2026, 8, 29).getTime() && n <= new Date(2026, 9, 5).getTime(); }
function isBirthday() { const n = new Date(); return n.getMonth() === 2 && n.getDate() === 17; }
function isMarch8() { const n = new Date(); return n.getMonth() === 2 && n.getDate() === 8; }

function applyTheme() {
    const body = document.body; const brain = document.getElementById('clickableObject');
    const brainEmoji = document.getElementById('brainEmoji'); const starLabel = document.getElementById('starLabel');
    const sleepMsg = document.getElementById('sleepMsg'); const reloadTimer = document.getElementById('reloadTimer');
    const title = document.getElementById('gameTitle'); const partyHat = document.getElementById('partyHat');
    const flowerDecor = document.getElementById('flowerDecor'); const brainSpeech = document.getElementById('brainSpeech');

    body.classList.remove('bg-halloween', 'bg-newyear', 'bg-hacker', 'bg-birthday', 'bg-march8');
    body.classList.remove('bg-early-autumn', 'bg-golden', 'bg-rainy', 'bg-late', 'bg-forest', 'bg-park', 'bg-mountains', 'bg-village');
    if (brain) brain.classList.remove('halloween-brain', 'newyear-brain', 'birthday-brain', 'march8-brain');
    
    const oldHat = brain ? brain.querySelector('.santa-hat') : null; if (oldHat) oldHat.remove();
    if (partyHat) partyHat.style.display = 'none';
    if (flowerDecor) flowerDecor.style.display = 'none';
    if (brainSpeech) brainSpeech.style.display = 'none';

    if (isBirthday()) {
        body.classList.add('bg-birthday'); if (brain) brain.classList.add('birthday-brain');
        if (partyHat) partyHat.style.display = 'block';
        if (starLabel) starLabel.innerHTML = '⭐ <span id="stars">' + (window.__stars || 0) + '</span>';
    } else if (isMarch8()) {
        body.classList.add('bg-march8'); if (brain) brain.classList.add('march8-brain');
        if (flowerDecor) flowerDecor.style.display = 'block'; if (brainSpeech) brainSpeech.style.display = 'block';
        if (starLabel) starLabel.innerHTML = '⭐ <span id="stars">' + (window.__stars || 0) + '</span>';
    } else if (isHalloween()) {
        body.classList.add('bg-halloween'); if (brain) brain.classList.add('halloween-brain');
        if (starLabel) starLabel.innerHTML = '🍬 <span id="stars">' + (window.__stars || 0) + '</span>';
    } else if (isNewYear()) {
        body.classList.add('bg-newyear');
        if (brain) {
            brain.classList.add('newyear-brain');
            const hat = document.createElement('span'); hat.className = 'santa-hat'; hat.innerText = '🎅'; brain.appendChild(hat);
        }
        if (starLabel) starLabel.innerHTML = '❄️ <span id="stars">' + (window.__stars || 0) + '</span>';
    } else if (isHackerMode()) {
        body.classList.add('bg-hacker');
        if (starLabel) starLabel.innerHTML = '⭐ <span id="stars">' + (window.__stars || 0) + '</span>';
    } else {
        const savedBg = localStorage.getItem('selectedBg') || 'early_autumn';
        const bgThemes = { early_autumn: "bg-early-autumn", golden: "bg-golden", rainy: "bg-rainy", late: "bg-late", forest: "bg-forest", park: "bg-park", mountains: "bg-mountains", village: "bg-village" };
        body.classList.add(bgThemes[savedBg] || 'bg-early-autumn');
        if (starLabel) starLabel.innerHTML = '⭐ <span id="stars">' + (window.__stars || 0) + '</span>';
    }
    if (sleepMsg) sleepMsg.innerText = phrasesData.sleep || t('sleep');
    if (reloadTimer) reloadTimer.innerHTML = t('reload') + ' <span id="reloadCountdown">5:00</span>';
    if (title) title.innerText = t('title');
    if (typeof applySkin === 'function') applySkin();
}

function applyButtonColor(color) {
    document.body.classList.remove('btn-blue', 'btn-green', 'btn-red', 'btn-purple', 'btn-gold');
    if (color && color !== 'blue') document.body.classList.add('btn-' + color);
    localStorage.setItem('btnColor', color || 'blue');
    document.querySelectorAll('.color-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.color === (color || 'blue')));
}

// ===== ПРОВЕРКИ (ОБНОВЛЕНИЯ, ЗАКРЫТИЕ, JSON) =====
function isNewerVersion(current, latest) {
    const c = current.split('.').map(Number); const l = latest.split('.').map(Number);
    for (let i = 0; i < Math.max(c.length, l.length); i++) {
        const cNum = c[i] || 0; const lNum = l[i] || 0;
        if (lNum > cNum) return true; if (lNum < cNum) return false;
    }
    return false;
}

function checkForUpdates() {
    if (!navigator.onLine) return; 
    fetch(UPDATE_CHECK_URL + "?t=" + Date.now()).then(res => res.json()).then(data => {
        if (data && data.latest_version && isNewerVersion(GAME_VERSION, data.latest_version)) {
            document.getElementById('updateOverlay')?.classList.add('show');
            document.body.style.pointerEvents = "none"; document.getElementById('updateOverlay').style.pointerEvents = "auto";
        }
    }).catch(e => console.log(e));
}

function checkIfClosed() {
    if (!navigator.onLine) return;
    fetch(CLOSE_CHECK_URL + "?t=" + Date.now()).then(res => res.json()).then(data => {
        if (data && data.status === "closed") {
            document.getElementById('closedOverlay')?.classList.add('show');
            document.body.style.pointerEvents = "none"; document.getElementById('closedOverlay').style.pointerEvents = "auto";
        }
    }).catch(e => console.log(e));
}

function fetchAllJSON() {
    if (!navigator.onLine) return;
    
    fetch(NEWS_URL + "?t=" + Date.now()).then(r => r.json()).then(d => {
        if (d.title && d.text) { document.getElementById('newsTitle').innerText = d.title; document.getElementById('newsText').innerText = d.text; }
    }).catch(e => {});

    fetch(EVENT_URL + "?t=" + Date.now()).then(r => r.json()).then(d => {
        if (d && d.active) {
            globalEventMultiplier = d.multiplier || 1;
            const b = document.getElementById('globalEventBanner'), bt = document.getElementById('globalEventText');
            if (b && bt) { bt.innerText = d.message || t('event_active'); b.classList.remove('hidden'); }
            updateUI();
        }
    }).catch(e => {});

    fetch(SALE_URL + "?t=" + Date.now()).then(r => r.json()).then(d => { saleData = d; renderShopNeurons(); }).catch(e => {});
    fetch(ROULETTE_COST_URL + "?t=" + Date.now()).then(r => r.json()).then(d => { if(d.cost !== undefined) { rouletteCost = d.cost; document.getElementById('rouletteCostText').innerText = rouletteCost + "⭐ за вращение"; } }).catch(e => {});
    fetch(AUTOCLICKER_URL + "?t=" + Date.now()).then(r => r.json()).then(d => { if(d.clicks_per_second) autoclickerRateBonus = d.clicks_per_second; }).catch(e => {});
    fetch(THEME_URL + "?t=" + Date.now()).then(r => r.json()).then(d => { if(d.active && d.theme) { customTheme = d.theme; applyTheme(); } }).catch(e => {});
    fetch(WEATHER_URL + "?t=" + Date.now()).then(r => r.json()).then(d => { 
        if(d.active && d.type) { weatherData = d; startWeather(d.type); } 
    }).catch(e => {});
    fetch(PHRASES_URL + "?t=" + Date.now()).then(r => r.json()).then(d => { phrasesData = d; applyTheme(); }).catch(e => {});
    fetch(TICKER_URL + "?t=" + Date.now()).then(r => r.json()).then(d => { 
        if(d.active && d.text) {
            tickerData = d;
            const tc = document.getElementById('tickerContainer'), tt = document.getElementById('tickerText');
            if(tc && tt) { tt.innerText = d.text; tc.classList.remove('hidden'); }
        }
    }).catch(e => {});
    fetch(STARS_CHANCE_URL + "?t=" + Date.now()).then(r => r.json()).then(d => {
        if(d.chance !== undefined) starsData.chance = d.chance;
        if(d.amount !== undefined) starsData.amount = d.amount;
    }).catch(e => {});
}

function startWeather(type) {
    const old = document.getElementById('weatherLayer'); if(old) old.remove();
    if(type === 'none') return;
    const layer = document.createElement('div'); layer.id = 'weatherLayer'; layer.className = 'weather-layer ' + type;
    for(let i=0; i<30; i++) {
        const p = document.createElement('div'); p.className = 'weather-particle';
        if(type === 'snow') p.innerText = '❄️';
        if(type === 'rain') p.innerText = '💧';
        if(type === 'stars') p.innerText = '✨';
        p.style.left = Math.random() * 100 + 'vw';
        p.style.animationDelay = Math.random() * 5 + 's';
        p.style.animationDuration = (Math.random() * 3 + 3) + 's';
        layer.appendChild(p);
    }
    document.body.appendChild(layer);
}

// ===== ОСНОВНАЯ ЛОГИКА =====
window.addEventListener('load', () => {
    setTimeout(checkForUpdates, 2000);
    setTimeout(checkIfClosed, 2000);
    setTimeout(fetchAllJSON, 1500);

    if (typeof YaGames !== 'undefined') {
        YaGames.init().then(_ysdk => {
            ysdk = _ysdk;
            const sdkLang = ysdk.environment.i18n.lang;
            if (sdkLang === 'ru' || sdkLang === 'en') { currentLang = sdkLang; localStorage.setItem('gameLang', currentLang); applyTranslations(); }
            if (ysdk.features && ysdk.features.LoadingAPI) ysdk.features.LoadingAPI.ready();
        }).catch(e => console.error(e));
    }

    setTimeout(() => document.getElementById('loadingScreen')?.classList.add('hidden'), 1500);
    document.getElementById('menuVersion').innerText = `v${GAME_VERSION}`;

    let points = 10, stars = 0, totalClicks = 0, purchasedCount = 1;
    let totalStarsEarned = 0, sessionClicks = 0;
    let godMode = false, comboCounter = 0;
    let gameStartTime = Date.now();
    let playtimeInterval = null, sleepMsgTimer = null, sleepMsgShowing = false;
    let prestigeLevel = 0, lastSaveTime = Date.now();

    const PRESTIGE_REQUIREMENT = 100000000, PRESTIGE_BONUS_PER_LEVEL = 0.1;
    const OFFLINE_MAX_HOURS = 8, OFFLINE_RATE = 0.3;
    const BOOST_MULTIPLIER = 5, BOOST_PRICE = 20, BOOST_DURATION = 5 * 60 * 1000;
    let boostEndTime = 0, boostInterval = null;
    const BIRTHDAY_BOOST_MULT = 10, BIRTHDAY_BOOST_DURATION = (60 * 3600 + 10 * 60 + 10) * 1000; let birthdayBoostEndTime = 0;
    const MARCH8_BOOST_MULT = 15, MARCH8_BOOST_DURATION = 70 * 3600 * 1000; let march8BoostEndTime = 0;
    const X10_BOOST_MULT = 10, X10_BOOST_DURATION = 5 * 3600 * 1000; let x10BoostEndTime = 0;

    const AUTOCLICKER_PRICE = 500;
    let autoclickerLevel = 1, autoclickerBought = false, autoclickerInterval = null;
    
    // Помощники
    let helpers = [
        { id: 0, name: "Нейро-помощник", power: 1, basePrice: 100, level: 1, bought: false, emoji: "🤖" },
        { id: 1, name: "Кибер-помощник", power: 5, basePrice: 2000, level: 1, bought: false, emoji: "👾" },
        { id: 2, name: "ИИ-помощник", power: 20, basePrice: 10000, level: 1, bought: false, emoji: "🧠" }
    ];

    let rouletteSpinning = false;
    const SKINS = [{ id: 'normal', price: 0, mult: 1 }, { id: 'halloween', price: 20, mult: 5 }, { id: 'amethyst', price: 320, mult: 15 }];
    let currentSkin = localStorage.getItem('currentSkin') || (isHalloween() ? 'halloween' : 'normal');
    let purchasedSkins = JSON.parse(localStorage.getItem('purchasedSkins') || '["normal"]');
    let unlockedAchievements = JSON.parse(localStorage.getItem('neuralAch') || '[]');
    Object.defineProperty(window, '__stars', { get: () => stars });

    const ACHIEVEMENTS = [
        { id: 'click1', name: 'Первый клик', desc: 'Сделай 1 клик', condition: () => totalClicks >= 1, points: 100, stars: 1 },
        { id: 'click1000', name: 'Кликер-маньяк', desc: 'Сделай 1000 кликов', condition: () => totalClicks >= 1000, points: 5000, stars: 10 },
        { id: 'neuron10', name: 'Новичок', desc: 'Купи 10 сетей', condition: () => purchasedCount >= 10, points: 1000, stars: 5 },
        { id: 'neuron100', name: 'Коллекционер', desc: 'Купи 100 сетей', condition: () => purchasedCount >= 100, points: 50000, stars: 50 },
        { id: 'neuron500', name: 'Сетевой магнат', desc: 'Купи 500 сетей', condition: () => purchasedCount >= 500, points: 500000, stars: 200 },
        { id: 'prestige1', name: 'Перерождение', desc: 'Сделай первый престиж', condition: () => prestigeLevel >= 1, points: 100000, stars: 100 },
        { id: 'star100', name: 'Звездочёт', desc: 'Накопи 100 звёзд', condition: () => stars >= 100, points: 10000, stars: 0 },
        { id: 'star1000', name: 'Галактика', desc: 'Накопи 1000 звёзд', condition: () => stars >= 1000, points: 100000, stars: 0 },
        { id: 'boss', name: 'Босс', desc: 'Купи ВСЕ 2200 сетей', condition: () => purchasedCount >= 2200, points: 10000000, stars: 5000 }
    ];

    const neuralNames = ["Перцептрон","Нейро-искра","Сверточная","Рекуррентная","Трансформер","Квантовая","GPT-клик","Автокодировщик","DALL-E","Глубокий мозг","Gemini","Нейро-интерфейс","Claude 3","Мультивселенная","Midjourney","Легендарная","Сингулярность","Божественный ИИ","Нейро-Земля","ИИ-Солнце","Галактическая","Космическая","Сверхразум","ДНК-бота","Бесконечность","Лев","Тигр","Медведь","Волк","Лиса","Орёл","Сокол","Дельфин","Кит","Акула","Пантера","Ягуар","Леопард","Гепард","Зебра","Жираф","Слон","Носорог","Бегемот","Крокодил","Питон","Анаконда","Хамелеон","Игуана","Фламинго","Пингвин","Сова","Ястреб","Скорпион","Паук","Пицца","Бургер","Суши","Роллы","Рамен","Паста","Спагетти","Лазанья","Тирамису","Панна-котта","Крем-брюле","Макаронс","Эклер","Пончик","Круассан","Багет","Сыр","Ветчина","Колбаса","Бекон","Стейк","Гриль","Барбекю","Шашлык","Плов","Борщ","Оливье","Сельдь","Икра","Блины","Меркурий","Венера","Земля","Марс","Юпитер","Сатурн","Уран","Нептун","Плутон","Церера","Эрида","Макемаке","Хаумеа","Седна","Орк","Иксион","Варуна","Квавар","Фобос","Деймос","Ио","Европа","Ганимед","Каллисто","Титан","Рея","Япет","Мимас","Энцелад","Тритон","Mario","Link","Samus","Kirby","Fox","Pikachu","Charizard","Mewtwo","Cloud","Sephiroth","Sonic","Tails","Knuckles","Shadow","Master Chief","Cortana","Doom","Ryu","Ken","Chun-Li","Kratos","Atreus","Lara","Nathan","Ezio","Altair","Gordon","Freeman","Chell","Wheatley"];

    let upgrades = [];
    for (let i = 0; i < 2200; i++) {
        upgrades.push({ id: i, name: i < neuralNames.length ? neuralNames[i] : `Нейросеть #${i + 1}`, power: i === 0 ? 1 : 1 + Math.floor(i / 10), price: i === 0 ? 20 : Math.floor(20 * Math.pow(1.17, i)), purchased: i === 0 });
    }

    let currentPage = 0, ITEMS_PER_PAGE = 20, totalPages = Math.ceil(upgrades.length / ITEMS_PER_PAGE);

    function renderShopNeurons() {
        const start = currentPage * ITEMS_PER_PAGE, end = Math.min(start + ITEMS_PER_PAGE, upgrades.length);
        let html = '';
        if (totalPages > 1) html += `<div class="pagination"><button class="page-btn" id="firstPageBtn">${t('first_page')}</button><button class="page-btn" id="prevPageBtn">${t('prev_page')}</button><span>${currentPage+1}/${totalPages}</span><button class="page-btn" id="nextPageBtn">${t('next_page')}</button><button class="page-btn" id="lastPageBtn">${t('last_page')}</button></div>`;
        for (let i = start; i < end; i++) { 
            const u = upgrades[i]; 
            let finalPrice = u.price;
            if (saleData.active) finalPrice = Math.floor(finalPrice * (1 - saleData.discount_percent / 100));
            html += `<div class="shop-item" data-id="${u.id}"><span>${u.name} +${u.power}</span><span>${u.purchased ? '✅' : `💰 ${formatNumber(finalPrice)}`}</span></div>`; 
        }
        if (totalPages > 1) html += `<div class="pagination"><button class="page-btn" id="firstPageBtn2">${t('first_page')}</button><button class="page-btn" id="prevPageBtn2">${t('prev_page')}</button><span>${currentPage+1}/${totalPages}</span><button class="page-btn" id="nextPageBtn2">${t('next_page')}</button><button class="page-btn" id="lastPageBtn2">${t('last_page')}</button></div>`;
        document.getElementById('shopNeurons').innerHTML = html;
        document.querySelectorAll('#shopNeurons .shop-item').forEach(el => { const u = upgrades[parseInt(el.dataset.id)]; if (!u.purchased) el.addEventListener('click', () => buyUpgrade(u.id)); });
        ['firstPageBtn', 'firstPageBtn2'].forEach(id => document.getElementById(id)?.addEventListener('click', () => { currentPage = 0; renderShopNeurons(); }));
        ['lastPageBtn', 'lastPageBtn2'].forEach(id => document.getElementById(id)?.addEventListener('click', () => { currentPage = totalPages - 1; renderShopNeurons(); }));
        ['prevPageBtn', 'prevPageBtn2'].forEach(id => document.getElementById(id)?.addEventListener('click', () => { if (currentPage > 0) { currentPage--; renderShopNeurons(); } }));
        ['nextPageBtn', 'nextPageBtn2'].forEach(id => document.getElementById(id)?.addEventListener('click', () => { if (currentPage < totalPages - 1) { currentPage++; renderShopNeurons(); } }));
    }

    function renderShopHelpers() {
        const container = document.getElementById('shopHelpers'); if (!container) return;
        let html = '';
        helpers.forEach(h => {
            const upgradePrice = Math.floor(h.basePrice * 1.5 * h.level);
            if (!h.bought) {
                html += `<div class="skin-item" data-id="${h.id}">
                    <div class="skin-info">
                        <div class="skin-name">${h.emoji} ${h.name}</div>
                        <div class="skin-mult">+${h.power} кликов/сек</div>
                        <div class="skin-price">💰 ${formatNumber(h.basePrice)}</div>
                    </div>
                    <button class="skin-btn helpers-buy-btn" data-id="${h.id}" style="background:#4caf50;">${t('helpers_buy')}</button>
                </div>`;
            } else {
                html += `<div class="skin-item active" data-id="${h.id}">
                    <div class="skin-info">
                        <div class="skin-name">${h.emoji} ${h.name} (${t('helpers_level')} ${h.level})</div>
                        <div class="skin-mult">+${h.power * h.level} кликов/сек</div>
                        <div class="skin-price">💰 ${formatNumber(upgradePrice)}</div>
                    </div>
                    <button class="skin-btn helpers-up-btn" data-id="${h.id}" style="background:#ffaa00;">${t('helpers_upgrade')}</button>
                </div>`;
            }
        });
        container.innerHTML = html;
        
        document.querySelectorAll('.helpers-buy-btn').forEach(btn => {
            btn.onclick = (e) => {
                const id = parseInt(e.target.dataset.id); const h = helpers[id];
                if (points >= h.basePrice) { points -= h.basePrice; h.bought = true; updateUI(); saveGame(); renderShopHelpers(); showToast('✅ Помощник куплен!'); }
                else showToast(t('not_enough'));
            };
        });
        document.querySelectorAll('.helpers-up-btn').forEach(btn => {
            btn.onclick = (e) => {
                const id = parseInt(e.target.dataset.id); const h = helpers[id];
                const price = Math.floor(h.basePrice * 1.5 * h.level);
                if (points >= price) { points -= price; h.level++; updateUI(); saveGame(); renderShopHelpers(); showToast('✅ Прокачано!'); }
                else showToast(t('not_enough'));
            };
        });
    }

    function renderShopSkins() {
        const container = document.getElementById('shopSkins'); if (!container) return;
        let html = '';
        SKINS.forEach(skin => {
            const isUnlocked = purchasedSkins.includes(skin.id) || skin.id === 'normal' || (skin.id === 'halloween' && isHalloween());
            const isEquipped = currentSkin === skin.id;
            const priceText = (skin.id === 'halloween' && isHalloween()) ? t('skin_event_free') : (skin.price > 0 ? `💰 ${skin.price}⭐` : t('skin_free'));
            const nameText = t('skin_' + skin.id);
            const emoji = skin.id === 'halloween' ? '🎃' : (skin.id === 'amethyst' ? '💎' : '🧠');
            let btnText = isEquipped ? t('skin_equipped') : (isUnlocked ? t('skin_equip') : `${t('skin_buy')}${skin.price}⭐`);
            let btnStyle = isEquipped ? 'background:#555; color:#aaa;' : (isUnlocked ? 'background:#4caf50;' : 'background:#ffaa00;');
            html += `<div class="skin-item ${isEquipped ? 'active' : ''}" data-id="${skin.id}"><div class="skin-info"><div class="skin-name">${nameText} ${emoji}</div><div class="skin-mult">${t('skin_mult')}${skin.mult}</div><div class="skin-price">${priceText}</div></div><button class="skin-btn" style="${btnStyle}" data-action="${isEquipped ? 'none' : (isUnlocked ? 'equip' : 'buy')}">${btnText}</button></div>`;
        });
        container.innerHTML = html;
        document.querySelectorAll('#shopSkins .skin-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); const id = e.target.closest('.skin-item').dataset.id;
                if (btn.dataset.action === 'equip') { currentSkin = id; localStorage.setItem('currentSkin', id); applySkin(); saveGame(); showToast(t('skin_equipped_toast')); renderShopSkins(); }
                else if (btn.dataset.action === 'buy') buySkin(id);
            });
        });
    }

    function buySkin(id) {
        const skin = SKINS.find(s => s.id === id); if (!skin) return;
        if (stars < skin.price) { showToast(`❌ ${t('need_stars')} ${skin.price}⭐`); return; }
        stars -= skin.price; purchasedSkins.push(id); localStorage.setItem('purchasedSkins', JSON.stringify(purchasedSkins));
        currentSkin = id; localStorage.setItem('currentSkin', id);
        updateUI(); applySkin(); saveGame(); renderShopSkins(); showToast(`✅ ${t('skin_' + skin.id)} ${t('skin_bought')}`); playBuySound();
    }

    function applySkin() {
        const brain = document.getElementById('clickableObject'); if (!brain) return;
        brain.classList.remove('skin-normal', 'skin-halloween', 'skin-amethyst'); brain.classList.add('skin-' + currentSkin);
        const emoji = document.getElementById('brainEmoji');
        if (emoji) {
            if (currentSkin === 'normal') { emoji.innerText = '🧠'; emoji.style.display = 'block'; }
            else if (currentSkin === 'halloween') { emoji.innerText = '🎃'; emoji.style.display = 'block'; }
            else if (currentSkin === 'amethyst') { emoji.style.display = 'none'; }
        }
    }
    function getSkinMultiplier() { return SKINS.find(s => s.id === currentSkin)?.mult || 1; }

    function buyUpgrade(id) {
        const u = upgrades[id];
        let finalPrice = u.price;
        if (saleData.active) finalPrice = Math.floor(finalPrice * (1 - saleData.discount_percent / 100));
        if (!u.purchased && points >= finalPrice) { 
            points -= finalPrice; u.purchased = true; purchasedCount++; updateUI(); renderShopNeurons(); saveGame(); showToast(`✅ ${u.name} ${t('bought')}`); playBuySound(); 
        } else showToast(t('not_enough'));
    }

    function buyAllAvailable() {
        const list = upgrades.map((u, i) => ({ u, i })).filter(x => !x.u.purchased).sort((a, b) => a.u.price - b.u.price);
        let bought = 0; 
        for (const item of list) { 
            let finalPrice = item.u.price;
            if (saleData.active) finalPrice = Math.floor(finalPrice * (1 - saleData.discount_percent / 100));
            if (points >= finalPrice) { points -= finalPrice; item.u.purchased = true; bought++; } else break; 
        }
        if (bought > 0) { purchasedCount = upgrades.filter(u => u.purchased).length; updateUI(); renderShopNeurons(); saveGame(); showToast(`💰 ${t('bought_count')}: ${bought}!`); playBuySound(); }
        else showToast(t('not_enough'));
    }

    const EXCHANGES = [{ id: 'exNew', type: 'pointsToStars', cost: 10, reward: 1, label: '10🧠 = 1⭐' },{ id: 'ex1', type: 'starsToPoints', cost: 100, reward: 10000000, label: '100⭐ = 10M🧠' },{ id: 'ex2', type: 'starsToPoints', cost: 90, reward: 1000000, label: '90⭐ = 1M🧠' },{ id: 'ex3', type: 'starsToPoints', cost: 50, reward: 100000, label: '50⭐ = 100K🧠' },{ id: 'ex4', type: 'pointsToStars', cost: 1000000, reward: 100, label: '1M🧠 = 100⭐' },{ id: 'soon', type: 'soon', label: 'soon', disabled: true }];

    function renderShopStars() {
        const container = document.getElementById('shopStars'); if (!container) return; let html = '';
        EXCHANGES.forEach(ex => { html += `<div class="${ex.disabled ? 'exchange-item disabled' : 'exchange-item'}" data-ex="${ex.id}">${ex.disabled ? t('soon') : ex.label}</div>`; });
        container.innerHTML = html;
        document.querySelectorAll('#shopStars .exchange-item').forEach(el => {
            const ex = EXCHANGES.find(e => e.id === el.dataset.ex);
            if (ex && !ex.disabled) el.addEventListener('click', () => doExchange(ex));
            else el.addEventListener('click', () => showToast(t('soon_feature')));
        });
    }

    function doExchange(ex) {
        if (ex.type === 'starsToPoints') { if (stars < ex.cost) { showToast(`❌ ${t('need_stars')} ${ex.cost}⭐`); return; } stars -= ex.cost; points += ex.reward; updateUI(); saveGame(); showToast(`✅ -${ex.cost}⭐ → +${formatNumber(ex.reward)}🧠`); }
        else { if (points < ex.cost) { showToast(`❌ ${t('need_points')} ${formatNumber(ex.cost)}🧠`); return; } points -= ex.cost; stars += ex.reward; totalStarsEarned += ex.reward; updateUI(); saveGame(); showToast(`✅ -${formatNumber(ex.cost)}🧠 → +${ex.reward}⭐`); }
        playBuySound();
    }

    function switchShopTab(tab) {
        const tn = document.querySelector('.shop-tab[data-tab="neurons"]'), th = document.querySelector('.shop-tab[data-tab="helpers"]'), ts = document.querySelector('.shop-tab[data-tab="stars"]'), tk = document.querySelector('.shop-tab[data-tab="skins"]');
        const ln = document.getElementById('shopNeurons'), lh = document.getElementById('shopHelpers'), ls = document.getElementById('shopStars'), lk = document.getElementById('shopSkins'), bb = document.getElementById('buyAllBtn');
        [tn, th, ts, tk].forEach(t2 => t2?.classList.remove('active')); [ln, lh, ls, lk].forEach(l => { if (l) l.style.display = 'none'; }); if (bb) bb.style.display = 'none';
        if (tab === 'helpers') { th?.classList.add('active'); if (lh) lh.style.display = 'block'; renderShopHelpers(); }
        else if (tab === 'stars') { ts?.classList.add('active'); if (ls) ls.style.display = 'block'; renderShopStars(); }
        else if (tab === 'skins') { tk?.classList.add('active'); if (lk) lk.style.display = 'block'; renderShopSkins(); }
        else { tn?.classList.add('active'); if (ln) ln.style.display = 'block'; if (bb) bb.style.display = ''; renderShopNeurons(); }
    }

    const ROULETTE_PRIZES = [
        { emoji: '💰', type: 'points', min: 100000, max: 1000000 },
        { emoji: '⭐', type: 'stars', min: 50, max: 200 },
        { emoji: '🧠', type: 'points', min: 5000000, max: 25000000 },
        { emoji: '🌟', type: 'stars', min: 10, max: 50 },
        { emoji: '⚡', type: 'boost', duration: 15 * 60 * 1000 },
        { emoji: '🎁', type: 'nothing' },
        { emoji: '💥', type: 'points', min: 100000000, max: 500000000 },
        { emoji: '👑', type: 'stars', min: 2000, max: 5000 }
    ];

    function openRoulette() { document.getElementById('rouletteOverlay')?.classList.add('show'); }

    function spinRoulette() {
        if (rouletteSpinning) return; if (stars < rouletteCost) { showToast(t('roulette_no_stars')); return; }
        stars -= rouletteCost; updateUI(); saveGame(); rouletteSpinning = true;
        const btn = document.getElementById('rouletteSpinBtn'); if (btn) { btn.disabled = true; btn.innerText = t('roulette_spinning'); }
        const slots = document.querySelectorAll('#rouletteWheel .roulette-slot'); slots.forEach(s => s.classList.remove('win'));
        let c = 0; const total = 30; const finalIdx = Math.floor(Math.random() * slots.length);
        const int = setInterval(() => {
            slots.forEach(s => s.classList.remove('win')); slots[c % slots.length].classList.add('win'); c++; playClickSound();
            if (c >= total + finalIdx) {
                clearInterval(int); slots.forEach(s => s.classList.remove('win')); slots[finalIdx].classList.add('win');
                giveRoulettePrize(finalIdx); rouletteSpinning = false; if (btn) { btn.disabled = false; btn.innerText = t('roulette_spin'); }
            }
        }, 70);
    }

    function giveRoulettePrize(idx) {
        const emoji = document.querySelectorAll('#rouletteWheel .roulette-slot')[idx]?.innerText || '🎁';
        let p = ROULETTE_PRIZES.find(x => x.emoji === emoji) || ROULETTE_PRIZES[0]; let msg = '';
        if (p.type === 'points') { const a = Math.floor(p.min + Math.random() * (p.max - p.min)); points += a; msg = `+${formatNumber(a)}🧠`; if (emoji === '💥') showJackpot(); }
        else if (p.type === 'stars') { const a = Math.floor(p.min + Math.random() * (p.max - p.min)); stars += a; totalStarsEarned += a; msg = `+${formatNumber(a)}⭐`; if (emoji === '👑') showJackpot(); }
        else if (p.type === 'nothing') { msg = t('roulette_nothing'); }
        else if (p.type === 'boost') { boostEndTime = Date.now() + p.duration; updateBoostUI(); msg = `⚡ Буст X5 (15 мин)!`; }
        updateUI(); saveGame(); 
        if (p.type !== 'nothing') showToast(`${t('roulette_win')}: ${emoji} ${msg}`); else showToast(msg);
        playBuySound();
    }

    function showJackpot() {
        showToast(t('roulette_jackpot'));
        document.body.style.filter = 'brightness(1.5) contrast(1.2)';
        setTimeout(() => document.body.style.filter = '', 400);
        playBuySound(); setTimeout(playBuySound, 150); setTimeout(playBuySound, 300);
    }

    function isBoostActive() { return Date.now() < boostEndTime; }
    function getBoostRemaining() { return Math.max(0, boostEndTime - Date.now()); }
    function isBirthdayBoostActive() { return Date.now() < birthdayBoostEndTime; }
    function isMarch8BoostActive() { return Date.now() < march8BoostEndTime; }
    function isX10BoostActive() { return Date.now() < x10BoostEndTime; }

    function updateBoostUI() {
        const btn = document.getElementById('boostBtn'); if (!btn) return;
        if (isBoostActive()) { const ms = getBoostRemaining(); btn.innerText = `${t('boost_active')} ${Math.floor(ms / 60000)}:${Math.floor((ms % 60000) / 1000).toString().padStart(2, '0')}`; btn.classList.add('active'); }
        else { btn.innerText = t('boost'); btn.classList.remove('active'); }
        updateBoostTimersPanel();
    }

    function updateBoostTimersPanel() {
        const panel = document.getElementById('boostTimerPanel'); if (!panel) return; let html = '';
        if (isBoostActive()) { const ms = getBoostRemaining(); html += `<div class="boost-timer-item">⚡×5: ${Math.floor(ms/3600000)}:${Math.floor((ms%3600000)/60000).toString().padStart(2,'0')}:${Math.floor((ms%60000)/1000).toString().padStart(2,'0')}</div>`; }
        if (isBirthdayBoostActive()) { const ms = birthdayBoostEndTime - Date.now(); html += `<div class="boost-timer-item">🎂×10: ${Math.floor(ms/3600000)}:${Math.floor((ms%3600000)/60000).toString().padStart(2,'0')}:${Math.floor((ms%60000)/1000).toString().padStart(2,'0')}</div>`; }
        if (isMarch8BoostActive()) { const ms = march8BoostEndTime - Date.now(); html += `<div class="boost-timer-item">🌷×15: ${Math.floor(ms/3600000)}:${Math.floor((ms%3600000)/60000).toString().padStart(2,'0')}:${Math.floor((ms%60000)/1000).toString().padStart(2,'0')}</div>`; }
        if (isX10BoostActive()) { const ms = x10BoostEndTime - Date.now(); html += `<div class="boost-timer-item">🧠×10: ${Math.floor(ms/3600000)}:${Math.floor((ms%3600000)/60000).toString().padStart(2,'0')}:${Math.floor((ms%60000)/1000).toString().padStart(2,'0')}</div>`; }
        panel.innerHTML = html;
    }

    function startBoostTimer() {
        if (boostInterval) clearInterval(boostInterval); updateBoostUI();
        boostInterval = setInterval(() => {
            if (isBoostActive() || isBirthdayBoostActive() || isMarch8BoostActive() || isX10BoostActive()) updateBoostTimersPanel();
            if (isBoostActive()) updateBoostUI(); else if (boostEndTime > 0) { boostEndTime = 0; showToast(t('boost_ended')); updateUI(); }
        }, 1000);
    }
    function buyBoost() {
        if (isBoostActive()) { showToast(t('boost_already')); return; }
        if (stars < BOOST_PRICE) { showToast(`❌ ${t('need_stars')} ${BOOST_PRICE}⭐`); return; }
        stars -= BOOST_PRICE; boostEndTime = Date.now() + BOOST_DURATION; updateUI(); updateBoostUI(); saveGame(); showToast(t('boost_activated')); playBuySound();
    }

    function updateAutoClickerUI() {
        const btn = document.getElementById('autoclickerBtn'); if (!btn) return;
        if (autoclickerBought) { btn.innerText = t('autoclicker_active'); btn.classList.add('active'); btn.style.background = 'linear-gradient(145deg, #2e7d32, #1a5a20)'; btn.style.borderColor = '#66cc66'; }
        else { btn.innerText = t('autoclicker'); btn.classList.remove('active'); btn.style.background = ''; btn.style.borderColor = ''; }
    }
    function buyAutoclicker() {
        if (autoclickerBought) { showToast(t('autoclicker_bought')); return; }
        if (stars < AUTOCLICKER_PRICE) { showToast(t('autoclicker_no_stars')); return; }
        stars -= AUTOCLICKER_PRICE; autoclickerBought = true; startAutoclicker(); updateAutoClickerUI(); updateUI(); saveGame(); showToast(t('autoclicker_bought')); playBuySound();
    }
    function startAutoclicker() {
        if (autoclickerInterval) clearInterval(autoclickerInterval); if (!autoclickerBought) return;
        let rate = 10;
        if (autoclickerRateBonus > 0) rate = autoclickerRateBonus;
        autoclickerInterval = setInterval(() => { points += getClickPower(); totalClicks++; sessionClicks++; updateUI(); }, 1000 / rate);
    }

    // Пассивный доход от помощников
    setInterval(() => {
        let passive = 0;
        helpers.forEach(h => { if(h.bought) passive += (h.power * h.level); });
        if(passive > 0) {
            points += passive;
            updateUI();
        }
    }, 1000);

    function canGetDailyGift() { return localStorage.getItem('dailyGiftDate') !== new Date().toISOString().slice(0, 10); }
    function claimDailyGift() {
        if (!canGetDailyGift()) { showToast(t('daily_gift_already')); return; }
        localStorage.setItem('dailyGiftDate', new Date().toISOString().slice(0, 10));
        points += 50000; stars += 25; totalStarsEarned += 25; updateUI(); saveGame(); showToast(`${t('daily_gift_got')} +50K🧠 +25⭐`); playBuySound(); updateDailyGiftUI();
    }
    function updateDailyGiftUI() {
        const btn = document.getElementById('dailyGiftBtn'); if (!btn) return;
        if (canGetDailyGift()) { btn.style.opacity = '1'; btn.style.animation = 'dailyGiftPulse 1.5s ease-in-out infinite'; }
        else { btn.style.opacity = '0.5'; btn.style.animation = 'none'; }
    }

    function checkAchievements() {
        let newUnlocked = false;
        ACHIEVEMENTS.forEach(ach => {
            if (!unlockedAchievements.includes(ach.id) && ach.condition()) {
                unlockedAchievements.push(ach.id); points += ach.points; stars += ach.stars; totalStarsEarned += ach.stars; newUnlocked = true;
                showToast(`${t('ach_unlocked')} ${ach.name}`); playBuySound();
            }
        });
        if (newUnlocked) { localStorage.setItem('neuralAch', JSON.stringify(unlockedAchievements)); renderAchievements(); }
    }
    function renderAchievements() {
        const list = document.getElementById('achList'); if (!list) return; let html = '';
        ACHIEVEMENTS.forEach(ach => {
            const isUnlocked = unlockedAchievements.includes(ach.id);
            html += `<div class="${isUnlocked ? 'ach-item unlocked' : 'ach-item locked'}"><div class="ach-info"><div class="ach-name">${isUnlocked ? '🏆' : '🔒'} ${ach.name}</div><div class="ach-desc">${ach.desc}</div></div><div class="ach-reward">+${formatNumber(ach.points)}🧠 +${ach.stars}⭐</div></div>`;
        });
        list.innerHTML = html;
    }

    function spawnMeteor() {
        const el = document.createElement('div'); el.className = 'meteor'; el.innerText = '📢';
        const startY = Math.random() * (window.innerHeight - 100); el.style.top = startY + 'px'; el.style.left = '-100px'; document.body.appendChild(el);
        el.addEventListener('click', () => { points += 5000; updateUI(); saveGame(); showToast(`${t('meteor_win')}5000🧠`); playBuySound(); el.remove(); });
        let pos = -100; const int = setInterval(() => { pos += 6; el.style.left = pos + 'px'; if (pos > window.innerWidth + 50) { clearInterval(int); el.remove(); } }, 30);
    }

    // Питомец
    function spawnPet() {
        const pet = document.getElementById('pet'); if (!pet || !pet.classList.contains('hidden')) return;
        pet.classList.remove('hidden');
        pet.style.left = '-50px';
        pet.style.top = (Math.random() * 60 + 20) + '%';
        let pos = -50;
        const int = setInterval(() => {
            pos += 3; pet.style.left = pos + 'px';
            if (pos > window.innerWidth) { clearInterval(int); pet.classList.add('hidden'); }
        }, 30);
        pet.onclick = () => {
            clearInterval(int); pet.classList.add('hidden');
            stars += 50; totalStarsEarned += 50; updateUI(); saveGame(); showToast('✨ Питомец дал +50⭐!'); playBuySound();
        };
    }
    setInterval(spawnPet, 90000); // Каждые 1.5 минуты

    // Секретный босс
    let bossHp = 0, bossMaxHp = 0, bossActive = false;
    function spawnBoss() {
        if(bossActive) return;
        bossActive = true; bossMaxHp = 100 + totalClicks * 2; bossHp = bossMaxHp;
        const overlay = document.getElementById('bossOverlay'); const hpFill = document.getElementById('bossHpFill'); const emoji = document.getElementById('bossEmoji');
        document.querySelector('.boss-title').innerText = t('boss_title');
        document.querySelector('.boss-hint').innerText = t('boss_hint');
        overlay.classList.add('show'); hpFill.style.width = '100%';
        
        emoji.onclick = () => {
            if(!bossActive) return;
            bossHp--; hpFill.style.width = (bossHp/bossMaxHp*100) + '%'; playClickSound();
            if(bossHp <= 0) {
                bossActive = false; overlay.classList.remove('show');
                const reward = 50000;
                points += reward; stars += 100; totalStarsEarned += 100;
                updateUI(); saveGame(); showToast(`${t('boss_killed')} +${formatNumber(reward)}🧠 +100⭐`); playBuySound();
            }
        };
        setTimeout(() => { if(bossActive){ bossActive = false; overlay.classList.remove('show'); } }, 15000); // 15 сек на убийство
    }

    function getPrestigeMultiplier() { return 1 + prestigeLevel * PRESTIGE_BONUS_PER_LEVEL; }
    function updatePrestigeDisplay() {
        document.getElementById('prestigeLevelDisplay').innerText = prestigeLevel;
        document.getElementById('prestigeBonusDisplay').innerText = '+' + Math.round(prestigeLevel * PRESTIGE_BONUS_PER_LEVEL * 100) + '%';
        document.getElementById('prestigeNeedDisplay').innerText = formatNumber(PRESTIGE_REQUIREMENT) + ' 🧠';
    }
    function doPrestige() {
        if (points < PRESTIGE_REQUIREMENT) { showToast(t('prestige_not_enough')); return; }
        if (!confirm(t('prestige_confirm'))) return;
        prestigeLevel++; points = 10; purchasedCount = 1; upgrades.forEach((u, i) => { u.purchased = (i === 0); });
        updateUI(); renderShopNeurons(); updatePrestigeDisplay(); saveGame(); showToast(`🌟 ${t('prestige_done')} ${prestigeLevel}!`); playBuySound();
        document.getElementById('prestigeModal')?.classList.remove('show');
    }

    function calculateOfflineIncome() {
        const awaySec = Math.min((Date.now() - lastSaveTime) / 1000, OFFLINE_MAX_HOURS * 3600);
        if (awaySec < 60) return 0; return Math.floor(getClickPower() * awaySec * OFFLINE_RATE);
    }
    function showOfflineReward(amount) { document.getElementById('offlineReward').innerText = '+' + formatNumber(amount) + ' 🧠'; document.getElementById('offlineOverlay')?.classList.add('show'); }

    let passTasks = [], passCurrentTask = 0;
    const pass8StartDate = new Date(2026, 9, 5).getTime(), pass8EndDate = new Date(2026, 9, 31, 23, 59, 59).getTime();
    let passEndTimerInterval = null, passRewardSeconds = 600, passRewardInterval = null;

    function getActivePassNumber() { const n = Date.now(); return (n >= pass8StartDate && n <= pass8EndDate) ? 8 : 0; }
    function getPassEndTime(s) { return s === 8 ? pass8EndDate : 0; }
    function getPassRewardSeconds() { return getActivePassNumber() === 8 ? 1500 : 600; }
    function getPassRewardRewards() { return getActivePassNumber() === 8 ? { points: 20000, stars: 50 } : { points: 5000, stars: 50 }; }

    function applyPassStyle() {
        const c = document.getElementById('passContainer'), title = document.getElementById('passTitle'); if (!c || !title) return;
        c.classList.remove('pass-v8'); if (getActivePassNumber() === 8) { c.classList.add('pass-v8'); title.innerHTML = '🎃 AI PASS 8 🎃'; } else title.innerHTML = t('pass_no_active');
    }

    function fillPassTasks(s) { passTasks = []; if (s === 8) for (let i = 1; i <= 40; i++) passTasks.push({ level: i, targetClicks: i * 500, rewardPoints: 20000, rewardStars: 50, completed: false, claimed: false }); }
    function initPassSeason(skipSave) {
        const active = getActivePassNumber(), saved = parseInt(localStorage.getItem('aiPassSeason')) || 0;
        fillPassTasks(active);
        if (saved !== active) { passCurrentTask = 0; passRewardSeconds = getPassRewardSeconds(); localStorage.setItem('aiPassSeason', String(active)); if (!skipSave) saveGame(); }
    }

    function renderPassBadges() {
        const c = document.getElementById('passLevels'); if (!c) return; let html = '';
        passTasks.forEach((task, idx) => {
            let cls = 'pass-badge', st = '';
            if (task.claimed) { cls += ' completed'; st = '✅'; } else if (idx === passCurrentTask) { cls += ' available'; st = '🎯'; } else if (idx < passCurrentTask) { cls += ' completed'; st = '✔'; } else { cls += ' locked'; st = '🔒'; }
            html += `<div class="${cls}">${task.level}<br>${st}</div>`;
        });
        c.innerHTML = html; const pf = document.getElementById('passProgressFill');
        if (pf) pf.style.width = (passTasks.length > 0 ? (passTasks.filter(t => t.claimed).length / passTasks.length) * 100 : 0) + '%';
    }

    function updatePassRewardTimerDisplay() { const el = document.getElementById('passTimer'); if (el) el.innerHTML = `⏱️ ${Math.floor(passRewardSeconds / 60)}:${(passRewardSeconds % 60).toString().padStart(2, '0')}`; }
    function startPassRewardTimer() {
        if (passRewardInterval) clearInterval(passRewardInterval); updatePassRewardTimerDisplay();
        passRewardInterval = setInterval(() => {
            passRewardSeconds--;
            if (passRewardSeconds <= 0) {
                if (getActivePassNumber() > 0) { const r = getPassRewardRewards(); points += r.points; stars += r.stars; totalStarsEarned += r.stars; updateUI(); saveGame(); showToast(`🎁 ${t('pass_reward')}! +${formatNumber(r.points)}🧠 +${r.stars}⭐`); playBuySound(); }
                passRewardSeconds = getPassRewardSeconds();
            }
            updatePassRewardTimerDisplay();
        }, 1000);
    }

    function renderTasksList() {
        const c = document.getElementById('tasksList'); if (!c) return; let html = '';
        passTasks.forEach((task, idx) => {
            let cls = 'task-item', st = '', cb = '';
            if (task.claimed) { cls += ' completed'; st = t('done'); }
            else if (idx === passCurrentTask) {
                cls += ' current'; const prog = Math.min(totalClicks, task.targetClicks); const perc = Math.min(100, (prog / task.targetClicks) * 100);
                st = `${prog} / ${task.targetClicks} ${t('clicks_done')}`;
                if (totalClicks >= task.targetClicks) cb = `<button class="task-claim-btn" data-idx="${idx}">${t('claim')}</button>`;
                html += `<div class="${cls}"><div class="task-header"><span class="task-level">🎯 ${t('level')} ${task.level}</span><span class="task-reward">+${formatNumber(task.rewardPoints)}🧠 +${task.rewardStars}⭐</span></div><div class="task-desc">${task.targetClicks} ${t('clicks_done')}</div><div class="task-progress-bar"><div class="task-progress-fill" style="width:${perc}%"></div></div><div class="task-progress-text">${st}</div>${cb}</div>`;
                return;
            } else if (idx < passCurrentTask) { cls += ' completed'; st = t('done'); } else st = `${t('lock_first')} ${idx}`;
            html += `<div class="${cls}"><div class="task-header"><span class="task-level">${idx === passCurrentTask ? '🎯' : '🔒'} ${t('level')} ${task.level}</span><span class="task-reward">+${formatNumber(task.rewardPoints)}🧠 +${task.rewardStars}⭐</span></div><div class="task-desc">${task.targetClicks} ${t('clicks_done')}</div><div class="task-progress-text">${st}</div></div>`;
        });
        c.innerHTML = html; document.querySelectorAll('.task-claim-btn').forEach(b => b.addEventListener('click', () => claimTask(parseInt(b.dataset.idx))));
    }

    function claimTask(idx) {
        const task = passTasks[idx]; if (!task || task.claimed || idx !== passCurrentTask || totalClicks < task.targetClicks) return;
        task.claimed = true; points += task.rewardPoints; stars += task.rewardStars; totalStarsEarned += task.rewardStars; passCurrentTask++;
        updateUI(); renderPassBadges(); renderTasksList(); saveGame(); showToast(`🎉 ${t('task_claimed')} ${task.level} ${t('task_received')}`); playBuySound();
    }

    function checkPassProgress() { const m = document.getElementById('passTasksModal'); if (m && m.classList.contains('show')) renderTasksList(); }
    function updatePassEndTimer() {
        const el = document.getElementById('passEndTimer'); if (!el) return; const num = getActivePassNumber();
        if (num === 0) { el.innerHTML = `⏳ ${t('pass_no_active')}`; return; }
        const diff = getPassEndTime(num) - Date.now(); if (diff <= 0) { el.innerHTML = `⏳ AI PASS ${num} ${t('pass_finished')}`; return; }
        el.innerHTML = `⏳ ${t('until_end')} ${num}: ${Math.floor(diff / 86400000)} ${t('days')} ${Math.floor((diff % 86400000) / 3600000)} ${t('hours')}`;
    }
    function startPassEndTimer() { if (passEndTimerInterval) clearInterval(passEndTimerInterval); updatePassEndTimer(); passEndTimerInterval = setInterval(updatePassEndTimer, 60000); }

    const soundProfiles = [{ name: "Обычный", freq: 880, type: "sine" }, { name: "Пиксельный", freq: 1200, type: "square" }, { name: "Глубокий", freq: 440, type: "sawtooth" }];
    let currentSoundProfile = 0, audioCtx = null, musicEnabled = localStorage.getItem('musicEnabled') === 'true';

    function initMusic() { if (audioCtx) return; try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {} }
    function playClickSound() { if (!audioCtx) initMusic(); if (audioCtx) { try { const p = soundProfiles[currentSoundProfile]; const o = audioCtx.createOscillator(); const g = audioCtx.createGain(); o.type = p.type; o.frequency.value = p.freq; g.gain.value = 0.08; g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05); o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime + 0.05); } catch(e) {} } }
    function playBuySound() { if (!audioCtx) initMusic(); if (audioCtx) { try { const o = audioCtx.createOscillator(); const g = audioCtx.createGain(); o.type = "triangle"; o.frequency.value = 523.25; g.gain.value = 0.08; g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1); o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime + 0.1); } catch(e) {} } }

    const musicBtn = document.getElementById('musicToggle');
    if (musicBtn) { musicBtn.innerText = musicEnabled ? '🔊' : '🔇'; musicBtn.onclick = () => { musicEnabled = !musicEnabled; localStorage.setItem('musicEnabled', musicEnabled); musicBtn.innerText = musicEnabled ? '🔊' : '🔇'; }; }
    document.querySelectorAll('.menu-btn').forEach((btn,i)=>{ btn.style.animationDelay=`${i*0.05}s`; });

    function spawnFloatText(x, y, text) {
        const el = document.createElement('div'); el.className = 'float-text'; el.innerText = text;
        el.style.left = (x - 20) + 'px'; el.style.top = (y - 10) + 'px'; document.body.appendChild(el);
        setTimeout(() => el.remove(), 1000);
    }
    function updateStatsUI() {
        document.getElementById('statTotalClicks').innerText = formatNumber(totalClicks);
        document.getElementById('statNeuronsBought').innerText = purchasedCount;
        document.getElementById('statSessionClicks').innerText = formatNumber(sessionClicks);
    }
    function updatePlaytime() { const el = document.getElementById('playtime'); if (el) el.innerText = Math.max(0, Math.floor((Date.now() - gameStartTime) / 60000)); }
    function startSleepMsgTimer() { if (sleepMsgTimer) clearTimeout(sleepMsgTimer); sleepMsgTimer = setTimeout(() => { if (!sleepMsgShowing) { sleepMsgShowing = true; document.getElementById('sleepMsg')?.classList.add('show'); } }, 45000); }
    function hideSleepMsg() { if (sleepMsgTimer) clearTimeout(sleepMsgTimer); if (sleepMsgShowing) { sleepMsgShowing = false; document.getElementById('sleepMsg')?.classList.remove('show'); } startSleepMsgTimer(); }

    function shareProgress() {
        const text = `🧠 ${t('title')}:\n🧠 ${formatNumber(points)}\n⭐ ${formatNumber(stars)}\n🖱️ ${formatNumber(totalClicks)}\n🧬 ${purchasedCount}/${upgrades.length}\n🌟 Престиж: ${prestigeLevel}\n📅 ${GAME_VERSION}`;
        navigator.clipboard.writeText(text); showToast(t('copied'));
    }

    function getClickPower() {
        let base = 1; upgrades.forEach(u => { if (u.purchased) base += u.power; });
        if (godMode) base *= 10;
        if (isBoostActive()) base *= BOOST_MULTIPLIER;
        if (isBirthdayBoostActive()) base *= BIRTHDAY_BOOST_MULT;
        if (isMarch8BoostActive()) base *= MARCH8_BOOST_MULT;
        if (isX10BoostActive()) base *= X10_BOOST_MULT;
        if (globalEventMultiplier > 1) base *= globalEventMultiplier;
        base *= getPrestigeMultiplier(); base *= getSkinMultiplier(); return Math.floor(base);
    }

    function updateUI() {
        document.getElementById('points').innerText = formatNumber(points);
        document.getElementById('power').innerText = getClickPower();
        document.getElementById('clickHint').innerHTML = godMode ? `+${formatNumber(getClickPower())} (БОГ)` : `+${formatNumber(getClickPower())}`;
        document.getElementById('stars').innerText = formatNumber(stars);
        updateStatsUI(); updatePlaytime(); document.getElementById('comboText')?.classList.remove('show');
        checkPassProgress(); checkAchievements();
    }

    function showToast(msg) {
        const t2 = document.createElement('div'); t2.className = 'toast'; t2.innerText = msg;
        document.body.appendChild(t2); setTimeout(() => t2.remove(), 2500);
    }

    function saveGame() {
        lastSaveTime = Date.now();
        localStorage.setItem('neuralEvoSave', JSON.stringify({
            points, stars, totalClicks, purchasedCount, totalStarsEarned, godMode, comboCounter, prestigeLevel,
            birthdayBoostEndTime, march8BoostEndTime, x10BoostEndTime, autoclickerBought, autoclickerLevel, unlockedAchievements,
            helpers: helpers.map(h => ({ bought: h.bought, level: h.level })),
            currentSkin, purchasedSkins, upgrades: upgrades.map(u => ({ purchased: u.purchased })),
            passTasks: passTasks.map(t => ({ claimed: t.claimed, completed: t.completed })),
            passCurrentTask, passRewardSeconds, passSeason: localStorage.getItem('aiPassSeason') || '0',
            boostEndTime, gameStartTime, currentSoundProfile, gameVersion: GAME_VERSION, lastSaveTime
        }));
    }

    function loadGame() {
        initPassSeason(true); const activeSeason = localStorage.getItem('aiPassSeason') || '0'; let _showAnim = false;
        const saved = localStorage.getItem('neuralEvoSave');
        if (saved) {
            try {
                const d = JSON.parse(saved);
                points = d.points || 10;
                if (d.stars !== undefined) stars = d.stars; else if (d.diamonds !== undefined) stars = Math.floor(d.diamonds / 10); else stars = 0;
                totalClicks = d.totalClicks || 0; purchasedCount = d.purchasedCount || 1;
                totalStarsEarned = d.totalStarsEarned || d.totalDiamondsEarned || 0;
                godMode = d.godMode || false; comboCounter = d.comboCounter || 0; prestigeLevel = d.prestigeLevel || 0;
                boostEndTime = d.boostEndTime || 0; birthdayBoostEndTime = d.birthdayBoostEndTime || 0;
                march8BoostEndTime = d.march8BoostEndTime || 0; x10BoostEndTime = d.x10BoostEndTime || 0;
                autoclickerBought = d.autoclickerBought || false;
                if (d.autoclickerLevel) autoclickerLevel = d.autoclickerLevel;
                if (d.helpers) d.helpers.forEach((hData, i) => { if(helpers[i]) { helpers[i].bought = hData.bought; helpers[i].level = hData.level; } });
                if (d.lastSaveTime) lastSaveTime = d.lastSaveTime;
                if (d.currentSkin) currentSkin = d.currentSkin;
                if (d.purchasedSkins) purchasedSkins = d.purchasedSkins;
                if (d.upgrades) d.upgrades.forEach((data, i) => { if (upgrades[i]) upgrades[i].purchased = data.purchased; });
                if (String(d.passSeason) === String(activeSeason) && d.passTasks) {
                    d.passTasks.forEach((data, i) => { if (passTasks[i]) { passTasks[i].claimed = data.claimed; passTasks[i].completed = data.completed; } });
                    if (d.passCurrentTask !== undefined) passCurrentTask = d.passCurrentTask;
                    if (d.passRewardSeconds !== undefined) passRewardSeconds = d.passRewardSeconds;
                }
                if (d.gameStartTime) gameStartTime = d.gameStartTime;
                if (d.currentSoundProfile !== undefined) currentSoundProfile = d.currentSoundProfile;
                purchasedCount = upgrades.filter(u => u.purchased).length;
            } catch(e) {}
        }
        updateUI(); renderShopNeurons(); renderPassBadges(); renderTasksList(); updateStatsUI(); renderAchievements();
        startPassEndTimer(); startPassRewardTimer(); startBoostTimer();
        if (playtimeInterval) clearInterval(playtimeInterval);
        playtimeInterval = setInterval(() => updatePlaytime(), 60000);
        startSleepMsgTimer(); updateAutoClickerUI(); updateDailyGiftUI();
        applyTheme(); applyPassStyle(); applySkin();
        applyButtonColor(localStorage.getItem('btnColor') || 'blue');
        updatePrestigeDisplay();
        const offlineIncome = calculateOfflineIncome();
        if (offlineIncome > 0) { points += offlineIncome; setTimeout(() => showOfflineReward(offlineIncome), 2600); saveGame(); updateUI(); }
        if (isBirthday() && !isBirthdayBoostActive() && !localStorage.getItem('birthdayBoostUsed_' + new Date().toDateString())) { birthdayBoostEndTime = Date.now() + BIRTHDAY_BOOST_DURATION; localStorage.setItem('birthdayBoostUsed_' + new Date().toDateString(), 'true'); setTimeout(() => showToast(t('birthday_boost')), 3000); saveGame(); }
        if (isMarch8() && !isMarch8BoostActive() && !localStorage.getItem('march8BoostUsed_' + new Date().toDateString())) { march8BoostEndTime = Date.now() + MARCH8_BOOST_DURATION; localStorage.setItem('march8BoostUsed_' + new Date().toDateString(), 'true'); setTimeout(() => showToast(t('march8_boost')), 3000); saveGame(); }
    }

    document.getElementById('diamondRemovalOk')?.addEventListener('click', () => document.getElementById('diamondRemovalOverlay')?.classList.remove('show'));
    document.getElementById('offlineOkBtn')?.addEventListener('click', () => document.getElementById('offlineOverlay')?.classList.remove('show'));

    function exportProgress() {
        saveGame(); const saved = localStorage.getItem('neuralEvoSave'); let data = {};
        if (saved) try { data = JSON.parse(saved); } catch(e) {}
        data.gameVersion = GAME_VERSION; data.exportDate = new Date().toISOString();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "neural_evolution_save.json"; a.click();
        showToast(t('saved'));
    }
    function importProgress(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try { const data = JSON.parse(e.target.result); data.gameVersion = GAME_VERSION; localStorage.setItem('neuralEvoSave', JSON.stringify(data)); showToast(t('loaded')); setTimeout(() => location.reload(), 1000); }
            catch { showToast(t('load_error')); }
        };
        reader.readAsText(file);
    }
    const importInput = document.createElement('input'); importInput.type = 'file'; importInput.accept = '.json'; importInput.onchange = (e) => { if (e.target.files[0]) importProgress(e.target.files[0]); };

    const bgThemes = { early_autumn: "bg-early-autumn", golden: "bg-golden", rainy: "bg-rainy", late: "bg-late", forest: "bg-forest", park: "bg-park", mountains: "bg-mountains", village: "bg-village" };
    function setBodyBg(theme) {
        if (isHalloween() || isNewYear() || isHackerMode() || isBirthday() || isMarch8()) { applyTheme(); return; }
        document.body.className = ''; document.body.classList.add(bgThemes[theme] || 'bg-early-autumn');
        applyButtonColor(localStorage.getItem('btnColor') || 'blue'); localStorage.setItem('selectedBg', theme); applySkin();
    }

    function processSingleClick(gain, x, y) {
        hideSleepMsg(); comboCounter++;
        let finalGain = gain;
        if (comboCounter % 5 === 0) {
            finalGain = gain * 2; const comboText = document.getElementById('comboText');
            if (comboText) { comboText.innerText = phrasesData.combo || t('combo'); comboText.classList.add('show'); setTimeout(() => comboText.classList.remove('show'), 800); }
            spawnFloatText(x, y - 40, "🔥 x2!");
        }
        if (Math.random() < 0.02) { finalGain *= 3; spawnFloatText(x, y - 40, "⚡ x3!"); showToast(t('triple_click')); playBuySound(); }
        
        if (Math.random() < 0.05) {
            finalGain *= 10;
            spawnFloatText(x, y - 60, phrasesData.crit || t('crit_click'));
            showToast(phrasesData.crit || t('crit_click')); playBuySound();
            const brain = document.getElementById('clickableObject');
            if(brain) { brain.style.boxShadow = '0 0 50px #ffd700'; setTimeout(() => brain.style.boxShadow = '', 300); }
        }

        points += finalGain; totalClicks++; sessionClicks++; playClickSound();
        
        if (Math.random() < starsData.chance) { 
            stars += starsData.amount; 
            totalStarsEarned += starsData.amount; 
            showToast(t('star_got')); 
            playBuySound(); 
            spawnFloatText(x, y - 30, "⭐⭐⭐"); 
        }
        
        if (isHalloween() && Math.random() < 0.02) { stars += 5; totalStarsEarned += 5; showToast(t('pumpkin_click')); spawnFloatText(x, y - 50, "🎃 +5⭐"); playBuySound(); }
    }

    // Исправленный обработчик кликов (Pointer Events решает проблему APK)
    function handlePointerDown(e) {
        e.preventDefault();
        if (e.pointerType === 'mouse' && e.button !== 0) return; // Только ЛКМ
        const gain = getClickPower();
        processSingleClick(gain, e.clientX, e.clientY);
        const brain = document.getElementById('clickableObject');
        if(brain) {
            brain.style.transform = 'scale(0.92)';
            setTimeout(() => brain.style.transform = '', 120);
        }
        updateUI(); saveGame();
    }
    const clickable = document.getElementById('clickableObject');
    if (clickable) { 
        // Используем pointerdown для мультитача и обычных кликов
        clickable.addEventListener('pointerdown', handlePointerDown); 
    }

    // ===== ЛИДЕРБОРД =====
    let lastLeaderboardRequest = 0;
    let leaderboardCache = null;

    function showLeaderboard() {
        if (!ysdk) { showToast(t('leaderboard_no_sdk')); return; }
        ysdk.getPlayer().then(player => {
            if (player.getMode() === 'lite') {
                showToast(t('leaderboard_login_required'));
                ysdk.auth.openAuthDialog().then(() => { loadLeaderboardData(); }).catch(() => { showToast(t('leaderboard_login_error')); });
            } else { loadLeaderboardData(); }
        }).catch(e => { showToast(t('leaderboard_error')); });
    }

    function loadLeaderboardData() {
        const now = Date.now();
        if (now - lastLeaderboardRequest < 5000) {
            if (leaderboardCache) { displayLeaderboard(leaderboardCache); return; } 
            else { showToast(t('leaderboard_wait')); return; }
        }
        lastLeaderboardRequest = now;

        ysdk.getLeaderboards().then(lb => {
            return lb.setLeaderboardScore('points', Math.floor(points)).then(() => {
                return lb.getLeaderboardEntries('points', { quantityTop: 10, includeUser: true, quantityAround: 3 });
            });
        }).then(res => {
            leaderboardCache = res; displayLeaderboard(res);
        }).catch(e => { console.error(e); showToast(t('leaderboard_error')); });
    }

    function displayLeaderboard(res) {
        let modal = document.getElementById('lbModal');
        if (!modal) {
            modal = document.createElement('div'); modal.id = 'lbModal'; modal.className = 'modal-overlay';
            modal.innerHTML = `<div class="modal-content" style="text-align:left;"><div class="modal-title" style="text-align:center;">${t('leaderboard_title')}</div><div id="lbList" style="margin-bottom:15px; max-height: 50vh; overflow-y:auto;"></div><button class="modal-btn" onclick="document.getElementById('lbModal').classList.remove('show')" style="width:100%;">${t('close')}</button></div>`;
            document.body.appendChild(modal);
        }
        const list = modal.querySelector('#lbList');
        let html = '';
        if (res && res.entries) {
            res.entries.forEach((e, i) => {
                const name = e.player.publicName || 'Аноним';
                const score = formatNumber(e.score);
                html += `<div style="padding:8px 0; border-bottom:1px solid #444; font-size:14px;">${i+1}. ${name} — <b style="color:#ffd966;">${score} 🧠</b></div>`;
            });
        } else { html = '<div style="text-align:center; padding:10px;">Нет данных</div>'; }
        list.innerHTML = html; modal.classList.add('show');
    }

    // ===== ОБРАБОТЧИКИ UI =====
    const tutorialOverlay = document.getElementById('tutorialOverlay'), tutorialStep1 = document.getElementById('tutorialStep1'), tutorialStep2 = document.getElementById('tutorialStep2');
    function showTutorial() { tutorialStep1?.classList.remove('hidden'); tutorialStep2?.classList.add('hidden'); tutorialOverlay?.classList.add('show'); }
    function goToGame() { document.getElementById('mainMenu').classList.add('hidden'); document.getElementById('gameInterface').classList.remove('hidden'); }
    document.getElementById('tutorialYes')?.addEventListener('click', () => { tutorialStep1.classList.add('hidden'); tutorialStep2.classList.remove('hidden'); });
    document.getElementById('tutorialNo')?.addEventListener('click', () => { localStorage.setItem('tutorialDone', 'true'); tutorialOverlay?.classList.remove('show'); goToGame(); });
    document.getElementById('tutorialOk')?.addEventListener('click', () => { localStorage.setItem('tutorialDone', 'true'); tutorialOverlay?.classList.remove('show'); goToGame(); });
    document.getElementById('playBtn')?.addEventListener('click', () => { if (!localStorage.getItem('tutorialDone')) { showTutorial(); return; } goToGame(); });
    document.getElementById('prestigeBtn')?.addEventListener('click', () => { updatePrestigeDisplay(); document.getElementById('prestigeModal')?.classList.add('show'); });
    document.getElementById('doPrestigeBtn')?.addEventListener('click', doPrestige);
    document.getElementById('closePrestigeBtn')?.addEventListener('click', () => document.getElementById('prestigeModal')?.classList.remove('show'));
    document.getElementById('backToMenu')?.addEventListener('click', () => { document.getElementById('mainMenu').classList.remove('hidden'); document.getElementById('gameInterface').classList.add('hidden'); });
    document.getElementById('openShopBtn')?.addEventListener('click', () => { document.getElementById('shopPanel').classList.add('show'); switchShopTab('neurons'); });
    document.getElementById('closeShopBtn')?.addEventListener('click', () => document.getElementById('shopPanel').classList.remove('show'));
    document.getElementById('buyAllBtn')?.addEventListener('click', buyAllAvailable);
    document.getElementById('boostBtn')?.addEventListener('click', buyBoost);
    document.getElementById('autoclickerBtn')?.addEventListener('click', buyAutoclicker);
    document.getElementById('dailyGiftBtn')?.addEventListener('click', claimDailyGift);
    document.getElementById('rouletteBtn')?.addEventListener('click', openRoulette);
    document.getElementById('rouletteSpinBtn')?.addEventListener('click', spinRoulette);
    document.getElementById('rouletteCloseBtn')?.addEventListener('click', () => document.getElementById('rouletteOverlay')?.classList.remove('show'));
    document.getElementById('leaderboardBtn')?.addEventListener('click', showLeaderboard);
    
    document.getElementById('achBtn')?.addEventListener('click', () => { renderAchievements(); document.getElementById('achOverlay')?.classList.add('show'); });
    document.getElementById('achCloseBtn')?.addEventListener('click', () => document.getElementById('achOverlay')?.classList.remove('show'));
    document.getElementById('factCloseBtn')?.addEventListener('click', () => document.getElementById('factOverlay')?.classList.remove('show'));
    document.getElementById('settingsBtn')?.addEventListener('click', () => document.getElementById('settingsModal').classList.add('show'));
    document.getElementById('closeSettings')?.addEventListener('click', () => document.getElementById('settingsModal').classList.remove('show'));
    document.getElementById('resetGameBtn')?.addEventListener('click', () => { if (confirm("Сбросить всё? / Reset all?")) { localStorage.clear(); location.reload(); } });
    document.getElementById('newsBtn')?.addEventListener('click', () => document.getElementById('newsModal').classList.add('show'));
    document.getElementById('closeNewsBtn')?.addEventListener('click', () => document.getElementById('newsModal').classList.remove('show'));

    document.getElementById('langRu')?.addEventListener('click', () => setLanguage('ru'));
    document.getElementById('langEn')?.addEventListener('click', () => setLanguage('en'));
    document.getElementById('setLangRu')?.addEventListener('click', () => setLanguage('ru'));
    document.getElementById('setLangEn')?.addEventListener('click', () => setLanguage('en'));

    document.querySelectorAll('.color-btn').forEach(btn => btn.addEventListener('click', () => { applyButtonColor(btn.dataset.color); showToast(`🎨 ${btn.dataset.color}`); }));
    document.querySelectorAll('.shop-tab').forEach(tab => tab.addEventListener('click', () => switchShopTab(tab.dataset.tab)));

    document.getElementById('openTasksBtn')?.addEventListener('click', () => { renderTasksList(); document.getElementById('passTasksModal').classList.add('show'); });
    document.getElementById('closeTasksBtn')?.addEventListener('click', () => document.getElementById('passTasksModal').classList.remove('show'));

    document.getElementById('exportSaveBtn')?.addEventListener('click', exportProgress);
    document.getElementById('importSaveBtn')?.addEventListener('click', () => importInput.click());
    document.getElementById('promoBtn')?.addEventListener('click', () => document.getElementById('promoModal').classList.add('show'));
    document.getElementById('closePromoBtn')?.addEventListener('click', () => document.getElementById('promoModal').classList.remove('show'));
    document.getElementById('shareBtn')?.addEventListener('click', shareProgress);

    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            const el = document.documentElement; const isFull = document.fullscreenElement || document.webkitFullscreenElement;
            if (!isFull) { if (el.requestFullscreen) el.requestFullscreen(); else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen(); fullscreenBtn.innerText = t('off'); showToast("⛶ " + t('fullscreen')); }
            else { if (document.exitFullscreen) document.exitFullscreen(); else if (document.webkitExitFullscreen) document.webkitExitFullscreen(); fullscreenBtn.innerText = t('on'); showToast("⛶ " + t('fullscreen')); }
        });
    }

    const promoCodes = {}; for (let i = 1; i <= 100; i++) promoCodes[`code${i}`] = { points: 100 + i * 5, stars: 1 + Math.floor(i / 10) };
    promoCodes['dima'] = { points: 500, stars: 10 }; promoCodes['dima god'] = { points: 5000, stars: 100 }; promoCodes['start'] = { points: 100, stars: 5 };
    promoCodes['neural'] = { points: 1000, stars: 50 }; promoCodes['evolution'] = { points: 2000, stars: 100 }; promoCodes['prestige'] = { points: 10000, stars: 200 };
    promoCodes['legend'] = { points: 20000, stars: 500 }; promoCodes['pass8'] = { points: 8000, stars: 80 }; promoCodes['halloween'] = { points: 6666, stars: 66 };
    promoCodes['newyear'] = { points: 7777, stars: 77 }; promoCodes['robot'] = { points: 9999, stars: 99 }; promoCodes['hacker'] = { points: 11111, stars: 111 };
    promoCodes['pumpkin'] = { points: 8888, stars: 88 }; promoCodes['birthday'] = { points: 17000, stars: 170 }; promoCodes['march8'] = { points: 8000, stars: 80 };

    document.getElementById('activatePromoBtn')?.addEventListener('click', () => {
        const code = document.getElementById('promoInput').value.toLowerCase().trim();
        if (promoCodes[code]) {
            const promo = promoCodes[code]; points += promo.points; stars += promo.stars; totalStarsEarned += promo.stars;
            updateUI(); saveGame(); showToast(t('promo_ok')); document.getElementById('promoInput').value = ''; document.getElementById('promoModal').classList.remove('show');
        } else showToast(t('promo_bad'));
    });

    document.getElementById('soundToggleBtn')?.addEventListener('click', () => {
        currentSoundProfile = (currentSoundProfile + 1) % soundProfiles.length;
        document.getElementById('soundToggleBtn').innerText = `${t('sound_toggle')} (${soundProfiles[currentSoundProfile].name})`;
        saveGame(); showToast(`🔊 ${soundProfiles[currentSoundProfile].name}`);
    });

    function moveEyes(e) {
        const x = e.touches ? e.touches[0].clientX : e.clientX, y = e.touches ? e.touches[0].clientY : e.clientY;
        document.querySelectorAll('.pupil').forEach(p => {
            const rect = p.parentElement.parentElement.getBoundingClientRect();
            const dx = x - (rect.left + rect.width / 2), dy = y - (rect.top + rect.height / 2);
            const ang = Math.atan2(dy, dx), dist = Math.min(4, Math.hypot(dx, dy) / 20);
            p.style.transform = `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px)`;
        });
    }
    document.addEventListener('mousemove', moveEyes); document.addEventListener('touchmove', moveEyes);

    let reloadSeconds = 300;
    setInterval(() => {
        if (reloadSeconds > 0) {
            reloadSeconds--; const el = document.getElementById('reloadCountdown');
            if (el) el.innerText = `${Math.floor(reloadSeconds / 60)}:${(reloadSeconds % 60).toString().padStart(2, '0')}`;
            if (reloadSeconds === 0) { showToast(t('reload_toast')); setTimeout(() => location.reload(), 2000); }
        }
    }, 1000);
    setInterval(saveGame, 5000);

    // ===== АДМИН ПАНЕЛЬ =====
    let adminPasswordBuffer = '';
    function openAdminPasswordPanel() { adminPasswordBuffer = ''; document.getElementById('adminPasswordInput').value = ''; document.getElementById('adminPasswordOverlay')?.classList.add('show'); }
    function closeAdminPasswordPanel() { adminPasswordBuffer = ''; document.getElementById('adminPasswordInput').value = ''; document.getElementById('adminPasswordOverlay')?.classList.remove('show'); }
    document.querySelectorAll('.admin-key').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.key;
            if (key === 'clear') adminPasswordBuffer = adminPasswordBuffer.slice(0, -1);
            else if (key === 'ok') {
                if (adminPasswordBuffer === ADMIN_PASSWORD) { closeAdminPasswordPanel(); setTimeout(() => openAdminPanel(), 200); }
                else { showToast(t('admin_wrong_pass')); adminPasswordBuffer = ''; }
            } else if (adminPasswordBuffer.length < 8) adminPasswordBuffer += key;
            document.getElementById('adminPasswordInput').value = '•'.repeat(adminPasswordBuffer.length);
        });
    });
    document.getElementById('adminPasswordCancel')?.addEventListener('click', closeAdminPasswordPanel);

    let adminCurrentTab = 'game';
    function renderAdminBody() {
        const body = document.getElementById('adminBody'); if (!body) return;
        if (adminCurrentTab === 'game') {
            body.innerHTML = `
                <div class="admin-item"><span>Дать очков:</span><input type="number" id="admPointsInput" class="admin-input" placeholder="1000"></div>
                <div class="admin-item"><span></span><button id="admPoints">Дать</button></div>
                <div class="admin-item"><span>Дать звёзд:</span><input type="number" id="admStarsInput" class="admin-input" placeholder="100"></div>
                <div class="admin-item"><span></span><button id="admStars">Дать</button></div>
                <div class="admin-item"><span>Купить все нейросети</span><button id="admBuyAll">Купить</button></div>
                <div class="admin-item"><span>Секретный Босс</span><button id="admBoss">Спавн</button></div>
                <div class="admin-item"><span>Сбросить прогресс</span><button id="admReset">Сброс</button></div>
            `;
            document.getElementById('admPoints').onclick = () => { const v = parseInt(document.getElementById('admPointsInput').value) || 1000; points += v; updateUI(); saveGame(); showToast(`+${formatNumber(v)}🧠`); };
            document.getElementById('admStars').onclick = () => { const v = parseInt(document.getElementById('admStarsInput').value) || 100; stars += v; totalStarsEarned += v; updateUI(); saveGame(); showToast(`+${formatNumber(v)}⭐`); };
            document.getElementById('admBuyAll').onclick = () => { upgrades.forEach((u) => { if (!u.purchased) { u.purchased = true; purchasedCount++; } }); updateUI(); renderShopNeurons(); saveGame(); showToast(t('all_neurons')); };
            document.getElementById('admBoss').onclick = () => { spawnBoss(); showToast('🐛 Босс заспавнен!'); };
            document.getElementById('admReset').onclick = () => { if (confirm("Сброс?")) { localStorage.clear(); location.reload(); } };
        }
    }
    function openAdminPanel() {
        const overlay = document.getElementById('adminOverlay'); if (!overlay) return;
        adminCurrentTab = 'game'; document.querySelectorAll('.admin-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'game'));
        renderAdminBody(); overlay.classList.add('show');
    }
    const versionEl = document.getElementById('menuVersion');
    if (versionEl) { versionEl.style.cursor = 'pointer'; versionEl.addEventListener('click', openAdminPasswordPanel); }
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => { document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active')); tab.classList.add('active'); adminCurrentTab = tab.dataset.tab; renderAdminBody(); });
    });
    document.getElementById('adminCloseBtn')?.addEventListener('click', () => document.getElementById('adminOverlay')?.classList.remove('show'));
    document.getElementById('adminOverlay')?.addEventListener('click', (e) => { if (e.target.id === 'adminOverlay') document.getElementById('adminOverlay').classList.remove('show'); });

    applyTranslations();
    loadGame();
    checkDailyFact();
});
