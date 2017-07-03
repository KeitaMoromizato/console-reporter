function logHandler() {
  const supportLogLevel = ['log', 'debug', 'info', 'warn', 'error'];
  supportLogLevel.forEach(logLevel => {
    console[logLevel] = (...args) => {
      alert(args);
    }
  });
  window.onerror = error => {
    alert(error)
  }
}

const injectScript = `(${logHandler})()`;

// inject script tag
const script = document.createElement("script");
script.textContent = injectScript;
document.head.appendChild(script)
