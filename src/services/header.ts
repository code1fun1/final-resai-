import { COMMONHEADERS } from "./constant";

export const getHeader = (headerType: string): Record<string, string> | string => {
    if (headerType === "beforeLogin") {
        return finalHeaderBeforeLogin = { ...COMMONHEADERS };
    }
    return '';
};

const finalHeaderBeforeLogin: Record<string, string> = {};