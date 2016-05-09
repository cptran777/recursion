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

function parseJSON(jString){
  
  var output = jString;
  
  // Creating an object to hold and track the overall JSON string:
  
  var stringTrack = {
    json: jString,
    position: -1,
    nextChar: function(){
      this.position += this.position < this.json.length ? 1 : 0;
      return this.json[this.position];
    },
    prevChar: function(){
      this.position -= 1;
      return this.json[this.position];
    },
    remainingJString: function(){
      return this.json.slice(this.position);
    },
    movePosition: function(num){
      for(var x = 0; x < num; x++){
        this.position += this.position < this.json.length ? 1 : 0;
      }
    }
  };
  
  // The function that will recursively be called to parse the JSON string
  
  var parser = function(){
    
    var output;
    var nextParse = stringTrack.nextChar();
    
    console.log(nextParse);
    
    var numberBuilder = function(){
      output = nextParse;
      var nextNumCheck = stringTrack.nextChar();
      while(nextNumCheck.match(/[0-9]/)){
        output += nextNumCheck;
        nextNumCheck = stringTrack.nextChar();
      }
      stringTrack.prevChar();
      output = Number(output);
    };    
    
    // For booleans, null, undefined, NaN's
    var valueBuilder = function(){
      if(nextParse === "f"){
        nextParse = stringTrack.nextChar();
        if(nextParse !== "a"){
          throw new SyntaxError("Unexpected token in JSON at position 1");
        } else {
          stringTrack.movePosition(3);
          output = false;
        }
      }
      if(nextParse === "t"){
        stringTrack.movePosition(3);
        output = true;
      }
      if(nextParse === "u"){
        throw new SyntaxError("Unexpected token in JSON at position 0");
      }
      if(nextParse === "n"){
        stringTrack.movePosition(3);
        output = null;
      }
    };
    
    var stringBuilder = function(){
      var nextChar = stringTrack.nextChar();
      console.log("string build: " + nextChar);
      while(nextChar !== "\"" && stringTrack.position < stringTrack.json.length){
        output += nextChar;
        nextChar = stringTrack.nextChar();
      }
    };
    
    var arrayBuilder = function(){
      output.push(parser());
      if(stringTrack.nextChar() === ","){
        arrayBuilder();
      }
    };
    
    var objectBuilder = function(){
      var buildKey = parser();
      stringTrack.nextChar();
      output[buildKey] = parser();
      if(stringTrack.nextChar() === ","){
        objectBuilder();
      }
    };
    
    var mappingFunction = function(){
      if(nextParse === "{"){
        output = {};
        objectBuilder();
      } else if(nextParse === "\""){
        output = "";
        stringBuilder();
      } else if(nextParse === "["){
        output = [];
        arrayBuilder();
      } else if(nextParse.match(/[0-9]/)){
        numberBuilder();
      } else {
        valueBuilder();
      }
    };
    
    mappingFunction();
    
    return output;
    
  };
  
  return parser();
  
}
