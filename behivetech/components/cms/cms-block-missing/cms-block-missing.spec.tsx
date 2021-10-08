import * as React from 'react';
import { render } from '@testing-library/react';
import { BasicCmsBlockMissing } from './cms-block-missing.composition';

it('should render with the correct content and attributes', () => {
    const { asFragment } = render(<BasicCmsBlockMissing />);

    expect(asFragment()).toMatchSnapshot();
});
