define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {

    var ViewModel = function () {
        console.log('ViewModel initiated...');
        var self = this;
        var url = location.hash;
        var id = url.split("/").pop();
        var actorsidUri = 'http://192.168.160.39/api/Actors/';
        self.error = ko.observableArray();
        self.actorInfo = ko.observableArray([]);
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
            ajaxHelper(actorsidUri + id, 'GET').done(function (data) {
                self.actorInfo(data);
            });
        };
        //---- Chamada inicial
        getActor();

    };

    return ViewModel;
});