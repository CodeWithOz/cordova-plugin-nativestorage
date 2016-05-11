var NativeStorageError = require('./NativeStorageError');

function LocalStorageHandle(success, error, intent, operation, [reference, variable]) {
    if (operation.startsWith('put') || operation.startsWith('set')) {
        try {
            var varAsString = JSON.stringify(variable);
            if(reference==null){
            	error(new NativeStorageError(NativeStorageError.NULL_REFERENCE, "JS", ""));
        	   return;
            }
            localStorage.setItem(reference, varAsString);
            success(varAsString);
        } catch (err) {
            error(new NativeStorageError(NativeStorageError.JSON_ERROR, "JS", err));
        }
    }
    else if (operation.startsWith('get')) {
    	var obj = {};
    	obj = localStorage.getItem(reference);
    	if(obj===null){
    		error(new NativeStorageError(NativeStorageError.ITEM_NOT_FOUND, "JS", ""));
    		return;
    	}
        try {
            var obj = JSON.parse(obj);
            //console.log("LocalStorage Reading: "+obj);
            success(obj);
        } catch (err) {
            error(new NativeStorageError(NativeStorageError.JSON_ERROR, "JS", err));
        }
    }
}
module.exports = LocalStorageHandle;