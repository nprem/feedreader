/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        function test_url(url) {
            it('have a URL defined and URL is not empty', function() {
                expect(url).toBeDefined();
                expect(url.length).not.toBe(0);
            });
        }

        function test_name(name) {
            it('have a name defined and name is not empty', function() {
                expect(name).toBeDefined();
                expect(name.length).not.toBe(0);
            });
        }


        for(var x = 0; x < allFeeds.length; x++) {
            test_url(allFeeds[x].url);
            test_name(allFeeds[x].name);
        }

    });


    describe('The menu', function() {

        it('menu element is hidden by default', function() {
            expect($('body.menu-hidden').length).not.toBe(0);
            //expect($('body')).hasClass('menu-hidden');
        });

         it('menu changes visibility when the menu icon is clicked', function() {
            $('.menu-icon-link').trigger("click");
            expect($('body.menu-hidden').length).toBe(0);

            $('.menu-icon-link').trigger("click");
            expect($('body.menu-hidden').length).not.toBe(0);

        });

    });


    describe('Initial Entries', function() {

         beforeEach(function(done) {
             loadFeed(0);
             done();
         });

         it('there is at least a single .entry element within the .feed container', function() {
            expect($('.feed .entry').length).not.toBe(0);
         });
    });


    describe('New Feed Selection', function() {
        let feed;
        let firstFeed = [];

        beforeEach(function(done) {
            loadFeed(0, function() {
                feed = document.querySelector('.feed');
                Array.from(feed.children).forEach(function(item) {
                    firstFeed.push(item.innerText);
                });

                loadFeed(1, function() {
                    feed = document.querySelector('.feed');
                    done();
                });
            });
        });

        it('content changes when a new feed is loaded', function() {
            Array.from( feed.children).forEach(function(item, index) { 
                expect(firstFeed[index].innerText === item.innerText).toBe(false);
            });
        });
    });

}());
