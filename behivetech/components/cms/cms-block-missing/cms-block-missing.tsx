import * as React from 'react';

// Extending the HTMLAttributes for HTMLDivElement so all attributes of div can be passed in.
export interface CmsBlockMissingProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * name of component that was missing
     */
    componentName: string,
}

const STYLES = {
    backgroundColor: '#900',
    color: '#fff',
};

export function CmsBlockMissing({componentName, style = STYLES, ...restProps}: CmsBlockMissingProps) {
    return (
        <div className="cms-block-missing" style={style} {...restProps}>
            COMPONENT IMPORT ERROR: The {componentName} Componpent is not available from the importedBlocks prop.
        </div>
    );
}

