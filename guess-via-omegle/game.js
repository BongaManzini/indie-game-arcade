/**
 * Core Game State & Logic Engine (Supports 1v1, 2v2 Duos, and 3v3 Team Battles)
 * Manages matchmaking, turn timers, automated clue cadence, fuzzy guess validation,
 * score tracking, team battle mechanics, and audio effects.
 */

class GuessGameEngine {
    constructor() {
        this.gameMode = "1v1";         // "1v1", "2v2", "team"
        this.playerACharacter = null; // Character Player A must guess
        this.playerBCharacter = null; // Character Player B must guess
        
        // 2v2 & Team Mode Data
        this.teamAlphaCharacters = []; // Team Alpha (Player + Partner)
        this.teamOmegaCharacters = []; // Team Omega (Enemies)
        this.teamAlphaScore = 0;
        this.teamOmegaScore = 0;

        this.currentTurn = "A";        // "A" (Team Alpha / You) or "B" (Team Omega / Enemies)
        this.turnNumber = 1;
        this.turnTimer = 15;
        this.turnInterval = null;
        this.clueTimer = 30;
        this.clueInterval = null;
        this.unlockedClueTier = 1;
        this.score = 0;
        this.streak = 0;
        this.isMatchActive = false;
        this.clueFeed = [];
        this.audioCtx = null;
    }

    setGameMode(mode) {
        this.gameMode = mode;
        const modeBadges = document.querySelectorAll(".mode-btn");
        modeBadges.forEach(btn => {
            btn.classList.toggle("active", btn.dataset.mode === mode);
        });
    }

