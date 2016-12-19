define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {

    var ViewModel = function () {
        console.log('ViewModel initiated...');
        var self = this;
        var url = location.hash;
        var id = url.split("/").pop();
        var genresidUri = 'http://192.168.160.39/api/Genres/';
        self.error = ko.observableArray();
        self.genreInfo = ko.observableArray([]);
        self.foward = ko.observableArray([]);
        self.previous = ko.observableArray([]);
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

        getGenre = function () {
            ajaxHelper(genresidUri + id, 'GET').done(function (data) {
                self.genreInfo(data);
            });
        };
        //---- Chamada inicial
        getGenre();

    };

    return ViewModel;
});