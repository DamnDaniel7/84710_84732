define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {

    var ViewModel = function () {
        console.log('ViewModel initiated...');
        var self = this;
        var x = Math.floor(Math.random() * (2000 - 1 + 1) + 1);
        var actorsidUri = 'http://192.168.160.39/api/Actors/';
        var moviesidUri = 'http://192.168.160.39/api/Movies/';
        var directoridUri = 'http://192.168.160.39/api/Directors/';
        self.error = ko.observableArray();
        self.actor = ko.observableArray([]);
        self.director = ko.observableArray([]);
        self.movies = ko.observableArray([]);
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

        getActor = function () {
            ajaxHelper(actorsidUri + x, 'GET').done(function (data) {
                self.actor(data);
            });
        };
        getDirector = function () {
            ajaxHelper(directoridUri + x, 'GET').done(function (data) {
                self.director(data);
            });
        };
        getMovie = function () {
            ajaxHelper(moviesidUri + x, 'GET').done(function (data) {
                self.movies(data);
            });
        };

        //---- Chamada inicial
        getActor();
        getDirector();
        getMovie();
    };

    return ViewModel;
});