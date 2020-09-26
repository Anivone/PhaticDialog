const wordpos = (window.wordpos = new WordPOS({
  dictPath: "https://cdn.jsdelivr.net/npm/wordpos-web@1.0.2/dict",
  profile: true,
  debug: true,
}));
let phraseCounter = {};

const phrases = [
  "Let's talk more about ",
  "Tell me more about ",
  "What do you think about ",
  "What else can you tell me about ",
  "Maybe you can tell me more about ",
  //   "What else you like to do  ",
  //   "I also like ",
  //   "Are you a good specialist in ",
  //   "Can you rephrase your question?",
  //   "I think that is a good idea to have a ",
  //   "How often you take a ",
  //   "What's happen?",
  //   "Are you all right?",
  //   "What you should do with ",
  //   "Do you have a ",
  //   "Do you ask a specialist? ",
  //   "Do you tell somebody about ",
];

for (const phrase of phrases) {
  phraseCounter[phrase] = 0;
}

let getRandomElem = function (array) {
  let index = Math.floor(Math.random() * array.length);
  return array[index];
};

let selectLeastPopular = function () {
  let minimumKey = getRandomElem(phrases);
  let minimumValue = phraseCounter[minimumKey];

  for (const key in phraseCounter) {
    if (phraseCounter.hasOwnProperty(key)) {
      if (phraseCounter[key] < minimumValue) {
        minimumKey = key;
      }
    }
  }

  phraseCounter[minimumKey]++;
  return minimumKey;
};

let processReply = function (result) {
  let nouns = result.nouns;
  if (nouns.length === 0) return "Could you rephrase the sentence ?";

  let answer = "";
  if (nouns.includes("I")) answer = "yourself";
  else answer = nouns[nouns.length - 1].toLocaleLowerCase();

  if (checkForGreets(nouns)) return "Greetings, nice to see you here !";

  return selectLeastPopular() + ` ${answer}`;
};

let checkForGreets = function (arr) {
  arr = arr.map((x) => x.toLocaleLowerCase());
  return arr.includes("hi") || arr.includes("hello") || arr.includes("hey");
};

let userMsg = function (msg) {
  return `<div class="msg user-msg align-self-end">${msg}</div>`;
};
let botMsg = function (msg) {
  return `<div class="msg bot-msg align-self-start"> ${msg} </div>`;
};

$(document).ready(function () {
  $(".send-button").on('submit',function (event) {
    //user message
    event.preventDefault();
    let text = $(".input").val();
    if (text != "") {
      $(".message-area").append(userMsg(text));
      let usr = $(".input").val();
      // console.log(usr.length);
      wordpos.getPOS(usr, (result) => {
        console.log(typeof usr);
        $(".message-area").append(botMsg(processReply(result)));
        console.log("result ", result);
        console.log("counter ", phraseCounter);
      });
    //   $(".input").val(""););
    }
    
    return false;
});
});
