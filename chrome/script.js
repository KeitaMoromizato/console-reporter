function logHandler() {
  function report(level, params) {
    fetch('http://localhost:3333', {
      method: 'POST',
      mode: 'no-cors',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({
        level: level,
        messages: [...params]
      })
    })
  }

  const supportLogLevel = ['log', 'debug', 'info', 'warn', 'error'];
  supportLogLevel.forEach(logLevel => {
    console[logLevel] = (...args) => {
      report(logLevel === 'debug' ? 'log' : logLevel, args)
    }
  });
  window.onerror = error => {
    report('error', error.toString())
  }
}

const injectScript = `(${logHandler})()`;

// inject script tag
const script = document.createElement("script");
script.textContent = injectScript;
document.head.appendChild(script)
