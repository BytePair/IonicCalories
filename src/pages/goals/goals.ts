import {Component, Injectable, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';

import { SettingsService } from "../../app/settings.service";
import { CalorieCalculatorService } from "../../app/calorie.calculator.service";

import { Storage } from '@ionic/storage';
import { ApplicationRef } from '@angular/core';


@Component({
  selector: 'page-goals',
  templateUrl: './goals.html'
})

@Injectable()
export class GoalsPage implements OnInit {


    /* member variables */

    loseWeight = 'true';
    goalWeight = 0;
    goalWeightString = "0.0";
    calorieGoal = "2000";

    /* change the # of pounds lost/gained per week */

    changeWeight() {
        this.storage.set('goal', this.goalWeight).then((value) => {
            // convert the goal weight to string value
            this.goalWeightString = (parseFloat(this.goalWeight + '') / 10).toFixed(1);
        }).catch((error) => {
            console.log('error changing goal weight');
        }).then(() => {
            this.updateCalories();
        })
    }


    /* if a user selects a different goal */

    changeGoal() {
        this.storage.set('loseWeight', this.loseWeight).then((value) => {
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
        const poundsPerWeek = parseFloat(this.goalWeight + '') / 10;

        let runningCalorieTotal = 0.0;

        /* First calculate BMR */
        if (this.calorieCalculatorService.user.sex == 'male') {
            /* calculate male BMR */
            runningCalorieTotal += (10*(weightInPounds*0.453592)) + (6.25*(heightInInches*2.54)) - (5*age) + 5;
        } else {
            /* calculate female BMR */
            runningCalorieTotal += (10*(weightInPounds*0.453592)) + (6.25*(heightInInches*2.54)) - (5*age) - 161;
        }

        console.log('BMR is: ' + runningCalorieTotal.toFixed(0));

        /* Then multiply by activity level */
        runningCalorieTotal *= activityLevel;
        console.log('Multiplied by '  + activityLevel + ' : ' + runningCalorieTotal.toFixed(0));

        /* Then subtract or add calories depending on the goal */
        const goalPerDay = (poundsPerWeek*3500) / 7.0;
        if (this.loseWeight == 'true') {
            runningCalorieTotal -= goalPerDay;
        } else if (this.loseWeight == 'false') {
            runningCalorieTotal +=  goalPerDay;
        }

        /* update the card */
        this.calorieGoal = runningCalorieTotal.toFixed(0);

    }

    constructor(
        private settingsService: SettingsService,
        private calorieCalculatorService: CalorieCalculatorService,
        private storage: Storage,
        private applicationRef: ApplicationRef) {
    }


    ngOnInit() {

        this.storage.get('loseWeight').then((value) => {
            if (value == null || value == '') {
                this.storage.set('loseWeight', 'true').then((value2) => {
                }).catch((error) => {
                    console.log('error setting default goal');
                })
            } else {
                this.loseWeight = value.toString();
            }
        }).catch((error) => {
            console.log('error getting goal from storage');
        }).then(() => {
            this.changeGoal();
        });

        this.storage.get('goal').then((value) => {
            if (value == null || value == '') {
                this.storage.set('goal', '0').then((value2) => {
                    console.log('default goal set to: ' + value2);
                }).catch((error) => {
                    console.log('error setting default goal weight');
                })
            } else {
                this.goalWeight = value.toString();
            }
        }).catch((error) => {
            console.log('error getting goal weight from storage');
        }).then(() => {
            this.changeWeight();
        });

        this.calorieCalculatorService.getUser().then((value) => {
            this.updateCalories();
        });

    }

}
