import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
    title?: string;
    message?: string;
    onRetry?: () => void;
    retryAccessibilityLabel?: string;
}

export function ErrorState({
    title = "Something went wrong",
    message = "Unknown error",
    onRetry,
    retryAccessibilityLabel = "Retry",
}: Props) {
    return (
        <View style={styles.centered}>
            <Text style={styles.errorTitle}>{title}</Text>
            <Text style={styles.errorBody}>{message}</Text>
            <Pressable
                accessibilityRole="button"
                accessibilityLabel={retryAccessibilityLabel}
                onPress={onRetry}
                style={({ pressed }) => [styles.retry, pressed && styles.retryPressed]}
            >
                <Text style={styles.retryLabel}>{retryAccessibilityLabel}</Text>
            </Pressable>
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
  errorTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  errorBody: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  retry: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#222',
  },
  retryPressed: {
    opacity: 0.7,
  },
  retryLabel: {
    color: '#fff',
    fontWeight: '600',
  },
});