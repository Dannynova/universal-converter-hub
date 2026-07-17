// ConverterHub PWA Initializer
// Registers the service worker and shows the install prompt
// ONLY for iOS and desktop users — Android users are directed
// to Google Play Store or the direct APK download instead.

(function() {
  // Detect Android — we skip the PWA install prompt for Android
  // since they have Play Store and direct APK as better options.
  var isAndroid = /android/i.test(navigator.userAgent);

  // Register service worker for everyone (enables caching/offline
  // for all platforms) but only show install UI for non-Android.
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js')
        .then(function(reg) {
          console.log('ConverterHub SW registered:', reg.scope);
        })
        .catch(function(err) {
          console.log('SW registration failed:', err);
        });
    });
  }

  // Skip install prompt entirely for Android users.
  if (isAndroid) return;

  // ── iOS INSTALL BANNER ─────────────────────────────────
  // iOS Safari doesn't support the beforeinstallprompt event —
  // users must manually tap Share → Add to Home Screen.
  // We show a friendly banner explaining this.
  var isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  var isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches
    || window.navigator.standalone;

  if (isIOS && !isInStandaloneMode) {
    // Only show once per session
    if (!sessionStorage.getItem('pwa-banner-shown')) {
      sessionStorage.setItem('pwa-banner-shown', '1');

      var banner = document.createElement('div');
      banner.id = 'pwa-ios-banner';
      banner.innerHTML =
        '<div style="display:flex;align-items:center;gap:12px;flex:1;">' +
          '<img src="/assets/icon/icon.png" width="40" height="40" ' +
               'style="border-radius:10px;flex-shrink:0;" alt="ConverterHub icon">' +
          '<div>' +
            '<strong style="display:block;font-size:0.9rem;">Install ConverterHub</strong>' +
            '<span style="font-size:0.8rem;opacity:0.85;">Tap <b>Share</b> then ' +
            '<b>Add to Home Screen</b></span>' +
          '</div>' +
        '</div>' +
        '<button id="pwa-banner-close" style="background:none;border:none;' +
          'color:white;font-size:1.4rem;cursor:pointer;padding:0 4px;' +
          'line-height:1;flex-shrink:0;">×</button>';

      banner.style.cssText =
        'position:fixed;bottom:0;left:0;right:0;z-index:9999;' +
        'background:linear-gradient(135deg,#2563eb,#7c3aed);' +
        'color:white;padding:14px 16px;display:flex;' +
        'align-items:center;gap:12px;' +
        'box-shadow:0 -2px 16px rgba(0,0,0,0.2);' +
        'font-family:Inter,sans-serif;';

      document.body.appendChild(banner);

      document.getElementById('pwa-banner-close').addEventListener('click', function() {
        banner.remove();
      });
    }
  }

  // ── DESKTOP INSTALL PROMPT ─────────────────────────────
  // Chrome/Edge on Windows, Mac, Linux support the
  // beforeinstallprompt event — we catch it and show a
  // subtle "Install app" button in the page header.
  var deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;

    // Only show if not already installed
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    var installBtn = document.createElement('button');
    installBtn.id = 'pwa-install-btn';
    installBtn.innerHTML = '⬇️ Install App';
    installBtn.style.cssText =
      'background:linear-gradient(135deg,#2563eb,#7c3aed);' +
      'color:white;border:none;border-radius:20px;' +
      'padding:6px 16px;font-size:0.85rem;font-weight:600;' +
      'cursor:pointer;font-family:Inter,sans-serif;';

    installBtn.addEventListener('click', function() {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function() {
          deferredPrompt = null;
          installBtn.remove();
        });
      }
    });

    // Add to top bar if it exists, otherwise body
    var topBar = document.querySelector('.top-bar');
    if (topBar) {
      topBar.appendChild(installBtn);
    } else {
      document.body.appendChild(installBtn);
    }
  });

  window.addEventListener('appinstalled', function() {
    var btn = document.getElementById('pwa-install-btn');
    if (btn) btn.remove();
    deferredPrompt = null;
  });
})();
