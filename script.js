
let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        deferredPrompt = e;
    });

if ('serviceWorker' in navigator && 'PushManager' in window) {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();


            const installButton = document.createElement('button');
            installButton.textContent = 'Install App';
            installButton.style.position = 'fixed';
            installButton.style.top = '10px';
            installButton.style.left = '50%';
            installButton.style.transform = 'translateX(-50%)';
            installButton.style.zIndex = '9999';
            installButton.style.padding = '10px 20px';
            installButton.classList.add('btn-grad');
            installButton.style.color = 'white';
            installButton.style.border = 'none';
            installButton.style.borderRadius = '5px';
            installButton.style.cursor = 'pointer';

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

            document.body.appendChild(installButton);
        });
    }

// window.addEventListener("DOMContentLoaded", (event) => {
//     const installApp = document.getElementById('install');
//     install.addEventListener('click', async () => {
//         if (deferredPrompt !== null) {
//             deferredPrompt.prompt();
//             const { outcome } = await deferredPrompt.userChoice;
//             if (outcome === 'accepted') {
//                 deferredPrompt = null;
//             }
//         }
//     });
// });




