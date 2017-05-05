chrome
  .runtime
  .sendMessage({ msg: 'getStatus' }, function (response) {
    if (response.status) {
      let storage = chrome.storage.local;
      storage.get(['type', 'freq', 'q', 'gain'], function (items) {

        type = items.type || 'highshelf';
        freq = items.freq || '17999';
        q = items.q || '0';
        gain = items.gain || '-70';

        let actualCode = `
          var st_type = '${type}',
            st_freq = '${freq}',
            st_q = '${q}',
            st_gain = '${gain}';
          console.log('Settings loaded...');
        `;

        let script = document.createElement('script');
        script.textContent = actualCode;
        (document.head || document.documentElement).appendChild(script);
        script.parentNode.removeChild(script);
      });

      let s = document.createElement('script');
      s.src = chrome.extension.getURL('intercept.js');
      s.onload = function () {
        this.parentNode.removeChild(this);
      };

      (document.head || document.documentElement).appendChild(s);
    }
  });
