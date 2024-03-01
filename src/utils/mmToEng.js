export const mmToEng = (myanmarNumber) => {
    const myanmarNumerals = ['၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉', '၀'];
    const englishNumerals = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  
    let result = myanmarNumber;
    for (let i = 0; i < myanmarNumerals.length; i++) {
      const regex = new RegExp(myanmarNumerals[i], 'g');
      result = result.replace(regex, englishNumerals[i]);
    }
  
    return result;
};
