const mmNumbers = ['၀','၁','၂','၃','၄','၅','၆','၇','၈','၉']

export const convertToMyanmarNumbers = (englishNumber) => {  
    return englishNumber
      .toString()
      .split('')
      .map((digit) => mmNumbers[parseInt(digit)])
      .join('');
};
