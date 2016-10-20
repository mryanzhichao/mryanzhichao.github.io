var cf=angular.module("filters",[]);
cf.filter("unique",function(){
	return function(data,property){
		if(angular.isArray(data)){
			var categoryNames=[];
			var obj={};
			for(var i=0;i<data.length;i++){
				var category=data[i][property];
				if(angular.isUndefined(obj[category])){
					categoryNames.push(category);
					obj[category]=true;
				}
			}

			return categoryNames;
		}else{
			return [];
		}
	}
})