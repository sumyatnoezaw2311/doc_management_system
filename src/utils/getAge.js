export const getAge = (dob)=>{
    if(!dob){
        return 0;
    }
    const dateOfBirth = new Date(dob);
    const currentDate = new Date();

    const yearsDiff = currentDate.getFullYear() - dateOfBirth.getFullYear();
    const monthsDiff = currentDate.getMonth() - dateOfBirth.getMonth();
    const daysDiff = currentDate.getDate() - dateOfBirth.getDate();

    if (monthsDiff < 0 || (monthsDiff === 0 && daysDiff < 0)) {
      return yearsDiff - 1;
    }
    return yearsDiff;
}