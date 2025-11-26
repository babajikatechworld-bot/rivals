
// Simple sanitizeHTML utility to prevent basic HTML injection in inserted content.
function sanitizeHTML(input) {
    if (input === undefined || input === null) return '';
    var s = String(input);
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
}



        // Firebase Imports
        import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
        import { getDatabase, ref, get, set, update, push, query, orderByChild, equalTo, onValue, runTransaction, off, limitToLast, serverTimestamp, limitToFirst, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
        
        // NEW CODE: Added setPersistence and browserLocalPersistence to the import
        import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

        const firebaseConfig = {
            apiKey: "AIzaSyCCesn9w_LRC2d9xFlu5kxPrX9Qi9y3gvs",
            authDomain: "aj-esports-ae4bd.firebaseapp.com",
            databaseURL: "https://aj-esports-ae4bd-default-rtdb.firebaseio.com",
            projectId: "aj-esports-ae4bd",
            storageBucket: "aj-esports-ae4bd.firebasestorage.app",
            messagingSenderId: "1001531360017",
            appId: "1:1001531360017:web:3ae308430eb02c845d02b0",
            measurementId: "G-5BY24QPXZT"
        };


        let app, db, auth;
        try {
            app = initializeApp(firebaseConfig);
            db = getDatabase(app);
            auth = getAuth(app);

            setPersistence(auth, browserLocalPersistence)
              .catch((error) => {
                console.error("Error setting authentication persistence:", error);
              });

            console.log("Firebase Initialized");
        } catch (error) {
            console.error("Firebase initialization failed:", error);
            document.body.innerHTML = `<div class="alert alert-danger m-5 position-fixed top-0 start-0 end-0" style="z-index: 10000;">Critical Error: Could not connect. Check Firebase config & console. Error: ${error.message}</div>`;
        }

         const getElement = (id) => document.getElementById(id);
         const querySel = (selector) => document.querySelector(selector);
         const querySelAll = (selector) => document.querySelectorAll(selector);
         const elements = {
             sections: querySelAll('.section'), bottomNav: querySel('.bottom-nav'), bottomNavItems: querySelAll('.bottom-nav .nav-item'), globalLoader: getElement('globalLoaderEl'),
             headerBackBtn: getElement('headerBackBtnEl'), headerTitleContainer: getElement('headerTitleContainerEl'), headerGameTitle: getElement('headerGameTitleEl'), headerDynamicTitleText: getElement('headerDynamicTitleTextEl'), adminStatusIndicator: getElement('adminStatusIndicatorEl'), headerWalletChip: getElement('headerWalletChipEl'), headerChipBalance: getElement('headerChipBalanceEl'), headerUserGreeting: getElement('headerUserGreetingEl'), appLogo: getElement('appLogoEl'), notificationBtn: getElement('notificationBtnEl'), notificationBadge: querySel('.notification-badge'),
             loginSection: getElement('login-section'),
             emailLoginForm: getElement('emailLoginForm'), loginEmailInput: getElement('loginEmailInputEl'), loginPasswordInput: getElement('loginPasswordInputEl'), loginEmailBtn: getElement('loginEmailBtnEl'), showSignupToggleBtn: getElement('showSignupToggleBtnEl'), loginStatusMessage: getElement('loginStatusMessageEl'), forgotPasswordLink: getElement('forgotPasswordLinkEl'),
             emailSignupForm: getElement('emailSignupForm'), signupNameInput: getElement('signupNameInputEl'), signupEmailInput: getElement('signupEmailInputEl'), signupPasswordInput: getElement('signupPasswordInputEl'), signupReferralCodeInput: getElement('signupReferralCodeInputEl'), signupEmailBtn: getElement('signupEmailBtnEl'), showLoginToggleBtn: getElement('showLoginToggleBtnEl'), signupStatusMessage: getElement('signupStatusMessageEl'),
             homeSection: getElement('home-section'), promotionSlider: getElement('promotionSliderEl'), gamesList: getElement('gamesListEl'),
             myMatchesDisplaySection: getElement('my-matches-display-section'),
             myMatchesDisplayListEl: getElement('myMatchesDisplayListEl'),
             myMatchesEmptyStateEl: getElement('myMatchesEmptyStateEl'),
             myMatchesEmptyTitleEl: getElement('myMatchesEmptyTitleEl'),
             myMatchesEmptySubtitleEl: getElement('myMatchesEmptySubtitleEl'),
             tournamentsSection: getElement('tournaments-section'), tournamentsListContainer: getElement('tournamentsListContainerEl'), noTournamentsMessage: getElement('noTournamentsMessageEl'), tournamentTabs: querySelAll('.tournament-tabs .tab-item'),
             
             matchDetailsSection: getElement('match-details-section'),
             detailsBannerEl: getElement('detailsBannerEl'),
             detailsTitleEl: getElement('detailsTitleEl'),
             detailsSubtitleEl: getElement('detailsSubtitleEl'),
             detailsModeEl: getElement('detailsModeEl'),
             detailsGameModeEl: getElement('detailsGameModeEl'),
             detailsEntryFeeEl: getElement('detailsEntryFeeEl'),
             detailsScheduleEl: getElement('detailsScheduleEl'),
             detailsPrizePoolEl: getElement('detailsPrizePoolEl'),
             detailsPerKillEl: getElement('detailsPerKillEl'),
             detailsRulesEl: getElement('detailsRulesEl'),
             detailsJoinBtn: getElement('detailsJoinBtn'),

             walletSection: getElement('wallet-section'), walletTotalBalance: getElement('walletTotalBalanceEl'), walletWinningCash: getElement('walletWinningCashEl'), walletBonusCash: getElement('walletBonusCashEl'), allTransactionsBtn: getElement('allTransactionsBtnEl'), withdrawBtn: getElement('withdrawBtnEl'), addAmountWalletBtn: getElement('addAmountWalletBtnEl'), recentTransactionsList: getElement('recentTransactionsListEl'), noTransactionsMessage: getElement('noTransactionsMessageEl'),
             profileSection: getElement('profile-section'), profileAvatar: getElement('profileAvatarEl'), profileName: getElement('profileNameEl'), profileEmail: getElement('profileEmailEl'), profileTotalMatches: getElement('profileTotalMatchesEl'), profileWonMatches: getElement('profileWonMatchesEl'), profileTotalEarnings: getElement('profileTotalEarningsEl'), logoutProfileBtn: getElement('logoutProfileBtnEl'), policyLinks: querySelAll('.profile-links a[data-policy], .profile-links button[data-policy]'), notificationSwitch: getElement('notificationSwitchEl'),
             leaderboardSection: getElement('leaderboard-section'), leaderboardListEl: getElement('leaderboardListEl'), noLeaderboardMessageEl: getElement('noLeaderboardMessageEl'),
             contactUsBtn: getElement('contactUsBtnEl'),
             rechargeSection: getElement('recharge-section'), rechargeStep1: getElement('recharge-step-1-amount'), rechargeStep2: getElement('recharge-step-2-method'), rechargeStep3: getElement('recharge-step-3-payment'), rechargeBalanceDisplay: getElement('rechargeBalanceDisplay'), rechargeAmountInput: getElement('rechargeAmountInput'), rechargePresetBtns: querySelAll('.amount-preset-btn'), rechargeStep1Status: getElement('rechargeStep1Status'), goToStep2Btn: getElement('goToStep2Btn'), rechargeAmountConfirm: getElement('rechargeAmountConfirm'), paymentOptionCards: querySelAll('.payment-option-card'), rechargeStep2Status: getElement('rechargeStep2Status'), goToStep3Btn: getElement('goToStep3Btn'), rechargeFinalAmount: getElement('rechargeFinalAmount'), rechargePaymentMode: getElement('rechargePaymentMode'), rechargeUpiId: getElement('rechargeUpiId'), rechargeQrCodeImg: getElement('rechargeQrCodeImg'), rechargeCopyAmtBtn: getElement('rechargeCopyAmtBtn'), rechargeCopyUpiBtn: getElement('rechargeCopyUpiBtn'), rechargeUtrInput: getElement('rechargeUtrInput'), rechargeStep3Status: getElement('rechargeStep3Status'), rechargeCancelBtn: getElement('rechargeCancelBtn'), rechargeSubmitBtn: getElement('rechargeSubmitBtn'),
             policyModalInstance: getElement('policyModalEl') ? new bootstrap.Modal(getElement('policyModalEl')) : null, policyModalTitle: getElement('policyModalTitleEl'), policyModalBody: getElement('policyModalBodyEl'),
             addAmountModalInstance: getElement('addAmountModalEl') ? new bootstrap.Modal(getElement('addAmountModalEl')) : null, modalUserEmail: getElement('modalUserEmailEl'),
             withdrawModalInstance: getElement('withdrawModalEl') ? new bootstrap.Modal(getElement('withdrawModalEl')) : null, withdrawModalBalance: getElement('withdrawModalBalanceEl'), withdrawAmountInput: getElement('withdrawAmountInputEl'), withdrawMethodInput: getElement('withdrawMethodInputEl'), minWithdrawAmount: getElement('minWithdrawAmountEl'), withdrawStatusMessage: getElement('withdrawStatusMessageEl'), submitWithdrawRequestBtn: getElement('submitWithdrawRequestBtnEl'),
             idPasswordModalInstance: getElement('idPasswordModalEl') ? new bootstrap.Modal(getElement('idPasswordModalEl')) : null, roomIdDisplay: getElement('roomIdDisplayEl'), roomPasswordDisplay: getElement('roomPasswordDisplayEl'),
             joinTournamentDetailsModalInstance: getElement('joinTournamentDetailsModal') ? new bootstrap.Modal(getElement('joinTournamentDetailsModal')) : null,
             joinFeeDisplayEl: getElement('joinFeeDisplayEl'),
             joinTournamentIdInput: getElement('joinTournamentIdInput'),
             joinTournamentFeeInput: getElement('joinTournamentFeeInput'),
             joinTournamentModeInput: getElement('joinTournamentModeInput'),
             joinUsernameInput: getElement('joinUsernameInput'),
             joinGameUidInput: getElement('joinGameUidInput'),
             joinTeamFieldsContainer: getElement('joinTeamFieldsContainer'),
             joinTournamentStatusMessage: getElement('joinTournamentStatusMessageEl'),
             confirmJoinBtn: getElement('confirmJoinBtn'),
             securityWarning: getElement('securityWarning'),
             notificationsModalInstance: getElement('notificationsModalEl') ? new bootstrap.Modal(getElement('notificationsModalEl')) : null,
             notificationsListEl: getElement('notificationsListEl'),
             notificationsEmptyMsgEl: getElement('notificationsEmptyMsgEl'),
             editNameBtnEl: getElement('editNameBtnEl'),
             editNameModalInstance: getElement('editNameModal') ? new bootstrap.Modal(getElement('editNameModal')) : null,
             editNameInput: getElement('editNameInput'),
             editNameStatusMessage: getElement('editNameStatusMessage'),
             saveNameChangeBtn: getElement('saveNameChangeBtn'),
             matchHistoryBtn: getElement('matchHistoryBtn'),
             matchHistoryModalInstance: getElement('matchHistoryModal') ? new bootstrap.Modal(getElement('matchHistoryModal')) : null,
             matchHistoryBodyEl: getElement('matchHistoryBodyEl'),
             transactionHistoryBtn: getElement('transactionHistoryBtn'),
             transactionHistoryModalInstance: getElement('transactionHistoryModal') ? new bootstrap.Modal(getElement('transactionHistoryModal')) : null,
             transactionHistoryBodyEl: getElement('transactionHistoryBodyEl'),
             tournamentChatModalInstance: getElement('tournamentChatModal') ? new bootstrap.Modal(getElement('tournamentChatModal')) : null,
             tournamentChatModalTitle: getElement('tournamentChatModalTitle'),
             chatMessagesEl: getElement('chatMessagesEl'),
             chatForm: getElement('chatForm'),
             chatMessageInput: getElement('chatMessageInput'),
             chatReplyContextEl: getElement('chatReplyContextEl'),
             replyToNameEl: getElement('replyToNameEl'),
             replyToMessageEl: getElement('replyToMessageEl'),
             cancelReplyBtn: getElement('cancelReplyBtn'),
             changePasswordBtn: getElement('changePasswordBtn'),
             changePasswordModalInstance: getElement('changePasswordModal') ? new bootstrap.Modal(getElement('changePasswordModal')) : null,
             savePasswordChangeBtn: getElement('savePasswordChangeBtn'),
             currentPasswordInput: getElement('currentPasswordInput'),
             newPasswordInput: getElement('newPasswordInput'),
             confirmNewPasswordInput: getElement('confirmNewPasswordInput'),
             changePasswordStatusMessage: getElement('changePasswordStatusMessage'),
             loaderTextEl: getElement('loaderTextEl'),
             liveSupportSection: getElement('live-support-section'),
             liveSupportBtn: getElement('liveSupportBtn'),
             liveChatMessagesEl: getElement('liveChatMessagesEl'),
             liveChatForm: getElement('liveChatForm'),
             liveChatMessageInput: getElement('liveChatMessageInput'),
             myStatsBtn: getElement('myStatsBtn'),
             myStatsModalInstance: getElement('myStatsModal') ? new bootstrap.Modal(getElement('myStatsModal')) : null,
             statsMatchesPlayed: getElement('statsMatchesPlayed'),
             statsMatchesWon: getElement('statsMatchesWon'),
             statsTotalKills: getElement('statsTotalKills'), 
             statsTotalWinnings: getElement('statsTotalWinnings'),
             statsReferralEarnings: getElement('statsReferralEarnings'),
             statsCardContainer: getElement('statsCardContainer'),
             promoCodeBtn: getElement('promoCodeBtn'),
             promoCodeOverlay: getElement('promoCodeOverlay'),
             closePromoCodeBtn: getElement('closePromoCodeBtn'),
             promoCodeInput: getElement('promoCodeInput'),
             promoCodeStatusMessage: getElement('promoCodeStatusMessage'),
             redeemPromoCodeBtn: getElement('redeemPromoCodeBtn'),
             promoCodeMessageEl: getElement('promoCodeMessageEl'),
         };

        let currentUser = null;
        let userProfile = {};
        let currentSectionId = 'login-section';
        let dbListeners = {};
        let adminStatusUnsubscribe = null;
        const protectedSections = ['home-section', 'wallet-section', 'profile-section', 'tournaments-section', 'recharge-section', 'leaderboard-section', 'live-support-section', 'my-matches-display-section', 'match-details-section'];
        let swiperInstance;
        let currentTournamentGameId = null;
        let appSettings = {};
        let tempReferralCode = null;
        let currentRechargeData = { amount: 0, paymentMethod: null, upiId: null };
        let currentChatRef = undefined;
        let currentChatChildCb = null;
        let currentChatListener = null;
        let currentLiveChatUnsubscribe = null;
        let currentReply = null; 
        
        const showGlobalLoader = (show) => {
            if (elements.globalLoader) {
                elements.globalLoader.style.display = show ? 'flex' : 'none';
            }
        };

        function showStatusMessage(element, message, type = 'danger', autohide = true) { if (!element) return; element.innerHTML = message; element.className = `alert alert-${type}`; element.style.display = 'block'; element.setAttribute('role', 'alert'); if (autohide) { setTimeout(() => { if (element.innerHTML === message) element.style.display = 'none'; }, 5000); } }
        function clearStatusMessage(element) { if (!element) return; element.style.display = 'none'; element.innerHTML = ''; element.removeAttribute('role'); }
        function copyToClipboard(targetSelectorOrText, isText = false) { let textToCopy; if (isText) { textToCopy = targetSelectorOrText; } else { if (!targetSelectorOrText) { alert('Copy target not defined.'); return; } const targetElement = querySel(targetSelectorOrText); if (!targetElement) { alert('Element to copy from not found.'); return; } textToCopy = targetElement.textContent; } if (!textToCopy || textToCopy === 'N/A' || textToCopy.includes('placeholder')) { alert('Nothing to copy.'); return; } navigator.clipboard.writeText(textToCopy).then(() => alert('Copied!')).catch(err => { console.error('Failed to copy:', err); alert('Failed to copy.'); }); }
        function toggleButtonLoader(button, show, loadingText = '') { if (!button) return; if (show) { button.dataset.originalHtml = button.innerHTML; button.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> ${loadingText}`; button.disabled = true; } else { if (button.dataset.originalHtml) { button.innerHTML = button.dataset.originalHtml; } button.disabled = false; } }
        function setFieldError(inputElement, message) { if (!inputElement) return; inputElement.classList.add('is-invalid'); const errorEl = inputElement.parentElement.querySelector('.invalid-feedback'); if (errorEl) errorEl.textContent = message; }
        function clearAllErrors(formElement) { if (!formElement) return; formElement.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid')); formElement.querySelectorAll('.invalid-feedback').forEach(el => el.textContent = ''); }
        function formatLargeNumber(num) { if (num >= 100000) return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k'; return Math.floor(num); }
        
        function shareReferral(code) { 
            if (!code || code === 'N/A') { alert('Referral code not available.'); return; } 
            const appName = appSettings.appName || "Battle Raja"; 
            const signupBonus = appSettings.signupBonus || 10; 
            const referralBonus = appSettings.referralBonus || 5; 
            const shareText = `Rivals Battle ⚔\n\nApp Name - ${appName}\nFree Joining ✅\nSign up Bonus - ₹${signupBonus}💸\nPer Refer - ₹${referralBonus} 🌟\nFast Join Free\n\nUse Code - ( ${code} ) Free ₹${signupBonus} 🎁\n\nDownload 👇\nhttps://rivalsbattle.com/`; 
            if (navigator.share) { 
                navigator.share({ title: `Join ${appName}!`, text: shareText }).catch((error) => console.log('Error sharing', error)); 
            } else { 
                const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`; window.open(whatsappUrl, '_blank'); 
            } 
        }

        function generateReferralCode(length = 8) { const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; let result = ''; for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length)); return result; }
        const formatDate = (timestamp) => { if (!timestamp) return ''; const date = new Date(timestamp); const now = new Date(); const diffSeconds = Math.floor((now - date) / 1000); if (diffSeconds < 60) return 'Just now'; const diffMinutes = Math.floor(diffSeconds / 60); if (diffMinutes < 60) return `${diffMinutes}m ago`; const diffHours = Math.floor(diffMinutes / 60); if (diffHours < 24) return `${diffHours}h ago`; const diffDays = Math.floor(diffHours / 24); if (diffDays < 7) return `${diffDays}d ago`; return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }); };
        const formatFullDateTime = (timestamp) => { if (!timestamp) return 'N/A'; const date = new Date(timestamp); return date.toLocaleString('en-IN', { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }); };
        function getTimeRemaining(startTime) { if (!startTime) return 'TBA'; const now = Date.now(); const diff = startTime - now; if (diff <= 0) return 'Starting'; const days = Math.floor(diff / 86400000); const hours = Math.floor((diff % 86400000) / 3600000); const minutes = Math.floor((diff % 3600000) / 60000); let o = ''; if (days > 0) o += `${days}d `; if (hours > 0 || days > 0) o += `${hours}h `; o += `${minutes}m`; return o.trim() || 'Now'; }
        const removePlaceholders = (parentElement) => { if (!parentElement) return; parentElement.classList.remove('placeholder-glow'); parentElement.querySelectorAll('.placeholder').forEach(el => el.remove()); };

        function showSection(sectionId, options = {}) {
            const { addToHistory = true, title = '' } = options;
            
            document.body.classList.toggle('details-active', sectionId === 'match-details-section');

            if (currentSectionId === 'live-support-section' && sectionId !== 'live-support-section') {
                if (adminStatusUnsubscribe) {
                    adminStatusUnsubscribe();
                    adminStatusUnsubscribe = null;
                }
            }

            const targetSection = getElement(sectionId);
            if (!targetSection) {
                showSection(currentUser ? 'home-section' : 'login-section');
                return;
            }
            if (protectedSections.includes(sectionId) && !currentUser) {
                showSection('login-section');
                return;
            }
            if (sectionId === 'login-section' && currentUser) {
                showSection('home-section');
                return;
            }

            elements.sections.forEach(sec => {
                if (sec.id !== sectionId) { // MODIFICATION: Don't hide the target section
                   sec.classList.remove('active');
                   sec.style.display = 'none';
                }
            });

            targetSection.classList.add('active');
            targetSection.style.display = (sectionId === 'login-section') ? 'flex' : 'block';

            currentSectionId = sectionId;

            if (addToHistory && window.history) {
                const currentHash = window.location.hash.substring(1);
                if (currentHash !== sectionId) {
                    history.pushState({ sectionId: sectionId, title: title }, title, `#${sectionId}`);
                }
            }

            document.body.classList.toggle('login-active', sectionId === 'login-section');
            if(sectionId === 'login-section') toggleAuthForm(true);

            updateHeaderForSection(sectionId, options);
             elements.bottomNavItems.forEach(item => {
                const isHomeRelated = ['home-section', 'my-matches-display-section', 'match-details-section'].includes(sectionId);
                let isActive = item.dataset.section === sectionId;
                if(item.dataset.section === 'home-section' && isHomeRelated && !['wallet-section', 'leaderboard-section', 'profile-section'].includes(sectionId)) {
                   isActive = true;
                }
                 if(['wallet-section', 'leaderboard-section', 'profile-section'].includes(sectionId) && item.dataset.section === 'home-section'){
                    isActive = false;
                }
                item.classList.toggle('active', isActive);
            });

            switch (sectionId) {
                case 'home-section': loadHomePageData(); break;
                case 'wallet-section': loadWalletData(); break;
                case 'profile-section': loadProfileData(); break;
                case 'leaderboard-section': loadLeaderboardData(); break;
            }
            window.scrollTo(0, 0);
        }
        
        function updateHeaderForSection(sectionId, options = {}) {
            const mainNavSections = ['home-section', 'wallet-section', 'leaderboard-section', 'profile-section'];
            const isLiveSupport = sectionId === 'live-support-section';
            const showBackButton = !mainNavSections.includes(sectionId) && sectionId !== 'login-section';
             
            if (elements.bottomNav) {
                const shouldHideNav = isLiveSupport || sectionId === 'my-matches-display-section' || sectionId === 'match-details-section';
                elements.bottomNav.style.display = shouldHideNav ? 'none' : 'flex';
            }
            if(elements.headerWalletChip) {
                const shouldHideChip = isLiveSupport || sectionId === 'my-matches-display-section' || sectionId === 'match-details-section';
                elements.headerWalletChip.style.display = shouldHideChip ? 'none' : (currentUser ? 'flex' : 'none');
            }
            if(elements.notificationBtn) {
                 const shouldHideBell = sectionId === 'my-matches-display-section' || sectionId === 'match-details-section';
                elements.notificationBtn.style.display = (isLiveSupport || shouldHideBell) ? 'none' : 'block';
            }
            if (elements.adminStatusIndicator) {
                elements.adminStatusIndicator.style.display = isLiveSupport ? 'flex' : 'none';
            }

            if (elements.headerBackBtn) {
                elements.headerBackBtn.style.display = showBackButton ? 'inline-block' : 'none';
                 elements.headerBackBtn.onclick = () => window.history.back();
            }

            const defaultTitleVisible = !showBackButton;
            const isTournaments = sectionId === 'tournaments-section';
            const isRecharge = sectionId === 'recharge-section';
            const isMyMatches = sectionId === 'my-matches-display-section';
            
            if (elements.headerTitleContainer) {
                elements.headerTitleContainer.style.display = defaultTitleVisible ? 'flex' : 'none';
            }

            if (elements.headerGameTitle) {
                const showGameTitle = isTournaments || isRecharge || isLiveSupport || isMyMatches || sectionId === 'match-details-section';
                elements.headerGameTitle.style.display = showGameTitle ? 'flex' : 'none';
            }

            const dynamicTitleEl = elements.headerDynamicTitleText;
            if (dynamicTitleEl){
                if (isTournaments && currentTournamentGameId) {
                    dynamicTitleEl.textContent = appSettings?.games?.[currentTournamentGameId]?.name || `Game`;
                } else if (isRecharge) {
                    dynamicTitleEl.textContent = 'Recharge';
                } else if (isLiveSupport) {
                    dynamicTitleEl.textContent = appSettings.liveSupportTitle || 'Live Support';
                } else if(isMyMatches) {
                     dynamicTitleEl.textContent = options.title || 'My Matches';
                } else if(sectionId === 'match-details-section'){
                    dynamicTitleEl.textContent = options.title || 'Match Details';
                } else if (defaultTitleVisible && elements.headerUserGreeting) {
                    const nameToShow = userProfile?.displayName?.split(' ')[0] || (currentUser ? currentUser.email?.split('@')[0] : 'Guest') || 'Guest';
                    elements.headerUserGreeting.textContent = nameToShow;
                }
            }
        }
        
        function handlePopState(event) {
            let sectionId;
            let title = '';
            if (event.state && event.state.sectionId) {
                sectionId = event.state.sectionId;
                title = event.state.title || '';
            } else {
                const hash = window.location.hash.substring(1);
                const defaultSection = currentUser ? 'home-section' : 'login-section';
                sectionId = hash && getElement(hash) ? hash : defaultSection;
            }
             showSection(sectionId, { addToHistory: false, title: title });
        }
        
        window.addEventListener('popstate', handlePopState);
        

         function updateGlobalUI(isLoggedIn) { if (elements.headerWalletChip) { elements.headerWalletChip.style.display = isLoggedIn ? 'flex' : 'none'; if (isLoggedIn) elements.headerWalletChip.onclick = () => showSection('wallet-section'); else elements.headerWalletChip.onclick = null; } if (!isLoggedIn && elements.headerUserGreeting) elements.headerUserGreeting.textContent = 'Guest'; if (!isLoggedIn && elements.headerChipBalance) elements.headerChipBalance.textContent = '0'; }

         function populateUserInfo(user, profile) {
            if (!user || !profile) return;
            const displayName = profile.displayName || user.email?.split('@')[0] || 'User';
            const photoURL = profile.photoURL || user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0F172A&color=E2E8F0&bold=true&size=70`;
            const depositBalance = (profile.depositBalance || 0);
            const winningCash = (profile.winningCash || 0);
            const bonusCash = (profile.bonusCash || 0);

            const totalBalance = depositBalance + winningCash + bonusCash;
            const totalMatches = profile.totalMatches || 0;
            const wonMatches = profile.wonMatches || 0;
            const formatCurrency = (amount) => `${amount.toFixed(2)}`;

            if (elements.headerUserGreeting) elements.headerUserGreeting.textContent = displayName.split(' ')[0];

            if (elements.headerChipBalance) {
                elements.headerChipBalance.textContent = formatLargeNumber(totalBalance);
            }

            if (elements.walletTotalBalance) {
                elements.walletTotalBalance.innerHTML = `<span class="currency-symbol">₹</span>${formatCurrency(depositBalance)}`;
                removePlaceholders(elements.walletTotalBalance.closest('.placeholder-glow'));
            }
            if (elements.walletWinningCash) {
                elements.walletWinningCash.innerHTML = `<span class="currency-symbol">₹</span>${formatCurrency(winningCash)}`;
                removePlaceholders(elements.walletWinningCash.closest('.placeholder-glow'));
            }
            if (elements.walletBonusCash) {
                elements.walletBonusCash.innerHTML = `<span class="currency-symbol">₹</span>${formatCurrency(bonusCash)}`;
                removePlaceholders(elements.walletBonusCash.closest('.placeholder-glow'));
            }

            if (elements.withdrawModalBalance) elements.withdrawModalBalance.textContent = `₹${formatCurrency(winningCash)}`;
            if (elements.rechargeBalanceDisplay) elements.rechargeBalanceDisplay.textContent = formatCurrency(depositBalance);
            if (elements.profileAvatar) elements.profileAvatar.src = photoURL;
            if (elements.profileName) {
                elements.profileName.textContent = displayName;
                removePlaceholders(elements.profileName.closest('.placeholder-glow'));
            }
            if (elements.profileEmail) {
                elements.profileEmail.textContent = user.email || 'N/A';
                removePlaceholders(elements.profileEmail.closest('.placeholder-glow'));
            }
            if (elements.profileTotalMatches) {
                elements.profileTotalMatches.textContent = totalMatches;
                removePlaceholders(elements.profileTotalMatches.closest('.placeholder-glow'));
            }
            if (elements.profileWonMatches) {
                elements.profileWonMatches.textContent = wonMatches;
                removePlaceholders(elements.profileWonMatches.closest('.placeholder-glow'));
            }
            if (elements.profileTotalEarnings) {
                elements.profileTotalEarnings.textContent = `₹${formatCurrency(profile.totalEarnings || 0)}`;
                removePlaceholders(elements.profileTotalEarnings.closest('.placeholder-glow'));
            }
            if (elements.modalUserEmail) elements.modalUserEmail.textContent = user.email || 'N/A';
        }

        
        function toggleAuthForm(showLogin) {
            const loginForm = elements.emailLoginForm;
            const signupForm = elements.emailSignupForm;
            if (!loginForm || !signupForm) return;
            clearStatusMessage(elements.loginStatusMessage);
            clearStatusMessage(elements.signupStatusMessage);
            
            loginForm.style.display = showLogin ? 'block' : 'none';
            signupForm.style.display = showLogin ? 'none' : 'block';

            if(showLogin) {
                loginForm.reset();
            } else {
                signupForm.reset();
            }
        }
        
        async function signUpWithEmail() {
            if (!auth) return;
            const nameEl = elements.signupNameInput;
            const emailEl = elements.signupEmailInput;
            const passwordEl = elements.signupPasswordInput;
            const statusEl = elements.signupStatusMessage;
        
            clearStatusMessage(statusEl);
        
            if (!nameEl.value.trim()) return showStatusMessage(statusEl, 'Please enter your name.', 'warning');
            if (!emailEl.value.trim()) return showStatusMessage(statusEl, 'Please enter your email.', 'warning');
            if (!passwordEl.value) return showStatusMessage(statusEl, 'Please create a password.', 'warning');
            if (passwordEl.value.length < 6) return showStatusMessage(statusEl, 'Password must be at least 6 characters.', 'warning');
        
            toggleButtonLoader(elements.signupEmailBtn, true, 'Signing Up...');
            try {
                tempReferralCode = elements.signupReferralCodeInput.value.trim();
                const cred = await createUserWithEmailAndPassword(auth, emailEl.value.trim(), passwordEl.value);
                // The onAuthStateChanged listener will handle the rest.
            } catch (e) {
                console.error("Signup Error:", e);
                let m;
                switch (e.code) {
                    case 'auth/email-already-in-use': m = 'This email is already registered. Please log in.'; break;
                    case 'auth/weak-password': m = 'Password is too weak. Please choose a stronger one.'; break;
                    case 'auth/invalid-email': m = 'The email address is not valid.'; break;
                    case 'auth/network-request-failed': m = 'Network error. Please check your internet connection.'; break;
                    default: m = 'An unexpected error occurred. Please try again.';
                }
                showStatusMessage(statusEl, m, 'danger');
            } finally {
                toggleButtonLoader(elements.signupEmailBtn, false);
            }
        }

        async function loginWithEmail() {
            if (!auth) return;
            const emailEl = elements.loginEmailInput, passwordEl = elements.loginPasswordInput;
            clearStatusMessage(elements.loginStatusMessage);
            if (!emailEl.value.trim()) return showStatusMessage(elements.loginStatusMessage, 'Please enter your email.', 'warning');
            if (!passwordEl.value) return showStatusMessage(elements.loginStatusMessage, 'Please enter your password.', 'warning');
            toggleButtonLoader(elements.loginEmailBtn, true, 'Logging In...');
            try {
                await signInWithEmailAndPassword(auth, emailEl.value.trim(), passwordEl.value);
            } catch (e) {
                console.error("Login Error:", e);
                let m;
                switch (e.code) {
                    case 'auth/user-not-found': case 'auth/wrong-password': case 'auth/invalid-credential': m = 'Invalid email or password. Please try again.'; break;
                    case 'auth/too-many-requests': m = 'Too many failed login attempts. Try again later.'; break;
                    case 'auth/network-request-failed': m = 'Network error. Please check your connection.'; break;
                    case 'auth/user-disabled': m = 'This account has been disabled.'; break;
                    default: m = 'An unexpected error occurred.';
                }
                showStatusMessage(elements.loginStatusMessage, m, 'danger');
            } finally {
                toggleButtonLoader(elements.loginEmailBtn, false);
            }
        }
        
        async function sendResetLink() {
            if (!auth) return;
            const email = elements.loginEmailInput.value.trim();
            const statusEl = elements.loginStatusMessage;
            if (!email) { showStatusMessage(statusEl, 'Please enter your email to receive a reset link.', 'warning'); return; }
            showGlobalLoader(true);
            clearStatusMessage(statusEl);
            try {
                await sendPasswordResetEmail(auth, email);
                showStatusMessage(statusEl, 'Password reset email sent! Check your inbox and spam folder.', 'success', false);
            } catch (e) {
                console.error("Reset Pass Error:", e);
                let message;
                switch (e.code) {
                    case 'auth/user-not-found': case 'auth/invalid-email': message = 'No account was found with this email.'; break;
                    default: message = 'An error occurred. Please try again.';
                }
                showStatusMessage(statusEl, message, 'danger');
            } finally {
                showGlobalLoader(false);
            }
        }

        async function logoutUser() {
            if (!auth) return;
            try {
                showGlobalLoader(true);
                detachAllDbListeners();
                await signOut(auth);
            } catch (e) {
                console.error("Sign Out Error:", e);
                alert(`Logout failed: ${e.message}`);
                if (currentUser) setupRealtimeListeners(currentUser.uid);
                showGlobalLoader(false);
            }
        }

        async function handleAuthStateChange(user) {
            if (!auth || !db) { showGlobalLoader(false); return; }
            detachAllDbListeners();
            currentUser = user;
            const referralCodeFromSignup = tempReferralCode;
            tempReferralCode = null;

            if (user) {
                try {
                    const userRef = ref(db, 'users/' + user.uid);
                    const snapshot = await get(userRef);

                    if (snapshot.exists()) {
                        userProfile = snapshot.val();
                        await update(userRef, { lastLogin: serverTimestamp() });
                    } else {
                        const signupBonus = appSettings.signupBonus ?? 10;
                        const displayName = user.displayName || elements.signupNameInput.value.trim() || user.email?.split('@')[0] || 'User';
                        const mobileInputEl = document.getElementById('signupMobileInputEl');
                        const mobileNumber = mobileInputEl ? mobileInputEl.value.trim() : '';
                        const newUserProfile = {
                            uid: user.uid, displayName: displayName, email: user.email || null, photoURL: user.photoURL || null, mobileNumber: mobileNumber || null,
                            depositBalance: 0, winningCash: 0, bonusCash: signupBonus,
                            totalMatches: 0, wonMatches: 0, totalKills: 0, totalEarnings: 0, referralEarnings: 0,
                            createdAt: serverTimestamp(), referralCode: generateReferralCode(), joinedTournaments: {},
                            isAdmin: false, lastCheckedNotifications: Date.now(), lastLogin: serverTimestamp()
                        };
                        if (referralCodeFromSignup) {
                             const q = query(ref(db, 'users'), orderByChild('referralCode'), equalTo(referralCodeFromSignup));
                             const referrerSnapshot = await get(q);
                             if (referrerSnapshot.exists()) {
                                 const referrerData = referrerSnapshot.val();
                                 const referrerId = Object.keys(referrerData)[0];
                                 const referrerProfile = referrerData[referrerId];
                                 const pendingReferralRef = push(ref(db, 'pendingReferrals'));
                                 await set(pendingReferralRef, {
                                     referrerUid: referrerId, referrerEmail: referrerProfile.email,
                                     referredUid: user.uid, referredEmail: user.email,
                                     status: 'pending', timestamp: serverTimestamp()
                                 });
                                 newUserProfile.referredBy = referrerId;
                             }
                        }
                        await set(userRef, newUserProfile);
                        userProfile = newUserProfile;
                        if (signupBonus > 0) await recordTransaction(user.uid, 'signup_bonus', signupBonus, `Welcome Bonus`);
                    }

                    populateUserInfo(user, userProfile);
                    setupRealtimeListeners(user.uid);
                    updateGlobalUI(true);
                    loadAndDisplayNotifications();

                    let targetSection = 'home-section';
                    const initialHash = window.location.hash.substring(1);
                    if (initialHash && getElement(initialHash) && protectedSections.includes(initialHash)) targetSection = initialHash;
                    
                    showSection(targetSection, { addToHistory: false });
                    history.replaceState({ sectionId: targetSection }, '', `#${targetSection}`);
                    
                } catch (error) {
                    console.error("Profile handling error:", error);
                    alert("Error loading your profile. Logging out. " + error.message);
                    try { await logoutUser(); } catch (logoutErr) {}
                } finally {
                    showGlobalLoader(false);
                }
            } else {
                currentUser = null;
                userProfile = {};
                updateGlobalUI(false);
                showSection('login-section', { addToHistory: false });
                history.replaceState({ sectionId: 'login-section' }, '', '#login-section');
                showGlobalLoader(false);
            }
        }


        function applyTheme(theme) { if (!theme) return; const root = document.documentElement; for (const [key, value] of Object.entries(theme)) if (value) root.style.setProperty(`--${key}`, value); }

        async function loadAppSettings() {
            try {
                const settingsRef = ref(db, 'settings');
                const snapshot = await get(settingsRef);
                appSettings = snapshot.exists() ? snapshot.val() : {};
                if (appSettings.logoUrl) elements.appLogo.src = appSettings.logoUrl;
                const loginLogo = document.querySelector('.login-logo');
                if (loginLogo && (appSettings.loginLogoUrl || appSettings.logoUrl)) loginLogo.src = appSettings.loginLogoUrl || appSettings.logoUrl;
                if (appSettings.minWithdraw && elements.minWithdrawAmount) elements.minWithdrawAmount.textContent = appSettings.minWithdraw;
                if (appSettings.theme) applyTheme(appSettings.theme);
                if (elements.promoCodeMessageEl && appSettings.promoCodeMessage) elements.promoCodeMessageEl.textContent = appSettings.promoCodeMessage;
            } catch (e) {
                console.error("Settings load failed", e);
            }
        }

        function loadHomePageData() { if (!currentUser) { if(elements.promotionSlider?.querySelector('.swiper-wrapper')) elements.promotionSlider.querySelector('.swiper-wrapper').innerHTML = ''; if(elements.gamesList) elements.gamesList.innerHTML = ''; return; } loadPromotions(); loadGames(); }
        async function loadPromotions() {
            if (!elements.promotionSlider) return;
            const sliderWrapper = elements.promotionSlider.querySelector('.swiper-wrapper');
            if (!sliderWrapper) return;
            sliderWrapper.classList.add('placeholder-glow');
            sliderWrapper.innerHTML = `<div class="swiper-slide"><span class="placeholder" style="display: block; width: 100%; height: 100%; border-radius: 10px;"></span></div>`;
            try {
                const snapshot = await get(ref(db, 'promotions'));
                const promotions = snapshot.val() || {};
                const activePromotions = Object.values(promotions).filter(p => p.imageUrl);
                removePlaceholders(elements.promotionSlider);
                sliderWrapper.innerHTML = '';
                if (activePromotions.length > 0) {
                    elements.promotionSlider.style.display = 'block';
                    activePromotions.forEach(promo => {
                        const slide = document.createElement('div');
                        slide.className = 'swiper-slide';
                        slide.innerHTML = promo.link ? `<a href="${promo.link}" target="_blank"><img loading="lazy" decoding="async" fetchpriority="low" src="${promo.imageUrl}" alt="Promo"></a>` : `<img loading="lazy" decoding="async" fetchpriority="low" src="${promo.imageUrl}" alt="Promo">`;
                        sliderWrapper.appendChild(slide);
                    });
                    if (swiperInstance) swiperInstance.destroy(true, true);
                    swiperInstance = new Swiper(elements.promotionSlider, { loop: activePromotions.length > 1, autoplay: { delay: 3500, disableOnInteraction: false }, pagination: { el: '.swiper-pagination', clickable: true }, slidesPerView: 1, spaceBetween: 14 });
                } else {
                    elements.promotionSlider.style.display = 'none';
                }
            } catch (e) {
                console.error("Promo load failed:", e);
                removePlaceholders(elements.promotionSlider);
                sliderWrapper.innerHTML = '<p class="text-danger text-center small p-3">Could not load promotions.</p>';
            }
        }
        async function loadGames() { if (!elements.gamesList) return; elements.gamesList.classList.add('placeholder-glow'); elements.gamesList.innerHTML = `<div class="col-4"><div class="game-card custom-card"><span class="placeholder d-block" style="height: 110px; border-radius: 8px;"></span><span class="placeholder d-block mt-2 col-8 mx-auto" style="height: 20px;"></span></div></div>`.repeat(3); try { const snapshot = await get(ref(db, 'games')); const games = snapshot.val() || {}; const activeGames = Object.entries(games).filter(([, game]) => game.imageUrl && game.name).sort(([, a], [, b]) => (a.order || 0) - (b.order || 0)); removePlaceholders(elements.gamesList); elements.gamesList.innerHTML = ''; if (activeGames.length > 0) { if (!appSettings.games) appSettings.games = {}; activeGames.forEach(([id, game]) => { appSettings.games[id] = { name: game.name }; const col = document.createElement('div'); col.className = 'col-4'; col.innerHTML = `<div class="game-card custom-card" data-game-id="${id}" data-game-name="${game.name}"><img loading="lazy" decoding="async" fetchpriority="low" src="${game.imageUrl}" alt="${game.name}"><span>${game.name}</span></div>`; col.querySelector('.game-card').addEventListener('click', () => { currentTournamentGameId = id; loadTournamentsForGame(id, game.name); }); elements.gamesList.appendChild(col); }); } else { elements.gamesList.innerHTML = '<p class="text-secondary text-center col-12">No games available.</p>'; } } catch (e) { console.error("Games load failed:", e); removePlaceholders(elements.gamesList); elements.gamesList.innerHTML = '<p class="text-danger text-center col-12">Could not load games.</p>'; } }
        function loadTournamentsForGame(gameId, gameName) { if (!elements.tournamentsSection) return; currentTournamentGameId = gameId; elements.tournamentTabs.forEach(t => t.classList.remove('active')); querySel('.tournament-tabs .tab-item[data-status="upcoming"]')?.classList.add('active'); showSection('tournaments-section', { title: gameName }); filterTournaments(gameId, 'upcoming'); }
        async function filterTournaments(gameId, status) { if (!elements.tournamentsListContainer) return; elements.tournamentsListContainer.innerHTML = ''; elements.tournamentsListContainer.classList.add('placeholder-glow'); elements.tournamentsListContainer.innerHTML = `<div class="tournament-card placeholder-glow mb-3"><div class="tournament-card-content"><span class="placeholder col-6"></span><span class="placeholder col-12 mt-2"></span><span class="placeholder col-10 mt-2"></span><div class="d-flex justify-content-between mt-3"><span class="placeholder col-4 h-30"></span><span class="placeholder col-4 h-30"></span></div></div></div>`; elements.noTournamentsMessage.style.display = 'none'; try { const tQuery = query(ref(db, 'tournaments'), orderByChild('gameId'), equalTo(gameId)); const s = await get(tQuery); const allT = s.val() || {}; const fT = Object.entries(allT).filter(([, t]) => t.status === status).sort(([, tA], [, tB]) => (tA.startTime || 0) - (tB.startTime || 0)); removePlaceholders(elements.tournamentsListContainer); elements.tournamentsListContainer.innerHTML = ''; if (fT.length > 0) { fT.forEach(([tId, t]) => { const card = createTournamentCardElement(tId, t); elements.tournamentsListContainer.appendChild(card); }); } else { elements.noTournamentsMessage.style.display = 'block'; elements.noTournamentsMessage.textContent = `No ${status} tournaments found.`; } } catch (e) { console.error(`Tournaments filter failed (${status}):`, e); removePlaceholders(elements.tournamentsListContainer); elements.tournamentsListContainer.innerHTML = '<p class="text-danger tc mt-4">Could not load tournaments.</p>'; elements.noTournamentsMessage.style.display = 'none'; } }
        function createTournamentCardElement(tId, t) {
            const card = document.createElement('div');
            card.className = 'tournament-card';
            card.dataset.tournamentId = tId;

            const bannerUrl = t.bannerUrl || 'https://via.placeholder.com/400x225/1E293B/94A3B8?text=16:9+Banner';
            const eFee = t.entryFee || 0; const pkPrize = t.perKillPrize || 0; const pPool = t.prizePool || 0; const sTime = t.startTime ? new Date(t.startTime) : null; const sTimeLoc = sTime ? sTime.toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }) : 'TBA'; const regC = t.registeredPlayers ? Object.keys(t.registeredPlayers).length : 0; const maxP = t.maxPlayers || 0; const spotsL = maxP > 0 ? Math.max(0, maxP - regC) : Infinity; const isF = maxP > 0 && spotsL <= 0; const isJ = currentUser && userProfile?.joinedTournaments?.[tId]; const canJ = !isJ && !isF && t.status === 'upcoming';
            let timerTxt = t.status?.toUpperCase() || 'N/A';
            if (t.status === 'upcoming' && sTime) timerTxt = getTimeRemaining(t.startTime);
            else if (t.status === 'ongoing') timerTxt = 'LIVE';
            else if (t.status === 'completed' || t.status === 'result') timerTxt = 'ENDED';

            let spotsTxt = 'Unlimited Slots';
            let progP = 0;
            if (maxP > 0) {
                spotsTxt = `<span class="${spotsL <= 5 ? 'text-danger' : 'text-accent'}">${spotsL}</span> Slots Left (${regC}/${maxP})`;
                progP = Math.min(100, (regC / maxP) * 100);
            }

            let joinBtnHtml = '', idPassBtn = '', chatBtnHtml = '';
            if (isJ) {
                joinBtnHtml = `<button class="btn btn-custom btn-sm btn-joined" disabled><i class="bi bi-check-circle-fill"></i> Joined</button>`;
                if (t.status === 'ongoing' || (t.status === 'upcoming' && t.showIdPass && sTime && Date.now() > sTime.getTime() - 900000)) {
                    idPassBtn = `<button class="btn btn-custom btn-idpass w-100 mt-2 btn-sm" data-tournament-id="${tId}"><i class="bi bi-key-fill"></i> View ID & Pass</button>`;
                }
                if(t.status === 'ongoing' || t.status === 'upcoming') {
                    chatBtnHtml = `<button class="btn btn-custom btn-custom-secondary btn-sm btn-chat" data-tournament-id="${tId}" data-tournament-name="${t.name || 'Tournament'}"><i class="bi bi-chat-dots-fill"></i> Chat</button>`
                }
            } else if (canJ) {
                joinBtnHtml = `<button class="btn btn-custom btn-sm btn-custom-accent btn-join" data-tournament-id="${tId}" data-fee="${eFee}" data-mode="${t.mode || 'Solo'}">₹${eFee} Join <i class="bi bi-arrow-right-short"></i></button>`;
            } else {
                let disR = t.status !== 'upcoming' ? t.status?.toUpperCase() : (isF ? 'Full' : 'Closed');
                joinBtnHtml = `<button class="btn btn-custom btn-sm btn-disabled" disabled>${disR || 'N/A'}</button>`;
            }

            card.innerHTML = `<img loading="lazy" decoding="async" fetchpriority="low" src="${bannerUrl}" alt="Tournament Banner" class="tournament-banner-image"><div class="tournament-card-content"><div class="tournament-card-header"><div class="tournament-card-tags">${t.mode ? `<span>${t.mode}</span>` : ''}${t.map ? `<span>${t.map}</span>` : ''}${t.tags ? (Array.isArray(t.tags) ? t.tags.map(tag => `<span>${tag}</span>`).join('') : Object.values(t.tags).map(tag => `<span>${tag}</span>`).join('')) : ''}</div><div class="tournament-card-timer">${timerTxt}</div></div><h3 class="tournament-card-title">${t.icon ? `<i class="${t.icon}"></i>` : '<i class="bi bi-joystick text-accent"></i>'} ${t.name || 'Tournament'}</h3><p class="small text-secondary mb-2"><i class="bi bi-calendar-event"></i> ${sTimeLoc}</p><div class="tournament-card-info"><div class="info-item"><span>Prize Pool</span><strong><i class="bi bi-trophy-fill text-accent prize-icon"></i> ₹${pPool}</strong></div><div class="info-item"><span>Per Kill</span><strong>₹${pkPrize}</strong></div><div class="info-item"><span>Entry Fee</span><strong class="${eFee > 0 ? 'text-info' : ''}">${eFee > 0 ? `₹${eFee}` : 'Free'}</strong></div></div><div class="tournament-card-spots">${spotsTxt}${maxP > 0 ? `<div class="progress mt-1" style="height: 6px;"><div class="progress-bar bg-warning" role="progressbar" style="width: ${progP}%"></div></div>` : ''}</div><div class="tournament-card-actions"><button class="btn btn-custom btn-custom-secondary btn-sm btn-details" data-tournament-id="${tId}">Details</button>${chatBtnHtml}${joinBtnHtml}</div>${idPassBtn}</div>`;
            card.innerHTML = `<img loading="lazy" decoding="async" fetchpriority="low" src="${bannerUrl}" alt="Tournament Banner" class="tournament-banner-image"><div class="tournament-card-content"><div class="tournament-card-header"><div class="tournament-card-tags">${t.mode ? `<span>${t.mode}</span>` : ''}${t.map ? `<span>${t.map}</span>` : ''}${t.tags ? (Array.isArray(t.tags) ? t.tags.map(tag => `<span>${tag}</span>`).join('') : Object.values(t.tags).map(tag => `<span>${tag}</span>`).join('')) : ''}</div><div class="tournament-card-timer">${timerTxt}</div></div><h3 class="tournament-card-title">${t.icon ? `<i class="${t.icon}"></i>` : '<i class="bi bi-joystick text-accent"></i>'} ${t.name || 'Tournament'}</h3><p class="small text-secondary mb-2"><i class="bi bi-calendar-event"></i> ${sTimeLoc}</p><div class="tournament-card-info"><div class="info-item"><span>Prize Pool</span><strong><i class="bi bi-trophy-fill text-accent prize-icon"></i> ₹${pPool}</strong></div><div class="info-item"><span>Per Kill</span><strong>₹${pkPrize}</strong></div><div class="info-item"><span>Entry Fee</span><strong class="${eFee > 0 ? 'text-info' : ''}">${eFee > 0 ? `₹${eFee}` : 'Free'}</strong></div></div><div class="tournament-card-spots">${spotsTxt}${maxP > 0 ? `<div class="progress mt-1" style="height: 6px;"><div class="progress-bar bg-warning" role="progressbar" style="width: ${progP}%"></div></div>` : ''}</div><div class="tournament-card-actions"><button class="btn btn-custom btn-custom-secondary btn-sm btn-details" data-tournament-id="${tId}">Details</button>${chatBtnHtml}${joinBtnHtml}</div>${idPassBtn}</div>`;
            const openDetails = () => showMatchDetailsPage(tId);
            card.addEventListener('click', (e) => {
                const isButton = e.target.closest('.btn-join, .btn-details, .btn-idpass, .btn-chat');
                if (isButton) return;
                openDetails();
            });

            card.querySelector('.btn-join')?.addEventListener('click', handleJoinTournamentClick);
            card.querySelector('.btn-details')?.addEventListener('click', (e) => showMatchDetailsPage(e.currentTarget.dataset.tournamentId));
            card.querySelector('.btn-idpass')?.addEventListener('click', handleIdPasswordClick);
            card.querySelector('.btn-chat')?.addEventListener('click', (e) => openTournamentChat(e.currentTarget.dataset.tournamentId, e.currentTarget.dataset.tournamentName));
            return card;
        }

        




