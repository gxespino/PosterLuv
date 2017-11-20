function PosterTextHtmlBuilder(username, text) {
  this.applyTextStyle = function(text) {
    var textArray       = text.split(" ");
    var styledTextArray = [];

    for (var i = 0; i < textArray.length; i++) {
      var word = textArray[i]

      switch (word.split("")[0]) {
        case '#':
          if (word.length <= 1) {
            var hashtag = `${word}`;
          } else {
            var hashtag = `<span class="at-username">${word}</span>`;
          }

          styledTextArray.push(hashtag);
          break;
        case '@':
          if (word.length <= 1) {
            var username = `${word}`;
          } else {
            var username = `<span class="at-username">${word}</span>`;
          }

          styledTextArray.push(username);
          break;
        default:
          styledTextArray.push(word);
      }
    }

    return styledTextArray.join(" ");
  }

  this.styledText = function() {
    var noNewLinesArray = text.split("\n");
    var styledTextArray = [];

    for (var i = 0; i < noNewLinesArray.length; i++) {
      styledTextArray.push(
        this.applyTextStyle(noNewLinesArray[i])
      );
    }

    return styledTextArray.join("<br>");
  }

  this.build = function() {
    if (text == null) { return ""; }

    return `
      <p class="instagram-text">
        <span class="username">${username} </span>
        ${this.styledText()}
      </p>
    `
  }
}
