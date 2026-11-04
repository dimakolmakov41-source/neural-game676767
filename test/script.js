import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { TRANSLATIONS } from './translations.js';

const GAME_VERSION = "16.8 BETA";
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
function escapeHTML(str) {
    if (!str) return '';
    if (!ENABLE_HTML_PROTECTION) return String(str); // Если защита выключена, возвращаем как есть
    return String(str).replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag] || tag)
    );
}

function formatNumber(num) {
    if (num >= 1e21) return (num / 1e21).toFixed(2) + 'Sx'; if (num >= 1e18) return (num / 1e18).toFixed(2) + 'Qi'; if (num >= 1e15) return (num / 1e15).toFixed(2) + 'Qa'; if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'; if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'; if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'; if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'; return Math.floor(num).toString();
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => { el.innerText = t(el.dataset.i18n); });
    const r1 = document.getElementById('robotText1'); if (r1) r1.innerHTML = t('robot1'); const r2 = document.getElementById('robotText2'); if (r2) r2.innerHTML = t('robot2'); const tt = document.getElementById('tutorialText'); if (tt) tt.innerHTML = t('tutorial_text');
    if (typeof updateBoostUI === 'function') updateBoostUI(); if (typeof applyPassStyle === 'function') applyPassStyle(); if (typeof applyTheme === 'function') applyTheme(); if (typeof updatePassEndTimer === 'function') updatePassEndTimer(); if (typeof updateAutoClickerUI === 'function') updateAutoClickerUI();
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.lang === currentLang));
    document.querySelectorAll('#setLangRu, #setLangEn').forEach(btn => { const isRu = btn.id === 'setLangRu'; btn.classList.toggle('active', (isRu && currentLang === 'ru') || (!isRu && currentLang === 'en')); });
}

function setLanguage(lang) { if (lang !== 'ru' && lang !== 'en') return; currentLang = lang; localStorage.setItem('gameLang', lang); applyTranslations(); showToast(lang === 'ru' ? "✅ Язык: Русский" : "✅ Language: English"); }

const FACTS = { ru: ["Первый перцептрон создан в 1958 году.", "ChatGPT обучался на 570 ГБ текста.", "Мозг содержит около 86 млрд нейронов."], en: ["First perceptron created in 1958.", "ChatGPT trained on 570 GB of text.", "Brain has about 86 billion neurons."] };
function getFactOfDay() { const now = new Date(); const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000); return FACTS[currentLang][dayOfYear % FACTS[currentLang].length]; }
function checkDailyFact() { const today = new Date().toISOString().slice(0, 10); if (localStorage.getItem('factShownDate') !== today) { localStorage.setItem('factShownDate', today); const factText = document.getElementById('factText'); if (factText) factText.innerText = getFactOfDay(); setTimeout(() => document.getElementById('factOverlay')?.classList.add('show'), 2500); } }

if (localStorage.getItem('gameVersion') !== GAME_VERSION) { localStorage.removeItem('neuralEvoSave'); localStorage.removeItem('banEnd'); localStorage.setItem('gameVersion', GAME_VERSION); }

