import { Component } from '@angular/core';

import { ActivityPage} from '../activity/activity';
import { GoalsPage } from '../goals/goals';
import { DetailsPage } from '../details/details';

import { SettingsService } from '../../app/settings.service';

import { Storage } from '@ionic/storage';

@Component({
    templateUrl: 'tabs.html'
})

export class TabsPage {

    tab1Root = DetailsPage;
    tab2Root = ActivityPage;
    tab3Root = GoalsPage;

    color: string = this.settingsService.settings.color_setting;


    constructor(
        public storage: Storage,
        public settingsService: SettingsService) {

    }
}
