$(document).ready(function(){
  $(function(){//読了時間目安
    const now = location.href.replace(/\#.*$/, '').replace(/\?.*$/, '');
    const rccb = $('.rank-card-content-box');
    if( now === 'https://nemlog.nem.social/' || ~now.indexOf('https://nemlog.nem.social/search') ){
      $('.rank-card').each(function(){
        $(this).css('max-height','unset');
        rccb.css({'overflow':'unset','height':'fit-content'});
        var span = $('<span></span>', {
          addClass: `article-read-time`
        });
        span.prepend('<br>');
        $(this).find(rccb).append(span);
        var blog = $(this).data('href');
        $.ajax({
          url: blog,
          type: 'GET',
          dataType: 'text'
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
          dataType: 'text'
        })
        .done((data) => {
          $(data).find('div').each(function(){
            if($(this).is('.blog-body')){
              length = $(this).text().length;
              mintime = Math.ceil(length / 500);
              maxtime = Math.ceil(length / 1000);
              time = maxtime+'～'+mintime;
              if (mintime === 1){
                time = '1分未満';
              }else{
                time = time+'分';
              }
              content.append('<i class="fas fa-hourglass-half"></i>&nbsp;'+time+'('+length+'文字)');
            }
          })
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
        rccb.css({'overflow':'unset','height':'fit-content'});
        var span = $('<span></span>', {
          addClass: `article-read-time`
        });
        span.prepend('<br>');
        $(this).find(rccb).append(span);
        var blog = $(this).data('href');
        $.ajax({
          url: blog,
          type: 'GET',
          dataType: 'text'
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
        rccb.css({'overflow':'unset','height':'fit-content'});
        var span = $('<span></span>', {
          addClass: `article-read-time`
        });
        span.prepend('<br>');
        $(this).find(rccb).append(span);
        blog = $(this).data('href');
        $.ajax({
          url: blog,
          type: 'GET',
          dataType: 'text'
        })
        .done((data) => {
          length = $(data).find('div.blog-body').text().length;
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
      $('article.message').each(function(){
        var span = $('<span></span>', {
          addClass: `article-read-time`
        });
        $(this).find('.rank-card-content').append(span);
        blog = $(this).find('.other-card').data('href');
        $.ajax({
          url: blog,
          type: 'GET',
          dataType: 'text'
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
