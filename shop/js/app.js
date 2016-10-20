var app=angular.module("shop",["filters","ngRoute"]);
app.directive('navBar',function(){
	return{
		templateUrl:"template/navBar.html"
	}
});

//控制器&网络请求
app.controller("mainCtrl",function($http,$scope){
	$http({
	  method: 'GET',
	  url: 'php/getProducts.php'
	}).then(function(response) {

	    $scope.products=response.data;//所有的数据

	    //左侧按钮的点击事件关联右侧的数据
	    $scope.getProductsOfCategory=function(category){
	    	//
	    	$scope.choosedCategory=category;
	    	var categoryProducts=[];
	    	if(category=="全部"){
	    		categoryProducts=$scope.products;
	    	}else{
	    		for (var i = 0; i < $scope.products.length; i++) {
		    		if($scope.products[i].category==category){
		    			categoryProducts.push($scope.products[i]);
		    		}
		    	}
	    	};
	    	// console.log(categoryProducts);
	    	$scope.categoryProducts=categoryProducts;
	    	//调用分页方法
	    	$scope.getPages();
	    	$scope.getProductsPerPage(1);

	    }


	    //添加按钮选中样式
	    $scope.getClassOfChoosedCategory=function(category){
	    	return $scope.choosedCategory==category?"btn-primary" : "";
	    }

	    //实现分页
	    $scope.getPages=function(){
	    	//分页的个数
	    	var count=$scope.categoryProducts.length/3;
	    	var pages=[];
	    	for (var i = 0; i < count; i++) {
	    		pages.push(i+1);
	    	};
	    	$scope.pages=pages;
	    }

	    // 实现数据展示为三条
	    $scope.getProductsPerPage=function(page){
	    	$scope.currentPage=page;
	    	var perPageProducts=[];
	    	for (var i = (page-1)*3; i < page*3; i++) {
	    		if($scope.categoryProducts[i]){
	    			perPageProducts.push($scope.categoryProducts[i]);
	    		}

	    	};
	    	$scope.perPageProducts=perPageProducts;
	    }


	    //分页选中按钮样式
	    $scope.getClassOfChoosedPage=function(page){
	    	return $scope.currentPage==page?"btn-primary" : "";
	    }

	    //初始化
	     $scope.getProductsOfCategory("全部");


	     //加入购物车
	     $scope.cars=[];

	     $scope.addToCar=function(p){
	     	//假定购物车里没有商品
	     	var hasThisProduct=false;
	     	for (var i = 0; i < $scope.cars.length; i++) {
	     		if($scope.cars[i].product.name==p.name){
	     			//检查后,发现购物车有了这个商品
	     			hasThisProduct=true;
	     			//然后让商品的数量进行++
	     			$scope.cars[i].count++;
	     		}
	     	};


	     	if(hasThisProduct==false){
	     		$scope.cars.push({product:p,count:1});
	     	}

	     	// console.log($scope.cars);

	     }

	     //购物车的商品数量及价格的动态改变
	     $scope.totalCount=function(){
	     	var total=0;
	     	var totalPrice=0;
	     	for (var i = 0; i < $scope.cars.length; i++) {
	     		total+=$scope.cars[i].count;
	     		totalPrice+=$scope.cars[i].count*$scope.cars[i].product.price;

	     	};
	     	$scope.totalPrice=totalPrice;
	     	return total;
	     }
	     // 删除按钮的方法

		$scope.isDelete = function(p){
			for (var i = 0; i < $scope.cars.length; i++) {
				if($scope.cars[i].name == p.name){
					$scope.cars.splice(i,1);
					break;
				}
			}
		}




	  }, function(response) {

	  });
}).config(function($routeProvider){
		$routeProvider.when("/aa",{templateUrl:"templateA.html"});
		$routeProvider.otherwise({templateUrl:"templateB.html"});
	});