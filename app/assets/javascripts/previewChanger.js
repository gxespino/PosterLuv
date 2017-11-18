function PreviewChanger(data) {
  this.username      = data['username'];
  this.profilePicUrl = data['profile_pic_url'];
  this.displayUrl    = data['display_url'];
  this.likeCount     = data['like_count'];
  this.weeksAgo      = data['taken_at_timestamp'];

  // Preview Elements
  this.usernameElement      = document.getElementById('username');
  this.profilePicElement    = document.getElementById('profile-pic');
  this.displayUrlPicElement = document.getElementById('display-pic');
  this.likeCountElement     = document.getElementById('like-count');
  this.weeksAgoElement      = document.getElementById('weeks-ago');

  this.likeCountText = function() {
    if (this.likeCount === 1) {
      return `${this.likeCount} like`
    } else {
      return `${this.likeCount} likes`
    }
  }

  this.change = function() {
    this.usernameElement.innerText  = this.username;
    this.profilePicElement.src      = this.profilePicUrl;
    this.displayUrlPicElement.src   = this.displayUrl;
    this.likeCountElement.innerText = this.likeCountText();
    this.weeksAgoElement.innerText  = new UnixDateConverter(this.weeksAgo).getTimeAgo();
  }
}
