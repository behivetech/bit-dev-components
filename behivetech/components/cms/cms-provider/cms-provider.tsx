import * as React from 'react';

export type ComponentPropsType = {[propName: string]: any}

type BlockType = {
    /**
     * Name of component to be imported
     */
    componentName: string,
    /**
     * Props to be passed into the block component
     */
    componentProps: ComponentPropsType
}

export type BlocksType = {
    /**
     * an array which contains which component to use by name and data prop passed into the block component.
     */
    blocks: BlockType[]
}

type CmsParamsType = {
    /**
     * keys are the area name which contains the blocks that go within an area.
     */
    areas?: {
        /**
         * The name of an area that contains the blocks
         */
        [areaName: string]: BlocksType
    },
}

type ContextType = {
    /**
     * Adds a new block to an area
     */
    addBlock: (areaName: string, componentName: string, componentProps: ComponentPropsType) => void;
    /**
     * Determines if the CMS interface is in edit block mode or not which opens
     * a drawer with contents to update the block.
     */
    editBlock: boolean;
    /**
     * Determines if the CMS interface is in edit mode for the page or not.
     */
    editPage: boolean;
    /**
     * A react node of children to go within the layout drawer to edit a block
     */
    layoutDrawerDetails: React.ReactNode;
    /**
     * Params used by the CMS components to build the page
     */
    cmsParams: CmsParamsType
    /**
     * Removes a block from an area
     */
    removeBlock: (areaName: string, index: number) => void;
    /**
     * Sets the contents of the layout drawer to modify a block
     */
    setLayoutDrawerDetails: (details: React.ReactNode) => void;
    /**
     * Sets the editBlock to true/false
     */
    toggleEditBlock: (openOverride?: boolean) => void;
    /**
     * Sets the editPage to true/false
     */
    toggleEditPage: () => void;
    /**
     * Updates the dynamic content of a block
     */
    updateBlockComponent: (areaName: string, index: number, componentProps: ComponentPropsType) => void;
}

interface CmsCallbackInterface extends CmsParamsType {
    onFailure: () => void;
    onSuccess: (cmsParams?: CmsParamsType) => CmsParamsType | undefined;
};

export type CmsProviderProps = {
    /**
    * children to be rendered in the component.
    */
    children: React.ReactNode,
    /**
    * data used to define layouts, areas and blocks and determines where they go within the view.
    */
    cmsParams: CmsParamsType,
};

const DEFAULT_CMS_PARAMS = {areas: {}};
const DEFAULT_CONTEXT: ContextType = {
    addBlock: (areaName, componentName, componentProps) => null,
    editBlock: false,
    layoutDrawerDetails: null,
    editPage: false,
    removeBlock: (areaName, index) => null,
    setLayoutDrawerDetails: (details) => null,
    toggleEditPage: () => null,
    toggleEditBlock: (openOverride) => null,
    updateBlockComponent: (areaName, index, componentProps) => null,
    cmsParams: DEFAULT_CMS_PARAMS,
};

const CmsProviderContext = React.createContext(DEFAULT_CONTEXT);

export function useCmsProvider() {
    return React.useContext(CmsProviderContext)
};

function reducer(state = {areas: {}}, {type, values}) {
    function getBlocks(areaName: string): {[key: string]: any}[] {
        const stateArea = state.areas[areaName];

        return stateArea && stateArea.blocks ? stateArea.blocks : [];
    }

    function updateAreas(areaName, blocks) {
        return state.areas[areaName]
            ? {...state.areas, [areaName]: {blocks}}
            : state.areas
    }

    const actions = {
        ADD_BLOCK: () => {
            const {areaName, componentName, componentProps} = values;

            return {
                ...state,
                areas: updateAreas(areaName, [...getBlocks(areaName), {componentName, componentProps}]),
            };
        },
        REMOVE_BLOCK: () => {
            const {areaName, index} = values;
            const newBlocks = getBlocks(areaName);

            if (areaName && newBlocks && newBlocks.length) {
                newBlocks.splice(index, 1);
            }

            return {...state, areas: updateAreas(areaName, newBlocks)};
        },
        UPDATE_BLOCK_DATA: () => {
            const {areaName, index, componentProps} = values;
            const newBlocks = getBlocks(areaName);

            if (areaName && newBlocks && newBlocks.length) {
                const newBlock = newBlocks[index];

                newBlocks.splice(
                    index,
                    1,
                    {...newBlock, componentProps: {...newBlock.componentProps, ...componentProps}}
                );
            }

            return newBlocks.length ? {...state, areas: updateAreas(areaName, newBlocks)} : state;
        },
    };

    const newState = actions[type] ? actions[type]() : state;

    return newState;
}

export function CmsProvider({ children, cmsParams = DEFAULT_CONTEXT.cmsParams }: CmsProviderProps) {
    const [editBlock, setEditBlock] = React.useState(false);
    const [layoutDrawerDetails, setLayoutDrawerDetailsState] = React.useState(null);
    const [editPage, setEditPage] = React.useState(false);
    const [cmsState, dispatchPageState] = React.useReducer(reducer, cmsParams);

    function setLayoutDrawerDetails(details = null) {
        setLayoutDrawerDetailsState(details);
    }

    function removeBlock(areaName, index) {
        dispatchPageState({type: 'REMOVE_BLOCK', values: {areaName, index}});
        setEditBlock(false);
    }

    function addBlock(areaName, componentName, componentProps) {
        dispatchPageState({type: 'ADD_BLOCK', values: {areaName, componentName, componentProps}});
        setEditBlock(false);
    }

    function toggleEditPage() {
        setEditPage(!editPage);
        setEditBlock(false);
        setLayoutDrawerDetailsState(null);
    }

    function toggleEditBlock(openOverride) {
        const newDrawerOpen = openOverride !== undefined ? openOverride : !editBlock;

        setEditBlock(newDrawerOpen);

        if (!newDrawerOpen) {
            console.info('Clearing Drawer Layout');
            setLayoutDrawerDetailsState(null);
        }
    }

    function updateBlockComponent(areaName, index, componentProps) {
        dispatchPageState({type: 'UPDATE_BLOCK_DATA', values: {areaName, index, componentProps}});
        setEditBlock(false);
    }

    const context = {
        addBlock,
        editBlock,
        layoutDrawerDetails,
        editPage,
        cmsParams: cmsState,
        removeBlock,
        setLayoutDrawerDetails,
        toggleEditBlock,
        toggleEditPage,
        updateBlockComponent,
    };

    return (
        <CmsProviderContext.Provider value={context}>
            {children}
        </CmsProviderContext.Provider>
    );
}
