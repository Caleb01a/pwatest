let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
        deferredPrompt = e;
    });

window.addEventListener("DOMContentLoaded", (event) => {
    const installApp = document.getElementById('installApp');
    if (installApp) {
    installApp.addEventListener('click', async () => {
        if (deferredPrompt !== null) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                deferredPrompt = null;
            }
        }
    });
    }
});



