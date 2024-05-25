interface RegexList {
    customerNumber: RegExp;
    referenceMonth: RegExp;
    electricity: RegExp;
    electricitySCEE: RegExp;
    electricityGDI: RegExp;
    municipal: RegExp;
    numbersOnly: RegExp;
}

const regexList : RegexList = {
    customerNumber: /\s[\d]{10}\s/i,
    referenceMonth: /[A-Za-z]+\/\d{4}/,
    electricity: /Energia Elétrica.*/,
    electricitySCEE: /Energia SCEE.*/,
    electricityGDI : /Energia compensada.*/,
    municipal: /Contrib.*/,
    numbersOnly: /(\d+,\d+|\d+)/g
}

export default class RegExHandler {
    text: string;

    constructor(text : string) {
        this.text = text;
    }

    exec(regexName : string, idx : number) {
        const match = regexList[regexName as keyof RegexList]?.exec(this.text);
        const result = match ? match[idx] : null;
        if(result) result.trim();
        return result;
    }

    onlyNumbers(text : string | null) {
        const match = text ? text.match(regexList.numbersOnly) : null;
        if(!match) return []
        return match
    }
}
