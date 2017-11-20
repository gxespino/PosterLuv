function InstagramPostFetcher() {
  this.instagramPostUrl = document.getElementById('Instagram-URL').value

  this.fetch = function() {
    var spinnerContainer = document.getElementById('spinner-container');
    var spinner = new Spinner().spin(spinnerContainer);


    $.ajax({
      url: '/instagram_posts',
      type: 'POST',
      data: {
        instagramPostUrl: this.instagramPostUrl
      },
      success: function(data) {
        console.log(data);

        new PreviewChanger(data).change();
        spinner.stop();
      }
    })
  }
}

// TODO
//
// 1. Make external call to Instagram URL
// 2. If JSON, grab and save:
//      - graphql/shortcode_media/displayURL
//      - graphql/shortcode_media/owner/username
//      - graphql/shortcode_media/owner/profile_pic_url
//      - graphql/shortcode_media/edge_media_preview_like/count
//      - graphql/shortcode_media/taken_at_timestamp
//        (needs to be decoded and converted to weeks ago)
//      - graphql/shortcode_media/edge_media_to_caption
//      - graphql/shortcode_media/edge_media_to_comment (iterate through comments)
// 3. Update preview based on the above data
