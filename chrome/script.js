const logLevel = ['log', 'debug', 'info', 'warn', 'error'];

function logHandler(supportLogLevel) {
  function report(level, params) {
    originalConsole[level](...params);

    fetch('http://localhost:3333', {
      method: 'POST',
      mode: 'no-cors',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({
        level: level,
        messages: [...params]
      })
    });
  }

  const originalConsole = {};

  supportLogLevel.forEach(logLevel => {
    originalConsole[logLevel] = console[logLevel];

    console[logLevel] = (...args) => {
      report(logLevel === 'debug' ? 'log' : logLevel, args);
    };
  });
  window.onerror = error => {
    report('error', error.toString());
  };
}

const keys = logLevel.reduce((obj, level) => (obj[level] = true) && obj, {});

chrome.storage.sync.get(Object.assign({}, keys, { enabled: true }), items => {
  if (!items.enabled) return;

  const supportLogLevel = logLevel.filter(level => items[level]);
  const str = supportLogLevel.reduce((str, level) => `${str}'${level}',`, '');
  const injectScript = `(${logHandler})([${str.substr(0, str.length - 1)}])`;

  // inject script tag
  const script = document.createElement('script');
  script.textContent = injectScript;
  document.head.appendChild(script);
});

