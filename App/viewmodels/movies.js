define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {

    var ViewModel = function () {
        console.log('ViewModel initiated...');
        //---Variáveis locais
        var self = this;
        var searchMoviesUri = 'http://192.168.160.39/api/Movies/Search/';
        var moviesUri = 'http://192.168.160.39/api/Movies';
        var moviesBudgetUri = 'http://192.168.160.39/api/Movies/Budget';
        var moviesgrossUri = 'http://192.168.160.39/api/Movies/Gross';
        var moviesCountUri = 'http://192.168.160.39/api/Movies/Count';
        self.searchText = ko.observable("");
        self.movies = ko.observableArray();
        self.moviesCount = ko.observable(null);
        self.error = ko.observable();
        self.searchTextGood = ko.computed(function () {
            return self.searchText().length < 3;
        }, self);
        //--- Funções internas
        function ajaxHelper(uri, method, data) {
            self.error(''); // Clear error message
            return $.ajax({
                type: method,
                url: uri,
                dataType: 'json',
                contentType: 'application/json',
                data: data ? JSON.stringify(data) : null,
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("AJAX Call[" + uri + "] Fail...");
                    self.error(errorThrown);
                }
            });
        }
        //--- Funções visíveis do exterior
        getAllMovies = function () {
            console.log('CALL: getAllMovies...');
            ajaxHelper(moviesCountUri, 'GET').done(function (data) {
                self.moviesCount(data);
            });
            ajaxHelper(moviesUri, 'GET').done(function (data) {
                self.movies(data);
            });
        };
        showBudget = function () {
            console.log('CALL: searchMovies...');
            ajaxHelper(moviesBudgetUri, 'GET').done(function (data) {
                self.movies(data);
            });
        };
        showGross = function () {
            console.log('CALL: searchMovies...');
            ajaxHelper(moviesgrossUri, 'GET').done(function (data) {
                self.movies(data);
            });
        };
        clearMovies = function () {
            getAllMovies();
            self.searchText("");
        };
        searchMovies = function () {
            console.log('CALL: searchMovies...');
            ajaxHelper(searchMoviesUri + self.searchText(), 'GET').done(function (data) {
                self.movies(data);
            });
        };
        //---- Chamada inicial
        getAllMovies();
    };

    return ViewModel;
});
