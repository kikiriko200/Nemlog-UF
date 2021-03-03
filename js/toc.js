chrome.runtime.sendMessage({method: 'getItem', key: "toc"}, (response) => {
  if (response.data === 'on') {
    console.log('TOC:ON');
    $(document).ready(() => {
      const now = location.href;
      if( ~now.indexOf('blog') ){// 目次挿入
        $("html").css("scroll-behavior","smooth");
        let div = $("<div></div>", {
          addClass: "card blog-toc"
        });
        let title = $(".blog-header h1").text();
        div.html('<div class="card-header"><p class="card-header-title has-text-centered has-text-white nem-b" style="margin:0">'+title+':目次(´▽｀)</p></dt></div>');
        let countId = 0;
        $(".blog-body h1,.blog-body h2,.blog-body h3,.blog-body h4,.blog-body h5,.blog-body h6").each(function(){
          let ttl = $(this).text();
          if(ttl !== '&nbsp;'){
          countId ++;
          let lv = this.nodeName.toLowerCase();
          this.id = 'ttl-' + countId;
          div.append("<dd class='lv_"+lv+"'><a href='#"+this.id+"'>"+ttl+"</a></dd>");
        }});
        div.append("<div class='card-footer'><p class='card-footer-item'>&copy; <a href='https://nemlog.nem.social/profile/3620'>DAFU</a></p></div>");
        if(countId <= 1){//見出しが2個ない場合表示しない
          div.css("display","none");
        }else{
          $("#main-container").css({
            display:"flex",
            margin:"0 auto",
            "max-width": "1300px",
            overflow: "inherit"
          });
          let container = $("<div></div>",{
            addClass: "mw400"
          });
          $("#main-container").append(container);
          if($(window).width()>769){
            div.css({
              "position":"sticky",
              "top":"10px"
            })
            container.append(div);
          }else{
            $(".blog-body").prepend(div);
          }
        }
      };
    })
  }else{
    console.log('TOC:OFF');
  }
});
