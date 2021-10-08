import * as React from 'react';

import {useCmsProvider} from '@behivetech/behivetech.components.cms.cms-provider';
import {CmsBlocks, CmsBlockProps} from '@behivetech/behivetech.components.cms.cms-blocks';
import {CmsAreaEdit} from './extras/index';

export type CmsAreaProps = {
    /**
     * an object of imported componets where the key is the same as the component name. The importedBlocks
     * should be an object of components specific to what should go within a `<CmsArea />` component.
     */
    importedBlocks: {[componentName: string]: React.FunctionComponent<CmsBlockProps>},
    /**
     * the name of the area is the same as the key within the areas object within the cmsParams
     * which is part of the context from the `<CmsProvider />` component. This in turn will help
     * the `<CmsBlocks />` component to pull the correct params needed for the components it should
     * render.
     */
    name: string,
};

export function CmsArea({ importedBlocks, name }: CmsAreaProps) {
    return <CmsBlocks areaName={name} importedBlocks={importedBlocks} />;
}
