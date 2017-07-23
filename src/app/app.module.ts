import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ActivityPage } from '../pages/activity/activity';
import { GoalsPage } from '../pages/goals/goals';
import { DetailsPage } from '../pages/details/details';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from "@ionic/storage";
import { SettingsService } from "./settings.service";
import { SuperTabsModule } from "ionic2-super-tabs";
import { CalorieCalculatorService } from "./calorie.calculator.service";

@NgModule({
    declarations: [
        MyApp,
        ActivityPage,
        GoalsPage,
        DetailsPage,
        TabsPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        IonicStorageModule.forRoot(),
        SuperTabsModule.forRoot()
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        ActivityPage,
        GoalsPage,
        DetailsPage,
        TabsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        SettingsService,
        CalorieCalculatorService,
        // make this its own service next time, seems like bad practice to keep as component
        GoalsPage,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
