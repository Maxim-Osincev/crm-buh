export const validateDate = (val: string): boolean => {
    const [day, month, year] = val.split('.');
    if (day && month && year) {
        const dayNumber = Number(day);
        if (dayNumber < 1 || dayNumber > 31) {
            return false;
        }
        const monthNumber = Number(month);
        if (monthNumber < 1 || monthNumber > 12) {
            return false;
        }
        const yearNumber = Number(month);
        if (yearNumber < 1 || yearNumber > 2100 || year.length < 4) {
            return false;
        }
        return true;
    }
    return false;
}
