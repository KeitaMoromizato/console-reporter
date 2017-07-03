console.log('hogehoge');

const supportLogLevel = ['log', 'debug', 'info', 'warn', 'error'];

supportLogLevel.forEach(logLevel => {
  window.console = {
    log: () => {
      alert(arguments);
    }
  }
  /*
  console[logLevel] = () => {
    alert(arguments);
  }
  console.log = () => {
    alert(arguments);
  }
  */
});