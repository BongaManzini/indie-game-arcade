/**
 * Windows 14 Authentication & Account Manager
 * Handles Lock Screen, Login, Registration, Guest Mode, User Profile Persistence (localStorage),
 * and Sign Out state transitions.
 */

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.isUnlocked = false;
        this.STORAGE_KEY = "win14_anime_user";
        this.ACCOUNTS_KEY = "win14_anime_accounts";
    }

    init() {
        this.loadSession();
        this.startClock();
        this.setupEventListeners();
    }

    startClock() {
        const updateClock = () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const dateStr = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

            const lockTime = document.getElementById("lock-clock-time");
            const lockDate = document.getElementById("lock-clock-date");
            const trayClock = document.getElementById("tray-clock");

            if (lockTime) lockTime.textContent = timeStr;
            if (lockDate) lockDate.textContent = dateStr;
            if (trayClock) trayClock.textContent = timeStr;
        };

        updateClock();
        setInterval(updateClock, 1000);
    }

    loadSession() {
        const savedUser = localStorage.getItem(this.STORAGE_KEY);
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
            } catch (e) {
                this.currentUser = null;
            }
        }

        if (this.currentUser) {
            this.showDesktopView();
        } else {
            this.showLockScreen();
        }
    }

    saveSession() {
        if (this.currentUser) {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.currentUser));
        } else {
            localStorage.removeItem(this.STORAGE_KEY);
        }
        this.updateProfileUI();
    }

    unlockSystem() {
        const lockScreen = document.getElementById("win14-lockscreen");
        const loginModal = document.getElementById("win14-login-modal");

        if (lockScreen) {
            lockScreen.classList.add("unlocked");
        }

        if (!this.currentUser) {
            if (loginModal) loginModal.classList.add("active");
        } else {
            this.showDesktopView();
        }
    }

    showLockScreen() {
        const lockScreen = document.getElementById("win14-lockscreen");
        const loginModal = document.getElementById("win14-login-modal");
        const osDesktop = document.getElementById("win14-desktop");

        if (lockScreen) lockScreen.classList.remove("unlocked");
        if (loginModal) loginModal.classList.remove("active");
        if (osDesktop) osDesktop.style.display = "none";
    }

    showDesktopView() {
        const lockScreen = document.getElementById("win14-lockscreen");
        const loginModal = document.getElementById("win14-login-modal");
        const osDesktop = document.getElementById("win14-desktop");

        if (lockScreen) lockScreen.classList.add("unlocked");
        if (loginModal) loginModal.classList.remove("active");
        if (osDesktop) osDesktop.style.display = "flex";

        this.updateProfileUI();
    }

    login(username, password) {
        if (!username) return { success: false, message: "Please enter a username or email." };

        // Simple account validation against localStorage
        const accountsRaw = localStorage.getItem(this.ACCOUNTS_KEY);
        let accounts = accountsRaw ? JSON.parse(accountsRaw) : {};

        if (accounts[username]) {
            if (accounts[username].password !== password) {
                return { success: false, message: "Incorrect password." };
            }
            this.currentUser = accounts[username];
        } else {
            // Auto register if account does not exist for easy demo flow
            this.currentUser = {
                username: username,
                password: password,
                avatar: "",
                role: "Anime Challenger",
                score: 0,
                wins: 0,
                gamesPlayed: 0
            };
            accounts[username] = this.currentUser;
            localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(accounts));
        }

        this.saveSession();
        this.showDesktopView();
        return { success: true, message: `Welcome back, ${this.currentUser.username}!` };
    }

    loginAsGuest() {
        const guestId = Math.floor(1000 + Math.random() * 9000);
        this.currentUser = {
            username: `Guest_${guestId}`,
            password: "",
            avatar: "",
            role: "Guest Player",
            score: 0,
            wins: 0,
            gamesPlayed: 0
        };

        this.saveSession();
        this.showDesktopView();
        return { success: true, message: `Logged in as ${this.currentUser.username}` };
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem(this.STORAGE_KEY);
        
        // Hide taskbar profile flyout
        const flyout = document.getElementById("profile-flyout");
        if (flyout) flyout.classList.remove("active");

        this.showLockScreen();
    }

    updateProfileUI() {
        if (!this.currentUser) return;

        const userAvatarEls = document.querySelectorAll(".user-avatar-val");
        const userNameEls = document.querySelectorAll(".user-name-val");
        const userRoleEls = document.querySelectorAll(".user-role-val");
        const userScoreEls = document.querySelectorAll(".user-score-val");

        userAvatarEls.forEach(el => el.textContent = this.currentUser.avatar || "");
        userNameEls.forEach(el => el.textContent = this.currentUser.username || "Guest");
        userRoleEls.forEach(el => el.textContent = this.currentUser.role || "Player");
        userScoreEls.forEach(el => el.textContent = this.currentUser.score || 0);
    }

    recordGameWin(points) {
        if (!this.currentUser) return;
        this.currentUser.score = (this.currentUser.score || 0) + points;
        this.currentUser.wins = (this.currentUser.wins || 0) + 1;
        this.currentUser.gamesPlayed = (this.currentUser.gamesPlayed || 0) + 1;

        // Save account updates
        const accountsRaw = localStorage.getItem(this.ACCOUNTS_KEY);
        if (accountsRaw) {
            let accounts = JSON.parse(accountsRaw);
            if (accounts[this.currentUser.username]) {
                accounts[this.currentUser.username] = this.currentUser;
                localStorage.setItem(this.ACCOUNTS_KEY, JSON.stringify(accounts));
            }
        }
        this.saveSession();
    }

    setupEventListeners() {
        const lockScreen = document.getElementById("win14-lockscreen");
        const loginForm = document.getElementById("form-win14-login");
        const btnGuest = document.getElementById("btn-login-guest");
        const btnLogout = document.getElementById("btn-profile-logout");
        const profileTrigger = document.getElementById("tray-profile-btn");
        const profileFlyout = document.getElementById("profile-flyout");
        const tabLogin = document.getElementById("tab-login");
        const tabSignup = document.getElementById("tab-signup");
        const loginBtnText = document.getElementById("btn-submit-text");

        let isSignupMode = false;

        if (lockScreen) {
            lockScreen.addEventListener("click", () => this.unlockSystem());
            document.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    if (!lockScreen.classList.contains("unlocked")) {
                        this.unlockSystem();
                    }
                }
            });
        }

        if (tabLogin && tabSignup) {
            tabLogin.addEventListener("click", () => {
                isSignupMode = false;
                tabLogin.classList.add("active");
                tabSignup.classList.remove("active");
                if (loginBtnText) loginBtnText.textContent = "Sign In";
            });
            tabSignup.addEventListener("click", () => {
                isSignupMode = true;
                tabSignup.classList.add("active");
                tabLogin.classList.remove("active");
                if (loginBtnText) loginBtnText.textContent = "Create Account";
            });
        }

        if (loginForm) {
            loginForm.addEventListener("submit", (e) => {
                e.preventDefault();
                const username = document.getElementById("input-auth-user").value.trim();
                const password = document.getElementById("input-auth-pass").value;

                const result = this.login(username, password);
                const msgEl = document.getElementById("auth-error-msg");
                if (msgEl) {
                    msgEl.textContent = result.message;
                    msgEl.style.color = result.success ? "#00f0ff" : "#ff0055";
                }
            });
        }

        if (btnGuest) {
            btnGuest.addEventListener("click", () => this.loginAsGuest());
        }

        if (btnLogout) {
            btnLogout.addEventListener("click", () => this.logout());
        }

        if (profileTrigger && profileFlyout) {
            profileTrigger.addEventListener("click", (e) => {
                e.stopPropagation();
                profileFlyout.classList.toggle("active");
            });

            document.addEventListener("click", (e) => {
                if (!profileFlyout.contains(e.target) && e.target !== profileTrigger) {
                    profileFlyout.classList.remove("active");
                }
            });
        }
    }
}

window.authManager = new AuthManager();
