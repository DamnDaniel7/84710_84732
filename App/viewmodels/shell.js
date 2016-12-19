define(['plugins/router', 'durandal/app'], function (router, app) {
    return {
        router: router,
        activate: function () {
            router.map([
                { route: '', title:'Welcome', moduleId: 'viewmodels/welcome', nav: false, menu : 'Home' },
                { route: 'movies', moduleId: 'viewmodels/movies', nav: true, menu: 'movies' },
                { route: 'actors', moduleId: 'viewmodels/actors', nav: true, menu: 'actors' },
                { route: 'directors', moduleId: 'viewmodels/directors', nav: true, menu: 'Directors' },
                { route: 'genres', moduleId: 'viewmodels/genres', nav: true, menu: 'Genres' },
                { route: 'countries', moduleId: 'viewmodels/countries', nav: true, menu: 'Countries' },
                { route: 'languages', moduleId: 'viewmodels/languages', nav: true, menu: 'Languages' },
                { route: 'actorDetails/:id', moduleId: 'viewmodels/actorDetails', nav: false, hash: 'id' },
                { route: 'movieDetails/:id', moduleId: 'viewmodels/movieDetails', nav: false, hash: 'id' },
                { route: 'directorDetails/:id', moduleId: 'viewmodels/directorDetails', nav: false, hash: 'id' },
                { route: 'countryDetails/:id', moduleId: 'viewmodels/countryDetails', nav: false, hash: 'id' },
                { route: 'genreDetails/:id', moduleId: 'viewmodels/genreDetails', nav: false, hash: 'id' },
                { route: 'languageDetails/:id', moduleId: 'viewmodels/languageDetails', nav: false, hash: 'id' }
            ]).buildNavigationModel();
            
            return router.activate();
        }
    };
});