
// let deferredPrompt;
//     window.addEventListener('beforeinstallprompt', (e) => {
//         deferredPrompt = e;
//     });

// if ('serviceWorker' in navigator && 'PushManager' in window) {
//         window.addEventListener('beforeinstallprompt', (e) => {
//             e.preventDefault();


//             const installButton = document.createElement('button');
//             installButton.textContent = 'Install App';
//             installButton.style.position = 'fixed';
//             installButton.style.top = '10px';
//             installButton.style.left = '50%';
//             installButton.style.transform = 'translateX(-50%)';
//             installButton.style.zIndex = '9999';
//             installButton.style.padding = '10px 20px';
//             installButton.classList.add('btn-grad');
//             installButton.style.color = 'white';
//             installButton.style.border = 'none';
//             installButton.style.borderRadius = '5px';
//             installButton.style.cursor = 'pointer';

//             installButton.addEventListener('click', () => {

//                 deferredPrompt.prompt();

//                 deferredPrompt.userChoice.then(choiceResult => {
//                     if (choiceResult.outcome === 'accepted') {
//                         console.log('App installed');
//                     } else {
//                         console.log('App installation declined');
//                     }

//                     installButton.style.display = 'none';
//                 });
//             });

//             document.body.appendChild(installButton);
//         });
//     }

// // window.addEventListener("DOMContentLoaded", (event) => {
// //     const installApp = document.getElementById('install');
// //     install.addEventListener('click', async () => {
// //         if (deferredPrompt !== null) {
// //             deferredPrompt.prompt();
// //             const { outcome } = await deferredPrompt.userChoice;
// //             if (outcome === 'accepted') {
// //                 deferredPrompt = null;
// //             }
// //         }
// //     });

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can install the PWA
  showInstallPromotion();
  // Optionally, send analytics event that PWA install promo was shown.
  console.log(`'beforeinstallprompt' event was fired.`);
});

window.addEventListener('appinstalled', () => {
  // Hide the app-provided install promotion
  hideInstallPromotion();
  // Clear the deferredPrompt so it can be garbage collected
  deferredPrompt = null;
  // Optionally, send analytics event to indicate successful install
  console.log('PWA was installed');
});
// // });

function getPWADisplayMode() {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  if (document.referrer.startsWith('android-app://')) {
    return 'twa';
  } else if (navigator.standalone || isStandalone) {
    return 'standalone';
  }
  return 'browser';
}

window.matchMedia('(display-mode: standalone)').addEventListener('change', (evt) => {
  let displayMode = 'browser';
  if (evt.matches) {
    displayMode = 'standalone';
  }
  // Log display mode change to analytics
  console.log('DISPLAY_MODE_CHANGED', displayMode);
});


