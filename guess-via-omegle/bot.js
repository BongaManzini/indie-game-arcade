/**
 * Shadow Bot System (Supports 1v1, 2v2 Duos, and Team Battles)
 * Provides synthetic opponent behavior with procedural avatar canvas, Web Audio speech,
 * hesitation delays, and team deduction logic.
 */

class ShadowBot {
    constructor() {
        this.name = "ShadowStranger_99";
        this.characterToGuess = null;
        this.botCharacter = null;
        this.isSpeaking = false;
        this.synth = window.speechSynthesis;
        this.canvasAnimationId = null;
        this.multiBots = [];
    }

    init(playerACharacter, playerBCharacter) {
        this.characterToGuess = playerACharacter;
        this.botCharacter = playerBCharacter;
        const handles = ["AnimeKing_99", "OtakuHero", "SenpaiGamer", "ShadowRider", "CyberNinja_X", "KageMaster"];
        this.name = handles[Math.floor(Math.random() * handles.length)];
    }

    initMultiBots(teamAlphaChars, teamOmegaChars) {
        this.characterToGuess = teamAlphaChars[0];
        this.botCharacter = teamOmegaChars[0];
        this.name = "TEAM OMEGA (BOTS)";
    }

    startBotCanvas(canvasElement) {
        if (this.canvasAnimationId) {
            cancelAnimationFrame(this.canvasAnimationId);
        }

        const ctx = canvasElement.getContext("2d");
        let headOffsetY = 0;
        let headDir = 0.08;
        let eyeTimer = 0;
        let isBlinking = false;
        const botAvatarConfig = this.botCharacter ? this.botCharacter.fallbackAvatar : {
            bg: "#1a0033", hair: "#aa00ff", eyes: "#00ffff", symbol: "🤖"
        };

        const render = () => {
            const width = canvasElement.width = canvasElement.clientWidth || 320;
            const height = canvasElement.height = canvasElement.clientHeight || 240;
            const cx = width / 2;
            const cy = height / 2 + 10;

            const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, width);
            bgGrad.addColorStop(0, botAvatarConfig.bg || "#1a0033");
            bgGrad.addColorStop(1, "#050010");
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            headOffsetY += headDir;
            if (headOffsetY > 4 || headOffsetY < -4) headDir *= -1;
            const headY = cy + headOffsetY;

            ctx.shadowBlur = 15;
            ctx.shadowColor = botAvatarConfig.eyes || "#00ffff";

            ctx.fillStyle = "#1e1e2e";
            ctx.beginPath();
            ctx.ellipse(cx, height + 40, 95, 65, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ffdfc4";
            ctx.beginPath();
            ctx.ellipse(cx, headY, 56, 68, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;

            ctx.fillStyle = botAvatarConfig.hair || "#aa00ff";
            ctx.beginPath();
            ctx.arc(cx, headY - 20, 62, Math.PI, 0, false);
            ctx.fill();

            for (let i = -3; i <= 3; i++) {
                ctx.beginPath();
                ctx.moveTo(cx + i * 18, headY - 50);
                ctx.lineTo(cx + i * 24, headY - 85 - Math.abs(i) * 5);
                ctx.lineTo(cx + i * 18 + 12, headY - 45);
                ctx.fill();
            }

            eyeTimer++;
            if (eyeTimer > 150) {
                isBlinking = true;
                if (eyeTimer > 162) {
                    eyeTimer = 0;
                    isBlinking = false;
                }
            }

            const eyeSpacing = 22;
            const eyeY = headY - 4;
            ctx.fillStyle = botAvatarConfig.eyes || "#00ffff";
            if (isBlinking) {
                ctx.strokeStyle = "#111";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(cx - eyeSpacing - 10, eyeY);
                ctx.lineTo(cx - eyeSpacing + 10, eyeY);
                ctx.moveTo(cx + eyeSpacing - 10, eyeY);
                ctx.lineTo(cx + eyeSpacing + 10, eyeY);
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.ellipse(cx - eyeSpacing, eyeY, 10, 15, 0, 0, Math.PI * 2);
                ctx.ellipse(cx + eyeSpacing, eyeY, 10, 15, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = "#ffffff";
                ctx.beginPath();
                ctx.arc(cx - eyeSpacing - 3, eyeY - 4, 3, 0, Math.PI * 2);
                ctx.arc(cx + eyeSpacing - 3, eyeY - 4, 3, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.fillStyle = "#bb4455";
            ctx.beginPath();
            if (this.isSpeaking) {
                const mouthH = 8 + Math.sin(Date.now() * 0.02) * 6;
                ctx.ellipse(cx, headY + 32, 10, mouthH, 0, 0, Math.PI * 2);
            } else {
                ctx.ellipse(cx, headY + 32, 8, 3, 0, 0, Math.PI * 2);
            }
            ctx.fill();

            ctx.font = "bold 14px Space Grotesk, sans-serif";
            ctx.fillStyle = "#a6adc8";
            ctx.textAlign = "center";
            ctx.fillText(this.name, cx, 25);

            this.canvasAnimationId = requestAnimationFrame(render);
        };

        render();
    }

    async answerPlayerQuestion(questionText, callback) {
        const delay = 1500 + Math.random() * 1700;
        setTimeout(() => {
            if (!this.characterToGuess) return;
            const targetTags = this.characterToGuess.tags || {};
            const qLower = questionText.toLowerCase();
            let answer = "Maybe";

            if (qLower.includes("female") || qLower.includes("girl")) {
                answer = targetTags.female ? "Yes" : "No";
            } else if (qLower.includes("male") || qLower.includes("boy")) {
                answer = targetTags.male ? "Yes" : "No";
            } else if (qLower.includes("magic") || qLower.includes("power")) {
                answer = (targetTags.magic_ki || targetTags.magic || targetTags.overpower) ? "Yes" : "No";
            } else if (qLower.includes("ninja")) {
                answer = targetTags.ninja ? "Yes" : "No";
            } else if (qLower.includes("pirate")) {
                answer = targetTags.pirate ? "Yes" : "No";
            } else if (qLower.includes("swordsman") || qLower.includes("sword")) {
                answer = targetTags.swordsman ? "Yes" : "No";
            } else {
                const options = ["Yes", "No", "Maybe", "Irrelevant"];
                answer = options[Math.floor(Math.random() * options.length)];
            }

            this.speakText(answer);
            callback(answer);
        }, delay);
    }

    generateBotQuestion(turnNumber) {
        const questionsByTurn = [
            "Are your team's secret characters male?",
            "Do your characters use magic or ki powers?",
            "Are your characters from a Shonen anime series?",
            "Do your team members wield swords in battle?",
            "Is your main character's hair a bright color?",
            "Are your characters iconic anime protagonists?"
        ];
        const idx = Math.min(turnNumber, questionsByTurn.length - 1);
        const q = questionsByTurn[idx];
        this.speakText(q);
        return q;
    }

    makeGuessAttempt(turnNumber, allCharacters) {
        if (turnNumber < 3) return null;
        if (Math.random() > 0.45 && turnNumber < 6) return null;

        if (turnNumber >= 6 || Math.random() > 0.3) {
            return this.characterToGuess.name;
        } else {
            const other = allCharacters.filter(c => c.id !== this.characterToGuess.id);
            const randomChar = other[Math.floor(Math.random() * other.length)];
            return randomChar ? randomChar.name : this.characterToGuess.name;
        }
    }

    speakText(text) {
        if (!this.synth) return;
        this.synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        utterance.pitch = 0.9 + Math.random() * 0.2;
        utterance.onstart = () => { this.isSpeaking = true; };
        utterance.onend = () => { this.isSpeaking = false; };
        utterance.onerror = () => { this.isSpeaking = false; };
        this.synth.speak(utterance);
    }
}

window.shadowBot = new ShadowBot();
