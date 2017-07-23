export class User {
    sex: string;            // 0 = male 1 = female
    age: number;            // stored in... years?
    iHeight: number;        // stored in inches
    mHeight: number;        // stored in cm
    iWeight: number;        // stored in pounds
    mWeight: number;        // stored in kgs
    activityLevel: number;  // sedentary (little or no exercise) : Calorie-Calculation = BMR x 1.2
                            // lightly active (light exercise/sports 1-3 days/week) : Calorie-Calculation = BMR x 1.375
                            // moderatetely active (moderate exercise/sports 3-5 days/week) : Calorie-Calculation = BMR x 1.55
                            // very active (hard exercise/sports 6-7 days a week) : Calorie-Calculation = BMR x 1.725
                            // extra active (very hard exercise/sports & physical job or 2x training) : Calorie-Calculation = BMR x 1.9
    loseWeight: string;
    goalWeight: string;
    goalWeightString: string;
    calorieGoal: string           
}
