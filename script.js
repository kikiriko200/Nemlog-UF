$(function(){
  $("html").css("scroll-behavior","smooth");
  var div = $("<div></div>", {
    addClass: "card blog-toc"
  });
  var title = $(".blog-header h1").text();
  div.html('<div class="card-header"><p class="card-header-title has-text-centered has-text-white nem-b mt0 mr0 ml0 mb0">'+title+':目次(´▽｀)</p></dt></div>');
  var countId = 1
  $(".blog-body h1,.blog-body h2,.blog-body h3,.blog-body h4,.blog-body h5,.blog-body h6").each(function(){
    var ttl = $(this).text();
    var lv = this.nodeName.toLowerCase();
    this.id = 'ttl-' + countId;
    countId ++;
    div.append("<dd class='lv_"+lv+"'><a href='#'+this.id+'>"+ttl+"</a></dd>");
  });
  div.append("<div class='card-footer'><p class='card-footer-item'>&copy; DAFU</p></div>");
  if($(window).width()>769){
    $(".stick-side").prepend(div);
  }else{
    $(".blog-body").prepend(div);
  }
});
