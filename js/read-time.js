chrome.runtime.sendMessage({method: 'getItem', key: "read-time"},  (response) =>{
  if(response.data === 'on') {
    console.log('Read-time:ON');
    const timeout = 10000;
    const domain = 'https://nemlog.nem.social';
    $('body').css({'word-break':'break-all'});

    $(document).ready(() => {
      $(() => {
        const now = location.href.replace(/\#.*$/, '').replace(/\?.*$/, '');
        if ( now === 'https://nemlog.nem.social/' || ~now.indexOf('search') || ~now.indexOf('favorite') ){
          readTime('.visit-blog');
          $('#timeline').ready(() => {
            setInterval(() => {
              readTime('.blog-card')
            },1000)
          })
        }else if( ~now.indexOf('blog') ){
          length = $('.blog-body').not('.blog-toc').text().length;
          mintime = Math.ceil(length / 500);
          maxtime = Math.ceil(length / 1000);
          time = maxtime+'～'+mintime;
          if (mintime === 1){
            time = '1分未満';
          }else{
            time = time+'分';
          }
          length = '<div class="mr15"><i class="fas fa-hourglass-half"></i>&nbsp;'+time+'('+length+'文字)</div>';
          $('.mt5.ml20').eq(1).prepend(length);
        }else if( ~now.indexOf('profile') ){
          $('ul .pagination').css('height','50px');
          $('#timeline-chromev').ready(() => {
            setInterval(() => {
              $('.blog-card').each(function(){
                if(!$(this).hasClass('article-read-time')){
                  $(this).addClass('article-read-time');
                  var blog = $(this).find('a').eq(0).attr('href');
                  blog = domain + blog;
                  var div = $('<div></div>', {
                    addClass: `article-read-time fs08 pt10 ng-tc1`
                  });
                   var place = $(this).find('.blog-title');
                  $(place).append(div);
                   getBlog(blog,div);
                }
              })
            },1000)
          })
        }
      })
    })

    const readTime = (item) => {
      $(item).each(function(){
        if(item == '.blog-card'){
          if(!$(this).hasClass('article-read-time')){
            $(this).addClass('article-read-time');
            let blog = $(this).find('a').attr('href');
            blog = domain + blog;
            let div = $('<div></div>', {
              addClass: `article-read-time fs08 fw4 ng-tc1`
            });
            let span = $('<span></span>', {
              addClass: `pr7`
            });
            var place = $(this).find('.blog-card-img-box').find('.px10').eq(1);
            $(place).append(div);
            $(div).append(span);
            getBlog(blog,span);
          }
        };
        if(item === '.visit-blog'){
          let blog = $(this).closest('a').attr('href');
          blog = domain + blog;
          let span = $('<div></div>', {
            addClass: `article-read-time ng-tc1 px7`
          });
          let place = $(this).parent().find('.uk-flex');
          $(place).append(span);
          getBlog(blog,span);
        };
      })
    }

    const getBlog = (url,addTarget) =>{
      let id = url.replace('https://nemlog.nem.social/blog/','');
      let date = new Date();
      let nowUnix = Math.floor(date.getTime() / 1000);
      if(localStorage[id] && JSON.parse(localStorage[id])["expired"] > nowUnix){
        let getdata = JSON.parse(localStorage[id]);
        let length = getdata["length"];
        let mintime = Math.ceil(length / 500);
        let maxtime = Math.ceil(length / 1000);
        let time = maxtime+'～'+mintime;
        console.log('(Cache)ID: '+id+' 文字数:'+length+'文字');
        if (mintime === 1){
          time = '1分未満';
        }else{
          time = time+'分';
        }
        addTarget.append('<i class="fas fa-hourglass-half"></i>&nbsp;'+time+'('+length+'文字)');
      }else{
        $.ajax({
          url: url,
          type: 'GET',
          dataType: 'text',
          timeout: timeout
        })
        .done((data) => {
          let length = $(data).find('div.blog-body').text().length;
          let expired = nowUnix + 86400;
          let datalist = {
            length: length,
            expired: expired
          }
          localStorage.setItem(id,JSON.stringify(datalist));
          console.log('ID: '+id+' 文字数:'+length+'文字');
          let mintime = Math.ceil(length / 500);
          let maxtime = Math.ceil(length / 1000);
          let time = maxtime+'～'+mintime;
          if (mintime === 1){
            time = '1分未満';
          }else{
            time = time+'分';
          }
          addTarget.append('<i class="fas fa-hourglass-half"></i>&nbsp;'+time+'('+length+'文字)');
        })
      }
    }
  }else{
    console.log('Read-time:OFF');
  }
})