function renderJoinedPlayersList(t){
  const container = document.getElementById('joinedPlayersList');
  const section = document.getElementById('joinedPlayersSection');
  const headingLeft = document.getElementById('joinedPlayersLeftHeading');
  const headingRight = document.getElementById('joinedPlayersRightHeading');
  if(!container || !section){ return; }
  container.innerHTML = '';
  section.style.display = 'none';
  if(!t || !t.registeredPlayers){ return; }

  const entries = Object.entries(t.registeredPlayers);
  if(!entries.length){ return; }

  const mode = (t.mode || '').toLowerCase();

  // headings: left = Slot, right = Player/Team
  if(headingLeft && headingRight){
    if(mode === 'squad'){
      headingLeft.textContent = 'Slot';
      headingRight.textContent = 'Team Name';
    } else {
      headingLeft.textContent = 'Slot';
      headingRight.textContent = 'Player';
    }
  }

  // sort by numeric slotNumber ascending
  const sorted = entries.slice().sort(([,a],[,b]) => {
    const sa = a && a.slotNumber ? parseInt(a.slotNumber,10) : Infinity;
    const sb = b && b.slotNumber ? parseInt(b.slotNumber,10) : Infinity;
    return sa - sb;
  });

  const parts = [];
  sorted.forEach(([uid, reg]) => {
    if(!reg) return;
    const teammates = reg.teammates || [];
    let name = reg.username || 'Player';

    if(mode === 'squad'){
      // teammates[3] = Your Team Name (5th player) as per your setup
      if(teammates[3] && teammates[3].username){
        name = teammates[3].username;
      }
    }

    const slotNumber = reg.slotNumber ? parseInt(reg.slotNumber,10) : null;
    const slot = slotNumber && !Number.isNaN(slotNumber) ? String(slotNumber) : '?';

    parts.push(`<div style="display:flex;justify-content:space-between;gap:8px;padding:4px 0;">
                  <span style="font-weight:600;font-size:0.98rem;color:#f9fafb;">${slot}</span>
                  <span style="font-size:0.98rem;color:#f9fafb;">${name}</span>
                </div>`);
  });

  if(!parts.length){ return; }
  container.innerHTML = parts.join('');
  section.style.display = 'block';
}

