// ===== ВЕРСИЯ =====
const GAME_VERSION = "11.14";

if (localStorage.getItem('gameVersion') !== GAME_VERSION) {
    localStorage.removeItem('neuralEvoSave');
    localStorage.removeItem('aiPassSeason');
    localStorage.removeItem('banEnd');
    localStorage.setItem('gameVersion', GAME_VERSION);
}

// ===== ХЭЛЛОУИН =====
function isHalloween() {
    const now = new Date();
    return now.getMonth() === 9 && now.getDate() === 31;
}

// ===== НОВЫЙ ГОД =====
function isNewYear() {
    const now = new Date();
    const m = now.getMonth();
    const d = now.getDate();
    return (m === 11 && d === 31) || (m === 0 && d === 1);
}

function applyTheme() {
    const body = document.body;
    const brain = document.getElementById('clickableObject');
    const brainEmoji = document.getElementById('brainEmoji');
    const diamondLabel = document.getElementById('diamondLabel');
    const sleepMsg = document.getElementById('sleepMsg');
    const reloadTimer = document.getElementById('reloadTimer');
    const title = document.getElementById('gameTitle');

    body.classList.remove('bg-halloween', 'bg-newyear');
    body.classList.remove('bg-early-autumn', 'bg-golden', 'bg-rainy', 'bg-late', 'bg-forest', 'bg-park', 'bg-mountains', 'bg-village');
    if (brain) brain.classList.remove('halloween-brain', 'newyear-brain');
    const oldHat = brain ? brain.querySelector('.santa-hat') : null;
    if (oldHat) oldHat.remove();

    if (isHalloween()) {
        body.classList.add('bg-halloween');
        if (brain) brain.classList.add('halloween-brain');
        if (brainEmoji) brainEmoji.innerText = '🎃';
        if (diamondLabel) diamondLabel.innerHTML = '🍬 <span id="diamonds">' + (window.__diamonds || 0) + '</span>';
        if (sleepMsg) sleepMsg.innerText = '🎃 Страшно?';
        if (reloadTimer) reloadTimer.innerHTML = '⏳ ДО ХЭЛЛОУИНА: <span id="reloadCountdown">5:00</span>';
        if (title) title.innerText = '🎃 КЛИКЕР: ХЭЛЛОУИН НЕЙРОСЕТЕЙ';
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
        if (diamondLabel) diamondLabel.innerHTML = '❄️ <span id="diamonds">' + (window.__diamonds || 0) + '</span>';
        if (sleepMsg) sleepMsg.innerText = '❄️ С Новым Годом!';
        if (reloadTimer) reloadTimer.innerHTML = '🎄 НОВЫЙ ГОД: <span id="reloadCountdown">5:00</span>';
        if (title) title.innerText = '🎄 КЛИКЕР: НОВОГОДНЯЯ ЭВОЛЮЦИЯ';
    } else {
        const savedBg = localStorage.getItem('selectedBg') || 'early_autumn';
        const bgThemes = {
            early_autumn: "bg-early-autumn",
            golden: "bg-golden",
            rainy: "bg-rainy",
            late: "bg-late",
            forest: "bg-forest",
            park: "bg-park",
            mountains: "bg-mountains",
            village: "bg-village"
        };
        body.classList.add(bgThemes[savedBg] || 'bg-early-autumn');
        if (brainEmoji) brainEmoji.innerText = '🧠';
        if (diamondLabel) diamondLabel.innerHTML = '💎 <span id="diamonds">' + (window.__diamonds || 0) + '</span>';
        if (sleepMsg) sleepMsg.innerText = '😴 Спишь?';
        if (reloadTimer) reloadTimer.innerHTML = '🔄 ПЕРЕЗАГРУЗКА: <span id="reloadCountdown">5:00</span>';
        if (title) title.innerText = '🧠 КЛИКЕР: ЭВОЛЮЦИЯ НЕЙРОСЕТЕЙ';
    }
}

