export const formatMoney = (number) => {
    if (number > 1000) {
        let formattedNumber = number.toLocaleString('en-US');
        formattedNumber = formattedNumber.replace(',', '.');
        return formattedNumber;
    }
    return number;
}
