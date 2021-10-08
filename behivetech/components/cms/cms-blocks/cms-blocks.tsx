import * as React from 'react';

import {CmsBlockMissing} from '@behivetech/behivetech.components.cms.cms-block-missing';
import {
    BlocksType,
    ComponentPropsType,
    useCmsProvider,
} from '@behivetech/behivetech.components.cms.cms-provider';

export type CmsBlocksProps = {
    /**
     * areaName is the key used to pull from the cmsParams from the context of the `<CmsProvider />`
     * component.
     */
    areaName: string,
    /**
     * an object of imported componets where the key is the same as the component name. The importedBlocks
     * should be an object of components specific to is pulled from the context cmsParams.
     */
    importedBlocks: {[componentName: string]: React.FunctionComponent<ComponentPropsType>}
};

export function CmsBlocks({ areaName, editStyles = {}, importedBlocks }: CmsBlocksProps) {
    const {editBlock, cmsParams: {areas}} = useCmsProvider();
    const blocks = areas[areaName] ? areas[areaName]?.blocks : [];

    return blocks.map(({componentName, componentProps}, index) => {
        const componentKey = `${areaName}__${componentName}--${index}`;
        const DynamicBlock = importedBlocks[componentName];

        return DynamicBlock
            ? <DynamicBlock key={componentKey} {...componentProps}/>
            : <CmsBlockMissing componentName={componentName} key={componentKey} />;
    });
}
