chrome.runtime.sendMessage({method: 'getItem', key: "comment-img"}, (response) => {
  if (response.data === 'on') {
    console.log('Comment-img:ON')
    const cB = $('p');

    setInterval(() => {
      $('.jscroll-inner').ready(() => {
        comment2imgur();
        comment2gyazo();
        comment2nemgraph();
      })
    },1000)

    // Imgur
    var imgur = /(http:|https:)\/\/i\.imgur\.com\/.{5,7}\.(JPG|JPEG|PNG|GIF|BMP)/gi;
    imgur = cB.text().match(imgur);

    function comment2imgur(){
      if(imgur){
        $('p:contains(imgur)').each(function(index){
          let tt = $(this).text();
          if(!$(this).hasClass('has-imgur')){
            $(this).addClass('has-imgur');
            console.log('#imgur-'+index+':'+tt);
            let width = $(this).parent().width();
            $(this).text(function(){
              let imgur = $(this).text().match(/(http:|https:)\/\/i\.imgur\.com\/.{5,7}\.(JPG|JPEG|PNG|GIF|BMP)/gi).toString();
              const imgurInner = imgur.replace(imgur,"<a href='"+imgur+"' target='_blank'><img src='"+imgur+"' title='"+imgur+"' style='display:block;max-width:"+width+"px'></a>");
              $(this).append(imgurInner);
            })
          }
        })
      }
    }

    // Gyazo
    var gyazo = /(http:|https:)\/\/i\.gyazo\.com\/.{1,64}\.(JPG|JPEG|PNG|GIF|BMP)/gi;
    gyazo = cB.text().match(gyazo);

    function comment2gyazo(){
      if(gyazo){
        $('p:contains(gyazo)').each(function(index){
          let tt2 = $(this).text();
          if(!$(this).hasClass('has-gyazo')){
            $(this).addClass('has-gyazo');
            console.log('#gyazo-'+index+':'+tt2);
            let width = $(this).parent().width();
            $(this).text(function(){
              let gyazo = tt2.match(/(http:|https:)\/\/i\.gyazo\.com\/.{1,64}\.(JPG|JPEG|PNG|GIF|BMP)/gi).toString();
              const gyazoInner = gyazo.replace(gyazo,"<a href='"+gyazo+"' target='_blank'><img src='"+gyazo+"' title='"+gyazo+"' style='display:block;max-width:"+width+"px'></a>");
              $(this).append(gyazoInner);
            })
          }
        })
      }
    }

    // Nemgraph
    var nemgraph = /(http:|https:)\/\/nemgraph\.net\/post\/.{1,4}\/.{1,99}/gi;
    nemgraph = cB.text().match(nemgraph);

    function comment2nemgraph(){
      if(nemgraph){
        $('p:contains(nemgraph)').each(function(index){
          let tt = $(this).text()
          if(!$(this).hasClass('has-nemgraph')){
            $(this).addClass('has-nemgraph');
            console.log('#nemgraph-'+index+':'+tt);
            let width = $(this).parent().width();
            let nemgraph = tt.match(/(http:|https:)\/\/nemgraph\.net\/post\/.{1,4}\/.{1,99}/gi).toString();
            let reqUrl = 'https://api.dafu.cf/nemlog/ajax.php?url='+nemgraph;
            $.ajax({
              url: reqUrl,
              type: 'GET',
              dataType: 'text',
              timeout: 10000
            })
            .done((data) => {
              console.log('DATA:'+data);//ここまで動作
              let imgUrl = data;
              nemgraph = tt.match(/(http:|https:)\/\/nemgraph\.net\/post\/.{1,4}\/.{1,99}/gi).toString();
              console.log('tt:'+nemgraph)
              const nemgraphInner = nemgraph.replace(nemgraph,"<a href='"+nemgraph+"' target='_blank'><img src='"+imgUrl+"' title='"+nemgraph+"' style='display:block;max-width:"+width+"px'></a>");
              $(this).append(nemgraphInner);
            })
          }
        })
      }
    }

    // Upload Imgur
    var clientId;
    var upload =
    '<p class="help">本日の残投稿可能数:<span id="rate-limit"></span>枚<br>サポートされている拡張子:JPG,JPEG,PNG,GIF,BMP</p>'+
      '<div uk-form-custom="target: true" class="mb10">'+
      '<input type="file" id="upload-img" accept=".jpg,.jpeg,.png,.gif,.bmp">'+
      '<input id="file-name" class="uk-input uk-form-width-medium" type="text" placeholder="Select file" disabled>'+
      '<label for="upload-img">'+
      '<button class="uk-button uk-button-primary r05 error-message"><i class="fas fa-upload"></i>ファイルを選択</button>'+
      '</label>'+
    '</div><br>';
    $('.put_comment').parent().prepend(upload);
    $.get('https://api.dafu.cf/nemlog/count.txt',(data) => {
      let limit = 1251 - data;
      $('#rate-limit').text(separate(limit));
      if(limit <= 0){
        $('#rate-limit').css('color','red');
        $('#file-name').text('制限に達しました。');
        $('.error-message').text('投稿不可');
        //$('#upload-img').prop('disabled', true);
      }
    })
    $('#upload-img').on('change',(e) => {
      let targetFile = e.currentTarget;
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
        if (targetFile.files.length > 0) {
          const file = targetFile.files[0];
          const filename = file.name;
          $('#file-name').text(filename);
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () =>{
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
    const separate = (num) => {
      return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    }
  }else{
    console.log('Comment-img:OFF');
  }
});
