import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';


@Injectable()
export class SettingsService {

    settings = {
        'height_setting': null,
        'weight_setting': null,
        'color_setting': null
    };

    colors = [
        {
            'id': 'red',
            'label': 'Red'
        },{
            'id': 'orange',
            'label': 'Orange'
        },{
            'id': 'yellow',
            'label': 'Yellow'
        },{
            'id': 'green',
            'label': 'Green'
        },{
            'id': 'blue',
            'label': 'Blue'
        },{
            'id': 'purple',
            'label': 'Purple'
        },];

    /* iHeight setting */

    getHeight(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.storage.get('height_setting').then((value) => {
                resolve(value);
            }).catch((error) => {
                reject(error);
            })
        });
    };

    setHeight(height: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.storage.set('height_setting', height).then((value) => {
                resolve(value);
            }).catch((error) => {
                reject(error);
            })
        });
    };

    /* iWeight setting */

    getWeight(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.storage.get('weight_setting').then((value) => {
                resolve(value);
            }).catch((error) => {
                reject(error);
            })
        });
    };

    setWeight(weight: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.storage.set('weight_setting', weight).then((value) => {
                resolve(value);
            }).catch((error) => {
                reject(error);
            })
        });
    };

    /* color setting */

    getColor(): Promise<string> {
        return new Promise((resolve, reject) => {
            this.storage.get('color_setting').then((value) => {
                resolve(value);
            }).catch((error) => {
                reject(error);
            })
        });
    };

    setColor(color: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.storage.set('color_setting', color).then((value) => {
                resolve(value);
            }).catch((error) => {
                reject(error);
            })
        });
    };

    constructor (private storage: Storage) {

        /* set initial settings if they don't exist */

        this.getHeight().then((value) => {
            // if we have no value, set initial iHeight to imperial
            if (value == null || value == '') {
                this.setHeight('imperial').then((value2) => {
                    this.settings.height_setting = value2;
                })
            } else {
                this.settings.height_setting = value;
            }
        }).catch((error) => {
            console.log('error fetching initial iHeight');
        });

        this.getWeight().then((value) => {
            // if we have no value, set initial iWeight to imperial
            if (value == null || value == '') {
                this.setWeight('imperial').then((value2) => {
                    this.settings.weight_setting = value2;
                })
            } else {
                this.settings.weight_setting = value;
            }
        }).catch((error) => {
            console.log('error fetching initial weight');
        });

        this.getColor().then((value) => {
            // if we have no value, set initial color to blue
            if (value == null || value == '') {
                this.setColor('blue').then((value2) => {
                    this.settings.color_setting = value2;
                })
            } else {
                this.settings.color_setting = value;
            }
        }).catch((error) => {
            console.log('error fetching initial color');
        });

    };

}
