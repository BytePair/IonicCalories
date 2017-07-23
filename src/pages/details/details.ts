import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SettingsService } from "../../app/settings.service";
import { CalorieCalculatorService } from '../../app/calorie.calculator.service';
import {GoalsPage} from "../goals/goals";

@Component({
  selector: 'page-details',
  templateUrl: './details.html'
})

export class DetailsPage implements OnInit {

    /* member variables */

    ages = Array(83).fill(0).map((x,i) => i+18);

    feet = Array(4).fill(4).map((x,i) => i+4);
    inches = Array(12).fill(0).map((x,i) => i);

    cms = Array(121).fill(121).map((x,i) => i+121);

    weights = Array(326).fill(75).map((x,i) => i+75);

    kgs = Array(148).fill(34).map((x,i) => i+34);

    height_in_feet: number;
    height_in_inches: number;

    getFeetAndInches() {
        this.height_in_feet = Math.floor(this.calorieCalculatorService.user.iHeight / 12);
        this.height_in_inches = this.calorieCalculatorService.user.iHeight % 12;
        this.goalsPage.updateCalories();
    }

    /* update the user */

    updateDirectly() {
        this.calorieCalculatorService.setUser();
        this.goalsPage.updateCalories();
    }


    /* update the height */

    updateHeight() {

        const feety = Number.parseInt(this.height_in_feet + '', 10);
        const inchy = Number.parseInt(this.height_in_inches + '', 10);

        if (this.settingsService.settings.height_setting == 'imperial') {
            this.calorieCalculatorService.user.iHeight = (12 * feety) + inchy;
            this.calorieCalculatorService.user.mHeight = Math.floor(this.calorieCalculatorService.user.iHeight * 2.54);
        } else if (this.settingsService.settings.height_setting == 'metric') {
            this.calorieCalculatorService.user.iHeight = Math.floor(this.calorieCalculatorService.user.mHeight / 2.54);
        }

        this.getFeetAndInches();

        // make calorieCalculatorService save new results
        this.calorieCalculatorService.setUser();
        this.goalsPage.updateCalories();
    }


    /* update the weight */

    updateWeight() {

        // first make them strings just in case
        const iWeighty = this.calorieCalculatorService.user.iWeight + '';
        const mWeighty = this.calorieCalculatorService.user.mWeight + '';

        // zero out the old values
        this.calorieCalculatorService.user.iWeight = 0;
        this.calorieCalculatorService.user.mWeight = 0;

        if (this.settingsService.settings.weight_setting == 'imperial') {
            this.calorieCalculatorService.user.iWeight = parseInt(iWeighty, 10);
            this.calorieCalculatorService.user.mWeight = Math.floor(this.calorieCalculatorService.user.iWeight / 2.2);
        } else if (this.settingsService.settings.weight_setting == 'metric') {
            this.calorieCalculatorService.user.mWeight = parseInt(mWeighty, 10);
            this.calorieCalculatorService.user.iWeight = Math.floor(this.calorieCalculatorService.user.mWeight * 2.2);
        }

        // make calorieCalculatorService save new results
        this.calorieCalculatorService.setUser();
        this.goalsPage.updateCalories();

    }


    /* constructor */

    constructor(
        public navCtrl: NavController,
        private settingsService: SettingsService,
        private calorieCalculatorService: CalorieCalculatorService,
        private goalsPage: GoalsPage) {
    }

    ngOnInit() {
        this.calorieCalculatorService.getUser().then((value) => {
            this.calorieCalculatorService.user.iHeight = value.iHeight;
            this.getFeetAndInches();
        });
    }

}
