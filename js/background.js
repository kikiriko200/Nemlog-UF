// 初期値
if(typeof localStorage["toc"] === 'undefined'){
  localStorage["toc"] = 'on'
}
if(typeof localStorage["read-time"] === 'undefined'){
  localStorage["read-time"] = 'off'
}
if(typeof localStorage["price"] === 'undefined'){
  localStorage["price"] = 'on'
}
if(typeof localStorage["comment-img"] === 'undefined'){
  localStorage["comment-img"] = 'on'
}

console.log("TOC:"+localStorage["toc"]);
console.log("PRICE:"+localStorage["price"]);
console.log("READ-TIME:"+localStorage["read-time"]);
console.log("COMMENT-IMG:"+localStorage["comment-img"]);

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.method === 'getItem') {
    sendResponse({
      data: localStorage.getItem(request.key)
    })
  }else{
    console.log('No method.');
  }
});
