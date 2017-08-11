/**
 * Created by satvik on 7/19/2017.
 */
var app = angular.module("groceryListApp", ["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl:"view/List.html",
            controller:"HomeController"

        })
        . when("/additem",{
        templateUrl:"view/additem.html",
        controller:"GroceryListItemsController"
        })
        . when("/additem/edit/:id/",{
            templateUrl:"view/additem.html",
            controller:"GroceryListItemsController"
        })
        .otherwise({
            redirectTo:"/"
        })
});

app.service("Groceryservice",function(){
    var grocery={};
    grocery.item=[
        {id:1,complete:true,itemName: 'milk', date: '2014-10-01'},
        {id:2,complete:true,itemName: 'cookies', date: '2014-10-01'},
        {id:3,complete:true,itemName: 'ice cream', date: '2014-10-02'},
        {id:4,complete:true,itemName: 'potatoes', date: '2014-10-02'},
        {id:5,complete:true,itemName: 'cereal', date: '2014-10-03'},
        {id:6,complete:true,itemName: 'bread', date: '2014-10-03'},
        {id:7,complete:true,itemName: 'eggs', date: '2014-10-04'},
        {id:8,complete:true,itemName: 'tortillas', date: '2014-10-04'}
    ];

    grocery.getById= function () {
        if(grocery.newId){
            grocery.newId++;
            return grocery.newId;
        }

        else {
            var maxid=_.max(grocery.item,function(entry){return entry.id;})
            grocery.newId=maxid.id+1;
            return grocery.newId;
        }

    };

    grocery.findById= function(id){
        for(var i in grocery.item ){
            if(grocery.item[i].id===id)
                return grocery.item[i];
        }
    };

    grocery.save=function(entry){
        entry.id=grocery.getById();
        grocery.item.push(entry);
    }
    return grocery;
});

app.controller("HomeController", ["$scope", "Groceryservice", function($scope, Groceryservice) {
    $scope.groceryItems = Groceryservice.item;
}]);

app.controller("GroceryListItemsController", ["$scope","$routeParams","Groceryservice","$location",function($scope,$routeParams,Groceryservice,$location) {

    /*$scope.result="route parameter "+$routeParams.id+" "+$routeParams.cat;
     $scope.items="test";*/
    if (!$routeParams) {

    $scope.groceryItem = {id: 9, complete: true, itemName: '', date: new Date()};
}else
{
    $scope.groceryItem= Groceryservice.findById(parseInt($routeParams));
}
    $scope.save=function(){
        Groceryservice.save($scope.groceryItem);
        $location.path("/");
    }
    console.log($scope.groceryItem);
}]);

