chrome.runtime.sendMessage({method: 'getItem', key: "price"}, function (response) {
  if (response.data === 'on') {
    console.log('Price:ON');
    $(document).ready(function(){
      //  Coingecko ウィジェット
      var widget = '<!--Nem-Price inserted by Nemlog-UF--><script src="https://widgets.coingecko.com/coingecko-coin-ticker-widget.js"></script><coingecko-coin-ticker-widget  coin-id="nem" currency="jpy" locale="ja"></coingecko-coin-ticker-widget>';
      var widget2 = '<script src="https://widgets.coingecko.com/coingecko-coin-price-static-headline-widget.js"></script><coingecko-coin-price-static-headline-widget  coin-ids="nem,bitcoin" currency="jpy" locale="ja"></coingecko-coin-price-static-headline-widget>';

      if (~location.href.indexOf('profile')){
        $('.stick-side').prepend(widget);
      }else if($(window).width()>769){
        $('.container .column').eq(-1).prepend(widget);
      }else{
        $('.column.is-two-thirds').prepend(widget2);
      }

      // 日本円換算
      setTimeout(function(){
        var api = 'https://api.coingecko.com/api/v3/simple/price?ids=nem&vs_currencies=jpy';
        $.ajax({
          url: api,
          type: 'GET',
          dataType: 'json',
          timeout: 3000
        })
        .done((data) => {
          console.log('Price Readed!!')
          var price = Number(data['nem']['jpy']);
          var nem_balance = $('.nem_wallet_balance').text().replace(' xem','');
          nem_balance = Number(nem_balance);
          var jpy_balance = Math.floor(price * nem_balance);
          var bal_text = '(約' + jpy_balance + '円分)';
          $('.nem_wallet_balance').parent().append(bal_text);
        })
      },5000);
    })
  }else{
    console.log('Price:OFF');
  }
});
