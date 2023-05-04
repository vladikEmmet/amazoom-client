import { parsePhoneNumber } from "libphonenumber-js"

export const phoneParser = (number: string) => {
    const phone = parsePhoneNumber("+" + number);
    return phone.formatInternational();
}