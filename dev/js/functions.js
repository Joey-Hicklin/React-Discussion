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

const symbols62 = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const fromShortID = (id) => {
    let num = 0
    const splitID = id.split("").reverse();

    splitID.forEach( (character, index) => {
        num += symbols62.indexOf(character) * Math.pow(62, index);
    });

    return num;
}

export const toBase = (base, decimal=$(this)) => {
    let symbols = symbols62.split("");
    let conversion = "";

    if (base > symbols.length || base <= 1) {
        return false;
    }

    while (decimal >= 1) {
        conversion = symbols[(decimal - (base * Math.floor(decimal / base)))] + conversion;
        decimal = Math.floor(decimal / base);
    }

    return (base < 11) ? parseInt(conversion) : conversion;
}
