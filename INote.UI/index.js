var apiUrl = "http://localhost:53861/";

var app = angular.module("myApp", ["ngRoute"]);

app.config(function ($routeProvider) {
    $routeProvider.when("/", {
        templateUrl: "Pages/Main.html",
        controller: "mainCtrl"
    }).when("/login", {
        templateUrl: "Pages/Login.html",
        controller: "loginCtrl"
    }).when("/register", {
        templateUrl: "Pages/Register.html",
        controller: "registerCtrl"
    });
});

app.controller("mainCtrl", function ($scope) {
    $scope.message = "Ana sayfadasınız."
});

app.controller("loginCtrl", function ($scope) {
    $scope.message = "Giriş yap."
});

app.controller("registerCtrl", function ($scope, $http) {
    $scope.errors = [];

    $scope.user = {
        Email: "ozturkatahan5@gmail.com",
        Password: "Ankara1.",
        ConfirmPassword: "Ankara1.",
    };

    $scope.register = function (event) {
        $scope.errors = [];
        $scope.successMessage = "";
        event.preventDefault();
        $http.post(apiUrl + "api/Account/Register", $scope.user)
            .then(function (response) {
                $scope.user = {
                    Email: "",
                    Password: "",
                    ConfirmPassword: "",
                };
                $scope.successMessage = "Kayıt başarılı. Şimdi giriş sayfasından giriş yapabilirsiniz.";
            }, function (response) {
                $scope.errors = getErrors(response.data.ModelState);
            });
    };

    $scope.hasErrors = function () {
        return $scope.errors.length > 0;
    };
});

function getErrors(modelState) {

    var errors = [];

    for (var key in modelState) {
        for (var i = 0; i < modelState[key].length; i++) {
            errors.push(modelState[key][i]);
            // ayni hatayi bastiği durum icin
            if (modelState[key][i].includes("zaten alınmış")) {
                break;
            }
        }
       
    }

    return errors;
}