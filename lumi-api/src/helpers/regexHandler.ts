export const regexList : IRegexList = {
    customerNumber: /\s[\d]{10}\s/i,
    referenceMonth: /[A-Za-z]+\/\d{4}/,
    electricity: /Energia Elétrica.*/,
    electricitySCEE: /Energia SCEE.*/,
    electricityGDI : /Energia compensada.*/,
    municipal: /Contrib.*/,
    numbersOnly: /(\d+,\d+|\d+)/g
}

export class RegExHandler {
    text: string;

    constructor(text : string) {
        this.text = text;
    }

    exec(regexName : RegExp, idx : number) {
        const match = regexName.exec(this.text);
        const result = match ? match[idx] : null;
        if(result) result.trim();
        return result;
    }

    getNumbersArray(regexType : IRegexList[keyof IRegexList]) {
        const textResult : string | null = this.exec(regexType, 0);
        const match = textResult ? textResult.match(regexList.numbersOnly) : null;
        if(!match) return []
        return match
    }
}
