'use strict';

(function initPiwik() {
    var _paq = window._paq || [];
    _paq.push(['trackPageView']);
    _paq.push(['enableLinkTracking']);

    (function() {
        var d = document,
            g = d.createElement('script'),
            s = d.getElementsByTagName('script')[0],
            u = window.OzoneConfig.METRICS_URL + '/';

        _paq.push(['setTrackerUrl', u+'piwik.php']);
        _paq.push(['setSiteId', window.OzoneConfig.METRICS_WEBTOP_SITE_ID]);

        g.type='text/javascript';
        g.async=true;
        g.defer=true;
        g.src=u+'piwik.js';
        s.parentNode.insertBefore(g,s);
    })();

    window._paq = _paq;
})();
