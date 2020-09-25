const wordpos = (window.wordpos = new WordPOS({
    dictPath: "https://cdn.jsdelivr.net/npm/wordpos-web@1.0.2/dict",
    profile: true,
    debug: true,
}));
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