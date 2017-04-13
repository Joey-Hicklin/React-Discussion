export const filterObject = (object, key, value, previous=null) => {
	let result = null;
	for(let item in object) {
        if(item == key) {
            if(object[item] == value) {
                return {name: previous, object};
            }
        }
        if(object[item] instanceof Object) {
        	previous = item;
        	console.log()
            result = filterObject(object[item], key, value, previous);
            if (result) {
                break;
            }
        } 
    }
    return result;
}