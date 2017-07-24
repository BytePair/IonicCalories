import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { SettingsService } from '../../app/settings.service';
import { CalorieCalculatorService } from '../../app/calorie.calculator.service';
import { GoalsPage } from "../goals/goals";

@Component({
  selector: 'page-activity',
  templateUrl: './activity.html'
})
export class ActivityPage {

    updateActivity() {
        // console.log('updating activity level to: ' + this.calorieCalculatorService.user.activityLevel);
        this.goalsPage.updateCalories();
    }

    constructor(
        public navCtrl: NavController,
        private settingsService: SettingsService,
        private calorieCalculatorService: CalorieCalculatorService,
        private goalsPage: GoalsPage) {

    }

}
