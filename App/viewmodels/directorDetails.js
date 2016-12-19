define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {

    var ViewModel = function () {
        console.log('ViewModel initiated...');
        var self = this;
        var url = location.hash;
        var id = url.split("/").pop();
        var directorsidUri = 'http://192.168.160.39/api/Directors/';
        self.error = ko.observableArray();
        self.directorInfo = ko.observableArray([]);
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

        getDirector = function () {
            ajaxHelper(directorsidUri + id, 'GET').done(function (data) {
                self.directorInfo(data);
            });
        };
        //---- Chamada inicial
        getDirector();

    };

    return ViewModel;
});