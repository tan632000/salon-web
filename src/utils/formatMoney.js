export const formatMoney = (number) => {
    if (number > 1000) {
        let formattedNumber = number.toLocaleString('en-US');
        formattedNumber = formattedNumber.replace(',', '.');
        return formattedNumber;
    }
    return number;
}

export const generateRandomString = (length, characters) => {
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
}