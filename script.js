// ===== ВЕРСИЯ =====
const GAME_VERSION = "12.5";
const ADMIN_PASSWORD = "6769";

// ===== ЯЗЫК =====
const TRANSLATIONS = {
    ru: {
        loading: "ЗАГРУЗКА...",
        title: "🧠 КЛИКЕР: ЭВОЛЮЦИЯ НЕЙРОСЕТЕЙ",
        halloween_title: "🎃 КЛИКЕР: ХЭЛЛОУИН НЕЙРОСЕТЕЙ",
        newyear_title: "🎄 КЛИКЕР: НОВОГОДНЯЯ ЭВОЛЮЦИЯ",
        hacker_title: "> КЛИКЕР: ЭВОЛЮЦИЯ НЕЙРОСЕТЕЙ _",
        birthday_title: "🎂 КЛИКЕР: ЭВОЛЮЦИЯ НЕЙРОСЕТЕЙ🎉",
        march8_title: "🌷 КЛИКЕР: ЭВОЛЮЦИЯ НЕЙРОСЕТЕЙ🌸",
        play: "🎮 ИГРАТЬ",
        settings: "⚙️ НАСТРОЙКИ",
        news: "📢 НОВОСТИ",
        share: "📤 ПОДЕЛИТЬСЯ",
        min: "мин",
        stat_total_clicks: "Всего кликов",
        stat_neurons: "Нейросетей",
        stat_session: "За сессию",
        reload: "🔄 ПЕРЕЗАГРУЗКА:",
        halloween_reload: "⏳ ДО ХЭЛЛОУИНА:",
        newyear_reload: "🎄 НОВЫЙ ГОД:",
        hacker_reload: "> ПЕРЕЗАГРУЗКА:",
        birthday_reload: "🎂 ДЕНЬ РОЖДЕНИЯ:",
        march8_reload: "🌷 8 МАРТА:",
        sleep: "😴 Спишь?",
        halloween_sleep: "🎃 Страшно?",
        newyear_sleep: "❄️ С Новым Годом!",
        birthday_sleep: "🎉 С днём рождения!",
        march8_sleep: "🌸 С 8 марта!",
        combo: "🔥 x2 КОМБО!",
        boost: "⚡ БУСТ X5 — 20⭐",
        boost_active: "⚡ X5 АКТИВЕН —",
        open_tasks: "📋 ОТКРЫТЬ ЗАДАНИЯ",
        shop_neurons: "🧠 НЕЙРОСЕТИ",
        shop_stars: "⭐ ЗВЁЗДЫ",
        buy_all: "💰 КУПИТЬ ВСЁ ДОСТУПНОЕ",
        close: "ЗАКРЫТЬ",
        back_menu: "◀ МЕНЮ",
        shop: "🛒 МАГАЗИН",
        autosave: "💾 автосохранение",
        yes: "Да", no: "Нет", ok: "ПОНЯЛ",
        robot1: ": Привет я робот !<br>Я вижу ты тут впервые ?",
        robot2: ": Нажми на мозг !",
        tutorial_text: "Потом пролистай вниз и нажми<br>магазин , потом купи любую<br>нейросеть (нажми на неё)",
        conv1: "Ваши алмазы конвертированы в звёзды",
        conv2: "Алмазы полностью удалены",
        settings_title: "⚙️ НАСТРОЙКИ",
        bg_choose: "🌄 Выбор фона",
        bg_early: "Ранняя осень", bg_golden: "Золотая", bg_rainy: "Дождливая", bg_late: "Поздняя",
        bg_forest: "Лес", bg_park: "Парк", bg_mountains: "Горы", bg_village: "Деревня",
        btn_color: "🎨 Цвет кнопок",
        save_progress: "💾 Сохранить прогресс",
        download_json: "Скачать JSON",
        load_progress: "📂 Загрузить прогресс",
        choose_file: "Выбрать файл",
        promo: "🎫 Промокоды", open: "Открыть",
        sound: "🔊 Звук клика", sound_toggle: "Сменить",
        fullscreen: "⛶ Полный экран", on: "Включить", off: "Выключить",
        language: "🌐 Язык / Language",
        reset_all: "⚠️ СБРОСИТЬ ВСЁ",
        promo_title: "🎫 ПРОМОКОД", activate: "АКТИВИРОВАТЬ",
        news_title: "📢 НОВОСТИ",
        news_text: "v12.5: Метеорит 📢, таймер бустов ⏱️, ивенты 8 марта 🌷 и День рождения 🎂.",
        pass_no_active: "✨ НЕТ АКТИВНОГО ПАССА ✨",
        pass_tasks_title: "ЗАДАНИЯ",
        level: "Уровень", clicks_done: "кликов",
        done: "✅ ВЫПОЛНЕНО", claim: "ЗАБРАТЬ",
        lock_first: "🔒 Сначала пройди уровень",
        until_end: "До конца AI Pass",
        days: "дн.", hours: "ч.", minutes: "мин.",
        pass_finished: "ЗАВЕРШЁН!",
        soon: "скоро",
        need_stars: "Нужно", need_points: "Нужно",
        bought: "куплена!", not_enough: "❌ Не хватает очков",
        boost_already: "⚡ Буст уже активен",
        boost_activated: "⚡ БУСТ X5 АКТИВЕН (5 минут)!",
        boost_ended: "⏳ Буст закончился",
        promo_ok: "✅ Промокод активирован!", promo_bad: "❌ Неверный код",
        star_got: "⭐ ЗВЁЗДЫ! +3", candy_got: "🍬 КОНФЕТЫ! +3", snowflake_got: "❄️ СНЕЖИНКИ! +3",
        triple_click: "⚡ ТРОЙНОЙ КЛИК! x3!",
        banned: "🌚 Ты забанен на", banned_min: "минут",
        ban_lifted: "✅ Бан снят. Не повторяй.",
        copied: "✅ Прогресс скопирован!",
        saved: "💾 Прогресс сохранён!",
        loaded: "📂 Загружено! Перезагружаю...",
        load_error: "❌ Ошибка загрузки",
        reload_toast: "Перезагрузка...",
        bought_count: "Куплено сетей",
        all_neurons: "Все нейросети куплены!",
        all_passes: "Все AI Pass открыты!",
        god_on: "БОГ ВКЛ", god_off: "БОГ ВЫКЛ",
        points_given: "+1000 очков", stars_given: "+100 звёзд",
        soon_feature: "⏳ Скоро появится!",
        task_claimed: "Уровень", task_received: "получен!",
        pass_reward: "Награда AI Pass",
        fact_title: "ФАКТ ДНЯ",
        roulette_no_stars: "❌ Нужно 50⭐",
        roulette_win: "🎉 ВЫИГРЫШ",
        roulette_spinning: "🎲 КРУТИТСЯ...",
        roulette_spin: "🎲 КРУТИТЬ",
        first_page: "⏮ НАЧАЛО", last_page: "КОНЕЦ ⏭",
        prev_page: "⬅️ НАЗАД", next_page: "ВПЕРЁД ➡️",
        test_ok: "✅ ТЕСТ OK!",
        risk: "🎲 РИСК — 50/50",
        risk_win: "🎉 УДАЧА! x2!",
        risk_lose: "💀 ПРОВАЛ! -50%",
        risk_no_points: "❌ Нужно минимум 100🧠",
        prestige: "🌟 ПРЕСТИЖ",
        prestige_level: "Уровень:",
        prestige_bonus: "Бонус:",
        prestige_need: "Нужно:",
        prestige_warning: "⚠️ Прогресс сбросится: очки и сети. Звёзды останутся.",
        prestige_yes: "ДА, ПРЕСТИЖ!",
        prestige_done: "🌟 ПРЕСТИЖ! Уровень",
        prestige_not_enough: "❌ Нужно 100 000 000 🧠",
        prestige_confirm: "Точно престиж? Очки и сети сбросятся!",
        offline_title: "С ВОЗВРАЩЕНИЕМ!",
        offline_text: "Пока тебя не было, накапало:",
        offline_capped: "(максимум 8 часов)",
        admin_wrong_pass: "❌ Неверный пароль!",
        admin_enter_pass: "🔐 Введите пароль:",
        editor_on: "🎨 Редактор включён! Кликай по элементам",
        editor_off: "🎨 Редактор выключен",
        editor_saved: "💾 Раскладка сохранена!",
        editor_reset: "🔄 Раскладка сброшена!",
        editor_added: "➕ Новая кнопка создана!",
        editor_deleted: "🗑️ Элемент удалён!",
        meteor_win: "📢 МЕТЕОРИТ! +",
        birthday_boost: "🎂 БУСТ X10! (день рождения)",
        march8_boost: "🌷 БУСТ X15! (8 марта)",
        event_boost_start: "🎉 Ивентовый буст активирован!"
    },
    en: {
        loading: "LOADING...",
        title: "🧠 CLICKER: NEURAL EVOLUTION",
        halloween_title: "🎃 CLICKER: HALLOWEEN NEURAL",
        newyear_title: "🎄 CLICKER: NEW YEAR EVOLUTION",
        hacker_title: "> CLICKER: NEURAL EVOLUTION _",
        birthday_title: "🎂 CLICKER: GAME BIRTHDAY 🎉",
        march8_title: "🌷 CLICKER: MARCH 8 🌸",
        play: "🎮 PLAY", settings: "⚙️ SETTINGS", news: "📢 NEWS", share: "📤 SHARE",
        min: "min",
        stat_total_clicks: "Total clicks", stat_neurons: "Neurons", stat_session: "Session",
        reload: "🔄 RELOAD:", halloween_reload: "⏳ TO HALLOWEEN:", newyear_reload: "🎄 NEW YEAR:", hacker_reload: "> RELOAD:",
        birthday_reload: "🎂 BIRTHDAY:", march8_reload: "🌷 MARCH 8:",
        sleep: "😴 Sleeping?", halloween_sleep: "🎃 Scared?", newyear_sleep: "❄️ Happy New Year!",
        birthday_sleep: "🎉 Happy birthday!", march8_sleep: "🌸 Happy March 8!",
        combo: "🔥 x2 COMBO!", boost: "⚡ BOOST X5 — 20⭐", boost_active: "⚡ X5 ACTIVE —",
        open_tasks: "📋 OPEN TASKS",
        shop_neurons: "🧠 NEURONS", shop_stars: "⭐ STARS",
        buy_all: "💰 BUY ALL AVAILABLE", close: "CLOSE",
        back_menu: "◀ MENU", shop: "🛒 SHOP", autosave: "💾 autosave",
        yes: "Yes", no: "No", ok: "GOT IT",
        robot1: ": Hi I'm a robot !<br>I see you're new here?",
        robot2: ": Tap the brain!",
        tutorial_text: "Then scroll down and tap<br>shop, then buy any<br>neuron (tap it)",
        conv1: "Your diamonds converted to stars", conv2: "Diamonds fully removed",
        settings_title: "⚙️ SETTINGS",
        bg_choose: "🌄 Background",
        bg_early: "Early autumn", bg_golden: "Golden", bg_rainy: "Rainy", bg_late: "Late autumn",
        bg_forest: "Forest", bg_park: "Park", bg_mountains: "Mountains", bg_village: "Village",
        btn_color: "🎨 Button color",
        save_progress: "💾 Save progress", download_json: "Download JSON",
        load_progress: "📂 Load progress", choose_file: "Choose file",
        promo: "🎫 Promo codes", open: "Open",
        sound: "🔊 Click sound", sound_toggle: "Change",
        fullscreen: "⛶ Fullscreen", on: "Enable", off: "Disable",
        language: "🌐 Language / Язык", reset_all: "⚠️ RESET ALL",
        promo_title: "🎫 PROMO CODE", activate: "ACTIVATE",
        news_title: "📢 NEWS",
        news_text: "v12.5: Meteor 📢, boost timer ⏱️, March 8 🌷 and Birthday 🎂 events.",
        pass_no_active: "✨ NO ACTIVE PASS ✨",
        pass_tasks_title: "TASKS",
        level: "Level", clicks_done: "clicks",
        done: "✅ DONE", claim: "CLAIM",
        lock_first: "🔒 Complete level first",
        until_end: "Until AI Pass",
        days: "d", hours: "h", minutes: "m",
        pass_finished: "FINISHED!", soon: "soon",
        need_stars: "Need", need_points: "Need",
        bought: "bought!", not_enough: "❌ Not enough points",
        boost_already: "⚡ Boost already active",
        boost_activated: "⚡ BOOST X5 ACTIVE (5 min)!",
        boost_ended: "⏳ Boost ended",
        promo_ok: "✅ Promo activated!", promo_bad: "❌ Invalid code",
        star_got: "⭐ STARS! +3", candy_got: "🍬 CANDY! +3", snowflake_got: "❄️ SNOWFLAKES! +3",
        triple_click: "⚡ TRIPLE CLICK! x3!",
        banned: "🌚 You are banned for", banned_min: "min",
        ban_lifted: "✅ Ban lifted. Don't repeat.",
        copied: "✅ Progress copied!", saved: "💾 Progress saved!",
        loaded: "📂 Loaded! Reloading...", load_error: "❌ Load error",
        reload_toast: "Reloading...",
        bought_count: "Bought neurons",
        all_neurons: "All neurons bought!", all_passes: "All AI Passes opened!",
        god_on: "GOD ON", god_off: "GOD OFF",
        points_given: "+1000 points", stars_given: "+100 stars",
        soon_feature: "⏳ Coming soon!",
        task_claimed: "Level", task_received: "received!",
        pass_reward: "AI Pass reward", fact_title: "FACT OF THE DAY",
        roulette_no_stars: "❌ Need 50⭐", roulette_win: "🎉 YOU WON",
        roulette_spinning: "🎲 SPINNING...", roulette_spin: "🎲 SPIN",
        first_page: "⏮ FIRST", last_page: "LAST ⏭",
        prev_page: "⬅️ BACK", next_page: "NEXT ➡️",
        test_ok: "✅ TEST OK!",
        risk: "🎲 RISK — 50/50",
        risk_win: "🎉 LUCKY! x2!",
        risk_lose: "💀 FAIL! -50%",
        risk_no_points: "❌ Need at least 100🧠",
        prestige: "🌟 PRESTIGE",
        prestige_level: "Level:",
        prestige_bonus: "Bonus:",
        prestige_need: "Need:",
        prestige_warning: "⚠️ Progress will reset: points and neurons. Stars stay.",
        prestige_yes: "YES, PRESTIGE!",
        prestige_done: "🌟 PRESTIGE! Level",
        prestige_not_enough: "❌ Need 100 000 000 🧠",
        prestige_confirm: "Confirm prestige? Points and neurons reset!",
        offline_title: "WELCOME BACK!",
        offline_text: "While you were away, you earned:",
        offline_capped: "(max 8 hours)",
        admin_wrong_pass: "❌ Wrong password!",
        admin_enter_pass: "🔐 Enter password:",
        editor_on: "🎨 Editor ON! Click on elements",
        editor_off: "🎨 Editor OFF",
        editor_saved: "💾 Layout saved!",
        editor_reset: "🔄 Layout reset!",
        editor_added: "➕ New button created!",
        editor_deleted: "🗑️ Element deleted!",
        meteor_win: "📢 METEOR! +",
        birthday_boost: "🎂 BOOST X10! (birthday)",
        march8_boost: "🌷 BOOST X15! (March 8)",
        event_boost_start: "🎉 Event boost activated!"
    }
};

