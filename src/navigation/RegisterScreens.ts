import { Navigation } from 'react-native-navigation';

import { Screens } from '@/navigation/Screens';
import { withProviders } from '@/navigation/WithProviders';
import { PokedexScreen } from '@/screens/PokedexScreen';

export function registerScreens() {
    Navigation.registerComponent(Screens.Pokedex, () => withProviders(PokedexScreen))
}