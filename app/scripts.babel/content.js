
var j = document.createElement('script');
j.src = chrome.extension.getURL('vendor/jquery-1.10.2.min.js');
(document.head || document.documentElement).appendChild(j);

var g = document.createElement('script');
g.src = chrome.extension.getURL('vendor/gmail.js');
(document.head || document.documentElement).appendChild(g);

var s = document.createElement('script');
s.src = chrome.extension.getURL('scripts/main.js');
(document.head || document.documentElement).appendChild(s);
