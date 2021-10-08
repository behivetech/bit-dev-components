import { MainRuntime } from '@teambit/cli';
import { GeneratorMain, GeneratorAspect, ComponentContext } from '@teambit/generator';
import { ReactTemplatesAspect } from './react-templates.aspect';

export class ReactTemplatesMain {
    static slots = [];
    static dependencies = [GeneratorAspect];
    static runtime = MainRuntime;
    static async provider([generator]: [GeneratorMain]) {
    /**
    * Array of templates. Add as many templates as you want
    * Separate the templates to multiple files if you prefer
    * Modify, add or remove files as needed
    * See the docs file of this component for more info
    */

    generator.registerComponentTemplate([
            {
                name: 'my-react-component',
                description: 'creates a standard react component without styling',
                generateFiles: (context: ComponentContext) => {
                    return [

                        // index file
                        {
                            relativePath: 'index.ts',
                            isMain: true,
                            content: `export { ${context.namePascalCase} } from './${context.name}';
export type { ${context.namePascalCase}Props } from './${context.name}';
`,
                        },

                        // component file
                        {
                            relativePath: `${context.name}.tsx`,
                            content: `import * as React from 'react';

export type ${context.namePascalCase}Props = {
    /**
     * children to be rendered in the component.
     */
    children: React.ReactNode,
};

export function ${context.namePascalCase}({ children }: ${context.namePascalCase}Props) {
    return (
        <div className="${context.name}">
            {children}
        </div>
    );
}`,
                        },

                        // docs file
                        {
                            relativePath: `${context.name}.docs.mdx`,
                            content: `---
description: 'A ${context.namePascalCase} component.'
labels: ['label1', 'label2', 'label3']
---

import { ${context.namePascalCase} } from './${context.name}';

## React Component for rendering standard elements without styling
`
                        },

                        // composition file
                        {
                            relativePath: `${context.name}.composition.tsx`,
                            content: `import * as React from 'react';
import { ${context.namePascalCase} } from './${context.name}';

export const Basic${context.namePascalCase}    = () => (
    <${context.namePascalCase}>hello from ${context.namePascalCase}</${context.namePascalCase}>
);
`
                        },

                        // test file
                        {
                            relativePath: `${context.name}.spec.tsx`,
                            content: `import * as React from 'react';
import { render } from '@testing-library/react';
import { Basic${context.namePascalCase} } from './${context.name}.composition';

it('should render with the correct content', () => {
    const { asFragment } = render(<Basic${context.namePascalCase} />);

    expect(asFragment()).toMatchSnapshot();
});
`
                        },
                        // add more files here such as css/sass
                    ];
                },
            },

        // react-provider
        {
                name: 'my-react-provider',
                description: 'creates a standard react provider',
                generateFiles: (context: ComponentContext) => {
                    return [

                        // index file
                        {
                            relativePath: 'index.ts',
                            isMain: true,
                            content: `export { ${context.namePascalCase} } from './${context.name}';
export type { ${context.namePascalCase}Props } from './${context.name}';
`,
                        },

                        // react provider file
                        {
                            relativePath: `${context.name}.tsx`,
                            content: `import * as React from 'react';

const DEFAULT_CONTEXT = {
   // insert the default context keys/values here
};

const ${context.namePascalCase}Context = React.createContext(DEFAULT_CONTEXT);

export function use${context.namePascalCase}() {
    return React.useContext(${context.namePascalCase}Context)
};


export type ${context.namePascalCase}Props = {
    /**
     * children to be rendered in the component.
     */
    children: React.ReactNode,
};

export function ${context.namePascalCase}({ children }: ${context.namePascalCase}Props) {
    const context = {
        // insert current context keys/values to be passed into provider here
    };

    return (
        <${context.namePascalCase}Context.Provider value={context}>
            {children}
        </${context.namePascalCase}Context.Provider>
    );
}`,
                        },

                        // docs file
                        {
                            relativePath: `${context.name}.docs.mdx`,
                            content: `---
description: 'A ${context.namePascalCase} component.'
labels: ['label1', 'label2', 'label3']
---

import { ${context.namePascalCase} } from './${context.name}';

## React Component for rendering a React Provider for React's context
`
                        },

                        // composition file
                        {
                            relativePath: `${context.name}.composition.tsx`,
                            content: `import * as React from 'react';
import { ${context.namePascalCase} } from './${context.name}';

export const Basic${context.namePascalCase}    = () => (
    <${context.namePascalCase}>hello from ${context.namePascalCase}</${context.namePascalCase}>
);
`
                        },

                        // test file
                        {
                            relativePath: `${context.name}.spec.tsx`,
                            content: `import * as React from 'react';
import { render } from '@testing-library/react';
import { Basic${context.namePascalCase} } from './${context.name}.composition';

it('should render with the correct content', () => {
    const { asFragment } = render(<Basic${context.namePascalCase} />);

    expect(asFragment()).toMatchSnapshot();
});
`
                        },
                        // add more files here such as css/sass
                    ];
                },
            },
        ]);

        return new ReactTemplatesMain();
    }
}

ReactTemplatesAspect.addRuntime(ReactTemplatesMain);
