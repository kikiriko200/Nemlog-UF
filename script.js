$(function(){// 目次挿入
  $("html").css("scroll-behavior","smooth");
  var div = $("<div></div>", {
    addClass: "card blog-toc"
  });
  var title = $(".blog-header h1").text();
  div.html('<div class="card-header"><p class="card-header-title has-text-centered has-text-white nem-b" style="margin:0">'+title+':目次(´▽｀)</p></dt></div>');
  var countId = 0;
  $(".blog-body h1,.blog-body h2,.blog-body h3,.blog-body h4,.blog-body h5,.blog-body h6").each(function(){
    countId ++;
    var ttl = $(this).text();
    var lv = this.nodeName.toLowerCase();
    this.id = 'ttl-' + countId;
    div.append("<dd class='lv_"+lv+"'><a href='#"+this.id+"'>"+ttl+"</a></dd>");
  });
  div.append("<div class='card-footer'><p class='card-footer-item'>&copy; <a href='https://nemlog.nem.social/profile/3620'>DAFU</a></p></div>");
  if(countId <= 1){//見出しが2個ない場合表示しない
    div.css("display","none");
  }
  if($(window).width()>769){
    $(".stick-side").prepend(div);
  }else{
    $(".blog-body").prepend(div);
  }
});
$(function(){//読了時間目安
  const now = location.href;
  var count = 0;
  console.log(now);
  if(now === 'https://nemlog.nem.social/'){
    $('.card_outline').each(function(){
      count ++;
      var content = $('<span></span>', {
        addClass: `inv-${count} article-read-time`
      });
      content.attr('id', 'read-time'+count);
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
            var length = $(this).text().length;
            var mintime = Math.ceil(length / 500);
            var maxtime = Math.ceil(length / 1000);
            var time = maxtime+'～'+mintime;
            if (mintime === 1){
              time = '1分未満';
            }else{
              time = time+'分';
            }
            console.log('URL: '+blog+':'+length+'文字');
            content.append('<i class="fas fa-hourglass-half"></i>'+time+'('+length+'文字)');
          }
        })
      })
    })
  }else if(~now.indexOf('blog') || ~now.indexOf('adventure')){
    length = $('.blog-body').text().length;
    mintime = Math.ceil(length / 500);
    maxtime = Math.ceil(length / 1000);
    time = maxtime+'～'+mintime;
    if (mintime === 1){
      time = '1分未満';
    }else{
      time = time+'分';
    }
    length = '<p><i class="fas fa-hourglass-half"></i>'+time+'('+length+'文字)</p><br>';
    console.log(length);
    $('.m10.mt15').prepend(length);
  }
})