function isHalloween() { if (customTheme === 'halloween') return true; if (customTheme !== 'normal' && customTheme !== '') return false; const n = new Date(); return n.getMonth() === 9 && n.getDate() >= 5 && n.getDate() <= 31; }
function isNewYear() { if (customTheme === 'newyear') return true; if (customTheme !== 'normal' && customTheme !== '') return false; const n = new Date(); return (n.getMonth() === 11 && n.getDate() === 31) || (n.getMonth() === 0 && n.getDate() === 1); }
function isHackerMode() { const n = Date.now(); return n >= new Date(2026, 8, 29).getTime() && n <= new Date(2026, 9, 5).getTime(); }
function isBirthday() { const n = new Date(); return n.getMonth() === 2 && n.getDate() === 17; }
function isMarch8() { const n = new Date(); return n.getMonth() === 2 && n.getDate() === 8; }

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
    (async () => {
        const overlay = document.getElementById('testerAccessOverlay');
        const playerId = localStorage.getItem('gamePlayerId');
        if (!playerId || !supabaseClient) {
            if (overlay) { overlay.classList.add('show'); overlay.querySelector('.modal-text').textContent = 'Не удалось проверить доступ. Проверь интернет и обнови страницу.'; }
            document.getElementById('loadingScreen')?.classList.add('hidden'); return;
        }
        try {
            const { data, error } = await supabaseClient.functions.invoke('check-tester', { body: { player_id: playerId } });
            if (error || !data?.is_tester) {
                if (overlay) overlay.classList.add('show');
                document.getElementById('mainMenu')?.classList.add('hidden');
                document.getElementById('gameInterface')?.classList.add('hidden');
                document.getElementById('loadingScreen')?.classList.add('hidden'); return;
            }
            document.getElementById('testerBadge')?.classList.remove('hidden');
        } catch(e) {
            if (overlay) { overlay.classList.add('show'); overlay.querySelector('.modal-text').textContent = 'Ошибка проверки доступа. Попробуй обновить страницу.'; }
            document.getElementById('loadingScreen')?.classList.add('hidden');
        }
    })();

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
    
    const nicknameInput = document.getElementById('nicknameInput');
    if (nicknameInput) nicknameInput.value = localStorage.getItem('gamePlayerName') || '';

    // === СОХРАНЕНИЕ УНИКАЛЬНОГО НИКА ===
    document.getElementById('saveNicknameBtn')?.addEventListener('click', async () => {
        const newName = nicknameInput.value.trim();
        if (!newName) { 
            localStorage.removeItem('gamePlayerName'); 
            showToast(`✅ Ник сброшен`); 
            return; 
        }

        const safeName = escapeHTML(newName);
        if (!supabaseClient) {
            localStorage.setItem('gamePlayerName', safeName);
            showToast(`✅ Ник: ${safeName} (офлайн)`);
            return;
        }

        try {
            // Проверяем, занят ли ник
            const { data, error } = await supabaseClient.from('player_profiles').select('player_id').eq('player_name', safeName).maybeSingle();
            
            if (error && error.code !== 'PGRST116') { // PGRST116 = нет результатов
                showToast('❌ Ошибка проверки ника');
                console.error(error);
                return;
            }

            if (data && data.player_id !== playerId) {
                showToast('❌ Этот ник уже занят другим игроком!');
                return;
            }

            // Сохраняем
            await supabaseClient.from('player_profiles').upsert({ player_id: playerId, player_name: safeName });
            localStorage.setItem('gamePlayerName', safeName);
            showToast(`✅ Ник: ${safeName}`);
            
        } catch(e) {
            showToast('❌ Ошибка сети');
        }
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

    // ЛИДЕРБОРД
    async function syncLeaderboard() {
        if (!supabaseClient) return;
        const name = escapeHTML(localStorage.getItem('gamePlayerName') || 'Аноним');
        try { await supabaseClient.from('leaderboard').upsert({ player_id: playerId, player_name: name, score: Math.floor(points), updated_at: new Date().toISOString() }, { onConflict: 'player_id' }); return true; } catch(e) { return false; }
    }
    async function showLeaderboard() {
        const modal = document.getElementById('leaderboardModal'), list = document.getElementById('leaderboardList');
        modal.classList.add('show'); list.innerHTML = 'Загрузка...';
        if (!supabaseClient) return;
        const { data, error } = await supabaseClient.from('leaderboard').select('*').order('score', { ascending: false }).limit(10);
        if (error || !data) { list.innerHTML = 'Ошибка загрузки'; return; }
        list.innerHTML = data.map((p, i) => `<div style="display:flex; justify-content:space-between; padding:10px 5px; border-bottom:1px solid #333; font-weight:bold; font-size:15px;"><span>${i+1}. ${escapeHTML(p.player_name)}</span> <span style="color:#ffd966;">🧠 ${formatNumber(p.score)}</span></div>`).join('');
    }
    document.getElementById('leaderboardBtn')?.addEventListener('click', showLeaderboard);
    document.getElementById('closeLeaderboardBtn')?.addEventListener('click', () => document.getElementById('leaderboardModal').classList.remove('show'));
    document.getElementById('submitLeaderboardBtn')?.addEventListener('click', async () => { const success = await syncLeaderboard(); if (success) { showToast('✅ Твои очки добавлены в Топ-10!'); showLeaderboard(); } else { showToast('❌ Ошибка отправки'); } });

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
    function getSkinMultiplier() { return SKINS.find(s => s.id === currentSkin)?.mult || 1; }
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

    function isBoostActive() { return Date.now() < boostEndTime; } function getBoostRemaining() { return Math.max(0, boostEndTime - Date.now()); } function isBirthdayBoostActive() { return Date.now() < birthdayBoostEndTime; } function isMarch8BoostActive() { return Date.now() < march8BoostEndTime; } function isX10BoostActive() { return Date.now() < x10BoostEndTime; }
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

    function getPrestigeMultiplier() { return 1 + prestigeLevel * PRESTIGE_BONUS_PER_LEVEL; }
    function updatePrestigeDisplay() { document.getElementById('prestigeLevelDisplay').innerText = prestigeLevel; document.getElementById('prestigeBonusDisplay').innerText = '+' + Math.round(prestigeLevel * PRESTIGE_BONUS_PER_LEVEL * 100) + '%'; document.getElementById('prestigeNeedDisplay').innerText = purchasedCount < upgrades.length ? 'Купи все сети' : 'ГОТОВО!'; }
    
    function doPrestige() { 
        if (purchasedCount < upgrades.length) { showToast(t('prestige_not_enough')); return; } 
        if (!confirm(t('prestige_confirm'))) return; 
        prestigeLevel++; points = 10; purchasedCount = 1; upgrades.forEach((u, i) => { u.purchased = (i === 0); }); updateUI(); renderShopNeurons(); updatePrestigeDisplay(); saveGame(); showToast(`🌟 ${t('prestige_done')} ${prestigeLevel}!`); playBuySound(); document.getElementById('prestigeModal')?.classList.remove('show'); 
    }
    
    function calculateOfflineIncome() { const awaySec = Math.min((Date.now() - lastSaveTime) / 1000, OFFLINE_MAX_HOURS * 3600); if (awaySec < 60) return 0; return Math.floor(getClickPower() * awaySec * OFFLINE_RATE); }
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
        localStorage.setItem('neuralEvoSave', JSON.stringify({ points, stars, totalClicks, purchasedCount, totalStarsEarned, godMode, comboCounter, prestigeLevel, birthdayBoostEndTime, march8BoostEndTime, x10BoostEndTime, autoclickerBought, autoclickerLevel, unlockedAchievements, helpers: helpers.map(h => ({ bought: h.bought, level: h.level })), currentSkin, purchasedSkins, upgrades: upgrades.map(u => ({ purchased: u.purchased })), passPlayTimeSeconds, passClaimedRewards, boostEndTime, gameStartTime, currentSoundProfile, gameVersion: GAME_VERSION, lastSaveTime }));
    }

    function loadGame() {
        const saved = localStorage.getItem('neuralEvoSave');
        if (saved) { try { const d = JSON.parse(saved); points = d.points || 10; if (d.stars !== undefined) stars = d.stars; else if (d.diamonds !== undefined) stars = Math.floor(d.diamonds / 10); else stars = 0; totalClicks = d.totalClicks || 0; purchasedCount = d.purchasedCount || 1; totalStarsEarned = d.totalStarsEarned || d.totalDiamondsEarned || 0; godMode = d.godMode || false; comboCounter = d.comboCounter || 0; prestigeLevel = d.prestigeLevel || 0; boostEndTime = d.boostEndTime || 0; birthdayBoostEndTime = d.birthdayBoostEndTime || 0; march8BoostEndTime = d.march8BoostEndTime || 0; x10BoostEndTime = d.x10BoostEndTime || 0; autoclickerBought = d.autoclickerBought || false; if (d.autoclickerLevel) autoclickerLevel = d.autoclickerLevel; if (d.helpers) d.helpers.forEach((hData, i) => { if(helpers[i]) { helpers[i].bought = hData.bought; helpers[i].level = hData.level; } }); if (d.lastSaveTime) lastSaveTime = d.lastSaveTime; if (d.currentSkin) currentSkin = d.currentSkin; if (d.purchasedSkins) purchasedSkins = d.purchasedSkins; if (d.upgrades) d.upgrades.forEach((data, i) => { if (upgrades[i]) upgrades[i].purchased = data.purchased; }); if (d.passPlayTimeSeconds !== undefined) passPlayTimeSeconds = d.passPlayTimeSeconds; if (d.passClaimedRewards) passClaimedRewards = d.passClaimedRewards; if (d.gameStartTime) gameStartTime = d.gameStartTime; if (d.currentSoundProfile !== undefined) currentSoundProfile = d.currentSoundProfile; purchasedCount = upgrades.filter(u => u.purchased).length; } catch(e) {} }
        updateUI(); renderShopNeurons(); updateStatsUI(); renderAchievements(); startBoostTimer(); if (playtimeInterval) clearInterval(playtimeInterval); playtimeInterval = setInterval(() => updatePlaytime(), 60000); startSleepMsgTimer(); updateAutoClickerUI(); updateDailyGiftUI(); applyTheme(); applySkin(); applyButtonColor(localStorage.getItem('btnColor') || 'blue'); updatePrestigeDisplay();
        const offlineIncome = calculateOfflineIncome(); if (offlineIncome > 0) { points += offlineIncome; setTimeout(() => showOfflineReward(offlineIncome), 2600); saveGame(); updateUI(); }
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

    const tutorialOverlay = document.getElementById('tutorialOverlay'), tutorialStep1 = document.getElementById('tutorialStep1'), tutorialStep2 = document.getElementById('tutorialStep2');
    function showTutorial() { tutorialStep1?.classList.remove('hidden'); tutorialStep2?.classList.add('hidden'); tutorialOverlay?.classList.add('show'); }
    function goToGame() { 
        document.getElementById('mainMenu').classList.add('hidden'); 
        document.getElementById('gameInterface').classList.remove('hidden'); 
        document.getElementById('newsBtn')?.classList.add('hidden'); 
        document.getElementById('chatBtn')?.classList.remove('hidden'); 
        document.getElementById('tourneyBtn')?.classList.remove('hidden'); 
    }
    document.getElementById('tutorialYes')?.addEventListener('click', () => { tutorialStep1.classList.add('hidden'); tutorialStep2.classList.remove('hidden'); });
    document.getElementById('tutorialNo')?.addEventListener('click', () => { localStorage.setItem('tutorialDone', 'true'); tutorialOverlay?.classList.remove('show'); goToGame(); });
    document.getElementById('tutorialOk')?.addEventListener('click', () => { localStorage.setItem('tutorialDone', 'true'); tutorialOverlay?.classList.remove('show'); goToGame(); });
    document.getElementById('playBtn')?.addEventListener('click', () => { if (!localStorage.getItem('tutorialDone')) { showTutorial(); return; } goToGame(); });
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

    document.getElementById('testButton')?.addEventListener('click', () => {
        showToast('✅ тест кнопка работает');
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
    document.getElementById('resetGameBtn')?.addEventListener('click', () => { if (confirm("Сбросить всё? / Reset all?")) { localStorage.clear(); location.reload(); } });
    
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
            document.getElementById('admReset').onclick = () => { if (confirm("Сброс?")) { localStorage.clear(); location.reload(); } }; 
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
});
