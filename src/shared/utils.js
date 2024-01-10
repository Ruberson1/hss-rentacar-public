import {lightFormat} from "date-fns";
import CryptoJS from "crypto-js";

export const encrypt = (object, key) => {
    const string = JSON.stringify(object);
    return CryptoJS.AES.encrypt(string, key).toString();
};

export const decrypt = (encryptedString, key) => {
    const decryptString = CryptoJS.AES.decrypt(encryptedString, key);
    const string = decryptString.toString(CryptoJS.enc.Utf8);
    return JSON.parse(string);
};
export function formatDate(dateString) {
    if (typeof dateString !== 'string') {
        // @ts-ignore
        return lightFormat(dateString, 'yyyy-MM-dd H:mm:s');
    }

    const dateArray = dateString.split(/[\/,:\s]+/);
    if(dateArray[0] === "") {
        return '';
    }
    return `${dateArray[2]}-${dateArray[1].padStart(2, '0')}-${dateArray[0].padStart(2, '0')} ${dateArray[3]}:${dateArray[4]}:${dateArray[5]}`;
}
