chrome.runtime.sendMessage({method: 'getItem', key: "comment-img"}, function (response) {
  if (response.data === 'on') {
    console.log('Comment-Movie:ON')
    const cB = $('.comment_box')
    const width = $('.media').width() - $('.comment-img-box').width()
    // Youtube
    var youtube = /(http:\/\/|https:\/\/)www\.youtube\.com\/watch\?v\=.{1,11}/gi
    var youtube2 = /(http:\/\/|https:\/\/)youtu\.be\/.{1,11}/gi
    youtube = cB.text().match(youtube)
    youtube2 = cB.text().match(youtube2)
    if(youtube){
      $('.comment_box:contains("https://www.youtube.com/watch?v=")').addClass("has-youtube");
      for (var i=0; i<youtube.length; ++i){
        console.log(youtube[i])
        let youtubeId = youtube[i].replace('https://www.youtube.com/watch?v=', '')
        if (youtube[i].slice(-1) === 'h'){
          youtubeId = youtubeId.replace(youtube[i].slice(-1),'')
        }
        console.log('ID:'+youtubeId)
        const youtubeInner = youtube[i].replace(youtube[i], '<iframe src="https://www.youtube.com/embed/'+youtubeId+'" width="'+width+'" height="500" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
        $('.has-youtube').eq(i).append(youtubeInner)
      }
    }

    if(youtube2){
      $('.comment_box:contains("https://youtu.be/")').addClass("has-youtube2");
      for (var i=0; i<youtube2.length; ++i){
        console.log(youtube2[i])
        const youtube2Id = youtube2[i].replace('https://youtu.be/', '')
        console.log('ID:'+youtube2Id)
        const youtube2Inner = youtube2[i].replace(youtube2[i], '<iframe src="https://www.youtube.com/embed/'+youtube2Id+'"width='+width+' height="500" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
        $('.has-youtube2').eq(i).append(youtube2Inner)
      }
    }

    // TODO:Niconico
  }else{
    console.log('Comment-Movie:OFF');
  }
})
