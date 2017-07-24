import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { User } from './user';


@Injectable()
export class CalorieCalculatorService {

    // will be replaced during constructor if another one found
    user: User = {
        sex: 'male',
        age: 25,
        iHeight: 70,
        iHeightInches: 10,
        iHeightFeet: 5,
        mHeight: 177,
        iWeight: 220,
        mWeight: 99,
        activityLevel: 1.2,
        loseWeight: 'true',
        goalWeight: '0',
        goalWeightString: "0.0",
        calorieGoal: "2000"
    };


    // save user details to storage
    setUser() {
        this.storage.set('user', JSON.stringify(this.user)).then((value) => {
        }).catch((error) => {
            console.log('...error saving user')
        })
    }

    // get user details from storage
    getUser(): Promise<User> {
        return new Promise((resolve, reject) => {
            this.storage.get('user').then((value) => {
                // return the user
                resolve(JSON.parse(value));
            }).catch((error) => {
                reject(error);
            })
        });
    }


    constructor(private storage: Storage) {

        // uncomment to clean up messes
        // storage.clear();

        storage.get('user').then((value) => {
            // check if result is a real user
            const userString = JSON.parse(value);
            if (userString == null || userString == '') {
                // if bad result, need to create default user
                console.log('storing default user...' + this.user);
                this.setUser();
            } else {
                // otherwise load user from storage and overwrite local user
                this.user = JSON.parse(value);
            }
        }).catch((error) => {
            console.log('error accessing storage in calorie calculator service');
        }).then(() => {
            // uncomment to print user details
            // console.log('user: ' + JSON.stringify(this.user));
        })
    };

}
