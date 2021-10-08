import * as React from 'react';
import { CmsBlocks } from './cms-blocks';
import {CmsProvider, useCmsProvider} from '@behivetech/behivetech.components.cms.cms-provider';

const MOCK_AREA_NAME = 'cmsBlocksComposition';

const MockImportedComponent = ({componentIndex}) => <div>Imported Block {componentIndex}</div>
const MOCK_IMPORTED_BLOCKS = {
    MockImportedComponent1: MockImportedComponent,
    MockImportedComponent2: MockImportedComponent,
    MockImportedComponent3: MockImportedComponent,
    MockImportedComponent4: MockImportedComponent,
};
const MOCK_CMS_PARAMS = {
    areas: {
        [MOCK_AREA_NAME]: {blocks: [
            {componentName: 'MockImportedComponent1', componentProps: {componentIndex: 1}},
            {componentName: 'MockImportedComponent2', componentProps: {componentIndex: 2}},
            {componentName: 'MockImportedComponent3', componentProps: {componentIndex: 3}},
            {componentName: 'MockImportedComponent4', componentProps: {componentIndex: 4}},
            {componentName: 'MockImportedComponent5', componentProps: {componentIndex: 5}}, // Should be a missing block
        ]}
    }
};

export const BasicCmsBlocks = () => (
    <CmsProvider cmsParams={MOCK_CMS_PARAMS}>
        <CmsBlocks areaName={MOCK_AREA_NAME} importedBlocks={MOCK_IMPORTED_BLOCKS} />
    </CmsProvider>
);
