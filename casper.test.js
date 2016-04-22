var testInputString = 'CasperJS Test input...';

casper.test.begin('Interact with webpage', 5, function(test) {
  casper.start('http://localhost:8080');
  casper.viewport(1024, 768);
  casper.then(function() {
    test.assertTitle('Angular App', 'Webpage loaded');
  })
  casper.waitForSelector('#action', function() {
    test.assertExists('#action', 'Landing page loaded');
    this.waitForText
    this.click('#action');
  });
  casper.waitForSelector('table', function() {
    test.assertExists('table', 'Table loaded');
  });
  casper.waitForSelector('form#todoAdd', function() {
    casper.waitForSelector('input#text', function() {
      this.sendKeys('input#text', testInputString);
    });
    casper.waitForSelector('form#todoAdd #add', function() {
      this.click('form#todoAdd #add');
    });
  });
  casper.waitForText(testInputString, function() {
    test.assertTextExists(testInputString, 'Testing input successful');
  });
  casper.waitFor(function() {
    var hasText = this.fetchText().indexOf(testInputString) >= 0;
    this.click('tbody>tr:last-child i.fa-trash');
    return !hasText;
  });
  casper.then(function() {
    test.assertSelectorDoesntHaveText('table>tbody', testInputString, 'Testing input successfully removed');
  })

  casper.run(function() {
    test.done();
  })
})
