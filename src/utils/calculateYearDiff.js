export const calculateYearDiff = (startDateString, endDateString)=>{
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    const yearDifference = endYear - startYear;

    return yearDifference;
}