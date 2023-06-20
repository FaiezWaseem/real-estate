class Storage {

    static DEFAULT = 0;
    static JSON = 1;

    static save(key, value, type=Storage.DEFAULT){
        if(type == Storage.JSON){
            window.localStorage.setItem(key, JSON.stringify(value));
        }
        else {
            window.localStorage.setItem(key, value.toString());
        }
    }

    static async get(key, type=Storage.DEFAULT){
        try {
            let data = await window.localStorage.getItem(key) || undefined;
            if (data != undefined) {
                if(type == Storage.JSON){
                    return JSON.parse(data);
                }
                return data;
            }
            else{
                return undefined;
            }
        }
        catch (err){
            return undefined;
        }
    }

    static async clear(){
        await window.localStorage.clear();
    }
}

export default Storage;