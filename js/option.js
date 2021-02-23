$(() => {

  $("#save").click(() => {
    localStorage["toc"] = $("#toc").val();
    localStorage["read-time"] = $("#read-time").val();
    localStorage["price"] = $("#price").val();
    localStorage["comment-img"] = $("#comment-img").val();
    console.log(
      "toc:"+localStorage["toc"]+'\n'+
      'read-time:'+localStorage["read-time"]+'\n'+
      'price:'+localStorage["price"]+'\n'+
      'comment-img:'+localStorage["comment-img"]
    )
  });

  // 初期値設定
  if (localStorage["toc"]) {
    $("#toc").val(localStorage["toc"]);
    console.log("toc:"+localStorage["toc"]);
  }
  if (localStorage["read-time"]) {
    $("#read-time").val(localStorage["read-time"]);
    console.log("read-time:"+localStorage["read-time"]);
  }
  if (localStorage["price"]) {
    $("#price").val(localStorage["price"]);
    console.log("price:"+localStorage["price"]);
  }
  if (localStorage["comment-img"]) {
    $("#comment-img").val(localStorage["comment-img"]);
    console.log("comment-img:"+localStorage["comment-img"]);
  }
});
