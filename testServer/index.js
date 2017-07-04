console.log('index.js loaded...');

let hoge = 'msg'
document.querySelector('#button').addEventListener('click', () => {
  console.log('log');
  console.debug('debug');
  console.warn('warn', { hoge: 'obj' });
  console.info('info', 1);
  console.error('error!');
});
