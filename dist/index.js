const wordpos = (window.wordpos = new WordPOS({
  dictPath: "https://cdn.jsdelivr.net/npm/wordpos-web@1.0.2/dict",
  profile: true,
  debug: true,
}));

let phraseCounter = {};

const phrases = [
  "Tell me more about ",
  "What can you tell me about ",
  "Please, don`t be so shortspoken",
];

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

let processReply = function (result) {
  let selectedNoun = result.nouns[result.nouns.length - 1];

  return selectedNoun;
};

$("#message").on("submit", (event) => {
  console.log("submitted");

  $(".replies").append(userMsg($("#message-text").val()));

  wordpos.getPOS($("#message-text").val(), (result) => {
    console.log(result);
    $(".replies").append(botMsg(processReply(result)));
  });

  $("#message-text").val("");
  return false;
});
