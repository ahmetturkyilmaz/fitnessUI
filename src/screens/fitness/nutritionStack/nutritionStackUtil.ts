import {UserNutritionInfo} from "../../../types/nutrition/UserNutritionInfo";
import {Gender} from "../../../types/enum/Gender";
import {Unit} from "../../../types/enum/Unit";
import {FieldInfo} from "../../../types/nutrition/FieldInfo";

export const calculateFatPercentage = (userNutritionInfo: UserNutritionInfo) => {
    let userInfo = {...userNutritionInfo}
    let bodyFat: number = 0;
    let waist = userInfo.waist;
    let neck = userInfo.neck;
    let height = userInfo.height;

    if (userInfo.gender === Gender.MALE) {
        if (userInfo.unit === Unit.METRIC) {
            console.log("geldi")
            bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
            console.log("geldi2")
        } else {

            bodyFat = 86.01 * (Math.log10(waist - neck) - 70.41 * Math.log10(height)) + 36.76;
        }
    }
    if (userInfo.gender === Gender.FEMALE) {
        let hip = userInfo.hip;
        if (userInfo.unit === Unit.METRIC) {
            bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
        } else {
            bodyFat = 163.205 * (Math.log10(waist + hip - neck) - 97.684 * Math.log10(height)) - 78.387;
        }
    }
    console.log(bodyFat)
    return bodyFat
}
export const calculateLeanBodyMass = (bodyFatPercentage: number, weight: number) => {
    return weight - (weight * bodyFatPercentage);
}
export const findUserInfoFromLatestDate = (userInfoList: UserNutritionInfo[]) => {
    if (userInfoList && userInfoList.length != 0) {
        return userInfoList.reduce(function (r, a) {
            return r.dateOfInfo > a.dateOfInfo ? r : a;
        });
    }
    return undefined;
}
export const calculateFieldData = (userNutritionInfos: UserNutritionInfo[], fieldType: string) => {

    let infos: UserNutritionInfo[] = [...userNutritionInfos];
    let fieldList: FieldInfo = {fieldInfos: [], dates: []};
    switch (fieldType) {
        case 'weight':
            for (let elem of infos) {
                if (elem.weight != null) {
                    fieldList.fieldInfos.push(elem.weight)
                    fieldList.dates.push(elem.dateOfInfo)
                }
            }
            break;
        case 'height':
            for (let elem of infos) {
                if (elem.height != null) {
                    fieldList.fieldInfos.push(elem.height)
                    fieldList.dates.push(elem.dateOfInfo)
                }
            }
            break;
        case 'arm':
            for (let elem of infos) {
                if (elem.arm != null) {
                    fieldList.fieldInfos.push(elem.arm)
                    fieldList.dates.push(elem.dateOfInfo)
                }
            }
            break;
        case 'forearm':
            for (let elem of infos) {
                if (elem.forearm != null) {
                    fieldList.fieldInfos.push(elem.forearm)
                    fieldList.dates.push(elem.dateOfInfo)
                }
            }
            break;
        case 'chest':
            for (let elem of infos) {
                if (elem.chest != null) {
                    fieldList.fieldInfos.push(elem.chest)
                    fieldList.dates.push(elem.dateOfInfo)
                }
            }
            break;
        case 'bust':
            for (let elem of infos) {
                if (elem.bust != null) {
                    fieldList.fieldInfos.push(elem.bust)
                    fieldList.dates.push(elem.dateOfInfo)
                }
            }
            break;
        case 'waist':
            infos.forEach(info => {
                if (info.waist != null) {
                    fieldList.fieldInfos.push(info.waist)
                    fieldList.dates.push(info.dateOfInfo)
                }
            });
            break;
        case 'hip':
            infos.forEach(info => {
                if (info.hip != null) {
                    fieldList.fieldInfos.push(info.hip)
                    fieldList.dates.push(info.dateOfInfo)
                }
            });
            break;
        case 'thigh':
            infos.forEach(info => {
                if (info.thigh != null) {
                    fieldList.fieldInfos.push(info.thigh)
                    fieldList.dates.push(info.dateOfInfo)
                }
            });
            break;
        case 'calf':
            infos.forEach(info => {
                if (info.calf != null) {
                    fieldList.fieldInfos.push(info.calf)
                    fieldList.dates.push(info.dateOfInfo)
                }
            });
            break;
        case 'fatPercentage':
            infos.forEach(info => {
                if (info.fatPercentage != null) {
                    fieldList.fieldInfos.push(info.fatPercentage)
                    fieldList.dates.push(info.dateOfInfo)
                }
            });
            break;
        case 'musclePercentage':
            infos.forEach(info => {
                if (info.musclePercentage != null) {
                    fieldList.fieldInfos.push(info.musclePercentage)
                    fieldList.dates.push(info.dateOfInfo)
                }
            });
            break;
        default:
            return null;
    }
    return fieldList;
}