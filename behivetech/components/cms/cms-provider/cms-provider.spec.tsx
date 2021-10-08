import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { BasicCmsProvider } from './cms-provider.composition';

describe('CmsProvider',  () => {
    it('should render with the correct content', () => {
        const {asFragment} = render(<BasicCmsProvider />);

        expect(asFragment()).toMatchSnapshot();
    });

    it('should add a block', () => {
        const {asFragment} = render(<BasicCmsProvider />);

        fireEvent.click(screen.getByTestId('addBlock'));
        expect(asFragment()).toMatchSnapshot();
    })

    it('should remove a block', () => {
        const {asFragment} = render(<BasicCmsProvider />);

        fireEvent.click(screen.getByTestId('removeBlock'));
        expect(asFragment()).toMatchSnapshot();
    })

    it('should update a block', () => {
        const {asFragment} = render(<BasicCmsProvider />);

        fireEvent.click(screen.getByTestId('updateBlock'));
        expect(asFragment()).toMatchSnapshot();
    })

    it('should render edit content', () => {
        const {asFragment} = render(<BasicCmsProvider />);

        fireEvent.click(screen.getByTestId('editBlock'));
        expect(asFragment()).toMatchSnapshot();
    })
})
