
const j = document.createElement('script');
j.src = chrome.extension.getURL('vendor/jquery-1.10.2.min.js');
(document.head || document.documentElement).appendChild(j);

const g = document.createElement('script');
g.src = chrome.extension.getURL('vendor/gmail.js');
(document.head || document.documentElement).appendChild(g);


// what a way to expose lol
const configScript = document.createElement('script');
configScript.type = 'text/javascript';
configScript.innerHTML = `window.GRANDMAIL_CONFIG = { baseImgURL: '${chrome.extension.getURL('images/')}' };`;
(document.head || document.documentElement).appendChild(configScript);

const s = document.createElement('script');
s.src = chrome.extension.getURL('scripts/main.js');
(document.head || document.documentElement).appendChild(s);

const styles = document.createElement('link');
styles.href = chrome.extension.getURL('styles/main.css');
styles.rel = 'stylesheet';
(document.head || document.documentElement).appendChild(styles);
