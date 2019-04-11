chrome.runtime.sendMessage({method: 'getItem', key: "comment-img"}, function (response) {
  if (response.data === 'on') {
    console.log('Comment-img:ON')
    const cB = $('.comment_box');
    // Imgur
    var imgur = /(http:|https:)\/\/i\.imgur\.com\/.{5,7}\.(JPG|JPEG|PNG|GIF|BMP)/gi;
    imgur = cB.text().match(imgur);
    const width = cB.parent().width()+'px';
    if(imgur){
      $('.comment_box:contains("imgur")').addClass("has-imgur");
      for (var i=0; i<imgur.length; ++i){
        //const imgurFile=imgur[i].replace(/(http(s):)\/\/i\.imgur\.com\//, "");
        const imgurInner=imgur[i].replace(imgur[i],"<a href='"+imgur[i]+"' target='_blank'><img src='"+imgur[i]+"' alt='"+imgur[i]+"' style='display:block;max-width:"+width+"'></a>");
        console.log('#'+i+':'+imgurInner);
        $('.has-imgur').eq(i).append(imgurInner);
      }
    }

    // Gyazo
    var gyazo = /(http:|https:)\/\/i\.gyazo\.com\/.{1,64}\.(JPG|JPEG|PNG|GIF|BMP)/gi;
    gyazo = cB.text().match(gyazo);
    if(gyazo){
      $('.comment_box:contains("gyazo")').addClass("has-gyazo");
      for (var i=0; i<gyazo.length; ++i){
        const gyazoInner=gyazo[i].replace(gyazo[i],"<a href='"+gyazo[i]+"' target='_blank'><img src='"+gyazo[i]+"' alt='"+gyazo[i]+"' style='display:block;max-width:"+width+"'></a>");
        console.log('#'+i+':'+gyazoInner);
        $('.has-gyazo').eq(i).append(gyazoInner);
      }
    }

    // Upload Imgur
    var clientId;
    var upload =
    '<p class="help">本日の残投稿可能数:<span id="rate-limit"></span>枚<br>サポートされている拡張子:JPG,JPEG,PNG,GIF,BMP</p>'+
    '<div class="file is-right is-info has-name mb20">'+
      '<label class="file-label" for="upload-img">'+
        '<input id="upload-img" class="file-input" name="resume" type="file" accept=".jpg,.jpeg,.png,.gif,.bmp">'+
        '<span class="file-cta">'+
          '<span class="file-icon"><i class="fas fa-upload"></i></span>'+
          '<span class="file-label">ファイルを選択</span>'+
        '</span>'+
        '<span id="file-name" class="file-name" style="max-width: 100%;"></span>'+
      '</label>'+
    '</div>';
    $('#comment-anchor .has-text-right').prepend(upload);
    $.get('https://api.dafu.cf/nemlog/count.txt',function(data){
      var limit = 1250 - data;
      $('#rate-limit').text(separate(limit));
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
        const count = response;
        const calc = count % 2;
        console.log('count:'+count+' calc:'+calc);
        if (calc === 0){
          clientId = 'Client-ID 822495165852723';
        }else if(calc === 1){
          clientId = 'Client-ID 96cc9613384df75';
        }
      })
      .fail(() => {
        clientId = 'Client-ID 822495165852723';
        console.log('Failed...');
      })
      .always(() =>{
        console.log('Imgur ClientId:'+clientId);
        if (this.files.length > 0) {
          const file = this.files[0];
          const filename = file.name;
          $('#file-name').text(filename);
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function() {
            const imgdata = reader.result.split(',')[1];
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
              limit = xhr.getResponseHeader('x-post-rate-limit-remaining');
              const link = response.data.link;
              const value = $('#comment').val();
              // 結果
              $('#comment').val(value + link + '\n');
              $('#rate-limit').text(separate(limit));
              // 初期化
              $('#upload-img').val('');
              $('#file-name').text('');
            })
          }
        }
      })
    })
    function separate(num){
      return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }
  }else{
    console.log('Comment-img:OFF');
  }
});
