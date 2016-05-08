// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

/*Brainstorm: 
* parseJSON = function(){
	
	// The parse function should have some kind of tracker to hold the current 
	// position of the string and provide the next character
	var stringTracker(){
		track position
		return next character
	}

	// The parse function should be able to build objects/values based on the
	// grammar

	var objectBuilder = function(){
		build object
		find key based on traversing the string - can be done with a string builder
		function key = stringBuilder();
		object[key] = parseJSON on the remainder of the string
			// parseJSON should return whatever is the value to the key
		objectBuilder should then take the remainder of the string not used by
		the call to parseJSON and find if there should be another key, then
		repeat process else
			return the object.
	}

	var arrayBuilder = function(){
		build empty array
		parseJSON the remainder of the string and push the value to the array. If 
		parseJSON did not use the entire remainder, find if there should be another
		value in the array, if so repeat process. Else
			return the array
	}

	var stringBuilder = function(){
		build emptystring
		traverse the jsonstring and until we reach the end \", add each to the
		empty string. 
			return string
	}

	var integerBuilder = function(){
		traverses the json string until the end of the value then
			return Number(the part of the string)
	}

	return some accumulated output

}



the provided grammar. Within each function, the string should be traversed to 
* interpret the value







*/

var parseJSON = function(json) {
  // your code goes here
};
