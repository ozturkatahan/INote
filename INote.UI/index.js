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
    $scope.user = {
        Email: "ozturkatahan5@gmail.com",
        Password: "Ankara1.",
        ConfirmPassword: "Ankara1.",
    };

    $scope.register = function (event) {
        event.preventDefault();
        $http.post(apiUrl + "api/Account/Register", $scope.user)
            .then(function (result) {
                console.log(result);
                alert("Kayıt Başarılı");
            }, function (response) {
                    console.log(response);
                    alert("Kayıt Başarısız");
            
            });
    };
});