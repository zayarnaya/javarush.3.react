export const transformDate = (date: Date[] | Date) => {
    return Array.isArray(date) ? date.map(date => date.toISOString()).join(',') : date.toISOString();
}