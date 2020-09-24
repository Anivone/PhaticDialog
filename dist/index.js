const wordpos = (window.wordpos = new WordPOS({
  dictPath: "https://cdn.jsdelivr.net/npm/wordpos-web@1.0.2/dict",
  profile: true,
  debug: true,
}));

$('#message').on('submit', event => {
    console.log('submitted');
    wordpos.getPOS($('#message-text').val(), result => {
        console.log(result);
        let nouns = function() {
            return result.nouns.filter(x => result.adjectives.indexOf(x) === -1);
        }();
        $('.replies').append(
            `<p>${nouns}</p>`
        )
    });
    return false;
})