function updateDetailsSlotBox(t){
  const b=document.getElementById('detailsSlotBox');
  const e=document.getElementById('detailsSlotEl');
  if(!b||!e)return;
  b.style.display='none'; e.textContent='';
  if(!currentUser||!t||!t.registeredPlayers)return;
  const r=t.registeredPlayers[currentUser.uid];
  if(r&&r.slotNumber){ b.style.display='block'; e.textContent='#'+r.slotNumber; }
}

async function showMatchDetailsPage(tId){
            if (!tId) return;
            showGlobalLoader(true);
            try {
                const s = await get(ref(db, `tournaments/${tId}`));
                 if (!s.exists()) throw new Error("Match not found");
                const t = s.val();
                showSection('match-details-section', { title: t.name || 'Match Details' });
                elements.detailsBannerEl.src = t.bannerUrl || 'https://via.placeholder.com/600x400/1E293B/94A3B8?text=Banner';
                elements.detailsTitleEl.textContent = t.name || 'Tournament';
                elements.detailsSubtitleEl.textContent = "";
                elements.detailsModeEl.textContent = t.mode || 'N/A';
                elements.detailsEntryFeeEl.innerHTML = t.entryFee > 0 ? `₹${t.entryFee}`: 'Free';
                elements.detailsScheduleEl.textContent = t.startTime ? formatFullDateTime(t.startTime) : 'TBA';
                elements.detailsPrizePoolEl.innerHTML = `<i class="bi bi-trophy-fill text-accent"></i> ₹${t.prizePool || 0}`;
                elements.detailsPerKillEl.innerHTML = `<i class="bi bi-fire text-danger"></i> ₹${t.perKillPrize || 0}`;
                elements.detailsRulesEl.innerHTML = (t.description || 'Standard rules apply.').replace(/\n/g, '<br>');
                updateDetailsSlotBox(t);
                renderJoinedPlayersList(t);
                
                const isJ = currentUser && userProfile?.joinedTournaments?.[tId];
                const regC = t.registeredPlayers ? Object.keys(t.registeredPlayers).length : 0;
                const spotsL = t.maxPlayers > 0 ? Math.max(0, t.maxPlayers - regC) : Infinity;
                const isF = t.maxPlayers > 0 && spotsL <= 0;
                const canJ = !isJ && !isF && t.status === 'upcoming';
                const joinBtn = elements.detailsJoinBtn;
                toggleButtonLoader(joinBtn, false);
                joinBtn.className = 'btn btn-custom btn-custom-accent w-100';
                if (isJ) {
                     joinBtn.textContent = 'Joined';
                     joinBtn.disabled = true;
                     joinBtn.classList.add('btn-joined');
                     joinBtn.classList.remove('btn-custom-accent');
                } else if(canJ){
                    joinBtn.textContent = `₹${t.entryFee || 0} Join Match`;
                    joinBtn.disabled = false;
                    joinBtn.dataset.tournamentId = tId;
                    joinBtn.dataset.fee = t.entryFee || 0;
                    joinBtn.dataset.mode = t.mode || 'Solo';
                    joinBtn.onclick = handleJoinTournamentClick;
                } else {
                     joinBtn.textContent = t.status !== 'upcoming' ? t.status?.toUpperCase() : (isF ? 'FULL' : 'CLOSED');
                     joinBtn.disabled = true;
                }
            } catch(e) {
                 console.error("Failed to load match details", e);
                 elements.detailsTitleEl.textContent = "Error";
                 elements.detailsSubtitleEl.textContent = e.message;
                 toggleButtonLoader(elements.detailsJoinBtn, false);
                 elements.detailsJoinBtn.textContent = "Error";
                 elements.detailsJoinBtn.disabled = true;
            } finally {
                showGlobalLoader(false);
            }
        }

        function loadWalletData() { if (currentUser) loadRecentTransactions(); }
        function loadProfileData() { /* Profile data is real-time */ }
        
        async function loadLeaderboardData() {
            if (!currentUser) return;
            const listEl = elements.leaderboardListEl, emptyMsgEl = elements.noLeaderboardMessageEl;
            listEl.innerHTML = `<div class="leaderboard-item placeholder-glow mb-2"><span class="placeholder col-1" style="height: 30px; width: 35px;"></span><span class="placeholder col-2 ms-2 me-3" style="height: 45px; width: 45px; border-radius: 50%;"></span><div style="flex-grow: 1;"><span class="placeholder col-6 d-block" style="height: 20px;"></span></div><span class="placeholder col-3" style="height: 20px;"></span></div>`.repeat(5);
            emptyMsgEl.style.display = 'none';

            try {
                const leaderboardQuery = query(ref(db, 'users'), orderByChild('leaderboardRank'), limitToFirst(100));
                const snapshot = await get(leaderboardQuery);
                removePlaceholders(listEl);
                listEl.innerHTML = '';
                if (!snapshot.exists()) { emptyMsgEl.style.display = 'block'; return; }
                const leaderboardData = [];
                snapshot.forEach(childSnapshot => { const user = childSnapshot.val(); if (user && user.leaderboardRank) leaderboardData.push(user); });
                leaderboardData.sort((a, b) => a.leaderboardRank - b.leaderboardRank);
                if (leaderboardData.length === 0) { emptyMsgEl.style.display = 'block'; return; }
                leaderboardData.forEach(user => {
                    const displayName = user.displayName || user.email?.split('@')[0] || 'User';
                    const photoURL = user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=1E293B&color=E2E8F0&bold=true&size=45`;
                    const itemEl = document.createElement('div');
                    itemEl.className = 'leaderboard-item';
                    itemEl.innerHTML = `<div class="leaderboard-rank">#${user.leaderboardRank}</div><img loading="lazy" decoding="async" fetchpriority="low" src="${photoURL}" alt="${displayName}" class="leaderboard-avatar"><div class="leaderboard-user-info"><div class="leaderboard-name">${displayName}</div></div><div class="leaderboard-earnings">₹${(user.leaderboardDisplayEarnings || 0).toLocaleString('en-IN')}</div>`;
                    listEl.appendChild(itemEl);
                });
            } catch(error) {
                 console.error("Error loading leaderboard:", error);
                 listEl.innerHTML = `<p class="text-center text-danger">Could not load leaderboard. ${error.message}</p>`;
            }
        }

        async function recordTransaction(userId, type, amount, description, details = {}) { if (!userId) return; const transactionRef = ref(db, `transactions/${userId}`); const newTransaction = { type, amount, description, timestamp: serverTimestamp(), ...details }; try { await push(transactionRef, newTransaction); } catch (e) { console.error("Transaction record failed:", e); } }
        async function loadRecentTransactions() { if (!currentUser || !elements.recentTransactionsList) return; const limit = 5; elements.recentTransactionsList.innerHTML = ''; elements.recentTransactionsList.classList.add('placeholder-glow'); for (let i = 0; i < 3; i++) elements.recentTransactionsList.innerHTML += `<div class="custom-card p-2 mb-2 placeholder-glow"><div class="d-flex justify-content-between"><span class="placeholder col-5 h-16"></span><span class="placeholder col-3 h-16"></span></div><div class="small text-secondary mt-1"><span class="placeholder col-6 h-14"></span></div></div>`; if (elements.noTransactionsMessage) { elements.noTransactionsMessage.style.display = 'block'; elements.noTransactionsMessage.textContent = 'Loading transactions...'; } try { const transRef = query(ref(db, `transactions/${currentUser.uid}`), limitToLast(limit)); const s = await get(transRef); const transactions = s.val() || {}; const sortedT = Object.values(transactions).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)); removePlaceholders(elements.recentTransactionsList); elements.recentTransactionsList.innerHTML = ''; if (sortedT.length > 0) { if (elements.noTransactionsMessage) elements.noTransactionsMessage.style.display = 'none'; sortedT.forEach(t => { const item = document.createElement('div'); item.className = 'custom-card p-2 mb-2 d-flex justify-content-between align-items-center'; const isCr = t.amount > 0; const amt = `${isCr ? '+' : ''}<span class="currency-symbol">₹</span>${Math.abs(t.amount || 0).toFixed(2)}`; const time = t.timestamp ? new Date(t.timestamp).toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }) : 'N/A'; item.innerHTML = `<div><div class="small fw-bold">${t.description || t.type || 'Txn'}</div><div class="small text-secondary">${time}</div></div><div class="fw-bold ${isCr ? 'text-success' : 'text-danger'}">${amt}</div>`; elements.recentTransactionsList.appendChild(item); }); } else if (elements.noTransactionsMessage) { elements.noTransactionsMessage.style.display = 'block'; elements.noTransactionsMessage.textContent = 'No recent transactions.'; } } catch (e) { console.error("Transactions load failed:", e); removePlaceholders(elements.recentTransactionsList); elements.recentTransactionsList.innerHTML = '<p class="text-danger tc">Could not load transactions.</p>'; if (elements.noTransactionsMessage) elements.noTransactionsMessage.style.display = 'none'; } }
        function handleWithdrawClick() { if (!currentUser || !elements.withdrawModalInstance) return; const wc = userProfile.winningCash || 0; const minW = appSettings?.minWithdraw || 50; elements.minWithdrawAmount.textContent = minW; elements.withdrawModalBalance.textContent = `₹${wc.toFixed(2)}`; elements.withdrawAmountInput.value = ''; elements.withdrawAmountInput.min = minW; elements.withdrawMethodInput.value = userProfile.upiId || ''; clearStatusMessage(elements.withdrawStatusMessage); elements.withdrawModalInstance.show(); }
        async function submitWithdrawRequestHandler() { if (!currentUser || !elements.withdrawModalInstance) return; const amt = parseFloat(elements.withdrawAmountInput.value); const mtd = elements.withdrawMethodInput.value.trim(); const wc = userProfile.winningCash || 0; const minW = appSettings?.minWithdraw || 50; clearStatusMessage(elements.withdrawStatusMessage); if (isNaN(amt) || amt <= 0) { showStatusMessage(elements.withdrawStatusMessage, 'Invalid amount.', 'warning'); return; } if (amt < minW) { showStatusMessage(elements.withdrawStatusMessage, `Min withdraw ₹${minW}.`, 'warning'); return; } if (amt > wc) { showStatusMessage(elements.withdrawStatusMessage, 'Insufficient winning balance.', 'warning'); return; } if (!mtd) { showStatusMessage(elements.withdrawStatusMessage, 'Enter withdrawal method.', 'warning'); return; } elements.submitWithdrawRequestBtn.disabled = true; elements.submitWithdrawRequestBtn.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Sending...'; let transactionCommitted = false; try { const uRef = ref(db, `users/${currentUser.uid}`); const txResult = await runTransaction(uRef, (prof) => { if (prof) { if ((prof.winningCash || 0) >= amt) { prof.winningCash = (prof.winningCash || 0) - amt; return prof; } else { throw new Error("Insufficient winning balance (Tx)."); } } else { throw new Error("Profile missing (Tx)."); } }); if (!txResult.committed) { throw new Error("Failed to update balance. Please try again."); } transactionCommitted = true; const wrRef = ref(db, 'withdrawals'); const newReq = { userId: currentUser.uid, userName: userProfile.displayName || currentUser.email, amount: amt, methodDetails: { methodName: mtd.includes('@') ? 'UPI' : 'Bank/Other', accountInfo: mtd }, status: 'pending', requestTimestamp: serverTimestamp(), userEmail: currentUser.email || 'N/A' }; const newWithdrawalRef = await push(wrRef, newReq); await recordTransaction(currentUser.uid, 'withdraw_request', -amt, `Withdrawal Request to ${mtd}`, { withdrawalId: newWithdrawalRef.key }); showStatusMessage(elements.withdrawStatusMessage, 'Request submitted successfully!', 'success', false); setTimeout(() => { if (elements.withdrawModalInstance) elements.withdrawModalInstance.hide(); }, 2500); if (currentSectionId === 'wallet-section') loadRecentTransactions(); } catch (e) { console.error("Withdraw error:", e); showStatusMessage(elements.withdrawStatusMessage, `Error: ${e.message}`, 'danger'); if (transactionCommitted) { const uRef = ref(db, `users/${currentUser.uid}`); try { await runTransaction(uRef, (prof) => { if (prof) { prof.winningCash = (prof.winningCash || 0) + amt; } return prof; }); await recordTransaction(currentUser.uid, 'withdraw_failed_refund', amt, `Refund Failed Withdrawal Request`); showStatusMessage(elements.withdrawStatusMessage, `Error: ${e.message}. Amount refunded.`, 'danger'); } catch (refundError) { console.error("CRITICAL: FAILED TO REFUND WINNING CASH!", refundError); showStatusMessage(elements.withdrawStatusMessage, `Error: ${e.message}. CRITICAL: Failed to refund amount! Contact support.`, 'danger', false); } } } finally { elements.submitWithdrawRequestBtn.disabled = false; elements.submitWithdrawRequestBtn.innerHTML = 'Submit Request'; } }
        async function handleIdPasswordClick(event) {
    if (!elements.idPasswordModalInstance) return;
    const tId = event.currentTarget.dataset.tournamentId;
    if (!tId || !currentUser || !userProfile?.joinedTournaments?.[tId]) {
        alert("Join the tournament first or refresh the page.");
        return;
    }

    elements.roomIdDisplay.innerHTML = '<span class="placeholder col-6"></span>';
    elements.roomPasswordDisplay.innerHTML = '<span class="placeholder col-6"></span>';

    const slotEl = document.getElementById('roomSlotDisplayEl');
    if (slotEl) {
        slotEl.innerHTML = '<span class="placeholder col-4"></span>';
    }

    elements.idPasswordModalInstance.show();

    try {
        const s = await get(ref(db, `tournaments/${tId}`));

        const roomIdBox = elements.roomIdDisplay.closest('.placeholder-glow');
        const roomPassBox = elements.roomPasswordDisplay.closest('.placeholder-glow');
        if (roomIdBox) removePlaceholders(roomIdBox);
        if (roomPassBox) removePlaceholders(roomPassBox);
        if (slotEl) {
            const slotBox = slotEl.closest('.placeholder-glow');
            if (slotBox) removePlaceholders(slotBox);
        }

        if (s.exists()) {
            const t = s.val();

            elements.roomIdDisplay.textContent = (t.showIdPass && t.roomId) ? t.roomId : 'Not updated yet';
            elements.roomPasswordDisplay.textContent = (t.showIdPass && t.roomPassword) ? t.roomPassword : 'Not updated yet';

            let slotText = 'Not available';
            if (t && t.registeredPlayers && currentUser && t.registeredPlayers[currentUser.uid]) {
                const reg = t.registeredPlayers[currentUser.uid];
                const rawSlot = reg.slotNumber ?? reg.slot;
                if (rawSlot !== undefined && rawSlot !== null && rawSlot !== '') {
                    const num = parseInt(rawSlot, 10);
                    if (!Number.isNaN(num)) {
                        slotText = `#${num}`;
                    }
                }
            }
            if (slotEl) slotEl.textContent = slotText;
        } else {
            elements.roomIdDisplay.textContent = 'Not Found';
            elements.roomPasswordDisplay.textContent = 'Not Found';
            if (slotEl) slotEl.textContent = 'Not available';
        }
    } catch (e) {
        console.error("ID/Pass fetch error:", e);

        const roomIdBox = elements.roomIdDisplay.closest('.placeholder-glow');
        const roomPassBox = elements.roomPasswordDisplay.closest('.placeholder-glow');
        if (roomIdBox) removePlaceholders(roomIdBox);
        if (roomPassBox) removePlaceholders(roomPassBox);
        if (slotEl) {
            const slotBox = slotEl.closest('.placeholder-glow');
            if (slotBox) removePlaceholders(slotBox);
            slotEl.textContent = 'Error';
        }

        elements.roomIdDisplay.textContent = 'Error';
        elements.roomPasswordDisplay.textContent = 'Error';
    }
}
async function handlePolicyClick(event) { if (!elements.policyModalInstance) return; event.preventDefault(); const policyType = event.currentTarget.dataset.policy; if (!policyType) return; let title = '', modalBodyContent = '<div class="text-center p-5"><div class="spinner-border spinner-border-sm"></div></div>'; elements.policyModalBody.innerHTML = modalBodyContent; switch (policyType) { case 'privacy': title = 'Privacy Policy'; modalBodyContent = appSettings.policyPrivacy || 'Content not available.'; break; case 'terms': title = 'Terms and Conditions'; modalBodyContent = appSettings.policyTerms || 'Content not available.'; break; case 'refund': title = 'Refund and Cancellation'; modalBodyContent = appSettings.policyRefund || 'Content not available.'; break; case 'fairPlay': title = 'Fair Play Policy'; modalBodyContent = appSettings.policyFairPlay || 'Content not available.'; break; 
                    case 'about': title = 'About Us'; modalBodyContent = appSettings.policyAboutUs || 'Content not available.'; break;
                    case 'updates': title = 'Updates'; modalBodyContent = appSettings.policyUpdates || 'Content not available.'; break;
                    case 'partner': title = 'Partner'; modalBodyContent = appSettings.policyPartner || 'Content not available.'; break;
case 'refer': title = 'Refer & Earn'; if (!currentUser) { alert("Login to view referral."); return; } const refCode = userProfile.referralCode || 'N/A'; modalBodyContent = `<div class="text-center"><h4>Refer Friends!</h4><p class="text-secondary">Share code & earn!</p><div class="my-4 p-3" style="background: var(--primary-bg); border-radius: 8px;"><p class="small text-secondary mb-1">Your Code:</p><h3 class="text-accent referral-code" id="referralCodeDisplay">${refCode}</h3><div class="mt-3"><button class="btn btn-sm btn-custom btn-custom-secondary me-2 copy-btn" data-target="#referralCodeDisplay"><i class="bi bi-clipboard"></i> Copy</button><button class="btn btn-sm btn-custom btn-custom-secondary" id="shareReferralBtn"><i class="bi bi-share-fill"></i> Share</button></div></div><p class="mt-3 small text-secondary">Get ₹${appSettings.referralBonus || 5} when your friend joins using your code, and they get a signup bonus!</p></div>`; break; default: title = 'Info'; modalBodyContent = '<p>Content unavailable.</p>'; } elements.policyModalTitle.textContent = title; elements.policyModalBody.innerHTML = (typeof modalBodyContent === 'string' && policyType !== 'refer') ? modalBodyContent.replace(/\n/g, '<br>') : modalBodyContent; elements.policyModalInstance.show(); }
        function setupRealtimeListeners(uid) { if (!uid || !db || !currentUser) return; detachAllDbListeners(); const uRef = ref(db, `users/${uid}`); const listFunc = onValue(uRef, (s) => { if (currentUser && currentUser.uid === uid) { if (s.exists()) { const oldProfile = userProfile; userProfile = s.val(); populateUserInfo(currentUser, userProfile); if (oldProfile.lastCheckedNotifications !== userProfile.lastCheckedNotifications) loadAndDisplayNotifications(); } else { alert("Account data missing or deleted. Logging out."); logoutUser(); } } else { off(uRef, 'value', listFunc); } }, (e) => console.error("Listener error:", e)); dbListeners['userProfile'] = { path: `users/${uid}`, func: listFunc }; }
        function detachAllDbListeners() { for (const k in dbListeners) { try { off(ref(db, dbListeners[k].path), 'value', dbListeners[k].func); } catch (e) { console.error(`Detach error ${k}:`, e); } } dbListeners = {}; }
        
        function startRechargeFlow() { if (!currentUser) { alert("Please login to add amount."); showSection('login-section'); return; } currentRechargeData = { amount: 0, paymentMethod: null, upiId: null }; elements.rechargeAmountInput.value = ''; elements.rechargeUtrInput.value = ''; clearStatusMessage(elements.rechargeStep1Status); clearStatusMessage(elements.rechargeStep2Status); clearStatusMessage(elements.rechargeStep3Status); elements.rechargeBalanceDisplay.textContent = (userProfile.depositBalance || 0).toFixed(2); showSection('recharge-section'); goToRechargeStep(1); }
        function goToRechargeStep(step) { elements.rechargeStep1.style.display = (step === 1) ? 'block' : 'none'; elements.rechargeStep2.style.display = (step === 2) ? 'block' : 'none'; elements.rechargeStep3.style.display = (step === 3) ? 'block' : 'none'; }
        function handleGoToStep2() { const amount = parseFloat(elements.rechargeAmountInput.value); if (isNaN(amount) || amount < 10 || amount > 1000) { showStatusMessage(elements.rechargeStep1Status, "Please enter an amount between ₹10 and ₹1000.", 'warning'); return; } clearStatusMessage(elements.rechargeStep1Status); currentRechargeData.amount = amount; elements.rechargeAmountConfirm.textContent = amount.toFixed(2); goToRechargeStep(2); }
        function handleGoToStep3() {
            const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
            if (!selectedMethod) { showStatusMessage(elements.rechargeStep2Status, "Please select a payment method.", "warning"); return; }
            clearStatusMessage(elements.rechargeStep2Status);
            currentRechargeData.paymentMethod = selectedMethod.value;
            currentRechargeData.upiId = appSettings.upiDetails || 'upi-id-not-found@pay';
            elements.rechargeFinalAmount.textContent = currentRechargeData.amount.toFixed(2);
            elements.rechargePaymentMode.textContent = currentRechargeData.paymentMethod;
            elements.rechargeUpiId.textContent = currentRechargeData.upiId;
            if (elements.rechargeQrCodeImg) elements.rechargeQrCodeImg.src = appSettings.qrCodeUrl || 'https://via.placeholder.com/150';
            goToRechargeStep(3);
        }
        async function submitDepositRequest() {
            if (!currentUser) return;
            const utr = elements.rechargeUtrInput.value.trim();
            if (!utr) { showStatusMessage(elements.rechargeStep3Status, "Please enter the UTR/Transaction ID.", 'warning'); return; }
            toggleButtonLoader(elements.rechargeSubmitBtn, true, 'Submitting...');
            showGlobalLoader(true);
            const depositRequest = { userId: currentUser.uid, userEmail: currentUser.email, userName: userProfile.displayName || 'N/A', amount: currentRechargeData.amount, paymentMethod: currentRechargeData.paymentMethod, upiId: currentRechargeData.upiId, utr: utr, status: 'pending', timestamp: serverTimestamp() };
            try {
                await push(ref(db, 'deposits'), depositRequest);
                alert("Deposit request submitted! Your balance will be updated after verification.");
                showSection('wallet-section');
            } catch (error) {
                console.error("Error submitting deposit request:", error);
                showStatusMessage(elements.rechargeStep3Status, `Failed: ${error.message}`, 'danger', false);
            } finally {
                showGlobalLoader(false);
                toggleButtonLoader(elements.rechargeSubmitBtn, false);
            }
        }

        // SQUAD JOIN FIX
        function handleJoinTournamentClick(event) {
            if (!currentUser) { alert("Login to join."); showSection('login-section'); return; }
            const btn = event.currentTarget;
            const tId = btn.dataset.tournamentId, fee = parseFloat(btn.dataset.fee || 0), mode = btn.dataset.mode || 'Solo';
            if (!tId) return;

            elements.joinTournamentIdInput.value = tId;
            elements.joinTournamentFeeInput.value = fee;
            elements.joinTournamentModeInput.value = mode;
            elements.joinUsernameInput.value = userProfile.username || '';
            elements.joinGameUidInput.value = userProfile.gameUid || '';
            clearStatusMessage(elements.joinTournamentStatusMessage);

            const teamFieldsContainer = elements.joinTeamFieldsContainer;
            teamFieldsContainer.innerHTML = ''; 
            
            let teamSize = 0, totalFee = fee;
            if (mode === 'Duo') teamSize = 2;
            if (mode === 'Squad') teamSize = 5;
            
            if (teamSize > 1) {
                const chargeableCount = (mode === 'Squad') ? 4 : teamSize;
             totalFee = fee * chargeableCount;
                elements.joinFeeDisplayEl.textContent = `₹${totalFee.toFixed(2)} (₹${fee} per player)`;
                for (let i = 2; i <= teamSize; i++) {

                // Always add teammate name field
                teamFieldsContainer.innerHTML += `
                        <div class="mb-3">
                            <label for="joinTeammate${i}UsernameInput" class="form-label">${ i === 5 ? "Your Team Name" : `Teammate ${i} In-Game Name` }</label>
                            <input type="text" class="form-control" id="joinTeammate${i}UsernameInput" required>
                        </div>
                `;

                // For teammates 2-4 add UID field. Teammate 5 UID is intentionally NOT collected (only name).
                if (i !== 5) {
                    teamFieldsContainer.innerHTML += `
                        <div class="mb-3">
                            <label for="joinTeammate${i}GameUidInput" class="form-label">Teammate ${i} Free Fire UID</label>
                            <input type="text" class="form-control" id="joinTeammate${i}GameUidInput" required>
                        </div>
                    `;
                }
            }
                teamFieldsContainer.style.display = 'block';
            } else {
                elements.joinFeeDisplayEl.textContent = `₹${fee.toFixed(2)}`;
                teamFieldsContainer.style.display = 'none';
            }
            elements.joinTournamentDetailsModalInstance.show();
        }

        async function confirmAndJoinTournament() {
             const tId = elements.joinTournamentIdInput.value, fee = parseFloat(elements.joinTournamentFeeInput.value), mode = elements.joinTournamentModeInput.value;
             const username = elements.joinUsernameInput.value.trim(), gameUid = elements.joinGameUidInput.value.trim();
             
             let teamSize = 1, totalFee = fee, teammates = [];
             if (mode === 'Duo') teamSize = 2;
             if (mode === 'Squad') teamSize = 5;
             const chargeableCount = (mode === 'Squad') ? 4 : teamSize;
             totalFee = fee * chargeableCount;
             
             if (!username || !gameUid) return showStatusMessage(elements.joinTournamentStatusMessage, 'Your In-Game Name and UID are required.', 'warning');
             
             for (let i = 2; i <= teamSize; i++) {
                const teamUsername = getElement(`joinTeammate${i}UsernameInput`).value.trim();
                let teamUid = '';
                if (i !== 5) {
                    // For teammate 2-4, both name and UID required
                    teamUid = getElement(`joinTeammate${i}GameUidInput`).value.trim();
                    if (!teamUsername || !teamUid) return showStatusMessage(elements.joinTournamentStatusMessage, `Teammate ${i}'s details are required.`, 'warning');
                } else {
                    // For teammate 5 (extra free slot) only username is required, UID is optional / not collected
                    if (!teamUsername) return showStatusMessage(elements.joinTournamentStatusMessage, `Teammate ${i}'s name is required.`, 'warning');
                    teamUid = ''; // explicitly empty
                }
                teammates.push({ username: teamUsername, uid: teamUid });
             }

             clearStatusMessage(elements.joinTournamentStatusMessage);
             toggleButtonLoader(elements.confirmJoinBtn, true, 'Joining...');

             const uRef = ref(db, `users/${currentUser.uid}`);
             let tData = null, transactionResult = null;

             try {
                 
                transactionResult = await runTransaction(uRef, (profile) => {
                    if (!profile) throw new Error("User profile missing.");

                    // include bonusCash as spendable
                    const deposit = Number(profile.depositBalance || 0);
                    const winning = Number(profile.winningCash || 0);
                    const bonus = Number(profile.bonusCash || 0);

                    const spendable = deposit + winning + bonus;
                    if (spendable < totalFee) throw new Error(`Insufficient balance. Need ₹${totalFee.toFixed(2)}.`);

                    // prevent double join
                    if (profile.joinedTournaments?.[tId]) return;

                    // Deduction order: use bonus first, then deposit, then winning
                    let remaining = totalFee;
                    const fromBonus = Math.min(bonus, remaining);
                    remaining -= fromBonus;

                    const fromDeposit = Math.min(deposit, remaining);
                    remaining -= fromDeposit;

                    const fromWinnings = remaining; // whatever is left

                    // apply deductions safely
                    profile.bonusCash = (profile.bonusCash || 0) - fromBonus;
                    profile.depositBalance = (profile.depositBalance || 0) - fromDeposit;
                    profile.winningCash = (profile.winningCash || 0) - fromWinnings;

                    if (!profile.joinedTournaments) profile.joinedTournaments = {};
                    profile.joinedTournaments[tId] = true;
                    profile.username = username;
                    profile.gameUid = gameUid;

                    // attach a helper for logging/audit (will be present in returned snapshot)
                    profile._lastJoinBreakdown = { bonus: fromBonus, deposit: fromDeposit, winning: fromWinnings };

                    return profile;
                });


                 if (!transactionResult.committed) throw new Error("Join failed. Already joined or insufficient balance.");

                 const tRef = ref(db, `tournaments/${tId}`);
                 const snapshot = await get(tRef);
                 if (!snapshot.exists()) throw new Error("Tournament not found.");
                 tData = snapshot.val();
                 if (tData.status !== 'upcoming' || (tData.maxPlayers > 0 && (tData.registeredPlayers ? Object.keys(tData.registeredPlayers).length : 0) >= tData.maxPlayers)) throw new Error("Tournament is full or closed.");

                 let slotNumber = 1;
    try {
        const maxPlayers = Number(tData.maxPlayers || 0);
        const usedSlots = tData.registeredPlayers
            ? Object.values(tData.registeredPlayers).map(p => parseInt(p.slotNumber, 10)).filter(n => !isNaN(n))
            : [];
        if (maxPlayers > 0) {
            for (let i = 1; i <= maxPlayers; i++) {
                if (!usedSlots.includes(i)) { slotNumber = i; break; }
            }
        }
    } catch(e){ slotNumber = 1; }
    const registrationData = { joinedAt: serverTimestamp(), username, gameUid, teammates, slotNumber };
                 await update(ref(db), { [`tournaments/${tId}/registeredPlayers/${currentUser.uid}`]: registrationData });
                 
                 // MATCH JOIN TRANSACTION HISTORY FIX
                                 // fetch breakdown from transaction snapshot (attached as _lastJoinBreakdown)
                const newProfile = transactionResult.snapshot?.val() || {};
                const breakdown = newProfile._lastJoinBreakdown || { bonus:0, deposit:0, winning:0 };
                // record transaction with breakdown metadata (backend should validate)
                await recordTransaction(currentUser.uid, 'tournament_join', -totalFee, `Joined: ${tData.name || 'Tournament'}`, { tournamentId: tId, breakdown });

                 
                 alert(`Joined successfully! ₹${totalFee.toFixed(2)} deducted.`);
                 elements.joinTournamentDetailsModalInstance.hide();
                 
                 const activeTab = querySel('.tournament-tabs .tab-item.active')?.dataset.status || 'upcoming';
                 if (currentSectionId === 'tournaments-section') filterTournaments(currentTournamentGameId, activeTab);
                 else if (currentSectionId === 'my-matches-display-section') loadMyMatchesByStatus(activeTab);
                 if (currentSectionId === 'wallet-section') loadRecentTransactions();

             } catch (e) {
                 console.error("Join failed:", e);
                 showStatusMessage(elements.joinTournamentStatusMessage, `Failed: ${e.message}`, 'danger', false);
                 if (transactionResult?.committed) {
                     console.error("CRITICAL: Balance deducted but failed to register! Refunding.");
                     await runTransaction(uRef, (profile) => {
                         if (profile) {
                             profile.depositBalance = (profile.depositBalance || 0) + totalFee;
                             delete profile.joinedTournaments[tId];
                         }
                         return profile;
                     });
                     await recordTransaction(currentUser.uid, 'join_failed_refund', totalFee, `Refund Failed Join`);
                     alert("Join failed, but your balance was refunded.");
                 }
             } finally {
                 toggleButtonLoader(elements.confirmJoinBtn, false);
             }
        }

        async function loadAndDisplayNotifications() {
            if (!currentUser) return;
            const listEl = elements.notificationsListEl, badgeEl = elements.notificationBadge, emptyMsgEl = elements.notificationsEmptyMsgEl;
            listEl.innerHTML = '';
            badgeEl.style.display = 'none';
            emptyMsgEl.style.display = 'none';
            try {
                const [globalSnapshot, userSnapshot] = await Promise.all([ get(ref(db, 'notifications')), get(ref(db, `users/${currentUser.uid}/notifications`)) ]);
                let allNotifications = [];
                if (globalSnapshot.exists()) allNotifications.push(...Object.values(globalSnapshot.val()));
                if (userSnapshot.exists()) allNotifications.push(...Object.values(userSnapshot.val()));
                if (allNotifications.length === 0) { emptyMsgEl.style.display = 'block'; return; }
                allNotifications.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
                let unreadCount = 0;
                const lastChecked = userProfile.lastCheckedNotifications || 0;
                listEl.innerHTML = allNotifications.map(notif => {
                    const isUnread = notif.timestamp > lastChecked;
                    if (isUnread) unreadCount++;
                    return createNotificationItemHTML(notif, isUnread);
                }).join('');
                if (unreadCount > 0) { badgeEl.textContent = unreadCount > 9 ? '9+' : unreadCount; badgeEl.style.display = 'flex'; }
            } catch (error) { console.error("Error loading notifications:", error); listEl.innerHTML = '<p class="text-danger text-center">Could not load notifications.</p>'; }
        }

        function createNotificationItemHTML(n, isUnread) { return `<div class="notification-item">${isUnread ? '<span class="unread-indicator"></span>' : ''}${n.imageUrl ? `<img loading="lazy" decoding="async" fetchpriority="low" src="${n.imageUrl}" class="notification-item-img" alt="Notification">` : ''}<div class="notification-item-content"><div class="notification-item-title">${n.title || 'Notification'}</div><div class="notification-item-message">${n.message || ''}</div><div class="notification-item-time">${formatDate(n.timestamp)}</div></div></div>`; }
        async function markNotificationsAsRead() { if (!currentUser) return; try { await update(ref(db, `users/${currentUser.uid}`), { lastCheckedNotifications: serverTimestamp() }); elements.notificationBadge.style.display = 'none'; elements.notificationsListEl.querySelectorAll('.unread-indicator').forEach(i => i.remove()); } catch (error) { console.error("Failed to mark notifications read:", error); } }
        function openNotificationsModal() { if (!currentUser) return; elements.notificationsModalInstance.show(); markNotificationsAsRead(); }
        function handleContactUs() { if (!currentUser) { alert("Please login to contact us."); return; } const contact = appSettings.supportContact || '9389660753'; window.open(`https://wa.me/${contact}?text=${encodeURIComponent(`Hello, I need help. My registered email is ${currentUser.email}`)}`, '_blank'); }
        async function loadMatchHistory() { if (!currentUser || !elements.matchHistoryModalInstance) return; elements.matchHistoryBodyEl.innerHTML = '<div class="text-center p-5"><div class="spinner-border text-accent"></div></div>'; elements.matchHistoryModalInstance.show(); try { const snapshot = await get(ref(db, `users/${currentUser.uid}/matchHistory`)); if (!snapshot.exists()) { elements.matchHistoryBodyEl.innerHTML = '<p class="text-center text-secondary p-4">No match history.</p>'; return; } const sortedHistory = Object.values(snapshot.val()).sort((a,b) => (b.date || 0) - (a.date || 0)); elements.matchHistoryBodyEl.innerHTML = sortedHistory.map(m => `<div class="custom-card"><h5 class="tournament-card-title mb-2">${m.tournamentName || 'Tournament'}</h5><p class="small text-secondary mb-3">${formatFullDateTime(m.date)}</p><div class="d-flex justify-content-around text-center"><div><span class="text-secondary small d-block">Rank</span><strong class="h5">#${m.rank || 'N/A'}</strong></div><div><span class="text-secondary small d-block">Kills</span><strong class="h5">${m.kills ?? 'N/A'}</strong></div><div><span class="text-secondary small d-block">Winnings</span><strong class="h5 text-success">₹${(m.earnings || 0).toFixed(2)}</strong></div></div></div>`).join(''); } catch (e) { elements.matchHistoryBodyEl.innerHTML = `<p class="text-center text-danger p-4">Error: ${e.message}</p>`; } }
        async function loadTransactionHistory() { if (!currentUser || !elements.transactionHistoryModalInstance) return; elements.transactionHistoryBodyEl.innerHTML = '<div class="text-center p-5"><div class="spinner-border text-accent"></div></div>'; elements.transactionHistoryModalInstance.show(); try { const snapshot = await get(ref(db, `transactions/${currentUser.uid}`)); if (!snapshot.exists()) { elements.transactionHistoryBodyEl.innerHTML = '<p class="text-center text-secondary p-4">No transaction history.</p>'; return; } const sorted = Object.values(snapshot.val()).sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0)); elements.transactionHistoryBodyEl.innerHTML = sorted.map(t => { const isCredit = t.amount > 0; return `<div class="custom-card d-flex align-items-center p-3 mb-2"><div class="me-3"><i class="bi ${isCredit ? 'bi-arrow-down-circle-fill text-success' : 'bi-arrow-up-circle-fill text-danger'}" style="font-size: 2rem;"></i></div><div class="flex-grow-1"><p class="mb-0 fw-bold">${t.description || 'Transaction'}</p><p class="mb-0 small text-secondary">${formatFullDateTime(t.timestamp)}</p></div><div class="ms-3 text-end"><strong class="fs-5 ${isCredit ? 'text-success' : 'text-danger'}">${isCredit ? '+' : ''}<span class="currency-symbol">₹</span>${Math.abs(t.amount || 0).toFixed(2)}</strong></div></div>`; }).join(''); } catch (e) { elements.transactionHistoryBodyEl.innerHTML = `<p class="text-center text-danger p-4">Error: ${e.message}</p>`; } }
        function openTournamentChat(tournamentId, tournamentName) { if (!currentUser || !elements.tournamentChatModalInstance) return; if (typeof currentChatRef !== 'undefined' && currentChatChildCb) { try { off(currentChatRef, 'child_added', currentChatChildCb); } catch(e){} } elements.tournamentChatModalTitle.textContent = tournamentName; elements.chatForm.dataset.tournamentId = tournamentId; elements.chatMessagesEl.innerHTML = '<div class="text-center p-5"><div class="spinner-border text-accent"></div></div>'; elements.tournamentChatModalInstance.show(); const chatRef = query(ref(db, `chats/${tournamentId}`), limitToLast(50)); currentChatRef = chatRef;
            currentChatChildCb = (snapshot) => {
                if (elements.chatMessagesEl.querySelector('.spinner-border')) elements.chatMessagesEl.innerHTML = '';
                if (!snapshot.exists()) return;
                const data = snapshot.val();
                data.key = snapshot.key;
                appendChatMessage(data, true);
            };
            onChildAdded(chatRef, currentChatChildCb, { onlyOnce: false }); }
        function cancelReply(){ currentReply = null; elements.chatReplyContextEl.style.display = 'none'; }
        function appendChatMessage(msg, prepend = false) {
        const msgId = msg.key || msg.id || null;
        if (msgId && elements.chatMessagesEl.querySelector(`[data-msg-id="${msgId}"]`)) { return; }
 const isMy = msg.uid === currentUser.uid; const bubble = document.createElement('div'); bubble.className = `chat-bubble ${isMy ? 'my-message' : 'other-message'}`; bubble.dataset.senderName = msg.displayName; bubble.dataset.messageText = msg.message; let replyHtml = ''; if (msg.replyTo) replyHtml = `<div class="reply-quote-block"><span class="sender-name">${msg.replyTo.originalSenderName}</span><p>${msg.replyTo.originalMessage}</p></div>`; bubble.innerHTML = `${replyHtml}${!isMy ? `<span class="sender-name">${msg.displayName || 'User'}</span>` : ''}${msg.message}<span class="msg-time">${formatFullDateTime(msg.timestamp)}</span>`; if (msgId) bubble.dataset.msgId = msgId;
            if(prepend) elements.chatMessagesEl.prepend(bubble); else { elements.chatMessagesEl.appendChild(bubble); elements.chatMessagesEl.scrollTop = 0; } }
        async function handleChatSubmit(event) { event.preventDefault(); const tournamentId = event.currentTarget.dataset.tournamentId, messageText = elements.chatMessageInput.value.trim(); if (!messageText || !tournamentId || !currentUser) return; const tSnap = await get(ref(db, `tournaments/${tournamentId}`)); if (!tSnap.exists() || !tSnap.val().registeredPlayers?.[currentUser.uid]) { alert("You must join to chat."); return; } const messageData = { uid: currentUser.uid, displayName: userProfile.displayName, message: messageText, timestamp: serverTimestamp() }; if (currentReply) messageData.replyTo = currentReply; try { await push(ref(db, `chats/${tournamentId}`), messageData); elements.chatMessageInput.value = ''; cancelReply(); } catch(error) { alert(`Send failed: ${error.message}`); } }
        function openEditNameModal() { if (!currentUser) return; elements.editNameInput.value = userProfile.displayName || ''; clearStatusMessage(elements.editNameStatusMessage); elements.editNameModalInstance.show(); }
        async function saveNameChange() { const newName = elements.editNameInput.value.trim(); if (!newName) { showStatusMessage(elements.editNameStatusMessage, "Name cannot be empty.", "warning"); return; } if (newName === userProfile.displayName) { elements.editNameModalInstance.hide(); return; } showGlobalLoader(true); try { await update(ref(db, `users/${currentUser.uid}`), { displayName: newName }); userProfile.displayName = newName; populateUserInfo(currentUser, userProfile); elements.editNameModalInstance.hide(); } catch (error) { showStatusMessage(elements.editNameStatusMessage, `Error: ${error.message}`, "danger", false); } finally { showGlobalLoader(false); } }
        function openLiveSupportChat() { if (!currentUser) { alert("Please login to use live support."); return; } if (currentLiveChatUnsubscribe) currentLiveChatUnsubscribe(); if (adminStatusUnsubscribe) adminStatusUnsubscribe(); showSection('live-support-section'); elements.liveChatMessagesEl.innerHTML = '<div class="text-center p-5"><div class="spinner-border text-accent"></div></div>'; const adminStatusRef = ref(db, 'settings/adminStatus'); adminStatusUnsubscribe = onValue(adminStatusRef, (snapshot) => { const status = snapshot.val() || 'offline', indicatorEl = elements.adminStatusIndicator; indicatorEl.className = `admin-status ${status}`; indicatorEl.querySelector('.admin-status-text').textContent = status.charAt(0).toUpperCase() + status.slice(1); }); const chatRef = query(ref(db, `liveSupportChats/${currentUser.uid}`), limitToLast(100)); currentLiveChatUnsubscribe = onChildAdded(chatRef, (snapshot) => { if (elements.liveChatMessagesEl.querySelector('.spinner-border')) elements.liveChatMessagesEl.innerHTML = ''; if (snapshot.val()) appendLiveChatMessage(snapshot.val(), true); }); get(chatRef).then(s => { if (!s.exists()) elements.liveChatMessagesEl.innerHTML = '<p class="text-center text-secondary p-4">Start the conversation.</p>'; }); }
        function appendLiveChatMessage(msg, prepend = false) { const isUser = msg.sender === 'user'; const bubble = document.createElement('div'); const adminInfo = appSettings.liveSupportAdmin || { displayName: 'Admin', photoURL: 'https://via.placeholder.com/35' }; if (isUser) { bubble.className = 'chat-bubble-live user-message'; bubble.innerHTML = `${msg.message}<span class="msg-time-live">${formatFullDateTime(msg.timestamp)}</span>`; } else { bubble.className = 'chat-bubble-live admin-message'; bubble.innerHTML = `<img loading="lazy" decoding="async" fetchpriority="low" src="${adminInfo.photoURL}" alt="Admin" class="admin-avatar"><div class="admin-message-content"><span class="admin-name">${adminInfo.displayName}</span>${msg.message}<span class="msg-time-live">${formatFullDateTime(msg.timestamp)}</span></div>`; } if (prepend) elements.liveChatMessagesEl.prepend(bubble); else { elements.liveChatMessagesEl.appendChild(bubble); elements.liveChatMessagesEl.scrollTop = 0; } }
        async function handleLiveChatSubmit(event) { event.preventDefault(); const messageText = elements.liveChatMessageInput.value.trim(); if (!messageText || !currentUser) return; elements.liveChatMessageInput.value = ''; if (elements.liveChatMessagesEl.querySelector('p.text-secondary')) elements.liveChatMessagesEl.innerHTML = ''; const messageData = { sender: 'user', message: messageText, timestamp: serverTimestamp(), username: userProfile.displayName || 'N/A', email: currentUser.email || 'N/A' }; try { await push(ref(db, `liveSupportChats/${currentUser.uid}`), messageData); } catch (error) { alert(`Send failed: ${error.message}`); } }
        function openChangePasswordModal() { if (!currentUser) return; getElement('changePasswordForm').reset(); clearStatusMessage(elements.changePasswordStatusMessage); elements.changePasswordModalInstance.show(); }
        async function handleChangePasswordSubmit() { if (!currentUser) return; const statusEl = elements.changePasswordStatusMessage, currentPw = elements.currentPasswordInput.value, newPw = elements.newPasswordInput.value, confirmPw = elements.confirmNewPasswordInput.value; if (!currentPw || !newPw || !confirmPw) { showStatusMessage(statusEl, "All fields are required.", 'warning'); return; } if (newPw.length < 6) { showStatusMessage(statusEl, "New password must be at least 6 characters.", 'warning'); return; } if (newPw !== confirmPw) { showStatusMessage(statusEl, "New passwords do not match.", 'warning'); return; } toggleButtonLoader(elements.savePasswordChangeBtn, true, 'Saving...'); clearStatusMessage(statusEl); try { await reauthenticateWithCredential(currentUser, EmailAuthProvider.credential(currentUser.email, currentPw)); await updatePassword(currentUser, newPw); showStatusMessage(statusEl, "Password changed successfully!", 'success'); setTimeout(() => elements.changePasswordModalInstance.hide(), 2000); } catch (error) { showStatusMessage(statusEl, "Incorrect current password.", 'danger'); } finally { toggleButtonLoader(elements.savePasswordChangeBtn, false); } }
        function openMyStatsModal() { if (!currentUser || !elements.myStatsModalInstance) return; elements.statsMatchesPlayed.textContent = userProfile.totalMatches || 0; elements.statsMatchesWon.textContent = userProfile.wonMatches || 0; elements.statsTotalKills.textContent = userProfile.totalKills || 0; elements.statsTotalWinnings.textContent = `₹${(userProfile.totalEarnings || 0).toFixed(2)}`; elements.statsReferralEarnings.textContent = `₹${(userProfile.referralEarnings || 0).toFixed(2)}`; elements.statsCardContainer.querySelectorAll('.stat-card').forEach(c => c.classList.remove('active')); elements.myStatsModalInstance.show(); }
        function handleStatCardClick(event) { const clicked = event.currentTarget; elements.statsCardContainer.querySelectorAll('.stat-card').forEach(c => { if (c !== clicked) c.classList.remove('active'); }); clicked.classList.toggle('active'); }
        function showPromoCodeOverlay() { if (!elements.promoCodeOverlay) return; elements.promoCodeInput.value = ''; elements.promoCodeStatusMessage.textContent = ''; elements.promoCodeStatusMessage.className = 'promo-code-status'; elements.promoCodeOverlay.style.display = 'flex'; setTimeout(() => elements.promoCodeOverlay.classList.add('visible'), 10); }
        function hidePromoCodeOverlay() { if (!elements.promoCodeOverlay) return; elements.promoCodeOverlay.classList.remove('visible'); setTimeout(() => { elements.promoCodeOverlay.style.display = 'none'; }, 300); }
        async function redeemPromoCode() {
            if (!currentUser) return;
            const code = elements.promoCodeInput.value.trim().toUpperCase(), statusEl = elements.promoCodeStatusMessage;
            if (!code) { statusEl.textContent = 'Enter promo code'; statusEl.className = 'promo-code-status text-danger'; return; }
            toggleButtonLoader(elements.redeemPromoCodeBtn, true, 'Verifying...');
            statusEl.textContent = '';
            statusEl.className = 'promo-code-status';
            try {
                const q = query(ref(db, 'promoCodes'), orderByChild('code'), equalTo(code));
                const snapshot = await get(q);
                if (!snapshot.exists()) throw new Error('Invalid promo code');
                let promoKey, promoData;
                snapshot.forEach(child => { promoKey = child.key; promoData = child.val(); });
                if (!promoData.active) throw new Error('Promo code is not active.');
                if (promoData.usageLimit <= 0) throw new Error('Promo code has been fully used.');
                if (promoData.usedBy && promoData.usedBy[currentUser.uid]) throw new Error('You have already used this code.');
                if (promoData.expiryDate && new Date(promoData.expiryDate) < new Date()) throw new Error('Promo code has expired.');

                const balanceType = promoData.balanceType || 'depositBalance';
                let balanceTypeName = "Deposit";
                await runTransaction(ref(db, `users/${currentUser.uid}`), (profile) => {
                    if (profile) {
                        if (balanceType === 'winningCash') { profile.winningCash = (profile.winningCash || 0) + promoData.amount; balanceTypeName = "Winning"; }
                        else if (balanceType === 'bonusCash') { profile.bonusCash = (profile.bonusCash || 0) + promoData.amount; balanceTypeName = "Bonus"; }
                        else { profile.depositBalance = (profile.depositBalance || 0) + promoData.amount; balanceTypeName = "Deposit"; }
                    }
                    return profile;
                });
                await update(ref(db, `promoCodes/${promoKey}`), { usageLimit: (promoData.usageLimit || 1) - 1, [`usedBy/${currentUser.uid}`]: true });
                await recordTransaction(currentUser.uid, `promo_code_${balanceType}`, promoData.amount, `Promo (${balanceTypeName}): ${promoData.code}`);
                statusEl.textContent = `Success! ₹${promoData.amount} added to your ${balanceTypeName} balance.`;
                statusEl.className = 'promo-code-status text-success';
                setTimeout(hidePromoCodeOverlay, 2000);
            } catch (error) {
                statusEl.textContent = error.message;
                statusEl.className = 'promo-code-status text-danger';
            } finally {
                toggleButtonLoader(elements.redeemPromoCodeBtn, false);
            }
        }
        async function loadMyMatchesByStatus(status) {
            if (!currentUser) return;
            showSection('my-matches-display-section', { title: status.charAt(0).toUpperCase() + status.slice(1) }); 
            const listEl = elements.myMatchesDisplayListEl, emptyEl = elements.myMatchesEmptyStateEl;
            listEl.innerHTML = '<div class="text-center p-5"><div class="spinner-border text-accent"></div></div>';
            emptyEl.style.display = 'none';

            function createCompletedMatchCard(m) {
                const card = document.createElement('div');
                card.className = 'custom-card mb-3 p-3';
                const when = m.date ? formatFullDateTime(m.date) : '';
                const title = sanitizeHTML(m.tournamentName || 'Tournament');
                const rank = (m.rank !== undefined && m.rank !== null) ? `#${m.rank}` : 'N/A';
                const kills = (m.kills !== undefined && m.kills !== null) ? m.kills : 'N/A';
                const earnings = (m.earnings || 0);
                card.innerHTML = `
                    <div class="d-flex justify-content-between align-items-start">
                      <div>
                        <h5 class="tournament-card-title mb-1">${title}</h5>
                        <p class="small text-secondary mb-1">${when}</p>
                        <div class="d-flex gap-3 small text-secondary">
                          <div><span class="d-block">Rank</span><strong>${rank}</strong></div>
                          <div><span class="d-block">Kills</span><strong>${kills}</strong></div>
                          <div><span class="d-block">Winnings</span><strong class="text-success">₹${earnings.toLocaleString('en-IN')}</strong></div>
                        </div>
                      </div>
                      <div style="min-width:80px;text-align:right">
                        <button class="btn btn-sm btn-outline-light view-result-btn" data-tid="${m.tournamentId || ''}">View</button>
                      </div>
                    </div>
                `;
                const btn = card.querySelector('.view-result-btn');
                if (btn) {
                    btn.addEventListener('click', async (e) => {
                        const tid = e.currentTarget.dataset.tid;
                        if (!tid) return;
                        try {
                            const snap = await get(ref(db, `tournaments/${tid}`));
                            if (!snap.exists()) { alert('Tournament data not found.'); return; }
                            const t = snap.val();
                            elements.detailsBannerEl && (elements.detailsBannerEl.src = t.bannerUrl || t.imageUrl || '');
                            elements.detailsTitleEl && (elements.detailsTitleEl.textContent = t.name || 'Tournament');
                            elements.detailsSubtitleEl && (elements.detailsSubtitleEl.textContent = t.description || '');
                            elements.detailsModeEl && (elements.detailsModeEl.textContent = t.mode || t.type || '');
                            elements.detailsGameModeEl && (elements.detailsGameModeEl.textContent = appSettings.games?.[t.gameId]?.name || t.gameId || '');
                            elements.detailsEntryFeeEl && (elements.detailsEntryFeeEl.textContent = t.entryFee ? `₹${t.entryFee}` : 'Free');
                            elements.detailsScheduleEl && (elements.detailsScheduleEl.textContent = t.startTime ? formatFullDateTime(t.startTime) : '');
                            elements.detailsPrizePoolEl && (elements.detailsPrizePoolEl.textContent = t.prizePool ? `₹${t.prizePool}` : '-');
                            elements.detailsPerKillEl && (elements.detailsPerKillEl.textContent = t.perKill ? `₹${t.perKill}` : '-');
                            updateDetailsSlotBox(t);
                            elements.detailsRulesEl && (elements.detailsRulesEl.textContent = t.rules || '');
                            showSection && showSection('match-details-section', { title: t.name || 'Match Details' });
                        } catch(err) {
                            console.error('Failed to load tournament details', err);
                            alert('Could not load tournament details.');
                        }
                    });
                }
                return card;
            }

            // First, try to load from user's matchHistory (preferred, contains complete result data)
            
            if (status === 'completed') {
                try {
                    // Preferred: use matchHistory (if present) to map back to tournament ids and render tournament cards.
                    const snap = await get(ref(db, `users/${currentUser.uid}/matchHistory`));
                    listEl.innerHTML = '';
                    if (snap.exists()) {
                        const historyObj = snap.val();
                        // Try to render each history entry as a tournament-style card if possible
                        const entries = Object.values(historyObj || {}).sort((a,b)=> (b.date || 0) - (a.date || 0));
                        if (entries.length > 0) {
                            // For each history entry, if we have a tournamentId, fetch tournament and render full tournament card.
                            // Otherwise create a lightweight tournament-like card using the same structure.
                            for (const h of entries) {
                                if (h.tournamentId) {
                                    try {
                                        const tSnap = await get(ref(db, `tournaments/${h.tournamentId}`));
                                        if (tSnap.exists()) {
                                            const t = tSnap.val();
                                            listEl.appendChild(createTournamentCardElement(h.tournamentId, t, { compact: true, completedEntry: h }));
                                            continue;
                                        }
                                    } catch(e) {
                                        // ignore and fallback to lightweight card
                                    }
                                }
                                // Lightweight tournament-like card for history entry
                                const card = document.createElement('div');
                                card.className = 'tournament-card completed compact';
                                card.innerHTML = `
                                    <div class="card-banner" style="background:#111;padding:12px;border-radius:8px;">
                                        <h5 style="margin:0 0 6px 0;">${sanitizeHTML(h.tournamentName || 'Tournament')}</h5>
                                        <div class="small text-secondary">${h.date ? formatFullDateTime(h.date) : ''}</div>
                                        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;">
                                            <div class="small text-secondary">
                                                <div>Rank <strong>#${h.rank ?? 'N/A'}</strong></div>
                                                <div>Kills <strong>${h.kills ?? 'N/A'}</strong></div>
                                                <div>Winnings <strong class="text-success">₹${(h.earnings||0).toLocaleString('en-IN')}</strong></div>
                                            </div>
                                            <div style="min-width:80px;text-align:right">
                                                <button class="btn btn-sm btn-outline-light view-result-btn" data-tid="${h.tournamentId || ''}">View</button>
                                            </div>
                                        </div>
                                    </div>
                                `;
                                const btn = card.querySelector('.view-result-btn');
                                if (btn) {
                                    btn.addEventListener('click', async (e) => {
                                        const tid = e.currentTarget.dataset.tid;
                                        if (!tid) { alert('No tournament id available'); return; }
                                        try {
                                            const ts = await get(ref(db, `tournaments/${tid}`));
                                            if (!ts.exists()) { alert('Tournament data not found.'); return; }
                                            const t = ts.val();
                                            elements.detailsBannerEl && (elements.detailsBannerEl.src = t.bannerUrl || t.imageUrl || '');
                                            elements.detailsTitleEl && (elements.detailsTitleEl.textContent = t.name || 'Tournament');
                                            elements.detailsSubtitleEl && (elements.detailsSubtitleEl.textContent = t.description || '');
                                            showSection && showSection('match-details-section', { title: t.name || 'Match Details' });
                                        } catch(err) {
                                            console.error('Failed to load tournament details', err);
                                            alert('Could not load tournament details.');
                                        }
                                    });
                                }
                                listEl.appendChild(card);
                            } // end for
                            emptyEl.style.display = 'none';
                            return;
                        }
                    }

                    // Fallback: same logic as before - try joinedTournaments -> fetch tournaments and render cards for completed ones
                    const joinedIds = Object.keys(userProfile.joinedTournaments || {});
                    if (joinedIds.length === 0) {
                        listEl.innerHTML = '';
                        elements.myMatchesEmptyTitleEl.textContent = 'No completed matches!';
                        elements.myMatchesEmptySubtitleEl.textContent = 'You have no completed match records yet.';
                        emptyEl.style.display = 'flex';
                        return;
                    }
                    const snaps = await Promise.all(joinedIds.map(id => get(ref(db, `tournaments/${id}`))));
                    const completed = [];
                    for (let i=0;i<snaps.length;i++) {
                        const s = snaps[i];
                        if (!s.exists()) continue;
                        const t = s.val();
                        if (!t || (t.status !== 'completed' && t.status !== 'ended' && t.status !== 'results' && t.status !== 'result')) continue;
                        completed.push([joinedIds[i], t]);
                    }
                    if (completed.length > 0) {
                        // render tournament cards using existing createTournamentCardElement
                        listEl.innerHTML = '';
                        completed.sort((a,b)=> (b[1].startTime || 0) - (a[1].startTime || 0));
                        completed.forEach(([id,t]) => listEl.appendChild(createTournamentCardElement(id, t, { compact: false, completed: true })));
                        emptyEl.style.display = 'none';
                        return;
                    }

                    // nothing found
                    elements.myMatchesEmptyTitleEl.textContent = 'No completed matches!';
                    elements.myMatchesEmptySubtitleEl.textContent = 'You have no completed match records yet.';
                    listEl.innerHTML = '';
                    emptyEl.style.display = 'flex';
                    return;
                } catch(error) {
                    console.error('Error loading completed matches (card mode):', error);
                    listEl.innerHTML = `<p class="text-center text-danger p-3">Could not load completed matches: ${error && error.message ? error.message : error}</p>`;
                    emptyEl.style.display = 'flex';
                    return;
                }
            }


            // Default behaviour for upcoming/ongoing
            const joinedIds = Object.keys(userProfile.joinedTournaments || {});
            if (joinedIds.length === 0) {
                listEl.innerHTML = '';
                elements.myMatchesEmptyTitleEl.textContent = `No ${status} matches!`;
                elements.myMatchesEmptySubtitleEl.textContent = "You haven't joined any match yet.";
                emptyEl.style.display = 'flex';
                return;
            }
            try {
                const snapshots = await Promise.all(joinedIds.map(id => get(ref(db, `tournaments/${id}`))));
                const filtered = snapshots.map((s, i) => s.exists() && s.val().status === status ? [joinedIds[i], s.val()] : null).filter(Boolean);
                listEl.innerHTML = '';
                if (filtered.length > 0) {
                    filtered.sort(([, a], [, b]) => (b.startTime || 0) - (a.startTime || 0)).forEach(([id, t]) => listEl.appendChild(createTournamentCardElement(id, t)));
                } else {
                    elements.myMatchesEmptyTitleEl.textContent = `No ${status} matches!`;
                    elements.myMatchesEmptySubtitleEl.textContent = status === 'completed' ? "Results will be available shortly." : "Check other categories for your matches.";
                    emptyEl.style.display = 'flex';
                }
            } catch(err) {
                console.error('Failed to load joined tournaments', err);
                listEl.innerHTML = `<p class="text-center text-danger p-3">Could not load matches: ${err && err.message ? err.message : err}</p>`;
            }
        }
        function initializeEventListeners() {
            elements.bottomNavItems?.forEach(item => item.addEventListener('click', (e) => showSection(e.currentTarget.dataset.section)));
            elements.tournamentTabs?.forEach(tab => tab.addEventListener('click', (e) => { const s = e.currentTarget.dataset.status; if (currentTournamentGameId && s) { elements.tournamentTabs.forEach(t => t.classList.remove('active')); e.currentTarget.classList.add('active'); filterTournaments(currentTournamentGameId, s); }}));
            document.querySelectorAll('.match-box').forEach(box => box.addEventListener('click', (e) => loadMyMatchesByStatus(e.currentTarget.dataset.status)));
            elements.loginEmailBtn?.addEventListener('click', loginWithEmail);
            elements.signupEmailBtn?.addEventListener('click', signUpWithEmail);
            elements.showSignupToggleBtn?.addEventListener('click', () => toggleAuthForm(false));
            elements.showLoginToggleBtn?.addEventListener('click', () => toggleAuthForm(true));
            elements.forgotPasswordLink?.addEventListener('click', (e) => { e.preventDefault(); sendResetLink(); });
            elements.logoutProfileBtn?.addEventListener('click', logoutUser);
            elements.policyLinks?.forEach(link => link.addEventListener('click', handlePolicyClick));
            elements.withdrawBtn?.addEventListener('click', handleWithdrawClick);
            elements.addAmountWalletBtn?.addEventListener('click', startRechargeFlow);
            elements.submitWithdrawRequestBtn?.addEventListener('click', submitWithdrawRequestHandler);
            elements.rechargePresetBtns.forEach(btn => btn.addEventListener('click', () => elements.rechargeAmountInput.value = btn.dataset.amount));
            elements.goToStep2Btn?.addEventListener('click', handleGoToStep2);
            elements.goToStep3Btn?.addEventListener('click', handleGoToStep3);
            elements.paymentOptionCards.forEach(card => card.addEventListener('click', () => { elements.paymentOptionCards.forEach(c => c.classList.remove('selected')); card.classList.add('selected'); card.querySelector('input[type="radio"]').checked = true; }));
            elements.rechargeSubmitBtn?.addEventListener('click', submitDepositRequest);
            elements.rechargeCancelBtn?.addEventListener('click', () => showSection('home-section'));
            elements.rechargeCopyAmtBtn?.addEventListener('click', () => copyToClipboard(currentRechargeData.amount.toString(), true));
            elements.rechargeCopyUpiBtn?.addEventListener('click', () => copyToClipboard(currentRechargeData.upiId, true));
            elements.confirmJoinBtn?.addEventListener('click', confirmAndJoinTournament);
            elements.contactUsBtn?.addEventListener('click', (e) => { e.preventDefault(); handleContactUs(); });
            elements.allTransactionsBtn?.addEventListener('click', loadTransactionHistory);
            elements.notificationBtn?.addEventListener('click', openNotificationsModal);
            elements.editNameBtnEl?.addEventListener('click', openEditNameModal);
            elements.saveNameChangeBtn?.addEventListener('click', saveNameChange);
            elements.matchHistoryBtn?.addEventListener('click', (e) => { e.preventDefault(); loadMatchHistory(); });
            elements.transactionHistoryBtn?.addEventListener('click', (e) => { e.preventDefault(); loadTransactionHistory(); });
            elements.myStatsBtn?.addEventListener('click', (e) => { e.preventDefault(); openMyStatsModal(); });
            elements.changePasswordBtn?.addEventListener('click', (e) => { e.preventDefault(); openChangePasswordModal(); });
            elements.savePasswordChangeBtn?.addEventListener('click', handleChangePasswordSubmit);
            elements.chatForm?.addEventListener('submit', handleChatSubmit);
            elements.cancelReplyBtn?.addEventListener('click', cancelReply);
            elements.liveSupportBtn?.addEventListener('click', (e) => { e.preventDefault(); openLiveSupportChat(); });
            elements.liveChatForm?.addEventListener('submit', handleLiveChatSubmit);
            elements.promoCodeBtn?.addEventListener('click', (e) => { e.preventDefault(); showPromoCodeOverlay(); });
            elements.closePromoCodeBtn?.addEventListener('click', hidePromoCodeOverlay);
            elements.redeemPromoCodeBtn?.addEventListener('click', redeemPromoCode);
            document.querySelectorAll('.password-toggle-btn').forEach(btn => btn.addEventListener('click', (e) => { const input = e.currentTarget.closest('.input-group-wrapper').querySelector('input'), icon = e.currentTarget.querySelector('i'); if (input.type === 'password') { input.type = 'text'; icon.classList.replace('bi-eye-slash', 'bi-eye'); } else { input.type = 'password'; icon.classList.replace('bi-eye', 'bi-eye-slash'); }}));
            elements.chatMessagesEl.addEventListener('click', (e) => { const bubble = e.target.closest('.chat-bubble'); if (!bubble) return; const sender = bubble.dataset.senderName, message = bubble.dataset.messageText.length > 50 ? bubble.dataset.messageText.substring(0, 50) + '...' : bubble.dataset.messageText; currentReply = { originalSenderName: sender, originalMessage: message }; elements.replyToNameEl.textContent = sender; elements.replyToMessageEl.textContent = message; elements.chatReplyContextEl.style.display = 'block'; });
            getElement('tournamentChatModal')?.addEventListener('hidden.bs.modal', () => { if (currentChatListener) off(currentChatListener.ref, 'child_added', currentChatListener.func); cancelReply(); });
            if (elements.statsCardContainer) elements.statsCardContainer.querySelectorAll('.stat-card').forEach(card => card.addEventListener('click', handleStatCardClick));
            document.body.addEventListener('click', (e) => { if (e.target.closest('.copy-btn')) copyToClipboard(e.target.closest('.copy-btn').dataset.target); if (e.target.closest('#shareReferralBtn')) { const cel = getElement('referralCodeDisplay'); if (cel) shareReferral(cel.textContent); } });
        }

         document.addEventListener('DOMContentLoaded', async () => {
             if (typeof initializeApp !== 'function' || !auth || !db) return;
             
             // Show loader immediately
             showGlobalLoader(true);
             
             try {
                // Load critical settings first
                await loadAppSettings();
                
                // Initialize all event listeners
                initializeEventListeners();
                
                // Set up auth state listener which will handle the rest
                onAuthStateChanged(auth, handleAuthStateChange);

             } catch (err) {
                 console.error("Critical app initialization failed:", err);
                 alert("Error loading app. Please refresh.");
                 showGlobalLoader(false);
             }
         });

        // NEWS loader
        const newsRef = ref(db, 'news');
        function __renderNews(list){
          const listEl = document.getElementById('newsListEl');
          const emptyEl = document.getElementById('newsEmptyEl');
          if(!listEl) return;
          listEl.innerHTML = '';
          if(!list.length){ if(emptyEl) emptyEl.style.display='block'; return; }
          if(emptyEl) emptyEl.style.display='none';
          list.forEach(n=>{
            const title = n.title || n.tittle || '';
            const ts = n.createdAt || n.timestamp || 0;
            const col = document.createElement('div');
            col.className = 'col-12';
            col.innerHTML = `
              <div class="card">
                ${n.imageUrl ? `<img loading="lazy" decoding="async" fetchpriority="low" src="${n.imageUrl}" class="card-img-top" style="height:160px;object-fit:cover;">` : ''}
                <div class="card-body">
                  ${title ? `<h5 class="card-title">${title}</h5>` : ''}
                  ${n.content ? `<p class="card-text">${(n.content||'').replace(/\n/g,'<br>')}</p>` : ''}
                  <div class="text-muted" style="font-size:.8rem;">${ts ? new Date(ts).toLocaleString() : ''}</div>
                </div>
              </div>`;
            listEl.appendChild(col);
          });
        }
        function __loadNews(){
          onValue(newsRef, (snap)=>{
            const items=[]; snap.forEach(c=> items.push({ id:c.key, ...c.val() }));
            items.sort((a,b)=>( (b.createdAt||b.timestamp||0) - (a.createdAt||a.timestamp||0) ));
            __renderNews(items);
          });
        }
        const __newsBtn = document.getElementById('navNewsBtn');
        if(__newsBtn){
          __newsBtn.addEventListener('click', ()=>{
            document.querySelectorAll('.section').forEach(s=> s.style.display='none');
            const t = document.getElementById('news-section'); if(t) t.style.display='block';
            __loadNews();
          });
        }
        
