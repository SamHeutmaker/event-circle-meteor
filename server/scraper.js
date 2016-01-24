
Meteor.startup(function() {


  // Scrapes event data
  (function() {

    const SOURCE = 'events12';

    const Xray = Meteor.npmRequire('x-ray');

    var xray = new Xray();

    const months = ['january', 'february', 'march', 'april', 'may', 'june'];

    months.forEach(function(month, index) {

      var stringToScrape = 'http://www.events12.com/seattle/' + month + '/';

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

            newEvent.firstDate = newEvent.firstDate[0] + ', 2016';

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
            console.log(i + '/' + content.length + ' for month ' + month + ' INSERTED.');
          } else {
            console.log(i + '/' + content.length + ' for month ' + month + ' SKIPPED.');
            return console.log(newEvent.name);
          }
        });
      }));
    });




  })();


});


