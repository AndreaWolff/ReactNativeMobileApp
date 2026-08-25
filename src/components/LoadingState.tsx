import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

type Props = {
    label?: string;
}

export function LoadingState({ label = 'Loading...'}: Props) {
    return (
        <View style={styles.centered} accessibilityLabel={label}>
            <ActivityIndicator size="large" />
            <Text style={styles.statusText}>{label}</Text>
        </View>
    )
} 

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 12,
  },
  statusText: {
    fontSize: 16,
    color: '#444',
  },
});