chrome.runtime.sendMessage({method: 'getItem', key: "comment-img"}, function (response) {
  if (response.data === 'on') {
    console.log('Comment-img:ON')
    const cB = $('.comment_box');
    // Imgur
    var imgur = /(http:|https:)\/\/i\.imgur\.com\/.{5,7}\.(JPG|JPEG|PNG|GIF|BMP)/gi;
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
    var gyazo = /(http:|https:)\/\/i\.gyazo\.com\/.{1,64}\.(JPG|JPEG|PNG|GIF|BMP)/gi;
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
    var clientId;
    var upload =
    '<p>本日の残投稿可能数:<span id="rate-limit"></span>枚<br>サポートされている拡張子:JPG,JPEG,PNG,GIF,BMP</p>'+
    '<div class="file is-right is-info has-name mb20">'+
      '<label class="file-label" for="upload-img">'+
        '<input id="upload-img" class="file-input" name="resume" type="file" accept=".jpg,.jpeg,.png,.gif,.bmp">'+
        '<span class="file-cta">'+
          '<span class="file-icon"><i class="fas fa-upload"></i></span>'+
          '<span class="file-label">ファイルを選択</span>'+
        '</span>'+
        '<span id="file-name" class="file-name" style="max-width: 100%;"></span>'+
      '</label>'+
    '</div>'
    $('#comment-anchor .has-text-right').prepend(upload);
    $.get('https://api.dafu.cf/nemlog/count.txt',function(data){
      var limit = 1250 - data;
      $('#rate-limit').text(limit);
      if(limit <= 0){
        $('#rate-limit').css('color','red');
        $('#file-name').text('制限に達しました。');
        $('span.file-label').text('投稿不可');
        $('.file').addClass('is-danger');
        //$('#upload-img').prop('disabled', true);
      }
    })
    $('#upload-img').change(function(){
      $.ajax({
        url: 'https://api.dafu.cf/nemlog/count.php',
        type: 'GET',
        dataType: 'text',
        cache: false,
      })
      .done((response) => {
        var count = response;
        var calc = count % 2;
        console.log('count:'+count+' calc:'+calc);
        if (calc === 0){
          clientId = 'Client-ID 822495165852723'
        }else if(calc === 1){
          clientId = 'Client-ID 96cc9613384df75'
        }
      })
      .fail(() => {
        clientId = 'Client-ID 822495165852723'
        console.log('Failed...');
      })
      .always(() =>{
        console.log('Imgur ClientId:'+clientId)
        if (this.files.length > 0) {
          var file = this.files[0];
          var filename = file.name;
          $('#file-name').text(filename);
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function() {
            var imgdata = reader.result.split(',')[1];
            $.ajax({
              url: 'https://api.imgur.com/3/image',
              headers: {
              'Authorization': clientId
              },
              type: 'POST',
              data: {'image': imgdata},
            })
            .done((response,status,xhr) => {
              console.log(status);
              var limit = xhr.getResponseHeader('x-post-rate-limit-remaining');
              var link = response.data.link;
              var value = $('#comment').val();
              // 結果
              $('#comment').val(value + link + '\n');
              $('#rate-limit').text(limit)
              // 初期化
              $('#upload-img').val('');
              $('#file-name').text('');
            })
          }
        }
      })
    })
  }else{
    console.log('Comment-img:OFF');
  }
});
