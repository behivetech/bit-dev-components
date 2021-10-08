import * as React from 'react';

type CmsAreaEditProps = {
    children: React.ReactNode,
    editStyles: React.CSSProperties
}

export function CmsAreaEdit({children, editStyles}: CmsAreaEditProps) {
    return (
        <div className="cms-area-edit" style={editStyles}>
            {children}
        </div>
    );
}

