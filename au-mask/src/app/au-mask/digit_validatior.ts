type DigitValidator = (char) => boolean;

const numeriValidator:DigitValidator = (char) => /[0-9]{1}/.test(char);
const loweCaseValidator:DigitValidator = (char) => /[a-z]{1}/.test(char);
const upperCaseValidator:DigitValidator = (char) => /[A-Z]{1}/.test(char);
const anyValidator:DigitValidator = (char) => true;
const numberRangeValidator = (maxValue:Number,char:string) => numeriValidator(char) 
    && parseInt(char) <= maxValue; //number range validator is not a type of Digit validator since it has 2 parm

export const maskDigitValidator:{[key:string]:DigitValidator} = {    
    'a': loweCaseValidator,
    'A': upperCaseValidator,
    '*': anyValidator
}

for (let i = 0; i <= 9; i++) {
    maskDigitValidator[i] = numberRangeValidator.bind(undefined,i);// this number range validator is DigitValidator since it single parameter that is char
    
}