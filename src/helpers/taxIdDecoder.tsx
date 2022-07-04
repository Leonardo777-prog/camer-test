export const extractDniArgentine = (text:string) : string => {
    const regex = RegExp(/[@][\d]{7,8}/);
    const match = regex.exec(text);
    const taxId = match ? match[0].replace('@', '') : text;
    return taxId;
}