// === NEWS LOADER (inside module) ===
(function(){
  // Show-section fallback
  if (typeof window.showSection !== 'function') {
    window.showSection = function(id){
      document.querySelectorAll('.section').forEach(s=> s.style.display='none');
      var el = document.getElementById(id); if (el) el.style.display='block';
      document.querySelectorAll('.bottom-nav .nav-item').forEach(n=> n.classList.remove('active'));
      var btn = document.querySelector('.bottom-nav .nav-item[data-section="'+id+'"]');
      if (btn) btn.classList.add('active');
    };
  }

  const newsBtn = document.getElementById('navNewsBtn');
  if (newsBtn) {
    newsBtn.addEventListener('click', function(){
      showSection('news-section');
      __bindNews();
    });
  }

  let __bound = false;
  function __bindNews(){
    if (__bound) return;
    __bound = true;
    const d = (typeof db !== 'undefined' && db) ? db : null;
    if (!d) { console.warn('News: db not yet ready'); return; }
    const listEl = document.getElementById('newsListEl');
    const emptyEl = document.getElementById('newsEmptyEl');
    const nref = ref(d, 'news');
    onValue(nref, (snap)=>{
      const items=[];
      snap.forEach(c=>{ const v=c.val()||{}; v.id=c.key; items.push(v); });
      items.sort((a,b)=> ( (b.createdAt||b.timestamp||0) - (a.createdAt||a.timestamp||0) ));
      listEl.innerHTML='';
      if(!items.length){ emptyEl.style.display='block'; return; }
      emptyEl.style.display='none';
      items.forEach(n=>{
        const title = n.title || n.tittle || '';
        const when = n.createdAt || n.timestamp || 0;
        const img = n.imageUrl ? `<img loading="lazy" decoding="async" fetchpriority="low" src="${n.imageUrl}" class="card-img-top" style="height:160px;object-fit:cover;border-radius:8px 8px 0 0;">` : '';
        const el = document.createElement('div');
        el.className = 'col-12';
        el.innerHTML = `<div class="custom-card p-0">${img}<div class="p-3">${
          title ? `<h5 class="mb-2">${title}</h5>` : ''
        }${
          n.content ? `<p class="mb-2" style="white-space:pre-wrap">${(n.content||'')}</p>` : ''
        }<div class="text-secondary small">${ when ? new Date(when).toLocaleString() : '' }</div></div></div>`;
        listEl.appendChild(el);
      });
    });
  }

  // Auto-bind after Firebase init if app shows News by default
  if (location.hash === '#news') { showSection('news-section'); __bindNews(); }
  // as a fallback, try binding after a short delay in case db initializes a bit later
  setTimeout(()=>{ if (document.getElementById('news-section')?.style.display !== 'none') __bindNews(); }, 1200);
})();
// === /NEWS LOADER ===