    initAudio() {
        if (!this.audioCtx) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.audioCtx = new AudioCtx();
        }
    }

    playSound(type) {
        if (!this.audioCtx) return;
        try {
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();
            osc.connect(gain);
            gain.connect(this.audioCtx.destination);
            const now = this.audioCtx.currentTime;

            if (type === "tick") {
                osc.type = "sine";
                osc.frequency.setValueAtTime(600, now);
                gain.gain.setValueAtTime(0.05, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
                osc.start(now);
                osc.stop(now + 0.08);
            } else if (type === "turn_switch") {
                osc.type = "triangle";
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
                osc.start(now);
                osc.stop(now + 0.2);
            } else if (type === "win") {
                osc.type = "sine";
                osc.frequency.setValueAtTime(523.25, now);
                osc.frequency.setValueAtTime(659.25, now + 0.15);
                osc.frequency.setValueAtTime(783.99, now + 0.3);
                osc.frequency.setValueAtTime(1046.50, now + 0.45);
                gain.gain.setValueAtTime(0.15, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
                osc.start(now);
                osc.stop(now + 0.7);
            } else if (type === "fail") {
                osc.type = "sawtooth";
                osc.frequency.setValueAtTime(300, now);
                osc.frequency.linearRampToValueAtTime(150, now + 0.3);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
                osc.start(now);
                osc.stop(now + 0.3);
            }
        } catch (e) {
            console.warn("Audio play failed", e);
        }
    }

    startMatchmaking(onMatchedCallback) {
        this.isMatchActive = false;
        this.clearTimers();
        
        const shuffled = [...ANIME_CHARACTERS].sort(() => 0.5 - Math.random());
        
        if (this.gameMode === "1v1") {
            this.playerACharacter = shuffled[0];
            this.playerBCharacter = shuffled[1];
            window.shadowBot.init(this.playerACharacter, this.playerBCharacter);
        } else if (this.gameMode === "2v2") {
            this.teamAlphaCharacters = [shuffled[0], shuffled[1]]; // You & Partner
            this.teamOmegaCharacters = [shuffled[2], shuffled[3]]; // Enemies
            this.playerACharacter = shuffled[0];
            this.playerBCharacter = shuffled[2];
            window.shadowBot.initMultiBots(this.teamAlphaCharacters, this.teamOmegaCharacters);
        } else if (this.gameMode === "team") {
            this.teamAlphaCharacters = [shuffled[0], shuffled[1], shuffled[2]];
            this.teamOmegaCharacters = [shuffled[3], shuffled[4], shuffled[5]];
            this.playerACharacter = shuffled[0];
            this.playerBCharacter = shuffled[3];
            window.shadowBot.initMultiBots(this.teamAlphaCharacters, this.teamOmegaCharacters);
        }

        setTimeout(() => {
            this.isMatchActive = true;
            this.currentTurn = "A";
            this.turnNumber = 1;
            this.unlockedClueTier = 1;
            this.clueFeed = [];
            this.teamAlphaScore = 0;
            this.teamOmegaScore = 0;
            
            this.addClueToFeed(`Tier 1 Clue: ${this.playerACharacter.clues.demographics}`);

            onMatchedCallback({
                mode: this.gameMode,
                playerASecret: this.playerACharacter,
                playerBSecret: this.playerBCharacter,
                teamAlpha: this.teamAlphaCharacters,
                teamOmega: this.teamOmegaCharacters,
                botName: window.shadowBot.name
            });

            this.startTurnTimer();
            this.startClueTimer();
        }, 2000 + Math.random() * 1500);
    }

    startTurnTimer() {
        clearInterval(this.turnInterval);
        this.turnTimer = 15;
        this.updateHUD();

        this.turnInterval = setInterval(() => {
            this.turnTimer--;
            this.playSound("tick");
            this.updateHUD();

            if (this.turnTimer <= 0) {
                this.switchTurn();
            }
        }, 1000);
    }

    startClueTimer() {
        clearInterval(this.clueInterval);
        this.clueTimer = 30;

        this.clueInterval = setInterval(() => {
            this.clueTimer--;
            if (this.clueTimer <= 0) {
                this.clueTimer = 30;
                this.unlockNextClueTier();
            }
            this.updateClueHUD();
        }, 1000);
    }

    unlockNextClueTier() {
        if (this.unlockedClueTier < 4) {
            this.unlockedClueTier++;
            let clueText = "";
            if (this.unlockedClueTier === 2) clueText = `Tier 2 Appearance: ${this.playerACharacter.clues.appearance}`;
            if (this.unlockedClueTier === 3) clueText = `Tier 3 Abilities: ${this.playerACharacter.clues.abilities}`;
            if (this.unlockedClueTier === 4) clueText = `Tier 4 Quote: "${this.playerACharacter.clues.quote}"`;

            this.addClueToFeed(clueText);
            this.playSound("turn_switch");
        }
    }

    addClueToFeed(text) {
        this.clueFeed.push(text);
        const feedEl = document.getElementById("clue-feed");
        if (feedEl) {
            const item = document.createElement("div");
            item.className = "clue-item animate-pop";
            item.textContent = text;
            feedEl.appendChild(item);
            feedEl.scrollTop = feedEl.scrollHeight;
        }
    }

    switchTurn() {
        this.currentTurn = this.currentTurn === "A" ? "B" : "A";
        if (this.currentTurn === "A") this.turnNumber++;
        this.playSound("turn_switch");
        this.startTurnTimer();

        if (this.currentTurn === "B" && this.isMatchActive) {
            this.handleBotTurnLogic();
        }
    }

    handleBotTurnLogic() {
        const botGuess = window.shadowBot.makeGuessAttempt(this.turnNumber, ANIME_CHARACTERS);
        if (botGuess) {
            const isBotWin = this.validateGuess(botGuess, this.playerBCharacter);
            if (isBotWin) {
                this.endMatch(false, `Enemy Opponents guessed correctly! It was ${this.playerBCharacter.name}!`);
                return;
            }
        }

        const botQuestion = window.shadowBot.generateBotQuestion(this.turnNumber);
        this.addChatMessage(window.shadowBot.name, botQuestion, "bot");
    }

    submitPlayerQuestion(questionText) {
        if (!this.isMatchActive || this.currentTurn !== "A") return;
        this.addChatMessage("You (Team Alpha)", questionText, "user");

        window.shadowBot.answerPlayerQuestion(questionText, (answer) => {
            this.addChatMessage(window.shadowBot.name, `Answer: [${answer}]`, "bot-answer");
        });
    }

    submitPlayerGuess(guessInput) {
        if (!this.isMatchActive) return { success: false, message: "Match not active" };

        const isCorrect = this.validateGuess(guessInput, this.playerACharacter);
        if (isCorrect) {
            const earnedPoints = 100 + (this.streak * 25);
            this.score += earnedPoints;
            this.streak += 1;
            this.playSound("win");
            this.endMatch(true, `VICTORY! You correctly guessed ${this.playerACharacter.name}! (+${earnedPoints} pts)`);
            return { success: true, message: "Correct!" };
        } else {
            this.playSound("fail");
            return { success: false, message: "Incorrect guess! Try again." };
        }
    }

    validateGuess(input, targetChar) {
        if (!input || !targetChar) return false;
        const cleanInput = input.trim().toLowerCase().replace(/[^a-z0-9 ]/g, "");
        const validNames = [targetChar.name, ...(targetChar.aliases || [])].map(n => 
            n.trim().toLowerCase().replace(/[^a-z0-9 ]/g, "")
        );

        if (validNames.includes(cleanInput)) return true;

        for (let name of validNames) {
            if (this.levenshteinDistance(cleanInput, name) <= 2 && name.length >= 5) {
                return true;
            }
        }
        return false;
    }

    calculateClosenessScore(guessInput, targetChar) {
        if (!guessInput || !targetChar) return { score: 0, reasoning: "Invalid guess input.", isExact: false };

        const cleanInput = guessInput.trim().toLowerCase().replace(/[^a-z0-9 ]/g, "");
        const targetNames = [targetChar.name, ...(targetChar.aliases || [])].map(n => n.trim().toLowerCase().replace(/[^a-z0-9 ]/g, ""));

        // 1. Direct / Exact Match check
        if (targetNames.includes(cleanInput)) {
            return {
                score: 100,
                isExact: true,
                matchedCharName: targetChar.name,
                reasoning: ` 100% PERFECT MATCH! You correctly identified ${targetChar.name}!`
            };
        }

        // 2. Check if the guessed character matches another character in our database
        const matchedChar = ANIME_CHARACTERS.find(c => {
            const names = [c.name, ...(c.aliases || [])].map(n => n.trim().toLowerCase().replace(/[^a-z0-9 ]/g, ""));
            return names.includes(cleanInput) || names.some(n => this.levenshteinDistance(cleanInput, n) <= 2 && n.length >= 4);
        });

        if (matchedChar) {
            let score = 15;
            let reasons = [];

            // Same Series Check (+45%)
            if (matchedChar.series.toLowerCase() === targetChar.series.toLowerCase()) {
                score += 45;
                reasons.push(`Same Series (${targetChar.series})`);
            }

            // Shared Tags Check (+5% to +30%)
            let tagMatches = 0;
            if (matchedChar.tags && targetChar.tags) {
                Object.keys(matchedChar.tags).forEach(tag => {
                    if (matchedChar.tags[tag] && targetChar.tags[tag]) {
                        tagMatches++;
                    }
                });
            }
            if (tagMatches > 0) {
                const tagBonus = Math.min(30, tagMatches * 8);
                score += tagBonus;
                reasons.push(`Shared Traits (+${tagBonus}%)`);
            }

            // Name similarity bonus (+10%)
            const nameSim = 1 - (this.levenshteinDistance(cleanInput, targetChar.name.toLowerCase()) / Math.max(cleanInput.length, targetChar.name.length));
            if (nameSim > 0.4) {
                score += Math.floor(nameSim * 15);
            }

            score = Math.min(95, Math.max(15, score));
            const rationaleText = reasons.length > 0 ? reasons.join(" • ") : "Different universe & powers";

            return {
                score: score,
                isExact: false,
                matchedCharName: matchedChar.name,
                reasoning: ` ${score}% CLOSENESS: ${matchedChar.name} vs ${targetChar.name}. Reasons: ${rationaleText}`
            };
        }

        // 3. Fallback string similarity against target name
        const targetNameClean = targetChar.name.toLowerCase();
        const lev = this.levenshteinDistance(cleanInput, targetNameClean);
        const maxLen = Math.max(cleanInput.length, targetNameClean.length);
        const simRatio = 1 - (lev / maxLen);
        const fallbackScore = Math.min(85, Math.max(10, Math.floor(simRatio * 90)));

        return {
            score: fallbackScore,
            isExact: false,
            matchedCharName: guessInput,
            reasoning: `⚡ ${fallbackScore}% CLOSENESS: Name/trait similarity rating evaluated by AI Judge.`
        };
    }

    levenshteinDistance(a, b) {
        const matrix = [];
        for (let i = 0; i <= b.length; i++) matrix[i] = [i];
        for (let j = 0; j <= a.length; j++) matrix[0][j] = j;

        for (let i = 1; i <= b.length; i++) {
            for (let j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    endMatch(isPlayerWin, resultMessage) {
        this.isMatchActive = false;
        this.clearTimers();

        if (isPlayerWin) {
            const earnedPoints = 100 + (this.streak * 25);
            if (window.authManager) {
                window.authManager.recordGameWin(earnedPoints);
            }
        } else {
            this.streak = 0;
            this.playSound("fail");
        }

        const modal = document.getElementById("win-modal");
        const titleEl = document.getElementById("modal-title");
        const bodyEl = document.getElementById("modal-body");
        const imgEl = document.getElementById("modal-char-img");
        const seriesEl = document.getElementById("modal-char-series");

        if (modal) {
            titleEl.textContent = isPlayerWin ? ` ${this.gameMode.toUpperCase()} VICTORY!` : "⚡ MATCH ENDED";
            bodyEl.textContent = resultMessage;
            imgEl.src = this.playerACharacter.image;
            seriesEl.textContent = `${this.playerACharacter.name} (${this.playerACharacter.series})`;
            modal.classList.add("active");
        }

        this.updateScoreHUD();
    }

    clearTimers() {
        clearInterval(this.turnInterval);
        clearInterval(this.clueInterval);
    }

    updateHUD() {
        const timerEl = document.getElementById("turn-timer-num");
        const progressEl = document.getElementById("timer-progress-bar");
        const turnBadge = document.getElementById("turn-badge");

        if (timerEl) timerEl.textContent = `${this.turnTimer}s`;
        if (progressEl) {
            const pct = (this.turnTimer / 15) * 100;
            progressEl.style.width = `${pct}%`;
        }
        if (turnBadge) {
            if (this.currentTurn === "A") {
                turnBadge.textContent = this.gameMode === "1v1" ? "YOUR TURN" : "TEAM ALPHA TURN";
                turnBadge.className = "badge turn-your";
            } else {
                turnBadge.textContent = this.gameMode === "1v1" ? "STRANGER'S TURN" : "TEAM OMEGA TURN";
                turnBadge.className = "badge turn-their";
            }
        }
    }

    updateClueHUD() {
        const clueTimerEl = document.getElementById("next-clue-timer");
        if (clueTimerEl) {
            clueTimerEl.textContent = `Next Clue: ${this.clueTimer}s`;
        }
    }

    updateScoreHUD() {
        const scoreEl = document.getElementById("hud-score");
        const streakEl = document.getElementById("hud-streak");
        if (scoreEl) scoreEl.textContent = this.score;
        if (streakEl) streakEl.textContent = this.streak;
    }

    addChatMessage(sender, text, type) {
        const chatFeed = document.getElementById("chat-feed");
        if (!chatFeed) return;

        const msgDiv = document.createElement("div");
        msgDiv.className = `chat-msg msg-${type} animate-slide`;
        msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
        chatFeed.appendChild(msgDiv);
        chatFeed.scrollTop = chatFeed.scrollHeight;
    }
}

window.gameEngine = new GuessGameEngine();
