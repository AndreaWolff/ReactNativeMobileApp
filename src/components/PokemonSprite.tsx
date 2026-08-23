import { Image } from 'expo-image';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

export type PokemonSpriteProps = {
  /** Remote sprite URL (e.g. `sprites.front_default`). Null/undefined shows an empty frame. */
  uri: string | null | undefined;
  /** Accessible name, e.g. the Pokémon's display name. */
  accessibilityLabel?: string;
  /** Outer size in dp. Default 180. */
  size?: number;
  /** Optional wrapper style (background, margin, etc.). */
  style?: StyleProp<ViewStyle>;
};

/**
 * Polished sprite using expo-image (disk+memory cache, short cross-fade).
 * Android analogy: Coil / Glide image request with placeholder + transition.
 */
export function PokemonSprite({
  uri,
  accessibilityLabel = 'Pokemon sprite',
  size = 180,
  style,
}: PokemonSpriteProps) {
  return (
    <View style={[styles.frame, { width: size + 32, height: size + 32 }, style]}>
      <Image
        source={uri ? { uri } : undefined}
        style={{ width: size, height: size }}
        contentFit="contain"
        transition={200}
        cachePolicy="memory-disk"
        accessibilityLabel={accessibilityLabel}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 16,
    marginVertical: 12,
  },
});