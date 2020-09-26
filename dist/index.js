const wordpos = (window.wordpos = new WordPOS({
  dictPath: "https://cdn.jsdelivr.net/npm/wordpos-web@1.0.2/dict",
  profile: true,
  debug: true,
}));

let phraseCounter = {};
const phrases = ["Tell me more about ", "What can you tell me about "];

for (const phrase of phrases) {
  phraseCounter[phrase] = 0;
}

let userMsg = function (msg) {
  return `<div class="user-message">
            <p class="msg">${msg}</p>
          </div>`;
};

let botMsg = function (msg) {
  return `<div class="bot-message">
            <p class="msg">${msg}</p>
          </div>`;
};

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
  if (nouns.indexOf("I") !== -1) answer = "yourself";
  else answer = nouns[nouns.length - 1];

  return selectLeastPopular() + ` ${answer}`;
};

$("#message").on("submit", (event) => {
  console.log("submitted");

  $(".replies").append(userMsg($("#message-text").val()));

  wordpos.getPOS($("#message-text").val(), (result) => {
    console.log(result);
    $(".replies").append(botMsg(processReply(result)));
    console.log(phraseCounter);
  });

  $("#message-text").val("");
  return false;
});