let currentLang = localStorage.getItem('gameLang') || 'ru';
function t(key) {
    return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || TRANSLATIONS.ru[key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        el.innerText = t(key);
    });
    const r1 = document.getElementById('robotText1');
    if (r1) r1.innerHTML = t('robot1');
    const r2 = document.getElementById('robotText2');
    if (r2) r2.innerHTML = t('robot2');
    const tt = document.getElementById('tutorialText');
    if (tt) tt.innerHTML = t('tutorial_text');
    if (typeof updateBoostUI === 'function') updateBoostUI();
    if (typeof applyPassStyle === 'function') applyPassStyle();
    if (typeof applyTheme === 'function') applyTheme();
    if (typeof updatePassEndTimer === 'function') updatePassEndTimer();
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
    document.querySelectorAll('#setLangRu, #setLangEn').forEach(btn => {
        const isRu = btn.id === 'setLangRu';
        const isActive = (isRu && currentLang === 'ru') || (!isRu && currentLang === 'en');
        btn.classList.toggle('active', isActive);
    });
}

function setLanguage(lang) {
    if (lang !== 'ru' && lang !== 'en') return;
    currentLang = lang;
    localStorage.setItem('gameLang', lang);
    applyTranslations();
    if (typeof showToast === 'function') {
        showToast(lang === 'ru' ? "✅ Язык: Русский" : "✅ Language: English");
    }
}

// ===== ФАКТЫ =====
const FACTS = {
    ru: [
        "Первый перцептрон создан в 1958 году Фрэнком Розенблаттом.",
        "Название «нейросеть» появилось в 1940-х годах.",
        "ChatGPT обучался на 570 ГБ текста.",
        "Человеческий мозг содержит около 86 миллиардов нейронов.",
        "GPT расшифровывается как Generative Pre-trained Transformer.",
        "Нейросети умеют распознавать лица лучше людей.",
        "AlphaGo победила чемпиона мира по го в 2016 году.",
        "Термин «искусственный интеллект» придуман в 1956 году.",
        "DALL-E создаёт картинки по текстовому описанию.",
        "Нейросети используются в медицине для диагностики рака.",
        "Первый ИИ-чатбот ELIZA создан в 1966 году.",
        "Tesla использует нейросети для автопилота.",
        "Midjourney — одна из самых популярных нейросетей для рисования.",
        "Нейросети могут предсказывать погоду точнее человека.",
        "Siri и Alexa работают на нейросетях.",
        "Обучение большой нейросети может стоить миллионы долларов.",
        "Нейросети помогают находить новые лекарства.",
        "Трансформеры — это архитектура, а не только фильм.",
        "GPT-3 содержит 175 миллиардов параметров.",
        "Нейросеть может обыграть человека в покер.",
        "Компьютерное зрение используется в дронах.",
        "Нейросети пишут музыку и стихи.",
        "Yandex тоже разрабатывает свои нейросети.",
        "Первая нейросеть называлась «перцептрон».",
        "ИИ помогает переводить редкие языки.",
        "Голосовые помощники используют нейросети.",
        "Нейросети могут генерировать видео.",
        "ИИ учится на миллионах примеров.",
        "Роботы-пылесосы используют нейросети для навигации.",
        "Нейросети помогают в космических исследованиях."
    ],
    en: [
        "The first perceptron was created in 1958 by Frank Rosenblatt.",
        "The term 'neural network' appeared in the 1940s.",
        "ChatGPT was trained on 570 GB of text.",
        "The human brain contains about 86 billion neurons.",
        "GPT stands for Generative Pre-trained Transformer.",
        "Neural networks can recognize faces better than humans.",
        "AlphaGo beat the world Go champion in 2016.",
        "The term 'artificial intelligence' was coined in 1956.",
        "DALL-E creates images from text descriptions.",
        "Neural networks are used in medicine for cancer diagnosis.",
        "The first AI chatbot ELIZA was created in 1966.",
        "Tesla uses neural networks for autopilot.",
        "Midjourney is one of the most popular image AIs.",
        "Neural networks can predict weather better than humans.",
        "Siri and Alexa run on neural networks.",
        "Training a large neural network can cost millions.",
        "Neural networks help find new drugs.",
        "Transformers are an architecture, not just a movie.",
        "GPT-3 has 175 billion parameters.",
        "A neural network can beat humans at poker.",
        "Computer vision is used in drones.",
        "Neural networks write music and poetry.",
        "Yandex also develops its own neural networks.",
        "The first neural network was called 'perceptron'.",
        "AI helps translate rare languages.",
        "Voice assistants use neural networks.",
        "Neural networks can generate video.",
        "AI learns from millions of examples.",
        "Robot vacuums use neural networks for navigation.",
        "Neural networks help in space exploration."
    ]
};

function getFactOfDay() {
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    const facts = FACTS[currentLang];
    return facts[dayOfYear % facts.length];
}

function checkDailyFact() {
    const today = new Date().toISOString().slice(0, 10);
    const lastShown = localStorage.getItem('factShownDate');
    if (lastShown !== today) {
        localStorage.setItem('factShownDate', today);
        const factText = document.getElementById('factText');
        if (factText) factText.innerText = getFactOfDay();
        const factOverlay = document.getElementById('factOverlay');
        if (factOverlay) setTimeout(() => factOverlay.classList.add('show'), 2500);
    }
}

let _pendingDiamondConversion = 0;
(function captureOldDiamonds() {
    const s = localStorage.getItem('neuralEvoSave');
    if (s) {
        try {
            const d = JSON.parse(s);
            if (d.stars !== undefined) return;
            if (d.diamonds && d.diamonds > 0) {
                _pendingDiamondConversion = d.diamonds;
            }
        } catch(e) {}
    }
})();

if (localStorage.getItem('gameVersion') !== GAME_VERSION) {
    localStorage.removeItem('neuralEvoSave');
    localStorage.removeItem('aiPassSeason');
    localStorage.removeItem('banEnd');
    localStorage.setItem('gameVersion', GAME_VERSION);
}

function isHalloween() {
    const now = new Date();
    const m = now.getMonth();
    const d = now.getDate();
    return m === 9 && d >= 5 && d <= 31;
}
function isNewYear() {
    const now = new Date();
    const m = now.getMonth();
    const d = now.getDate();
    return (m === 11 && d === 31) || (m === 0 && d === 1);
}
function isHackerMode() {
    const now = Date.now();
    const start = Date.UTC(2026, 8, 28, 21, 0, 0);
    const end = Date.UTC(2026, 9, 4, 21, 0, 0);
    return now >= start && now <= end;
}
function isBirthday() {
    const now = new Date();
    return now.getMonth() === 2 && now.getDate() === 17;
}
function isMarch8() {
    const now = new Date();
    return now.getMonth() === 2 && now.getDate() === 8;
}

function applyTheme() {
    const body = document.body;
    const brain = document.getElementById('clickableObject');
    const brainEmoji = document.getElementById('brainEmoji');
    const starLabel = document.getElementById('starLabel');
    const sleepMsg = document.getElementById('sleepMsg');
    const reloadTimer = document.getElementById('reloadTimer');
    const title = document.getElementById('gameTitle');
    const partyHat = document.getElementById('partyHat');
    const flowerDecor = document.getElementById('flowerDecor');
    const brainSpeech = document.getElementById('brainSpeech');

    body.classList.remove('bg-halloween', 'bg-newyear', 'bg-hacker', 'bg-birthday', 'bg-march8');
    body.classList.remove('bg-early-autumn', 'bg-golden', 'bg-rainy', 'bg-late', 'bg-forest', 'bg-park', 'bg-mountains', 'bg-village');
    if (brain) brain.classList.remove('halloween-brain', 'newyear-brain', 'birthday-brain', 'march8-brain');
    const oldHat = brain ? brain.querySelector('.santa-hat') : null;
    if (oldHat) oldHat.remove();
    if (partyHat) partyHat.style.display = 'none';
    if (flowerDecor) flowerDecor.style.display = 'none';
    if (brainSpeech) brainSpeech.style.display = 'none';

    if (isBirthday()) {
        body.classList.add('bg-birthday');
        if (brain) brain.classList.add('birthday-brain');
        if (brainEmoji) brainEmoji.innerText = '🎂';
        if (partyHat) partyHat.style.display = 'block';
        if (starLabel) starLabel.innerHTML = '⭐ <span id="stars">' + (window.__stars || 0) + '</span>';
        if (sleepMsg) sleepMsg.innerText = t('birthday_sleep');
        if (reloadTimer) reloadTimer.innerHTML = t('birthday_reload') + ' <span id="reloadCountdown">5:00</span>';
        if (title) title.innerText = t('birthday_title');
    } else if (isMarch8()) {
        body.classList.add('bg-march8');
        if (brain) brain.classList.add('march8-brain');
        if (brainEmoji) brainEmoji.innerText = '🧠';
        if (flowerDecor) flowerDecor.style.display = 'block';
        if (brainSpeech) brainSpeech.style.display = 'block';
        if (starLabel) starLabel.innerHTML = '⭐ <span id="stars">' + (window.__stars || 0) + '</span>';
        if (sleepMsg) sleepMsg.innerText = t('march8_sleep');
        if (reloadTimer) reloadTimer.innerHTML = t('march8_reload') + ' <span id="reloadCountdown">5:00</span>';
        if (title) title.innerText = t('march8_title');
    } else if (isHalloween()) {
        body.classList.add('bg-halloween');
        if (brain) brain.classList.add('halloween-brain');
        if (brainEmoji) brainEmoji.innerText = '🎃';
        if (starLabel) starLabel.innerHTML = '🍬 <span id="stars">' + (window.__stars || 0) + '</span>';
        if (sleepMsg) sleepMsg.innerText = t('halloween_sleep');
        if (reloadTimer) reloadTimer.innerHTML = t('halloween_reload') + ' <span id="reloadCountdown">5:00</span>';
        if (title) title.innerText = t('halloween_title');
    } else if (isNewYear()) {
        body.classList.add('bg-newyear');
        if (brain) {
            brain.classList.add('newyear-brain');
            const hat = document.createElement('span');
            hat.className = 'santa-hat';
            hat.innerText = '🎅';
            brain.appendChild(hat);
        }
        if (brainEmoji) brainEmoji.innerText = '🧠';
        if (starLabel) starLabel.innerHTML = '❄️ <span id="stars">' + (window.__stars || 0) + '</span>';
        if (sleepMsg) sleepMsg.innerText = t('newyear_sleep');
        if (reloadTimer) reloadTimer.innerHTML = t('newyear_reload') + ' <span id="reloadCountdown">5:00</span>';
        if (title) title.innerText = t('newyear_title');
    } else if (isHackerMode()) {
        body.classList.add('bg-hacker');
        if (brainEmoji) brainEmoji.innerText = '🧠';
        if (starLabel) starLabel.innerHTML = '⭐ <span id="stars">' + (window.__stars || 0) + '</span>';
        if (sleepMsg) sleepMsg.innerText = t('sleep');
        if (reloadTimer) reloadTimer.innerHTML = t('hacker_reload') + ' <span id="reloadCountdown">5:00</span> _';
        if (title) title.innerText = t('hacker_title');
    } else {
        const savedBg = localStorage.getItem('selectedBg') || 'early_autumn';
        const bgThemes = {
            early_autumn: "bg-early-autumn", golden: "bg-golden", rainy: "bg-rainy",
            late: "bg-late", forest: "bg-forest", park: "bg-park",
            mountains: "bg-mountains", village: "bg-village"
        };
        body.classList.add(bgThemes[savedBg] || 'bg-early-autumn');
        if (brainEmoji) brainEmoji.innerText = '🧠';
        if (starLabel) starLabel.innerHTML = '⭐ <span id="stars">' + (window.__stars || 0) + '</span>';
        if (sleepMsg) sleepMsg.innerText = t('sleep');
        if (reloadTimer) reloadTimer.innerHTML = t('reload') + ' <span id="reloadCountdown">5:00</span>';
        if (title) title.innerText = t('title');
    }
}

