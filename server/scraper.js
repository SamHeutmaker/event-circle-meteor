Meteor.startup(function() {
  // Scrapes event data
  (function() {

    const SOURCE = 'events12';

    const Xray = Meteor.npmRequire('x-ray');

    var xray = new Xray();

    const months = ['january', 'february', 'march', 'april', 'may',
      'june'
    ];

    months.forEach(function(month, index) {

      var stringToScrape = 'http://www.events12.com/seattle/' + month +
        '/';

      xray(stringToScrape, '.event', [{
        title: '.title',
        date: '.date',
        link: 'a @href',
        allContent: '@html'
      }])(Meteor.bindEnvironment(function(err, content) {
        var newMapped = content.forEach(function(el, i) {

          var newEvent = {
            name: el.title,
            date: el.date,
            url: el.link,
            allContent: el.allContent,
            source: SOURCE,
          };

          if (newEvent.date.indexOf('-') > 0) {

            newEvent.firstDate = newEvent.date.split(' -');

            newEvent.firstDate = newEvent.firstDate[0] +
              ', 2016';

            newEvent.unixDate = Date.parse(newEvent.firstDate);

          } else {
            newEvent.unixDate = Date.parse(newEvent.date);
          }

          var shouldAdd = true;

          shouldAdd = Events.findOne({
            name: newEvent.name,
            unixDate: newEvent.unixDate
          });


          if (shouldAdd === undefined) {
            Events.insert(newEvent);
            // console.log(i + '/' + content.length + ' for month ' + month + ' INSERTED.');
          } else {
            // console.log(i + '/' + content.length + ' for month ' + month + ' SKIPPED.');
            // return console.log(newEvent.name);
            return null;
          }
        });
      }));
    });
  })();

  // Scrape thestranger.com
  (function() {


    const SOURCE = 'thestranger';

    const Xray = Meteor.npmRequire('x-ray');
    const stall = Meteor.npmRequire('stall');

    var sleep = stall(function(timeout, done) {
      //just make sure to call done() to yield back the event loop
      setTimeout(done, timeout)
    })

    var xray = new Xray();

    var months = [{
      name: 'february',
      length: 28,
      monthNumber: '02'
    }, {
      name: 'march',
      length: 31,
      monthNumber: '03'
    }, {
      name: 'april',
      length: 30,
      monthNumber: '04'
    }, {
      name: 'may',
      length: 31,
      monthNumber: '05'
    }, {
      name: 'june',
      length: 30,
      monthNumber: '06'
    }, {
      name: 'july',
      length: 31,
      monthNumber: '07'
    }, {
      name: 'august',
      length: 30,
      monthNumber: '08'
    }];


    var baseUrl = 'http://thestranger.com/events//2016-';

    months.forEach(function(month, index) {
      for (let day = 1; day < month.length; day++) {

        let twoDigits = (day > 9) ? '' : '0';

        let stringToScrape = baseUrl + month.monthNumber + '-' +
          twoDigits + day;
        console.log(stringToScrape);

        sleep(2000);

        xray(stringToScrape, '.calendar-post', [{
          allContent: '@html'
        }])(Meteor.bindEnvironment(function(err, content) {
          console.log(content.allContent);
        }));

      }
    });
  })();
});
