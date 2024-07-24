// let deferredPrompt;
//     window.addEventListener('beforeinstallprompt', (e) => {
//         deferredPrompt = e;
//     });

// window.addEventListener("DOMContentLoaded", (event) => {
//     const installApp = document.getElementById('installApp');
//     if (installApp) {
//     installApp.addEventListener('click', async () => {
//         if (deferredPrompt !== null) {
//             deferredPrompt.prompt();
//             const { outcome } = await deferredPrompt.userChoice;
//             if (outcome === 'accepted') {
//                 deferredPrompt = null;
//             }
//         }
//     });
//     }
// });

            installButton.addEventListener('click', () => {

                deferredPrompt.prompt();

                deferredPrompt.userChoice.then(choiceResult => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('App installed');
                    } else {
                        console.log('App installation declined');
                    }

                    installButton.style.display = 'none';
                });
            });

