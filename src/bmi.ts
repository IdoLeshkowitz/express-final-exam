/**
 * BMI Calculator
 */

export const BmiStatus = {
    Underweight: 0,
    HealthyWeight: 1,
    Overweight: 2,
    Obesity: 3
}

export const WeightUnits = {
    KG: 0,     // kilograms
    G: 1,      // grams
    Pound: 2,  // lbs
}

export const HeightUnits = {
    CM: 0,     // centimeter
    M: 1,      // meter
    In: 2,     // inch
    Ft: 3,     // feet
}

export interface BmiInput {
    weight: number;
    weightUnit: number;
    height: number;
    heightUnit: number;
}

export interface BmiOutput {
    bmi: number;
    status: number;
}

/**
 * Takes a BmiInput object and return BmiOutput response
 */
export default function bmi(input: BmiInput): BmiOutput {
    function getBmiState (bmi:number){
        if (bmi < 18.5) return BmiStatus.Underweight;
        if (bmi < 25) return BmiStatus.HealthyWeight;
        if (bmi < 30) return BmiStatus.Overweight;
        return BmiStatus.Obesity;
    }
    function getBmiValue(weight:number, height:number):number {
        return Math.round( weight / (height * height));
    }
    const {weight, weightUnit, height, heightUnit} = input;
    const weightInKg = weightUnit === WeightUnits.KG ? weight : weightUnit === WeightUnits.G ? weight / 1000 : weight * 0.453592;
    const heightInM = heightUnit === HeightUnits.M ? height : heightUnit === HeightUnits.CM ? height / 100 : heightUnit === HeightUnits.In ? height * 0.0254 : height * 0.3048;
    const calculatedBmi = getBmiValue(weightInKg, heightInM);
    return {status: getBmiState(calculatedBmi), bmi: calculatedBmi};
}