// ===== NEWS BINDER (dedup + bind-once) =====
(() => {
  try{
    const newsBtn = document.getElementById('navNewsBtn');
    if (newsBtn && !window.__NEWS_NAV_BOUND) {
      window.__NEWS_NAV_BOUND = true;
      newsBtn.addEventListener('click', () => {
        if (typeof showSection === 'function') showSection('news-section');
        __bindNewsOnce();
      });
    }
    window.__bindNewsOnce = window.__bindNewsOnce || function __bindNewsOnce(){
      if (window.__NEWS_BOUND) return;
      window.__NEWS_BOUND = true;
      const d = (typeof db !== 'undefined' && db) ? db : null;
      if (!d) { console.warn('News: db not ready'); return; }

      const listEl  = document.getElementById('newsListEl');
      const emptyEl = document.getElementById('newsEmptyEl');
      if (!listEl) return;

      if (window.__NEWS_UNSUB) { try{ window.__NEWS_UNSUB(); }catch(e){} window.__NEWS_UNSUB = null; }

      const nref = ref(d, 'news');
      const unsub = onValue(nref, snap => {
        const map = {};
        snap.forEach(c => { map[c.key] = { id:c.key, ...(c.val()||{}) }; });
        const items = Object.values(map).sort((a,b)=>( (b.createdAt||b.timestamp||0) - (a.createdAt||a.timestamp||0) )).reverse();
        listEl.innerHTML = '';
        if (!items.length){ if (emptyEl) emptyEl.style.display='block'; return; }
        if (emptyEl) emptyEl.style.display='none';
        items.forEach(n => {
          const title = n.title || n.tittle || '';
          const when  = n.createdAt || n.timestamp || 0;
          const img   = n.imageUrl ? `<img loading="lazy" decoding="async" fetchpriority="low" src="${n.imageUrl}" class="card-img-top" style="height:160px;object-fit:cover;border-radius:8px 8px 0 0;">` : '';
          const el = document.createElement('div');
          el.className = 'col-12';
          el.innerHTML = `<div class="custom-card p-0">${img}<div class="p-3">${
            title ? `<h5 class="mb-2">${title}</h5>` : ''
          }${
            n.content ? `<p class="mb-2" style="white-space:pre-wrap">${(n.content||'')}</p>` : ''
          }<div class="text-secondary small">${ when ? new Date(when).toLocaleString() : '' }</div></div></div>`;
          listEl.appendChild(el);
        });
      }, err => console.error('News bind failed', err));

      window.__NEWS_UNSUB = () => { try{ off(nref); }catch(e){} };
    };

    if (location.hash === '#news') { __bindNewsOnce(); }
    setTimeout(()=>{ 
      const sec = document.getElementById('news-section');
      if (sec && (sec.style.display === '' || sec.style.display === 'block')) __bindNewsOnce();
    }, 600);
  }catch(e){ console.error(e); }
})();
// ===== /NEWS BINDER =====

