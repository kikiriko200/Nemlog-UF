chrome.runtime.sendMessage({method: 'getItem', key: "comment-img"}, function (response) {
  if (response.data === 'on') {
    console.log('Comment-img:ON');
    const cB = $('.comment_box');
    // Imgur
    var imgur = /(http:|https:)\/\/i\.imgur\.com\/.{5,7}\.(JPG|PNG)/gi;
    imgur = cB.text().match(imgur);
    if(imgur){
      $('.comment_box:contains("imgur")').addClass("has-imgur");
      for (var i=0; i<imgur.length; ++i){
        var filename=imgur[i].replace(/(http(s):)\/\/i\.imgur\.com\//, "");
        var width = cB.parent().width()+'px';
        var inner=imgur[i].replace(imgur[i],"<a href='//i.imgur.com/"+filename+"' target='_blank'><img src='//i.imgur.com/"+filename+"' alt='' style='display:block;max-width:"+width+"'></a>");
        console.log('#'+i+':'+inner);
        $('.has-imgur').eq(i).html(inner);
      }
    }

    // Gyazo
    var gyazo = /(http:|https:)\/\/i\.gyazo\.com\/.{1,64}\.(JPG|PNG)/gi;
    gyazo = cB.text().match(gyazo);
    if(gyazo){
      $('.comment_box:contains("gyazo")').addClass("has-gyazo");
      for (var i=0; i<gyazo.length; ++i){
        var filename=gyazo[i].replace(/(http:|https:)\/\/i\.gyazo\.com\//, "");
        var width = cB.parent().width()+'px';
        var inner=gyazo[i].replace(gyazo[i],"<a href='//i.gyazo.com/"+filename+"' target='_blank'><img src='//i.gyazo.com/"+filename+"' alt='' style='display:block;max-width:"+width+"'></a>");
        console.log('#'+i+':'+inner);
        $('.has-gyazo').eq(i).append(inner);
      }
    }

    // Upload Imgur
    var upload = '<input id="upload-img" type="file">'
    $('#comment-anchor .has-text-right').prepend(upload);
    $('#upload-img').change(function(){
      if (this.files.length > 0) {
        var file = this.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
          var fileType;
          var imgdata = reader.result.split(',')[1];
          if (file.type.match(/image/)){
            fileType = file.type.replace(/image\//,"");
          }else{
            return;
          }
          $.ajax({
            url: 'https://api.imgur.com/3/image',
            headers: {
            'Authorization': 'Client-ID 822495165852723 '
            },
            type: 'POST',
            data: {'image': imgdata},
          })
          .done((response) => {
            var id = response.data.id;
            var link = "https://i.imgur.com/"+id+"."+fileType;
            var value = $("#comment").val();
            // 結果
            $("#comment").val(value + link + "\n");
            // 初期化
            $("#upload-img").val("");
          })
        }
      }
    })
  }else{
    console.log('Comment-img:OFF');
  }
});
