/**
 * WebRTC & Media Stream Manager
 * Handles webcam/mic access, audio level meters, and procedural Canvas Avatar fallback rendering.
 */

class MediaManager {
    constructor() {
        this.localStream = null;
        this.isMuted = false;
        this.isCamOff = false;
        this.isAvatarMode = true; // Default to safe avatar privacy mode
        this.audioContext = null;
        this.analyser = null;
        this.microphone = null;
        this.audioLevel = 0;
        this.avatarAnimationId = null;
    }

    async initLocalStream(videoElement, canvasElement) {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({
                video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
                audio: true
            });
            videoElement.srcObject = this.localStream;
            this.setupAudioAnalysis(this.localStream);
            return true;
        } catch (err) {
            console.warn("Webcam/Mic access denied or unavailable. Fallback to Avatar Mode.", err);
            this.isCamOff = true;
            this.isAvatarMode = true;
            this.startCanvasAvatar(canvasElement, {
                bg: "#1e1e2e",
                hair: "#313244",
                eyes: "#cba6f7",
                symbol: "",
                name: "You (Player)"
            });
            return false;
        }
    }

    setupAudioAnalysis(stream) {
        try {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioCtx();
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 256;
            this.microphone = this.audioContext.createMediaStreamSource(stream);
            this.microphone.connect(this.analyser);
            
            const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
            const checkVolume = () => {
                if (!this.analyser) return;
                this.analyser.getByteFrequencyData(dataArray);
                let sum = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    sum += dataArray[i];
                }
                this.audioLevel = sum / dataArray.length;
                requestAnimationFrame(checkVolume);
            };
            checkVolume();
        } catch (e) {
            console.warn("Audio analysis setup failed", e);
        }
    }

    toggleMute(button) {
        if (!this.localStream) return;
        this.isMuted = !this.isMuted;
        this.localStream.getAudioTracks().forEach(track => {
            track.enabled = !this.isMuted;
        });
        if (button) {
            button.classList.toggle("active", this.isMuted);
            button.querySelector(".label").textContent = this.isMuted ? "Unmute" : "Mute";
        }
    }

    toggleCam(videoElement, canvasElement, button) {
        this.isCamOff = !this.isCamOff;
        if (this.localStream) {
            this.localStream.getVideoTracks().forEach(track => {
                track.enabled = !this.isCamOff;
            });
        }
        if (button) {
            button.classList.toggle("active", this.isCamOff);
            button.querySelector(".label").textContent = this.isCamOff ? "Cam On" : "Cam Off";
        }

        if (this.isCamOff || this.isAvatarMode) {
            videoElement.style.display = "none";
            canvasElement.style.display = "block";
            this.startCanvasAvatar(canvasElement, {
                bg: "#111827",
                hair: "#3b82f6",
                eyes: "#60a5fa",
                symbol: "⚡",
                name: "Player A"
            });
        } else {
            videoElement.style.display = "block";
            canvasElement.style.display = "none";
            if (this.avatarAnimationId) {
                cancelAnimationFrame(this.avatarAnimationId);
            }
        }
    }

    toggleAvatarMode(videoElement, canvasElement, button) {
        this.isAvatarMode = !this.isAvatarMode;
        if (button) {
            button.classList.toggle("active", this.isAvatarMode);
            button.querySelector(".label").textContent = this.isAvatarMode ? "Camera Mode" : "Avatar Mode";
        }
        if (this.isAvatarMode) {
            videoElement.style.display = "none";
            canvasElement.style.display = "block";
            this.startCanvasAvatar(canvasElement, {
                bg: "#181825",
                hair: "#f38ba8",
                eyes: "#fab387",
                symbol: "✨",
                name: "Player A (Avatar)"
            });
        } else if (!this.isCamOff && this.localStream) {
            videoElement.style.display = "block";
            canvasElement.style.display = "none";
            if (this.avatarAnimationId) {
                cancelAnimationFrame(this.avatarAnimationId);
            }
        }
    }

    startCanvasAvatar(canvas, config) {
        if (this.avatarAnimationId) {
            cancelAnimationFrame(this.avatarAnimationId);
        }

        const ctx = canvas.getContext("2d");
        let eyeBlinkTimer = 0;
        let isBlinking = false;
        let headOffsetY = 0;
        let headDir = 0.05;

        const render = () => {
            const width = canvas.width = canvas.clientWidth || 320;
            const height = canvas.height = canvas.clientHeight || 240;
            const cx = width / 2;
            const cy = height / 2 + 10;

            // Background gradient
            const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, width);
            bgGrad.addColorStop(0, config.bg || "#1f1f2e");
            bgGrad.addColorStop(1, "#0a0a12");
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, width, height);

            // Head breathing / sway
            headOffsetY += headDir;
            if (headOffsetY > 3 || headOffsetY < -3) headDir *= -1;

            const headY = cy + headOffsetY;

            // Shoulders
            ctx.fillStyle = "#2d3748";
            ctx.beginPath();
            ctx.ellipse(cx, height + 40, 90, 60, 0, 0, Math.PI * 2);
            ctx.fill();

            // Head Base
            ctx.fillStyle = "#ffe0bd";
            ctx.beginPath();
            ctx.ellipse(cx, headY, 55, 68, 0, 0, Math.PI * 2);
            ctx.fill();

            // Hair Top
            ctx.fillStyle = config.hair || "#333";
            ctx.beginPath();
            ctx.arc(cx, headY - 25, 60, Math.PI, 0, false);
            ctx.fill();

            // Anime Hair Spikes
            for (let i = -3; i <= 3; i++) {
                ctx.beginPath();
                ctx.moveTo(cx + i * 16, headY - 50);
                ctx.lineTo(cx + i * 22, headY - 80 - Math.abs(i) * 4);
                ctx.lineTo(cx + i * 16 + 10, headY - 45);
                ctx.fill();
            }

            // Blinking logic
            eyeBlinkTimer++;
            if (eyeBlinkTimer > 180) {
                isBlinking = true;
                if (eyeBlinkTimer > 192) {
                    eyeBlinkTimer = 0;
                    isBlinking = false;
                }
            }

            // Eyes
            ctx.fillStyle = config.eyes || "#0088ff";
            const eyeSpacing = 22;
            const eyeY = headY - 5;
            if (isBlinking) {
                ctx.strokeStyle = "#333";
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(cx - eyeSpacing - 10, eyeY);
                ctx.lineTo(cx - eyeSpacing + 10, eyeY);
                ctx.moveTo(cx + eyeSpacing - 10, eyeY);
                ctx.lineTo(cx + eyeSpacing + 10, eyeY);
                ctx.stroke();
            } else {
                ctx.beginPath();
                ctx.ellipse(cx - eyeSpacing, eyeY, 9, 14, 0, 0, Math.PI * 2);
                ctx.ellipse(cx + eyeSpacing, eyeY, 9, 14, 0, 0, Math.PI * 2);
                ctx.fill();

                // Eye Highlights
                ctx.fillStyle = "#ffffff";
                ctx.beginPath();
                ctx.arc(cx - eyeSpacing - 3, eyeY - 4, 3, 0, Math.PI * 2);
                ctx.arc(cx + eyeSpacing - 3, eyeY - 4, 3, 0, Math.PI * 2);
                ctx.fill();
            }

            // Mouth (Talk / Audio react)
            const isTalking = this.audioLevel > 15;
            ctx.fillStyle = "#cc5555";
            ctx.beginPath();
            if (isTalking) {
                const mouthOpen = Math.min(18, (this.audioLevel - 15) * 0.8);
                ctx.ellipse(cx, headY + 32, 10, mouthOpen, 0, 0, Math.PI * 2);
            } else {
                ctx.ellipse(cx, headY + 32, 8, 3, 0, 0, Math.PI * 2);
            }
            ctx.fill();

            // Symbol Tag
            ctx.font = "24px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(config.symbol || "⭐", cx, headY - 85);

            this.avatarAnimationId = requestAnimationFrame(render);
        };

        render();
    }
}

window.mediaManager = new MediaManager();
