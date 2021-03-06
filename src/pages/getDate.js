const getCurrentDate = () => {
    let separator = '-';
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let hour = newDate.getHours();
    let minutes = newDate.getMinutes();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`
        }${separator}${date}${separator}${hour}${separator}${minutes}`;
};

export default getCurrentDate;