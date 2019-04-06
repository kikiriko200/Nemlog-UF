chrome.runtime.sendMessage({method: 'getItem', key: "price"}, function (response) {
  if (response.data === 'on') {
    console.log('Price:ON');
    $(document).ready(function(){
      var widget = '<script src="https://widgets.coingecko.com/coingecko-coin-ticker-widget.js"></script><coingecko-coin-ticker-widget  coin-id="nem" currency="jpy" locale="ja"></coingecko-coin-ticker-widget>';
      var widget2 = '<script src="https://widgets.coingecko.com/coingecko-coin-price-static-headline-widget.js"></script><coingecko-coin-price-static-headline-widget  coin-ids="nem,bitcoin" currency="jpy" locale="ja"></coingecko-coin-price-static-headline-widget>';
      if (~location.href.indexOf('profile')){
        $('.stick-side').prepend(widget);
      }else if($(window).width()>769){
        $('.container .column').eq(-1).prepend(widget);
      }else{
        $('.container .column').eq(1).prepend(widget2);
      }
    })
  }else{
    console.log('Price:OFF');
  }
});
