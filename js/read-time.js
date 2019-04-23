chrome.runtime.sendMessage({method: 'getItem', key: "read-time"}, function (response) {
  if (response.data === 'on') {
    console.log('Read-time:ON');
    $('body').css({'word-break':'break-all'});
    $(document).ready(function(){
      $(function(){//読了時間目安
        const timeout = '10000';
        const now = location.href.replace(/\#.*$/, '').replace(/\?.*$/, '');
        const rccb = $('.rank-card-content-box');
        if( now === 'https://nemlog.nem.social/' || ~now.indexOf('search') || ~now.indexOf('favorite') ){
          $('.rank-card').each(function(){
            $(this).css('max-height','unset');
            rccb.css({'overflow':'unset','display':'table'});
            var span = $('<span></span>', {
              addClass: `article-read-time`
            });
            span.prepend('<br>');
            $(this).find(rccb).append(span);
            var blog = $(this).data('href');
            $.ajax({
              url: blog,
              type: 'GET',
              dataType: 'text',
              timeout: timeout
            })
            .done((data) => {
              var length = $(data).find('div.blog-body').text().length;
              var mintime = Math.ceil(length / 500);
              var maxtime = Math.ceil(length / 1000);
              var time = maxtime+'～'+mintime;
              if (mintime === 1){
                time = '1分未満';
              }else{
                time = time+'分';
              }
              span.append('<i class="fas fa-hourglass-half"></i>&nbsp;'+time+'('+length+'文字)');
            })
          })
          $('.card_outline').each(function(){
            var content = $('<span></span>', {
              addClass: `article-read-time`
            });
            content.prepend('<br>');
            var there = $(this).find('div.blog-card-content-box');
            $(there).append(content);
            var blog = $(this).data('href');
            $.ajax({
              url: blog,
              type: 'GET',
              dataType: 'text',
              timeout: timeout
            })
            .done((data) => {
              length = $(data).find('.blog-body').text().length;
              mintime = Math.ceil(length / 500);
              maxtime = Math.ceil(length / 1000);
              time = maxtime+'～'+mintime;
              if (mintime === 1){
                time = '1分未満';
              }else{
                time = time+'分';
              }
              content.append('<i class="fas fa-hourglass-half"></i>&nbsp;'+time+'('+length+'文字)');
            })
          })
        }else if( ~now.indexOf('blog') || ~now.indexOf('adventure') ){
          length = $('.blog-body').not('.blog-toc').text().length;
          mintime = Math.ceil(length / 500);
          maxtime = Math.ceil(length / 1000);
          time = maxtime+'～'+mintime;
          if (mintime === 1){
            time = '1分未満';
          }else{
            time = time+'分';
          }
          length = '<p><i class="fas fa-hourglass-half"></i>&nbsp;'+time+'('+length+'文字)</p><br>';
          $('.m10.mt15').prepend(length);
          $('.rank-card').each(function(){
            $(this).css('max-height','unset');
            rccb.css({'overflow':'unset','display':'table'});
            var span = $('<span></span>', {
              addClass: `article-read-time`
            });
            span.prepend('<br>');
            $(this).find(rccb).append(span);
            var blog = $(this).data('href');
            $.ajax({
              url: blog,
              type: 'GET',
              dataType: 'text',
              timeout: timeout
            })
            .done((data) => {
              length = $(data).find('div.blog-body').text().length;
              mintime = Math.ceil(length / 500);
              maxtime = Math.ceil(length / 1000);
              time = maxtime+'～'+mintime;
              if (mintime === 1){
                time = '1分未満';
              }else{
                time = time+'分';
              }
              span.append('<i class="fas fa-hourglass-half"></i>&nbsp;'+time+'('+length+'文字)');
            })
          })
        }else if( ~now.indexOf('profile') ){
          $('.rank-card').each(function(){
            $(this).css('max-height','unset');
            rccb.css({'overflow':'unset','display':'table'});
            var span = $('<span></span>', {
              addClass: `article-read-time`
            });
            span.prepend('<br>');
            $(this).find(rccb).append(span);
            blog = $(this).data('href');
            $.ajax({
              url: blog,
              type: 'GET',
              dataType: 'text',
              timeout: timeout
            })
            .done((data) => {
              length = $(data).find('div.blog-body').text().length;
              mintime = Math.ceil(length / 500);
              maxtime = Math.ceil(length / 1000);
              time = maxtime+'～'+mintime;
              if (mintime === 1){
                time = '1分未満';
              }else{
                time = time+'分';
              }
              span.append('<i class="fas fa-hourglass-half"></i>&nbsp;'+time+'('+length+'文字)');
            })
          })
          $('article.message').each(function(){
            var span = $('<span></span>', {
              addClass: `article-read-time`
            });
            $(this).find('.rank-card-content').append(span);
            blog = $(this).find('.other-card').data('href');
            $.ajax({
              url: blog,
              type: 'GET',
              dataType: 'text',
              timeout: timeout
            })
            .done((data) => {
              length = $(data).find('div.blog-body').text().length;
              mintime = Math.ceil(length / 500);
              maxtime = Math.ceil(length / 1000);
              time = maxtime+'～'+mintime;
              if (mintime === 1){
                time = '1分未満';
              }else{
                time = time+'分';
              }
              span.append('<i class="fas fa-hourglass-half"></i>&nbsp;'+time+'('+length+'文字)');
            })
          })
        }
      })
    })
  }else{
    console.log('Read-time:OFF');
  }
});
