let gmail;


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

};
refresh(init);


function main() {
  gmail.observe.on('compose', showGrandmaCompose);

  console.log("from main");
}

function showGrandmaCompose() {
  console.log('SHOWING GRANDMA WHO\'S BOSS')
}


