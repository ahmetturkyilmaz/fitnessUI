import {SignupRequest} from "../types/auth/SignupRequest";

export class ValidationUtil {


    static validateFields(authContext: SignupRequest) {
        let errStr = this.validateEmptyFields(authContext);
        if (errStr) {
            return "Fields" + errStr + " cannot be empty";
        }
        if (this.validateEmail(authContext.email)) {
            return "Email is not valid"
        }
    }

    private static validateEmptyFields(authConcept: any) {
        let errStr: String = "";
        if (!authConcept.email) {
            errStr += " email ";
        }
        if (!authConcept.name) {
            errStr += " name ";
        }
        if (!authConcept.surname) {
            errStr += " surname ";
        }
        if (!authConcept.unit) {
            errStr += " unit ";
        }
        if (!authConcept.gender) {
            errStr += " gender ";
        }
        if (!authConcept.password) {
            errStr += " password ";
        }
        return errStr;
    }

    private static validateEmail(email: string | undefined) {
        var regex = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])\n")
        return regex.test(<string>email);
    }
}