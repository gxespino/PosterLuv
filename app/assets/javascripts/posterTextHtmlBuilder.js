function PosterTextHtmlBuilder(username, text) {
  this.styledText = function() {
    var textArray   = text.split(" ");
    var styledArray = []

    for (var i = 0; i < textArray.length; i++) {
      var word = textArray[i]

      switch (word.split("")[0]) {
        case '#':
          var hashtag = `<span class="at-username">${word}</span>`
          styledArray.push(hashtag);
          break;
        case '@':
          var username = `<span class="at-username">${word}</span>`
          styledArray.push(username);
          break;
        default:
          styledArray.push(word);
      }
    }

    return styledArray.join(" ");
  }

  this.build = function() {
    return `
      <p class="instagram-text">
        <span class="username">${username} </span>
        ${this.styledText()}
      </p>
    `
  }
}
