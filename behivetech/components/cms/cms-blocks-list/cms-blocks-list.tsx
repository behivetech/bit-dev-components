import * as React from 'react';

export type CmsBlocksListProps = {
    /**
     * children to be rendered in the component.
     */
    children: React.ReactNode,
};

export function CmsBlocksList({ children }: CmsBlocksListProps) {
    return (
        <div className="cms-blocks-list">
            {children}
        </div>
    );
}