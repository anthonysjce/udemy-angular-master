type DigitValidator = (char) => boolean;

const numeriValidator:DigitValidator = (char) => /[0-9]{1}/.test(char);
const loweCaseValidator:DigitValidator = (char) => /[a-z]{1}/.test(char);
const upperCaseValidator:DigitValidator = (char) => /[A-Z]{1}/.test(char);
const anyValidator:DigitValidator = (char) => true;
const numberRangeValidator = (maxValue:Number,char:string) => numeriValidator(char) 
    && parseInt(char) <= maxValue;

export const maskDigitValidator:{[key:string]:DigitValidator} = {
    '9': numeriValidator,
    'a': loweCaseValidator,
    'A': upperCaseValidator,
    '*': anyValidator
}