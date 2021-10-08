import React from 'react';
import { CmsArea } from './cms-area';
import {CmsProvider} from '@behivetech/behivetech.components.cms.cms-provider';

const AREA_NAME = 'cmsAreaComposition';
const ImportedComponent = ({componentIndex}) => <div>Imported Block {componentIndex}</div>
const IMPORTED_BLOCKS = {
    ImportedComponent1: ImportedComponent,
    ImportedComponent2: ImportedComponent,
    ImportedComponent3: ImportedComponent,
    ImportedComponent4: ImportedComponent,
};
const CMS_PARAMS = {
    areas: {
        [AREA_NAME]: {blocks: [
            {componentName: 'ImportedComponent1', componentProps: {componentIndex: 1}},
            {componentName: 'ImportedComponent2', componentProps: {componentIndex: 2}},
            {componentName: 'ImportedComponent3', componentProps: {componentIndex: 3}},
            {componentName: 'ImportedComponent4', componentProps: {componentIndex: 4}},
            {componentName: 'ImportedComponent5', componentProps: {componentIndex: 5}}, // Should be a missing block
        ]}
    }
};

export const BasicCmsArea    = () => (
    <CmsProvider cmsParams={CMS_PARAMS}>
        <CmsArea importedBlocks={IMPORTED_BLOCKS} name={AREA_NAME} />
    </CmsProvider>
);
