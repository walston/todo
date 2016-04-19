var webPage = require('webpage');
var page = webPage.create();
var jquery = 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js'

page.viewportSize = { width: 1080, height: 768 };

page.onConsoleMessage = function(msg) {
  console.log(msg);
}

page.open('http://localhost:8080', function start(status) {
  page.includeJs(jquery, function() {
    page.evaluate(function() {
      var primary = document.getElementById('action');
      console.log(primary);
      primary.click();
    });
  });
  setTimeout(function() {
    page.render('after.jpg', {format: 'jpeg', quality: '100'});
    phantom.exit();
  }, 3000);
});
