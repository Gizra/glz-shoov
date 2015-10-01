'use strict';

var shoovWebdrivercss = require('shoov-webdrivercss');

// This can be executed by passing the environment argument like this:
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=chrome mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=ie11 mocha
// PROVIDER_PREFIX=browserstack SELECTED_CAPS=iphone5 mocha

var capsConfig = {
  'chrome': {
    'browser' : 'Chrome',
    'browser_version' : '42.0',
    'os' : 'OS X',
    'os_version' : 'Yosemite',
    'resolution' : '1024x768'
  },
  'ie11': {
    'browser' : 'IE',
    'browser_version' : '11.0',
    'os' : 'Windows',
    'os_version' : '7',
    'resolution' : '1024x768'
  }
};

var selectedCaps = process.env.SELECTED_CAPS || undefined;
var caps = selectedCaps ? capsConfig[selectedCaps] : undefined;

var providerPrefix = process.env.PROVIDER_PREFIX ? process.env.PROVIDER_PREFIX + '-' : '';
var testName = selectedCaps ? providerPrefix + selectedCaps : providerPrefix + 'default';

var baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'http://glz.co.il';

var resultsCallback = process.env.DEBUG ? console.log : shoovWebdrivercss.processResults;

describe('Visual monitor testing', function() {

  this.timeout(99999999);
  var client = {};

  before(function(done){
    client = shoovWebdrivercss.before(done, caps);
  });

  after(function(done) {
    shoovWebdrivercss.after(done);
  });

  it('should show the home page',function(done) {
    client
      .url(baseUrl)
      .pause(2000)
      .webdrivercss(testName + '.homepage', {
        name: '1',
        exclude:
          [
            // News.
            '#ticker-holder .tickers_wrapper',
            // Main article image.
            '.bigImage',
            // Related article.
            '.grid_5',
            // Show.
            '.tab1 li',
            // Now on glz.
            '#ctl00_ContentPlaceHolder1_ucLeftSideBar_ucSideListenToBroadcast_rptContent_ctl00_divContent',
            // Left sidebar.
            '#ctl00_ContentPlaceHolder1_ucLeftSideBar_ucSideListBanners_rptBanners_ctl00_divBanner',
            '#ctl00_ContentPlaceHolder1_ucLeftSideBar_ucSideListBanners_rptBanners_ctl01_divBanner',
            '#ctl00_ContentPlaceHolder1_ucLeftSideBar_ucSideListBanners_rptBanners_ctl02_divBanner',
            '#ctl00_ContentPlaceHolder1_ucLeftSideBar_ucSideListBanners_rptBanners_ctl03_divBanner',
          ],
        hide:
          [
            // Related article title and summery.
            '.headlineSubTitle',
            '.headlineText'

          ],
        screenWidth: selectedCaps == 'chrome' ? [960, 1200] : undefined,
      }, resultsCallback)
      .call(done);
  });
});
