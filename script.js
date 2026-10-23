// ===== ВЕРСИЯ =====
const GAME_VERSION = "15.0";
const ADMIN_PASSWORD = "6769";

// ===== ССЫЛКИ =====
const UPDATE_CHECK_URL = "https://dimakolmakov41-source.github.io/neural-game676767/update.json";

// ===== ДАННЫЕ (вместо JSON) =====
const NEWS_DATA = {
    title: "🚀 Обновление 15.0 (Оффлайн)",
    text: "Мы полностью переработали игру!<br><br>✅ Удалены онлайн-функции.<br>✅ Добавлена прокачка автокликера.<br>✅ Новый скин 'Кибер'.<br>✅ Улучшены призы в рулетке.<br>✅ Игра стала 100% оффлайн!"
};

// ===== ОСНОВНАЯ ЛОГИКА =====
window.addEventListener('load', () => {
    setTimeout(checkForUpdates, 2000);

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

    const AUTOCLICKER_PRICE = 500;
    let autoclickerLevel = 1, autoclickerBought = false, autoclickerInterval = null;

    let rouletteSpinning = false;
    const SKINS = [{ id: 'normal', price: 0, mult: 1 }, { id: 'halloween', price: 20, mult: 5 }, { id: 'amethyst', price: 320, mult: 15 }, { id: 'cyber', price: 500, mult: 25 }];
    let currentSkin = localStorage.getItem('currentSkin') || 'normal';
    let purchasedSkins = JSON.parse(localStorage.getItem('purchasedSkins') || '["normal"]');
    let unlockedAchievements = JSON.parse(localStorage.getItem('unlockedAchievements') || '[]');
    Object.defineProperty(window, '__stars', { get: () => stars });

    // Время окончания Хэллоуина / AI Pass 8 (25 октября 2026)
    const PASS8_END_DATE = new Date(2026, 9, 25, 23, 59, 59).getTime();

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

    // ===== ПРОВЕРКА ОБНОВЛЕНИЙ (С БАЙПАСОМ) =====
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
        if (localStorage.getItem('bypassUpdate') === 'true') return; // БАЙПАС ОБНОВЛЕНИЯ
        
        fetch(UPDATE_CHECK_URL + "?t=" + Date.now()).then(res => res.json()).then(data => {
            if (data && data.latest_version && isNewerVersion(GAME_VERSION, data.latest_version)) {
                document.getElementById('updateOverlay')?.classList.add('show');
                document.body.style.pointerEvents = "none"; document.getElementById('updateOverlay').style.pointerEvents = "auto";
            }
        }).catch(e => console.log(e));
    }

    // ===== ИВЕНТЫ И ТЕМЫ =====
    function isHalloween() {
        if (localStorage.getItem('bypassHalloween') === 'true') return true;
        return Date.now() <= PASS8_END_DATE; // Хэллоуин живет до конца Pass 8
    }

    function applyTheme() {
        const body = document.body; const brain = document.getElementById('clickableObject');
        const starLabel = document.getElementById('starLabel');
        const sleepMsg = document.getElementById('sleepMsg');

        body.classList.remove('bg-halloween', 'bg-early-autumn');
        if (brain) brain.classList.remove('halloween-brain');
        
        if (isHalloween()) {
            body.classList.add('bg-halloween'); if (brain) brain.classList.add('halloween-brain');
            if (starLabel) starLabel.innerHTML = '🍬 <span id="stars">' + (window.__stars || 0) + '</span>';
        } else {
            body.classList.add('bg-early-autumn');
            if (starLabel) starLabel.innerHTML = '⭐ <span id="stars">' + (window.__stars || 0) + '</span>';
        }
        
        if (typeof applySkin === 'function') applySkin();
    }

    // ===== МАГАЗИН И ВКЛАДКИ =====
    function renderShopNeurons() {
        const start = currentPage * ITEMS_PER_PAGE, end = Math.min(start + ITEMS_PER_PAGE, upgrades.length);
        let html = '';
        if (totalPages > 1) html += `<div class="pagination"><button class="page-btn" id="firstPageBtn">⏮ НАЧАЛО</button><button class="page-btn" id="prevPageBtn">⬅️ НАЗАД</button><span>${currentPage+1}/${totalPages}</span><button class="page-btn" id="nextPageBtn">ВПЕРЁД ➡️</button><button class="page-btn" id="lastPageBtn">КОНЕЦ ⏭</button></div>`;
        for (let i = start; i < end; i++) { 
            const u = upgrades[i]; 
            html += `<div class="shop-item" data-id="${u.id}"><span>${u.name} +${u.power}</span><span>${u.purchased ? '✅' : `💰 ${formatNumber(u.price)}`}</span></div>`; 
        }
        if (totalPages > 1) html += `<div class="pagination"><button class="page-btn" id="firstPageBtn2">⏮ НАЧАЛО</button><button class="page-btn" id="prevPageBtn2">⬅️ НАЗАД</button><span>${currentPage+1}/${totalPages}</span><button class="page-btn" id="nextPageBtn2">ВПЕРЁД ➡️</button><button class="page-btn" id="lastPageBtn2">КОНЕЦ ⏭</button></div>`;
        document.getElementById('shopNeurons').innerHTML = html;
        document.querySelectorAll('#shopNeurons .shop-item').forEach(el => { const u = upgrades[parseInt(el.dataset.id)]; if (!u.purchased) el.addEventListener('click', () => buyUpgrade(u.id)); });
        ['firstPageBtn', 'firstPageBtn2'].forEach(id => document.getElementById(id)?.addEventListener('click', () => { currentPage = 0; renderShopNeurons(); }));
        ['lastPageBtn', 'lastPageBtn2'].forEach(id => document.getElementById(id)?.addEventListener('click', () => { currentPage = totalPages - 1; renderShopNeurons(); }));
        ['prevPageBtn', 'prevPageBtn2'].forEach(id => document.getElementById(id)?.addEventListener('click', () => { if (currentPage > 0) { currentPage--; renderShopNeurons(); } }));
        ['nextPageBtn', 'nextPageBtn2'].forEach(id => document.getElementById(id)?.addEventListener('click', () => { if (currentPage < totalPages - 1) { currentPage++; renderShopNeurons(); } }));
    }

    function renderShopSkins() {
        const container = document.getElementById('shopSkins'); if (!container) return;
        let html = '';
        SKINS.forEach(skin => {
            const isUnlocked = purchasedSkins.includes(skin.id) || skin.id === 'normal' || (skin.id === 'halloween' && isHalloween());
            const isEquipped = currentSkin === skin.id;
            const priceText = (skin.id === 'halloween' && isHalloween()) ? 'Бесплатно (Ивент)' : (skin.price > 0 ? `💰 ${skin.price}⭐` : 'Бесплатно');
            const nameText = { normal: 'Обычный', halloween: 'Тыква', amethyst: 'Аметист', cyber: 'Кибер' }[skin.id];
            const emoji = { normal: '🧠', halloween: '🎃', amethyst: '💎', cyber: '🤖' }[skin.id];
            let btnText = isEquipped ? '✅ Надет' : (isUnlocked ? 'Одеть' : `Купить за ${skin.price}⭐`);
            let btnStyle = isEquipped ? 'background:#555; color:#aaa;' : (isUnlocked ? 'background:#4caf50;' : 'background:#ffaa00;');
            html += `<div class="skin-item ${isEquipped ? 'active' : ''}" data-id="${skin.id}"><div class="skin-info"><div class="skin-name">${nameText} ${emoji}</div><div class="skin-mult">Множитель: ×${skin.mult}</div><div class="skin-price">${priceText}</div></div><button class="skin-btn" style="${btnStyle}" data-action="${isEquipped ? 'none' : (isUnlocked ? 'equip' : 'buy')}">${btnText}</button></div>`;
        });
        container.innerHTML = html;
        document.querySelectorAll('#shopSkins .skin-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation(); const id = e.target.closest('.skin-item').dataset.id;
                if (btn.dataset.action === 'equip') { currentSkin = id; localStorage.setItem('currentSkin', id); applySkin(); saveGame(); showToast('Скин надет!'); renderShopSkins(); }
                else if (btn.dataset.action === 'buy') buySkin(id);
            });
        });
    }

    function buySkin(id) {
        const skin = SKINS.find(s => s.id === id); if (!skin) return;
        if (stars < skin.price) { showToast(`❌ Нужно ${skin.price}⭐`); return; }
        stars -= skin.price; purchasedSkins.push(id); localStorage.setItem('purchasedSkins', JSON.stringify(purchasedSkins));
        currentSkin = id; localStorage.setItem('currentSkin', id);
        updateUI(); applySkin(); saveGame(); renderShopSkins(); showToast(`✅ ${id} куплен!`); playBuySound();
    }

    function applySkin() {
        const brain = document.getElementById('clickableObject'); if (!brain) return;
        brain.classList.remove('skin-normal', 'skin-halloween', 'skin-amethyst', 'skin-cyber'); brain.classList.add('skin-' + currentSkin);
        const emoji = document.getElementById('brainEmoji');
        if (emoji) {
            if (currentSkin === 'normal') { emoji.innerText = '🧠'; emoji.style.display = 'block'; }
            else if (currentSkin === 'halloween') { emoji.innerText = '🎃'; emoji.style.display = 'block'; }
            else if (currentSkin === 'amethyst') { emoji.style.display = 'none'; }
            else if (currentSkin === 'cyber') { emoji.innerText = '🤖'; emoji.style.display = 'block'; }
        }
    }

    function switchShopTab(tab) {
        const tabs = document.querySelectorAll('.shop-tab');
        const lists = ['shopNeurons', 'shopStars', 'shopSkins'];
        
        if (tab === 'stars' && localStorage.getItem('bypassStars') !== 'true') {
            showToast('⏳ Раздел в переработке');
            return;
        }

        tabs.forEach(t => t.classList.remove('active'));
        lists.forEach(l => { if (document.getElementById(l)) document.getElementById(l).style.display = 'none'; });
        
        if (tab === 'neurons') { document.querySelector('.shop-tab[data-tab="neurons"]').classList.add('active'); document.getElementById('shopNeurons').style.display = 'block'; renderShopNeurons(); document.getElementById('buyAllBtn').style.display = 'block'; }
        else if (tab === 'stars') { document.querySelector('.shop-tab[data-tab="stars"]').classList.add('active'); document.getElementById('shopStars').style.display = 'block'; document.getElementById('buyAllBtn').style.display = 'none'; }
        else if (tab === 'skins') { document.querySelector('.shop-tab[data-tab="skins"]').classList.add('active'); document.getElementById('shopSkins').style.display = 'block'; renderShopSkins(); document.getElementById('buyAllBtn').style.display = 'none'; }
    }

    function buyUpgrade(id) {
        const u = upgrades[id];
        if (!u.purchased && points >= u.price) { 
            points -= u.price; u.purchased = true; purchasedCount++; updateUI(); renderShopNeurons(); saveGame(); showToast(`✅ ${u.name} куплена!`); playBuySound(); 
        } else showToast('❌ Не хватает очков');
    }

    function buyAllAvailable() {
        const list = upgrades.map((u, i) => ({ u, i })).filter(x => !x.u.purchased).sort((a, b) => a.u.price - b.u.price);
        let bought = 0; 
        for (const item of list) { 
            if (points >= item.u.price) { points -= item.u.price; item.u.purchased = true; bought++; } else break; 
        }
        if (bought > 0) { purchasedCount = upgrades.filter(u => u.purchased).length; updateUI(); renderShopNeurons(); saveGame(); showToast(`💰 Куплено: ${bought}!`); playBuySound(); }
        else showToast('❌ Не хватает очков');
    }

    // ===== АВТОКЛИКЕР И ЕГО ПРОКАЧКА =====
    function updateAutoclickerUI() {
        const btn = document.getElementById('autoclickerBtn');
        const upBtn = document.getElementById('autoclickerUpgradeBtn');
        if (!btn || !upBtn) return;
        
        if (autoclickerBought) {
            const rate = 10 + (autoclickerLevel - 1) * 5;
            btn.innerText = `🤖 АВТОКЛИКЕР АКТИВЕН (${rate}/сек)`; 
            btn.classList.add('active'); 
            btn.style.background = 'linear-gradient(145deg, #2e7d32, #1a5a20)'; 
            btn.style.borderColor = '#66cc66';
            
            upBtn.style.display = 'block';
            upBtn.innerText = `⚡ УЛУЧШИТЬ АВТОКЛИКЕР (Ур. ${autoclickerLevel}) — ${autoclickerLevel * 50}⭐`;
        } else { 
            btn.innerText = `🤖 АВТОКЛИКЕР — 500⭐`; 
            btn.classList.remove('active'); 
            btn.style.background = ''; 
            btn.style.borderColor = ''; 
            upBtn.style.display = 'none';
        }
    }

    function buyAutoclicker() {
        if (autoclickerBought) return;
        if (stars < AUTOCLICKER_PRICE) { showToast('❌ Нужно 500⭐'); return; }
        stars -= AUTOCLICKER_PRICE; autoclickerBought = true; startAutoclicker(); updateAutoclickerUI(); updateUI(); saveGame(); showToast('✅ Автокликер куплен!'); playBuySound();
    }

    function upgradeAutoclicker() {
        if (!autoclickerBought) return;
        const price = autoclickerLevel * 50;
        if (stars < price) { showToast(`❌ Нужно ${price}⭐`); return; }
        stars -= price; autoclickerLevel++; startAutoclicker(); updateAutoclickerUI(); updateUI(); saveGame(); showToast(`⚡ Автокликер улучшен до Ур. ${autoclickerLevel}!`); playBuySound();
    }

    function startAutoclicker() {
        if (autoclickerInterval) clearInterval(autoclickerInterval); 
        if (!autoclickerBought) return;
        const rate = 10 + (autoclickerLevel - 1) * 5;
        autoclickerInterval = setInterval(() => { points += getClickPower(); totalClicks++; sessionClicks++; updateUI(); }, 1000 / rate);
    }

    // ===== РУЛЕТКА =====
    const ROULETTE_PRIZES = [
        { emoji: '💰', type: 'points', min: 500000, max: 5000000 },
        { emoji: '⭐', type: 'stars', min: 100, max: 500 },
        { emoji: '🧠', type: 'points', min: 10000000, max: 50000000 },
        { emoji: '🌟', type: 'stars', min: 20, max: 100 },
        { emoji: '⚡', type: 'boost', duration: 30 * 60 * 1000 },
        { emoji: '🎁', type: 'nothing' },
        { emoji: '💥', type: 'points', min: 500000000, max: 1000000000 },
        { emoji: '👑', type: 'stars', min: 5000, max: 10000 }
    ];

    function spinRoulette() {
        if (rouletteSpinning) return; 
        if (stars < 50) { showToast('❌ Нужно 50⭐'); return; }
        
        stars -= 50; updateUI(); saveGame(); rouletteSpinning = true;
        const btn = document.getElementById('rouletteSpinBtn'); 
        if (btn) { btn.disabled = true; btn.innerText = '🎲 КРУТИТСЯ...'; }
        
        const slots = document.querySelectorAll('#rouletteWheel .roulette-slot'); slots.forEach(s => s.classList.remove('win'));
        let c = 0; const total = 30; const finalIdx = Math.floor(Math.random() * slots.length);
        const int = setInterval(() => {
            slots.forEach(s => s.classList.remove('win')); slots[c % slots.length].classList.add('win'); c++; playClickSound();
            if (c >= total + finalIdx) {
                clearInterval(int); slots.forEach(s => s.classList.remove('win')); slots[finalIdx].classList.add('win');
                giveRoulettePrize(finalIdx); rouletteSpinning = false; 
                if (btn) { btn.disabled = false; btn.innerText = '🎲 КРУТИТЬ'; }
            }
        }, 70);
    }

    function giveRoulettePrize(idx) {
        const emoji = document.querySelectorAll('#rouletteWheel .roulette-slot')[idx]?.innerText || '🎁';
        let p = ROULETTE_PRIZES.find(x => x.emoji === emoji) || ROULETTE_PRIZES[0]; let msg = '';
        
        if (p.type === 'points') { const a = Math.floor(p.min + Math.random() * (p.max - p.min)); points += a; msg = `+${formatNumber(a)}🧠`; }
        else if (p.type === 'stars') { const a = Math.floor(p.min + Math.random() * (p.max - p.min)); stars += a; totalStarsEarned += a; msg = `+${formatNumber(a)}⭐`; }
        else if (p.type === 'nothing') { msg = '🕳️ ПУСТО!'; }
        else if (p.type === 'boost') { boostEndTime = Date.now() + p.duration; updateBoostUI(); msg = `⚡ Буст X5!`; }
        
        updateUI(); saveGame(); 
        if (p.type !== 'nothing') showToast(`🎉 ВЫИГРЫШ: ${emoji} ${msg}`); else showToast(msg);
        playBuySound();
    }

    // ===== АВТОСОХРАНЕНИЕ И ЗАГРУЗКА =====
    function saveGame() {
        lastSaveTime = Date.now();
        localStorage.setItem('neuralEvoSave', JSON.stringify({
            points, stars, totalClicks, purchasedCount, totalStarsEarned, comboCounter, prestigeLevel,
            boostEndTime, autoclickerBought, autoclickerLevel, currentSkin, purchasedSkins, unlockedAchievements,
            upgrades: upgrades.map(u => ({ purchased: u.purchased })),
            gameStartTime, gameVersion: GAME_VERSION, lastSaveTime
        }));
    }

    function loadGame() {
        const saved = localStorage.getItem('neuralEvoSave');
        if (saved) {
            try {
                const d = JSON.parse(saved);
                points = d.points || 10;
                stars = d.stars || 0;
                totalClicks = d.totalClicks || 0; purchasedCount = d.purchasedCount || 1;
                totalStarsEarned = d.totalStarsEarned || 0;
                comboCounter = d.comboCounter || 0; prestigeLevel = d.prestigeLevel || 0;
                boostEndTime = d.boostEndTime || 0; 
                autoclickerBought = d.autoclickerBought || false;
                if (d.autoclickerLevel) autoclickerLevel = d.autoclickerLevel;
                if (d.currentSkin) currentSkin = d.currentSkin;
                if (d.purchasedSkins) purchasedSkins = d.purchasedSkins;
                if (d.unlockedAchievements) unlockedAchievements = d.unlockedAchievements;
                if (d.upgrades) d.upgrades.forEach((data, i) => { if (upgrades[i]) upgrades[i].purchased = data.purchased; });
                if (d.gameStartTime) gameStartTime = d.gameStartTime;
                purchasedCount = upgrades.filter(u => u.purchased).length;
            } catch(e) {}
        }
        
        if (autoclickerBought) startAutoclicker();
        
        updateUI(); renderShopNeurons(); renderAchievements();
        startBoostTimer();
        if (playtimeInterval) clearInterval(playtimeInterval);
        playtimeInterval = setInterval(() => updatePlaytime(), 60000);
        applyTheme(); applySkin(); updateAutoclickerUI();
        
        const offlineIncome = calculateOfflineIncome();
        if (offlineIncome > 0) { points += offlineIncome; setTimeout(() => showOfflineReward(offlineIncome), 2600); saveGame(); updateUI(); }
    }

    // ===== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====
    function showToast(msg) {
        const t2 = document.createElement('div'); t2.className = 'toast'; t2.innerText = msg;
        document.body.appendChild(t2); setTimeout(() => t2.remove(), 2500);
    }

    let audioCtx = null;
    function initMusic() { if (audioCtx) return; try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {} }
    function playClickSound() { if (!audioCtx) initMusic(); if (audioCtx) { try { const o = audioCtx.createOscillator(); const g = audioCtx.createGain(); o.type = "sine"; o.frequency.value = 880; g.gain.value = 0.05; g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05); o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime + 0.05); } catch(e) {} } }
    function playBuySound() { if (!audioCtx) initMusic(); if (audioCtx) { try { const o = audioCtx.createOscillator(); const g = audioCtx.createGain(); o.type = "triangle"; o.frequency.value = 523.25; g.gain.value = 0.08; g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1); o.connect(g); g.connect(audioCtx.destination); o.start(); o.stop(audioCtx.currentTime + 0.1); } catch(e) {} } }

    function updatePlaytime() { const el = document.getElementById('playtime'); if (el) el.innerText = Math.max(0, Math.floor((Date.now() - gameStartTime) / 60000)); }
    function calculateOfflineIncome() {
        const awaySec = Math.min((Date.now() - lastSaveTime) / 1000, OFFLINE_MAX_HOURS * 3600);
        if (awaySec < 60) return 0; return Math.floor(getClickPower() * awaySec * OFFLINE_RATE);
    }
    function showOfflineReward(amount) { document.getElementById('offlineReward').innerText = '+' + formatNumber(amount) + ' 🧠'; document.getElementById('offlineOverlay')?.classList.add('show'); }

    function getPrestigeMultiplier() { return 1 + prestigeLevel * PRESTIGE_BONUS_PER_LEVEL; }
    function updatePrestigeDisplay() {
        document.getElementById('prestigeLevelDisplay').innerText = prestigeLevel;
        document.getElementById('prestigeBonusDisplay').innerText = '+' + Math.round(prestigeLevel * PRESTIGE_BONUS_PER_LEVEL * 100) + '%';
        document.getElementById('prestigeNeedDisplay').innerText = formatNumber(PRESTIGE_REQUIREMENT) + ' 🧠';
    }

    function doPrestige() {
        if (points < PRESTIGE_REQUIREMENT) { showToast('❌ Нужно 100 000 000 🧠'); return; }
        if (!confirm("Точно престиж? Прогресс сбросится.")) return;
        prestigeLevel++; points = 10; purchasedCount = 1; upgrades.forEach((u, i) => { u.purchased = (i === 0); });
        updateUI(); renderShopNeurons(); updatePrestigeDisplay(); saveGame(); showToast(`🌟 ПРЕСТИЖ! Уровень ${prestigeLevel}!`); playBuySound();
        document.getElementById('prestigeModal')?.classList.remove('show');
    }

    function checkAchievements() {
        let newUnlocked = false;
        ACHIEVEMENTS.forEach(ach => {
            if (!unlockedAchievements.includes(ach.id) && ach.condition()) {
                unlockedAchievements.push(ach.id); points += ach.points; stars += ach.stars; totalStarsEarned += ach.stars; newUnlocked = true;
                showToast(`🏆 Достижение: ${ach.name}`); playBuySound();
            }
        });
        if (newUnlocked) { localStorage.setItem('unlockedAchievements', JSON.stringify(unlockedAchievements)); renderAchievements(); }
    }

    function renderAchievements() {
        const list = document.getElementById('achList'); if (!list) return; let html = '';
        ACHIEVEMENTS.forEach(ach => {
            const isUnlocked = unlockedAchievements.includes(ach.id);
            html += `<div class="${isUnlocked ? 'ach-item unlocked' : 'ach-item locked'}"><div class="ach-info"><div class="ach-name">${isUnlocked ? '🏆' : '🔒'} ${ach.name}</div><div class="ach-desc">${ach.desc}</div></div><div class="ach-reward">+${formatNumber(ach.points)}🧠 +${ach.stars}⭐</div></div>`;
        });
        list.innerHTML = html;
    }

    function isBoostActive() { return Date.now() < boostEndTime; }
    function updateBoostUI() {
        const btn = document.getElementById('boostBtn'); if (!btn) return;
        if (isBoostActive()) { const ms = boostEndTime - Date.now(); btn.innerText = `⚡ X5 АКТИВЕН — ${Math.floor(ms / 60000)}:${Math.floor((ms % 60000) / 1000).toString().padStart(2, '0')}`; btn.classList.add('active'); }
        else { btn.innerText = '⚡ БУСТ X5 — 20⭐'; btn.classList.remove('active'); }
    }
    function startBoostTimer() { setInterval(() => { if (isBoostActive()) updateBoostUI(); }, 1000); }
    function buyBoost() {
        if (isBoostActive()) { showToast('⚡ Буст уже активен'); return; }
        if (stars < BOOST_PRICE) { showToast('❌ Нужно 20⭐'); return; }
        stars -= BOOST_PRICE; boostEndTime = Date.now() + BOOST_DURATION; updateUI(); updateBoostUI(); saveGame(); showToast('⚡ БУСТ X5 АКТИВЕН!'); playBuySound();
    }

    function getClickPower() {
        let base = 1; upgrades.forEach(u => { if (u.purchased) base += u.power; });
        if (isBoostActive()) base *= BOOST_MULTIPLIER;
        base *= getPrestigeMultiplier(); 
        base *= (SKINS.find(s => s.id === currentSkin)?.mult || 1); 
        return Math.floor(base);
    }

    function updateUI() {
        document.getElementById('points').innerText = formatNumber(points);
        document.getElementById('power').innerText = getClickPower();
        document.getElementById('clickHint').innerHTML = `+${formatNumber(getClickPower())}`;
        document.getElementById('stars').innerText = formatNumber(stars);
        updatePlaytime(); checkAchievements();
    }

    // ===== ОБРАБОТЧИКИ КЛИКОВ =====
    function handlePointerDown(e) {
        e.preventDefault();
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        const gain = getClickPower();
        points += gain; totalClicks++; sessionClicks++; playClickSound();
        
        const x = e.clientX, y = e.clientY;
        const el = document.createElement('div'); el.className = 'float-text'; el.innerText = `+${formatNumber(gain)}`;
        el.style.left = (x - 20) + 'px'; el.style.top = (y - 10) + 'px'; document.body.appendChild(el);
        setTimeout(() => el.remove(), 1000);
        
        const brain = document.getElementById('clickableObject');
        if(brain) { brain.style.transform = 'scale(0.92)'; setTimeout(() => brain.style.transform = '', 120); }
        
        if (Math.random() < 0.01) { stars += 3; totalStarsEarned += 3; showToast('⭐ ЗВЁЗДЫ! +3'); }
        updateUI(); saveGame();
    }
    document.getElementById('clickableObject')?.addEventListener('pointerdown', handlePointerDown);

    // ===== UI ОБРАБОТЧИКИ =====
    document.getElementById('playBtn')?.addEventListener('click', () => { 
        if (!localStorage.getItem('tutorialDone')) { document.getElementById('tutorialOverlay').classList.add('show'); return; } 
        document.getElementById('mainMenu').classList.add('hidden'); document.getElementById('gameInterface').classList.remove('hidden'); 
    });
    document.getElementById('tutorialYes')?.addEventListener('click', () => { document.getElementById('tutorialStep1').classList.add('hidden'); document.getElementById('tutorialStep2').classList.remove('hidden'); });
    document.getElementById('tutorialNo')?.addEventListener('click', () => { localStorage.setItem('tutorialDone', 'true'); document.getElementById('tutorialOverlay').classList.remove('show'); document.getElementById('mainMenu').classList.add('hidden'); document.getElementById('gameInterface').classList.remove('hidden'); });
    document.getElementById('tutorialOk')?.addEventListener('click', () => { localStorage.setItem('tutorialDone', 'true'); document.getElementById('tutorialOverlay').classList.remove('show'); document.getElementById('mainMenu').classList.add('hidden'); document.getElementById('gameInterface').classList.remove('hidden'); });

    document.getElementById('backToMenu')?.addEventListener('click', () => { document.getElementById('mainMenu').classList.remove('hidden'); document.getElementById('gameInterface').classList.add('hidden'); });
    document.getElementById('openShopBtn')?.addEventListener('click', () => { document.getElementById('shopPanel').classList.add('show'); switchShopTab('neurons'); });
    document.getElementById('closeShopBtn')?.addEventListener('click', () => document.getElementById('shopPanel').classList.remove('show'));
    document.querySelectorAll('.shop-tab').forEach(tab => tab.addEventListener('click', () => switchShopTab(tab.dataset.tab)));
    
    document.getElementById('buyAllBtn')?.addEventListener('click', buyAllAvailable);
    document.getElementById('boostBtn')?.addEventListener('click', buyBoost);
    document.getElementById('autoclickerBtn')?.addEventListener('click', buyAutoclicker);
    document.getElementById('autoclickerUpgradeBtn')?.addEventListener('click', upgradeAutoclicker);
    document.getElementById('rouletteBtn')?.addEventListener('click', () => document.getElementById('rouletteOverlay').classList.add('show'));
    document.getElementById('rouletteSpinBtn')?.addEventListener('click', spinRoulette);
    document.getElementById('rouletteCloseBtn')?.addEventListener('click', () => document.getElementById('rouletteOverlay').classList.remove('show'));
    
    document.getElementById('prestigeBtn')?.addEventListener('click', () => { updatePrestigeDisplay(); document.getElementById('prestigeModal').classList.add('show'); });
    document.getElementById('doPrestigeBtn')?.addEventListener('click', doPrestige);
    document.getElementById('closePrestigeBtn')?.addEventListener('click', () => document.getElementById('prestigeModal').classList.remove('show'));

    document.getElementById('achBtn')?.addEventListener('click', () => { renderAchievements(); document.getElementById('achOverlay').classList.add('show'); });
    document.getElementById('achCloseBtn')?.addEventListener('click', () => document.getElementById('achOverlay').classList.remove('show'));
    document.getElementById('offlineOkBtn')?.addEventListener('click', () => document.getElementById('offlineOverlay').classList.remove('show'));
    document.getElementById('factCloseBtn')?.addEventListener('click', () => document.getElementById('factOverlay').classList.remove('show'));

    document.getElementById('newsBtn')?.addEventListener('click', () => { 
        document.getElementById('newsTitle').innerText = NEWS_DATA.title; document.getElementById('newsText').innerHTML = NEWS_DATA.text; 
        document.getElementById('newsModal').classList.add('show'); 
    });
    document.getElementById('closeNewsBtn')?.addEventListener('click', () => document.getElementById('newsModal').classList.remove('show'));

    document.getElementById('settingsBtn')?.addEventListener('click', () => document.getElementById('settingsModal').classList.add('show'));
    document.getElementById('closeSettings')?.addEventListener('click', () => document.getElementById('settingsModal').classList.remove('show'));
    document.getElementById('resetGameBtn')?.addEventListener('click', () => { if (confirm("Сбросить всё?")) { localStorage.clear(); location.reload(); } });
    document.getElementById('exportSaveBtn')?.addEventListener('click', () => {
        saveGame(); const saved = localStorage.getItem('neuralEvoSave'); const blob = new Blob([saved], { type: "application/json" }); const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "save.json"; a.click();
    });
    document.getElementById('importSaveBtn')?.addEventListener('click', () => {
        const input = document.createElement('input'); input.type = 'file'; input.onchange = (e) => {
            const reader = new FileReader(); reader.onload = (ev) => { localStorage.setItem('neuralEvoSave', ev.target.result); location.reload(); }; reader.readAsText(e.target.files[0]);
        }; input.click();
    });

    // ===== АДМИНКА =====
    document.getElementById('menuVersion')?.addEventListener('click', () => {
        const pass = prompt("Введите пароль:");
        if (pass === ADMIN_PASSWORD) document.getElementById('adminOverlay').classList.add('show');
    });
    document.getElementById('adminCloseBtn')?.addEventListener('click', () => document.getElementById('adminOverlay').classList.remove('show'));
    document.getElementById('adminBody').innerHTML = `<div class="admin-item"><span>Дать очков:</span><input type="number" id="admPointsInput" class="admin-input" placeholder="1000"></div><div class="admin-item"><span></span><button id="admPoints">Дать</button></div><div class="admin-item"><span>Дать звёзд:</span><input type="number" id="admStarsInput" class="admin-input" placeholder="100"></div><div class="admin-item"><span></span><button id="admStars">Дать</button></div>`;
    document.getElementById('admPoints').onclick = () => { const v = parseInt(document.getElementById('admPointsInput').value) || 1000; points += v; updateUI(); saveGame(); showToast(`+${formatNumber(v)}🧠`); };
    document.getElementById('admStars').onclick = () => { const v = parseInt(document.getElementById('admStarsInput').value) || 100; stars += v; totalStarsEarned += v; updateUI(); saveGame(); showToast(`+${formatNumber(v)}⭐`); };

    setInterval(saveGame, 5000);
    applyTheme();
    loadGame();
});
