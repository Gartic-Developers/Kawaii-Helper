// ==UserScript==
// @name         Kawaii Helper & Drawing Bot for Gartic.io
// @name:tr      Gartic.io için Kawaii Yardımcı & Çizim Botu
// @namespace    http://tampermonkey.net/
// @version      2025-03-23
// @description  Helper for Gartic.io with auto-guess, drawing assistance, and drawing bot
// @description:tr  Gartic.io için otomatik tahmin, çizim yardımı ve çizim botu ile yardımcı
// @author       anonimbiri & Gartic-Developers
// @license      MIT
// @match        https://gartic.io/*
// @icon         https://raw.githubusercontent.com/anonimbiri-IsBack/Kawaii-Helper/refs/heads/main/Assets/kawaii-logo.png
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    class KawaiiHelper {
        constructor() {
            this.translations = {
                en: {
                    "✧ Kawaii Helper ✧": "✧ Kawaii Helper ✧",
                    "Guessing": "Guessing",
                    "Drawing": "Drawing",
                    "Auto Guess": "Auto Guess",
                    "Speed": "Speed",
                    "Custom Words": "Custom Words",
                    "Drop word list here or click to upload": "Drop word list here or click to upload",
                    "Enter pattern (e.g., ___e___)": "Enter pattern (e.g., ___e___)",
                    "Type a pattern to see matches ✧": "Type a pattern to see matches ✧",
                    "Upload a custom word list ✧": "Upload a custom word list ✧",
                    "No words available ✧": "No words available ✧",
                    "No matches found ✧": "No matches found ✧",
                    "Tried Words": "Tried Words",
                    "Drop image here or click to upload": "Drop image here or click to upload",
                    "Draw Speed": "Draw Speed",
                    "Max Colors": "Max Colors",
                    "Draw Now ✧": "Draw Now ✧",
                    "Made with ♥ by Anonimbiri & Gartic-Developers": "Made with ♥ by Anonimbiri & Gartic-Developers",
                    "Loaded ${wordList['Custom'].length} words from ${file.name}": "Loaded ${wordList['Custom'].length} words from ${file.name}",
                    "Not your turn or game not loaded! ✧": "Not your turn or game not loaded! ✧",
                    "Game not ready or not your turn! ✧": "Game not ready or not your turn! ✧",
                    "Canvas not accessible! ✧": "Canvas not accessible! ✧",
                    "Canvas context not available! ✧": "Canvas context not available! ✧",
                    "Temp canvas context failed! ✧": "Temp canvas context failed! ✧",
                    "Image data error: ${e.message} ✧": "Image data error: ${e.message} ✧",
                    "Drawing completed! ✧": "Drawing completed! ✧",
                    "Failed to load image! ✧": "Failed to load image! ✧",
                    "Drawing stopped! ✧": "Drawing stopped! ✧",
                    "Settings": "Settings",
                    "Auto Kick": "Auto Kick",
                    "No Kick Cooldown": "No Kick Cooldown",
                    "Chat Bypass Censorship": "Chat Bypass Censorship",
                },
                tr: {
                    "✧ Kawaii Helper ✧": "✧ Kawaii Yardımcı ✧",
                    "Guessing": "Tahmin",
                    "Drawing": "Çizim",
                    "Auto Guess": "Otomatik Tahmin",
                    "Speed": "Hız",
                    "Custom Words": "Özel Kelimeler",
                    "Drop word list here or click to upload": "Kelime listesini buraya bırak veya yüklemek için tıkla",
                    "Enter pattern (e.g., ___e___)": "Desen gir (ör., ___e___)",
                    "Type a pattern to see matches ✧": "Eşleşmeleri görmek için bir desen yaz ✧",
                    "Upload a custom word list ✧": "Özel bir kelime listesi yükle ✧",
                    "No words available ✧": "Kelime yok ✧",
                    "No matches found ✧": "Eşleşme bulunamadı ✧",
                    "Tried Words": "Denenen Kelimeler",
                    "Drop image here or click to upload": "Resmi buraya bırak veya yüklemek için tıkla",
                    "Draw Speed": "Çizim Hızı",
                    "Max Colors": "Maksimum Renk",
                    "Draw Now ✧": "Şimdi Çiz ✧",
                    "Made with ♥ by Anonimbiri & Gartic-Developers": "Anonimbiri & Gartic-Developers tarafından ♥ ile yapıldı",
                    "Loaded ${wordList['Custom'].length} words from ${file.name}": "${file.name} dosyasından ${wordList['Custom'].length} kelime yüklendi",
                    "Not your turn or game not loaded! ✧": "Sıra sende değil veya oyun yüklenmedi! ✧",
                    "Game not ready or not your turn! ✧": "Oyun hazır değil veya sıra sende değil! ✧",
                    "Canvas not accessible! ✧": "Tuval erişilemez! ✧",
                    "Canvas context not available! ✧": "Tuval bağlamı kullanılamıyor! ✧",
                    "Temp canvas context failed! ✧": "Geçici tuval bağlamı başarısız! ✧",
                    "Image data error: ${e.message} ✧": "Görüntü verisi hatası: ${e.message} ✧",
                    "Drawing completed! ✧": "Çizim tamamlandı! ✧",
                    "Failed to load image! ✧": "Görüntü yüklenemedi! ✧",
                    "Drawing stopped! ✧": "Çizim durduruldu! ✧",
                    "Settings": "Ayarlar",
                    "Auto Kick": "Otomatik Atma",
                    "No Kick Cooldown": "Atma Bekleme Süresi Yok",
                    "Chat Bypass Censorship": "Sohbet Sansürünü Atlat",
                }
            };
            this.currentLang = navigator.language.split('-')[0] in this.translations ? navigator.language.split('-')[0] : 'en';
            this.isDrawingActive = false;
            this.wordList = { "Custom": [] };
            this.wordListURLs = {
                "General (en)": "https://cdn.jsdelivr.net/gh/Gartic-Developers/Gartic-WordList@master/languages/English/general.json",
                "General (tr)": "https://cdn.jsdelivr.net/gh/Gartic-Developers/Gartic-WordList@master/languages/Turkish/general.json",
                "General (jp)": "https://cdn.jsdelivr.net/gh/Gartic-Developers/Gartic-WordList@master/languages/Japanese/general.json"
            };
            this.elements = {};
            this.state = {
                isDragging: false,
                initialX: 0,
                initialY: 0,
                xOffset: 0,
                yOffset: 0,
                rafId: null,
                autoGuessInterval: null,
                triedLabelAdded: false
            };
            this.lastTheme = "Custom";
            this.settings = this.loadSettings(); // Load settings on initialization
        }

        static init() {
            const helper = new KawaiiHelper();
            helper.setup();
            return helper;
        }

        // Load settings from localStorage
        loadSettings() {
            const savedSettings = localStorage.getItem('kawaiiSettings');
            return savedSettings ? JSON.parse(savedSettings) : {
                autoGuess: false,
                guessSpeed: 1000,
                customWords: false,
                autoKick: false,
                noKickCooldown: false,
                chatBypassCensorship: false,
                drawSpeed: 200,
                maxColors: 100
            };
        }

        // Save settings to localStorage
        saveSettings() {
            const settings = {
                autoGuess: this.elements.autoGuessCheckbox.checked,
                guessSpeed: parseInt(this.elements.guessSpeed.value),
                customWords: this.elements.customWordsCheckbox.checked,
                autoKick: this.elements.autoKickCheckbox.checked,
                noKickCooldown: this.elements.noKickCooldownCheckbox.checked,
                chatBypassCensorship: this.elements.chatBypassCensorship.checked,
                drawSpeed: parseInt(this.elements.drawSpeed.value),
                maxColors: parseInt(this.elements.maxColors.value)
            };
            localStorage.setItem('kawaiiSettings', JSON.stringify(settings));
        }

        localize(key, params = {}) {
            let text = this.translations[this.currentLang][key] || key;
            for (const [param, value] of Object.entries(params)) {
                text = text.replace(`\${${param}}`, value);
            }
            return text;
        }

        showNotification(message, duration = 3000) {
            const notification = document.createElement('div');
            notification.className = 'kawaii-notification';
            notification.innerHTML = `
                <span class="kawaii-notification-icon">✧</span>
                <span class="kawaii-notification-text">${message}</span>
                <button class="kawaii-notification-close">✕</button>
            `;
            this.elements.notifications.appendChild(notification);
            setTimeout(() => notification.classList.add('show'), 10);

            const timeout = setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, duration);

            notification.querySelector('.kawaii-notification-close').addEventListener('click', () => {
                clearTimeout(timeout);
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            });
        }

        setup() {
            this.interceptScripts();
            this.injectFonts();
            this.waitForBody(() => {
                this.injectHTML();
                this.cacheElements();
                this.applySavedSettings(); // Apply saved settings after elements are cached
                this.addStyles();
                this.bindEvents();
                this.initializeGameCheck();
            });
        }

        interceptScripts() {
            const roomScript = 'https://raw.githubusercontent.com/Gartic-Developers/Kawaii-Helper/refs/heads/main/GameSource/room.js';

            function downloadFileSync(url) {
                const request = new XMLHttpRequest();
                request.open("GET", url, false);
                request.send();
                return request.status === 200 ? request.response : null;
            }

            /*Node.prototype.appendChild = new Proxy(Node.prototype.appendChild, {
                apply: (target, thisArg, argumentsList) => {
                    const node = argumentsList[0];
                    if (node.nodeName.toLowerCase() === 'script' && node.src && node.src.includes('room')) {
                        console.log('Target script detected:', node.src);
                        node.remove();
                        node.src = '';
                        node.textContent = '';

                        const newScript = downloadFileSync(roomScript);
                        Function(newScript)();

                        window.kawaiiHelper = this;
                        return node;
                    }
                    return target.apply(thisArg, argumentsList);
                }
            });*/

            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    if (mutation.addedNodes) {
                        Array.from(mutation.addedNodes).forEach((node) => {
                            if (node.nodeName.toLowerCase() === 'script' && node.src && node.src.includes('room')) {
                                console.log('Target script detected:', node.src);
                                node.remove();
                                node.src = '';
                                node.textContent = '';

                                const newScript = downloadFileSync(roomScript);

                                window.kawaiiHelper = this;
                                Function(newScript)();
                            }
                        });
                    }
                });
            });

            observer.observe(document, { childList: true, subtree: true });
        }

        injectFonts() {
            const fontLink = document.createElement('link');
            fontLink.rel = 'stylesheet';
            fontLink.href = 'https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700&display=swap';
            document.head.appendChild(fontLink);
        }

        waitForBody(callback) {
            const interval = setInterval(() => {
                if (document.body) {
                    clearInterval(interval);
                    callback();
                }
            }, 100);
        }

        injectHTML() {
            const kawaiiHTML = `
        <div class="kawaii-cheat" id="kawaiiCheat">
            <div class="kawaii-header" id="kawaiiHeader">
                <img src="https://raw.githubusercontent.com/anonimbiri-IsBack/Kawaii-Helper/refs/heads/main/Assets/kawaii-logo.png" alt="Anime Girl" class="header-icon">
                <h2 data-translate="✧ Kawaii Helper ✧">✧ Kawaii Helper ✧</h2>
                <button class="minimize-btn" id="minimizeBtn">▼</button>
            </div>
            <div class="kawaii-body" id="kawaiiBody">
                <div class="kawaii-tabs">
                    <button class="kawaii-tab active" data-tab="guessing" data-translate="Guessing">Guessing</button>
                    <button class="kawaii-tab" data-tab="drawing" data-translate="Drawing">Drawing</button>
                    <button class="kawaii-tab" data-tab="settings" data-translate="Settings">Settings</button>
                </div>
                <div class="kawaii-content" id="guessing-tab">
                    <div class="checkbox-container">
                        <input type="checkbox" id="autoGuess">
                        <label for="autoGuess" data-translate="Auto Guess">Auto Guess</label>
                    </div>
                    <div class="slider-container" id="speedContainer" style="display: none;">
                        <div class="slider-label" data-translate="Speed">Speed</div>
                        <div class="custom-slider">
                            <input type="range" id="guessSpeed" min="100" max="5000" value="1000" step="100">
                            <div class="slider-track"></div>
                            <span id="speedValue">1s</span>
                        </div>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox" id="customWords">
                        <label for="customWords" data-translate="Custom Words">Custom Words</label>
                    </div>
                    <div class="dropzone-container" id="wordListContainer" style="display: none;">
                        <div class="dropzone" id="wordListDropzone">
                            <input type="file" id="wordList" accept=".txt">
                            <div class="dropzone-content">
                                <div class="dropzone-icon">❀</div>
                                <p data-translate="Drop word list here or click to upload">Drop word list here or click to upload</p>
                            </div>
                        </div>
                    </div>
                    <div class="input-container">
                        <input type="text" id="guessPattern" data-translate-placeholder="Enter pattern (e.g., ___e___)" placeholder="Enter pattern (e.g., ___e___)">
                    </div>
                    <div class="hit-list" id="hitList">
                        <div class="message" data-translate="Type a pattern to see matches ✧">Type a pattern to see matches ✧</div>
                    </div>
                </div>
                <div class="kawaii-content" id="drawing-tab" style="display: none;">
                    <div class="dropzone-container">
                        <div class="dropzone" id="imageDropzone">
                            <input type="file" id="imageUpload" accept="image/*">
                            <div class="dropzone-content">
                                <div class="dropzone-icon">✎</div>
                                <p data-translate="Drop image here or click to upload">Drop image here or click to upload</p>
                            </div>
                        </div>
                        <div class="image-preview" id="imagePreview" style="display: none;">
                            <img id="previewImg">
                            <div class="preview-controls">
                                <button class="cancel-btn" id="cancelImage">✕</button>
                            </div>
                        </div>
                    </div>
                    <div class="slider-container">
                        <div class="slider-label" data-translate="Draw Speed">Draw Speed</div>
                        <div class="custom-slider">
                            <input type="range" id="drawSpeed" min="20" max="5000" value="200" step="100">
                            <div class="slider-track"></div>
                            <span id="drawSpeedValue">200ms</span>
                        </div>
                    </div>
                    <div class="slider-container">
                        <div class="slider-label" data-translate="Max Colors">Max Colors</div>
                        <div class="custom-slider">
                            <input type="range" id="maxColors" min="3" max="1000" value="100" step="1">
                            <div class="slider-track"></div>
                            <span id="maxColorsValue">100</span>
                        </div>
                    </div>
                    <button class="draw-btn" id="sendDraw" disabled data-translate="Draw Now ✧">Draw Now ✧</button>
                </div>
                <div class="kawaii-content" id="settings-tab" style="display: none;">
                    <div class="checkbox-container">
                        <input type="checkbox" id="autoKick">
                        <label for="autoKick" data-translate="Auto Kick">Auto Kick</label>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox" id="noKickCooldown">
                        <label for="noKickCooldown" data-translate="No Kick Cooldown">No Kick Cooldown</label>
                    </div>
                    <div class="checkbox-container">
                        <input type="checkbox" id="chatBypassCensorship">
                        <label for="chatBypassCensorship" data-translate="Chat Bypass Censorship">Chat Bypass Censorship</label>
                    </div>
                </div>
                <div class="kawaii-footer">
                    <span class="credit-text" data-translate="Made with ♥ by Anonimbiri & Gartic-Developers">Made with ♥ by Anonimbiri & Gartic-Developers</span>
                </div>
            </div>
        </div>
        <div class="kawaii-notifications" id="kawaiiNotifications"></div>
    `;
            document.body.insertAdjacentHTML('beforeend', kawaiiHTML);
        }

        cacheElements() {
            this.elements = {
                kawaiiCheat: document.getElementById('kawaiiCheat'),
                kawaiiHeader: document.getElementById('kawaiiHeader'),
                minimizeBtn: document.getElementById('minimizeBtn'),
                tabButtons: document.querySelectorAll('.kawaii-tab'),
                tabContents: document.querySelectorAll('.kawaii-content'),
                autoGuessCheckbox: document.getElementById('autoGuess'),
                speedContainer: document.getElementById('speedContainer'),
                guessSpeed: document.getElementById('guessSpeed'),
                speedValue: document.getElementById('speedValue'),
                customWordsCheckbox: document.getElementById('customWords'),
                wordListContainer: document.getElementById('wordListContainer'),
                wordListDropzone: document.getElementById('wordListDropzone'),
                wordListInput: document.getElementById('wordList'),
                guessPattern: document.getElementById('guessPattern'),
                hitList: document.getElementById('hitList'),
                imageDropzone: document.getElementById('imageDropzone'),
                imageUpload: document.getElementById('imageUpload'),
                imagePreview: document.getElementById('imagePreview'),
                previewImg: document.getElementById('previewImg'),
                cancelImage: document.getElementById('cancelImage'),
                drawSpeed: document.getElementById('drawSpeed'),
                drawSpeedValue: document.getElementById('drawSpeedValue'),
                maxColors: document.getElementById('maxColors'),
                maxColorsValue: document.getElementById('maxColorsValue'),
                sendDraw: document.getElementById('sendDraw'),
                autoKickCheckbox: document.getElementById('autoKick'),
                noKickCooldownCheckbox: document.getElementById('noKickCooldown'),
                chatBypassCensorship: document.getElementById('chatBypassCensorship'),
                notifications: document.getElementById('kawaiiNotifications')
            };
        }

        applySavedSettings() {
            this.elements.autoGuessCheckbox.checked = this.settings.autoGuess;
            this.elements.guessSpeed.value = this.settings.guessSpeed;
            this.elements.customWordsCheckbox.checked = this.settings.customWords;
            this.elements.autoKickCheckbox.checked = this.settings.autoKick;
            this.elements.noKickCooldownCheckbox.checked = this.settings.noKickCooldown;
            this.elements.chatBypassCensorship.checked = this.settings.chatBypassCensorship;
            this.elements.drawSpeed.value = this.settings.drawSpeed;
            this.elements.maxColors.value = this.settings.maxColors;

            this.elements.speedContainer.style.display = this.settings.autoGuess ? 'flex' : 'none';
            this.elements.wordListContainer.style.display = this.settings.customWords ? 'block' : 'none';
            this.updateGuessSpeed({ target: this.elements.guessSpeed });
            this.updateDrawSpeed({ target: this.elements.drawSpeed });
            this.updateMaxColors({ target: this.elements.maxColors });
        }

        addStyles() {
            const style = document.createElement('style');
            style.textContent = `
                :root {
                    --primary-color: #FF69B4;
                    --primary-dark: #FF1493;
                    --primary-light: #FFC0CB;
                    --bg-color: #FFB6C1;
                    --text-color: #5d004f;
                    --panel-bg: rgba(255, 182, 193, 0.95);
                    --panel-border: #FF69B4;
                    --element-bg: rgba(255, 240, 245, 0.7);
                    --element-hover: rgba(255, 240, 245, 0.9);
                    --element-active: #FF69B4;
                    --element-active-text: #FFF0F5;
                }

                .kawaii-cheat {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    width: 280px;
                    background: var(--panel-bg);
                    border-radius: 15px;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    color: var(--text-color);
                    user-select: none;
                    z-index: 1000;
                    font-family: 'M PLUS Rounded 1c', sans-serif;
                    border: 2px solid var(--panel-border);
                    transition: all 0.4s ease-in-out;
                    max-height: calc(100vh - 40px);
                    overflow: hidden;
                }

                .kawaii-cheat.minimized {
                    height: 50px;
                    opacity: 0.9;
                    transform: scale(0.95);
                    overflow: hidden;
                }

                .kawaii-cheat:not(.minimized) {
                    opacity: 1;
                    transform: scale(1);
                }

                .kawaii-cheat.minimized .kawaii-body {
                    opacity: 0;
                    max-height: 0;
                    overflow: hidden;
                    transition: opacity 0.2s ease-in-out, max-height 0.4s ease-in-out;
                }

                .kawaii-cheat:not(.minimized) .kawaii-body {
                    opacity: 1;
                    max-height: 500px;
                    transition: opacity 0.2s ease-in-out 0.2s, max-height 0.4s ease-in-out;
                }

                .kawaii-cheat.dragging {
                    opacity: 0.8;
                    transition: none;
                }

                .kawaii-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 5px 10px;
                    cursor: move;
                    background: var(--element-bg);
                    border-radius: 10px;
                    border: 2px solid var(--primary-color);
                }

                .header-icon {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    margin-right: 10px;
                    border: 1px dashed var(--primary-color);
                }

                .kawaii-header h2 {
                    margin: 0;
                    font-size: 18px;
                    font-weight: 700;
                    color: var(--primary-dark);
                    text-shadow: 1px 1px 2px var(--primary-light);
                }

                .minimize-btn {
                    background: transparent;
                    border: 1px dashed var(--primary-dark);
                    border-radius: 6px;
                    width: 24px;
                    height: 24px;
                    color: var(--primary-dark);
                    font-size: 16px;
                    line-height: 20px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .minimize-btn:hover {
                    background: var(--primary-color);
                    color: var(--element-active-text);
                    border-color: var(--primary-color);
                    transform: rotate(180deg);
                }

                .kawaii-tabs {
                    display: flex;
                    gap: 8px;
                    padding: 5px 0;
                }

                .kawaii-tab {
                    flex: 1;
                    background: var(--element-bg);
                    border: 1px dashed var(--primary-color);
                    padding: 6px;
                    border-radius: 10px;
                    font-size: 12px;
                    font-weight: 700;
                    color: var(--text-color);
                    cursor: pointer;
                    transition: background 0.3s ease, transform 0.3s ease;
                    text-align: center;
                }

                .kawaii-tab.active {
                    background: var(--primary-color);
                    color: var(--element-active-text);
                    border-color: var(--primary-dark);
                }

                .kawaii-tab:hover:not(.active) {
                    background: var(--element-hover);
                    transform: scale(1.05);
                }

                .kawaii-content {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    min-height: 0;
                    flex-grow: 1;
                    overflow: hidden;
                    padding: 5px;
                }

                .checkbox-container {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: var(--element-bg);
                    padding: 8px;
                    border-radius: 10px;
                    border: 1px dashed var(--primary-color);
                    cursor: pointer;
                    transition: background 0.3s ease;
                }

                .checkbox-container:hover {
                    background: var(--element-hover);
                }

                .checkbox-container input[type="checkbox"] {
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    background: var(--element-active-text);
                    border: 1px dashed var(--primary-color);
                    border-radius: 50%;
                    cursor: pointer;
                    position: relative;
                }

                .checkbox-container input[type="checkbox"]:checked {
                    background: var(--primary-color);
                    border-color: var(--primary-dark);
                }

                .checkbox-container input[type="checkbox"]:checked::after {
                    content: "♥";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    color: var(--element-active-text);
                    font-size: 12px;
                }

                .checkbox-container label {
                    font-size: 12px;
                    font-weight: 700;
                    color: var(--text-color);
                    cursor: pointer;
                }

                .input-container {
                    background: var(--element-bg);
                    padding: 8px;
                    border-radius: 10px;
                    border: 1px dashed var(--primary-color);
                }

                .input-container input[type="text"] {
                    width: 100%;
                    background: var(--element-active-text);
                    border: 1px dashed var(--primary-light);
                    border-radius: 8px;
                    padding: 6px 10px;
                    color: var(--text-color);
                    font-size: 12px;
                    font-weight: 500;
                    box-sizing: border-box;
                    transition: border-color 0.3s ease;
                    outline: none;
                }

                .input-container input[type="text"]:focus {
                    border-color: var(--primary-dark);
                }

                .dropzone-container {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .dropzone {
                    position: relative;
                    background: var(--element-bg);
                    border: 1px dashed var(--primary-color);
                    border-radius: 10px;
                    padding: 15px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background 0.3s ease, border-color 0.3s ease;
                    min-height: 80px;
                }

                .dropzone:hover, .dropzone.drag-over {
                    background: var(--element-hover);
                    border-color: var(--primary-dark);
                }

                .dropzone input[type="file"] {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                    cursor: pointer;
                }

                .dropzone-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    text-align: center;
                    pointer-events: none;
                }

                .dropzone-icon {
                    font-size: 24px;
                    color: var(--primary-color);
                    animation: pulse 1.5s infinite ease-in-out;
                }

                @keyframes pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                }

                .dropzone-content p {
                    margin: 0;
                    color: var(--text-color);
                    font-size: 12px;
                    font-weight: 500;
                }

                .slider-container {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    background: var(--element-bg);
                    padding: 8px;
                    border-radius: 10px;
                    border: 1px dashed var(--primary-color);
                }

                .slider-label {
                    font-size: 12px;
                    color: var(--text-color);
                    font-weight: 700;
                    text-align: center;
                }

                .custom-slider {
                    position: relative;
                    height: 25px;
                    padding: 0 8px;
                }

                .custom-slider input[type="range"] {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 6px;
                    background: transparent;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                    z-index: 2;
                }

                .custom-slider .slider-track {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    width: 100%;
                    height: 6px;
                    background: linear-gradient(to right, var(--primary-dark) 0%, var(--primary-dark) var(--slider-progress), var(--primary-light) var(--slider-progress), var(--primary-light) 100%);
                    border-radius: 3px;
                    transform: translateY(-50%);
                    z-index: 1;
                }

                .custom-slider input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 16px;
                    height: 16px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    border: 1px dashed var(--element-active-text);
                    cursor: pointer;
                    transition: transform 0.3s ease;
                }

                .custom-slider input[type="range"]::-webkit-slider-thumb:hover {
                    transform: scale(1.2);
                }

                .custom-slider span {
                    position: absolute;
                    bottom: -15px;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 10px;
                    color: var(--text-color);
                    background: var(--element-active-text);
                    padding: 2px 6px;
                    border-radius: 8px;
                    border: 1px dashed var(--primary-color);
                    white-space: nowrap;
                }

                .hit-list {
                    max-height: 180px;
                    overflow-y: scroll;
                    background: var(--element-bg);
                    border: 1px dashed var(--primary-color);
                    border-radius: 10px;
                    padding: 8px;
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                    scrollbar-width: thin;
                    scrollbar-color: var(--primary-color) var(--element-bg);
                }

                .hit-list::-webkit-scrollbar {
                    width: 6px;
                }

                .hit-list::-webkit-scrollbar-thumb {
                    background-color: var(--primary-color);
                    border-radius: 10px;
                }

                .hit-list::-webkit-scrollbar-track {
                    background: var(--element-bg);
                }

                .hit-list button {
                    background: rgba(255, 240, 245, 0.8);
                    border: 1px dashed var(--primary-color);
                    padding: 6px 10px;
                    border-radius: 8px;
                    color: var(--text-color);
                    font-size: 12px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: background 0.3s ease, transform 0.3s ease;
                    text-align: left;
                }

                .hit-list button:hover:not(.tried) {
                    background: var(--primary-color);
                    color: var(--element-active-text);
                    transform: scale(1.03);
                }

                .hit-list button.tried {
                    background: rgba(255, 182, 193, 0.6);
                    border-color: var(--primary-light);
                    color: var(--primary-dark);
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .hit-list .tried-label {
                    font-size: 10px;
                    color: var(--primary-dark);
                    text-align: center;
                    padding: 4px;
                    background: var(--element-active-text);
                    border-radius: 8px;
                    border: 1px dashed var(--primary-color);
                }

                .hit-list .message {
                    font-size: 12px;
                    color: var(--text-color);
                    text-align: center;
                    padding: 8px;
                }

                .image-preview {
                    position: relative;
                    margin-top: 10px;
                    background: var(--element-bg);
                    padding: 8px;
                    border-radius: 10px;
                    border: 1px dashed var(--primary-color);
                }

                .image-preview img {
                    max-width: 100%;
                    max-height: 120px;
                    border-radius: 8px;
                    display: block;
                    margin: 0 auto;
                }

                .preview-controls {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    display: flex;
                    gap: 6px;
                }

                .cancel-btn {
                    background: transparent;
                    border: 1px dashed var(--primary-dark);
                    border-radius: 6px;
                    width: 24px;
                    height: 24px;
                    color: var(--primary-dark);
                    font-size: 16px;
                    line-height: 20px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .cancel-btn:hover {
                    background: var(--primary-dark);
                    color: var(--element-active-text);
                    transform: scale(1.1);
                }

                .draw-btn {
                    background: var(--primary-color);
                    border: 1px dashed var(--primary-dark);
                    padding: 8px;
                    border-radius: 10px;
                    color: var(--element-active-text);
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: background 0.3s ease, transform 0.3s ease;
                    text-align: center;
                    width: 100%;
                    box-sizing: border-box;
                }

                .draw-btn:hover:not(:disabled) {
                    background: var(--primary-dark);
                    transform: scale(1.05);
                }

                .draw-btn:disabled {
                    background: rgba(255, 105, 180, 0.5);
                    cursor: not-allowed;
                }

                .kawaii-footer {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    margin-top: 10px;
                    padding: 6px;
                    background: var(--element-bg);
                    border-radius: 10px;
                    border: 2px solid var(--primary-color);
                }

                .credit-text {
                    font-size: 10px;
                    color: var(--text-color);
                    font-weight: 700;
                }

                .kawaii-notifications {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    z-index: 2000;
                    pointer-events: none;
                }

                .kawaii-notification {
                    background: var(--panel-bg);
                    border: 2px solid var(--panel-border);
                    border-radius: 12px;
                    padding: 12px 18px;
                    color: var(--text-color);
                    font-family: 'M PLUS Rounded 1c', sans-serif;
                    font-size: 14px;
                    font-weight: 700;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    max-width: 300px;
                    opacity: 0;
                    transform: translateX(100%);
                    transition: opacity 0.3s ease, transform 0.3s ease;
                    pointer-events: auto;
                }

                .kawaii-notification.show {
                    opacity: 1;
                    transform: translateX(0);
                }

                .kawaii-notification-icon {
                    font-size: 20px;
                    color: var(--primary-dark);
                    animation: bounce 1s infinite ease-in-out;
                }

                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }

                .kawaii-notification-close {
                    background: transparent;
                    border: 1px dashed var(--primary-dark);
                    border-radius: 6px;
                    width: 20px;
                    height: 20px;
                    color: var(--primary-dark);
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .kawaii-notification-close:hover {
                    background: var(--primary-dark);
                    color: var(--element-active-text);
                    transform: scale(1.1);
                }
            `;
            document.head.appendChild(style);
            this.updateLanguage();
            [this.elements.guessSpeed, this.elements.drawSpeed, this.elements.maxColors].forEach(this.updateSliderTrack.bind(this));
        }

        updateLanguage() {
            document.querySelectorAll('[data-translate]').forEach(element => {
                element.textContent = this.localize(element.getAttribute('data-translate'));
            });
            document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
                element.setAttribute('placeholder', this.localize(element.getAttribute('data-translate-placeholder')));
            });
        }

        updateSliderTrack(slider) {
            const min = parseInt(slider.min);
            const max = parseInt(slider.max);
            const value = parseInt(slider.value);
            const progress = ((value - min) / (max - min)) * 100;
            slider.parentElement.querySelector('.slider-track').style.setProperty('--slider-progress', `${progress}%`);
        }

        preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        bindEvents() {
            this.elements.kawaiiHeader.addEventListener('mousedown', this.startDragging.bind(this));
            document.addEventListener('mousemove', this.drag.bind(this));
            document.addEventListener('mouseup', this.stopDragging.bind(this));
            this.elements.minimizeBtn.addEventListener('click', this.toggleMinimize.bind(this));
            this.elements.tabButtons.forEach(btn => btn.addEventListener('click', this.switchTab.bind(this, btn)));

            document.querySelectorAll('.checkbox-container').forEach(container => {
                const checkbox = container.querySelector('input[type="checkbox"]');
                const label = container.querySelector('label');
                container.addEventListener('click', e => {
                    if (e.target !== checkbox && e.target !== label) {
                        checkbox.checked = !checkbox.checked;
                        checkbox.dispatchEvent(new Event('change'));
                    }
                });
                label.addEventListener('click', e => e.stopPropagation());
            });

            this.elements.autoGuessCheckbox.addEventListener('change', (e) => {
                this.toggleAutoGuess(e);
                this.saveSettings();
            });
            this.elements.guessSpeed.addEventListener('input', (e) => {
                this.updateGuessSpeed(e);
                this.saveSettings();
            });
            this.elements.customWordsCheckbox.addEventListener('change', (e) => {
                this.toggleCustomWords(e);
                this.saveSettings();
            });
            this.elements.guessPattern.addEventListener('input', e => this.updateHitList(e.target.value.trim()));
            this.elements.hitList.addEventListener('click', this.handleHitListClick.bind(this));

            ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
                this.elements.wordListDropzone.addEventListener(eventName, this.preventDefaults, false);
                this.elements.imageDropzone.addEventListener(eventName, this.preventDefaults, false);
            });
            this.elements.wordListDropzone.addEventListener('dragenter', () => this.elements.wordListDropzone.classList.add('drag-over'));
            this.elements.wordListDropzone.addEventListener('dragover', () => this.elements.wordListDropzone.classList.add('drag-over'));
            this.elements.wordListDropzone.addEventListener('dragleave', () => this.elements.wordListDropzone.classList.remove('drag-over'));
            this.elements.wordListDropzone.addEventListener('drop', this.handleWordListDrop.bind(this));
            this.elements.wordListInput.addEventListener('change', this.handleWordListInput.bind(this));

            this.elements.imageDropzone.addEventListener('dragenter', () => this.elements.imageDropzone.classList.add('drag-over'));
            this.elements.imageDropzone.addEventListener('dragover', () => this.elements.imageDropzone.classList.add('drag-over'));
            this.elements.imageDropzone.addEventListener('dragleave', () => this.elements.imageDropzone.classList.remove('drag-over'));
            this.elements.imageDropzone.addEventListener('drop', this.handleImageDrop.bind(this));
            this.elements.imageUpload.addEventListener('change', this.handleImageInput.bind(this));
            this.elements.cancelImage.addEventListener('click', this.cancelImagePreview.bind(this));
            this.elements.drawSpeed.addEventListener('input', (e) => {
                this.updateDrawSpeed(e);
                this.saveSettings();
            });
            this.elements.maxColors.addEventListener('input', (e) => {
                this.updateMaxColors(e);
                this.saveSettings();
            });
            this.elements.sendDraw.addEventListener('click', this.startDrawing.bind(this));

            this.elements.autoKickCheckbox.addEventListener('change', () => {
                this.showNotification(`Auto Kick: ${this.elements.autoKickCheckbox.checked ? 'Enabled' : 'Disabled'}`, 2000);
                this.saveSettings();
            });
            this.elements.noKickCooldownCheckbox.addEventListener('change', () => {
                this.showNotification(`No Kick Cooldown: ${this.elements.noKickCooldownCheckbox.checked ? 'Enabled' : 'Disabled'}`, 2000);
                this.saveSettings();
            });
            this.elements.chatBypassCensorship.addEventListener('change', () => {
                this.showNotification(`Chat Bypass Censorship: ${this.elements.chatBypassCensorship.checked ? 'Enabled' : 'Disabled'}`, 2000);
                this.saveSettings();
            });
        }

        startDragging(e) {
            if (e.target !== this.elements.minimizeBtn) {
                this.state.initialX = e.clientX - this.state.xOffset;
                this.state.initialY = e.clientY - this.state.yOffset;
                this.state.isDragging = true;
                this.elements.kawaiiCheat.classList.add('dragging');
                if (this.state.rafId) cancelAnimationFrame(this.state.rafId);
            }
        }

        drag(e) {
            if (!this.state.isDragging) return;
            e.preventDefault();
            const newX = e.clientX - this.state.initialX;
            const newY = e.clientY - this.state.initialY;
            if (this.state.rafId) cancelAnimationFrame(this.state.rafId);
            this.state.rafId = requestAnimationFrame(() => {
                this.elements.kawaiiCheat.style.transform = `translate(${newX}px, ${newY}px)`;
                this.state.xOffset = newX;
                this.state.yOffset = newY;
            });
        }

        stopDragging() {
            if (this.state.isDragging) {
                this.state.isDragging = false;
                this.elements.kawaiiCheat.classList.remove('dragging');
                if (this.state.rafId) cancelAnimationFrame(this.state.rafId);
            }
        }

        toggleMinimize() {
            this.elements.kawaiiCheat.classList.toggle('minimized');
            this.elements.minimizeBtn.textContent = this.elements.kawaiiCheat.classList.contains('minimized') ? '▲' : '▼';
        }

        switchTab(btn) {
            this.elements.tabButtons.forEach(b => b.classList.remove('active'));
            this.elements.tabContents.forEach(c => c.style.display = 'none');
            btn.classList.add('active');
            document.getElementById(`${btn.dataset.tab}-tab`).style.display = 'flex';
        }

        toggleAutoGuess(e) {
            this.elements.speedContainer.style.display = e.target.checked ? 'flex' : 'none';
            if (!e.target.checked) this.stopAutoGuess();
            else if (this.elements.guessPattern.value) this.startAutoGuess();
        }

        updateGuessSpeed(e) {
            this.updateSliderTrack(e.target);
            this.elements.speedValue.textContent = e.target.value >= 1000 ? `${e.target.value / 1000}s` : `${e.target.value}ms`;
            if (this.elements.autoGuessCheckbox.checked && this.state.autoGuessInterval) {
                this.stopAutoGuess();
                this.startAutoGuess();
            }
        }

        toggleCustomWords(e) {
            this.elements.wordListContainer.style.display = e.target.checked ? 'block' : 'none';
            this.updateHitList(this.elements.guessPattern.value.trim());
        }

        handleWordListDrop(e) {
            this.elements.wordListDropzone.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file && file.type === 'text/plain') this.handleWordListFile(file);
        }

        handleWordListInput(e) {
            const file = e.target.files[0];
            if (file) {
                this.handleWordListFile(file);
                e.target.value = '';
            }
        }

        handleWordListFile(file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                this.wordList["Custom"] = event.target.result.split('\n').map(word => word.trim()).filter(word => word.length > 0);
                this.showNotification(this.localize("Loaded ${wordList['Custom'].length} words from ${file.name}", {
                    "wordList['Custom'].length": this.wordList["Custom"].length,
                    "file.name": file.name
                }), 4000);
                this.updateHitList(this.elements.guessPattern.value.trim());
            };
            reader.readAsText(file);
        }

        handleHitListClick(e) {
            if (e.target.tagName !== 'BUTTON' || e.target.classList.contains('tried')) return;
            const button = e.target;
            button.classList.add('tried');
            if (!this.state.triedLabelAdded && this.elements.hitList.querySelectorAll('button.tried').length === 1) {
                const triedLabel = document.createElement('div');
                triedLabel.classList.add('tried-label');
                triedLabel.textContent = this.localize("Tried Words");
                this.elements.hitList.appendChild(triedLabel);
                this.state.triedLabelAdded = true;
            }
            if (window.game && window.game._socket) {
                window.game._socket.emit(13, window.game._codigo, button.textContent);
            }
            this.elements.hitList.appendChild(button);
        }

        startAutoGuess() {
            if (!this.elements.autoGuessCheckbox.checked) return;
            this.stopAutoGuess();
            const speed = parseInt(this.elements.guessSpeed.value);
            this.state.autoGuessInterval = setInterval(() => {
                const buttons = this.elements.hitList.querySelectorAll('button:not(.tried)');
                if (buttons.length > 0 && window.game && window.game._socket) {
                    const word = buttons[0].textContent;
                    buttons[0].classList.add('tried');
                    window.game._socket.emit(13, window.game._codigo, word);
                    if (!this.state.triedLabelAdded && this.elements.hitList.querySelectorAll('button.tried').length === 1) {
                        const triedLabel = document.createElement('div');
                        triedLabel.classList.add('tried-label');
                        triedLabel.textContent = this.localize("Tried Words");
                        this.elements.hitList.appendChild(triedLabel);
                        this.state.triedLabelAdded = true;
                    }
                    this.elements.hitList.appendChild(buttons[0]);
                }
            }, speed);
        }

        stopAutoGuess() {
            if (this.state.autoGuessInterval) {
                clearInterval(this.state.autoGuessInterval);
                this.state.autoGuessInterval = null;
            }
        }

        updateHitList(pattern) {
            if (!this.elements.hitList) return;
            this.elements.hitList.innerHTML = '';
            this.state.triedLabelAdded = false;

            const activeTheme = this.elements.customWordsCheckbox.checked || !window.game || !window.game._dadosSala || !window.game._dadosSala.tema
            ? "Custom"
            : window.game._dadosSala.tema;
            const activeList = this.wordList[activeTheme] || [];

            if (!pattern) {
                if (activeList.length === 0) {
                    this.elements.hitList.innerHTML = `<div class="message">${this.localize(this.elements.customWordsCheckbox.checked ? "Upload a custom word list ✧" : "No words available ✧")}</div>`;
                } else {
                    activeList.forEach(word => {
                        const button = document.createElement('button');
                        button.textContent = word;
                        this.elements.hitList.appendChild(button);
                    });
                }
                return;
            }

            const regex = new RegExp(`^${pattern.split('').map(char => char === '_' ? '.' : char).join('')}$`, 'i');
            const matches = activeList.filter(word => regex.test(word));

            if (matches.length === 0) {
                this.elements.hitList.innerHTML = `<div class="message">${this.localize("No matches found ✧")}</div>`;
            } else {
                matches.forEach(word => {
                    const button = document.createElement('button');
                    button.textContent = word;
                    this.elements.hitList.appendChild(button);
                });
            }
        }

        async fetchWordList(theme) {
            if (!this.wordList[theme] && this.wordListURLs[theme]) {
                try {
                    const response = await fetch(this.wordListURLs[theme]);
                    if (!response.ok) throw new Error(`Failed to fetch ${theme} word list`);
                    const data = await response.json();
                    this.wordList[theme] = data.words || data;
                    console.log(`Loaded ${this.wordList[theme].length} words for ${theme}`);
                } catch (error) {
                    console.error(`Error fetching word list for ${theme}:`, error);
                    this.wordList[theme] = [];
                }
            }
        }

        handleImageDrop(e) {
            this.elements.imageDropzone.classList.remove('drag-over');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) this.handleImageFile(file);
        }

        handleImageInput(e) {
            const file = e.target.files[0];
            if (file) {
                this.handleImageFile(file);
                e.target.value = '';
            }
        }

        handleImageFile(file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                this.elements.previewImg.src = event.target.result;
                this.elements.imageDropzone.style.display = 'none';
                this.elements.imagePreview.style.display = 'block';
                this.elements.sendDraw.disabled = false;
            };
            reader.readAsDataURL(file);
        }

        cancelImagePreview() {
            this.elements.previewImg.src = '';
            this.elements.imageDropzone.style.display = 'flex';
            this.elements.imagePreview.style.display = 'none';
            this.elements.sendDraw.disabled = true;
            this.elements.imageUpload.value = '';
        }

        updateDrawSpeed(e) {
            this.updateSliderTrack(e.target);
            this.elements.drawSpeedValue.textContent = e.target.value >= 1000 ? `${e.target.value / 1000}s` : `${e.target.value}ms`;
        }

        updateMaxColors(e) {
            this.updateSliderTrack(e.target);
            this.elements.maxColorsValue.textContent = e.target.value;
        }

        startDrawing() {
            if (this.elements.previewImg.src) {
                if (!window.game || !window.game.turn) {
                    this.showNotification(this.localize("Not your turn or game not loaded! ✧"), 3000);
                    return;
                }
                this.elements.sendDraw.disabled = true;
                this.isDrawingActive = true;
                this.processAndDrawImage(this.elements.previewImg.src);
            }
        }

        initializeGameCheck() {
            const checkGame = setInterval(() => {
                if (window.game && window.game._socket) {
                    clearInterval(checkGame);
                    const currentTheme = window.game._dadosSala.tema || "Custom";
                    if (currentTheme !== "Custom") {
                        this.fetchWordList(currentTheme).then(() => this.updateHitList(this.elements.guessPattern.value.trim()));
                    }
                }
            }, 100);
        }

        processAndDrawImage(imageSrc) {
            if (!window.game || !window.game._socket || !window.game._desenho || !window.game.turn || !this.isDrawingActive) {
                this.showNotification(this.localize("Game not ready or not your turn! ✧"), 3000);
                this.elements.sendDraw.disabled = false;
                return;
            }

            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = async () => {
                const gameCanvas = window.game._desenho._canvas.canvas;
                const ctx = gameCanvas.getContext('2d');
                if (!ctx) {
                    this.showNotification(this.localize("Canvas context not available! ✧"), 3000);
                    return;
                }

                const canvasWidth = Math.floor(gameCanvas.width);
                const canvasHeight = Math.floor(gameCanvas.height);

                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                if (!tempCtx) {
                    this.showNotification(this.localize("Temp canvas context failed! ✧"), 3000);
                    return;
                }
                tempCanvas.width = canvasWidth;
                tempCanvas.height = canvasHeight;

                const scale = Math.min(canvasWidth / img.width, canvasHeight / img.height);
                const newWidth = Math.floor(img.width * scale);
                const newHeight = Math.floor(img.height * scale);
                const offsetX = Math.floor((canvasWidth - newWidth) / 2);
                const offsetY = Math.floor((canvasHeight - newHeight) / 2);

                tempCtx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
                const imageData = tempCtx.getImageData(0, 0, canvasWidth, canvasHeight);
                const data = imageData.data;

                const drawSpeedValue = parseInt(this.elements.drawSpeed.value) || 300;
                const maxColorsValue = parseInt(this.elements.maxColors.value) || 20;

                const imgLeft = offsetX;
                const imgRight = offsetX + newWidth - 1;
                const imgTop = offsetY;
                const imgBottom = offsetY + newHeight - 1;

                const colorCounts = new Map();
                const sampleStep = Math.max(1, Math.floor(newWidth / 50));
                for (let x = imgLeft; x <= imgRight; x += sampleStep) {
                    for (let y of [imgTop, imgBottom]) {
                        const index = (y * canvasWidth + x) * 4;
                        const key = `${data[index]},${data[index + 1]},${data[index + 2]}`;
                        colorCounts.set(key, (colorCounts.get(key) || 0) + 1);
                    }
                }

                let backgroundColor = [255, 255, 255];
                let maxCount = 0;
                for (const [key, count] of colorCounts) {
                    if (count > maxCount) {
                        maxCount = count;
                        backgroundColor = key.split(',').map(Number);
                    }
                }
                const bgHex = 'x' + backgroundColor.map(c => c.toString(16).padStart(2, '0').toUpperCase()).join('');

                if (!this.isDrawingActive || !window.game.turn) {
                    this.stopDrawing();
                    return;
                }
                window.game._socket.emit(10, window.game._codigo, [4]);
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                await new Promise(resolve => setTimeout(resolve, drawSpeedValue));

                if (!this.isDrawingActive || !window.game.turn) {
                    this.stopDrawing();
                    return;
                }
                window.game._socket.emit(10, window.game._codigo, [5, bgHex]);
                window.game._socket.emit(10, window.game._codigo, [3, 0, 0, canvasWidth, canvasHeight]);
                ctx.fillStyle = `#${bgHex.slice(1)}`;
                ctx.fillRect(0, 0, canvasWidth, canvasHeight);
                await new Promise(resolve => setTimeout(resolve, drawSpeedValue));

                const colorClusters = new Map();
                const finerSampleStep = Math.max(1, Math.floor(newWidth / 100));
                for (let y = imgTop; y <= imgBottom; y += finerSampleStep) {
                    for (let x = imgLeft; x <= imgRight; x += finerSampleStep) {
                        const index = (y * canvasWidth + x) * 4;
                        const key = `${data[index]},${data[index + 1]},${data[index + 2]}`;
                        if (this.colorDistance([data[index], data[index + 1], data[index + 2]], backgroundColor) > 30) {
                            colorClusters.set(key, (colorClusters.get(key) || 0) + 1);
                        }
                    }
                }

                const topColors = [...colorClusters.entries()]
                .sort((a, b) => b[1] - a[1])
                .slice(0, maxColorsValue)
                .map(([key]) => ({
                    rgb: key.split(',').map(Number),
                    hex: 'x' + key.split(',').map(c => Number(c).toString(16).padStart(2, '0').toUpperCase()).join('')
                }));

                const visited = new Set();
                const getColorAt = (x, y) => {
                    const index = (y * canvasWidth + x) * 4;
                    return [data[index], data[index + 1], data[index + 2]];
                };

                const traceAndGroupRegion = (startX, startY, targetColor) => {
                    const stack = [[startX, startY]];
                    const regionCoords = [];
                    const visitedInRegion = new Set();

                    while (stack.length > 0) {
                        const [x, y] = stack.pop();
                        const key = `${x},${y}`;
                        if (
                            visited.has(key) ||
                            visitedInRegion.has(key) ||
                            x < imgLeft ||
                            x > imgRight ||
                            y < imgTop ||
                            y > imgBottom
                        ) {
                            continue;
                        }

                        const pixelColor = getColorAt(x, y);
                        if (this.colorDistance(pixelColor, targetColor) <= 10) {
                            visitedInRegion.add(key);
                            regionCoords.push([x, y]);
                            stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
                        }
                    }

                    if (regionCoords.length < 5) return [];

                    visitedInRegion.forEach(k => visited.add(k));

                    const fills = [];
                    let currentRow = [];
                    let lastY = null;

                    regionCoords.sort((a, b) => a[1] - b[1] || a[0] - b[0]);

                    for (const [x, y] of regionCoords) {
                        if (lastY !== y) {
                            if (currentRow.length > 0) {
                                const minX = Math.min(...currentRow);
                                const maxX = Math.max(...currentRow);
                                fills.push([minX, lastY, maxX - minX + 1, 1]);
                                currentRow = [];
                            }
                            lastY = y;
                        }
                        currentRow.push(x);
                    }
                    if (currentRow.length > 0) {
                        const minX = Math.min(...currentRow);
                        const maxX = Math.max(...currentRow);
                        fills.push([minX, lastY, maxX - minX + 1, 1]);
                    }

                    return fills;
                };

                const drawRegions = async () => {
                    for (let y = imgTop; y <= imgBottom; y += finerSampleStep) {
                        if (!this.isDrawingActive || !window.game.turn) {
                            this.stopDrawing();
                            return;
                        }
                        for (let x = imgLeft; x <= imgRight; x += finerSampleStep) {
                            const key = `${x},${y}`;
                            if (visited.has(key)) continue;

                            const pixelColor = getColorAt(x, y);
                            if (this.colorDistance(pixelColor, backgroundColor) <= 30) continue;

                            const nearestColor = topColors.reduce((prev, curr) =>
                                                                  this.colorDistance(pixelColor, prev.rgb) < this.colorDistance(pixelColor, curr.rgb) ? prev : curr
                                                                 );

                            const fills = traceAndGroupRegion(x, y, nearestColor.rgb);
                            if (fills.length === 0) continue;

                            if (!this.isDrawingActive || !window.game.turn) {
                                this.stopDrawing();
                                return;
                            }

                            window.game._socket.emit(10, window.game._codigo, [5, nearestColor.hex]);
                            ctx.fillStyle = `#${nearestColor.hex.slice(1)}`;
                            const fillCommand = [3];
                            fills.forEach(([x, y, w, h]) => {
                                fillCommand.push(x, y, w, h);
                                ctx.fillRect(x, y, w, h);
                            });
                            window.game._socket.emit(10, window.game._codigo, fillCommand);

                            await new Promise(resolve => setTimeout(resolve, drawSpeedValue));
                        }
                    }
                };

                await drawRegions();

                if (this.isDrawingActive) {
                    this.showNotification(this.localize("Drawing completed! ✧"), 3000);
                }
                this.stopDrawing();
            };
            img.onerror = () => {
                this.showNotification(this.localize("Failed to load image! ✧"), 3000);
                this.stopDrawing();
            };
            img.src = imageSrc;
        }

        stopDrawing() {
            this.isDrawingActive = false;
            this.elements.sendDraw.disabled = false;
        }

        colorDistance(color1, color2) {
            const rMean = (color1[0] + color2[0]) / 2;
            const r = color1[0] - color2[0];
            const g = color1[1] - color2[1];
            const b = color1[2] - color2[2];
            return Math.sqrt(
                (2 + rMean / 256) * r * r +
                4 * g * g +
                (2 + (255 - rMean) / 256) * b * b
            );
        }
    }

    KawaiiHelper.init();
})();
