const supportLogLevel = ['log', 'debug', 'info', 'warn', 'error'];

const keys = supportLogLevel.reduce((obj, level) => (obj[level] = true) && obj, {});

chrome.storage.sync.get(Object.assign({}, keys, { enabled: true }), items => {
  supportLogLevel.forEach(level => {
    document.querySelector(`#${level}_button`).checked = items[level];
  });

  document.querySelector('#enable_button').checked = items.enabled;
});

document.querySelector('#save_button').addEventListener('click', () => {
  const data = supportLogLevel.reduce((obj, level) => {
    const { checked } = document.querySelector(`#${level}_button`);
    obj[level] = checked;
    return obj;
  }, {});

  const enabled = document.querySelector('#enable_button').checked;

  chrome.storage.sync.set(Object.assign({}, data, { enabled }), () => {
    alert('ok');
  });
});
