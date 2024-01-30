import validator from 'validator'

export function validateEmail(email:string) {
    return validator.isEmail(email);
}
export function hasPassedYearMonth(year:number, month:number) {
    const currentDate = new Date();
    const targetDate = new Date(year, month - 1); // Os meses em JavaScript são baseados em 0 (janeiro = 0, fevereiro = 1, etc.)
    return targetDate <= currentDate;
}
  