// ===== NEWS: client-side paging with "Load More" =====
(() => {
  // augment existing binder if present
  const oldBind = window.__bindNewsOnce;
  window.__bindNewsOnce = function __bindNewsOnce(){
    if (window.__NEWS_BOUND) return;
    window.__NEWS_BOUND = true;

    const d = (typeof db !== 'undefined' && db) ? db : null;
    if (!d) { console.warn('News: db not ready'); return; }

    const listEl  = document.getElementById('newsListEl');
    const emptyEl = document.getElementById('newsEmptyEl');
    const moreBtn = document.getElementById('newsLoadMoreBtn');
    if (!listEl) return;

    // cleanup any previous listener
    if (window.__NEWS_UNSUB) { try{ window.__NEWS_UNSUB(); }catch(e){} window.__NEWS_UNSUB = null; }

    // state
    const PAGE = 6; // items per batch
    let __all = [];   // full list (sorted desc)
    let shown = 0;    // how many currently rendered

    function renderSlice(reset=false){
      if (reset){ listEl.innerHTML=''; shown=0; }
      const next = Math.min(shown + PAGE, __all.length);
      for (let i=shown; i<next; i++){
        const n = __all[i];
        const title = n.title || n.tittle || '';
        const when  = n.createdAt || n.timestamp || 0;
        const img   = n.imageUrl ? `<img loading="lazy" decoding="async" fetchpriority="low" src="${n.imageUrl}" class="card-img-top" style="height:160px;object-fit:cover;border-radius:8px 8px 0 0;">` : '';
        const el = document.createElement('div');
        el.className = 'col-12';
        el.innerHTML = `<div class="custom-card p-0">${img}<div class="p-3">${
          title ? `<h5 class="mb-2">${title}</h5>` : ''
        }${
          n.content ? `<p class="mb-2" style="white-space:pre-wrap">${(n.content||'')}</p>` : ''
        }<div class="text-secondary small">${ when ? new Date(when).toLocaleString() : '' }</div></div></div>`;
        listEl.appendChild(el);
      }
      shown = next;
      // toggle load more
      if (moreBtn){
        if (shown < __all.length) { moreBtn.style.display = 'block'; }
        else { moreBtn.style.display = 'none'; }
      }
      // empty state
      if (!__all.length){ if (emptyEl) emptyEl.style.display='block'; }
      else { if (emptyEl) emptyEl.style.display='none'; }
    }

    // realtime data
    const nref = ref(d, 'news');
    const unsub = onValue(nref, snap => {
      const map = {};
      snap.forEach(c => { map[c.key] = { id:c.key, ...(c.val()||{}) }; });
      __all = Object.values(map).sort((a,b)=>( (b.createdAt||b.timestamp||0) - (a.createdAt||a.timestamp||0) )).reverse();
      renderSlice(true);
    }, err => console.error('News bind failed', err));

    window.__NEWS_UNSUB = () => { try{ off(nref); }catch(e){} };

    // load more click
    if (moreBtn && !moreBtn.__bound){
      moreBtn.__bound = true;
      moreBtn.addEventListener('click', ()=> renderSlice(false));
    }
  };

  // auto-bind as before
  if (location.hash === '#news') { window.__bindNewsOnce(); }
  setTimeout(()=>{ 
    const sec = document.getElementById('news-section');
    if (sec && (sec.style.display === '' || sec.style.display === 'block')) window.__bindNewsOnce();
  }, 600);
})();
// ===== /NEWS: client-side paging =====



