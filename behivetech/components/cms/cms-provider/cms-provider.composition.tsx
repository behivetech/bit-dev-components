import * as React from 'react';
import { CmsProvider, useCmsProvider } from './cms-provider';

const Header = ({headerContent = 'Default Header', ...rest}) => (
    <header>
        <h1>{headerContent}</h1>
    </header>
);

const Footer = ({footerContent = 'Default Footer'}) => (
    <footer>
        {footerContent}
    </footer>
);

const Main = ({children = null, mainContent = "Default Main"}) => (
    <main>
        {children}
        {mainContent}
    </main>
);

const AddedBlock = ({children = null}) => (
    <div data-testid="addedBlock">{children}</div>
);

const MockCmsArea = ({name}) => {
    const {cmsParams: {areas}} = useCmsProvider();
    const blocks = areas[name] ? areas[name].blocks : [];
    const blockComponents = {
        AddedBlock,
        Header,
        Footer,
        Main,
    }

    return (
        <>{
            blocks.length
                ? blocks.map(({componentName, componentProps}, index) => {
                    const Component = blockComponents[componentName];

                    return <Component key={`${componentName}__${index}`} {...componentProps} />;
                })
                : null
        }</>
    );
}

const ButtonActions = () => {
    const {
        addBlock,
        layoutDrawerDetails,
        cmsParams,
        removeBlock,
        setLayoutDrawerDetails,
        toggleEditBlock,
        updateBlockComponent,
    } = useCmsProvider();

    function handleAddBlock() {
        addBlock('main', 'AddedBlock', {children: 'Added Block'});
    }

    function handleEditBlock() {
        setLayoutDrawerDetails(<div>Edit Drawer Details</div>);
        toggleEditBlock();
    }

    function handleRemoveBlock() {
        removeBlock('main', 1);
    }

    function handleUpdateBlock() {
        updateBlockComponent('main', 0, {mainContent: 'Main Block Updated'});
    }

    return (
        <div data-testid="button-actions">
            <button data-testid="addBlock" onClick={handleAddBlock}>Add Block</button>
            <button data-testid="editBlock" onClick={handleEditBlock}>Toggle Edit Block</button>
            <button data-testid="removeBlock" onClick={handleRemoveBlock}>Remove Added Block</button>
            <button data-testid="updateBlock" onClick={handleUpdateBlock}>Update Block</button>
            {layoutDrawerDetails}
        </div>
    )
}

export const BasicCmsProvider = () => {
    const cmsParams = {
        areas: {
            header: {
                blocks: [{
                    componentName: 'Header',
                    componentProps: {headerContent: 'Header Component Content'}
                }],
            },
            footer: {
                blocks: [{
                    componentName: 'Footer',
                    componentProps: {footerContent: 'Footer Component Content'}
                }],
            },
            main: {
                blocks: [{
                    componentName: 'Main',
                    componentProps: {
                        children: (
                            <div>
                                <div>
                                    This is a composition of functionality and content to test out
                                    the CmsProvider component.
                                </div>
                                <ButtonActions />
                            </div>
                        ),
                        mainContent: 'Main Component Content'}
                    }],
            },
        }
    }

    return (
        <CmsProvider cmsParams={cmsParams}>
            <MockCmsArea name="header" />
            <MockCmsArea name="main" />
            <MockCmsArea name="footer" />
        </CmsProvider>
    );
};