function applyButtonColor(color) {
    document.body.classList.remove('btn-blue', 'btn-green', 'btn-red', 'btn-purple', 'btn-gold');
    if (color && color !== 'blue') document.body.classList.add('btn-' + color);
    localStorage.setItem('btnColor', color || 'blue');
    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.color === (color || 'blue'));
    });
}

window.addEventListener('load', () => {
    setTimeout(() => {
        const ls = document.getElementById('loadingScreen');
        if (ls) ls.classList.add('hidden');
    }, 1500);

    document.getElementById('menuVersion').innerText = `v${GAME_VERSION}`;

    const badWords = ["дима лох","дима тупой","дима дурак","дима еблан","дима долбаеб","разработчик лох","разработчик тупой","разработчик дурак","разработчик еблан","разработчик уебан"];
    let isBanned = false;
    let banTimer = null;
    const BAN_DURATION = 20 * 60 * 1000;

    function checkBan(code) {
        const lower = code.toLowerCase().trim();
        for (let word of badWords) if (lower.includes(word)) return true;
        return false;
    }
    function activateBan() {
        if (isBanned) return;
        const banEnd = Date.now() + BAN_DURATION;
        localStorage.setItem('banEnd', banEnd);
        applyBanState();
    }
    function applyBanState() {
        const banEnd = parseInt(localStorage.getItem('banEnd'));
        if (banEnd && Date.now() < banEnd) {
            isBanned = true;
            document.body.style.filter = "grayscale(1) brightness(0.5)";
            document.body.style.pointerEvents = "none";
            const remaining = Math.ceil((banEnd - Date.now()) / 1000);
            showToast(`${t('banned')} ${Math.ceil(remaining / 60)} ${t('banned_min')}`);
            if (banTimer) clearTimeout(banTimer);
            banTimer = setTimeout(() => {
                localStorage.removeItem('banEnd');
                isBanned = false;
                document.body.style.filter = "";
                document.body.style.pointerEvents = "";
                showToast(t('ban_lifted'));
            }, banEnd - Date.now());
        } else {
            localStorage.removeItem('banEnd');
            isBanned = false;
            document.body.style.filter = "";
            document.body.style.pointerEvents = "";
        }
    }

    let points = 10, stars = 0, totalClicks = 0, purchasedCount = 1;
    let totalStarsEarned = 0, sessionClicks = 0;
    let godMode = false, comboCounter = 0;
    let gameStartTime = Date.now();
    let playtimeInterval = null, sleepMsgTimer = null, sleepMsgShowing = false;
    let prestigeLevel = 0, lastSaveTime = Date.now();
    let riskChance = 0.5;

    const PRESTIGE_REQUIREMENT = 100000000;
    const PRESTIGE_BONUS_PER_LEVEL = 0.1;
    const OFFLINE_MAX_HOURS = 8;
    const OFFLINE_RATE = 0.3;

    const BOOST_MULTIPLIER = 5, BOOST_PRICE = 20, BOOST_DURATION = 5 * 60 * 1000;
    let boostEndTime = 0, boostInterval = null;

    const BIRTHDAY_BOOST_MULT = 10;
    const BIRTHDAY_BOOST_DURATION = (60 * 3600 + 10 * 60 + 10) * 1000;
    let birthdayBoostEndTime = 0;

    const MARCH8_BOOST_MULT = 15;
    const MARCH8_BOOST_DURATION = 70 * 3600 * 1000;
    let march8BoostEndTime = 0;

    const ROULETTE_PRICE = 50;
    let rouletteSpinning = false;

    Object.defineProperty(window, '__stars', { get: () => stars });

    const neuralNames = [
        "Перцептрон","Нейро-искра","Сверточная","Рекуррентная","Трансформер","Квантовая","GPT-клик","Автокодировщик","DALL-E","Глубокий мозг","Gemini","Нейро-интерфейс","Claude 3","Мультивселенная","Midjourney","Легендарная","Сингулярность","Божественный ИИ","Нейро-Земля","ИИ-Солнце","Галактическая","Космическая","Сверхразум","ДНК-бота","Бесконечность",
        "Лев","Тигр","Медведь","Волк","Лиса","Орёл","Сокол","Дельфин","Кит","Акула","Пантера","Ягуар","Леопард","Гепард","Зебра","Жираф","Слон","Носорог","Бегемот","Крокодил","Питон","Анаконда","Хамелеон","Игуана","Фламинго","Пингвин","Сова","Ястреб","Скорпион","Паук",
        "Пицца","Бургер","Суши","Роллы","Рамен","Паста","Спагетти","Лазанья","Тирамису","Панна-котта","Крем-брюле","Макаронс","Эклер","Пончик","Круассан","Багет","Сыр","Ветчина","Колбаса","Бекон","Стейк","Гриль","Барбекю","Шашлык","Плов","Борщ","Оливье","Сельдь","Икра","Блины",
        "Меркурий","Венера","Земля","Марс","Юпитер","Сатурн","Уран","Нептун","Плутон","Церера","Эрида","Макемаке","Хаумеа","Седна","Орк","Иксион","Варуна","Квавар","Фобос","Деймос","Ио","Европа","Ганимед","Каллисто","Титан","Рея","Япет","Мимас","Энцелад","Тритон",
        "Mario","Link","Samus","Kirby","Fox","Pikachu","Charizard","Mewtwo","Cloud","Sephiroth","Sonic","Tails","Knuckles","Shadow","Master Chief","Cortana","Doom","Ryu","Ken","Chun-Li","Kratos","Atreus","Lara","Nathan","Ezio","Altair","Gordon","Freeman","Chell","Wheatley",
        "Кремний","Процессор","Видеокарта","Оперативка","SSD","Материнка","Блок-питания","Кулер","Монитор","Клавиатура","Мышь","Принтер","Сканер","Микрофон","Колонки","Наушники","Роутер","Модем","Сервер","Ноутбук","Планшет","Смартфон","Часы","Фитнес-браслет","Дрон","Робот","Андроид","iOS","Windows","Linux",
        "Врач","Учитель","Инженер","Повар","Пилот","Космонавт","Полицейский","Пожарный","Программист","Учёный",
        "Россия","Япония","Китай","США","Германия","Франция","Италия","Испания","Бразилия","Канада",
        "Матрица","Терминатор","Начало","Аватар","Интерстеллар","Дюна","Бэтмен","Супермен","Человек-паук","Железный человек",
        "Рок","Джаз","Поп","Хип-хоп","Классика","Электроника","Рэп","Регги","Блюз","Металл",
        "Футбол","Баскетбол","Теннис","Хоккей","Бокс","Плавание","Бег","Шахматы","Сёрфинг","Сноуборд",
        "Физика","Химия","Биология","Математика","Астрономия","Геология","Медицина","Психология","Генетика","Кибернетика",
        "Египет","Рим","Греция","Викинги","Самураи","Рыцари","Пираты","Инки","Ацтеки","Майя",
        "Киберпанк","Сингулярность","Гиперпространство","Телепорт","Голо-ИИ","Квантовый ПК","Нейро-линк","Био-чип","Антигравитация","Варп-двигатель",
        "Магия","Волшебство","Заклинание","Зелье","Артефакт","Руна","Портал","Гримуар","Алхимия","Некромантия",
        "Радость","Грусть","Страх","Гнев","Спокойствие","Любовь","Надежда","Восторг","Удивление","Скука",
        "Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",
        "Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье",
        "Весна","Лето","Осень","Зима",
        "Секунда","Минута","Час","День","Неделя","Месяц","Год","Век","Тысячелетие",
        "Красный","Оранжевый","Жёлтый","Зелёный","Голубой","Синий","Фиолетовый","Розовый","Коричневый","Чёрный","Белый","Серый",
        "Алмаз","Рубин","Изумруд","Сапфир","Топаз","Аметист","Опал","Жемчуг","Коралл","Янтарь",
        "Меч","Щит","Лук","Копьё","Топор","Молот","Кинжал","Посох","Арбалет","Праща",
        "Дракон","Единорог","Феникс","Грифон","Пегас","Кентавр","Минотавр","Горгона","Гидра","Химера",
        "Волшебник","Ведьма","Рыцарь","Король","Королева","Принц","Принцесса","Драконоборец","Паладин","Варвар",
        "Гарри Поттер","Гэндальф","Фродо","Леголас","Гимли","Арагорн","Саурон","Дарт Вейдер","Йода","Люк",
        "Кофе","Чай","Какао","Сок","Лимонад","Молоко","Вода","Квас","Компот","Морс",
        "Торт","Пирог","Печенье","Конфета","Шоколад","Мармелад","Зефир","Халва","Вафли","Пряник",
        "Молоток","Отвёртка","Гаечный ключ","Плоскогубцы","Пила","Рубанок","Дрель","Шуруповёрт","Напильник","Стамеска",
        "Самолёт","Вертолёт","Ракета","Корабль","Подлодка","Поезд","Машина","Мотоцикл","Велосипед","Танк",
        "Собака","Кошка","Попугай","Хомяк","Кролик","Черепаха","Рыбка","Хорёк","Шиншилла","Морская свинка",
        "Банан","Яблоко","Груша","Апельсин","Мандарин","Лимон","Виноград","Арбуз","Дыня","Ананас",
        "Кактус","Роза","Тюльпан","Ромашка","Подсолнух","Лилия","Орхидея","Пион","Нарцисс","Ландыш",
        "Книга","Тетрадь","Ручка","Карандаш","Ластик","Линейка","Циркуль","Клей","Ножницы","Маркер",
        "Гитара","Пианино","Скрипка","Барабан","Флейта","Труба","Саксофон","Арфа","Виолончель","Орган",
        "Пирамида","Сфинкс","Колизей","Парфенон","Стоунхендж","Тадж-Махал","Эйфелева башня","Статуя Свободы","Кремль","Биг-Бен",
        "Золото","Серебро","Бронза","Платина","Медь","Железо","Сталь","Титан","Алюминий","Никель",
        "Смелость","Хитрость","Мудрость","Сила","Ловкость","Скорость","Точность","Харизма","Интуиция","Удача",
        "Молния","Гром","Дождь","Снег","Град","Туман","Ветер","Ураган","Смерч","Цунами",
        "Луна","Солнце","Звезда","Комета","Астероид","Метеорит","Туманность","Чёрная дыра","Галактика","Вселенная",
        "Добро","Зло","Свет","Тьма","Жизнь","Смерть","Время","Пространство","Судьба","Случай",
        "Число 1","Число 2","Число 3","Число 7","Число 13","Число 42","Число 100","Число 1000","Число 0","Бесконечность",
        "Пи","Эйлера число","Золотое сечение","Фрактал","Мандала","Лабиринт","Спираль","Круг","Квадрат","Треугольник",
        "Альфа","Бета","Гамма","Дельта","Эпсилон","Дзета","Эта","Тета","Йота","Каппа",
        "Лямбда","Мю","Ню","Кси","Омикрон","Пи-буква","Ро","Сигма","Тау","Ипсилон",
        "Фи","Хи","Пси","Омега","Зет","Дубль-вэ","Игрек","Икс","Кью","Зед",
        "0.1","0.5","1.5","2.5","3.14","6.28","9.81","100%","1%","0%",
        "Ноль","Единица","Двойка","Тройка","Четвёрка","Пятёрка","Шестёрка","Семёрка","Восьмёрка","Девятка",
        "Десятка","Сотня","Тысяча","Миллион","Миллиард","Триллион","Квадриллион","Квинтиллион","Секстиллион","Гугол",
        "Феникс","Единорог","Дракон","Грифон","Химера","Цербер","Гарпия","Сфинкс","Минотавр","Циклоп",
        "Атлант","Титан","Гигант","Карлик","Эльф","Гном","Хоббит","Орк","Гоблин","Тролль",
        "Вампир","Оборотень","Зомби","Призрак","Скелет","Мумия","Демон","Ангел","Джинн","Фея",
        "Йети","Лох-Несс","Чупакабра","Бигфут","Снежный человек","Кракен","Левиафан","Василиск","Саламандра","Феникс",
        "Шерлок","Вагнер","Моцарт","Бетховен","Бах","Чайковский","Пушкин","Толстой","Достоевский","Лермонтов",
        "Эйнштейн","Ньютон","Тесла","Эдисон","Дарвин","Менделеев","Ломоносов","Королёв","Гагарин","Кюри",
        "Пифагор","Архимед","Платон","Сократ","Аристотель","Гиппократ","Геродот","Евклид","Птолемей","Коперник",
        "Молния-1","Молния-2","Молния-3","Искра","Пламя","Ледник","Ураган","Смерч","Тайфун","Шторм",
        "Огонь","Вода","Земля","Воздух","Металл","Дерево","Лёд","Пар","Пыль","Песок",
        "Радуга","Северное сияние","Затмение","Закат","Рассвет","Полночь","Полдень","Утро","Вечер","Ночь",
        "Куб","Шар","Цилиндр","Конус","Пирамида","Призма","Сфера","Тор","Мёбиус","Гиперкуб",
        "Точка","Линия","Плоскость","Угол","Дуга","Сектор","Отрезок","Луч","Вектор","Матрица",
        "Атом","Молекула","Электрон","Протон","Нейтрон","Кварк","Фотон","Нейтрино","Бозон","Глюон",
        "Клетка","ДНК","РНК","Белок","Ген","Хромосома","Митохондрия","Рибосома","Ядро","Мембрана",
        "Мозг","Сердце","Лёгкие","Печень","Почки","Желудок","Кишечник","Мышца","Кость","Кожа",
        "Глаз","Ухо","Нос","Язык","Рука","Нога","Палец","Зуб","Волос","Ноготь",
        "Восприятие","Внимание","Память","Мышление","Речь","Язык","Эмоция","Воля","Интеллект","Сознание",
        "Альфа-волны","Бета-волны","Гамма-волны","Дельта-волны","Тета-волны",
        "Сон","Бодрствование","Медитация","Гипноз","Транс","Грёзы","Мечта","Сон наяву",
        "Кристалл","Аметист","Кварц","Малахит","Обсидиан","Гранит","Мрамор","Базальт","Пемза","Лава",
        "Пещера","Ущелье","Каньон","Водопад","Гейзер","Вулкан","Гора","Холм","Долина","Пустыня",
        "Океан","Море","Озеро","Река","Ручей","Пруд","Болото","Залив","Пролив","Лагуна",
        "Остров","Полуостров","Архипелаг","Атолл","Риф","Берег","Пляж","Дюна","Скала","Утёс",
        "Лес","Роща","Тайга","Джунгли","Саванна","Степь","Тундра","Пустошь","Поле","Луг",
        "Апрель-2027","Май-2027","Июнь-2027","Июль-2027","Август-2027","Сентябрь-2027","Октябрь-2027","Ноябрь-2027","Декабрь-2027","Январь-2028",
        "Альфа-1","Альфа-2","Альфа-3","Бета-1","Бета-2","Бета-3","Гамма-1","Гамма-2","Гамма-3","Дельта-1",
        "Клон-1","Клон-2","Клон-3","Клон-4","Клон-5","Клон-6","Клон-7","Клон-8","Клон-9","Клон-10",
        "Эксперимент-1","Эксперимент-2","Эксперимент-3","Эксперимент-4","Эксперимент-5",
        "Прототип","Опытный образец","Тестовый образец","Серийный образец","Финальный образец",
        "Мега","Гига","Тера","Пета","Экса","Зетта","Йотта","Ронна","Кветта","Бесконечная",
        "Протон-Х","Электрон-Х","Нейтрон-Х","Фотон-Х","Кварк-Х","Бозон-Х","Глюон-Х","Нейтрино-Х","Мюон-Х","Тау-Х",
        "Квант-1","Квант-2","Квант-3","Квант-4","Квант-5","Квант-6","Квант-7","Квант-8","Квант-9","Квант-10",
        "Сингулярность-Х","Вечность-Х","Пустота-Х","Хаос-Х","Порядок-Х","Время-Х","Пространство-Х","Материя-Х","Энергия-Х","Информация-Х",
        "Лямбда-Х","Сигма-Х","Омега-Х","Дзета-Х","Тета-Х","Гамма-Х","Дельта-Х","Альфа-Х","Бета-Х","Эпсилон-Х"
    ];

    let upgrades = [];
    for (let i = 0; i < 1900; i++) {
        const power = i === 0 ? 1 : 1 + Math.floor(i / 10);
        const price = i === 0 ? 20 : Math.floor(20 * Math.pow(1.17, i));
        const name = i < neuralNames.length ? neuralNames[i] : `Нейросеть #${i + 1}`;
        upgrades.push({ id: i, name: name, power: power, price: price, purchased: i === 0 });
    }

    let currentPage = 0, ITEMS_PER_PAGE = 20, totalPages = Math.ceil(upgrades.length / ITEMS_PER_PAGE);

    function renderShopNeurons() {
        const start = currentPage * ITEMS_PER_PAGE, end = Math.min(start + ITEMS_PER_PAGE, upgrades.length);
        let html = '';
        if (totalPages > 1) {
            html += `<div class="pagination">`;
            html += `<button class="page-btn" id="firstPageBtn">${t('first_page')}</button>`;
            html += `<button class="page-btn" id="prevPageBtn">${t('prev_page')}</button>`;
            html += `<span>${currentPage+1}/${totalPages}</span>`;
            html += `<button class="page-btn" id="nextPageBtn">${t('next_page')}</button>`;
            html += `<button class="page-btn" id="lastPageBtn">${t('last_page')}</button>`;
            html += `</div>`;
        }
        for (let i = start; i < end; i++) {
            const u = upgrades[i];
            html += `<div class="shop-item" data-id="${u.id}"><span>${u.name} +${u.power}</span><span>${u.purchased ? '✅' : `💰 ${u.price}`}</span></div>`;
        }
        if (totalPages > 1) {
            html += `<div class="pagination">`;
            html += `<button class="page-btn" id="firstPageBtn2">${t('first_page')}</button>`;
            html += `<button class="page-btn" id="prevPageBtn2">${t('prev_page')}</button>`;
            html += `<span>${currentPage+1}/${totalPages}</span>`;
            html += `<button class="page-btn" id="nextPageBtn2">${t('next_page')}</button>`;
            html += `<button class="page-btn" id="lastPageBtn2">${t('last_page')}</button>`;
            html += `</div>`;
        }
        document.getElementById('shopNeurons').innerHTML = html;
        document.querySelectorAll('#shopNeurons .shop-item').forEach(el => {
            const id = parseInt(el.dataset.id);
            const u = upgrades[id];
            if (!u.purchased) el.addEventListener('click', () => buyUpgrade(id));
        });
        ['firstPageBtn', 'firstPageBtn2'].forEach(id => {
            document.getElementById(id)?.addEventListener('click', () => { currentPage = 0; renderShopNeurons(); });
        });
        ['lastPageBtn', 'lastPageBtn2'].forEach(id => {
            document.getElementById(id)?.addEventListener('click', () => { currentPage = totalPages - 1; renderShopNeurons(); });
        });
        ['prevPageBtn', 'prevPageBtn2'].forEach(id => {
            document.getElementById(id)?.addEventListener('click', () => { if (currentPage > 0) { currentPage--; renderShopNeurons(); } });
        });
        ['nextPageBtn', 'nextPageBtn2'].forEach(id => {
            document.getElementById(id)?.addEventListener('click', () => { if (currentPage < totalPages - 1) { currentPage++; renderShopNeurons(); } });
        });
    }

    function buyUpgrade(id) {
        const u = upgrades[id];
        if (!u.purchased && points >= u.price) {
            points -= u.price; u.purchased = true; purchasedCount++;
            updateUI(); renderShopNeurons(); saveGame();
            showToast(`✅ ${u.name} ${t('bought')}`); playBuySound();
        } else showToast(t('not_enough'));
    }

    function buyAllAvailable() {
        const list = upgrades.map((u, i) => ({ u, i })).filter(x => !x.u.purchased).sort((a, b) => a.u.price - b.u.price);
        let bought = 0;
        for (const item of list) {
            if (points >= item.u.price) { points -= item.u.price; item.u.purchased = true; bought++; }
            else break;
        }
        if (bought > 0) {
            purchasedCount = upgrades.filter(u => u.purchased).length;
            updateUI(); renderShopNeurons(); saveGame();
            showToast(`💰 ${t('bought_count')}: ${bought}!`); playBuySound();
        } else showToast(t('not_enough'));
    }

    const EXCHANGES = [
        { id: 'exNew', type: 'pointsToStars', cost: 10, reward: 1, label: '10🧠 = 1⭐' },
        { id: 'ex1', type: 'starsToPoints', cost: 100, reward: 10000000, label: '100⭐ = 10000000🧠' },
        { id: 'ex2', type: 'starsToPoints', cost: 90, reward: 1000000, label: '90⭐ = 1000000🧠' },
        { id: 'ex3', type: 'starsToPoints', cost: 50, reward: 100000, label: '50⭐ = 100000🧠' },
        { id: 'ex4', type: 'pointsToStars', cost: 1000000, reward: 100, label: '1000000🧠 = 100⭐' },
        { id: 'soon', type: 'soon', label: 'soon', disabled: true }
    ];

    function renderShopStars() {
        const container = document.getElementById('shopStars');
        if (!container) return;
        let html = '';
        EXCHANGES.forEach(ex => {
            const cls = ex.disabled ? 'exchange-item disabled' : 'exchange-item';
            const label = ex.disabled ? t('soon') : ex.label;
            html += `<div class="${cls}" data-ex="${ex.id}">${label}</div>`;
        });
        container.innerHTML = html;
        document.querySelectorAll('#shopStars .exchange-item').forEach(el => {
            const ex = EXCHANGES.find(e => e.id === el.dataset.ex);
            if (ex && !ex.disabled) {
                el.addEventListener('click', () => doExchange(ex));
            } else if (ex && ex.disabled) {
                el.addEventListener('click', () => showToast(t('soon_feature')));
            }
        });
    }

    function doExchange(ex) {
        if (isBanned) return;
        if (ex.type === 'starsToPoints') {
            if (stars < ex.cost) { showToast(`❌ ${t('need_stars')} ${ex.cost}⭐`); return; }
            stars -= ex.cost;
            points += ex.reward;
            updateUI(); saveGame();
            showToast(`✅ -${ex.cost}⭐ → +${ex.reward}🧠`);
            playBuySound();
        } else if (ex.type === 'pointsToStars') {
            if (points < ex.cost) { showToast(`❌ ${t('need_points')} ${ex.cost}🧠`); return; }
            points -= ex.cost;
            stars += ex.reward;
            totalStarsEarned += ex.reward;
            updateUI(); saveGame();
            showToast(`✅ -${ex.cost}🧠 → +${ex.reward}⭐`);
            playBuySound();
        }
    }

    function switchShopTab(tab) {
        const tabNeurons = document.querySelector('.shop-tab[data-tab="neurons"]');
        const tabStars = document.querySelector('.shop-tab[data-tab="stars"]');
        const listNeurons = document.getElementById('shopNeurons');
        const listStars = document.getElementById('shopStars');
        const buyAllBtn = document.getElementById('buyAllBtn');
        if (tab === 'stars') {
            if (tabNeurons) tabNeurons.classList.remove('active');
            if (tabStars) tabStars.classList.add('active');
            if (listNeurons) listNeurons.style.display = 'none';
            if (listStars) listStars.style.display = 'block';
            if (buyAllBtn) buyAllBtn.style.display = 'none';
            renderShopStars();
        } else {
            if (tabStars) tabStars.classList.remove('active');
            if (tabNeurons) tabNeurons.classList.add('active');
            if (listStars) listStars.style.display = 'none';
            if (listNeurons) listNeurons.style.display = 'block';
            if (buyAllBtn) buyAllBtn.style.display = '';
            renderShopNeurons();
        }
    }

    const ROULETTE_PRIZES = [
        { emoji: '💰', type: 'points', min: 500000, max: 5000000 },
        { emoji: '⭐', type: 'stars', min: 100, max: 500 },
        { emoji: '🧠', type: 'points', min: 1000000, max: 10000000 },
        { emoji: '🌟', type: 'stars', min: 50, max: 200 },
        { emoji: '⚡', type: 'boost', duration: 30 * 60 * 1000 },
        { emoji: '🎁', type: 'points', min: 100000, max: 1000000 },
        { emoji: '💥', type: 'points', min: 5000000, max: 20000000 },
        { emoji: '👑', type: 'stars', min: 500, max: 2000 }
    ];

    function openRoulette() {
        if (isBanned) return;
        document.getElementById('rouletteOverlay')?.classList.add('show');
    }

    function spinRoulette() {
        if (rouletteSpinning) return;
        if (stars < ROULETTE_PRICE) { showToast(t('roulette_no_stars')); return; }
        stars -= ROULETTE_PRICE;
        updateUI(); saveGame();

        rouletteSpinning = true;
        const spinBtn = document.getElementById('rouletteSpinBtn');
        if (spinBtn) { spinBtn.disabled = true; spinBtn.innerText = t('roulette_spinning'); }

        const slots = document.querySelectorAll('#rouletteWheel .roulette-slot');
        slots.forEach(s => s.classList.remove('win'));

        let counter = 0;
        const totalSpins = 20;
        const finalIdx = Math.floor(Math.random() * slots.length);

        const spinInterval = setInterval(() => {
            slots.forEach(s => s.classList.remove('win'));
            const idx = counter % slots.length;
            slots[idx].classList.add('win');
            counter++;
            playClickSound();
            if (counter >= totalSpins + finalIdx) {
                clearInterval(spinInterval);
                slots.forEach(s => s.classList.remove('win'));
                slots[finalIdx].classList.add('win');
                giveRoulettePrize(finalIdx);
                rouletteSpinning = false;
                if (spinBtn) { spinBtn.disabled = false; spinBtn.innerText = t('roulette_spin'); }
            }
        }, 80);
    }

    function giveRoulettePrize(idx) {
        const slot = document.querySelectorAll('#rouletteWheel .roulette-slot')[idx];
        const emoji = slot ? slot.innerText : '🎁';
        let prize = ROULETTE_PRIZES.find(p => p.emoji === emoji) || ROULETTE_PRIZES[0];
        let msg = '';

        if (prize.type === 'points') {
            const amount = Math.floor(prize.min + Math.random() * (prize.max - prize.min));
            points += amount;
            msg = `+${amount.toLocaleString()}🧠`;
        } else if (prize.type === 'stars') {
            const amount = Math.floor(prize.min + Math.random() * (prize.max - prize.min));
            stars += amount;
            totalStarsEarned += amount;
            msg = `+${amount}⭐`;
        } else if (prize.type === 'boost') {
            boostEndTime = Date.now() + prize.duration;
            updateBoostUI();
            msg = `⚡ Буст X5 на 30 минут!`;
        }

        updateUI(); saveGame();
        showToast(`${t('roulette_win')}: ${emoji} ${msg}`);
        playBuySound();
    }

    function isBoostActive() { return Date.now() < boostEndTime; }
    function getBoostRemaining() { return Math.max(0, boostEndTime - Date.now()); }
    function isBirthdayBoostActive() { return Date.now() < birthdayBoostEndTime; }
    function getBirthdayBoostRemaining() { return Math.max(0, birthdayBoostEndTime - Date.now()); }
    function isMarch8BoostActive() { return Date.now() < march8BoostEndTime; }
    function getMarch8BoostRemaining() { return Math.max(0, march8BoostEndTime - Date.now()); }

    function updateBoostUI() {
        const btn = document.getElementById('boostBtn');
        if (!btn) return;
        if (isBoostActive()) {
            const ms = getBoostRemaining();
            const m = Math.floor(ms / 60000);
            const s = Math.floor((ms % 60000) / 1000);
            btn.innerText = `${t('boost_active')} ${m}:${s.toString().padStart(2, '0')}`;
            btn.classList.add('active');
        } else {
            btn.innerText = t('boost');
            btn.classList.remove('active');
        }
        updateBoostTimersPanel();
    }

    function updateBoostTimersPanel() {
        const panel = document.getElementById('boostTimerPanel');
        if (!panel) return;
        let html = '';
        if (isBoostActive()) {
            const ms = getBoostRemaining();
            const h = Math.floor(ms / 3600000);
            const m = Math.floor((ms % 3600000) / 60000);
            const s = Math.floor((ms % 60000) / 1000);
            html += `<div class="boost-timer-item">⚡×5: ${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}</div>`;
        }
        if (isBirthdayBoostActive()) {
            const ms = getBirthdayBoostRemaining();
            const h = Math.floor(ms / 3600000);
            const m = Math.floor((ms % 3600000) / 60000);
            const s = Math.floor((ms % 60000) / 1000);
            html += `<div class="boost-timer-item">🎂×10: ${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}</div>`;
        }
        if (isMarch8BoostActive()) {
            const ms = getMarch8BoostRemaining();
            const h = Math.floor(ms / 3600000);
            const m = Math.floor((ms % 3600000) / 60000);
            const s = Math.floor((ms % 60000) / 1000);
            html += `<div class="boost-timer-item">🌷×15: ${h}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}</div>`;
        }
        panel.innerHTML = html;
    }

    function startBoostTimer() {
        if (boostInterval) clearInterval(boostInterval);
        updateBoostUI();
        boostInterval = setInterval(() => {
            if (isBoostActive() || isBirthdayBoostActive() || isMarch8BoostActive()) updateBoostTimersPanel();
            if (isBoostActive()) updateBoostUI();
            else {
                if (boostEndTime > 0) {
                    boostEndTime = 0;
                    showToast(t('boost_ended'));
                    updateUI();
                }
            }
        }, 1000);
    }
    function buyBoost() {
        if (isBanned) return;
        if (isBoostActive()) { showToast(t('boost_already')); return; }
        if (stars < BOOST_PRICE) { showToast(`❌ ${t('need_stars')} ${BOOST_PRICE}⭐`); return; }
        stars -= BOOST_PRICE;
        boostEndTime = Date.now() + BOOST_DURATION;
        updateUI(); updateBoostUI(); saveGame();
        showToast(t('boost_activated')); playBuySound();
    }

    // ===== МЕТЕОРИТ =====
    let meteorTimer = null;
    function startMeteorTimer() {
        if (meteorTimer) clearTimeout(meteorTimer);
        const delay = 60000 + Math.random() * 120000;
        meteorTimer = setTimeout(spawnMeteor, delay);
    }
    function spawnMeteor() {
        if (isBanned) { startMeteorTimer(); return; }
        const meteor = document.createElement('div');
        meteor.className = 'meteor';
        meteor.innerText = '📢';
        const startY = Math.random() * (window.innerHeight - 100);
        meteor.style.top = startY + 'px';
        meteor.style.left = '-100px';
        document.body.appendChild(meteor);
        meteor.addEventListener('click', () => {
            const reward = Math.floor(500 + Math.random() * 9500);
            points += reward;
            updateUI(); saveGame();
            showToast(`${t('meteor_win')}${reward}🧠`);
            playBuySound();
            meteor.remove();
            startMeteorTimer();
        });
        let pos = -100;
        const interval = setInterval(() => {
            pos += 6;
            meteor.style.left = pos + 'px';
            if (pos > window.innerWidth + 50) {
                clearInterval(interval);
                meteor.remove();
                startMeteorTimer();
            }
        }, 30);
    }

    function getPrestigeMultiplier() {
        return 1 + prestigeLevel * PRESTIGE_BONUS_PER_LEVEL;
    }

    function updatePrestigeDisplay() {
        const lvl = document.getElementById('prestigeLevelDisplay');
        const bns = document.getElementById('prestigeBonusDisplay');
        const need = document.getElementById('prestigeNeedDisplay');
        if (lvl) lvl.innerText = prestigeLevel;
        if (bns) bns.innerText = '+' + Math.round(prestigeLevel * PRESTIGE_BONUS_PER_LEVEL * 100) + '%';
        if (need) need.innerText = PRESTIGE_REQUIREMENT.toLocaleString() + ' 🧠';
    }

    function doPrestige() {
        if (points < PRESTIGE_REQUIREMENT) {
            showToast(t('prestige_not_enough'));
            return;
        }
        if (!confirm(t('prestige_confirm'))) return;
        prestigeLevel++;
        points = 10;
        purchasedCount = 1;
        upgrades.forEach((u, i) => { u.purchased = (i === 0); });
        updateUI(); renderShopNeurons(); updatePrestigeDisplay(); saveGame();
        showToast(`🌟 ${t('prestige_done')} ${prestigeLevel}!`);
        playBuySound();
        document.getElementById('prestigeModal')?.classList.remove('show');
    }

    function openPrestigeModal() {
        if (isBanned) return;
        updatePrestigeDisplay();
        document.getElementById('prestigeModal')?.classList.add('show');
    }

    function calculateOfflineIncome() {
        const now = Date.now();
        const awayMs = now - lastSaveTime;
        if (awayMs < 60000) return 0;
        const awaySec = Math.min(awayMs / 1000, OFFLINE_MAX_HOURS * 3600);
        const power = getClickPower();
        const income = Math.floor(power * awaySec * OFFLINE_RATE);
        return income > 0 ? income : 0;
    }

    function showOfflineReward(amount) {
        const reward = document.getElementById('offlineReward');
        if (reward) reward.innerText = '+' + amount.toLocaleString() + ' 🧠';
        const overlay = document.getElementById('offlineOverlay');
        if (overlay) overlay.classList.add('show');
    }

    // ===== AI PASS =====
    let passTasks = [], passCurrentTask = 0;
    const pass7StartDate = Date.UTC(2026, 8, 28, 21, 0, 0);
    const pass7EndDate = Date.UTC(2026, 9, 4, 21, 0, 0);
    const pass8StartDate = Date.UTC(2026, 9, 4, 21, 0, 0);
    const pass8EndDate = Date.UTC(2026, 9, 31, 20, 59, 59);
    let passEndTimerInterval = null, passRewardSeconds = 600, passRewardInterval = null;

    function getActivePassNumber() {
        const now = Date.now();
        if (now >= pass8StartDate && now <= pass8EndDate) return 8;
        if (now >= pass7StartDate && now <= pass7EndDate) return 7;
        return 0;
    }

    function getPassEndTime(season) {
        if (season === 8) return pass8EndDate;
        if (season === 7) return pass7EndDate;
        return 0;
    }

    function getPassRewardSeconds() {
        const num = getActivePassNumber();
        if (num === 8) return 1500;
        return 600;
    }
    function getPassRewardRewards() {
        const num = getActivePassNumber();
        if (num === 8) return { points: 20000, stars: 50 };
        if (num === 7) return { points: 15000, stars: 150 };
        return { points: 5000, stars: 50 };
    }

    function applyPassStyle() {
        const container = document.getElementById('passContainer');
        const title = document.getElementById('passTitle');
        const tasksTitle = document.getElementById('passTasksTitle');
        if (!container || !title) return;
        const num = getActivePassNumber();
        container.classList.remove('pass-v7', 'pass-v8');
        if (num === 8) {
            container.classList.add('pass-v8');
            title.innerHTML = '🎃 AI PASS 8 🎃';
            if (tasksTitle) tasksTitle.innerHTML = '🎃 ' + t('pass_tasks_title') + ' AI PASS 8 🎃';
        } else if (num === 7) {
            container.classList.add('pass-v7');
            title.innerHTML = '> AI PASS 7 _';
            if (tasksTitle) tasksTitle.innerHTML = '> ' + t('pass_tasks_title') + ' AI PASS 7 _';
        } else {
            title.innerHTML = t('pass_no_active');
            if (tasksTitle) tasksTitle.innerHTML = t('pass_no_active');
        }
    }

    function fillPassTasks(season) {
        passTasks = [];
        if (season === 8) {
            for (let i = 1; i <= 40; i++) {
                passTasks.push({ level: i, targetClicks: i * 500, rewardPoints: 20000, rewardStars: 50, completed: false, claimed: false });
            }
        } else if (season === 7) {
            for (let i = 1; i <= 30; i++) {
                let tc, rp, rs;
                if (i <= 10) { tc = i * 500; rp = i * 7000; rs = i * 70; }
                else if (i <= 20) { tc = i * 600; rp = i * 10000; rs = i * 100; }
                else { tc = i * 800; rp = i * 15000; rs = i * 150; }
                passTasks.push({ level: i, targetClicks: tc, rewardPoints: rp, rewardStars: rs, completed: false, claimed: false });
            }
        }
    }

    function initPassSeason(skipSave) {
        const activeSeason = getActivePassNumber();
        const savedSeason = parseInt(localStorage.getItem('aiPassSeason')) || 0;
        fillPassTasks(activeSeason);
        if (savedSeason !== activeSeason) {
            passCurrentTask = 0;
            passRewardSeconds = getPassRewardSeconds();
            localStorage.setItem('aiPassSeason', String(activeSeason));
            if (!skipSave) saveGame();
        }
    }

    function renderPassBadges() {
        const container = document.getElementById('passLevels');
        if (!container) return;
        let html = '';
        passTasks.forEach((task, idx) => {
            let cls = 'pass-badge', statusText = '';
            if (task.claimed) { cls += ' completed'; statusText = '✅'; }
            else if (idx === passCurrentTask) { cls += ' available'; statusText = '🎯'; }
            else if (idx < passCurrentTask) { cls += ' completed'; statusText = '✔'; }
            else { cls += ' locked'; statusText = '🔒'; }
            html += `<div class="${cls}">${task.level}<br>${statusText}</div>`;
        });
        container.innerHTML = html;
        const pf = document.getElementById('passProgressFill');
        if (pf) {
            const claimed = passTasks.filter(t => t.claimed).length;
            pf.style.width = (passTasks.length > 0 ? (claimed / passTasks.length) * 100 : 0) + '%';
        }
    }

    function updatePassRewardTimerDisplay() {
        const el = document.getElementById('passTimer');
        if (!el) return;
        const m = Math.floor(passRewardSeconds / 60);
        const s = passRewardSeconds % 60;
        el.innerHTML = `⏱️ ${m}:${s.toString().padStart(2, '0')}`;
    }
    function startPassRewardTimer() {
        if (passRewardInterval) clearInterval(passRewardInterval);
        updatePassRewardTimerDisplay();
        passRewardInterval = setInterval(() => {
            passRewardSeconds--;
            if (passRewardSeconds <= 0) {
                const num = getActivePassNumber();
                if (num > 0) {
                    const r = getPassRewardRewards();
                    points += r.points; stars += r.stars; totalStarsEarned += r.stars;
                    updateUI(); saveGame();
                    showToast(`🎁 ${t('pass_reward')} ${num}! +${r.points}🧠 +${r.stars}⭐`);
                    playBuySound();
                }
                passRewardSeconds = getPassRewardSeconds();
            }
            updatePassRewardTimerDisplay();
        }, 1000);
    }

    function renderTasksList() {
        const container = document.getElementById('tasksList');
        if (!container) return;
        let html = '';
        passTasks.forEach((task, idx) => {
            let cls = 'task-item', statusText = '', claimBtn = '';
            if (task.claimed) { cls += ' completed'; statusText = t('done'); }
            else if (idx === passCurrentTask) {
                cls += ' current';
                const progress = Math.min(totalClicks, task.targetClicks);
                const percent = Math.min(100, (progress / task.targetClicks) * 100);
                statusText = `${progress} / ${task.targetClicks} ${t('clicks_done')}`;
                if (totalClicks >= task.targetClicks) claimBtn = `<button class="task-claim-btn" data-idx="${idx}">${t('claim')}</button>`;
                html += `<div class="${cls}"><div class="task-header"><span class="task-level">🎯 ${t('level')} ${task.level}</span><span class="task-reward">+${task.rewardPoints}🧠 +${task.rewardStars}⭐</span></div><div class="task-desc">${task.targetClicks} ${t('clicks_done')}</div><div class="task-progress-bar"><div class="task-progress-fill" style="width:${percent}%"></div></div><div class="task-progress-text">${statusText}</div>${claimBtn}</div>`;
                return;
            } else if (idx < passCurrentTask) { cls += ' completed'; statusText = t('done'); }
            else statusText = `${t('lock_first')} ${idx}`;
            html += `<div class="${cls}"><div class="task-header"><span class="task-level">${idx === passCurrentTask ? '🎯' : '🔒'} ${t('level')} ${task.level}</span><span class="task-reward">+${task.rewardPoints}🧠 +${task.rewardStars}⭐</span></div><div class="task-desc">${task.targetClicks} ${t('clicks_done')}</div><div class="task-progress-text">${statusText}</div></div>`;
        });
        container.innerHTML = html;
        document.querySelectorAll('.task-claim-btn').forEach(btn => {
            btn.addEventListener('click', () => claimTask(parseInt(btn.dataset.idx)));
        });
    }

    function claimTask(idx) {
        const task = passTasks[idx];
        if (!task || task.claimed || idx !== passCurrentTask) return;
        if (totalClicks < task.targetClicks) return;
        task.claimed = true;
        points += task.rewardPoints; stars += task.rewardStars;
        totalStarsEarned += task.rewardStars; passCurrentTask++;
        updateUI(); renderPassBadges(); renderTasksList(); saveGame();
        showToast(`🎉 ${t('task_claimed')} ${task.level} ${t('task_received')}`); playBuySound();
    }

    function checkPassProgress() {
        const modal = document.getElementById('passTasksModal');
        if (modal && modal.classList.contains('show')) renderTasksList();
    }

    function updatePassEndTimer() {
        const el = document.getElementById('passEndTimer');
        if (!el) return;
        const num = getActivePassNumber();
        if (num === 0) { el.innerHTML = `⏳ ${t('pass_no_active')}`; return; }
        const now = Date.now();
        const endDate = getPassEndTime(num);
        const diff = endDate - now;
        if (diff <= 0) { el.innerHTML = `⏳ AI PASS ${num} ${t('pass_finished')}`; return; }
        const days = Math.floor(diff / 86400000);
        const hours = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        el.innerHTML = `⏳ ${t('until_end')} ${num}: ${days} ${t('days')} ${hours} ${t('hours')} ${minutes} ${t('minutes')}`;
    }
    function startPassEndTimer() {
        if (passEndTimerInterval) clearInterval(passEndTimerInterval);
        updatePassEndTimer();
        passEndTimerInterval = setInterval(updatePassEndTimer, 60000);
    }

    const soundProfiles = [
        { name: "Обычный", freq: 880, type: "sine" },
        { name: "Пиксельный", freq: 1200, type: "square" },
        { name: "Глубокий", freq: 440, type: "sawtooth" }
    ];
    let currentSoundProfile = 0;
    let audioCtx = null;
    let musicEnabled = localStorage.getItem('musicEnabled') === 'true';

    const HALLOWEEN_MELODY = [
        { note: 110.00, dur: 500 }, { note: 130.81, dur: 500 }, { note: 164.81, dur: 500 }, { note: 130.81, dur: 500 },
        { note: 110.00, dur: 700 }, { note: 98.00,  dur: 700 }, { note: 110.00, dur: 500 }, { note: 164.81, dur: 1000 },
        { note: 220.00, dur: 500 }, { note: 207.65, dur: 500 }, { note: 196.00, dur: 500 }, { note: 185.00, dur: 500 },
        { note: 174.61, dur: 500 }, { note: 164.81, dur: 700 }, { note: 110.00, dur: 700 }, { note: 82.41,  dur: 1500 }
    ];
    let halloweenMusicTimer = null;
    let halloweenMusicStep = 0;

    function initMusic() { if (audioCtx) return; try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {} }

    function playHalloweenNote(freq, duration) {
        if (!audioCtx) initMusic();
        if (!audioCtx) return;
        try {
            const osc1 = audioCtx.createOscillator();
            const osc2 = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc1.type = 'square';
            osc2.type = 'sine';
            osc1.frequency.value = freq;
            osc2.frequency.value = freq * 0.5;
            gain.gain.value = 0;
            gain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration / 1000);
            osc1.connect(gain);
            osc2.connect(gain);
            gain.connect(audioCtx.destination);
            osc1.start();
            osc2.start();
            osc1.stop(audioCtx.currentTime + duration / 1000);
            osc2.stop(audioCtx.currentTime + duration / 1000);
        } catch(e) {}
    }

    function startHalloweenMusic() {
        if (halloweenMusicTimer) return;
        if (!isHalloween()) return;
        if (!musicEnabled) return;
        halloweenMusicStep = 0;
        function loop() {
            if (!isHalloween() || !musicEnabled) {
                stopHalloweenMusic();
                return;
            }
            const step = HALLOWEEN_MELODY[halloweenMusicStep % HALLOWEEN_MELODY.length];
            playHalloweenNote(step.note, step.dur);
            halloweenMusicStep++;
            halloweenMusicTimer = setTimeout(loop, step.dur);
        }
        loop();
    }

    function stopHalloweenMusic() {
        if (halloweenMusicTimer) {
            clearTimeout(halloweenMusicTimer);
            halloweenMusicTimer = null;
        }
    }

    const musicBtn = document.getElementById('musicToggle');
    if (musicBtn) {
        musicBtn.innerText = musicEnabled ? '🔊' : '🔇';
        musicBtn.onclick = () => {
            musicEnabled = !musicEnabled;
            localStorage.setItem('musicEnabled', musicEnabled);
            musicBtn.innerText = musicEnabled ? '🔊' : '🔇';
            if (musicEnabled && isHalloween()) {
                startHalloweenMusic();
                showToast("🎃 Музыка Хэллоуина вкл!");
            } else {
                stopHalloweenMusic();
                if (isHalloween()) showToast("🔇 Музыка выкл");
            }
        };
    }
    document.querySelectorAll('.menu-btn').forEach((btn,i)=>{ btn.style.animationDelay=`${i*0.05}s`; });

    function spawnFloatText(x, y, text) {
        const el = document.createElement('div');
        el.className = 'float-text'; el.innerText = text;
        el.style.left = (x - 20) + 'px'; el.style.top = (y - 10) + 'px';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1000);
    }
    function updateStatsUI() {
        const a = document.getElementById('statTotalClicks');
        const b = document.getElementById('statNeuronsBought');
        const c = document.getElementById('statSessionClicks');
        if (a) a.innerText = totalClicks;
        if (b) b.innerText = purchasedCount;
        if (c) c.innerText = sessionClicks;
    }
    function updatePlaytime() {
        const el = document.getElementById('playtime');
        if (!el) return;
        const minutes = Math.floor((Date.now() - gameStartTime) / 1000 / 60);
        el.innerText = minutes >= 0 ? minutes : 0;
    }
    function startSleepMsgTimer() {
        if (sleepMsgTimer) clearTimeout(sleepMsgTimer);
        sleepMsgTimer = setTimeout(() => {
            if (!sleepMsgShowing) {
                sleepMsgShowing = true;
                document.getElementById('sleepMsg')?.classList.add('show');
            }
        }, 45000);
    }
    function hideSleepMsg() {
        if (sleepMsgTimer) clearTimeout(sleepMsgTimer);
        if (sleepMsgShowing) {
            sleepMsgShowing = false;
            document.getElementById('sleepMsg')?.classList.remove('show');
        }
        startSleepMsgTimer();
    }
    function shareProgress() {
        const num = getActivePassNumber();
        const text = `🧠 ${t('title')}:\n🧠 ${Math.floor(points)}\n⭐ ${stars}\n🖱️ ${totalClicks}\n🧬 ${purchasedCount}/${upgrades.length}\n🌟 Престиж: ${prestigeLevel}\n🤖 AI Pass ${num}: ${passTasks.filter(t=>t.claimed).length}/${passTasks.length}\n📅 ${GAME_VERSION}`;
        navigator.clipboard.writeText(text);
        showToast(t('copied'));
    }
    function getClickPower() {
        let base = 1;
        upgrades.forEach(u => { if (u.purchased) base += u.power; });
        if (godMode) base *= 10;
        if (isBoostActive()) base *= BOOST_MULTIPLIER;
        if (isBirthdayBoostActive()) base *= BIRTHDAY_BOOST_MULT;
        if (isMarch8BoostActive()) base *= MARCH8_BOOST_MULT;
        base *= getPrestigeMultiplier();
        return Math.floor(base);
    }
    function updateUI() {
        if (isBanned) return;
        const p = document.getElementById('points');
        const pw = document.getElementById('power');
        const ch = document.getElementById('clickHint');
        const st = document.getElementById('stars');
        if (p) p.innerText = Math.floor(points);
        if (pw) pw.innerText = getClickPower();
        if (ch) ch.innerHTML = godMode ? `+${getClickPower()} (БОГ)` : `+${getClickPower()}`;
        if (st) st.innerText = stars;
        updateStatsUI(); updatePlaytime();
        document.getElementById('comboText')?.classList.remove('show');
        checkPassProgress();
    }
    function showToast(msg) {
        const t2 = document.createElement('div');
        t2.className = 'toast'; t2.innerText = msg;
        document.body.appendChild(t2);
        setTimeout(() => t2.remove(), 2500);
    }
    function saveGame() {
        lastSaveTime = Date.now();
        const save = {
            points, stars, totalClicks, purchasedCount,
            totalStarsEarned, godMode, comboCounter, prestigeLevel, riskChance,
            birthdayBoostEndTime, march8BoostEndTime,
            upgrades: upgrades.map(u => ({ purchased: u.purchased })),
            passTasks: passTasks.map(t => ({ claimed: t.claimed, completed: t.completed })),
            passCurrentTask, passRewardSeconds,
            passSeason: localStorage.getItem('aiPassSeason') || '0',
            boostEndTime, gameStartTime, currentSoundProfile, gameVersion: GAME_VERSION,
            lastSaveTime
        };
        localStorage.setItem('neuralEvoSave', JSON.stringify(save));
    }
    function loadGame() {
        initPassSeason(true);
        const activeSeason = localStorage.getItem('aiPassSeason') || '0';
        let _showAnim = false, _oldDiamondsForAnim = 0;
        const saved = localStorage.getItem('neuralEvoSave');
        if (saved) {
            try {
                const d = JSON.parse(saved);
                points = d.points || 10;
                if (d.stars !== undefined) stars = d.stars;
                else if (d.diamonds !== undefined) {
                    stars = Math.floor(d.diamonds / 10);
                    if (d.diamonds > 0) { _showAnim = true; _oldDiamondsForAnim = d.diamonds; }
                } else stars = 0;
                totalClicks = d.totalClicks || 0;
                purchasedCount = d.purchasedCount || 1;
                totalStarsEarned = d.totalStarsEarned || d.totalDiamondsEarned || 0;
                godMode = d.godMode || false;
                comboCounter = d.comboCounter || 0;
                prestigeLevel = d.prestigeLevel || 0;
                riskChance = d.riskChance !== undefined ? d.riskChance : 0.5;
                boostEndTime = d.boostEndTime || 0;
                birthdayBoostEndTime = d.birthdayBoostEndTime || 0;
                march8BoostEndTime = d.march8BoostEndTime || 0;
                if (d.lastSaveTime) lastSaveTime = d.lastSaveTime;
                if (d.upgrades) d.upgrades.forEach((data, i) => { if (upgrades[i]) upgrades[i].purchased = data.purchased; });
                if (String(d.passSeason) === String(activeSeason) && d.passTasks) {
                    d.passTasks.forEach((data, i) => {
                        if (passTasks[i]) { passTasks[i].claimed = data.claimed; passTasks[i].completed = data.completed; }
                    });
                    if (d.passCurrentTask !== undefined) passCurrentTask = d.passCurrentTask;
                    if (d.passRewardSeconds !== undefined) passRewardSeconds = d.passRewardSeconds;
                }
                if (d.gameStartTime) gameStartTime = d.gameStartTime;
                if (d.currentSoundProfile !== undefined) currentSoundProfile = d.currentSoundProfile;
                purchasedCount = upgrades.filter(u => u.purchased).length;
            } catch(e) {}
        } else if (_pendingDiamondConversion > 0) {
            stars = Math.floor(_pendingDiamondConversion / 10);
            _showAnim = true; _oldDiamondsForAnim = _pendingDiamondConversion;
        }
        updateUI(); renderShopNeurons(); renderPassBadges(); renderTasksList(); updateStatsUI();
        startPassEndTimer(); startPassRewardTimer(); startBoostTimer();
        if (playtimeInterval) clearInterval(playtimeInterval);
        playtimeInterval = setInterval(() => updatePlaytime(), 60000);
        startSleepMsgTimer();
        startMeteorTimer();
        applyBanState(); applyTheme(); applyPassStyle();
        const savedColor = localStorage.getItem('btnColor') || 'blue';
        applyButtonColor(savedColor);
        if (_showAnim && !localStorage.getItem('diamondConverted')) {
            localStorage.setItem('diamondConverted', 'true');
            saveGame();
            setTimeout(() => showDiamondRemoval(), 1900);
        }
        updatePrestigeDisplay();
        const offlineIncome = calculateOfflineIncome();
        if (offlineIncome > 0) {
            points += offlineIncome;
            setTimeout(() => showOfflineReward(offlineIncome), 2600);
            saveGame();
            updateUI();
        }
        loadEditorLayout();
        // Активация ивентовых бустов
        if (isBirthday() && !isBirthdayBoostActive() && !localStorage.getItem('birthdayBoostUsed_' + new Date().toDateString())) {
            birthdayBoostEndTime = Date.now() + BIRTHDAY_BOOST_DURATION;
            localStorage.setItem('birthdayBoostUsed_' + new Date().toDateString(), 'true');
            setTimeout(() => showToast(t('birthday_boost')), 3000);
            saveGame();
        }
        if (isMarch8() && !isMarch8BoostActive() && !localStorage.getItem('march8BoostUsed_' + new Date().toDateString())) {
            march8BoostEndTime = Date.now() + MARCH8_BOOST_DURATION;
            localStorage.setItem('march8BoostUsed_' + new Date().toDateString(), 'true');
            setTimeout(() => showToast(t('march8_boost')), 3000);
            saveGame();
        }
    }
    function showDiamondRemoval() {
        const overlay = document.getElementById('diamondRemovalOverlay');
        const step1 = document.getElementById('diamondStep1');
        const step2 = document.getElementById('diamondStep2');
        const diamond = document.getElementById('drDiamond');
        if (!overlay || !step1 || !step2) return;
        overlay.classList.add('show');
        step1.classList.remove('hidden'); step2.classList.add('hidden');
        if (diamond) diamond.classList.remove('dr-diamond-moving');
        setTimeout(() => { if (diamond) diamond.classList.add('dr-diamond-moving'); }, 500);
        setTimeout(() => { step1.classList.add('hidden'); step2.classList.remove('hidden'); }, 2200);
    }
    document.getElementById('diamondRemovalOk')?.addEventListener('click', () => {
        document.getElementById('diamondRemovalOverlay')?.classList.remove('show');
    });

    document.getElementById('offlineOkBtn')?.addEventListener('click', () => {
        document.getElementById('offlineOverlay')?.classList.remove('show');
    });

    function exportProgress() {
        saveGame();
        const saved = localStorage.getItem('neuralEvoSave');
        let saveData = {};
        if (saved) { try { saveData = JSON.parse(saved); } catch(e) {} }
        saveData.gameVersion = GAME_VERSION;
        saveData.exportDate = new Date().toISOString();
        const blob = new Blob([JSON.stringify(saveData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "neural_evolution_save.json"; a.click();
        URL.revokeObjectURL(url);
        showToast(t('saved'));
    }
    function importProgress(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                data.gameVersion = GAME_VERSION;
                localStorage.setItem('neuralEvoSave', JSON.stringify(data));
                showToast(t('loaded'));
                setTimeout(() => location.reload(), 1000);
            } catch(error) { showToast(t('load_error')); }
        };
        reader.readAsText(file);
    }
    const importInput = document.createElement('input');
    importInput.type = 'file'; importInput.accept = '.json';
    importInput.onchange = (e) => { if (e.target.files[0]) importProgress(e.target.files[0]); };

    const bgThemes = { early_autumn: "bg-early-autumn", golden: "bg-golden", rainy: "bg-rainy", late: "bg-late", forest: "bg-forest", park: "bg-park", mountains: "bg-mountains", village: "bg-village" };
    function setBodyBg(theme) {
        if (isHalloween() || isNewYear() || isHackerMode() || isBirthday() || isMarch8()) { applyTheme(); return; }
        document.body.className = '';
        document.body.classList.add(bgThemes[theme] || 'bg-early-autumn');
        const savedColor = localStorage.getItem('btnColor') || 'blue';
        applyButtonColor(savedColor);
        localStorage.setItem('selectedBg', theme);
    }
    const savedBg = localStorage.getItem('selectedBg');
    if (savedBg && bgThemes[savedBg] && !isHalloween() && !isNewYear() && !isHackerMode() && !isBirthday() && !isMarch8()) setBodyBg(savedBg);
    else applyTheme();

    function processSingleClick(gain, x, y) {
        if (isBanned) return;
        if (isHalloween() && musicEnabled && !halloweenMusicTimer) startHalloweenMusic();
        hideSleepMsg();
        comboCounter++;
        let finalGain = gain;
        if (comboCounter % 5 === 0) {
            finalGain = gain * 2;
            const comboText = document.getElementById('comboText');
            if (comboText) {
                comboText.innerText = t('combo');
                comboText.classList.add('show');
                setTimeout(() => comboText.classList.remove('show'), 800);
            }
            spawnFloatText(x, y - 40, "🔥 x2!");
        }
        if (Math.random() < 0.02) {
            finalGain = finalGain * 3;
            spawnFloatText(x, y - 40, "⚡ x3!");
            showToast(t('triple_click')); playBuySound();
        }
        points += finalGain; totalClicks++; sessionClicks++; playClickSound();
        if (Math.random() < 0.001) {
            stars += 3; totalStarsEarned += 3;
            if (isHalloween()) showToast(t('candy_got'));
            else if (isNewYear()) showToast(t('snowflake_got'));
            else showToast(t('star_got'));
            playBuySound();
            spawnFloatText(x, y - 30, isHalloween() ? "🍬🍬🍬" : (isNewYear() ? "❄️❄️❄️" : "⭐⭐⭐"));
        }
    }
    function handleMultiTouch(e) {
        e.preventDefault();
        if (isBanned) return;
        const gain = getClickPower();
        for (let i = 0; i < e.touches.length; i++) processSingleClick(gain, e.touches[i].clientX, e.touches[i].clientY);
        const brain = document.getElementById('clickableObject');
        brain.style.transform = 'scale(0.92)';
        setTimeout(() => brain.style.transform = '', 120);
        updateUI(); saveGame();
    }
    function handleMouseClick(e) {
        e.preventDefault();
        if (isBanned) return;
        const gain = getClickPower();
        processSingleClick(gain, e.clientX, e.clientY);
        const brain = document.getElementById('clickableObject');
        brain.style.transform = 'scale(0.92)';
        setTimeout(() => brain.style.transform = '', 120);
        updateUI(); saveGame();
    }
    function playClickSound() {
        if (!audioCtx) initMusic();
        if (audioCtx) {
            try {
                const profile = soundProfiles[currentSoundProfile];
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = profile.type; osc.frequency.value = profile.freq;
                gain.gain.value = 0.08;
                gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
                osc.connect(gain); gain.connect(audioCtx.destination);
                osc.start(); osc.stop(audioCtx.currentTime + 0.05);
            } catch(e) {}
        }
    }
    function playBuySound() {
        if (!audioCtx) initMusic();
        if (audioCtx) {
            try {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = "triangle"; osc.frequency.value = 523.25;
                gain.gain.value = 0.08;
                gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
                osc.connect(gain); gain.connect(audioCtx.destination);
                osc.start(); osc.stop(audioCtx.currentTime + 0.1);
            } catch(e) {}
        }
    }
    const clickable = document.getElementById('clickableObject');
    if (clickable) {
        clickable.addEventListener('touchstart', handleMultiTouch, { passive: false });
        clickable.addEventListener('mousedown', handleMouseClick);
    }

    const tutorialOverlay = document.getElementById('tutorialOverlay');
    const tutorialStep1 = document.getElementById('tutorialStep1');
    const tutorialStep2 = document.getElementById('tutorialStep2');
    function showTutorial() {
        if (tutorialStep1) tutorialStep1.classList.remove('hidden');
        if (tutorialStep2) tutorialStep2.classList.add('hidden');
        if (tutorialOverlay) tutorialOverlay.classList.add('show');
    }
    function goToGame() {
        document.getElementById('mainMenu').classList.add('hidden');
        document.getElementById('gameInterface').classList.remove('hidden');
    }
    document.getElementById('tutorialYes')?.addEventListener('click', () => {
        tutorialStep1.classList.add('hidden'); tutorialStep2.classList.remove('hidden');
    });
    document.getElementById('tutorialNo')?.addEventListener('click', () => {
        localStorage.setItem('tutorialDone', 'true');
        tutorialOverlay?.classList.remove('show'); goToGame();
    });
    document.getElementById('tutorialOk')?.addEventListener('click', () => {
        localStorage.setItem('tutorialDone', 'true');
        tutorialOverlay?.classList.remove('show'); goToGame();
    });
    document.getElementById('playBtn')?.addEventListener('click', () => {
        if (isHalloween() && musicEnabled && !halloweenMusicTimer) startHalloweenMusic();
        if (!localStorage.getItem('tutorialDone')) { showTutorial(); return; }
        goToGame();
    });
    document.getElementById('testBtn')?.addEventListener('click', () => {
        showToast(t('test_ok'));
        playBuySound();
    });
    document.getElementById('prestigeBtn')?.addEventListener('click', openPrestigeModal);
    document.getElementById('doPrestigeBtn')?.addEventListener('click', doPrestige);
    document.getElementById('closePrestigeBtn')?.addEventListener('click', () => {
        document.getElementById('prestigeModal')?.classList.remove('show');
    });
    document.getElementById('backToMenu')?.addEventListener('click', () => {
        document.getElementById('mainMenu').classList.remove('hidden');
        document.getElementById('gameInterface').classList.add('hidden');
    });
    document.getElementById('openShopBtn')?.addEventListener('click', () => {
        document.getElementById('shopPanel').classList.add('show');
        switchShopTab('neurons');
    });
    document.getElementById('closeShopBtn')?.addEventListener('click', () => document.getElementById('shopPanel').classList.remove('show'));
    document.getElementById('buyAllBtn')?.addEventListener('click', buyAllAvailable);
    document.getElementById('boostBtn')?.addEventListener('click', buyBoost);
    document.getElementById('rouletteBtn')?.addEventListener('click', openRoulette);
    document.getElementById('rouletteSpinBtn')?.addEventListener('click', spinRoulette);
    document.getElementById('rouletteCloseBtn')?.addEventListener('click', () => document.getElementById('rouletteOverlay')?.classList.remove('show'));
    document.getElementById('riskBtn')?.addEventListener('click', () => {
        if (isBanned) return;
        if (points < 100) { showToast(t('risk_no_points')); return; }
        if (Math.random() < riskChance) {
            const won = Math.floor(points);
            points = points * 2;
            showToast(`${t('risk_win')} +${won.toLocaleString()}🧠`);
            playBuySound();
        } else {
            const lost = Math.floor(points * 0.5);
            points = points - lost;
            showToast(`${t('risk_lose')} -${lost.toLocaleString()}🧠`);
        }
        updateUI(); saveGame();
    });
    document.getElementById('factCloseBtn')?.addEventListener('click', () => document.getElementById('factOverlay')?.classList.remove('show'));
    document.getElementById('settingsBtn')?.addEventListener('click', () => document.getElementById('settingsModal').classList.add('show'));
    document.getElementById('closeSettings')?.addEventListener('click', () => document.getElementById('settingsModal').classList.remove('show'));
    document.getElementById('resetGameBtn')?.addEventListener('click', () => {
        if (confirm("Сбросить всё? / Reset all?")) { localStorage.clear(); location.reload(); }
    });
    document.getElementById('newsBtn')?.addEventListener('click', () => document.getElementById('newsModal').classList.add('show'));
    document.getElementById('closeNewsBtn')?.addEventListener('click', () => document.getElementById('newsModal').classList.remove('show'));

    document.getElementById('langRu')?.addEventListener('click', () => setLanguage('ru'));
    document.getElementById('langEn')?.addEventListener('click', () => setLanguage('en'));
    document.getElementById('setLangRu')?.addEventListener('click', () => setLanguage('ru'));
    document.getElementById('setLangEn')?.addEventListener('click', () => setLanguage('en'));

    document.querySelectorAll('.color-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            applyButtonColor(btn.dataset.color);
            showToast(`🎨 ${btn.dataset.color}`);
        });
    });

    document.querySelectorAll('.shop-tab').forEach(tab => {
        tab.addEventListener('click', () => switchShopTab(tab.dataset.tab));
    });

    document.getElementById('openTasksBtn')?.addEventListener('click', () => {
        renderTasksList();
        document.getElementById('passTasksModal').classList.add('show');
    });
    document.getElementById('closeTasksBtn')?.addEventListener('click', () => {
        document.getElementById('passTasksModal').classList.remove('show');
    });

    document.getElementById('bgEarlyAutumn')?.addEventListener('click', () => setBodyBg('early_autumn'));
    document.getElementById('bgGolden')?.addEventListener('click', () => setBodyBg('golden'));
    document.getElementById('bgRainy')?.addEventListener('click', () => setBodyBg('rainy'));
    document.getElementById('bgLate')?.addEventListener('click', () => setBodyBg('late'));
    document.getElementById('bgForest')?.addEventListener('click', () => setBodyBg('forest'));
    document.getElementById('bgPark')?.addEventListener('click', () => setBodyBg('park'));
    document.getElementById('bgMountains')?.addEventListener('click', () => setBodyBg('mountains'));
    document.getElementById('bgVillage')?.addEventListener('click', () => setBodyBg('village'));

    document.getElementById('exportSaveBtn')?.addEventListener('click', exportProgress);
    document.getElementById('importSaveBtn')?.addEventListener('click', () => importInput.click());
    document.getElementById('promoBtn')?.addEventListener('click', () => document.getElementById('promoModal').classList.add('show'));
    document.getElementById('closePromoBtn')?.addEventListener('click', () => document.getElementById('promoModal').classList.remove('show'));

    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            const el = document.documentElement;
            const isFull = document.fullscreenElement || document.webkitFullscreenElement;
            if (!isFull) {
                if (el.requestFullscreen) el.requestFullscreen();
                else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
                fullscreenBtn.innerText = t('off');
                showToast("⛶ " + t('fullscreen'));
            } else {
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                fullscreenBtn.innerText = t('on');
                showToast("⛶ " + t('fullscreen'));
            }
        });
    }

    const promoCodes = {};
    for (let i = 1; i <= 100; i++) promoCodes[`code${i}`] = { points: 100 + i * 5, stars: 1 + Math.floor(i / 10) };
    promoCodes['dima'] = { points: 500, stars: 10 };
    promoCodes['dima god'] = { points: 5000, stars: 100 };
    promoCodes['start'] = { points: 100, stars: 5 };
    promoCodes['neural'] = { points: 1000, stars: 50 };
    promoCodes['evolution'] = { points: 2000, stars: 100 };
    promoCodes['prestige'] = { points: 10000, stars: 200 };
    promoCodes['legend'] = { points: 20000, stars: 500 };
    promoCodes['pass7'] = { points: 7000, stars: 70 };
    promoCodes['pass8'] = { points: 8000, stars: 80 };
    promoCodes['halloween'] = { points: 6666, stars: 66 };
    promoCodes['newyear'] = { points: 7777, stars: 77 };
    promoCodes['robot'] = { points: 9999, stars: 99 };
    promoCodes['hacker'] = { points: 11111, stars: 111 };
    promoCodes['pumpkin'] = { points: 8888, stars: 88 };
    promoCodes['birthday'] = { points: 17000, stars: 170 };
    promoCodes['march8'] = { points: 8000, stars: 80 };

    document.getElementById('activatePromoBtn')?.addEventListener('click', () => {
        if (isBanned) return;
        const code = document.getElementById('promoInput').value.toLowerCase().trim();
        if (checkBan(code)) {
            document.getElementById('promoInput').value = '';
            document.getElementById('promoModal').classList.remove('show');
            activateBan(); return;
        }
        if (promoCodes[code]) {
            const promo = promoCodes[code];
            points += promo.points; stars += promo.stars;
            totalStarsEarned += promo.stars;
            updateUI(); saveGame();
            showToast(t('promo_ok'));
            document.getElementById('promoInput').value = '';
            document.getElementById('promoModal').classList.remove('show');
        } else showToast(t('promo_bad'));
    });

    document.getElementById('soundToggleBtn')?.addEventListener('click', () => {
        if (isBanned) return;
        currentSoundProfile = (currentSoundProfile + 1) % soundProfiles.length;
        document.getElementById('soundToggleBtn').innerText = `${t('sound_toggle')} (${soundProfiles[currentSoundProfile].name})`;
        saveGame();
        showToast(`🔊 ${soundProfiles[currentSoundProfile].name}`);
    });

    document.getElementById('shareBtn')?.addEventListener('click', shareProgress);

    function moveEyes(e) {
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        const y = e.touches ? e.touches[0].clientY : e.clientY;
        document.querySelectorAll('.pupil').forEach(p => {
            const rect = p.parentElement.parentElement.getBoundingClientRect();
            const dx = x - (rect.left + rect.width / 2);
            const dy = y - (rect.top + rect.height / 2);
            const angle = Math.atan2(dy, dx);
            const dist = Math.min(4, Math.hypot(dx, dy) / 20);
            p.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
        });
    }
    document.addEventListener('mousemove', moveEyes);
    document.addEventListener('touchmove', moveEyes);

    let reloadSeconds = 300;
    setInterval(() => {
        if (reloadSeconds > 0) {
            reloadSeconds--;
            const el = document.getElementById('reloadCountdown');
            if (el) {
                const m = Math.floor(reloadSeconds / 60), s = reloadSeconds % 60;
                el.innerText = `${m}:${s.toString().padStart(2, '0')}`;
            }
            if (reloadSeconds === 0) {
                showToast(t('reload_toast'));
                setTimeout(() => location.reload(), 2000);
            }
        }
    }, 1000);
    setInterval(saveGame, 5000);

    // ===== РЕДАКТОР ИГРЫ =====
    let editorActive = false;
    let editorSelected = null;

    const EDITOR_ELEMENTS = [
        '#playBtn', '#settingsBtn', '#newsBtn', '#shareBtn', '#prestigeBtn', '#testBtn',
        '.telegram-btn', '#backToMenu', '#openShopBtn', '#buyAllBtn', '#closeShopBtn',
        '#boostBtn', '#rouletteBtn', '#riskBtn', '#clickHint', '#gameTitle', '#menuVersion',
        '#reloadTimer', '.stats-panel-extended', '.save-badge'
    ];

    function enterEditorMode() {
        editorActive = true;
        showToast(t('editor_on'));
        document.getElementById('editorPanel').classList.add('show');
        document.querySelectorAll(EDITOR_ELEMENTS.join(',')).forEach(el => {
            if (!el) return;
            el.classList.add('editor-element');
            el.setAttribute('draggable', 'true');
            el.addEventListener('dragstart', editorDragStart);
            el.addEventListener('dragend', editorDragEnd);
            el.addEventListener('click', editorElementClick, true);
        });
        document.addEventListener('dragover', editorDragOver);
        document.addEventListener('drop', editorDrop);
    }

    function exitEditorMode() {
        editorActive = false;
        showToast(t('editor_off'));
        document.getElementById('editorPanel').classList.remove('show');
        document.querySelectorAll('.editor-element').forEach(el => {
            el.classList.remove('editor-element');
            el.removeAttribute('draggable');
        });
        document.removeEventListener('dragover', editorDragOver);
        document.removeEventListener('drop', editorDrop);
    }

    function editorDragStart(e) {
        if (!editorActive) return;
        e.dataTransfer.setData('text/plain', '');
        e.target.dataset.editorDrag = 'true';
    }
    function editorDragEnd(e) {
        if (!editorActive) return;
        e.target.style.position = 'fixed';
        e.target.style.left = (e.clientX - 40) + 'px';
        e.target.style.top = (e.clientY - 15) + 'px';
        e.target.style.zIndex = '8000';
        delete e.target.dataset.editorDrag;
    }
    function editorDragOver(e) {
        if (!editorActive) return;
        e.preventDefault();
    }
    function editorDrop(e) {
        if (!editorActive) return;
        e.preventDefault();
    }
    function editorElementClick(e) {
        if (!editorActive) return;
        e.preventDefault();
        e.stopPropagation();
        editorSelected = e.target;
        const modal = document.getElementById('editorItemModal');
        document.getElementById('editorText').value = e.target.innerText || '';
        const fs = parseInt(getComputedStyle(e.target).fontSize) || 14;
        document.getElementById('editorFontSize').value = fs;
        document.getElementById('editorWidth').value = Math.round(e.target.offsetWidth);
        document.getElementById('editorHeight').value = Math.round(e.target.offsetHeight);
        modal.classList.add('show');
    }

    document.getElementById('editorApplyBtn')?.addEventListener('click', () => {
        if (!editorSelected) return;
        editorSelected.innerText = document.getElementById('editorText').value;
        editorSelected.style.fontSize = document.getElementById('editorFontSize').value + 'px';
        editorSelected.style.width = document.getElementById('editorWidth').value + 'px';
        editorSelected.style.height = document.getElementById('editorHeight').value + 'px';
        document.getElementById('editorItemModal').classList.remove('show');
    });

    document.getElementById('editorDeleteBtn')?.addEventListener('click', () => {
        if (!editorSelected) return;
        editorSelected.remove();
        editorSelected = null;
        document.getElementById('editorItemModal').classList.remove('show');
        showToast(t('editor_deleted'));
    });

    document.getElementById('editorItemClose')?.addEventListener('click', () => {
        document.getElementById('editorItemModal').classList.remove('show');
    });

    document.getElementById('editorSaveBtn')?.addEventListener('click', () => {
        const layout = {};
        EDITOR_ELEMENTS.forEach(sel => {
            const el = document.querySelector(sel);
            if (!el) return;
            layout[sel] = {
                left: el.style.left || '',
                top: el.style.top || '',
                width: el.style.width || '',
                height: el.style.height || '',
                fontSize: el.style.fontSize || '',
                text: el.innerText || ''
            };
        });
        localStorage.setItem('editorLayout', JSON.stringify(layout));
        showToast(t('editor_saved'));
    });

    document.getElementById('editorResetBtn')?.addEventListener('click', () => {
        if (!confirm('Сбросить раскладку?')) return;
        localStorage.removeItem('editorLayout');
        showToast(t('editor_reset'));
        setTimeout(() => location.reload(), 800);
    });

    document.getElementById('editorAddBtn')?.addEventListener('click', () => {
        const btn = document.createElement('div');
        btn.className = 'menu-btn editor-element';
        btn.innerText = '🆕 Кнопка';
        btn.style.position = 'fixed';
        btn.style.left = '50%';
        btn.style.top = '50%';
        btn.style.zIndex = '8000';
        btn.setAttribute('draggable', 'true');
        btn.addEventListener('dragstart', editorDragStart);
        btn.addEventListener('dragend', editorDragEnd);
        btn.addEventListener('click', editorElementClick, true);
        document.body.appendChild(btn);
        showToast(t('editor_added'));
    });

    document.getElementById('editorExitBtn')?.addEventListener('click', exitEditorMode);

    function loadEditorLayout() {
        const data = localStorage.getItem('editorLayout');
        if (!data) return;
        try {
            const layout = JSON.parse(data);
            Object.keys(layout).forEach(sel => {
                const el = document.querySelector(sel);
                if (!el) return;
                const s = layout[sel];
                if (s.left) el.style.left = s.left;
                if (s.top) el.style.top = s.top;
                if (s.width) el.style.width = s.width;
                if (s.height) el.style.height = s.height;
                if (s.fontSize) el.style.fontSize = s.fontSize;
                if (s.text) el.innerText = s.text;
            });
        } catch(e) {}
    }

    // ===== АДМИН ПАНЕЛЬ =====
    let adminCurrentTab = 'game';
    function renderAdminBody() {
        const body = document.getElementById('adminBody');
        if (!body) return;
        if (adminCurrentTab === 'game') {
            body.innerHTML = `
                <div class="admin-item"><span>Дать очков:</span><input type="number" id="admPointsInput" class="admin-input" placeholder="1000"></div>
                <div class="admin-item"><span></span><button id="admPoints">Дать очки</button></div>
                <div class="admin-item"><span>Дать звёзд:</span><input type="number" id="admStarsInput" class="admin-input" placeholder="100"></div>
                <div class="admin-item"><span></span><button id="admStars">Дать звёзды</button></div>
                <div class="admin-item"><span>Шанс риска (0-1):</span><input type="number" id="admRiskInput" class="admin-input" step="0.05" min="0" max="1" placeholder="0.5"></div>
                <div class="admin-item"><span></span><button id="admRisk">Применить шанс</button></div>
                <div class="admin-item"><span>Купить все нейросети</span><button id="admBuyAll">Купить</button></div>
                <div class="admin-item"><span>Открыть все AI Pass</span><button id="admPass">Дать</button></div>
                <div class="admin-item"><span>Режим Бога (x10)</span><button id="admGod">Вкл/Выкл</button></div>
                <div class="admin-item"><span>+1 Престиж</span><button id="admPrestige">Дать</button></div>
                <div class="admin-item"><span>🎂 Birthday boost</span><button id="admBirthday">Вкл</button></div>
                <div class="admin-item"><span>🌷 March 8 boost</span><button id="admMarch8">Вкл</button></div>
                <div class="admin-item"><span>🎨 Редактор игры</span><button id="admEditor">Открыть</button></div>
                <div class="admin-item"><span>Сбросить прогресс</span><button id="admReset">Сбросить</button></div>
            `;
            document.getElementById('admPoints').onclick = () => {
                const val = parseInt(document.getElementById('admPointsInput').value) || 1000;
                points += val; updateUI(); saveGame();
                showToast(`+${val}🧠`);
            };
            document.getElementById('admStars').onclick = () => {
                const val = parseInt(document.getElementById('admStarsInput').value) || 100;
                stars += val; totalStarsEarned += val; updateUI(); saveGame();
                showToast(`+${val}⭐`);
            };
            document.getElementById('admRisk').onclick = () => {
                const val = parseFloat(document.getElementById('admRiskInput').value);
                if (isNaN(val) || val < 0 || val > 1) { showToast('❌ 0-1'); return; }
                riskChance = val; saveGame();
                showToast(`🎲 Шанс риска: ${Math.round(val * 100)}%`);
            };
            document.getElementById('admBuyAll').onclick = () => {
                upgrades.forEach((u) => { if (!u.purchased) { u.purchased = true; purchasedCount++; } });
                updateUI(); renderShopNeurons(); saveGame(); showToast(t('all_neurons'));
            };
            document.getElementById('admPass').onclick = () => {
                passTasks.forEach((t2) => { t2.claimed = true; });
                passCurrentTask = passTasks.length;
                renderPassBadges(); renderTasksList(); saveGame(); showToast(t('all_passes'));
            };
            document.getElementById('admGod').onclick = () => {
                godMode = !godMode; updateUI(); saveGame();
                showToast(godMode ? t('god_on') : t('god_off'));
            };
            document.getElementById('admPrestige').onclick = () => {
                prestigeLevel++;
                updatePrestigeDisplay(); updateUI(); saveGame();
                showToast(`🌟 Престиж: ${prestigeLevel}`);
            };
            document.getElementById('admBirthday').onclick = () => {
                birthdayBoostEndTime = Date.now() + BIRTHDAY_BOOST_DURATION;
                updateBoostTimersPanel(); saveGame();
                showToast('🎂 Birthday boost ON!');
            };
            document.getElementById('admMarch8').onclick = () => {
                march8BoostEndTime = Date.now() + MARCH8_BOOST_DURATION;
                updateBoostTimersPanel(); saveGame();
                showToast('🌷 March 8 boost ON!');
            };
            document.getElementById('admEditor').onclick = () => {
                document.getElementById('adminOverlay').classList.remove('show');
                enterEditorMode();
            };
            document.getElementById('admReset').onclick = () => {
                if (confirm("Сбросить прогресс? / Reset progress?")) { localStorage.clear(); location.reload(); }
            };
        }
        if (adminCurrentTab === 'settings') {
            body.innerHTML = `
                <div class="admin-item"><span>Сбросить обучение</span><button id="admResetTutorial">Сбросить</button></div>
            `;
            document.getElementById('admResetTutorial').onclick = () => {
                localStorage.removeItem('tutorialDone');
                showToast("✅ Tutorial reset!");
            };
        }
    }
    function openAdminPanel() {
        const overlay = document.getElementById('adminOverlay');
        if (!overlay) return;
        const pass = prompt(t('admin_enter_pass'));
        if (pass !== ADMIN_PASSWORD) {
            showToast(t('admin_wrong_pass'));
            return;
        }
        adminCurrentTab = 'game';
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'game'));
        renderAdminBody();
        overlay.classList.add('show');
    }
    const versionEl = document.getElementById('menuVersion');
    if (versionEl) { versionEl.style.cursor = 'pointer'; versionEl.addEventListener('click', openAdminPanel); }
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active'); adminCurrentTab = tab.dataset.tab; renderAdminBody();
        });
    });
    document.getElementById('adminCloseBtn')?.addEventListener('click', () => document.getElementById('adminOverlay').classList.remove('show'));
    document.getElementById('adminOverlay')?.addEventListener('click', (e) => {
        if (e.target.id === 'adminOverlay') document.getElementById('adminOverlay').classList.remove('show');
    });

    applyTranslations();
    loadGame();
    checkDailyFact();
});
