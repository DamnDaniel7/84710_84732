define(['plugins/http', 'durandal/app', 'knockout'], function (http, app, ko) {

    var ViewModel = function () {
        console.log('ViewModel initiated...');
        var self = this;
        var url = location.hash;
        var id = url.split("/").pop();
        var languagesidUri = 'http://192.168.160.39/api/Languages/';
        self.error = ko.observableArray();
        self.languageInfo = ko.observableArray([]);
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

        getLanguage = function () {
            ajaxHelper(languagesidUri + id, 'GET').done(function (data) {
                self.languageInfo(data);
            });
        };
        //---- Chamada inicial
        getLanguage();

    };

    return ViewModel;
});