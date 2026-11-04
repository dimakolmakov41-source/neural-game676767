import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { TRANSLATIONS } from './translations.js';
import { formatNumber } from './src/utils/formatNumber.js';
import { createHtmlEscaper } from './src/utils/escapeHTML.js';
import { selectFactOfDay } from './src/utils/selectFactOfDay.js';
import { isCalendarDate } from './src/utils/isCalendarDate.js';
import { calculateOfflineIncome as calculateOfflineIncomeTS } from './src/utils/calculateOfflineIncome.js';
import { isHalloween as isHalloweenTS } from './src/utils/isHalloween.js';
import { isNewYear as isNewYearTS } from './src/utils/isNewYear.js';
import { isBirthday as isBirthdayTS } from './src/utils/isBirthday.js';
import { isMarch8 as isMarch8TS } from './src/utils/isMarch8.js';
import { getSkinMultiplier as getSkinMultiplierTS } from './src/utils/getSkinMultiplier.js';
import { getPrestigeMultiplier as getPrestigeMultiplierTS } from './src/utils/getPrestigeMultiplier.js';
import { isBoostActive as isBoostActiveTS } from './src/utils/isBoostActive.js';

const GAME_VERSION = "17.0";
const ENABLE_HTML_PROTECTION = true; // <--- TRUE / FALSE (Включить / Выключить защиту)
const ADMIN_PASSWORD = "6769";
const SUPABASE_URL = 'https://kbkmueilgjmintuwkfzv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_udGOtMD_z1cu44xJvg9wLQ_0LtfzdOS';
let supabaseClient = null;

let globalEventMultiplier = 1, saleData = { active: false, discount_percent: 0 }, rouletteCost = 250, autoclickerRateBonus = 0, customTheme = "normal", weatherData = { active: false, type: "none" }, phrasesData = { sleep: "😴 Спишь?", combo: "🔥 x2 КОМБО!", crit: "💥 КРИТИЧЕСКИЙ КЛИК! x10!" }, tickerData = { active: false, text: "" }, starsData = { chance: 0.0001, amount: 3 }, reloadTimeMinutes = 5;

let globalBoost = { active: false, type: 'points', multiplier: 1, text: '' };

let currentLang = localStorage.getItem('gameLang') || 'ru';
function t(key) { return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || TRANSLATIONS.ru[key] || key; }

// ===== ЗАЩИТА ОТ HTML (XSS) =====
const escapeHTML = createHtmlEscaper(ENABLE_HTML_PROTECTION);



function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => { el.innerText = t(el.dataset.i18n); });
    const r1 = document.getElementById('robotText1'); if (r1) r1.innerHTML = t('robot1'); const r2 = document.getElementById('robotText2'); if (r2) r2.innerHTML = t('robot2'); const tt = document.getElementById('tutorialText'); if (tt) tt.innerHTML = t('tutorial_text');
    if (typeof updateBoostUI === 'function') updateBoostUI(); if (typeof applyPassStyle === 'function') applyPassStyle(); if (typeof applyTheme === 'function') applyTheme(); if (typeof updatePassEndTimer === 'function') updatePassEndTimer(); if (typeof updateAutoClickerUI === 'function') updateAutoClickerUI();
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === currentLang));
    document.querySelectorAll('#setLangRu, #setLangEn').forEach(btn => { const isRu = btn.id === 'setLangRu'; btn.classList.toggle('active', (isRu && currentLang === 'ru') || (!isRu && currentLang === 'en')); });
}

function setLanguage(lang) { if (lang !== 'ru' && lang !== 'en') return; currentLang = lang; localStorage.setItem('gameLang', lang); applyTranslations(); showToast(lang === 'ru' ? "✅ Язык: Русский" : "✅ Language: English"); }

const FACTS = { ru: ["Первый перцептрон создан в 1958 году.","ChatGPT обучался на 570 ГБ текста.","Мозг содержит около 86 млрд нейронов.","Термин «искусственный интеллект» предложили в 1956 году на Дартмутском семинаре.","В 1943 году Уоррен Маккаллок и Уолтер Питтс описали математическую модель искусственного нейрона.","В 1950 году Алан Тьюринг предложил тест для обсуждения машинного мышления.","Первый промышленный робот Unimate начал работать на заводе General Motors в 1961 году.","Компьютер ENIAC представили публике в 1946 году.","Первый жёсткий диск IBM 305 RAMAC появился в 1956 году и вмещал около 5 МБ.","Первый микропроцессор Intel 4004 выпустили в 1971 году.","В 1989 году Тим Бернерс-Ли предложил проект Всемирной паутины.","Первый сайт в мире запустили в 1991 году.","Первое сообщение по ARPANET отправили в 1969 году.","Язык программирования Python впервые выпустили в 1991 году.","Язык Java впервые представили широкой публике в 1995 году.","Операционную систему Linux впервые выпустили в 1991 году.","Компьютер ENIAC весил около 30 тонн.","Транзистор изобрели в Bell Labs в 1947 году.","Нобелевскую премию по физике 1956 года присудили за исследования полупроводников и открытие транзисторного эффекта.","В 2012 году нейросеть AlexNet добилась заметного успеха в конкурсе ImageNet.","Архитектуру Transformer представили исследователи Google в 2017 году.","Машинное обучение позволяет компьютерам находить закономерности в данных.","Нейронные сети состоят из связанных вычислительных элементов — искусственных нейронов.","Графические процессоры хорошо подходят для параллельных вычислений.","Квантовый компьютер использует кубиты, а не обычные биты.","Обычный бит может иметь значение 0 или 1.","Оптоволокно передаёт данные с помощью световых сигналов.","GPS использует сигналы спутников для определения местоположения.","Первый искусственный спутник Земли «Спутник-1» запустили в 1957 году.","Юрий Гагарин стал первым человеком в космосе в 1961 году.","Нил Армстронг первым ступил на поверхность Луны в 1969 году.","Телескоп «Хаббл» запустили на орбиту в 1990 году.","Космический телескоп James Webb начал научные наблюдения в 2022 году.","Марсоход Sojourner впервые успешно исследовал Марс с поверхности в 1997 году.","На Венере сутки длиннее её года.","На Марсе находится вулкан Олимп — один из крупнейших известных вулканов Солнечной системы.","Свет от Солнца достигает Земли примерно за 8 минут 20 секунд.","Луна удаляется от Земли примерно на 3,8 сантиметра в год.","В космосе звук не распространяется так, как в воздухе: там почти нет вещества для передачи звуковых волн.","Международная космическая станция движется вокруг Земли со скоростью около 28 000 км/ч.","Вода может существовать в твёрдом, жидком и газообразном состояниях.","ДНК хранит наследственную информацию живых организмов.","Пенициллин открыл Александр Флеминг в 1928 году.","Структуру двойной спирали ДНК описали в 1953 году.","Первую успешную вакцину против оспы разработал Эдвард Дженнер в 1796 году.","Периодическую таблицу элементов Дмитрий Менделеев опубликовал в 1869 году.","Скорость света в вакууме составляет примерно 300 000 километров в секунду.","Земля совершает один оборот вокруг Солнца примерно за 365,25 суток.","Молния нагревает воздух до температуры, которая может быть выше температуры поверхности Солнца.","Антарктида — самый холодный материк Земли.","Океаны покрывают около 71 процента поверхности Земли.","Пчёлы могут сообщать другим пчёлам направление к пище с помощью танца.","Первую фотографию получили в 1820-х годах благодаря экспериментам Жозефа Нисефора Ньепса."], en: ["First perceptron created in 1958.","ChatGPT trained on 570 GB of text.","Brain has about 86 billion neurons.","The term “artificial intelligence” was proposed at the 1956 Dartmouth workshop.","In 1943, Warren McCulloch and Walter Pitts described a mathematical model of an artificial neuron.","In 1950, Alan Turing proposed a test for discussing machine intelligence.","The first industrial robot, Unimate, began working at a General Motors plant in 1961.","The ENIAC computer was presented to the public in 1946.","IBM's first hard disk, the 305 RAMAC, appeared in 1956 and held about 5 MB.","Intel released the first microprocessor, the 4004, in 1971.","In 1989, Tim Berners-Lee proposed the project that became the World Wide Web.","The world's first website went online in 1991.","The first message over ARPANET was sent in 1969.","The Python programming language was first released in 1991.","The Java programming language was first introduced to the public in 1995.","The Linux operating system was first released in 1991.","The ENIAC computer weighed about 30 tons.","The transistor was invented at Bell Labs in 1947.","The 1956 Nobel Prize in Physics recognized semiconductor research and the discovery of the transistor effect.","In 2012, the AlexNet neural network achieved a major result in the ImageNet competition.","Researchers at Google introduced the Transformer architecture in 2017.","Machine learning helps computers find patterns in data.","Neural networks consist of connected computing units called artificial neurons.","Graphics processing units are well suited to parallel computing.","A quantum computer uses qubits instead of ordinary bits.","An ordinary bit can have a value of 0 or 1.","Fiber-optic cables transmit data using light signals.","GPS uses satellite signals to help determine location.","Earth's first artificial satellite, Sputnik 1, launched in 1957.","Yuri Gagarin became the first human in space in 1961.","Neil Armstrong became the first person to walk on the Moon in 1969.","The Hubble Space Telescope launched into orbit in 1990.","The James Webb Space Telescope began scientific observations in 2022.","The Sojourner rover successfully explored the Martian surface in 1997.","A day on Venus is longer than its year.","Mars is home to Olympus Mons, one of the largest known volcanoes in the Solar System.","Sunlight takes about 8 minutes and 20 seconds to reach Earth.","The Moon is moving away from Earth by about 3.8 centimeters per year.","Sound does not travel through space as it does through air because space has almost no matter to carry sound waves.","The International Space Station orbits Earth at about 28,000 km/h.","Water can exist as a solid, liquid, and gas.","DNA stores the hereditary information of living organisms.","Alexander Fleming discovered penicillin in 1928.","The double-helix structure of DNA was described in 1953.","Edward Jenner developed the first successful smallpox vaccine in 1796.","Dmitri Mendeleev published his periodic table of elements in 1869.","The speed of light in a vacuum is about 300,000 kilometers per second.","Earth takes about 365.25 days to orbit the Sun.","Lightning heats the surrounding air to temperatures that can exceed the Sun's surface temperature.","Antarctica is Earth's coldest continent.","The oceans cover about 71 percent of Earth's surface.","Honeybees can communicate the direction of food sources to other bees through a dance.","The first photograph was produced in the 1820s through experiments by Joseph Nicéphore Niépce."] }
function getFactOfDay() { return selectFactOfDay(FACTS[currentLang]); }
function checkDailyFact() { const today = new Date().toISOString().slice(0, 10); if (localStorage.getItem('factShownDate') !== today) { localStorage.setItem('factShownDate', today); const factText = document.getElementById('factText'); if (factText) factText.innerText = getFactOfDay(); setTimeout(() => document.getElementById('factOverlay')?.classList.add('show'), 2500); } }

// Обновление версии больше не удаляет сохранение игрока.
const storedGameVersion = localStorage.getItem('gameVersion');
if (storedGameVersion !== GAME_VERSION) {
    localStorage.setItem('gameVersion', GAME_VERSION);
}

function isHalloween() { return isHalloweenTS(customTheme); }
function isNewYear() { return isNewYearTS(customTheme); }
function isHackerMode() { const n = Date.now(); return n >= new Date(2026, 8, 29).getTime() && n <= new Date(2026, 9, 5).getTime(); }
function isBirthday() { return isBirthdayTS(); }
function isMarch8() { return isMarch8TS(); }

function applyTheme() {
    const body = document.body; const brain = document.getElementById('clickableObject'); const brainEmoji = document.getElementById('brainEmoji'); const starLabel = document.getElementById('starLabel'); const sleepMsg = document.getElementById('sleepMsg'); const reloadTimer = document.getElementById('reloadTimer'); const title = document.getElementById('gameTitle'); const partyHat = document.getElementById('partyHat'); const flowerDecor = document.getElementById('flowerDecor'); const brainSpeech = document.getElementById('brainSpeech');
    body.classList.remove('bg-halloween', 'bg-newyear', 'bg-hacker', 'bg-birthday', 'bg-march8'); body.classList.remove('bg-early-autumn', 'bg-golden', 'bg-rainy', 'bg-late', 'bg-forest', 'bg-park', 'bg-mountains', 'bg-village'); if (brain) brain.classList.remove('halloween-brain', 'newyear-brain', 'birthday-brain', 'march8-brain');
    const oldHat = brain ? brain.querySelector('.santa-hat') : null; if (oldHat) oldHat.remove(); if (partyHat) partyHat.style.display = 'none'; if (flowerDecor) flowerDecor.style.display = 'none'; if (brainSpeech) brainSpeech.style.display = 'none';
    if (isBirthday()) { body.classList.add('bg-birthday'); if (brain) brain.classList.add('birthday-brain'); if (partyHat) partyHat.style.display = 'block'; if (starLabel) starLabel.innerHTML = '⭐ <span id="stars">' + (window.__stars || 0) + '</span>'; }
    else if (isMarch8()) { body.classList.add('bg-march8'); if (brain) brain.classList.add('march8-brain'); if (flowerDecor) flowerDecor.style.display = 'block'; if (brainSpeech) brainSpeech.style.display = 'block'; if (starLabel) starLabel.innerHTML = '⭐ <span id="stars">' + (window.__stars || 0) + '</span>'; }
    else if (isHalloween()) { body.classList.add('bg-halloween'); if (brain) brain.classList.add('halloween-brain'); if (starLabel) starLabel.innerHTML = '🍬 <span id="stars">' + (window.__stars || 0) + '</span>'; }
    else if (isNewYear()) { body.classList.add('bg-newyear'); if (brain) { brain.classList.add('newyear-brain'); const hat = document.createElement('span'); hat.className = 'santa-hat'; hat.innerText = '🎅'; brain.appendChild(hat); } if (starLabel) starLabel.innerHTML = '❄️ <span id="stars">' + (window.__stars || 0) + '</span>'; }
    else if (isHackerMode()) { body.classList.add('bg-hacker'); if (starLabel) starLabel.innerHTML = '⭐ <span id="stars">' + (window.__stars || 0) + '</span>'; }
    else { const savedBg = localStorage.getItem('selectedBg') || 'early_autumn'; const bgThemes = { early_autumn: "bg-early-autumn", golden: "bg-golden", rainy: "bg-rainy", late: "bg-late", forest: "bg-forest", park: "bg-park", mountains: "bg-mountains", village: "bg-village" }; body.classList.add(bgThemes[savedBg] || 'bg-early-autumn'); if (starLabel) starLabel.innerHTML = '⭐ <span id="stars">' + (window.__stars || 0) + '</span>'; }
    if (sleepMsg) sleepMsg.innerText = phrasesData.sleep || t('sleep'); if (reloadTimer) reloadTimer.innerHTML = t('reload') + ' <span id="reloadCountdown">5:00</span>'; if (title) title.innerText = t('title'); if (typeof applySkin === 'function') applySkin();
    if (activeAbuseEffects.includes('rainbow')) body.classList.add('bg-rainbow'); else body.classList.remove('bg-rainbow');
}