(function(){
  function safeAudio(id){
    try{
      var el=document.getElementById(id);
      if(el){
        fetch(el.src,{method:'HEAD'}).then(function(r){
          if(!r.ok){ el.removeAttribute('src'); }
        }).catch(function(){ el.removeAttribute('src'); });
      }
    }catch(e){}
  }
  // try to guard known audio elements if present
  safeAudio('bgMusic');
  safeAudio('clickSound');
})();



(function(){
  // Section switcher fallback (if project doesn't already have one)
  if (typeof window.showSection !== 'function') {
    window.showSection = function(id){
      document.querySelectorAll('.section').forEach(s=> s.style.display='none');
      var el = document.getElementById(id); if (el) el.style.display='block';
      document.querySelectorAll('.bottom-nav .nav-item').forEach(n=> n.classList.remove('active'));
      var btn = document.querySelector('.bottom-nav .nav-item[data-section="'+id+'"]');
      if (btn) btn.classList.add('active');
    };
  }

  // Click to open News
  const newsBtn = document.getElementById('navNewsBtn');
  if (newsBtn) {
    newsBtn.addEventListener('click', function(){
      showSection('news-section');
      __loadNewsOnce();
    });
  }

  // Realtime news loader (runs once, keeps subscribed)
  let __newsBound = false;
  function __getDb(){
    try { if (typeof db !== 'undefined' && db) return db; } catch(e){}
    try {
      if (typeof getApps==='function' && getApps().length) {
        const a = (typeof getApp==='function') ? getApp() : null;
        if (a && typeof getDatabase==='function') return getDatabase(a);
      }
    } catch(e){}
    try { if (typeof getDatabase==='function') return getDatabase(); } catch(e){}
    return null;
  }

  function __loadNewsOnce(){
    if (__newsBound) return;
    const d = __getDb();
    if (!d) { console.warn('News: DB not ready'); return; }
    __newsBound = true;
    const listEl = document.getElementById('newsListEl');
    const emptyEl = document.getElementById('newsEmptyEl');
    const nref = ref(d, 'news');
    onValue(nref, function(snap){
      const items = [];
      snap.forEach(function(ch){ const v = ch.val() || {}; v.id = ch.key; items.push(v); });
      items.sort(function(a,b){ return ((b.createdAt||b.timestamp||0) - (a.createdAt||a.timestamp||0)); });
      listEl.innerHTML='';
      if (!items.length){ emptyEl.style.display='block'; return; }
      emptyEl.style.display='none';
      items.forEach(function(n){
        const title = n.title || n.tittle || '';
        const when = n.createdAt || n.timestamp || 0;
        const img = n.imageUrl ? ('<img loading="lazy" decoding="async" fetchpriority="low" src="'+n.imageUrl+'" class="card-img-top" style="height:160px;object-fit:cover;border-radius:8px 8px 0 0;">') : '';
        const card = document.createElement('div');
        card.className = 'col-12';
        card.innerHTML = '<div class="custom-card p-0">'+
            img+
            '<div class="p-3">'+
              (title ? '<h5 class="mb-2">'+title+'</h5>' : '')+
              (n.content ? '<p class="mb-2" style="white-space:pre-wrap">'+(n.content||'')+'</p>' : '')+
              '<div class="text-secondary small">'+ (when ? new Date(when).toLocaleString() : '') +'</div>'+
            '</div>'+
          '</div>';
        listEl.appendChild(card);
      });
    });
  }

  // If user deep-links to #news
  if (location.hash === '#news') {
    showSection('news-section');
    __loadNewsOnce();
  }
})();



