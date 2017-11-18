function UnixDateConverter(unixTimeStamp) {
  this.getTimeAgo = function() {
    var postDate       = new Date(unixTimeStamp);
    var daysAgoString  = moment.unix(unixTimeStamp).fromNow();
    var daysAgoNumber  = parseInt(daysAgoString);
    var weeksAgoNumber = Math.round((daysAgoNumber / 7))

    if (daysAgoNumber <= 6) {
      return `${daysAgoNumber}d`
    } else {
      return `${weeksAgoNumber}w`
    }
  }
}
