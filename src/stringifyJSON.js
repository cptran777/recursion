// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(input) {
  var result = "";
  switch(typeof input){
  	case "number": result += input; break;
  	case "string": result += "\"" + input + "\""; break; 
  	case "boolean": result += input; break;
  	case "undefined": return;
  	case "function": return;
  	case "symbol": return;
  	default: if(Array.isArray(input)){
  		result += "[";
  		for(var x = 0; x < input.length; x++){
  			result += stringifyJSON(input[x]);
  			if(x < input.length-1){
  				result += ",";
  			} 
  		}
  		result += "]";
  	} else if(typeof input === "object"){
  		if(input === null){
  			result += "null";
  		} else {
  			result += "{";
  			for(var key in input){
  				if(typeof input[key] === "function" || typeof input[key] === "undefined"){
  				} else {
  					result += stringifyJSON(key) + ":" + stringifyJSON(input[key]) + ",";
  				}
  			}
  			// Removes last comma and adds the closing bracket: 
  			result = result.length > 1 ? result.substring(0, result.length-1) + "}" : result + "}";
  		}
  	}
  	break;
  }
  return result;
};
