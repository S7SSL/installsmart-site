/* InstallSmart.AI cookie consent (UK GDPR / PECR).
 * Google Analytics runs in Consent Mode v2 with everything denied by default.
 * Analytics cookies are only set after the visitor clicks "Accept".
 * The choice is stored in localStorage ("isa-consent" = "granted" | "denied").
 * Any element with data-cookie-settings reopens the banner.
 */
(function () {
  var KEY = 'isa-consent';
  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function save(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function apply(v) {
    if (typeof window.gtag !== 'function') return;
    window.gtag('consent', 'update', { analytics_storage: v === 'granted' ? 'granted' : 'denied' });
  }

  var css = '#isa-cookie{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:560px;margin:0 auto;' +
    'background:#0d1526;color:#d7e0f0;border:1px solid rgba(0,229,255,.35);border-radius:10px;padding:16px 18px;' +
    'font:14px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:0 10px 30px rgba(0,0,0,.45)}' +
    '#isa-cookie p{margin:0 0 12px}#isa-cookie a{color:#00e5ff}' +
    '#isa-cookie .row{display:flex;gap:10px;flex-wrap:wrap}' +
    '#isa-cookie button{flex:1 1 140px;padding:10px 14px;border-radius:6px;font-weight:600;cursor:pointer;font-size:14px}' +
    '#isa-cookie .yes{background:#00e5ff;color:#06101f;border:0}' +
    '#isa-cookie .no{background:transparent;color:#d7e0f0;border:1px solid #3a4a66}';

  function show() {
    if (document.getElementById('isa-cookie')) return;
    if (!document.getElementById('isa-cookie-css')) {
      var st = document.createElement('style'); st.id = 'isa-cookie-css'; st.textContent = css;
      document.head.appendChild(st);
    }
    var box = document.createElement('div');
    box.id = 'isa-cookie';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Cookie choices');
    box.innerHTML = '<p>We use Google Analytics cookies to see how the site is used. ' +
      'They are only set if you accept. <a href="/privacy">Privacy policy</a></p>' +
      '<div class="row"><button type="button" class="no">Reject</button>' +
      '<button type="button" class="yes">Accept</button></div>';
    box.querySelector('.yes').onclick = function () { save('granted'); apply('granted'); box.remove(); };
    box.querySelector('.no').onclick = function () { save('denied'); apply('denied'); box.remove(); };
    document.body.appendChild(box);
  }

  function init() {
    var v = read();
    if (v) apply(v); else show();
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-cookie-settings]');
      if (t) { e.preventDefault(); show(); }
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
