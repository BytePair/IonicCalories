import { Component, Injectable } from '@angular/core';

import { SettingsService } from "../../app/settings.service";
import { CalorieCalculatorService } from "../../app/calorie.calculator.service";

import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-goals',
  templateUrl: './goals.html'
})

@Injectable()
export class GoalsPage {



    /* change the # of pounds lost/gained per week */

    changeWeight() {
        this.storage.set('goal', this.calorieCalculatorService.user.goalWeight).then((value) => {
            // convert the goal weight to string value
            this.calorieCalculatorService.user.goalWeightString = (parseFloat(this.calorieCalculatorService.user.goalWeight + '') / 10).toFixed(1);
        }).catch((error) => {
            console.log('error changing goal weight');
        }).then(() => {
            this.updateCalories();
        })
    }


    /* if a user selects a different goal */

    changeGoal() {
        this.storage.set('loseWeight', this.calorieCalculatorService.user.loseWeight).then((value) => {
        }).catch((error) => {
            console.log('error changing goal: ' + error);
        }).then(() => {
            this.updateCalories();
        })
    }


    /*
     * when the weight changes, update the calorie goal
     * uses Harris Benedict Equation from https://en.wikipedia.org/wiki/Harris%E2%80%93Benedict_equation
     */

    updateCalories() {
        const age = parseInt(this.calorieCalculatorService.user.age + '');
        const heightInInches = parseInt(this.calorieCalculatorService.user.iHeight + '');
        const weightInPounds = parseInt(this.calorieCalculatorService.user.iWeight + '');
        const activityLevel = parseFloat(this.calorieCalculatorService.user.activityLevel + '');
        const poundsPerWeek = parseFloat(this.calorieCalculatorService.user.goalWeight + '') / 10;

        let runningCalorieTotal = 0.0;

        /* First calculate BMR */
        if (this.calorieCalculatorService.user.sex == 'male') {
            /* calculate male BMR */
            runningCalorieTotal += (10*(weightInPounds*0.453592)) + (6.25*(heightInInches*2.54)) - (5*age) + 5;
        } else {
            /* calculate female BMR */
            runningCalorieTotal += (10*(weightInPounds*0.453592)) + (6.25*(heightInInches*2.54)) - (5*age) - 161;
        }

        /* Then multiply by activity level */
        runningCalorieTotal *= activityLevel;

        /* Then subtract or add calories depending on the goal */
        const goalPerDay = (poundsPerWeek*3500) / 7.0;
        if (this.calorieCalculatorService.user.loseWeight == 'true') {
            runningCalorieTotal -= goalPerDay;
        } else if (this.calorieCalculatorService.user.loseWeight == 'false') {
            runningCalorieTotal +=  goalPerDay;
        }

        /* update the card */
        this.calorieCalculatorService.user.calorieGoal = runningCalorieTotal.toFixed(0);

        /* save updates */
        this.calorieCalculatorService.setUser();
    }

    constructor(
        private settingsService: SettingsService,
        private calorieCalculatorService: CalorieCalculatorService,
        private storage: Storage) {
    }

}
