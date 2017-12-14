function PreviewChanger(data) {
  // Options
  this.commentsToPreview = 2

  // Data
  this.username               = data['username'];
  this.profilePicUrl          = data['profile_pic_url'];
  this.displayUrl             = data['display_url'];
  this.likeCount              = data['like_count'];
  this.weeksAgo               = data['taken_at_timestamp'];
  this.edgeMediaCaptionText   = data['edge_media_to_caption'];
  this.edgeMediaCommentsArray = data['edge_media_to_comment_array'];

  // Preview Elements
  this.usernameElement           = document.getElementById('username');
  this.profilePicElement         = document.getElementById('profile-pic');
  this.displayUrlPicElement      = document.getElementById('display-pic');
  this.likeCountElement          = document.getElementById('like-count');
  this.weeksAgoElement           = document.getElementById('weeks-ago');
  this.posterTextCaptionElement  = document.getElementById('poster-text-caption');
  this.posterTextCommentsElement = document.getElementById('poster-text-comments');

  this.likeCountText = function() {
    if (this.likeCount === 1) {
      return this.likeCount + " like"
    } else {
      return this.likeCount + " likes"
    }
  }

  this.posterComments = function() {
    var posterCommentsArray = []

    for (var i = 0; i < this.commentsToPreview; i++) {
      var comment  = this.edgeMediaCommentsArray[i]

      if (comment == null) { continue; }

      var username = comment['username'];
      var text     = comment['text'];

      posterCommentsArray.push(new PosterTextHtmlBuilder(username, text).build());
    }

    return posterCommentsArray.join("")
  }

  this.change = function() {
    this.usernameElement.innerText           = this.username;
    this.profilePicElement.src               = this.profilePicUrl;
    this.displayUrlPicElement.src            = this.displayUrl;
    this.likeCountElement.innerText          = this.likeCountText();
    this.weeksAgoElement.innerText           = new UnixDateConverter(this.weeksAgo).getTimeAgo();
    this.posterTextCaptionElement.innerHTML  = new PosterTextHtmlBuilder(this.username,
                                                                         this.edgeMediaCaptionText).build();
    this.posterTextCommentsElement.innerHTML = this.posterComments();
  }
}
