chrome.runtime.sendMessage({method: 'getItem', key: "price"}, (response) => {
  if (response.data === 'on') {
    console.log('Price:ON');
    $(document).ready(function(){
      //  Coingecko ウィジェット
      let widget = '<!--Nem-Price inserted by Nemlog-UF--><script src="https://widgets.coingecko.com/coingecko-coin-ticker-widget.js"></script><coingecko-coin-ticker-widget  coin-id="nem" currency="jpy" locale="ja"></coingecko-coin-ticker-widget>';

      $('#lang-box').append(widget);

      // 日本円換算
      setTimeout(() => {
        let api = 'https://api.coingecko.com/api/v3/simple/price?ids=nem&vs_currencies=jpy';
        $.ajax({
          url: api,
          type: 'GET',
          dataType: 'json',
          timeout: 3000
        })
        .done((data) => {
          console.log('Price Readed!!')
          let price = Number(data['nem']['jpy']);
          let nem_balance = $('.nem_wallet_balance').eq(0).text().replace(' xem','');
          nem_balance = Number(nem_balance);
          let jpy_balance = Math.floor(price * nem_balance);
          let bal_text = '(約' + separate(jpy_balance) + '円分)';
          $('.nem_wallet_balance').parent().append(bal_text);
        })
      },5000);

      const separate = (num) => {
        return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
      }
    })
  }else{
    console.log('Price:OFF');
  }
});