window.addEventListener('load', () => {
    setTimeout(() => {
        const ls = document.getElementById('loadingScreen');
        if (ls) ls.classList.add('hidden');
    }, 1500);

    document.getElementById('menuVersion').innerText = `v${GAME_VERSION}`;

    // ===== БАН =====
    const badWords = [
        "дима лох", "дима тупой", "дима дурак", "дима еблан", "дима долбаеб",
        "разработчик лох", "разработчик тупой", "разработчик дурак", "разработчик еблан", "разработчик уебан"
    ];
    let isBanned = false;
    let banTimer = null;
    const BAN_DURATION = 20 * 60 * 1000;

    function checkBan(code) {
        const lower = code.toLowerCase().trim();
        for (let word of badWords) {
            if (lower.includes(word)) return true;
        }
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
            showToast(`🌚 Ты забанен на ${Math.ceil(remaining / 60)} минут`);
            if (banTimer) clearTimeout(banTimer);
            banTimer = setTimeout(() => {
                localStorage.removeItem('banEnd');
                isBanned = false;
                document.body.style.filter = "";
                document.body.style.pointerEvents = "";
                showToast("✅ Бан снят. Не повторяй.");
            }, banEnd - Date.now());
        } else {
            localStorage.removeItem('banEnd');
            isBanned = false;
            document.body.style.filter = "";
            document.body.style.pointerEvents = "";
        }
    }

    // ===== ПЕРЕМЕННЫЕ =====
    let points = 100, diamonds = 0, totalClicks = 0, purchasedCount = 1;
    let totalDiamondsEarned = 0;
    let sessionClicks = 0;
    let godMode = false;
    let comboCounter = 0;
    let gameStartTime = Date.now();
    let playtimeInterval = null;
    let sleepMsgTimer = null;
    let sleepMsgShowing = false;

    Object.defineProperty(window, '__diamonds', { get: () => diamonds });

    // ===== НЕЙРОСЕТИ =====
    const neuralNames = [
        "Перцептрон","Нейро-искра","Сверточная","Рекуррентная","Трансформер","Квантовая","GPT-клик","Автокодировщик","DALL-E","Глубокий мозг","Gemini","Нейро-интерфейс","Claude 3","Мультивселенная","Midjourney","Легендарная","Сингулярность","Божественный ИИ","Нейро-Земля","ИИ-Солнце","Галактическая","Космическая","Сверхразум","ДНК-бота","Бесконечность",
        "Лев","Тигр","Медведь","Волк","Лиса","Орёл","Сокол","Дельфин","Кит","Акула","Пантера","Ягуар","Леопард","Гепард","Зебра","Жираф","Слон","Носорог","Бегемот","Крокодил","Питон","Анаконда","Хамелеон","Игуана","Фламинго","Пингвин","Сова","Ястреб","Скорпион","Паук",
        "Пицца","Бургер","Суши","Роллы","Рамен","Паста","Спагетти","Лазанья","Тирамису","Панна-котта","Крем-брюле","Макаронс","Эклер","Пончик","Круассан","Багет","Сыр","Ветчина","Колбаса","Бекон","Стейк","Гриль","Барбекю","Шашлык","Плов","Борщ","Оливье","Сельдь","Икра","Блины",
        "Меркурий","Венера","Земля","Марс","Юпитер","Сатурн","Уран","Нептун","Плутон","Церера","Эрида","Макемаке","Хаумеа","Седна","Орк","Иксион","Варуна","Квавар","Фобос","Деймос","Ио","Европа","Ганимед","Каллисто","Титан","Рея","Япет","Мимас","Энцелад","Тритон",
        "Mario","Link","Samus","Kirby","Fox","Pikachu","Charizard","Mewtwo","Cloud","Sephiroth","Sonic","Tails","Knuckles","Shadow","Master Chief","Cortana","Doom","Ryu","Ken","Chun-Li","Kratos","Atreus","Lara","Nathan","Ezio","Altair","Gordon","Freeman","Chell","Wheatley",
        "Кремний","Процессор","Видеокарта","Оперативка","SSD","Материнка","Блок-питания","Кулер","Монитор","Клавиатура","Мышь","Принтер","Сканер","Микрофон","Колонки","Наушники","Роутер","Модем","Сервер","Ноутбук","Планшет","Смартфон","Часы","Фитнес-браслет","Дрон","Робот","Андроид","iOS","Windows","Linux"
    ];

    let upgrades = [];
    for (let i = 0; i < 1500; i++) {
        const power = i === 0 ? 1 : 1 + Math.floor(i / 10);
        const price = i === 0 ? 20 : Math.floor(20 * Math.pow(1.17, i));
        const name = i < neuralNames.length ? neuralNames[i] : `Нейросеть #${i + 1}`;
        upgrades.push({
            id: i,
            name: name,
            power: power,
            price: price,
            purchased: i === 0
        });
    }

    let currentPage = 0, ITEMS_PER_PAGE = 20, totalPages = Math.ceil(upgrades.length / ITEMS_PER_PAGE);

    function renderShopNeurons() {
        const start = currentPage * ITEMS_PER_PAGE, end = Math.min(start + ITEMS_PER_PAGE, upgrades.length);
        let html = '';
        if (totalPages > 1) html += `<div class="pagination"><button class="page-btn" id="prevPageBtn">⬅️</button><span>${currentPage+1}/${totalPages}</span><button class="page-btn" id="nextPageBtn">➡️</button></div>`;
        for (let i = start; i < end; i++) {
            const u = upgrades[i];
            html += `<div class="shop-item" data-id="${u.id}"><span>${u.name} +${u.power}</span><span>${u.purchased ? '✅' : `💰 ${u.price}`}</span></div>`;
        }
        if (totalPages > 1) html += `<div class="pagination"><button class="page-btn" id="prevPageBtn2">⬅️</button><span>${currentPage+1}/${totalPages}</span><button class="page-btn" id="nextPageBtn2">➡️</button></div>`;
        document.getElementById('shopNeurons').innerHTML = html;
        document.querySelectorAll('#shopNeurons .shop-item').forEach(el => {
            const id = parseInt(el.dataset.id);
            const u = upgrades[id];
            if (!u.purchased) {
                el.addEventListener('click', () => buyUpgrade(id));
            }
        });
        document.querySelectorAll('#prevPageBtn, #prevPageBtn2').forEach(btn => btn.addEventListener('click', () => { if (currentPage > 0) { currentPage--; renderShopNeurons(); } }));
        document.querySelectorAll('#nextPageBtn, #nextPageBtn2').forEach(btn => btn.addEventListener('click', () => { if (currentPage < totalPages - 1) { currentPage++; renderShopNeurons(); } }));
    }

    function buyUpgrade(id) {
        const u = upgrades[id];
        if (!u.purchased && points >= u.price) {
            points -= u.price;
            u.purchased = true;
            purchasedCount++;
            updateUI();
            renderShopNeurons();
            saveGame();
            showToast(`✅ ${u.name} куплена!`);
            playBuySound();
        } else showToast("❌ Не хватает очков");
    }

    // ===== AI PASS 6 (21–30 сентября) =====
    let passTasks = [];
    let passCurrentTask = 0;
    // AI Pass 6: 21 сентября 2026 — 30 сентября 2026
    const passStartDate = new Date(2026, 8, 21, 0, 0, 0);
    const passEndDate = new Date(2026, 8, 30, 23, 59, 59);
    let passEndTimerInterval = null;
    let passRewardSeconds = 600;
    let passRewardInterval = null;

    // Сброс AI Pass при новом сезоне
    if (localStorage.getItem('aiPassSeason') !== '6') {
        passTasks = [];
        for (let i = 1; i <= 20; i++) {
            passTasks.push({
                level: i,
                targetClicks: i * 500,
                rewardPoints: i * 500,
                rewardDiamonds: i * 5,
                completed: false,
                claimed: false
            });
        }
        passCurrentTask = 0;
        passRewardSeconds = 600;
        localStorage.setItem('aiPassSeason', '6');
    } else {
        for (let i = 1; i <= 20; i++) {
            passTasks.push({
                level: i,
                targetClicks: i * 500,
                rewardPoints: i * 500,
                rewardDiamonds: i * 5,
                completed: false,
                claimed: false
            });
        }
    }

    function isPassActive() {
        const now = new Date();
        return now >= passStartDate && now <= passEndDate;
    }

    function renderPassBadges() {
        const container = document.getElementById('passLevels');
        if (!container) return;
        let html = '';
        passTasks.forEach((task, idx) => {
            let cls = 'pass-badge';
            let statusText = '';
            if (task.claimed) { cls += ' completed'; statusText = '✅'; }
            else if (idx === passCurrentTask) { cls += ' available'; statusText = '🎯'; }
            else if (idx < passCurrentTask) { cls += ' completed'; statusText = '✔'; }
            else { cls += ' locked'; statusText = '🔒'; }
            html += `<div class="${cls}">${task.level}<br>${statusText}</div>`;
        });
        container.innerHTML = html;

        const progressFill = document.getElementById('passProgressFill');
        if (progressFill) {
            const claimed = passTasks.filter(t => t.claimed).length;
            progressFill.style.width = ((claimed / passTasks.length) * 100) + '%';
        }
    }

    function updatePassRewardTimerDisplay() {
        const el = document.getElementById('passTimer');
        if (!el) return;
        if (!isPassActive()) {
            el.innerHTML = `⏱️ --:--`;
            return;
        }
        const m = Math.floor(passRewardSeconds / 60);
        const s = passRewardSeconds % 60;
        el.innerHTML = `⏱️ ${m}:${s.toString().padStart(2, '0')}`;
    }

    function startPassRewardTimer() {
        if (passRewardInterval) clearInterval(passRewardInterval);
        updatePassRewardTimerDisplay();
        passRewardInterval = setInterval(() => {
            if (!isPassActive()) return;
            passRewardSeconds--;
            if (passRewardSeconds <= 0) {
                points += 500;
                diamonds += 5;
                totalDiamondsEarned += 5;
                updateUI();
                saveGame();
                showToast(`🎁 Награда AI Pass 6! +500🧠 +5💎`);
                playBuySound();
                passRewardSeconds = 600;
            }
            updatePassRewardTimerDisplay();
        }, 1000);
    }

    function renderTasksList() {
        const container = document.getElementById('tasksList');
        if (!container) return;
        let html = '';
        passTasks.forEach((task, idx) => {
            let cls = 'task-item';
            let statusText = '';
            let claimBtn = '';
            if (task.claimed) {
                cls += ' completed';
                statusText = '✅ ВЫПОЛНЕНО';
            } else if (idx === passCurrentTask) {
                cls += ' current';
                const progress = Math.min(totalClicks, task.targetClicks);
                const percent = Math.min(100, (progress / task.targetClicks) * 100);
                statusText = `${progress} / ${task.targetClicks} кликов`;
                if (totalClicks >= task.targetClicks) {
                    claimBtn = `<button class="task-claim-btn" data-idx="${idx}">ЗАБРАТЬ</button>`;
                }
                html += `<div class="${cls}">
                    <div class="task-header">
                        <span class="task-level">🎯 Уровень ${task.level}</span>
                        <span class="task-reward">+${task.rewardPoints}🧠 +${task.rewardDiamonds}💎</span>
                    </div>
                    <div class="task-desc">Сделай ${task.targetClicks} кликов</div>
                    <div class="task-progress-bar"><div class="task-progress-fill" style="width:${percent}%"></div></div>
                    <div class="task-progress-text">${statusText}</div>
                    ${claimBtn}
                </div>`;
                return;
            } else if (idx < passCurrentTask) {
                cls += ' completed';
                statusText = '✅ ВЫПОЛНЕНО';
            } else {
                statusText = `🔒 Сначала пройди уровень ${idx}`;
            }
            html += `<div class="${cls}">
                <div class="task-header">
                    <span class="task-level">${idx === passCurrentTask ? '🎯' : '🔒'} Уровень ${task.level}</span>
                    <span class="task-reward">+${task.rewardPoints}🧠 +${task.rewardDiamonds}💎</span>
                </div>
                <div class="task-desc">Сделай ${task.targetClicks} кликов</div>
                <div class="task-progress-text">${statusText}</div>
            </div>`;
        });
        container.innerHTML = html;
        document.querySelectorAll('.task-claim-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                claimTask(parseInt(btn.dataset.idx));
            });
        });
    }

    function claimTask(idx) {
        const task = passTasks[idx];
        if (!task || task.claimed) return;
        if (idx !== passCurrentTask) return;
        if (totalClicks < task.targetClicks) return;
        task.claimed = true;
        points += task.rewardPoints;
        diamonds += task.rewardDiamonds;
        totalDiamondsEarned += task.rewardDiamonds;
        passCurrentTask++;
        updateUI();
        renderPassBadges();
        renderTasksList();
        saveGame();
        showToast(`🎉 Уровень ${task.level} получен!`);
        playBuySound();
    }

    function checkPassProgress() {
        const modal = document.getElementById('passTasksModal');
        if (modal && modal.classList.contains('show')) {
            renderTasksList();
        }
    }

    function updatePassEndTimer() {
        const el = document.getElementById('passEndTimer');
        if (!el) return;
        const now = new Date();
        const diff = passEndDate - now;
        if (diff <= 0) {
            el.innerHTML = "⏳ AI PASS 6 ЗАВЕРШЁН!";
            if (passEndTimerInterval) clearInterval(passEndTimerInterval);
            return;
        }
        if (now < passStartDate) {
            el.innerHTML = "⏳ AI Pass 6 начнётся 21 сентября!";
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % 86400000) / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        el.innerHTML = `⏳ До конца AI Pass 6: ${days} дн. ${hours} ч. ${minutes} мин.`;
    }

    function startPassEndTimer() {
        if (passEndTimerInterval) clearInterval(passEndTimerInterval);
        updatePassEndTimer();
        passEndTimerInterval = setInterval(updatePassEndTimer, 60000);
    }

    // ===== ЗВУКИ =====
    const soundProfiles = [
        { name: "Обычный", freq: 880, type: "sine" },
        { name: "Пиксельный", freq: 1200, type: "square" },
        { name: "Глубокий", freq: 440, type: "sawtooth" }
    ];
    let currentSoundProfile = 0;

    let audioCtx = null;
    let musicEnabled = localStorage.getItem('musicEnabled') === 'true';

    function initMusic() { if (audioCtx) return; try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {} }

    const musicBtn = document.getElementById('musicToggle');
    if (musicBtn) {
        musicBtn.innerText = musicEnabled ? '🔊' : '🔇';
        musicBtn.onclick = () => {
            musicEnabled = !musicEnabled;
            localStorage.setItem('musicEnabled', musicEnabled);
            musicBtn.innerText = musicEnabled ? '🔊' : '🔇';
        };
    }

    document.querySelectorAll('.menu-btn').forEach((btn,i)=>{ btn.style.animationDelay=`${i*0.05}s`; });

    function spawnFloatText(x, y, text) {
        const el = document.createElement('div');
        el.className = 'float-text';
        el.innerText = text;
        el.style.left = (x - 20) + 'px';
        el.style.top = (y - 10) + 'px';
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
        const seconds = Math.floor((Date.now() - gameStartTime) / 1000);
        el.innerText = Math.floor(seconds / 60);
    }

    function startSleepMsgTimer() {
        if (sleepMsgTimer) clearTimeout(sleepMsgTimer);
        sleepMsgTimer = setTimeout(() => {
            if (!sleepMsgShowing) {
                sleepMsgShowing = true;
                const el = document.getElementById('sleepMsg');
                if (el) el.classList.add('show');
            }
        }, 45000);
    }

    function hideSleepMsg() {
        if (sleepMsgTimer) clearTimeout(sleepMsgTimer);
        if (sleepMsgShowing) {
            sleepMsgShowing = false;
            const el = document.getElementById('sleepMsg');
            if (el) el.classList.remove('show');
        }
        startSleepMsgTimer();
    }

    function shareProgress() {
        const text = `🧠 Мой прогресс в игре "Кликер: Эволюция Нейросетей":
🧠 Очки: ${Math.floor(points)}
💎 Алмазы: ${diamonds}
🖱️ Всего кликов: ${totalClicks}
🧬 Нейросетей: ${purchasedCount}/1500
🤖 AI Pass 6 уровней: ${passTasks.filter(t=>t.claimed).length}/20
📅 Версия ${GAME_VERSION}`;
        navigator.clipboard.writeText(text);
        showToast("✅ Прогресс скопирован!");
    }

    function getClickPower() {
        let base = 1;
        upgrades.forEach(u => { if (u.purchased) base += u.power; });
        if (godMode) base *= 10;
        return Math.floor(base);
    }

    function updateUI() {
        if (isBanned) return;
        const p = document.getElementById('points');
        const pw = document.getElementById('power');
        const ch = document.getElementById('clickHint');
        const dm = document.getElementById('diamonds');
        if (p) p.innerText = Math.floor(points);
        if (pw) pw.innerText = getClickPower();
        if (ch) ch.innerHTML = godMode ? `+${getClickPower()} (БОГ)` : `+${getClickPower()}`;
        if (dm) dm.innerText = diamonds;
        updateStatsUI();
        updatePlaytime();
        const ct = document.getElementById('comboText');
        if (ct) ct.classList.remove('show');
        checkPassProgress();
    }

    function showToast(msg) {
        const t = document.createElement('div');
        t.className = 'toast';
        t.innerText = msg;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 2500);
    }

    function saveGame() {
        const save = {
            points, diamonds, totalClicks, purchasedCount,
            totalDiamondsEarned, godMode, comboCounter,
            upgrades: upgrades.map(u => ({ purchased: u.purchased })),
            passTasks: passTasks.map(t => ({ claimed: t.claimed, completed: t.completed })),
            passCurrentTask, passRewardSeconds,
            gameStartTime, currentSoundProfile, gameVersion: GAME_VERSION
        };
        localStorage.setItem('neuralEvoSave', JSON.stringify(save));
    }

    function loadGame() {
        const saved = localStorage.getItem('neuralEvoSave');
        if (saved) {
            try {
                const d = JSON.parse(saved);
                points = d.points || 100;
                diamonds = d.diamonds || 0;
                totalClicks = d.totalClicks || 0;
                purchasedCount = d.purchasedCount || 1;
                totalDiamondsEarned = d.totalDiamondsEarned || 0;
                godMode = d.godMode || false;
                comboCounter = d.comboCounter || 0;
                if (d.upgrades) {
                    d.upgrades.forEach((data, i) => {
                        if (upgrades[i]) upgrades[i].purchased = data.purchased;
                    });
                }
                if (d.passTasks) {
                    d.passTasks.forEach((data, i) => {
                        if (passTasks[i]) {
                            passTasks[i].claimed = data.claimed;
                            passTasks[i].completed = data.completed;
                        }
                    });
                }
                if (d.passCurrentTask !== undefined) passCurrentTask = d.passCurrentTask;
                if (d.passRewardSeconds !== undefined) passRewardSeconds = d.passRewardSeconds;
                if (d.gameStartTime) gameStartTime = d.gameStartTime;
                if (d.currentSoundProfile !== undefined) currentSoundProfile = d.currentSoundProfile;
                purchasedCount = upgrades.filter(u => u.purchased).length;
            } catch(e) {}
        }
        updateUI();
        renderShopNeurons();
        renderPassBadges();
        renderTasksList();
        updateStatsUI();
        startPassEndTimer();
        startPassRewardTimer();
        if (playtimeInterval) clearInterval(playtimeInterval);
        playtimeInterval = setInterval(() => updatePlaytime(), 60000);
        startSleepMsgTimer();
        const stb = document.getElementById('soundToggleBtn');
        if (stb) stb.innerText = `Сменить (${soundProfiles[currentSoundProfile].name})`;
        applyBanState();
        applyTheme();
    }

    function exportProgress() {
        const saveData = {
            points, diamonds, totalClicks, purchasedCount,
            totalDiamondsEarned, godMode, comboCounter,
            upgrades: upgrades.map(u => ({ purchased: u.purchased })),
            passTasks: passTasks.map(t => ({ claimed: t.claimed, completed: t.completed })),
            passCurrentTask, passRewardSeconds,
            gameStartTime, currentSoundProfile,
            gameVersion: GAME_VERSION
        };
        const blob = new Blob([JSON.stringify(saveData)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "neural_evolution_save.json";
        a.click();
        URL.revokeObjectURL(url);
        showToast("💾 Прогресс сохранён!");
    }

    function importProgress(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                data.gameVersion = GAME_VERSION;
                localStorage.setItem('neuralEvoSave', JSON.stringify(data));
                showToast("📂 Загружено! Перезагружаю...");
                setTimeout(() => location.reload(), 1000);
            } catch(error) {
                showToast("❌ Ошибка загрузки");
            }
        };
        reader.readAsText(file);
    }

    const importInput = document.createElement('input');
    importInput.type = 'file';
    importInput.accept = '.json';
    importInput.onchange = (e) => { if (e.target.files[0]) importProgress(e.target.files[0]); };

    // ===== ФОНЫ =====
    const bgThemes = {
        early_autumn: "bg-early-autumn",
        golden: "bg-golden",
        rainy: "bg-rainy",
        late: "bg-late",
        forest: "bg-forest",
        park: "bg-park",
        mountains: "bg-mountains",
        village: "bg-village"
    };

    function setBodyBg(theme) {
        if (isHalloween() || isNewYear()) return;
        document.body.className = '';
        document.body.classList.add(bgThemes[theme] || 'bg-early-autumn');
        localStorage.setItem('selectedBg', theme);
    }
    const savedBg = localStorage.getItem('selectedBg');
    if (savedBg && bgThemes[savedBg] && !isHalloween() && !isNewYear()) setBodyBg(savedBg);
    else applyTheme();

    // ===== КЛИК =====
    function processSingleClick(gain, x, y) {
        if (isBanned) return;
        hideSleepMsg();

        comboCounter++;
        let finalGain = gain;
        if (comboCounter % 5 === 0) {
            finalGain = gain * 2;
            const comboText = document.getElementById('comboText');
            if (comboText) {
                comboText.innerText = "🔥 x2 КОМБО!";
                comboText.classList.add('show');
                setTimeout(() => comboText.classList.remove('show'), 800);
            }
            spawnFloatText(x, y - 40, "🔥 x2!");
        }

        if (Math.random() < 0.02) {
            finalGain = gain * 3;
            spawnFloatText(x, y - 40, "⚡ x3!");
            showToast("⚡ ТРОЙНОЙ КЛИК! x3!");
            playBuySound();
        }

        points += finalGain;
        totalClicks++;
        sessionClicks++;
        playClickSound();

        if (Math.random() < 0.01) {
            diamonds++;
            totalDiamondsEarned++;
            if (isHalloween()) showToast("🍬 КОНФЕТА!");
            else if (isNewYear()) showToast("❄️ СНЕЖИНКА!");
            else showToast("💎 АЛМАЗ!");
            playBuySound();
            spawnFloatText(x, y - 30, isHalloween() ? "🍬" : (isNewYear() ? "❄️" : "💎"));
        }
    }

    function handleMultiTouch(e) {
        e.preventDefault();
        if (isBanned) return;
        const gain = getClickPower();
        for (let i = 0; i < e.touches.length; i++) {
            const touch = e.touches[i];
            processSingleClick(gain, touch.clientX, touch.clientY);
        }
        const brain = document.getElementById('clickableObject');
        brain.style.transform = 'scale(0.92)';
        setTimeout(() => brain.style.transform = '', 120);
        updateUI();
        saveGame();
    }

    function handleMouseClick(e) {
        e.preventDefault();
        if (isBanned) return;
        const gain = getClickPower();
        processSingleClick(gain, e.clientX, e.clientY);
        const brain = document.getElementById('clickableObject');
        brain.style.transform = 'scale(0.92)';
        setTimeout(() => brain.style.transform = '', 120);
        updateUI();
        saveGame();
    }

    function playClickSound() {
        if (!audioCtx) initMusic();
        if (audioCtx) {
            try {
                const profile = soundProfiles[currentSoundProfile];
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = profile.type;
                osc.frequency.value = profile.freq;
                gain.gain.value = 0.08;
                gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.05);
            } catch(e) {}
        }
    }

    function playBuySound() {
        if (!audioCtx) initMusic();
        if (audioCtx) {
            try {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = "triangle";
                osc.frequency.value = 523.25;
                gain.gain.value = 0.08;
                gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.1);
                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.1);
            } catch(e) {}
        }
    }

    const clickable = document.getElementById('clickableObject');
    if (clickable) {
        clickable.addEventListener('touchstart', handleMultiTouch, { passive: false });
        clickable.addEventListener('mousedown', handleMouseClick);
    }

    // ===== ОБУЧЕНИЕ =====
    const tutorialOverlay = document.getElementById('tutorialOverlay');
    const tutorialStep1 = document.getElementById('tutorialStep1');
    const tutorialStep2 = document.getElementById('tutorialStep2');

    if (!localStorage.getItem('tutorialDone')) {
        setTimeout(() => {
            if (tutorialOverlay) tutorialOverlay.classList.add('show');
        }, 1800);
    }

    document.getElementById('tutorialYes')?.addEventListener('click', () => {
        tutorialStep1.classList.add('hidden');
        tutorialStep2.classList.remove('hidden');
    });

    document.getElementById('tutorialNo')?.addEventListener('click', () => {
        localStorage.setItem('tutorialDone', 'true');
        if (tutorialOverlay) tutorialOverlay.classList.remove('show');
    });

    document.getElementById('tutorialOk')?.addEventListener('click', () => {
        localStorage.setItem('tutorialDone', 'true');
        if (tutorialOverlay) tutorialOverlay.classList.remove('show');
    });

    // ===== КНОПКИ =====
    document.getElementById('playBtn')?.addEventListener('click', () => {
        document.getElementById('mainMenu').classList.add('hidden');
        document.getElementById('gameInterface').classList.remove('hidden');
    });
    document.getElementById('backToMenu')?.addEventListener('click', () => {
        document.getElementById('mainMenu').classList.remove('hidden');
        document.getElementById('gameInterface').classList.add('hidden');
    });
    document.getElementById('openShopBtn')?.addEventListener('click', () => document.getElementById('shopPanel').classList.add('show'));
    document.getElementById('closeShopBtn')?.addEventListener('click', () => document.getElementById('shopPanel').classList.remove('show'));
    document.getElementById('settingsBtn')?.addEventListener('click', () => document.getElementById('settingsModal').classList.add('show'));
    document.getElementById('closeSettings')?.addEventListener('click', () => document.getElementById('settingsModal').classList.remove('show'));
    document.getElementById('resetGameBtn')?.addEventListener('click', () => {
        if (confirm("Сбросить всё?")) { localStorage.clear(); location.reload(); }
    });
    document.getElementById('newsBtn')?.addEventListener('click', () => document.getElementById('newsModal').classList.add('show'));
    document.getElementById('closeNewsBtn')?.addEventListener('click', () => document.getElementById('newsModal').classList.remove('show'));

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

    // ===== ПОЛНОЭКРАННЫЙ РЕЖИМ =====
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            const el = document.documentElement;
            const isFull = document.fullscreenElement || document.webkitFullscreenElement;
            if (!isFull) {
                if (el.requestFullscreen) el.requestFullscreen();
                else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
                else if (el.msRequestFullscreen) el.msRequestFullscreen();
                fullscreenBtn.innerText = 'Выключить';
                showToast("⛶ Полный экран");
            } else {
                if (document.exitFullscreen) document.exitFullscreen();
                else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
                else if (document.msExitFullscreen) document.msExitFullscreen();
                fullscreenBtn.innerText = 'Включить';
                showToast("⛶ Обычный режим");
            }
        });
        document.addEventListener('fullscreenchange', () => {
            fullscreenBtn.innerText = document.fullscreenElement ? 'Выключить' : 'Включить';
        });
        document.addEventListener('webkitfullscreenchange', () => {
            fullscreenBtn.innerText = document.webkitFullscreenElement ? 'Выключить' : 'Включить';
        });
    }

    const promoCodes = {};
    for (let i = 1; i <= 100; i++) promoCodes[`code${i}`] = { points: 100 + i * 5, diamonds: 1 + Math.floor(i / 10) };
    promoCodes['dima'] = { points: 500, diamonds: 10 };
    promoCodes['dima god'] = { points: 5000, diamonds: 100 };
    promoCodes['start'] = { points: 100, diamonds: 5 };
    promoCodes['neural'] = { points: 1000, diamonds: 50 };
    promoCodes['evolution'] = { points: 2000, diamonds: 100 };
    promoCodes['prestige'] = { points: 10000, diamonds: 200 };
    promoCodes['legend'] = { points: 20000, diamonds: 500 };
    promoCodes['pass5'] = { points: 5000, diamonds: 50 };
    promoCodes['pass6'] = { points: 6000, diamonds: 60 };
    promoCodes['halloween'] = { points: 6666, diamonds: 66 };
    promoCodes['newyear'] = { points: 7777, diamonds: 77 };
    promoCodes['robot'] = { points: 9999, diamonds: 99 };

    document.getElementById('activatePromoBtn')?.addEventListener('click', () => {
        if (isBanned) return;
        const code = document.getElementById('promoInput').value.toLowerCase().trim();
        if (checkBan(code)) {
            document.getElementById('promoInput').value = '';
            document.getElementById('promoModal').classList.remove('show');
            activateBan();
            return;
        }
        if (promoCodes[code]) {
            const promo = promoCodes[code];
            points += promo.points;
            diamonds += promo.diamonds;
            totalDiamondsEarned += promo.diamonds;
            updateUI();
            saveGame();
            showToast("✅ Промокод активирован!");
            document.getElementById('promoInput').value = '';
            document.getElementById('promoModal').classList.remove('show');
        } else showToast("❌ Неверный код");
    });

    document.getElementById('soundToggleBtn')?.addEventListener('click', () => {
        if (isBanned) return;
        currentSoundProfile = (currentSoundProfile + 1) % soundProfiles.length;
        document.getElementById('soundToggleBtn').innerText = `Сменить (${soundProfiles[currentSoundProfile].name})`;
        saveGame();
        showToast(`🔊 Звук: ${soundProfiles[currentSoundProfile].name}`);
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
                showToast("Перезагрузка...");
                setTimeout(() => location.reload(), 2000);
            }
        }
    }, 1000);
    setInterval(saveGame, 5000);

    // ===== АДМИН-ПАНЕЛЬ v2 =====
    let adminCurrentTab = 'game';

    function renderAdminBody() {
        const body = document.getElementById('adminBody');
        if (!body) return;

        if (adminCurrentTab === 'game') {
            body.innerHTML = `
                <div class="admin-item"><span>+1000 очков</span><button id="admPoints">Дать</button></div>
                <div class="admin-item"><span>+100 алмазов</span><button id="admDiamonds">Дать</button></div>
                <div class="admin-item"><span>Купить все нейросети</span><button id="admBuyAll">Купить</button></div>
                <div class="admin-item"><span>Открыть все AI Pass</span><button id="admPass">Дать</button></div>
                <div class="admin-item"><span>Режим Бога (x10)</span><button id="admGod">Вкл/Выкл</button></div>
                <div class="admin-item"><span>Сбросить прогресс</span><button id="admReset">Сбросить</button></div>
            `;
            document.getElementById('admPoints').onclick = () => { points += 1000; updateUI(); saveGame(); showToast("+1000 очков"); };
            document.getElementById('admDiamonds').onclick = () => { diamonds += 100; totalDiamondsEarned += 100; updateUI(); saveGame(); showToast("+100 алмазов"); };
            document.getElementById('admBuyAll').onclick = () => {
                upgrades.forEach((u, i) => { if (!u.purchased) { u.purchased = true; purchasedCount++; } });
                updateUI(); renderShopNeurons(); saveGame(); showToast("Все нейросети куплены!");
            };
            document.getElementById('admPass').onclick = () => {
                passTasks.forEach((t, i) => { t.claimed = true; });
                passCurrentTask = passTasks.length;
                renderPassBadges(); renderTasksList(); saveGame(); showToast("Все AI Pass открыты!");
            };
            document.getElementById('admGod').onclick = () => {
                godMode = !godMode; updateUI(); saveGame();
                showToast(godMode ? "БОГ ВКЛ" : "БОГ ВЫКЛ");
            };
            document.getElementById('admReset').onclick = () => {
                if (confirm("Сбросить прогресс?")) { localStorage.clear(); location.reload(); }
            };
        }

        if (adminCurrentTab === 'visual') {
            body.innerHTML = `
                <div class="admin-item"><span>Фон: Ранняя осень</span><button data-bg="early_autumn">Вкл</button></div>
                <div class="admin-item"><span>Фон: Золотая</span><button data-bg="golden">Вкл</button></div>
                <div class="admin-item"><span>Фон: Дождливая</span><button data-bg="rainy">Вкл</button></div>
                <div class="admin-item"><span>Фон: Поздняя</span><button data-bg="late">Вкл</button></div>
                <div class="admin-item"><span>Фон: Лес</span><button data-bg="forest">Вкл</button></div>
                <div class="admin-item"><span>Фон: Парк</span><button data-bg="park">Вкл</button></div>
                <div class="admin-item"><span>Фон: Горы</span><button data-bg="mountains">Вкл</button></div>
                <div class="admin-item"><span>Фон: Деревня</span><button data-bg="village">Вкл</button></div>
                <div class="admin-item"><span>Мозг: 🧠 обычный</span><button id="brainNormal">Вкл</button></div>
                <div class="admin-item"><span>Мозг: 🎃 тыква</span><button id="brainPumpkin">Вкл</button></div>
                <div class="admin-item"><span>Мозг: 👽 пришелец</span><button id="brainAlien">Вкл</button></div>
                <div class="admin-item"><span>Мозг: 🔥 огонь</span><button id="brainFire">Вкл</button></div>
            `;
            body.querySelectorAll('[data-bg]').forEach(btn => {
                btn.onclick = () => { setBodyBg(btn.dataset.bg); showToast("Фон: " + btn.dataset.bg); };
            });
            document.getElementById('brainNormal').onclick = () => {
                const e = document.getElementById('brainEmoji'); if (e) e.innerText = '🧠';
            };
            document.getElementById('brainPumpkin').onclick = () => {
                const e = document.getElementById('brainEmoji'); if (e) e.innerText = '🎃';
            };
            document.getElementById('brainAlien').onclick = () => {
                const e = document.getElementById('brainEmoji'); if (e) e.innerText = '👽';
            };
            document.getElementById('brainFire').onclick = () => {
                const e = document.getElementById('brainEmoji'); if (e) e.innerText = '🔥';
            };
        }

        if (adminCurrentTab === 'settings') {
            body.innerHTML = `
                <div class="admin-item"><span>Открыть настройки игры</span><button id="admOpenSettings">Открыть</button></div>
                <div class="admin-item"><span>Вкл/Выкл звук</span><button id="admSound">Переключить</button></div>
                <div class="admin-item"><span>Сменить звук клика</span><button id="admSoundProfile">Сменить</button></div>
                <div class="admin-item"><span>Показать статистику</span><button id="admStats">Показать</button></div>
                <div class="admin-item"><span>Сбросить обучение</span><button id="admResetTutorial">Сбросить</button></div>
            `;
            document.getElementById('admOpenSettings').onclick = () => {
                document.getElementById('adminOverlay').classList.remove('show');
                document.getElementById('settingsModal').classList.add('show');
            };
            document.getElementById('admSound').onclick = () => {
                musicEnabled = !musicEnabled;
                localStorage.setItem('musicEnabled', musicEnabled);
                const btn = document.getElementById('musicToggle');
                if (btn) btn.innerText = musicEnabled ? '🔊' : '🔇';
                showToast(musicEnabled ? "Звук ВКЛ" : "Звук ВЫКЛ");
            };
            document.getElementById('admSoundProfile').onclick = () => {
                currentSoundProfile = (currentSoundProfile + 1) % soundProfiles.length;
                showToast("Звук: " + soundProfiles[currentSoundProfile].name);
                saveGame();
            };
            document.getElementById('admStats').onclick = () => {
                console.log("=== СТАТИСТИКА ИГРЫ ===");
                console.log("Очки:", Math.floor(points));
                console.log("Алмазы:", diamonds);
                console.log("Клики:", totalClicks);
                console.log("Нейросети:", purchasedCount);
                console.log("AI Pass 6:", passTasks.filter(t=>t.claimed).length, "/ 20");
                showToast("Смотри консоль (F12)");
            };
            document.getElementById('admResetTutorial').onclick = () => {
                localStorage.removeItem('tutorialDone');
                showToast("Обучение сброшено! Перезагрузи страницу.");
            };
        }
    }

    function openAdminPanel() {
        const overlay = document.getElementById('adminOverlay');
        if (!overlay) return;
        adminCurrentTab = 'game';
        document.querySelectorAll('.admin-tab').forEach(t => {
            t.classList.toggle('active', t.dataset.tab === 'game');
        });
        renderAdminBody();
        overlay.classList.add('show');
    }

    const versionEl = document.getElementById('menuVersion');
    if (versionEl) {
        versionEl.style.cursor = 'pointer';
        versionEl.addEventListener('click', openAdminPanel);
    }

    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            adminCurrentTab = tab.dataset.tab;
            renderAdminBody();
        });
    });

    document.getElementById('adminCloseBtn')?.addEventListener('click', () => {
        document.getElementById('adminOverlay').classList.remove('show');
    });
    document.getElementById('adminOverlay')?.addEventListener('click', (e) => {
        if (e.target.id === 'adminOverlay') {
            document.getElementById('adminOverlay').classList.remove('show');
        }
    });

    loadGame();
});
