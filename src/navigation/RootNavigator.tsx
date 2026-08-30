import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PokedexScreen } from '@/screens/PokedexScreen';
import { PokemonDetailScreen } from '@/screens/PokemonDetailScreen';

export type RootStackParamList = {
  Pokedex: undefined;
  PokemonDetail: { pokemonId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pokedex"
        component={PokedexScreen}
        options={{ title: 'Pokedex' }}
      />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={{ title: 'Pokemon', headerBackTitle: 'Back' }}
      />
    </Stack.Navigator>
  );
}