function applyButtonColor(color) { document.body.classList.remove('btn-blue', 'btn-green', 'btn-red', 'btn-purple', 'btn-gold'); if (color && color !== 'blue') document.body.classList.add('btn-' + color); localStorage.setItem('btnColor', color || 'blue'); document.querySelectorAll('.color-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.color === (color || 'blue'))); }

// ===== ОСНОВНАЯ ЛОГИКА =====
window.addEventListener('load', () => {
    try { supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY); } catch(e) { console.log('Ошибка Supabase:', e); }

    // ===== ПРОВЕРКА СТАТУСА СЕРВЕРА (game_settings) =====
    async function checkServerStatus() {
        if (!supabaseClient) return;
        try {
            const { data, error } = await supabaseClient.from('game_settings').select('*').limit(1).maybeSingle();
            if (error) { console.log('game_settings ошибка:', error.message); return; }
            if (!data) { console.log('game_settings: нет данных в таблице'); return; }

            const isClosed = (data.is_closed === true || data.is_closed === 'true');
            if (isClosed) {
                document.getElementById('closedOverlay')?.classList.add('show');
                document.getElementById('mainMenu')?.classList.add('hidden');
                document.getElementById('gameInterface')?.classList.add('hidden');
                return;
            } else {
                document.getElementById('closedOverlay')?.classList.remove('show');
            }

            if (data.latest_version && String(data.latest_version).trim() !== GAME_VERSION) {
                document.getElementById('updateOverlay')?.classList.add('show');
                document.getElementById('mainMenu')?.classList.add('hidden');
                document.getElementById('gameInterface')?.classList.add('hidden');
                return;
            } else {
                document.getElementById('updateOverlay')?.classList.remove('show');
            }

            const tickerActive = (data.ticker_active === true || data.ticker_active === 'true');
            if (tickerActive && data.ticker_text) {
                const ticker = document.getElementById('globalTicker');
                const tickerText = document.getElementById('tickerText');
                if (ticker && tickerText) {
                    if (tickerText.innerText !== data.ticker_text) tickerText.innerText = data.ticker_text;
                    ticker.classList.remove('hidden');
                }
            } else {
                document.getElementById('globalTicker')?.classList.add('hidden');
            }

            const boostActive = (data.boost_active === true || data.boost_active === 'true');
            if (boostActive) {
                globalBoost = {
                    active: true,
                    type: data.boost_type || 'points',
                    multiplier: Number(data.boost_multiplier) || 2,
                    text: data.boost_text || '🔥 ГЛОБАЛЬНЫЙ БУСТ!'
                };
                const banner = document.getElementById('globalBoostBanner');
                const boostText = document.getElementById('globalBoostText');
                if (banner && boostText) {
                    boostText.innerText = globalBoost.text;
                    banner.classList.remove('hidden');
                }
            } else {
                if (globalBoost.active) {
                    globalBoost = { active: false, type: 'points', multiplier: 1, text: '' };
                    document.getElementById('globalBoostBanner')?.classList.add('hidden');
                    if (typeof updateUI === 'function') updateUI();
                }
            }
        } catch(e) { console.log('checkServerStatus catch:', e); }
    }

    setTimeout(checkServerStatus, 800);
    setInterval(checkServerStatus, 60000);

    setTimeout(() => document.getElementById('loadingScreen')?.classList.add('hidden'), 1500);
    document.getElementById('menuVersion').innerText = `v${GAME_VERSION}`;

    let points = 10, stars = 0, totalClicks = 0, purchasedCount = 1, totalStarsEarned = 0, sessionClicks = 0, godMode = false, comboCounter = 0, gameStartTime = Date.now(), playtimeInterval = null, sleepMsgTimer = null, sleepMsgShowing = false, prestigeLevel = 0, lastSaveTime = Date.now();
    const PRESTIGE_BONUS_PER_LEVEL = 0.1, OFFLINE_MAX_HOURS = 8, OFFLINE_RATE = 0.3, BOOST_MULTIPLIER = 5, BOOST_PRICE = 100, BOOST_DURATION = 5 * 60 * 1000, BIRTHDAY_BOOST_MULT = 10, BIRTHDAY_BOOST_DURATION = 360610 * 1000, MARCH8_BOOST_MULT = 15, MARCH8_BOOST_DURATION = 70 * 3600 * 1000, X10_BOOST_MULT = 10, X10_BOOST_DURATION = 5 * 3600 * 1000, AUTOCLICKER_PRICE = 2500;
    let boostEndTime = 0, boostInterval = null, birthdayBoostEndTime = 0, march8BoostEndTime = 0, x10BoostEndTime = 0, autoclickerLevel = 1, autoclickerBought = false, autoclickerInterval = null;
    let helpers = [{ id: 0, name: "Нейро-помощник", power: 1, basePrice: 100, level: 1, bought: false, emoji: "🤖" },{ id: 1, name: "Кибер-помощник", power: 5, basePrice: 2000, level: 1, bought: false, emoji: "👾" },{ id: 2, name: "ИИ-помощник", power: 20, basePrice: 10000, level: 1, bought: false, emoji: "🧠" }];
    let rouletteSpinning = false;
    const SKINS = [{ id: 'normal', price: 0, mult: 1 }, { id: 'halloween', price: 100, mult: 5 }, { id: 'amethyst', price: 1600, mult: 15 }];
    let currentSkin = localStorage.getItem('currentSkin') || (isHalloween() ? 'halloween' : 'normal'), purchasedSkins = JSON.parse(localStorage.getItem('purchasedSkins') || '["normal"]'), unlockedAchievements = JSON.parse(localStorage.getItem('neuralAch') || '[]');
    Object.defineProperty(window, '__stars', { get: () => stars });

    let playerId = localStorage.getItem('gamePlayerId') || ('player-' + Math.floor(Math.random() * 1000000000));
    localStorage.setItem('gamePlayerId', playerId);

    // ===== ГЛОБАЛЬНОЕ СОБЫТИЕ v17.0 =====
    let globalEventState = null;
    let globalEventRefreshBusy = false;
    let appliedGlobalEventClaims = [];
    try {
        appliedGlobalEventClaims = JSON.parse(localStorage.getItem('globalEventAppliedClaims') || '[]');
        if (!Array.isArray(appliedGlobalEventClaims)) appliedGlobalEventClaims = [];
    } catch (_) { appliedGlobalEventClaims = []; }

    function renderGlobalEvent() {
        const panel = document.getElementById('globalEventPanel');
        if (!panel) return;
        if (!globalEventState || !globalEventState.is_active && !globalEventState.is_completed) {
            panel.classList.add('hidden');
            return;
        }
        panel.classList.remove('hidden');
        const clicks = Math.max(0, Number(globalEventState.total_clicks) || 0);
        const goal = Math.max(1, Number(globalEventState.goal) || 1);
        const percent = Math.min(100, clicks / goal * 100);
        const title = document.getElementById('globalEventTitle');
        const count = document.getElementById('globalEventClicks');
        const goalEl = document.getElementById('globalEventGoal');
        const fill = document.getElementById('globalEventFill');
        const status = document.getElementById('globalEventStatus');
        const reward = document.getElementById('globalEventReward');
        if (title) title.textContent = globalEventState.title || '🌍 ГЛОБАЛЬНОЕ СОБЫТИЕ';
        if (count) count.textContent = formatNumber(clicks);
        if (goalEl) goalEl.textContent = formatNumber(goal);
        if (fill) fill.style.width = percent.toFixed(3) + '%';
        if (status) status.textContent = globalEventState.is_completed
            ? '🎉 ЦЕЛЬ ДОСТИГНУТА! Награды доступны игрокам'
            : 'Общий прогресс всех игроков';
        if (reward) reward.textContent = '🎁 Награда: ' +
            formatNumber(Number(globalEventState.points_reward) || 0) + ' 🧠 и ' +
            formatNumber(Number(globalEventState.stars_reward) || 0) + ' ⭐';
    }

    async function ensureGlobalEventProfile() {
        if (!supabaseClient) return;
        const name = (localStorage.getItem('gamePlayerName') || '').trim().slice(0, 32);
        if (!name) return;
        const { data, error } = await supabaseClient
            .from('player_profiles')
            .select('player_id')
            .eq('player_id', playerId)
            .maybeSingle();
        if (error) throw error;
        if (!data) {
            const { error: insertError } = await supabaseClient
                .from('player_profiles')
                .insert({ player_id: playerId, player_name: name });
            if (insertError && insertError.code !== '23505') throw insertError;
        }
    }

    async function checkGlobalEventReward() {
        if (!supabaseClient || !(localStorage.getItem('gamePlayerName') || '').trim()) return;
        try {
            await ensureGlobalEventProfile();
            const { data, error } = await supabaseClient.rpc('claim_global_click_event_reward', {
                p_player_id: playerId
            });
            if (error) throw error;
            for (const claim of (data || [])) {
                const claimId = String(claim.claim_id);
                if (appliedGlobalEventClaims.includes(claimId)) {
                    await supabaseClient.rpc('acknowledge_global_click_event_reward', {
                        p_claim_id: claim.claim_id, p_player_id: playerId
                    });
                    continue;
                }
                points += Number(claim.points_reward) || 0;
                stars += Number(claim.stars_reward) || 0;
                totalStarsEarned += Number(claim.stars_reward) || 0;
                appliedGlobalEventClaims.push(claimId);
                localStorage.setItem('globalEventAppliedClaims', JSON.stringify(appliedGlobalEventClaims));
                updateUI();
                saveGame();
                const { error: ackError } = await supabaseClient.rpc('acknowledge_global_click_event_reward', {
                    p_claim_id: claim.claim_id, p_player_id: playerId
                });
                if (ackError) console.error('Подтверждение награды события:', ackError);
                showToast('🎉 Глобальная награда получена!');
            }
        } catch (e) {
            console.log('Награда глобального события пока недоступна:', e.message || e);
        }
    }

    async function refreshGlobalEvent() {
        if (!supabaseClient || globalEventRefreshBusy) return;
        globalEventRefreshBusy = true;
        try {
            const { data, error } = await supabaseClient.rpc('get_global_click_event');
            if (error) throw error;
            const row = Array.isArray(data) ? data[0] : data;
            if (row && row.event_id) {
                globalEventState = {
                    ...row,
                    total_clicks: Number(row.total_clicks) || 0,
                    goal: Number(row.goal) || 1
                };
                renderGlobalEvent();
                if (globalEventState.is_completed) await checkGlobalEventReward();
            } else {
                globalEventState = null;
                renderGlobalEvent();
            }
        } catch (e) {
            console.log('Глобальное событие:', e.message || e);
        } finally {
            globalEventRefreshBusy = false;
        }
    }

    async function registerGlobalEventClick() {
        if (!supabaseClient || !(localStorage.getItem('gamePlayerName') || '').trim()) return;
        try {
            const { data, error } = await supabaseClient.rpc('increment_global_click', {
                p_player_id: playerId
            });
            if (error) throw error;
            const row = Array.isArray(data) ? data[0] : data;
            if (row && globalEventState) {
                globalEventState.total_clicks = Number(row.total_clicks) || 0;
                globalEventState.goal = Number(row.goal) || globalEventState.goal;
                globalEventState.is_completed = !!row.is_completed;
                if (globalEventState.is_completed) globalEventState.is_active = false;
                renderGlobalEvent();
                if (globalEventState.is_completed) await checkGlobalEventReward();
            } else {
                await refreshGlobalEvent();
            }
        } catch (e) {
            console.log('Не удалось учесть клик в глобальном событии:', e.message || e);
        }
    }

    setTimeout(() => {
        refreshGlobalEvent();
        checkGlobalEventReward();
    }, 1200);
    setInterval(refreshGlobalEvent, 10000);

    
    const nicknameInput = document.getElementById('nicknameInput');
    const mandatoryNicknameOverlay = document.getElementById('mandatoryNicknameOverlay');
    const mandatoryNicknameInput = document.getElementById('mandatoryNicknameInput');
    const mandatoryNicknameError = document.getElementById('mandatoryNicknameError');
    const mandatoryNicknameSave = document.getElementById('mandatoryNicknameSave');
    if (nicknameInput) nicknameInput.value = localStorage.getItem('gamePlayerName') || '';

    async function savePlayerNickname(rawName) {
        const newName = String(rawName || '').trim().replace(/\s+/g, ' ');
        if (!newName) return { ok: false, message: 'Введи ник.' };
        if (newName.length > 32) return { ok: false, message: 'Максимум 32 символа.' };

        if (supabaseClient) {
            try {
                const { data, error } = await supabaseClient
                    .from('player_profiles')
                    .select('player_id')
                    .eq('player_name', newName)
                    .maybeSingle();
                if (error) throw error;
                if (data && data.player_id !== playerId) {
                    return { ok: false, message: 'Этот ник уже занят другим игроком!' };
                }
                const { error: saveError } = await supabaseClient
                    .from('player_profiles')
                    .upsert({ player_id: playerId, player_name: newName }, { onConflict: 'player_id' });
                if (saveError) throw saveError;
            } catch (e) {
                console.error('Сохранение ника:', e);
                return { ok: false, message: 'Не удалось сохранить ник. Проверь подключение и попробуй ещё раз.' };
            }
        }

        localStorage.setItem('gamePlayerName', newName);
        if (nicknameInput) nicknameInput.value = newName;
        try {
            await ensureGlobalEventProfile();
            syncLeaderboard();
            updateOnlineStatus();
            refreshGlobalEvent();
            checkGlobalEventReward();
        } catch (e) {
            console.error('Обновление профиля игрока:', e);
        }
        return { ok: true, offline: !supabaseClient };
    }

    document.getElementById('saveNicknameBtn')?.addEventListener('click', async () => {
        const result = await savePlayerNickname(nicknameInput?.value);
        if (!result.ok) {
            showToast(result.message);
            return;
        }
        showToast(result.offline ? '✅ Ник сохранён локально (офлайн)' : '✅ Ник сохранён');
    });

    mandatoryNicknameSave?.addEventListener('click', async () => {
        const result = await savePlayerNickname(mandatoryNicknameInput?.value);
        if (!result.ok) {
            if (mandatoryNicknameError) mandatoryNicknameError.textContent = result.message;
            mandatoryNicknameInput?.focus();
            return;
        }
        mandatoryNicknameSave.disabled = true;
        mandatoryNicknameOverlay?.classList.remove('show');
        if (!localStorage.getItem('tutorialDone')) {
            showTutorial();
        }
        mandatoryNicknameSave.disabled = false;
        if (result.offline) showToast('Ник сохранён офлайн. Онлайн-функции подключатся при наличии сети.');
    });

    if (mandatoryNicknameInput) {
        mandatoryNicknameInput.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') mandatoryNicknameSave?.click();
        });
    }


    // ===== СИСТЕМА ДРУЗЕЙ =====
    const friendsModal = document.getElementById('friendsModal');
    const getMyFriendName = () => (localStorage.getItem('gamePlayerName') || '').trim();

    function friendsMessage(id, message) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '<div class="friends-empty">' + escapeHTML(message) + '</div>';
    }

    async function loadFriends() {
        if (!supabaseClient) {
            friendsMessage('friendsList', 'Нет подключения к серверу.');
            friendsMessage('friendsRequestsList', 'Нет подключения к серверу.');
            return;
        }
        try {
            const [sent, received] = await Promise.all([
                supabaseClient.from('friends').select('*').eq('player_id', playerId).eq('status', 'accepted'),
                supabaseClient.from('friends').select('*').eq('friend_id', playerId).eq('status', 'accepted')
            ]);
            if (sent.error || received.error) throw (sent.error || received.error);
            const rows = [
                ...(sent.data || []).map(x => ({ otherId: x.friend_id, name: x.friend_name })),
                ...(received.data || []).map(x => ({ otherId: x.player_id, name: x.player_name }))
            ];
            const unique = [...new Map(rows.map(x => [x.otherId, x])).values()];
            const count = document.getElementById('friendsCount');
            if (count) count.textContent = 'Друзей: ' + unique.length;
            const list = document.getElementById('friendsList');
            if (!unique.length) friendsMessage('friendsList', 'Пока нет друзей.');
            else {
                const ids = unique.map(x => x.otherId);
                const online = await supabaseClient.from('online_players').select('player_id').in('player_id', ids).gte('last_seen', new Date(Date.now() - 30000).toISOString());
                const onlineIds = new Set((online.data || []).map(x => x.player_id));
                list.innerHTML = unique.map(x => '<div class="friend-row"><div class="friend-player-info"><div class="friend-player-name">' + escapeHTML(x.name) + '</div><div class="friend-player-status ' + (onlineIds.has(x.otherId) ? 'online' : '') + '">' + (onlineIds.has(x.otherId) ? '🟢 В сети' : '⚫ Не в сети') + '</div></div><button class="friend-action-btn danger" data-friend-remove="' + escapeHTML(x.otherId) + '">УДАЛИТЬ</button></div>').join('');
            }

            const incoming = await supabaseClient.from('friends').select('*').eq('friend_id', playerId).eq('status', 'pending');
            if (incoming.error) throw incoming.error;
            if (!incoming.data?.length) friendsMessage('friendsRequestsList', 'Нет новых заявок.');
            else document.getElementById('friendsRequestsList').innerHTML = incoming.data.map(x => '<div class="friend-row"><div class="friend-player-info"><div class="friend-player-name">' + escapeHTML(x.player_name) + '</div><div class="friend-player-status">Хочет добавить тебя</div></div><button class="friend-action-btn" data-friend-accept="' + x.id + '">ПРИНЯТЬ</button></div>').join('');
        } catch (e) {
            showToast('❌ Не удалось загрузить друзей');
            console.error('Friends:', e);
        }
    }

    async function searchFriend() {
        const nick = document.getElementById('friendsSearchInput')?.value.trim();
        if (!supabaseClient) { showToast('❌ Нет подключения к серверу'); return; }
        if (!nick) { friendsMessage('friendsSearchResults', 'Введи ник игрока.'); return; }
        if (!getMyFriendName()) { showToast('⚠️ Сначала установи себе ник в настройках'); return; }
        try {
            const { data, error } = await supabaseClient.from('player_profiles').select('player_id, player_name').ilike('player_name', nick).limit(10);
            if (error) throw error;
            const matches = (data || []).filter(x => x.player_id !== playerId);
            const results = document.getElementById('friendsSearchResults');
            if (!matches.length) { friendsMessage('friendsSearchResults', 'Игрок не найден.'); return; }
            results.innerHTML = matches.map(x => '<div class="friend-row"><div class="friend-player-info"><div class="friend-player-name">' + escapeHTML(x.player_name) + '</div><div class="friend-player-status">Игрок</div></div><button class="friend-action-btn" data-friend-add="' + escapeHTML(x.player_id) + '" data-friend-name="' + escapeHTML(x.player_name) + '">ДОБАВИТЬ</button></div>').join('');
        } catch (e) {
            friendsMessage('friendsSearchResults', 'Ошибка поиска. Проверь подключение и таблицы Supabase.');
            console.error('Friend search:', e);
        }
    }

    async function sendFriendRequest(targetId, targetName) {
        if (!supabaseClient || !getMyFriendName()) return;
        try {
            const { data, error: checkError } = await supabaseClient.from('friends').select('id,status').or('and(player_id.eq.' + playerId + ',friend_id.eq.' + targetId + '),and(player_id.eq.' + targetId + ',friend_id.eq.' + playerId + ')').limit(1);
            if (checkError) throw checkError;
            if (data?.length) { showToast(data[0].status === 'accepted' ? 'Вы уже друзья' : 'Заявка уже существует'); return; }
            const { error } = await supabaseClient.from('friends').insert({
                player_id: playerId, friend_id: targetId,
                player_name: getMyFriendName(), friend_name: targetName,
                status: 'pending'
            });
            if (error) throw error;
            showToast('✅ Заявка отправлена');
            loadFriends();
        } catch (e) {
            showToast('❌ Не удалось отправить заявку');
            console.error('Friend request:', e);
        }
    }

    document.getElementById('friendsBtn')?.addEventListener('click', () => {
        friendsModal?.classList.add('show');
        loadFriends();
    });
    document.getElementById('closeFriendsBtn')?.addEventListener('click', () => friendsModal?.classList.remove('show'));
    document.getElementById('friendsSearchBtn')?.addEventListener('click', searchFriend);
    document.getElementById('friendsSearchInput')?.addEventListener('keypress', e => { if (e.key === 'Enter') searchFriend(); });
    document.getElementById('friendsSearchResults')?.addEventListener('click', e => {
        const btn = e.target.closest('[data-friend-add]');
        if (btn) sendFriendRequest(btn.dataset.friendAdd, btn.dataset.friendName);
    });
    document.getElementById('friendsRequestsList')?.addEventListener('click', async e => {
        const btn = e.target.closest('[data-friend-accept]');
        if (!btn || !supabaseClient) return;
        const { error } = await supabaseClient.from('friends').update({ status: 'accepted' }).eq('id', btn.dataset.friendAccept).eq('friend_id', playerId);
        if (error) showToast('❌ Не удалось принять заявку');
        else { showToast('🤝 Теперь вы друзья!'); loadFriends(); }
    });
    document.getElementById('friendsList')?.addEventListener('click', async e => {
        const btn = e.target.closest('[data-friend-remove]');
        if (!btn || !supabaseClient) return;
        const otherId = btn.dataset.friendRemove;
        const { error } = await supabaseClient.from('friends').delete().or('and(player_id.eq.' + playerId + ',friend_id.eq.' + otherId + '),and(player_id.eq.' + otherId + ',friend_id.eq.' + playerId + ')');
        if (error) showToast('❌ Не удалось удалить друга');
        else { showToast('Друг удалён'); loadFriends(); }
    });

    // ===== НОВЫЙ AI PASS =====
    let passPlayTimeSeconds = 0;
    let passClaimedRewards = [];
    let isPassActive = true;

    function updatePassTime() {
        if (isPassActive) {
            passPlayTimeSeconds++;
            if (document.getElementById('passModal')?.classList.contains('show')) {
                renderPassCards();
            }
        }
    }
    setInterval(updatePassTime, 1000);

    function renderPassCards() {
        if (!isPassActive) {
            document.getElementById('passContent').classList.add('hidden');
            document.getElementById('noActivePassMessage').classList.remove('hidden');
            return;
        }
        document.getElementById('passContent').classList.remove('hidden');
        document.getElementById('noActivePassMessage').classList.add('hidden');

        const container = document.getElementById('passCardsContainer');
        let html = '';
        
        for (let m = 10; m <= 240; m += 5) {
            const isClaimed = passClaimedRewards.includes(m);
            const isUnlocked = passPlayTimeSeconds >= (m * 60);
            
            let rewardPoints = m * 200;
            let rewardStars = m % 10 === 5 ? 20 : 0;
            if (m === 10) rewardPoints = 2000;
            if (m === 15) { rewardPoints = 3500; rewardStars = 20; }

            let cardClass = 'pass-card';
            let btnHtml = '';

            if (isClaimed) {
                cardClass += ' claimed';
                btnHtml = `<div style="font-size:20px;color:#00ff00;margin-top:10px;">✅</div>`;
            } else if (isUnlocked) {
                cardClass += ' active';
                btnHtml = `<button class="claim-pass-btn" onclick="claimPassReward(${m}, ${rewardPoints}, ${rewardStars})" style="margin-top:10px;padding:5px;background:#4caf50;border:none;border-radius:5px;color:#fff;font-weight:bold;cursor:pointer;">Забрать</button>`;
            }

            let starsText = rewardStars > 0 ? `<div style="font-size:14px;color:#ffd700;">⭐ ${rewardStars}</div>` : '';

            html += `
                <div class="${cardClass}">
                    <div style="font-size:14px;color:#fff;font-weight:bold;margin-bottom:5px;">${m} минут</div>
                    <div style="font-size:18px;color:#ffd700;font-weight:900;">🧠 ${formatNumber(rewardPoints)}</div>
                    ${starsText}
                    ${btnHtml}
                </div>
            `;
        }
        container.innerHTML = html;
    }

    window.claimPassReward = function(minute, pts, strs) {
        if (passClaimedRewards.includes(minute)) return;
        if (passPlayTimeSeconds < minute * 60) return;

        passClaimedRewards.push(minute);
        points += pts;
        stars += strs;
        totalStarsEarned += strs;
        
        updateUI();
        saveGame();
        playBuySound();
        showToast(`🎁 Получено: +${formatNumber(pts)}🧠 ${strs > 0 ? '+'+strs+'⭐' : ''}`);
        renderPassCards();
    };

    document.getElementById('passBtn')?.addEventListener('click', () => {
        document.getElementById('passModal').classList.remove('hidden');
        document.getElementById('passEndDate').innerText = "31.12.2026";
        renderPassCards();
    });
    document.getElementById('closePassBtn')?.addEventListener('click', () => document.getElementById('passModal').classList.add('hidden'));
    document.getElementById('passScrollRight')?.addEventListener('click', () => {
        document.getElementById('passCardsContainer').scrollBy({ left: 250, behavior: 'smooth' });
    });

    // ОНЛАЙН
    async function updateOnlineStatus() {
        if (!supabaseClient) return;
        const myName = escapeHTML(localStorage.getItem('gamePlayerName') || 'Аноним');
        try {
            await supabaseClient.from('online_players').upsert({ player_id: playerId, player_name: myName, last_seen: new Date().toISOString() }, { onConflict: 'player_id' });
            const thirtySecsAgo = new Date(Date.now() - 30000).toISOString();
            const { count, error } = await supabaseClient.from('online_players').select('*', { count: 'exact', head: true }).gte('last_seen', thirtySecsAgo);
            if (!error && count !== null) { const el = document.getElementById('onlinePlayersNum'); if (el) el.innerText = count; }
        } catch (e) {}
    }
    setTimeout(updateOnlineStatus, 1000); setInterval(updateOnlineStatus, 15000);

    // ЧАТ С РЕАКЦИЯМИ
    async function loadChatMessages() {
        if (!supabaseClient) return;
        const list = document.getElementById('chatMessages');
        if (!list) return;
        try {
            const { data, error } = await supabaseClient.from('global_chat').select('*').order('created_at', { ascending: true }).limit(50);
            if (error) { list.innerHTML = `<div style="color: #ff4444; font-size: 12px; padding: 10px;">ОШИБКА ЧТЕНИЯ:<br>${error.message}<br>Код: ${error.code}</div>`; return; }
            if (!data || data.length === 0) { list.innerHTML = `<div style="color: #888; font-size: 12px; text-align: center; padding: 10px;">Сообщений пока нет...</div>`; return; }

            // Получаем реакции
            const messageIds = data.map(m => m.id);
            const { data: reactions } = await supabaseClient.from('chat_reactions').select('*').in('message_id', messageIds);

            const reactionsMap = {};
            if (reactions) {
                reactions.forEach(r => {
                    if (!reactionsMap[r.message_id]) reactionsMap[r.message_id] = { fire: 0, laugh: 0 };
                    if (r.reaction === 'fire') reactionsMap[r.message_id].fire++;
                    if (r.reaction === 'laugh') reactionsMap[r.message_id].laugh++;
                });
            }

            const isScrolledToBottom = list.scrollHeight - list.scrollTop <= list.clientHeight + 60;
            
            list.innerHTML = data.map(msg => {
                const rx = reactionsMap[msg.id] || { fire: 0, laugh: 0 };
                return `<div style="margin-bottom: 5px; font-size: 13px; line-height: 1.3; color: #fff; word-wrap: break-word;">
                    <b style="color: #ffd966;">${escapeHTML(msg.player_name)}:</b> <span>${escapeHTML(msg.message)}</span>
                    <div style="display:flex; gap:10px; margin-top:3px; font-size:12px;">
                        <span style="cursor:pointer;" onclick="addReaction(${msg.id}, 'fire')">🔥 ${rx.fire}</span>
                        <span style="cursor:pointer;" onclick="addReaction(${msg.id}, 'laugh')">😂 ${rx.laugh}</span>
                    </div>
                </div>`;
            }).join('');
            
            if (isScrolledToBottom) { list.scrollTop = list.scrollHeight; }
        } catch(e) { list.innerHTML = `<div style="color: #ff4444; font-size: 12px; padding: 10px;">КРИТИЧЕСКАЯ ОШИБКА:<br>${e.message}</div>`; }
    }

    window.addReaction = async function(msgId, type) {
        if (!supabaseClient) return;
        try {
            const { error } = await supabaseClient.from('chat_reactions').insert([{ message_id: msgId, player_id: playerId, reaction: type }]);
            if (error && error.code === '23505') {
                showToast('Вы уже ставили эту реакцию');
            } else {
                loadChatMessages();
            }
        } catch(e) {}
    };

    async function sendChatMessage() {
        if (!supabaseClient) return;
        const input = document.getElementById('chatInput');
        const text = input.value.trim();
        if (!text) return;
        input.value = '';
        const name = escapeHTML(localStorage.getItem('gamePlayerName') || 'Аноним');
        try {
            const safeMessage = text.substring(0, 200);
            const { error } = await supabaseClient.from('global_chat').insert([{ player_id: playerId, player_name: name, message: safeMessage }]);
            if (error) { showToast(`❌ Ошибка отправки: ${error.message}`); } else { loadChatMessages(); }
        } catch(e) { showToast('❌ Ошибка сети'); }
    }

    document.getElementById('chatBtn')?.addEventListener('click', () => { document.getElementById('chatModal')?.classList.add('show'); loadChatMessages(); });
    document.getElementById('closeChatBtn')?.addEventListener('click', () => document.getElementById('chatModal')?.classList.remove('show'));
    document.getElementById('sendChatBtn')?.addEventListener('click', sendChatMessage);
    document.getElementById('chatInput')?.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendChatMessage(); });
    setInterval(() => { if (document.getElementById('chatModal')?.classList.contains('show')) loadChatMessages(); }, 3000);

    // ===== ТУРНИР =====
    let currentDuelId = null, myDuelRole = null, myDuelScore = 0, oppDuelScore = 0, duelChannel = null, battleInterval = null, isDuelActive = false;

    function showTourneyScreen(screenId) { document.querySelectorAll('.tourney-screen').forEach(s => s.classList.add('hidden')); document.getElementById(screenId).classList.remove('hidden'); }
    function closeTourney() { document.getElementById('tournamentModal').classList.add('hidden'); if (currentDuelId && (myDuelRole === 'player1' && !isDuelActive)) { supabaseClient.from('duels').update({ status: 'cancelled' }).eq('id', currentDuelId).then(); } currentDuelId = null; isDuelActive = false; if (duelChannel) { supabaseClient.removeChannel(duelChannel); duelChannel = null; } if (battleInterval) { clearInterval(battleInterval); battleInterval = null; } }

    async function loadTourneyList() {
        const list = document.getElementById('tourneyOnlineList');
        list.innerHTML = '<div style="text-align:center; padding:20px; color:#fff; font-weight:900;">Загрузка...</div>';
        if (!supabaseClient) return;
        const thirtySecsAgo = new Date(Date.now() - 30000).toISOString();
        const { data, error } = await supabaseClient.from('online_players').select('*').gte('last_seen', thirtySecsAgo);
        if (error || !data) { list.innerHTML = 'Ошибка загрузки'; return; }
        const others = data.filter(p => p.player_id !== playerId);
        if (others.length === 0) { list.innerHTML = '<div style="text-align:center; padding:20px; color:#fff; font-weight:900; text-shadow:-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">Никого нет в сети...</div>'; return; }
        list.innerHTML = others.map(p => `<div class="tourney-player-row"><div class="tourney-player-name">${escapeHTML(p.player_name)}</div><button class="tourney-btn-red call-player-btn" data-id="${p.player_id}" data-name="${escapeHTML(p.player_name)}">Вызвать</button></div>`).join('');
        document.querySelectorAll('.call-player-btn').forEach(btn => { btn.addEventListener('click', (e) => { callPlayer(e.target.dataset.id, e.target.dataset.name); }); });
    }

    async function callPlayer(targetId, targetName) {
        const myName = escapeHTML(localStorage.getItem('gamePlayerName') || 'Аноним');
        if (!supabaseClient) return;
        const { data, error } = await supabaseClient.from('duels').insert([{ player1_id: playerId, player1_name: myName, player2_id: targetId, player2_name: targetName, status: 'waiting' }]).select();
        if (error || !data) { showToast('Ошибка создания дуэли'); return; }
        currentDuelId = data[0].id; myDuelRole = 'player1';
        document.getElementById('tourneyTargetNameWait').innerText = targetName;
        showTourneyScreen('tourneyWaitScreen'); subscribeToDuel();
    }

    function subscribeToDuel() {
        if (duelChannel) supabaseClient.removeChannel(duelChannel);
        duelChannel = supabaseClient.channel('duel_'+currentDuelId)
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'duels', filter: `id=eq.${currentDuelId}` }, payload => {
                const duel = payload.new;
                if (duel.status === 'accepted') { startCountdown(duel); }
                else if (duel.status === 'declined') { showToast('❌ Игрок отклонил вызов'); closeTourney(); }
                else if (duel.status === 'cancelled') { showToast('❌ Игрок отменил дуэль'); closeTourney(); }
                else if (duel.status === 'playing') {
                    showTourneyScreen('tourneyBattleScreen');
                    document.getElementById('tourneyP1Name').innerText = duel.player1_name;
                    document.getElementById('tourneyP2Name').innerText = duel.player2_name;
                    myDuelScore = (myDuelRole === 'player1') ? duel.player1_score : duel.player2_score;
                    oppDuelScore = (myDuelRole === 'player1') ? duel.player2_score : duel.player1_score;
                    updateDuelScoreUI(); startBattleTimer();
                } else if (duel.status === 'finished') { endBattle(duel); }
            }).subscribe();
    }

    if (supabaseClient) {
        supabaseClient.channel('duel_invites')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'duels', filter: `player2_id=eq.${playerId}` }, payload => {
                const duel = payload.new;
                if (duel.status === 'waiting' && !currentDuelId) {
                    currentDuelId = duel.id; myDuelRole = 'player2';
                    document.getElementById('tourneyChallengerName').innerText = escapeHTML(duel.player1_name);
                    document.getElementById('tournamentModal').classList.remove('hidden');
                    showTourneyScreen('tourneyChallengeScreen'); subscribeToDuel();
                }
            }).subscribe();
    }

    function startCountdown(duel) {
        showTourneyScreen('tourneyCountdownScreen');
        let count = 3; const text = document.getElementById('tourneyCountdownText'); text.innerText = count;
        const countInt = setInterval(() => {
            count--;
            if (count > 0) { text.innerText = count; }
            else if (count === 0) { text.innerText = "1!"; }
            else { clearInterval(countInt); if (myDuelRole === 'player1') { supabaseClient.from('duels').update({ status: 'playing' }).eq('id', currentDuelId).then(); } }
        }, 1000);
    }

    function startBattleTimer() {
        isDuelActive = true; myDuelScore = 0; let timeLeft = 10;
        battleInterval = setInterval(() => {
            if (!isDuelActive) return;
            timeLeft--;
            if (timeLeft <= 0) { clearInterval(battleInterval); if (myDuelRole === 'player1') { supabaseClient.from('duels').update({ status: 'finished' }).eq('id', currentDuelId).then(); } }
            else { if (myDuelRole === 'player1') { supabaseClient.from('duels').update({ player1_score: myDuelScore }).eq('id', currentDuelId).then(); } else { supabaseClient.from('duels').update({ player2_score: myDuelScore }).eq('id', currentDuelId).then(); } }
        }, 1000);
    }

    function updateDuelScoreUI() {
        document.getElementById('tourneyP1Score').innerText = (myDuelRole === 'player1') ? myDuelScore : oppDuelScore;
        document.getElementById('tourneyP2Score').innerText = (myDuelRole === 'player1') ? oppDuelScore : myDuelScore;
    }

    document.getElementById('tourneyBrain')?.addEventListener('pointerdown', (e) => { e.preventDefault(); if (!isDuelActive) return; myDuelScore++; updateDuelScoreUI(); playClickSound(); });

    function endBattle(duel) {
        isDuelActive = false; showTourneyScreen('tourneyResultScreen');
        const p1Score = duel.player1_score, p2Score = duel.player2_score;
        let iWon = false;
        if (myDuelRole === 'player1' && p1Score > p2Score) iWon = true;
        if (myDuelRole === 'player2' && p2Score > p1Score) iWon = true;
        const resText = document.getElementById('tourneyResultText'), resReward = document.getElementById('tourneyResultReward');
        if (iWon) { resText.innerText = 'Победа!'; resText.style.color = '#00ff00'; resReward.innerText = '+10⭐ +200 000🧠'; stars += 10; points += 200000; updateUI(); saveGame(); }
        else if (p1Score === p2Score) { resText.innerText = 'Ничья!'; resText.style.color = '#ffffff'; resReward.innerText = 'Без награды'; }
        else { resText.innerText = 'Поражение...'; resText.style.color = '#ff0000'; resReward.innerText = 'В следующий раз повезет'; }
    }

    document.getElementById('tourneyBtn')?.addEventListener('click', () => { const myName = localStorage.getItem('gamePlayerName'); if (!myName) { showToast('Сначала задайте ник в настройках!'); return; } document.getElementById('tournamentModal').classList.remove('hidden'); showTourneyScreen('tourneySearchScreen'); loadTourneyList(); });
    document.getElementById('tourneyExitBtn')?.addEventListener('click', () => { if (isDuelActive) { showToast('Нельзя выйти во время боя!'); return; } closeTourney(); });
    document.getElementById('tourneyAcceptBtn')?.addEventListener('click', () => { if (currentDuelId) supabaseClient.from('duels').update({ status: 'accepted' }).eq('id', currentDuelId).then(); });
    document.getElementById('tourneyDeclineBtn')?.addEventListener('click', () => { if (currentDuelId) supabaseClient.from('duels').update({ status: 'declined' }).eq('id', currentDuelId).then(); closeTourney(); });

    // ЛИДЕРБОРД — АВТОМАТИЧЕСКАЯ СИНХРОНИЗАЦИЯ
    let leaderboardSyncBusy = false;
    async function syncLeaderboard() {
        const rawName = (localStorage.getItem('gamePlayerName') || '').trim();
        if (!supabaseClient || !rawName || leaderboardSyncBusy) return false;
        leaderboardSyncBusy = true;
        try {
            const { error } = await supabaseClient.from('leaderboard').upsert({
                player_id: playerId,
                player_name: rawName,
                score: Math.floor(Number(points) || 0),
                updated_at: new Date().toISOString()
            }, { onConflict: 'player_id' });
            if (error) throw error;
            return true;
        } catch(e) {
            console.error('Синхронизация лидерборда:', e);
            return false;
        } finally {
            leaderboardSyncBusy = false;
        }
    }
    async function showLeaderboard() {
        const modal = document.getElementById('leaderboardModal'), list = document.getElementById('leaderboardList');
        modal.classList.add('show'); list.innerHTML = 'Загрузка...';
        if (!supabaseClient) { list.innerHTML = 'Нет подключения к серверу'; return; }
        const { data, error } = await supabaseClient.from('leaderboard').select('*').order('score', { ascending: false }).limit(10);
        if (error || !data) { list.innerHTML = 'Ошибка загрузки'; return; }
        list.innerHTML = data.map((p, i) => `<div style="display:flex; justify-content:space-between; padding:10px 5px; border-bottom:1px solid #333; font-weight:bold; font-size:15px;"><span>${i+1}. ${escapeHTML(p.player_name)}</span> <span style="color:#ffd966;">🧠 ${formatNumber(p.score)}</span></div>`).join('');
    }
    document.getElementById('leaderboardBtn')?.addEventListener('click', showLeaderboard);
    document.getElementById('closeLeaderboardBtn')?.addEventListener('click', () => document.getElementById('leaderboardModal').classList.remove('show'));

    // Сразу добавляем игрока с сохранённым ником и далее обновляем его результат каждые 5 секунд.
    if ((localStorage.getItem('gamePlayerName') || '').trim()) syncLeaderboard();
    setInterval(() => {
        if ((localStorage.getItem('gamePlayerName') || '').trim()) syncLeaderboard();
    }, 5000);

    // ===== ADMIN ABUSE TOOL =====
    let activeAbuseEffects = [];
    let starRainInterval = null;

    async function loadActiveAbuse() {
        if (!supabaseClient) return;
        const { data } = await supabaseClient.from('active_abuse').select('*');
        if (data) { activeAbuseEffects = data.map(d => d.feature); applyAbuseEffects(); }
    }
    
    function applyAbuseEffects() {
        if (activeAbuseEffects.includes('rainbow')) { document.body.classList.add('bg-rainbow'); } else { document.body.classList.remove('bg-rainbow'); }
    }

    function showBrainSpeech(text) {
        const speech = document.getElementById('brainSpeech');
        if (speech) {
            speech.innerText = text; speech.style.display = 'block';
            clearTimeout(window.brainSpeechTimeout);
            window.brainSpeechTimeout = setTimeout(() => { speech.style.display = 'none'; }, 5000);
        }
    }

    async function sendAdminCommand(type, payload = '', targetPlayer = null) {
        if (!supabaseClient) return;
        const insertData = { command_type: type, payload: String(payload) };
        if (targetPlayer) insertData.target_player = targetPlayer;
        await supabaseClient.from('admin_commands').insert([insertData]);
    }

    async function toggleAbuseEffect(feature, enable) {
        if (!supabaseClient) return;
        if (enable) { await supabaseClient.from('active_abuse').insert([{ feature: feature, payload: 'true' }]); } 
        else { await supabaseClient.from('active_abuse').delete().eq('feature', feature); }
    }

    if (supabaseClient) {
        supabaseClient.channel('admin_events')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'admin_commands' }, payload => {
                const cmd = payload.new;
                
                if (cmd.target_player) {
                    const myName = localStorage.getItem('gamePlayerName');
                    if (!myName || cmd.target_player.toLowerCase() !== myName.toLowerCase()) {
                        return; 
                    }
                }

                if (cmd.command_type === 'give_points') { points += parseInt(cmd.payload); updateUI(); showToast(`👑 Разработчик дал вам +${cmd.payload}🧠!`); }
                if (cmd.command_type === 'give_stars') { stars += parseInt(cmd.payload); totalStarsEarned += parseInt(cmd.payload); updateUI(); showToast(`👑 Разработчик дал вам +${cmd.payload}⭐!`); }
                if (cmd.command_type === 'star_rain') { startStarRain(); }
                if (cmd.command_type === 'dialogue') { showBrainSpeech(cmd.payload); }
                if (cmd.command_type === 'start_vote') { showVoteModal(cmd.payload); }
                if (cmd.command_type === 'spawn_global_boss') { spawnBoss(); showToast('🌍 МИРОВОЙ БОСС ЗАСПАВНЕН!'); }
            })
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'active_abuse' }, payload => {
                if (!activeAbuseEffects.includes(payload.new.feature)) activeAbuseEffects.push(payload.new.feature);
                applyAbuseEffects();
            })
            .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'active_abuse' }, payload => {
                activeAbuseEffects = activeAbuseEffects.filter(f => f !== payload.old.feature);
                applyAbuseEffects();
            })
            .subscribe();
    }

    function startStarRain() {
        showToast('🌟 ЗВЕЗДНЫЙ ДОЖДЬ НАЧАЛСЯ!');
        if (starRainInterval) clearInterval(starRainInterval);
        let count = 0;
        starRainInterval = setInterval(() => {
            if (count > 50) { clearInterval(starRainInterval); return; }
            count++;
            const star = document.createElement('div');
            star.className = 'meteor'; star.innerText = '⭐';
            star.style.left = Math.random() * window.innerWidth + 'px'; star.style.top = '-50px'; star.style.fontSize = '30px'; star.style.cursor = 'pointer'; star.style.position = 'fixed'; star.style.zIndex = '99999';
            document.body.appendChild(star);
            const duration = 2000 + Math.random() * 2000;
            star.animate([{ transform: `translateY(0) rotate(0deg)` }, { transform: `translateY(100vh) rotate(360deg)` }], { duration: duration, iterations: 1, easing: 'linear' });
            star.onclick = () => { stars += 1; totalStarsEarned += 1; updateUI(); saveGame(); playBuySound(); star.remove(); };
            setTimeout(() => { if (star.parentNode) star.remove(); }, duration);
        }, 200);
    }

    function showVoteModal(jsonStr) {
        try {
            const data = JSON.parse(jsonStr);
            const pollId = data.q; // Используем текст вопроса как ID
            document.getElementById('voteQuestion').innerText = pollId;
            document.getElementById('voteModal').classList.add('show');
            
            const btnYes = document.getElementById('voteBtnYes');
            const btnNo = document.getElementById('voteBtnNo');
            const newBtnYes = btnYes.cloneNode(true);
            const newBtnNo = btnNo.cloneNode(true);
            btnYes.parentNode.replaceChild(newBtnYes, btnYes);
            btnNo.parentNode.replaceChild(newBtnNo, btnNo);
            
            // Загружаем текущие результаты
            updateVoteProgress(pollId);

            // Подписываемся на обновления голосов
            if (window.voteChannel) supabaseClient.removeChannel(window.voteChannel);
            window.voteChannel = supabaseClient.channel('poll_'+pollId)
                .on('postgres_changes', { event: '*', schema: 'public', table: 'poll_votes', filter: `poll_id=eq.${pollId}` }, () => {
                    updateVoteProgress(pollId);
                }).subscribe();

            newBtnYes.onclick = async () => { 
                await castVote(pollId, 'yes');
            };
            newBtnNo.onclick = async () => { 
                await castVote(pollId, 'no');
            };
        } catch(e) { console.log('Ошибка парсинга голосования', e); }
    }

    async function castVote(pollId, voteValue) {
        if (!supabaseClient) return;
        try {
            const { error } = await supabaseClient.from('poll_votes').insert([{ poll_id: pollId, player_id: playerId, vote_value: voteValue }]);
            if (error && error.code === '23505') {
                showToast('❌ Вы уже голосовали!');
            } else if (error) {
                showToast('❌ Ошибка голосования');
            } else {
                showToast('✅ Голос учтен!');
            }
        } catch(e) {}
    }

    async function updateVoteProgress(pollId) {
        if (!supabaseClient) return;
        try {
            const { data, error } = await supabaseClient.from('poll_votes').select('vote_value').eq('poll_id', pollId);
            if (error || !data) return;

            let yesCount = 0, noCount = 0;
            data.forEach(v => {
                if (v.vote_value === 'yes') yesCount++;
                if (v.vote_value === 'no') noCount++;
            });

            const total = yesCount + noCount;
            let yesPercent = 0, noPercent = 0;

            if (total > 0) {
                yesPercent = Math.round((yesCount / total) * 100);
                noPercent = 100 - yesPercent;
            } else {
                yesPercent = 50;
                noPercent = 50;
            }

            const yesEl = document.getElementById('voteProgressYes');
            const noEl = document.getElementById('voteProgressNo');
            if (yesEl && noEl) {
                yesEl.style.width = yesPercent + '%';
                yesEl.innerText = yesPercent + '%';
                noEl.style.width = noPercent + '%';
                noEl.innerText = noPercent + '%';
            }
        } catch(e) {}
    }

    // ===== ОСТАЛЬНАЯ ЛОГИКА ИГРЫ =====
    const ACHIEVEMENTS = [{ id: 'click1', name: 'Первый клик', desc: 'Сделай 1 клик', condition: () => totalClicks >= 1, points: 100, stars: 1 },{ id: 'click1000', name: 'Кликер-маньяк', desc: 'Сделай 1000 кликов', condition: () => totalClicks >= 1000, points: 5000, stars: 10 },{ id: 'neuron10', name: 'Новичок', desc: 'Купи 10 сетей', condition: () => purchasedCount >= 10, points: 1000, stars: 5 },{ id: 'neuron100', name: 'Коллекционер', desc: 'Купи 100 сетей', condition: () => purchasedCount >= 100, points: 50000, stars: 50 },{ id: 'neuron500', name: 'Сетевой магнат', desc: 'Купи 500 сетей', condition: () => purchasedCount >= 500, points: 500000, stars: 200 },{ id: 'prestige1', name: 'Перерождение', desc: 'Сделай первое перерождение', condition: () => prestigeLevel >= 1, points: 100000, stars: 100 },{ id: 'star100', name: 'Звездочёт', desc: 'Накопи 100 звёзд', condition: () => stars >= 100, points: 10000, stars: 0 },{ id: 'star1000', name: 'Галактика', desc: 'Накопи 1000 звёзд', condition: () => stars >= 1000, points: 100000, stars: 0 },{ id: 'boss', name: 'Босс', desc: 'Купи ВСЕ 2200 сетей', condition: () => purchasedCount >= 2200, points: 10000000, stars: 5000 }];
    const neuralNames = ["Перцептрон","Нейро-искра","Сверточная","Рекуррентная","Трансформер","Квантовая","GPT-клик","Автокодировщик","DALL-E","Глубокий мозг","Gemini","Нейро-интерфейс","Claude 3","Мультивселенная","Midjourney","Легендарная","Сингулярность","Божественный ИИ","Нейро-Земля","ИИ-Солнце","Галактическая","Космическая","Сверхразум","ДНК-бота","Бесконечность","Лев","Тигр","Медведь","Волк","Лиса","Орёл","Сокол","Дельфин","Кит","Акула","Пантера","Ягуар","Леопард","Гепард","Зебра","Жираф","Слон","Носорог","Бегемот","Крокодил","Питон","Анаконда","Хамелеон","Игуана","Фламинго","Пингвин","Сова","Ястреб","Скорпион","Паук","Пицца","Бургер","Суши","Роллы","Рамен","Паста","Спагетти","Лазанья","Тирамису","Панна-котта","Крем-брюле","Макаронс","Эклер","Пончик","Круассан","Багет","Сыр","Ветчина","Колбаса","Бекон","Стейк","Гриль","Барбекю","Шашлык","Плов","Борщ","Оливье","Сельдь","Икра","Блины","Меркурий","Венера","Земля","Марс","Юпитер","Сатурн","Уран","Нептун","Плутон","Церера","Эрида","Макемаке","Хаумеа","Седна","Орк","Иксион","Варуна","Квавар","Фобос","Деймос","Ио","Европа","Ганимед","Каллисто","Титан","Рея","Япет","Мимас","Энцелад","Тритон","Mario","Link","Samus","Kirby","Fox","Pikachu","Charizard","Mewtwo","Cloud","Sephiroth","Sonic","Tails","Knuckles","Shadow","Master Chief","Cortana","Doom","Ryu","Ken","Chun-Li","Kratos","Atreus","Lara","Nathan","Ezio","Altair","Gordon","Freeman","Chell","Wheatley"];
    let upgrades = []; for (let i = 0; i < 2200; i++) { upgrades.push({ id: i, name: i < neuralNames.length ? neuralNames[i] : `Нейросеть #${i + 1}`, power: i === 0 ? 1 : 1 + Math.floor(i / 10), price: i === 0 ? 20 : Math.floor(20 * Math.pow(1.17, i)), purchased: i === 0 }); }
    let currentPage = 0, ITEMS_PER_PAGE = 20, totalPages = Math.ceil(upgrades.length / ITEMS_PER_PAGE);

    function updateBrainEvolution() {
        const brain = document.getElementById('clickableObject');
        if (!brain) return;
        brain.classList.remove('evo-stage-1', 'evo-stage-2', 'evo-stage-3', 'evo-stage-4', 'evo-stage-5');
        if (purchasedCount < 200) brain.classList.add('evo-stage-1');
        else if (purchasedCount < 600) brain.classList.add('evo-stage-2');
        else if (purchasedCount < 1000) brain.classList.add('evo-stage-3');
        else if (purchasedCount < 1500) brain.classList.add('evo-stage-4');
        else brain.classList.add('evo-stage-5');
    }

    function renderShopNeurons() {
        const start = currentPage * ITEMS_PER_PAGE, end = Math.min(start + ITEMS_PER_PAGE, upgrades.length); let html = '';
        if (totalPages > 1) html += `<div class="pagination"><button class="page-btn" id="firstPageBtn">${t('first_page')}</button><button class="page-btn" id="prevPageBtn">${t('prev_page')}</button><span>${currentPage+1}/${totalPages}</span><button class="page-btn" id="nextPageBtn">${t('next_page')}</button><button class="page-btn" id="lastPageBtn">${t('last_page')}</button></div>`;
        for (let i = start; i < end; i++) { const u = upgrades[i]; let finalPrice = u.price; if (saleData.active) finalPrice = Math.floor(finalPrice * (1 - saleData.discount_percent / 100)); html += `<div class="shop-item" data-id="${u.id}"><span>${u.name} +${u.power}</span><span>${u.purchased ? '✅' : `💰 ${formatNumber(finalPrice)}`}</span></div>`; }
        if (totalPages > 1) html += `<div class="pagination"><button class="page-btn" id="firstPageBtn2">${t('first_page')}</button><button class="page-btn" id="prevPageBtn2">${t('prev_page')}</button><span>${currentPage+1}/${totalPages}</span><button class="page-btn" id="nextPageBtn2">${t('next_page')}</button><button class="page-btn" id="lastPageBtn2">${t('last_page')}</button></div>`;
        document.getElementById('shopNeurons').innerHTML = html;
        document.querySelectorAll('#shopNeurons .shop-item').forEach(el => { const u = upgrades[parseInt(el.dataset.id)]; if (!u.purchased) el.addEventListener('click', () => buyUpgrade(u.id)); });
        ['firstPageBtn', 'firstPageBtn2'].forEach(id => document.getElementById(id)?.addEventListener('click', () => { currentPage = 0; renderShopNeurons(); }));
        ['lastPageBtn', 'lastPageBtn2'].forEach(id => document.getElementById(id)?.addEventListener('click', () => { currentPage = totalPages - 1; renderShopNeurons(); }));
        ['prevPageBtn', 'prevPageBtn2'].forEach(id => document.getElementById(id)?.addEventListener('click', () => { if (currentPage > 0) { currentPage--; renderShopNeurons(); } }));
        ['nextPageBtn', 'nextPageBtn2'].forEach(id => document.getElementById(id)?.addEventListener('click', () => { if (currentPage < totalPages - 1) { currentPage++; renderShopNeurons(); } }));
    }

    function renderShopHelpers() {
        const container = document.getElementById('shopHelpers'); if (!container) return; let html = '';
        helpers.forEach(h => {
            const upgradePrice = Math.floor(h.basePrice * 1.5 * h.level);
            if (!h.bought) { html += `<div class="skin-item" data-id="${h.id}"><div class="skin-info"><div class="skin-name">${h.emoji} ${h.name}</div><div class="skin-mult">+${h.power} кликов/сек</div><div class="skin-price">💰 ${formatNumber(h.basePrice)}</div></div><button class="skin-btn helpers-buy-btn" data-id="${h.id}" style="background:#4caf50;">${t('helpers_buy')}</button></div>`; }
            else { html += `<div class="skin-item active" data-id="${h.id}"><div class="skin-info"><div class="skin-name">${h.emoji} ${h.name} (${t('helpers_level')} ${h.level})</div><div class="skin-mult">+${h.power * h.level} кликов/сек</div><div class="skin-price">💰 ${formatNumber(upgradePrice)}</div></div><button class="skin-btn helpers-up-btn" data-id="${h.id}" style="background:#ffaa00;">${t('helpers_upgrade')}</button></div>`; }
        });
        container.innerHTML = html;
        document.querySelectorAll('.helpers-buy-btn').forEach(btn => { btn.onclick = (e) => { const id = parseInt(e.target.dataset.id); const h = helpers[id]; if (points >= h.basePrice) { points -= h.basePrice; h.bought = true; updateUI(); saveGame(); renderShopHelpers(); showToast('✅ Помощник куплен!'); } else showToast(t('not_enough')); }; });
        document.querySelectorAll('.helpers-up-btn').forEach(btn => { btn.onclick = (e) => { const id = parseInt(e.target.dataset.id); const h = helpers[id]; const price = Math.floor(h.basePrice * 1.5 * h.level); if (points >= price) { points -= price; h.level++; updateUI(); saveGame(); renderShopHelpers(); showToast('✅ Прокачано!'); } else showToast(t('not_enough')); }; });
    }

    function renderShopSkins() {
        const container = document.getElementById('shopSkins'); if (!container) return; let html = '';
        SKINS.forEach(skin => {
            const isUnlocked = purchasedSkins.includes(skin.id) || skin.id === 'normal' || (skin.id === 'halloween' && isHalloween());
            const isEquipped = currentSkin === skin.id;
            const priceText = (skin.id === 'halloween' && isHalloween()) ? t('skin_event_free') : (skin.price > 0 ? `💰 ${skin.price}⭐` : t('skin_free'));
            const nameText = t('skin_' + skin.id); const emoji = skin.id === 'halloween' ? '🎃' : (skin.id === 'amethyst' ? '💎' : '🧠');
            let btnText = isEquipped ? t('skin_equipped') : (isUnlocked ? t('skin_equip') : `${t('skin_buy')}${skin.price}⭐`);
            let btnStyle = isEquipped ? 'background:#555; color:#aaa;' : (isUnlocked ? 'background:#4caf50;' : 'background:#ffaa00;');
            html += `<div class="skin-item ${isEquipped ? 'active' : ''}" data-id="${skin.id}"><div class="skin-info"><div class="skin-name">${nameText} ${emoji}</div><div class="skin-mult">${t('skin_mult')}${skin.mult}</div><div class="skin-price">${priceText}</div></div><button class="skin-btn" style="${btnStyle}" data-action="${isEquipped ? 'none' : (isUnlocked ? 'equip' : 'buy')}">${btnText}</button></div>`;
        });
        container.innerHTML = html;
        document.querySelectorAll('#shopSkins .skin-btn').forEach(btn => { btn.addEventListener('click', (e) => { e.stopPropagation(); const id = e.target.closest('.skin-item').dataset.id; if (btn.dataset.action === 'equip') { currentSkin = id; localStorage.setItem('currentSkin', id); applySkin(); saveGame(); showToast(t('skin_equipped_toast')); renderShopSkins(); } else if (btn.dataset.action === 'buy') buySkin(id); }); });
    }

    function buySkin(id) { const skin = SKINS.find(s => s.id === id); if (!skin) return; if (stars < skin.price) { showToast(`❌ ${t('need_stars')} ${skin.price}⭐`); return; } stars -= skin.price; purchasedSkins.push(id); localStorage.setItem('purchasedSkins', JSON.stringify(purchasedSkins)); currentSkin = id; localStorage.setItem('currentSkin', id); updateUI(); applySkin(); saveGame(); renderShopSkins(); showToast(`✅ ${t('skin_' + skin.id)} ${t('skin_bought')}`); playBuySound(); }
    function applySkin() { const brain = document.getElementById('clickableObject'); if (!brain) return; brain.classList.remove('skin-normal', 'skin-halloween', 'skin-amethyst'); brain.classList.add('skin-' + currentSkin); const emoji = document.getElementById('brainEmoji'); if (emoji) { if (currentSkin === 'normal') { emoji.innerText = '🧠'; emoji.style.display = 'block'; } else if (currentSkin === 'halloween') { emoji.innerText = '🎃'; emoji.style.display = 'block'; } else if (currentSkin === 'amethyst') { emoji.style.display = 'none'; } } updateBrainEvolution(); }
    function getSkinMultiplier() { return getSkinMultiplierTS(currentSkin, SKINS); }
    function buyUpgrade(id) { const u = upgrades[id]; let finalPrice = u.price; if (saleData.active) finalPrice = Math.floor(finalPrice * (1 - saleData.discount_percent / 100)); if (!u.purchased && points >= finalPrice) { points -= finalPrice; u.purchased = true; purchasedCount++; updateUI(); renderShopNeurons(); saveGame(); showToast(`✅ ${u.name} ${t('bought')}`); playBuySound(); } else showToast(t('not_enough')); }
    function buyAllAvailable() { const list = upgrades.map((u, i) => ({ u, i })).filter(x => !x.u.purchased).sort((a, b) => a.u.price - b.u.price); let bought = 0; for (const item of list) { let finalPrice = item.u.price; if (saleData.active) finalPrice = Math.floor(finalPrice * (1 - saleData.discount_percent / 100)); if (points >= finalPrice) { points -= finalPrice; item.u.purchased = true; bought++; } else break; } if (bought > 0) { purchasedCount = upgrades.filter(u => u.purchased).length; updateUI(); renderShopNeurons(); saveGame(); showToast(`💰 ${t('bought_count')}: ${bought}!`); playBuySound(); } else showToast(t('not_enough')); }

    const EXCHANGES = [{ id: 'exNew', type: 'pointsToStars', cost: 10, reward: 1, label: '10🧠 = 1⭐' },{ id: 'ex1', type: 'starsToPoints', cost: 500, reward: 10000000, label: '500⭐ = 10M🧠' },{ id: 'ex2', type: 'starsToPoints', cost: 450, reward: 1000000, label: '450⭐ = 1M🧠' },{ id: 'ex3', type: 'starsToPoints', cost: 250, reward: 100000, label: '250⭐ = 100K🧠' },{ id: 'ex4', type: 'pointsToStars', cost: 1000000, reward: 100, label: '1M🧠 = 100⭐' },{ id: 'soon', type: 'soon', label: 'soon', disabled: true }];
    function renderShopStars() { const container = document.getElementById('shopStars'); if (!container) return; let html = ''; EXCHANGES.forEach(ex => { html += `<div class="${ex.disabled ? 'exchange-item disabled' : 'exchange-item'}" data-ex="${ex.id}">${ex.disabled ? t('soon') : ex.label}</div>`; }); container.innerHTML = html; document.querySelectorAll('#shopStars .exchange-item').forEach(el => { const ex = EXCHANGES.find(e => e.id === el.dataset.ex); if (ex && !ex.disabled) el.addEventListener('click', () => doExchange(ex)); else el.addEventListener('click', () => showToast(t('soon_feature'))); }); }
    function doExchange(ex) { if (ex.type === 'starsToPoints') { if (stars < ex.cost) { showToast(`❌ ${t('need_stars')} ${ex.cost}⭐`); return; } stars -= ex.cost; points += ex.reward; updateUI(); saveGame(); showToast(`✅ -${ex.cost}⭐ → +${formatNumber(ex.reward)}🧠`); } else { if (points < ex.cost) { showToast(`❌ ${t('need_points')} ${formatNumber(ex.cost)}🧠`); return; } points -= ex.cost; stars += ex.reward; totalStarsEarned += ex.reward; updateUI(); saveGame(); showToast(`✅ -${formatNumber(ex.cost)}🧠 → +${ex.reward}⭐`); } playBuySound(); }

    function switchShopTab(tab) {
        const tn = document.querySelector('.shop-tab[data-tab="neurons"]'), th = document.querySelector('.shop-tab[data-tab="helpers"]'), ts = document.querySelector('.shop-tab[data-tab="stars"]'), tk = document.querySelector('.shop-tab[data-tab="skins"]');
        const ln = document.getElementById('shopNeurons'), lh = document.getElementById('shopHelpers'), ls = document.getElementById('shopStars'), lk = document.getElementById('shopSkins'), bb = document.getElementById('buyAllBtn');
        [tn, th, ts, tk].forEach(t2 => t2?.classList.remove('active')); [ln, lh, ls, lk].forEach(l => { if (l) l.style.display = 'none'; }); if (bb) bb.style.display = 'none';
        if (tab === 'helpers') { th?.classList.add('active'); if (lh) lh.style.display = 'block'; renderShopHelpers(); }
        else if (tab === 'stars') { ts?.classList.add('active'); if (ls) ls.style.display = 'block'; renderShopStars(); }
        else if (tab === 'skins') { tk?.classList.add('active'); if (lk) lk.style.display = 'block'; renderShopSkins(); }
        else { tn?.classList.add('active'); if (ln) ln.style.display = 'block'; if (bb) bb.style.display = ''; renderShopNeurons(); }
    }

    const ROULETTE_PRIZES = [{ emoji: '💰', type: 'points', min: 100000, max: 1000000 },{ emoji: '⭐', type: 'stars', min: 50, max: 200 },{ emoji: '🧠', type: 'points', min: 5000000, max: 25000000 },{ emoji: '🌟', type: 'stars', min: 10, max: 50 },{ emoji: '⚡', type: 'boost', duration: 15 * 60 * 1000 },{ emoji: '🎁', type: 'nothing' },{ emoji: '💥', type: 'points', min: 100000000, max: 500000000 },{ emoji: '👑', type: 'stars', min: 2000, max: 5000 }];
    function openRoulette() { document.getElementById('rouletteOverlay')?.classList.add('show'); }
    function spinRoulette() {
        if (rouletteSpinning) return; if (stars < rouletteCost) { showToast(t('roulette_no_stars')); return; }
        stars -= rouletteCost; updateUI(); saveGame(); rouletteSpinning = true;
        const btn = document.getElementById('rouletteSpinBtn'); if (btn) { btn.disabled = true; btn.innerText = t('roulette_spinning'); }
        const slots = document.querySelectorAll('#rouletteWheel .roulette-slot'); slots.forEach(s => s.classList.remove('win'));
        let c = 0; const total = 30; const finalIdx = Math.floor(Math.random() * slots.length);
        const int = setInterval(() => {
            slots.forEach(s => s.classList.remove('win')); slots[c % slots.length].classList.add('win'); c++; playClickSound();
            if (c >= total + finalIdx) { clearInterval(int); slots.forEach(s => s.classList.remove('win')); slots[finalIdx].classList.add('win'); giveRoulettePrize(finalIdx); rouletteSpinning = false; if (btn) { btn.disabled = false; btn.innerText = t('roulette_spin'); } }
        }, 70);
    }
    function giveRoulettePrize(idx) {
        const emoji = document.querySelectorAll('#rouletteWheel .roulette-slot')[idx]?.innerText || '🎁'; let p = ROULETTE_PRIZES.find(x => x.emoji === emoji) || ROULETTE_PRIZES[0]; let msg = '';
        if (p.type === 'points') { const a = Math.floor(p.min + Math.random() * (p.max - p.min)); points += a; msg = `+${formatNumber(a)}🧠`; if (emoji === '💥') showJackpot(); }
        else if (p.type === 'stars') { const a = Math.floor(p.min + Math.random() * (p.max - p.min)); stars += a; totalStarsEarned += a; msg = `+${formatNumber(a)}⭐`; if (emoji === '👑') showJackpot(); }
        else if (p.type === 'nothing') { msg = t('roulette_nothing'); }
        else if (p.type === 'boost') { boostEndTime = Date.now() + p.duration; updateBoostUI(); msg = `⚡ Буст X5 (15 мин)!`; }
        updateUI(); saveGame(); if (p.type !== 'nothing') showToast(`${t('roulette_win')}: ${emoji} ${msg}`); else showToast(msg); playBuySound();
    }
    function showJackpot() { showToast(t('roulette_jackpot')); document.body.style.filter = 'brightness(1.5) contrast(1.2)'; setTimeout(() => document.body.style.filter = '', 400); playBuySound(); setTimeout(playBuySound, 150); setTimeout(playBuySound, 300); }

    function isBoostActive() { return isBoostActiveTS(boostEndTime); } function getBoostRemaining() { return Math.max(0, boostEndTime - Date.now()); } function isBirthdayBoostActive() { return Date.now() < birthdayBoostEndTime; } function isMarch8BoostActive() { return Date.now() < march8BoostEndTime; } function isX10BoostActive() { return Date.now() < x10BoostEndTime; }
    function updateBoostUI() { const btn = document.getElementById('boostBtn'); if (!btn) return; if (isBoostActive()) { const ms = getBoostRemaining(); btn.innerText = `${t('boost_active')} ${Math.floor(ms / 60000)}:${Math.floor((ms % 60000) / 1000).toString().padStart(2, '0')}`; btn.classList.add('active'); } else { btn.innerText = t('boost'); btn.classList.remove('active'); } updateBoostTimersPanel(); }
    function updateBoostTimersPanel() {
        const panel = document.getElementById('boostTimerPanel'); if (!panel) return; let html = '';
        if (isBoostActive()) { const ms = getBoostRemaining(); html += `<div class="boost-timer-item">⚡×5: ${Math.floor(ms/3600000)}:${Math.floor((ms%3600000)/60000).toString().padStart(2,'0')}:${Math.floor((ms%60000)/1000).toString().padStart(2,'0')}</div>`; }
        if (isBirthdayBoostActive()) { const ms = birthdayBoostEndTime - Date.now(); html += `<div class="boost-timer-item">🎂×10: ${Math.floor(ms/3600000)}:${Math.floor((ms%3600000)/60000).toString().padStart(2,'0')}:${Math.floor((ms%60000)/1000).toString().padStart(2,'0')}</div>`; }
        if (isMarch8BoostActive()) { const ms = march8BoostEndTime - Date.now(); html += `<div class="boost-timer-item">🌷×15: ${Math.floor(ms/3600000)}:${Math.floor((ms%3600000)/60000).toString().padStart(2,'0')}:${Math.floor((ms%60000)/1000).toString().padStart(2,'0')}</div>`; }
        if (isX10BoostActive()) { const ms = x10BoostEndTime - Date.now(); html += `<div class="boost-timer-item">🧠×10: ${Math.floor(ms/3600000)}:${Math.floor((ms%3600000)/60000).toString().padStart(2,'0')}:${Math.floor((ms%60000)/1000).toString().padStart(2,'0')}</div>`; }
        panel.innerHTML = html;
    }
    function startBoostTimer() { if (boostInterval) clearInterval(boostInterval); updateBoostUI(); boostInterval = setInterval(() => { if (isBoostActive() || isBirthdayBoostActive() || isMarch8BoostActive() || isX10BoostActive()) updateBoostTimersPanel(); if (isBoostActive()) updateBoostUI(); else if (boostEndTime > 0) { boostEndTime = 0; showToast(t('boost_ended')); updateUI(); } }, 1000); }
    function buyBoost() { if (isBoostActive()) { showToast(t('boost_already')); return; } if (stars < BOOST_PRICE) { showToast(`❌ ${t('need_stars')} ${BOOST_PRICE}⭐`); return; } stars -= BOOST_PRICE; boostEndTime = Date.now() + BOOST_DURATION; updateUI(); updateBoostUI(); saveGame(); showToast(t('boost_activated')); playBuySound(); }
    function updateAutoClickerUI() { const btn = document.getElementById('autoclickerBtn'); if (!btn) return; if (autoclickerBought) { btn.innerText = t('autoclicker_active'); btn.classList.add('active'); btn.style.background = 'linear-gradient(145deg, #2e7d32, #1a5a20)'; btn.style.borderColor = '#66cc66'; } else { btn.innerText = t('autoclicker'); btn.classList.remove('active'); btn.style.background = ''; btn.style.borderColor = ''; } }
    function buyAutoclicker() { if (autoclickerBought) { showToast(t('autoclicker_bought')); return; } if (stars < AUTOCLICKER_PRICE) { showToast(t('autoclicker_no_stars')); return; } stars -= AUTOCLICKER_PRICE; autoclickerBought = true; startAutoclicker(); updateAutoClickerUI(); updateUI(); saveGame(); showToast(t('autoclicker_bought')); playBuySound(); }
    function startAutoclicker() { if (autoclickerInterval) clearInterval(autoclickerInterval); if (!autoclickerBought) return; let rate = 10; if (autoclickerRateBonus > 0) rate = autoclickerRateBonus; autoclickerInterval = setInterval(() => { points += getClickPower(); totalClicks++; sessionClicks++; updateUI(); }, 1000 / rate); }
    setInterval(() => { let passive = 0; helpers.forEach(h => { if(h.bought) passive += (h.power * h.level); }); if(passive > 0) { points += passive; updateUI(); } }, 1000);

    function canGetDailyGift() { return localStorage.getItem('dailyGiftDate') !== new Date().toISOString().slice(0, 10); }
    function claimDailyGift() { if (!canGetDailyGift()) { showToast(t('daily_gift_already')); return; } localStorage.setItem('dailyGiftDate', new Date().toISOString().slice(0, 10)); points += 50000; stars += 25; totalStarsEarned += 25; updateUI(); saveGame(); showToast(`${t('daily_gift_got')} +50K🧠 +25⭐`); playBuySound(); updateDailyGiftUI(); }
    function updateDailyGiftUI() { const btn = document.getElementById('dailyGiftBtn'); if (!btn) return; if (canGetDailyGift()) { btn.style.opacity = '1'; btn.style.animation = 'dailyGiftPulse 1.5s ease-in-out infinite'; } else { btn.style.opacity = '0.5'; btn.style.animation = 'none'; } }

    function checkAchievements() { let newUnlocked = false; ACHIEVEMENTS.forEach(ach => { if (!unlockedAchievements.includes(ach.id) && ach.condition()) { unlockedAchievements.push(ach.id); points += ach.points; stars += ach.stars; totalStarsEarned += ach.stars; newUnlocked = true; showToast(`${t('ach_unlocked')} ${ach.name}`); playBuySound(); } }); if (newUnlocked) { localStorage.setItem('neuralAch', JSON.stringify(unlockedAchievements)); renderAchievements(); } }
    function renderAchievements() { const list = document.getElementById('achList'); if (!list) return; let html = ''; ACHIEVEMENTS.forEach(ach => { const isUnlocked = unlockedAchievements.includes(ach.id); html += `<div class="${isUnlocked ? 'ach-item unlocked' : 'ach-item locked'}"><div class="ach-info"><div class="ach-name">${isUnlocked ? '🏆' : '🔒'} ${ach.name}</div><div class="ach-desc">${ach.desc}</div></div><div class="ach-reward">+${formatNumber(ach.points)}🧠 +${ach.stars}⭐</div></div>`; }); list.innerHTML = html; }
    function spawnMeteor() { const el = document.createElement('div'); el.className = 'meteor'; el.innerText = '📢'; const startY = Math.random() * (window.innerHeight - 100); el.style.top = startY + 'px'; el.style.left = '-100px'; document.body.appendChild(el); el.addEventListener('click', () => { points += 5000; updateUI(); saveGame(); showToast(`${t('meteor_win')}5000🧠`); playBuySound(); el.remove(); }); let pos = -100; const int = setInterval(() => { pos += 6; el.style.left = pos + 'px'; if (pos > window.innerWidth + 50) { clearInterval(int); el.remove(); } }, 30); }
    function spawnPet() { const pet = document.getElementById('pet'); if (!pet || !pet.classList.contains('hidden')) return; pet.classList.remove('hidden'); pet.style.left = '-50px'; pet.style.top = (Math.random() * 60 + 20) + '%'; let pos = -50; const int = setInterval(() => { pos += 3; pet.style.left = pos + 'px'; if (pos > window.innerWidth) { clearInterval(int); pet.classList.add('hidden'); } }, 30); pet.onclick = () => { clearInterval(int); pet.classList.add('hidden'); stars += 50; totalStarsEarned += 50; updateUI(); saveGame(); showToast('✨ Питомец дал +50⭐!'); playBuySound(); }; }
    setInterval(spawnPet, 90000);

    let bossHp = 0, bossMaxHp = 0, bossActive = false;
    function spawnBoss() { if(bossActive) return; bossActive = true; bossMaxHp = 100 + totalClicks * 2; bossHp = bossMaxHp; const overlay = document.getElementById('bossOverlay'); const hpFill = document.getElementById('bossHpFill'); const emoji = document.getElementById('bossEmoji'); document.querySelector('.boss-title').innerText = t('boss_title'); document.querySelector('.boss-hint').innerText = t('boss_hint'); overlay.classList.add('show'); hpFill.style.width = '100%'; emoji.onclick = () => { if(!bossActive) return; bossHp--; hpFill.style.width = (bossHp/bossMaxHp*100) + '%'; playClickSound(); if(bossHp <= 0) { bossActive = false; overlay.classList.remove('show'); const reward = 50000; points += reward; stars += 100; totalStarsEarned += 100; updateUI(); saveGame(); showToast(`${t('boss_killed')} +${formatNumber(reward)}🧠 +100⭐`); playBuySound(); } }; setTimeout(() => { if(bossActive){ bossActive = false; overlay.classList.remove('show'); } }, 15000); }

    function getPrestigeMultiplier() { return getPrestigeMultiplierTS(prestigeLevel, PRESTIGE_BONUS_PER_LEVEL); }
    function updatePrestigeDisplay() { document.getElementById('prestigeLevelDisplay').innerText = prestigeLevel; document.getElementById('prestigeBonusDisplay').innerText = '+' + Math.round(prestigeLevel * PRESTIGE_BONUS_PER_LEVEL * 100) + '%'; document.getElementById('prestigeNeedDisplay').innerText = purchasedCount < upgrades.length ? 'Купи все сети' : 'ГОТОВО!'; }
    
    function doPrestige() { 
        if (purchasedCount < upgrades.length) { showToast(t('prestige_not_enough')); return; } 
        if (!confirm(t('prestige_confirm'))) return; 
        prestigeLevel++; points = 10; purchasedCount = 1; upgrades.forEach((u, i) => { u.purchased = (i === 0); }); updateUI(); renderShopNeurons(); updatePrestigeDisplay(); saveGame(); showToast(`🌟 ${t('prestige_done')} ${prestigeLevel}!`); playBuySound(); document.getElementById('prestigeModal')?.classList.remove('show'); 
    }
    
    function calculateOfflineIncome() { return calculateOfflineIncomeTS(Date.now(), lastSaveTime, getClickPower(), OFFLINE_MAX_HOURS, OFFLINE_RATE); }
    function showOfflineReward(amount) { document.getElementById('offlineReward').innerText = '+' + formatNumber(amount) + ' 🧠'; document.getElementById('offlineOverlay')?.classList.add('show'); }

    const soundProfiles = [{ name: "Обычный", freq: 880, type: "sine" }, { name: "Пиксельный", freq: 1200, type: "square" }, { name: "Глубокий", freq: 440, type: "sawtooth" }];
    let currentSoundProfile = 0, audioCtx = null, musicEnabled = localStorage.getItem('musicEnabled') === 'true';
    function initMusic() { if (audioCtx) return; try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {} }
    function playClickSound() { if (!audioCtx) initMusic(); if (audioCtx) { try { const p = soundProfiles[currentSoundProfile]; const o = audioCtx.createOscillator(); const g = audioCtx.createGain(); o.type = p.type; o.frequency.value = p.freq; g.gain.value = 0.08; g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05); o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime + 0.05); } catch(e) {} } }
    function playBuySound() { if (!audioCtx) initMusic(); if (audioCtx) { try { const o = audioCtx.createOscillator(); const g = audioCtx.createGain(); o.type = "triangle"; o.frequency.value = 523.25; g.gain.value = 0.08; g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1); o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime + 0.1); } catch(e) {} } }

    const musicBtn = document.getElementById('musicToggle');
    if (musicBtn) { musicBtn.innerText = musicEnabled ? '🔊' : '🔇'; musicBtn.onclick = () => { musicEnabled = !musicEnabled; localStorage.setItem('musicEnabled', musicEnabled); musicBtn.innerText = musicEnabled ? '🔊' : '🔇'; }; }
    document.querySelectorAll('.menu-btn').forEach((btn,i)=>{ btn.style.animationDelay=`${i*0.05}s`; });

    function spawnFloatText(x, y, text) { const el = document.createElement('div'); el.className = 'float-text'; el.innerText = text; el.style.left = (x - 20) + 'px'; el.style.top = (y - 10) + 'px'; document.body.appendChild(el); setTimeout(() => el.remove(), 1000); }
    function spawnParticles(x, y) {
        for (let i = 0; i < 4; i++) {
            const p = document.createElement('div');
            p.className = 'click-particle';
            p.style.left = x + 'px';
            p.style.top = y + 'px';
            const angle = Math.random() * Math.PI * 2;
            const distance = 20 + Math.random() * 40;
            p.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
            p.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 600);
        }
    }

    function updateStatsUI() { document.getElementById('statTotalClicks').innerText = formatNumber(totalClicks); document.getElementById('statNeuronsBought').innerText = purchasedCount; document.getElementById('statSessionClicks').innerText = formatNumber(sessionClicks); }
    function updatePlaytime() { const el = document.getElementById('playtime'); if (el) el.innerText = Math.max(0, Math.floor((Date.now() - gameStartTime) / 60000)); }
    function startSleepMsgTimer() { if (sleepMsgTimer) clearTimeout(sleepMsgTimer); sleepMsgTimer = setTimeout(() => { if (!sleepMsgShowing) { sleepMsgShowing = true; document.getElementById('sleepMsg')?.classList.add('show'); } }, 45000); }
    function hideSleepMsg() { if (sleepMsgTimer) clearTimeout(sleepMsgTimer); if (sleepMsgShowing) { sleepMsgShowing = false; document.getElementById('sleepMsg')?.classList.remove('show'); } startSleepMsgTimer(); }

    function shareProgress() { const text = `🧠 ${t('title')}:\n🧠 ${formatNumber(points)}\n⭐ ${formatNumber(stars)}\n🖱️ ${formatNumber(totalClicks)}\n🧬 ${purchasedCount}/${upgrades.length}\n🌟 Перерождение: ${prestigeLevel}\n📅 ${GAME_VERSION}`; navigator.clipboard.writeText(text); showToast(t('copied')); }
    
    function getClickPower() {
        let base = 1; upgrades.forEach(u => { if (u.purchased) base += u.power; });
        if (godMode) base *= 10;
        if (isBoostActive()) base *= BOOST_MULTIPLIER;
        if (isBirthdayBoostActive()) base *= BIRTHDAY_BOOST_MULT;
        if (isMarch8BoostActive()) base *= MARCH8_BOOST_MULT;
        if (isX10BoostActive()) base *= X10_BOOST_MULT;
        if (globalEventMultiplier > 1) base *= globalEventMultiplier;
        
        if (globalBoost.active && globalBoost.type === 'points') { base *= globalBoost.multiplier; }

        base *= getPrestigeMultiplier(); base *= getSkinMultiplier(); return Math.floor(base);
    }

    function updateUI() { document.getElementById('points').innerText = formatNumber(points); document.getElementById('power').innerText = getClickPower(); document.getElementById('clickHint').innerHTML = godMode ? `+${formatNumber(getClickPower())} (БОГ)` : `+${formatNumber(getClickPower())}`; document.getElementById('stars').innerText = formatNumber(stars); updateStatsUI(); updatePlaytime(); document.getElementById('comboText')?.classList.remove('show'); updateBrainEvolution(); checkPassProgress(); checkAchievements(); }
    function showToast(msg) { const t2 = document.createElement('div'); t2.className = 'toast'; t2.innerText = msg; document.body.appendChild(t2); setTimeout(() => t2.remove(), 2500); }

    function saveGame() {
        lastSaveTime = Date.now();
        const saveData = {
            points, stars, totalClicks, purchasedCount, totalStarsEarned, godMode,
            comboCounter, prestigeLevel, birthdayBoostEndTime, march8BoostEndTime,
            x10BoostEndTime, autoclickerBought, autoclickerLevel, unlockedAchievements,
            helpers: helpers.map(h => ({ bought: h.bought, level: h.level })),
            currentSkin, purchasedSkins,
            upgrades: upgrades.map(u => ({ purchased: u.purchased })),
            passPlayTimeSeconds, passClaimedRewards, boostEndTime, gameStartTime,
            currentSoundProfile, gameVersion: GAME_VERSION, lastSaveTime
        };
        try {
            const serialized = JSON.stringify(saveData);
            // Сначала записываем резервную копию, затем основное сохранение.
            localStorage.setItem('neuralEvoSaveBackup', serialized);
            localStorage.setItem('neuralEvoSave', serialized);
            // Проверяем, что основная запись действительно доступна для чтения.
            const check = JSON.parse(localStorage.getItem('neuralEvoSave'));
            if (!check || Number(check.points) !== Number(points)) {
                throw new Error('Проверка сохранения не пройдена');
            }
        } catch (e) {
            console.error('Не удалось сохранить прогресс:', e);
        }
    }

    function loadGame() {
        let saved = null;
        let d = null;
        try {
            saved = localStorage.getItem('neuralEvoSave');
            if (saved) d = JSON.parse(saved);
        } catch (e) {
            console.error('Основное сохранение повреждено, пробуем резервное:', e);
        }
        if (!d || typeof d !== 'object' || Array.isArray(d)) {
            try {
                saved = localStorage.getItem('neuralEvoSaveBackup');
                d = saved ? JSON.parse(saved) : null;
                if (d && typeof d === 'object' && !Array.isArray(d)) {
                    console.warn('Прогресс восстановлен из резервной копии.');
                } else {
                    d = null;
                }
            } catch (e) {
                console.error('Резервная копия сохранения недоступна:', e);
                d = null;
            }
        }
        if (d) {
            try {
                if (!d || typeof d !== 'object' || Array.isArray(d)) throw new Error('Некорректный формат сохранения');
                if (Number.isFinite(Number(d.points))) points = Number(d.points);
                if (Number.isFinite(Number(d.stars))) stars = Number(d.stars);
                else if (Number.isFinite(Number(d.diamonds))) stars = Math.floor(Number(d.diamonds) / 10);
                if (Number.isFinite(Number(d.totalClicks))) totalClicks = Number(d.totalClicks);
                if (Number.isFinite(Number(d.totalStarsEarned))) totalStarsEarned = Number(d.totalStarsEarned);
                else if (Number.isFinite(Number(d.totalDiamondsEarned))) totalStarsEarned = Number(d.totalDiamondsEarned);
                if (typeof d.godMode === 'boolean') godMode = d.godMode;
                if (Number.isFinite(Number(d.comboCounter))) comboCounter = Number(d.comboCounter);
                if (Number.isFinite(Number(d.prestigeLevel))) prestigeLevel = Number(d.prestigeLevel);
                if (Number.isFinite(Number(d.boostEndTime))) boostEndTime = Number(d.boostEndTime);
                if (Number.isFinite(Number(d.birthdayBoostEndTime))) birthdayBoostEndTime = Number(d.birthdayBoostEndTime);
                if (Number.isFinite(Number(d.march8BoostEndTime))) march8BoostEndTime = Number(d.march8BoostEndTime);
                if (Number.isFinite(Number(d.x10BoostEndTime))) x10BoostEndTime = Number(d.x10BoostEndTime);
                if (typeof d.autoclickerBought === 'boolean') autoclickerBought = d.autoclickerBought;
                if (Number.isFinite(Number(d.autoclickerLevel))) autoclickerLevel = Number(d.autoclickerLevel);
                if (Array.isArray(d.unlockedAchievements)) unlockedAchievements = d.unlockedAchievements;
                if (Array.isArray(d.helpers)) d.helpers.forEach((hData, i) => {
                    if (helpers[i] && hData && typeof hData === 'object') {
                        if (typeof hData.bought === 'boolean') helpers[i].bought = hData.bought;
                        if (Number.isFinite(Number(hData.level))) helpers[i].level = Number(hData.level);
                    }
                });
                if (Number.isFinite(Number(d.lastSaveTime)) && Number(d.lastSaveTime) > 0) lastSaveTime = Number(d.lastSaveTime);
                if (typeof d.currentSkin === 'string' && d.currentSkin) currentSkin = d.currentSkin;
                if (Array.isArray(d.purchasedSkins)) purchasedSkins = d.purchasedSkins;
                if (Array.isArray(d.upgrades)) d.upgrades.forEach((data, i) => {
                    if (upgrades[i] && data && typeof data.purchased === 'boolean') upgrades[i].purchased = data.purchased;
                });
                if (Number.isFinite(Number(d.passPlayTimeSeconds))) passPlayTimeSeconds = Number(d.passPlayTimeSeconds);
                if (Array.isArray(d.passClaimedRewards)) passClaimedRewards = d.passClaimedRewards;
                if (Number.isFinite(Number(d.gameStartTime)) && Number(d.gameStartTime) > 0) gameStartTime = Number(d.gameStartTime);
                if (Number.isFinite(Number(d.currentSoundProfile))) currentSoundProfile = Number(d.currentSoundProfile);
                purchasedCount = upgrades.filter(u => u.purchased).length;
                // Миграцию сохраняем после расчёта офлайн-дохода, чтобы не сбросить время отсутствия.
            } catch(e) {
                console.error('Ошибка чтения сохранения. Исходные данные оставлены без изменений:', e);
            }
        }
        updateUI(); renderShopNeurons(); updateStatsUI(); renderAchievements(); startBoostTimer(); if (playtimeInterval) clearInterval(playtimeInterval); playtimeInterval = setInterval(() => updatePlaytime(), 60000); startSleepMsgTimer(); updateAutoClickerUI(); updateDailyGiftUI(); applyTheme(); applySkin(); applyButtonColor(localStorage.getItem('btnColor') || 'blue'); updatePrestigeDisplay();
        const offlineIncome = calculateOfflineIncome();
        if (offlineIncome > 0) {
            points += offlineIncome;
            setTimeout(() => showOfflineReward(offlineIncome), 2600);
            updateUI();
        }
        // Сохраняем новое время только после расчёта награды за прошлое отсутствие.
        saveGame();
        if (isBirthday() && !isBirthdayBoostActive() && !localStorage.getItem('birthdayBoostUsed_' + new Date().toDateString())) { birthdayBoostEndTime = Date.now() + BIRTHDAY_BOOST_DURATION; localStorage.setItem('birthdayBoostUsed_' + new Date().toDateString(), 'true'); setTimeout(() => showToast(t('birthday_boost')), 3000); saveGame(); }
        if (isMarch8() && !isMarch8BoostActive() && !localStorage.getItem('march8BoostUsed_' + new Date().toDateString())) { march8BoostEndTime = Date.now() + MARCH8_BOOST_DURATION; localStorage.setItem('march8BoostUsed_' + new Date().toDateString(), 'true'); setTimeout(() => showToast(t('march8_boost')), 3000); saveGame(); }
        loadActiveAbuse();
    }

    document.getElementById('diamondRemovalOk')?.addEventListener('click', () => document.getElementById('diamondRemovalOverlay')?.classList.remove('show'));
    document.getElementById('offlineOkBtn')?.addEventListener('click', () => document.getElementById('offlineOverlay')?.classList.remove('show'));

    function exportProgress() { saveGame(); const saved = localStorage.getItem('neuralEvoSave'); let data = {}; if (saved) try { data = JSON.parse(saved); } catch(e) {} data.gameVersion = GAME_VERSION; data.exportDate = new Date().toISOString(); const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "neural_evolution_save.json"; a.click(); showToast(t('saved')); }
    function importProgress(file) { const reader = new FileReader(); reader.onload = (e) => { try { const data = JSON.parse(e.target.result); data.gameVersion = GAME_VERSION; localStorage.setItem('neuralEvoSave', JSON.stringify(data)); showToast(t('loaded')); setTimeout(() => location.reload(), 1000); } catch { showToast(t('load_error')); } }; reader.readAsText(file); }
    const importInput = document.createElement('input'); importInput.type = 'file'; importInput.accept = '.json'; importInput.onchange = (e) => { if (e.target.files[0]) importProgress(e.target.files[0]); };

    const bgThemes = { early_autumn: "bg-early-autumn", golden: "bg-golden", rainy: "bg-rainy", late: "bg-late", forest: "bg-forest", park: "bg-park", mountains: "bg-mountains", village: "bg-village" };
    function setBodyBg(theme) { if (isHalloween() || isNewYear() || isHackerMode() || isBirthday() || isMarch8()) { applyTheme(); return; } document.body.className = ''; document.body.classList.add(bgThemes[theme] || 'bg-early-autumn'); applyButtonColor(localStorage.getItem('btnColor') || 'blue'); localStorage.setItem('selectedBg', theme); applySkin(); applyAbuseEffects(); }

    function processSingleClick(gain, x, y) {
        hideSleepMsg(); comboCounter++; let finalGain = gain;
        if (comboCounter % 5 === 0) { finalGain = gain * 2; const comboText = document.getElementById('comboText'); if (comboText) { comboText.innerText = phrasesData.combo || t('combo'); comboText.classList.add('show'); setTimeout(() => comboText.classList.remove('show'), 800); } spawnFloatText(x, y - 40, "🔥 x2!"); }
        if (Math.random() < 0.02) { finalGain *= 3; spawnFloatText(x, y - 40, "⚡ x3!"); showToast(t('triple_click')); playBuySound(); }
        if (Math.random() < 0.05) { finalGain *= 10; spawnFloatText(x, y - 60, phrasesData.crit || t('crit_click')); showToast(phrasesData.crit || t('crit_click')); playBuySound(); const brain = document.getElementById('clickableObject'); if(brain) { brain.style.boxShadow = '0 0 50px #ffd700'; setTimeout(() => brain.style.boxShadow = '', 300); } }
        points += finalGain; totalClicks++; sessionClicks++; playClickSound();
        registerGlobalEventClick();
        spawnParticles(x, y);
        
        if (Math.random() < starsData.chance) { 
            let starAmount = starsData.amount;
            if (globalBoost.active && globalBoost.type === 'stars') { starAmount *= globalBoost.multiplier; }
            stars += starAmount; 
            totalStarsEarned += starAmount; 
            showToast(`⭐ ЗВЁЗДЫ! +${starAmount}`); 
            playBuySound(); 
            spawnFloatText(x, y - 30, "⭐⭐⭐"); 
        }
        
        if (isHalloween() && Math.random() < 0.02) { stars += 5; totalStarsEarned += 5; showToast(t('pumpkin_click')); spawnFloatText(x, y - 50, "🎃 +5⭐"); playBuySound(); }
    }

    function handlePointerDown(e) { e.preventDefault(); if (e.pointerType === 'mouse' && e.button !== 0) return; const gain = getClickPower(); processSingleClick(gain, e.clientX, e.clientY); const brain = document.getElementById('clickableObject'); if(brain) { brain.style.transform = 'scale(0.92)'; setTimeout(() => brain.style.transform = '', 120); } updateUI(); saveGame(); }
    const clickable = document.getElementById('clickableObject'); if (clickable) { clickable.addEventListener('pointerdown', handlePointerDown); }


    // Мини-игра v16.8: бесконечные реалистичные воздушные шарики
    const balloonModal = document.getElementById('balloonGameModal');
    const balloonField = document.getElementById('balloonPlayfield');
    const balloonSizeInput = document.getElementById('balloonSize');
    const balloonCountInput = document.getElementById('balloonCount');
    let balloonGameActive = false;
    let balloonSpawnTimer = null;
    let balloonSizeValue = 2;
    let balloonTargetCount = 15;
    const balloonColors = [
        'radial-gradient(ellipse at 30% 22%, #fff2f2 0%, #ffb5b5 9%, #f23d4e 32%, #a90825 78%, #620719 100%)',
        'radial-gradient(ellipse at 30% 22%, #f1fbff 0%, #b6edff 9%, #31a9ed 32%, #0759ad 78%, #06346c 100%)',
        'radial-gradient(ellipse at 30% 22%, #fffdf0 0%, #fff0a5 9%, #ffc52e 32%, #df7900 78%, #8b4300 100%)',
        'radial-gradient(ellipse at 30% 22%, #fff5ff 0%, #f3c7ff 9%, #bd55e8 32%, #7620a9 78%, #3c105f 100%)',
        'radial-gradient(ellipse at 30% 22%, #f0fff7 0%, #a9f5c8 9%, #28bd75 32%, #087344 78%, #03452b 100%)'
    ];
    function updateBalloonSettings() {
        balloonSizeValue = Number(balloonSizeInput?.value || 2);
        balloonTargetCount = Number(balloonCountInput?.value || 15);
        const sizeNames = ['Маленькие', 'Средние', 'Большие'];
        const sizeLabel = document.getElementById('balloonSizeLabel');
        const countLabel = document.getElementById('balloonCountLabel');
        if (sizeLabel) sizeLabel.textContent = sizeNames[balloonSizeValue - 1];
        if (countLabel) countLabel.textContent = String(balloonTargetCount);
        if (balloonGameActive) fillBalloonField();
    }
    let balloonAudioContext = null;
    const balloonPopAudio = new Audio('./assets/a-short-clear-sound-of-a-bursting-balloon.mp3');
    balloonPopAudio.preload = 'auto';

    function playBalloonPopSound() {
        try {
            balloonPopAudio.currentTime = 0;
            const playback = balloonPopAudio.play();
            if (playback && typeof playback.catch === 'function') {
                playback.catch(error => console.warn('Не удалось воспроизвести звук шарика:', error));
            }
        } catch (error) {
            console.warn('Не удалось воспроизвести звук шарика:', error);
        }
    }

    function createBalloon() {
        if (!balloonField || !balloonGameActive) return;
        const balloon = document.createElement('div');
        balloon.className = 'balloon';
        const dimensions = [34, 58, 88][balloonSizeValue - 1];
        const variation = 0.82 + Math.random() * 0.36;
        const width = Math.round(dimensions * variation);
        const height = Math.round(width * 1.28);
        const fieldWidth = balloonField.clientWidth;
        balloon.style.width = width + 'px';
        balloon.style.height = height + 'px';
        balloon.style.left = Math.max(0, Math.random() * Math.max(1, fieldWidth - width)) + 'px';
        balloon.style.background = balloonColors[Math.floor(Math.random() * balloonColors.length)];
        balloon.style.setProperty('--rise-time', (6 + Math.random() * 5) + 's');
        balloon.addEventListener('pointerdown', (event) => {
            event.preventDefault();
            if (!balloon.isConnected || balloon.classList.contains('balloon-pop')) return;
            const rect = balloon.getBoundingClientRect();
            const fieldRect = balloonField.getBoundingClientRect();
            balloon.classList.add('balloon-pop');
            playBalloonPopSound();
            for (let i = 0; i < 7; i++) {
                const bit = document.createElement('i');
                bit.className = 'balloon-burst';
                bit.style.left = (rect.left - fieldRect.left + rect.width / 2) + 'px';
                bit.style.top = (rect.top - fieldRect.top + rect.height / 2) + 'px';
                bit.style.background = balloonColors[Math.floor(Math.random() * balloonColors.length)].match(/#[0-9a-f]{3,8}/i)?.[0] || '#ffffff';
                const angle = Math.PI * 2 * i / 7;
                bit.style.setProperty('--dx', Math.cos(angle) * (18 + Math.random() * 28) + 'px');
                bit.style.setProperty('--dy', Math.sin(angle) * (18 + Math.random() * 28) + 'px');
                balloonField.appendChild(bit);
                setTimeout(() => bit.remove(), 450);
            }
            setTimeout(() => balloon.remove(), 170);
            setTimeout(fillBalloonField, 180);
        });
        balloon.addEventListener('animationend', (event) => {
            if (event.animationName === 'balloonRise') {
                balloon.remove();
                fillBalloonField();
            }
        });
        balloonField.appendChild(balloon);
    }
    function fillBalloonField() {
        if (!balloonGameActive || !balloonField) return;
        const current = balloonField.querySelectorAll('.balloon:not(.balloon-pop)').length;
        for (let i = current; i < balloonTargetCount; i++) {
            setTimeout(() => { if (balloonGameActive && balloonField.querySelectorAll('.balloon:not(.balloon-pop)').length < balloonTargetCount) createBalloon(); }, i * 75);
        }
    }
    function startBalloonGame() {
        if (!balloonField) return;
        balloonGameActive = true;
        balloonField.innerHTML = '';
        document.getElementById('balloonStartHint')?.remove();
        fillBalloonField();
        const startButton = document.getElementById('balloonStartBtn');
        if (startButton) startButton.textContent = '↻ ПЕРЕЗАПУСТИТЬ';
    }
    function stopBalloonGame() {
        balloonGameActive = false;
        if (balloonSpawnTimer) clearInterval(balloonSpawnTimer);
        balloonSpawnTimer = null;
        if (balloonField) balloonField.innerHTML = '<div class="balloon-start-hint">Нажми «НАЧАТЬ»!</div>';
        const startButton = document.getElementById('balloonStartBtn');
        if (startButton) startButton.textContent = '▶ НАЧАТЬ';
    }
    document.getElementById('balloonGameBtn')?.addEventListener('click', () => {
        balloonModal?.classList.add('show');
        updateBalloonSettings();
    });
    document.getElementById('balloonStartBtn')?.addEventListener('click', startBalloonGame);
    document.getElementById('balloonCloseBtn')?.addEventListener('click', () => {
        stopBalloonGame();
        balloonModal?.classList.remove('show');
    });
    balloonSizeInput?.addEventListener('input', updateBalloonSettings);
    balloonCountInput?.addEventListener('input', updateBalloonSettings);
    balloonModal?.addEventListener('click', (event) => {
        if (event.target === balloonModal) {
            stopBalloonGame();
            balloonModal.classList.remove('show');
        }
    });

    const tutorialOverlay = document.getElementById('tutorialOverlay'), tutorialStep1 = document.getElementById('tutorialStep1'), tutorialStep2 = document.getElementById('tutorialStep2');
    function showTutorial() { tutorialStep1?.classList.remove('hidden'); tutorialStep2?.classList.add('hidden'); tutorialOverlay?.classList.add('show'); }
    function goToGame() {
        if (!(localStorage.getItem('gamePlayerName') || '').trim()) {
            mandatoryNicknameOverlay?.classList.add('show');
            return;
        }
        document.getElementById('mainMenu').classList.add('hidden'); 
        document.getElementById('gameInterface').classList.remove('hidden'); 
        document.getElementById('newsBtn')?.classList.add('hidden'); 
        document.getElementById('chatBtn')?.classList.remove('hidden'); 
        document.getElementById('tourneyBtn')?.classList.remove('hidden'); 
    }
    document.getElementById('tutorialYes')?.addEventListener('click', () => { tutorialStep1.classList.add('hidden'); tutorialStep2.classList.remove('hidden'); });
    document.getElementById('tutorialNo')?.addEventListener('click', () => { localStorage.setItem('tutorialDone', 'true'); tutorialOverlay?.classList.remove('show'); goToGame(); });
    document.getElementById('tutorialOk')?.addEventListener('click', () => { localStorage.setItem('tutorialDone', 'true'); tutorialOverlay?.classList.remove('show'); goToGame(); });
    document.getElementById('playBtn')?.addEventListener('click', () => {
        if (!(localStorage.getItem('gamePlayerName') || '').trim()) {
            mandatoryNicknameOverlay?.classList.add('show');
            mandatoryNicknameInput?.focus();
            return;
        }
        if (!localStorage.getItem('tutorialDone')) { showTutorial(); return; }
        goToGame();
    });
    document.getElementById('prestigeBtn')?.addEventListener('click', () => { updatePrestigeDisplay(); document.getElementById('prestigeModal')?.classList.add('show'); });
    document.getElementById('doPrestigeBtn')?.addEventListener('click', doPrestige);
    document.getElementById('closePrestigeBtn')?.addEventListener('click', () => document.getElementById('prestigeModal')?.classList.remove('show'));
    document.getElementById('backToMenu')?.addEventListener('click', () => { 
        document.getElementById('mainMenu').classList.remove('hidden'); 
        document.getElementById('gameInterface').classList.add('hidden'); 
        document.getElementById('newsBtn')?.classList.remove('hidden'); 
        document.getElementById('chatBtn')?.classList.add('hidden'); 
        document.getElementById('tourneyBtn')?.classList.add('hidden'); 
    });

    document.getElementById('testBtn3')?.addEventListener('click', () => {
        showToast('✅ Тест 3 работает');
    });

    document.getElementById('testBtn4')?.addEventListener('click', () => {
        showToast('✅ Тест 4 работает');
    });

    document.getElementById('openShopBtn')?.addEventListener('click', () => { document.getElementById('shopPanel').classList.add('show'); switchShopTab('neurons'); });
    document.getElementById('closeShopBtn')?.addEventListener('click', () => document.getElementById('shopPanel').classList.remove('show'));
    document.getElementById('buyAllBtn')?.addEventListener('click', buyAllAvailable);
    document.getElementById('boostBtn')?.addEventListener('click', buyBoost);
    document.getElementById('autoclickerBtn')?.addEventListener('click', buyAutoclicker);
    document.getElementById('dailyGiftBtn')?.addEventListener('click', claimDailyGift);
    document.getElementById('rouletteBtn')?.addEventListener('click', openRoulette);
    document.getElementById('rouletteSpinBtn')?.addEventListener('click', spinRoulette);
    document.getElementById('rouletteCloseBtn')?.addEventListener('click', () => document.getElementById('rouletteOverlay')?.classList.remove('show'));
    document.getElementById('achBtn')?.addEventListener('click', () => { renderAchievements(); document.getElementById('achOverlay')?.classList.add('show'); });
    document.getElementById('achCloseBtn')?.addEventListener('click', () => document.getElementById('achOverlay')?.classList.remove('show'));
    document.getElementById('factCloseBtn')?.addEventListener('click', () => document.getElementById('factOverlay')?.classList.remove('show'));
    document.getElementById('settingsBtn')?.addEventListener('click', () => document.getElementById('settingsModal').classList.add('show'));
    document.getElementById('closeSettings')?.addEventListener('click', () => document.getElementById('settingsModal').classList.remove('show'));
    function resetGameKeepingPlayerIdentity() {
        const savedName = localStorage.getItem('gamePlayerName');
        const savedPlayerId = localStorage.getItem('gamePlayerId');
        localStorage.clear();
        if (savedName) localStorage.setItem('gamePlayerName', savedName);
        if (savedPlayerId) localStorage.setItem('gamePlayerId', savedPlayerId);
        location.reload();
    }

    document.getElementById('resetGameBtn')?.addEventListener('click', () => { if (confirm("Сбросить всё? / Reset all?")) { resetGameKeepingPlayerIdentity(); } });
    
    document.getElementById('newsBtn')?.addEventListener('click', () => document.getElementById('newsModal').classList.add('show'));
    document.getElementById('closeNewsBtn')?.addEventListener('click', () => document.getElementById('newsModal').classList.remove('show'));

    document.getElementById('langRu')?.addEventListener('click', () => setLanguage('ru'));
    document.getElementById('langEn')?.addEventListener('click', () => setLanguage('en'));
    document.getElementById('setLangRu')?.addEventListener('click', () => setLanguage('ru'));
    document.getElementById('setLangEn')?.addEventListener('click', () => setLanguage('en'));

    document.querySelectorAll('.color-btn').forEach(btn => btn.addEventListener('click', () => { applyButtonColor(btn.dataset.color); showToast(`🎨 ${btn.dataset.color}`); }));
    document.querySelectorAll('.shop-tab').forEach(tab => tab.addEventListener('click', () => switchShopTab(tab.dataset.tab)));

    document.getElementById('exportSaveBtn')?.addEventListener('click', exportProgress);
    document.getElementById('importSaveBtn')?.addEventListener('click', () => importInput.click());
    document.getElementById('promoBtn')?.addEventListener('click', () => document.getElementById('promoModal').classList.add('show'));
    document.getElementById('closePromoBtn')?.addEventListener('click', () => document.getElementById('promoModal').classList.remove('show'));
    document.getElementById('shareBtn')?.addEventListener('click', shareProgress);

    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) { fullscreenBtn.addEventListener('click', () => { const el = document.documentElement; const isFull = document.fullscreenElement || document.webkitFullscreenElement; if (!isFull) { if (el.requestFullscreen) el.requestFullscreen(); else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen(); fullscreenBtn.innerText = t('off'); showToast("⛶ " + t('fullscreen')); } else { if (document.exitFullscreen) document.exitFullscreen(); else if (document.webkitExitFullscreen) document.webkitExitFullscreen(); fullscreenBtn.innerText = t('on'); showToast("⛶ " + t('fullscreen')); } }); }

    const promoCodes = {}; for (let i = 1; i <= 100; i++) promoCodes[`code${i}`] = { points: 100 + i * 5, stars: 1 + Math.floor(i / 10) };
    promoCodes['dima'] = { points: 500, stars: 10 }; promoCodes['dima god'] = { points: 5000, stars: 100 }; promoCodes['start'] = { points: 100, stars: 5 }; promoCodes['neural'] = { points: 1000, stars: 50 }; promoCodes['evolution'] = { points: 2000, stars: 100 }; promoCodes['prestige'] = { points: 10000, stars: 200 }; promoCodes['legend'] = { points: 20000, stars: 500 }; promoCodes['pass8'] = { points: 8000, stars: 80 }; promoCodes['pass9'] = { points: 10000, stars: 100 }; promoCodes['halloween'] = { points: 6666, stars: 66 }; promoCodes['newyear'] = { points: 7777, stars: 77 }; promoCodes['robot'] = { points: 9999, stars: 99 }; promoCodes['hacker'] = { points: 11111, stars: 111 }; promoCodes['pumpkin'] = { points: 8888, stars: 88 }; promoCodes['birthday'] = { points: 17000, stars: 170 }; promoCodes['march8'] = { points: 8000, stars: 80 };

    document.getElementById('activatePromoBtn')?.addEventListener('click', () => { const code = document.getElementById('promoInput').value.toLowerCase().trim(); if (promoCodes[code]) { const promo = promoCodes[code]; points += promo.points; stars += promo.stars; totalStarsEarned += promo.stars; updateUI(); saveGame(); showToast(t('promo_ok')); document.getElementById('promoInput').value = ''; document.getElementById('promoModal').classList.remove('show'); } else showToast(t('promo_bad')); });
    document.getElementById('soundToggleBtn')?.addEventListener('click', () => { currentSoundProfile = (currentSoundProfile + 1) % soundProfiles.length; document.getElementById('soundToggleBtn').innerText = `${t('sound_toggle')} (${soundProfiles[currentSoundProfile].name})`; saveGame(); showToast(`🔊 ${soundProfiles[currentSoundProfile].name}`); });

    function moveEyes(e) { const x = e.touches ? e.touches[0].clientX : e.clientX, y = e.touches ? e.touches[0].clientY : e.clientY; document.querySelectorAll('.pupil').forEach(p => { const rect = p.parentElement.parentElement.getBoundingClientRect(); const dx = x - (rect.left + rect.width / 2), dy = y - (rect.top + rect.height / 2); const ang = Math.atan2(dy, dx), dist = Math.min(4, Math.hypot(dx, dy) / 20); p.style.transform = `translate(${Math.cos(ang) * dist}px, ${Math.sin(ang) * dist}px)`; }); }
    document.addEventListener('mousemove', moveEyes); document.addEventListener('touchmove', moveEyes);

    let reloadSeconds = reloadTimeMinutes * 60;
    setInterval(() => { if (reloadSeconds > 0) { reloadSeconds--; const el = document.getElementById('reloadCountdown'); if (el) el.innerText = `${Math.floor(reloadSeconds / 60)}:${(reloadSeconds % 60).toString().padStart(2, '0')}`; if (reloadSeconds === 0) { showToast(t('reload_toast')); setTimeout(() => location.reload(), 2000); } } }, 1000);
    setInterval(saveGame, 5000);
    window.addEventListener('pagehide', saveGame);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') saveGame();
    });

    let adminPasswordBuffer = '';
    function openAdminPasswordPanel() { adminPasswordBuffer = ''; document.getElementById('adminPasswordInput').value = ''; document.getElementById('adminPasswordOverlay')?.classList.add('show'); }
    function closeAdminPasswordPanel() { adminPasswordBuffer = ''; document.getElementById('adminPasswordInput').value = ''; document.getElementById('adminPasswordOverlay')?.classList.remove('show'); }
    document.querySelectorAll('.admin-key').forEach(btn => { btn.addEventListener('click', () => { const key = btn.dataset.key; if (key === 'clear') adminPasswordBuffer = adminPasswordBuffer.slice(0, -1); else if (key === 'ok') { if (adminPasswordBuffer === ADMIN_PASSWORD) { closeAdminPasswordPanel(); setTimeout(() => openAdminPanel(), 200); } else { showToast(t('admin_wrong_pass')); adminPasswordBuffer = ''; } } else if (adminPasswordBuffer.length < 8) adminPasswordBuffer += key; document.getElementById('adminPasswordInput').value = '•'.repeat(adminPasswordBuffer.length); }); });
    document.getElementById('adminPasswordCancel')?.addEventListener('click', closeAdminPasswordPanel);

    let adminCurrentTab = 'game';
    function renderAdminBody() { 
        const body = document.getElementById('adminBody'); if (!body) return; 
        if (adminCurrentTab === 'game') { 
            body.innerHTML = `<div class="admin-item"><span>Дать очков:</span><input type="number" id="admPointsInput" class="admin-input" placeholder="1000"></div><div class="admin-item"><span></span><button id="admPoints">Дать</button></div><div class="admin-item"><span>Дать звёзд:</span><input type="number" id="admStarsInput" class="admin-input" placeholder="100"></div><div class="admin-item"><span></span><button id="admStars">Дать</button></div><div class="admin-item"><span>Купить все нейросети</span><button id="admBuyAll">Купить</button></div><div class="admin-item"><span>Секретный Босс</span><button id="admBoss">Спавн</button></div><div class="admin-item"><span>Сбросить прогресс</span><button id="admReset">Сброс</button></div>`; 
            document.getElementById('admPoints').onclick = () => { const v = parseInt(document.getElementById('admPointsInput').value) || 1000; points += v; updateUI(); saveGame(); showToast(`+${formatNumber(v)}🧠`); }; 
            document.getElementById('admStars').onclick = () => { const v = parseInt(document.getElementById('admStarsInput').value) || 100; stars += v; totalStarsEarned += v; updateUI(); saveGame(); showToast(`+${formatNumber(v)}⭐`); }; 
            document.getElementById('admBuyAll').onclick = () => { upgrades.forEach((u) => { if (!u.purchased) { u.purchased = true; purchasedCount++; } }); updateUI(); renderShopNeurons(); saveGame(); showToast(t('all_neurons')); }; 
            document.getElementById('admBoss').onclick = () => { spawnBoss(); showToast('🐛 Босс заспавнен!'); }; 
            document.getElementById('admReset').onclick = () => { if (confirm("Сброс?")) { resetGameKeepingPlayerIdentity(); } }; 
        } 
        else if (adminCurrentTab === 'settings') {
            body.innerHTML = `<div class="admin-item"><span>Открыть все пасы</span><button onclick="alert('Функция в разработке')">Открыть</button></div>`;
        }
        else if (adminCurrentTab === 'abuse') {
            body.innerHTML = `
                <div class="admin-item">
                    <span>Выдать награду по нику</span>
                    <div style="display:flex; flex-direction:column; gap:5px; width:100%;">
                        <input type="text" id="admTargetNick" class="admin-input" style="width:100%; text-align:left;" placeholder="Ник игрока...">
                        <input type="number" id="admTargetAmount" class="admin-input" style="width:100%;" placeholder="Сумма...">
                        <select id="admTargetType" class="admin-input" style="width:100%;">
                            <option value="give_points">Очки 🧠</option>
                            <option value="give_stars">Звёзды ⭐</option>
                        </select>
                        <button id="admTargetGive" style="background:#ffd700; color:#000; font-weight:bold;">Выдать</button>
                    </div>
                </div>
                <div class="admin-item">
                    <span>Начать админ абьюз (радужный фон)</span>
                    <button id="admRainbowToggle" style="background:#888;">${activeAbuseEffects.includes('rainbow') ? 'Закончить' : 'Начать'}</button>
                </div>
                <div class="admin-item">
                    <span>Звёздный дождь</span>
                    <button id="admStarRain" style="background:#888;">Начать</button>
                </div>
                <div class="admin-item">
                    <span>Сказать от лица мозга</span>
                    <input type="text" id="admBrainText" class="admin-input" style="width:100px;" placeholder="Текст...">
                    <button id="admBrainSay" style="background:#888;">Начать</button>
                </div>
                <div class="admin-item">
                    <span>Запустить голосование</span>
                    <input type="text" id="admVoteTitle" class="admin-input" style="width:100px;" placeholder="Вопрос...">
                    <button id="admStartVote" style="background:#888;">Начать</button>
                </div>
                <div class="admin-item">
                    <span>Запустить босса</span>
                    <button id="admGlobalBoss" style="background:#888;">Начать</button>
                </div>
            `;
            
            document.getElementById('admTargetGive').onclick = async () => {
                const nick = document.getElementById('admTargetNick').value.trim();
                const amount = document.getElementById('admTargetAmount').value;
                const type = document.getElementById('admTargetType').value;
                if (!nick || !amount) { showToast('Заполни ник и сумму!'); return; }
                
                if (!supabaseClient) return;
                const { data } = await supabaseClient.from('player_profiles').select('player_name').eq('player_name', nick).maybeSingle();
                if (!data) { showToast('❌ Игрок с таким ником не найден!'); return; }
                
                await sendAdminCommand(type, amount, nick);
                showToast(`✅ Отправлено для ${nick}`);
                document.getElementById('admTargetNick').value = '';
                document.getElementById('admTargetAmount').value = '';
            };

            document.getElementById('admRainbowToggle').onclick = async () => {
                if (activeAbuseEffects.includes('rainbow')) {
                    await toggleAbuseEffect('rainbow', false);
                } else {
                    await toggleAbuseEffect('rainbow', true);
                }
                renderAdminBody();
            };
            document.getElementById('admStarRain').onclick = () => { sendAdminCommand('star_rain'); showToast('Звездный дождь запущен!'); };
            document.getElementById('admBrainSay').onclick = () => { const v = document.getElementById('admBrainText').value; if (v) sendAdminCommand('dialogue', v); };
            document.getElementById('admStartVote').onclick = () => { const q = document.getElementById('admVoteTitle').value || "Голосование"; const payload = JSON.stringify({ q: q, o: ['Да', 'Нет'] }); sendAdminCommand('start_vote', payload); };
            document.getElementById('admGlobalBoss').onclick = () => sendAdminCommand('spawn_global_boss');
        }
    }
    function openAdminPanel() { const overlay = document.getElementById('adminOverlay'); if (!overlay) return; adminCurrentTab = 'game'; document.querySelectorAll('.admin-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === 'game')); renderAdminBody(); overlay.classList.add('show'); }
    const versionEl = document.getElementById('menuVersion'); if (versionEl) { versionEl.style.cursor = 'pointer'; versionEl.addEventListener('click', openAdminPasswordPanel); }
    document.querySelectorAll('.admin-tab').forEach(tab => { tab.addEventListener('click', () => { document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active')); tab.classList.add('active'); adminCurrentTab = tab.dataset.tab; renderAdminBody(); }); });
    document.getElementById('adminCloseBtn')?.addEventListener('click', () => document.getElementById('adminOverlay')?.classList.remove('show'));
    document.getElementById('adminOverlay')?.addEventListener('click', (e) => { if (e.target.id === 'adminOverlay') document.getElementById('adminOverlay').classList.remove('show'); });

    applyTranslations(); loadGame(); checkDailyFact();
    loadActiveAbuse();
    if (!(localStorage.getItem('gamePlayerName') || '').trim()) {
        mandatoryNicknameOverlay?.classList.add('show');
        setTimeout(() => mandatoryNicknameInput?.focus(), 100);
    }
});
