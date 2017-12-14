function UnixDateConverter(unixTimeStamp) {
  this.getTimeAgo = function() {
    var nowDate     = moment(Date.now())
    var postDate    = moment(new Date(unixTimeStamp * 1000));
    var diffInDays  = nowDate.diff(postDate, 'days')
    var diffInWeeks = Math.round((diffInDays / 7))

    if (diffInDays === 0) {
      return '1d'
    } else if (diffInDays <= 6) {
      return diffInDays + 'd'
    } else {
      return diffInWeeks +'w'
    }
  }
}
