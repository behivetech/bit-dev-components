import React from 'react';
import { render } from '@testing-library/react';
import { BasicCmsBlocksList } from './cms-blocks-list.composition';

it('should render with the correct text', () => {
    const { getByText } = render(<BasicCmsBlocksList />);
    const rendered = getByText('hello from CmsBlocksList');
    expect(rendered).toBeTruthy();
});
