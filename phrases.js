const wordpos = (window.wordpos = new WordPOS({
    dictPath: "https://cdn.jsdelivr.net/npm/wordpos-web@1.0.2/dict",
    profile: true,
    debug: true,
}));
let phraseCounter = {};

const phrases = ["Let's talk more about ", "What else you like to do  ",
    "Tell me more about ", "What do you think about ", "What else you can tell me ",
    "I also like ", "Are you a good specialist in ", "Can you rephrase your question?",
    "I think that is a good idea to have a ", "Maybe you can tell me more about ",
    "How often you take a ", "What's happen?", "Are you all right?",
    "What you should do with ", "Do you have a ", "Do you ask a specialist? ",
    "Do you tell somebody about "]

wordpos.getNouns('this is lately a likely tricky business this is')
    .then(res => {
        console.log(res); // ["lately", "likely"]
    });

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


let userMsg = function (msg) {
    return `<div class="msg user-msg align-self-end">${msg}</div>`;
}
let botMsg = function (msg) {
    return `<div class="msg bot-msg align-self-start"> ${msg} </div>`;
}

$(document).ready(function () {
    $(".send-icon").click(function () {
        //user message
        let text = $(".input").val();
        if (text != "") {
            $(".message-area").append(userMsg(text));
            let usr = $(".input").val();
            // console.log(usr.length);
            wordpos.getPOS(usr, (result) => {
            console.log(typeof usr)
            $(".message-area").append(botMsg(processReply(result)));
            });

            let userM = $(".user-msg").last();
        let userMSgLength = $(".user-msg").last().width() + 20 + 'px';
        userM.css("width", userMSgLength);
        $(".input").val("")

        //bot message
        let botM = $(".bot-msg").last();
        let botMSgLength = $(".bot-msg").last().width() + 20 + 'px';
        botM.css("width", botMSgLength);
        }

        


    })
})