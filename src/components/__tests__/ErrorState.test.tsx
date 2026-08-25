import { fireEvent, render } from '@testing-library/react-native';

import { ErrorState } from '@/components/ErrorState';

describe('ErrorState', () => {
    it('renders default title and message', async () => {
        const onRetry = jest.fn();
        const { getByText } = await render(<ErrorState />);

        expect(getByText('Something went wrong')).toBeOnTheScreen();
        expect(getByText('Unknown error')).toBeOnTheScreen();
        expect(getByText('Retry')).toBeOnTheScreen();
    });

    it('renders custom title and message', async () => {
        const onRetry = jest.fn();
        const { getByText } = await render(
            <ErrorState
                title="Could not load Pokemon"
                message="Network request failed"
                onRetry={onRetry}
            />,
        );

        expect(getByText('Could not load Pokemon')).toBeOnTheScreen();
        expect(getByText('Network request failed')).toBeOnTheScreen();
    });

    it('calls onRetry when the Retry button is pressed', async () => {
    const onRetry = jest.fn();
    const { getByLabelText } = await render(
      <ErrorState
        onRetry={onRetry}
        retryAccessibilityLabel="Retry loading Pokemon"
      />,
    );

    fireEvent.press(getByLabelText('Retry loading Pokemon'));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('uses the default accessibility label when none is provided', async () => {
    const onRetry = jest.fn();
    const { getByLabelText } = await render(<ErrorState onRetry={onRetry} />);

    fireEvent.press(getByLabelText('Retry'));

    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});