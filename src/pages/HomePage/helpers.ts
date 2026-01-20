export const transformDate = (date: string[]) => {
    return date.map(date => date && new Date(date)).join(',');
}