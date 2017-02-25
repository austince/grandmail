let gmail, popup, popupText, popupSendButton, emailId;
const grandmaData = {
  subject: '',
  recipient: '',
  reason: '',
  attachments: []
};

const baseGrandmaImgUrl = `${window.GRANDMAIL_CONFIG.baseImgURL}grandma-stuff/`;
const attachmentOptions = [
  `${baseGrandmaImgUrl}bagel.jpg`,
  `${baseGrandmaImgUrl}cat.jpg`,
  `${baseGrandmaImgUrl}dentures.jpg`,
  `${baseGrandmaImgUrl}doctor.jpg`,
  `${baseGrandmaImgUrl}gnome.jpg`,
  `${baseGrandmaImgUrl}golden-girls.jpg`,
  `${baseGrandmaImgUrl}golg.jpg`,
  `${baseGrandmaImgUrl}hearing-aide.jpg`,
  `${baseGrandmaImgUrl}jax-teller.jpg`,
  `${baseGrandmaImgUrl}phone.jpg`,
  `${baseGrandmaImgUrl}rummikub.jpg`,
  `${baseGrandmaImgUrl}soup.jpg`,
  `${baseGrandmaImgUrl}walker.jpg`,
];

const recipientOptions = [
  "son",
  "daughter",
  "GRANDDAUGHTER",
  "GRANDSON",
  "GRANDDAUGHTER'S BOYFRIEND",
  "HAROLD",
  "son-in-law",
  "daughter-in-law"
];

const reasonOptions = [
  "you haven't called me in two weeks",
  "my cat is sick",
  "about the last golden girls episode",
  "Aunt Rosemary died",
  "I need to go to the doctor",
  "I can't eat salty foods anymore",
  "I have new neighbors and they have ugly lawn decor",
  "I sent you $200 why haven't you called me?",
  "a new bagel store opened down the road",
  "(insert ellipsis)",
  "I found you a boyfriend",
  "I don't know why you're not married yet",
  "I NEED YOU TO EXPLAIN MY PRINTER TO ME"
];

function refresh(f) {
  if( (/in/.test(document.readyState)) || (typeof Gmail === undefined) ) {
    setTimeout('refresh(' + f + ')', 10);
  } else {
    f();
  }
}

let init = function(){
  // NOTE: Always use the latest version of gmail.js from
  // https://github.com/KartikTalwar/gmail.js
  gmail = new Gmail();
  gmail.observe.on('load', main);
  createPopup();
};
refresh(init);

function createPopup() {
  popup = $(
    '<div>', { id: 'grandmail-popup', 'class': 'hidden' }
  );
  popup.append('<h1> GRANDMAIL </h1>');
  popupText = $('<div>', { id: 'grandmail-text-container' });
  popup.append(popupText);
  popupSendButton = $('<div> ELECTRONIC SEND </div>', { id: 'grandmail-send' });
  popup.append(popupSendButton);
  popupSendButton.on('click', send);
  $('body').prepend(popup);
}

function showPopup() {
  popup.attr('class', 'showing');
  popupText.empty();
  let text = $(createPopupText(grandmaData));
  popupText.append(text);
}

function hidePopup() {
  popup.attr('class', 'hidden');
}

function createPopupText() {
  return `<h2>Hello my darling ${createSelectHTML(recipientOptions, 'recipient')}</h2>
          <p>I am writing you an email to tell you ${createSelectHTML(reasonOptions, 'reason')}</p>
          
          <p>Love you bunches, <br> Bubbie ❤ </p>
          `;
}

function createEmailText() {
  return `<h2>Hello my darling ${$('#grandmail-popup #recipient').val()}</h2>
          <p>I am writing you an email to tell you ${$('#grandmail-popup #reason').val()}. </p>
          
          <p>Love you bunches, <br> Bubbie ❤ </p>
          `;
}

function createSelectHTML(options, id) {
  const select = $('<select></select>');
  for (let option of options) {
    let optionHtml = $(`<option value="${option}">${option}</option>`);
    select.append(optionHtml);
  }
  return `<select id="${id}">${select.html()}</select>`;
}

function main() {
  gmail.observe.on('compose', showGrandmaCompose);
  console.log("from main");
}

function showGrandmaCompose(emailData) {
  console.log('SHOWING GRANDMA WHO\'S BOSS');
  emailId = emailData.$el;
  showPopup();
}

function send() {
  const email = new gmail.dom.compose(emailId);
  const imgURL = attachmentOptions[Math.floor(Math.random()* attachmentOptions.length)];
  email.subject('FWD: J-DATE');
  email.body(`${createEmailText()} <br> <img src="${imgURL}">`);

  hidePopup();
}

