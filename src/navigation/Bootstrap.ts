import { Navigation } from 'react-native-navigation' ;

import { registerScreens } from '@/navigation/RegisterScreens';
import { Screens } from '@/navigation/Screens';

export function bootstrapNavigation() {
    registerScreens();

    Navigation.events().registerAppLaunchedListener(() => {
        Navigation.setRoot({
            root: {
                stack: {
                    children: [
                        {
                            component: {
                                name: Screens.Pokedex,
                                options: {
                                    topBar: {
                                        title: { text: 'Pokedex' }
                                    },
                                },
                            },
                        },
                    ],
                },
            },
        });
    });
}