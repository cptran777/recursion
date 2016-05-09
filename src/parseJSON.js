// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

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
