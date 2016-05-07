// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
	var results = [];

	var getElements = function(searchNode, findClass){
		if(searchNode.classList){
			if(searchNode.classList.contains(findClass)){
				results.push(searchNode);
			}
		}
		var nodeLength = searchNode.childNodes.length;
		for(var x = 0; x < nodeLength; x++){
			getElements(searchNode.childNodes[x], findClass);
		}
	};

	getElements(document.body, className);

	return results;
};
