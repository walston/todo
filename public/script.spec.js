var webPage = require('webpage');
var page = webPage.create();

page.viewportSize = { width: 1080, height: 768 };

page.onConsoleMessage = function(msg) {
  console.log(msg);
}

page.open('http://localhost:8080', function(status) {
  setTimeout(function() {
    page.render('before.png');
    page.evaluate(function() {
      document.getElementById('action').click();
    });
  }, 1000);
  setTimeout(function() {
    page.render('after.png');
    quit();
  }, 2000);
});

function quit() {
  phantom.exit();
}
