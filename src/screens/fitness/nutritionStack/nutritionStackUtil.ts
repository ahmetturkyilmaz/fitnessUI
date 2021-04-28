import {UserNutritionInfo} from "../../../types/nutrition/UserNutritionInfo";
import {Sex} from "../../../types/enum/Sex";

export const calculateFatPercentage = (userNutritionInfo: UserNutritionInfo) => {
    let userInfo = {...userNutritionInfo}
    let bodyFat: number = 0;
    let waist = userInfo.waist;
    let neck = userInfo.neck;
    let height = userInfo.height;

    if (userInfo.sex === Sex.MALE) {
        if (userInfo.unit === 'METRIC') {
            bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        } else {
            bodyFat = 86.01 * (Math.log10(waist - neck) - 70.41 * Math.log10(height)) + 36.76;
        }
    }
    if (userInfo.sex === Sex.FEMALE) {
        let hip = userInfo.hip;
        if (userInfo.unit === 'METRIC') {
            bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
        } else {
            bodyFat = 163.205 * (Math.log10(waist + hip - neck) - 97.684 * Math.log10(height)) - 78.387;
        }
    }
    return bodyFat.toString()
}

export const findUserInfoFromLatestDate = (userInfoList: UserNutritionInfo[]) => {
    if (userInfoList && userInfoList.length != 0) {
        return userInfoList.reduce(function (r, a) {
            return r.dateOfInfo > a.dateOfInfo ? r : a;
        });
    }
    return undefined;
}
