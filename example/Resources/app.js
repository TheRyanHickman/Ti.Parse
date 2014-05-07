/* 
 * PARSE SAMPLE CODE
 * from: https://parse.com/apps/quickstart?rf=js#js/blank
 */
var _ = require('lib/underscore');
var TiParse = require("lib/ti.parse")();
		


var loginWin = Ti.UI.createWindow({
	backgroundColor: '#0076C4'
});


var TestObject = TiParse.Object.extend("TestObject");
var testObject = new TestObject();
testObject.save({
    foo : "bar"
}, {
    success : function(object) {
        Ti.API.info("yay! it worked");
        createUser()
    },
    error : function(object, error) {
        // Show the error message somewhere and let the user try again.
        Ti.API.info("Error: " + error.code + " " + error.message);
    }
});
 
//
// CREATE USER
//
 
//
// LOGIN USER
//
function testUserLogin(_user) {
    Parse.User.logIn(_user.get("username"), _user.get("password"), {
        success : function(user) {
            // Do stuff after successful login.
            Ti.API.info("yay! logIn worked " + JSON.stringify(user));
        },
        error : function(user, error) {
            // Show the error message somewhere and let the user try again.
            Ti.API.info("Error: " + error.code + " " + error.message);
        }
    });
}
 
function createUser() {
    var user = new TiParse.User();
    user.set("username", "my name");
    user.set("password", "my pass");
    user.set("email", "email@example.com");
 
    // other fields can be set just like with Parse.Object
    user.set("phone", "415-392-0202");
 
    user.signUp(null, {
        success : function(_user) {
            // Hooray! Let them use the app now.
            Ti.API.info("yay! signUp worked " + JSON.stringify(user));
            testUserLogin(user);
        },
        error : function(_user, error) {
            // Show the error message somewhere and let the user try again.
            Ti.API.info("Error: " + error.code + " " + error.message);
            testUserLogin(user);
        }
    });
}

createUser();

loginWin.open();
