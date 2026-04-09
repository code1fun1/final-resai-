import { COMMONHEADERS } from "../config/constant";

export const getHeader = (headerType) => {
    if(headerType === "beforeLogin"){
        return finalHeaderBeforeLogin = {...COMMONHEADERS }
    }
    return '';
}
