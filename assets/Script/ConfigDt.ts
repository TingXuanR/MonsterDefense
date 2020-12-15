
export default class ConfigDt {
    arrData: any[];
    constructor(arrData: any[]) {
        this.arrData = arrData;
    }

    getDataByID(id: number) {
        for (const data of this.arrData) {
            if(data.id === id)
            {
                return data;
            }
        }
        return null;
    }

    getDataByIndex(index: number) {
        if(typeof(index) !== 'number' || index < 0 || index > this.arrData.length - 1) {
            return;
        }
        return this.arrData[index];
    }

    getSize() {
        return this.arrData.length;
    }
}