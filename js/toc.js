chrome.runtime.sendMessage({method: 'getItem', key: "toc"}, function (response) {
  if (response.data === 'on') {
    console.log('TOC:ON');
    $(document).ready(function(){
      const now = location.href;
      if( ~now.indexOf('blog') || ~now.indexOf('adventure') ){// 目次挿入
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
      };
    })
  }else{
    console.log('TOC:OFF');
  }
});