// v6: ensure dark skin persists after navigation / re-render
(function(){
  function applyNewsSkin(){
    var cards = document.querySelectorAll('#news-section .custom-card');
    cards.forEach(function(el){
      el.style.background = '#121212';
      el.style.color = '#e5e7eb';
      el.style.border = '1px solid rgba(255,255,255,0.08)';
      el.style.borderRadius = '16px';
      el.style.boxShadow = '0 2px 10px rgba(0,0,0,0.35)';
    });
  }
  // Run when DOM updates
  const newsSec = document.getElementById('news-section');
  if (newsSec) {
    const mo = new MutationObserver(function(){ applyNewsSkin(); });
    mo.observe(newsSec, { childList:true, subtree:true });
    // initial
    applyNewsSkin();
  }
  // Patch showSection to call skinner when news is shown
  if (typeof window.showSection === 'function' && !window.__SHOWSECTION_PATCHED_V6){
    window.__SHOWSECTION_PATCHED_V6 = true;
    const __orig = window.showSection;
    window.showSection = function(id){
      try { return __orig.apply(this, arguments); }
      finally { if (id === 'news-section') { setTimeout(applyNewsSkin, 0); } }
    };
  }
  // Also listen to nav button
  document.getElementById('navNewsBtn')?.addEventListener('click', function(){ setTimeout(applyNewsSkin, 0); });
  // Expose for manual trigger if needed
  window.__applyNewsSkin = applyNewsSkin;
})();



// v8: clicking the header logo opens Wallet section
(function(){
  var logo = document.getElementById('appLogoEl');
  function openWallet(){ 
    if (typeof showSection === 'function') { showSection('wallet-section'); }
    else { window.location.hash = '#wallet-section'; }
  }
  if (logo && !logo.__walletBound){ 
    logo.__walletBound = true; 
    logo.addEventListener('click', openWallet);
  }
  // also if header is rendered later, re-bind on DOM changes
  var hdr = document.body;
  if (hdr && !window.__walletMo){
    window.__walletMo = new MutationObserver(function(){
      var l = document.getElementById('appLogoEl');
      if (l && !l.__walletBound){ l.__walletBound = true; l.style.cursor='pointer'; l.addEventListener('click', openWallet); }
    });
    window.__walletMo.observe(hdr, { childList:true, subtree:true });
  }
})();



// v13: username click opens profile and focuses name editor
(function(){
  function bindUserNameClick(){
    var el = document.getElementById('headerUserGreetingEl');
    if(!el || el.__v13Bound) return;
    el.__v13Bound = true;
    el.addEventListener('click', function(){
      try{
        if(typeof showSection === 'function'){ showSection('profile-section'); }
        // focus after section shows
        setTimeout(function(){
          var input = document.getElementById('editNameInput') 
                   || document.getElementById('profileNameInput') 
                   || document.querySelector('#profile-section input[type="text"]');
          if(input){ input.focus(); input.select && input.select(); }
        }, 200);
      }catch(e){ console.warn('v13 username click err', e); }
    });
  }
  // initial and after mutations
  bindUserNameClick();
  var mo = new MutationObserver(bindUserNameClick);
  mo.observe(document.body, {childList:true, subtree:true});
})();



// v14: Click on username => open "Change Your Name" modal directly
(function(){
  function ensureBootstrapModal(){
    // bootstrap 5 expected on window.bootstrap
    if (window.bootstrap && typeof window.bootstrap.Modal === 'function') return true;
    return false;
  }
  function openEditNameModal(){
    var mEl = document.getElementById('editNameModal');
    if(!mEl){ console.warn('editNameModal not found'); return; }
    if (ensureBootstrapModal()){
      try{
        var modal = window.__editNameModalInstance || (window.__editNameModalInstance = new bootstrap.Modal(mEl, {backdrop:true}));
        modal.show();
      }catch(e){ console.warn('Bootstrap modal show error', e); mEl.style.display='block'; }
    } else {
      // fallback: simple display
      mEl.style.display='block';
      mEl.classList.add('show');
    }
    setTimeout(function(){
      var input = document.getElementById('editNameInput');
      if(input){ input.focus(); input.select && input.select(); }
    }, 200);
  }
  function bind(){
    var nameEl = document.getElementById('headerUserGreetingEl');
    if(nameEl && !nameEl.__nameModalBound){
      nameEl.__nameModalBound = true;
      nameEl.style.cursor = 'pointer';
      nameEl.addEventListener('click', function(e){
        e.preventDefault();
        openEditNameModal();
      });
    }
  }
  bind();
  var mo = new MutationObserver(bind);
  mo.observe(document.body, {childList:true, subtree:true});
})();



// v15: Notifications switch logic (localStorage + browser permission)
(function(){
  const SWITCH_ID = 'notificationSwitchEl';
  const STORAGE_KEY = 'notifEnabled';
  function $(id){ return document.getElementById(id); }

  function initSwitchState(){
    const sw = $(SWITCH_ID);
    if(!sw) return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if(saved !== null){
      sw.checked = saved === '1';
    } else {
      // default on if markup had checked
      localStorage.setItem(STORAGE_KEY, sw.checked ? '1' : '0');
    }
  }

  async function handleToggle(e){
    const sw = e.currentTarget;
    if(sw.checked){
      // Request notification permission
      try{
        if (!('Notification' in window)){
          alert('Notifications are not supported in this browser.');
          sw.checked = false;
          localStorage.setItem(STORAGE_KEY, '0');
          return;
        }
        const perm = await Notification.requestPermission();
        if(perm === 'granted'){
          localStorage.setItem(STORAGE_KEY, '1');
          // Optional: show a sample notification
          try{ new Notification('Notifications enabled', { body: 'You will receive alerts here.' }); }catch(_){}
        } else {
          sw.checked = false;
          localStorage.setItem(STORAGE_KEY, '0');
          alert('Permission denied. Notifications remain off.');
        }
      }catch(err){
        console.warn('Notification perm error', err);
        sw.checked = false;
        localStorage.setItem(STORAGE_KEY, '0');
      }
    } else {
      localStorage.setItem(STORAGE_KEY, '0');
    }
  }

  function bind(){
    const sw = $(SWITCH_ID);
    if(!sw || sw.__boundV15) return;
    sw.__boundV15 = true;
    sw.addEventListener('change', handleToggle);
  }

  // init
  initSwitchState();
  bind();
  // re-bind if DOM changes
  const mo = new MutationObserver(() => bind());
  mo.observe(document.body, { childList: true, subtree: true });
})();



// Simple dropdown for Joined Players on match details page
document.addEventListener('DOMContentLoaded', function(){
  const toggleBtn = document.getElementById('joinedPlayersToggleBtn');
  const body = document.getElementById('joinedPlayersBody');
  const arrow = document.getElementById('joinedPlayersArrow');
  if(!toggleBtn || !body) return;
  // ensure hidden by default
  body.style.display = 'none';
  toggleBtn.addEventListener('click', function(){
    const isHidden = body.style.display === 'none' || body.style.display === '';
    body.style.display = isHidden ? 'block' : 'none';
    if(arrow){ arrow.textContent = isHidden ? '▲' : '▼'; }
  });
});
// ===== Added by assistant: ensure Mobile Number field exists under signup email =====
(function ensureSignupMobileField() {
    try {
        var emailInput = document.getElementById('signupEmailInputEl');
        if (!emailInput) return;
        if (document.getElementById('signupMobileInputEl')) return;
        var emailGroup = emailInput.closest('.mb-3') || emailInput.parentElement;
        if (!emailGroup || !emailGroup.parentElement) return;
        var wrapper = document.createElement('div');
        wrapper.className = 'mb-3';
        wrapper.innerHTML = '\n                                <label for="signupMobileInputEl" class="form-label">Mobile Number</label>\n                                <input type="tel" class="form-control" id="signupMobileInputEl" placeholder="Enter mobile number">\n                            ';
        emailGroup.parentElement.insertBefore(wrapper, emailGroup.nextSibling);
    } catch (e) {
        console.error('Failed to inject mobile field in signup form:', e);
    }
})();
// ===== End added by assistant =====



// ===== Added by assistant: default to SIGNUP form on initial load =====
document.addEventListener('DOMContentLoaded', function () {
    try {
        if (typeof toggleAuthForm === 'function') {
            // false => show signup, true => show login
            toggleAuthForm(false);
        }
    } catch (e) {
        console.error('Failed to force signup as default:', e);
    }
});
// ===== End added by assistant =====




document.addEventListener('DOMContentLoaded', function () {
    if (typeof toggleAuthForm === 'function') {
        toggleAuthForm(false); // show signup
    }
});
