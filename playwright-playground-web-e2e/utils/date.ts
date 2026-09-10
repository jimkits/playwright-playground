export function GetDateYearsAgo(years:number){
    const date = new Date();
    const dateOptions = {
        year: 'numeric',
        month:'2-digit',
        day:'2-digit'
    } as const;

    date.setUTCFullYear(date.getUTCFullYear() - years);

    return date.toLocaleDateString('en-CA', dateOptions);
}