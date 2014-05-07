/**
 * @aaronksaunders
 * 
 * See more Appcelerator Information on Company Blog
 * blog.clearlyinnovetiove.com
 * 
 */
 var TiParse = function(options) {
    FB = {
        init: function() {
            //debugger;
            Ti.API.info("called FB.init()");
        },
        login: function() {
            Ti.API.info("called FB.login()");
        },
        logout: function() {
            Ti.API.info("called FB.logout()");
        }
    };
    
    Ti.include("parse-1.2.11.js");
    
    
    Parse.localStorage = {
		getItem : function(key) {
			return Ti.App.Properties.getObject(Parse.localStorage.fixKey(key));
		},
		setItem : function(key, value) {
			return Ti.App.Properties.setObject(Parse.localStorage.fixKey(key), value);
		},
		removeItem : function(key, value) {
			return Ti.App.Properties.removeProperty(Parse.localStorage.fixKey(key));
		},
		//Fix Parse Keys. Parse uses a Key containing slashes "/". This is invalid for Titanium Android
		//We'll replace those slashes with underscores ""
		fixKey : function(key) {
			return key.split("/").join("");
		}
	};
   
	Parse._ajax = function(method, url, data, success, error) {
       
        var options = {
            success: success,
            error: error
        };
        
        if ("undefined" != typeof XDomainRequest) return Parse._ajaxIE8(method, url, data)._thenRunCallbacks(options);
        var promise = new Parse.Promise(), handled = !1, xhr = Ti.Network.createHTTPClient({
            timeout: 5e3
        });
        xhr.onreadystatechange = function() {
            if (4 === xhr.readyState) {
                if (handled) return;
                handled = !0;
                if (xhr.status >= 200 && 300 > xhr.status) {
                    var response;
                    try {
                        response = JSON.parse(xhr.responseText);
                    } catch (e) {
                        promise.reject(e);
                    }
                    response && promise.resolve(response, xhr.status, xhr);
                } else promise.reject(xhr);
            }
        };
        xhr.open(method, url, !0);
        xhr.setRequestHeader("Content-Type", "text/plain");
        Parse._isNode && xhr.setRequestHeader("User-Agent", "Parse/" + Parse.VERSION + " (NodeJS " + process.versions.node + ")");
        xhr.send(data);
        return promise._thenRunCallbacks(options);
    };

    //Parse.initialize(option.applicationId, option.javascriptkey);
    Parse.initialize("xxx", "xxx");
		
    Parse.FacebookUtils.init();
    return Parse;
};

module.exports = TiParse;