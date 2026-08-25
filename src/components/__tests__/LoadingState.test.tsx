import { render } from '@testing-library/react-native';

import { LoadingState } from '@/components/LoadingState';

describe('LoadingState', () => {
    it('renders the default label', async () => {
        const { getByText, getByLabelText } = await render(<LoadingState />);
        
        expect(getByText('Loading...')).toBeOnTheScreen();
        expect(getByLabelText('Loading...')).toBeOnTheScreen();
    });

    it('renders a custom label', async () => {
        const { getByText, getByLabelText } = await render(
        <LoadingState label="Loading Pokemon..." />
    )

        expect(getByText('Loading Pokemon...')).toBeOnTheScreen();
        expect(getByLabelText('Loading Pokemon...')).toBeOnTheScreen();
    })
})