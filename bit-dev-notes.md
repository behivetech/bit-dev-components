# Bit Dev Notes

## Installing / Upgrading bit

BVM is bit version manager

### Install
```shell
npm i -g @teambit/bvm

bvm install
```

### Update
```shell
npm i -g @teambit/bvm
bvm update
```

### Set up the shell rc file
You need to have `export PATH=$HOME/bin:$PATH` in the .bashrc or .zshrc file in order to make the `bvm` command available.

### Help
Use `bit --help` or `bit -h` to get a list of available options.

### Bit Versions
```shell
bit version
```

## New Project
```
bit new react <my-workspace-name>
cd <my-workspace-name>
bit install
```

### Initialize a Bit Harmony workspace
```
bit init --harmony
```

### Setting a React Environment

Uncomment the following line in your workspace.jsonc file, to apply the React development environment on all components in this workspace.

```json
"teambit.workspace/variants": {
  "*": {
    "teambit.react/react": { }
  }
}

```

Install React and React Dom as peer dependencies:
```shell
bit install react --type peer
bit install react-dom --type peer
```

### Created Files#
Bit creates the following files when initializing a new workspace:

- workspace.jsonc - The workspace configuration file that sets rules and policies for the workspace and all its components.
- .bitmap - An auto-generated mapping between tracked components in the workspace and their physical location on the file system. The file-structure of your workspace is entirely up to you.
- .git/bit (hidden directory) - Your local scope. Where your workspace's component release versions are stored.

## Creating Components

Use bit create to create an example button component with the namespace of ui. This will also create a package in your workspace node_modules directory and add your component to the workspace UI. It will also add your component to the bitmap file.

To see a list of all available templates run the `bit templates` command.

### Create Component
```shell
bit create react-component ui/button     # TypeScript
bit create react-component-js ui/button  # JavaScript
```

Use bit create --help or bit create -h to get a list of available options for this command.

### Install dependencies for test files
```shell
bit install @testing-library/react
```

### Create Multiple Components
```shell
bit create react-component ui/component1 ui/component2 design/component1
```
### Compile and then start the dev server
```shell
bit compile
bit start
```

### Add Pre-existing Components
Each component in a Bit workspace must have all its implementation files under the same directory. A component must have an entry file `index.[ts|js]` is used as the default.
```text
my-component
├── index.ts
├── my-component.compositions.tsx
├── my-component.docs.md
└── my-component.ts
```

To add your component to the workspace run the bit add command followed by the namespace. The namespace is the component folder structure you would like to see in your workspace.
```shell
bit add button --namespace ui
```

### Add Multiple Components
To track multiple components, set the path to the common directory and use the * wildcard.
```shell
bit add path/to/common/path/*
```

### Show Component
Use the bit show command followed by your ComponentID to see all details about the component including the env, the files and the dependencies.
```shell
bit show ui/button
```

Use `bit show --help` or `bit show -h `to get a list of available options for this command.

### Component Issues
Run `bit status` in the terminal to get a better understanding of what the issue is and what steps to take.

## Starting the Dev Server
```shell
bit compile
bit start
```

Use bit start --help or bit start -h to get a list of available options for this command.

### Compositions
'Compositions' are, essentially, small apps that exhibit and test a component in various potential usages. They serve as a way to run manual and automated integration tests, before such integrations are done by consumers of that component.

Moreover, a component's composition is a way to demonstrate that component for other developers looking to use it, and non-developers, such as designers and product managers, looking to inspect it.

Adding compositions to a component is done by creating a file in the component's directory, using the *.composition.* pattern.

Each composition is a standard usage of a component (requiring no special syntax) that is exported with a name.

For example, the following is a composition of the 'button' component.

```jsx
import React from 'react';
import { Button } from './button';

export const BasicButton = () => {
  return <Button text="click me" />;
};
```

## Using Components
You can compose components together from other components in your workspace or from components in the cloud.

### Composing Components
When importing a component into another component Bit doesn't allow for relative require/import statements, as this couples your component to a specific directory structure, instead you use the component's package name. In the workspace UI you will see the package name for your component which you can copy to import it.

```js
import { Button } from '@my-scope/ui.button'
```

### Component Module Links
Bit creates a module for each component in the workspace. These modules are linked in the node_modules directory and contains it's build output and auto-generated package.json. To see this in your workspace, browse the node_modules/@my-scope/ui.button directory.

To import a component as a dependency you must use the module link. This way your component is not coupled to a specific directory structure in the workspace, which makes them transferable between workspaces.

#### Generating module links
To regenerate module-links for components run the `bit link` command.

Use `bit link --help` or `bit link -h` to get a list of available options for this command.

## Creating a Remote Scope
https://harmony-docs.bit.dev/getting-started/remote-scope

## Exporting Components
Once you have created your remote scope and configured your defaultScope you can then export your components to the remote scope so they can be published and installed in other Bit workspaces or in other web projects.

### Tagging Components
Tag all components that have been modified
```shell
bit tag --all --message "first version"
```

You can tag each individual component
```shell
bit tag button --patch --message "first version"
```

Use `bit tag --help` or `bit tag -h` to get a list of available options for this command.

Export your components
```shell
bit export
```

Use `bit export --help` or `bit export -h` to get a list of available options for this command.

#### Committing the Bitmap
Once the exporting process completes, the .bitmap file gets updated to reflect that new state. Make sure to track it with git.

```shell
git commit -am "updated .bitmap file after a successful export"
```
### See your Component in the Workspace
In your workspace go to https://bit.dev/<user-name>/<scope-name> to see your exported components.

## [Installing Components](https://harmony-docs.bit.dev/getting-started/installing-components)
Once you have exported your component you can install it in another Bit workspace or in any other web project.

### Installing your component
Component packages are installed using their package name. The package name usually correlates to the component ID.

In your component workspace click on the Use dropdown, select the Install tab to copy your component scope name and component ID. You can then choose between NPM or Yarn to install your component in to another Bit workspace or into a React application.
```shell
npm install @bit/YourUserName.componentScopeName.componentID
```

### Configure your Scoped Registry
To install components with npm or yarn you might need to configure @YourUserName as a scoped registry.
```shell
npm config set '@YourUserName:registry' https://node.bit.dev
```

### Use your Component
```js
import { Button } from '@yourUserName/componentScopeName.componentID';
```

## [Creating a Custom Component Generator](https://harmony-docs.bit.dev/extending-bit/creating-a-custom-generator)

### Create Your Own Generator
You can create your own generator using the bit create command followed by the name you want to give your generator. In this example we will use the name my-components but feel free to use a name that better describes your use case.
```shell
bit create component-generator <my-components>
```
### Configuring your Generator's Environment
Edit your workspace.jsonc file and set your generator component to use the teambit.harmony/aspect env under the variants object.

```json
"teambit.workspace/variants": {
  "{my-components}": {
    "teambit.harmony/aspect": {}
  },
}
```

To check if your generator component is using the correct env you can run `bit envs` or `bit show my-components`

### Registering your Generator
Edit your workspace.jsonc file and add the component id, (scope name / component name) to teambit.generator/generator. You also need to register the template. This should go at root level. The component id can be found in the aspect.ts file. In this example we are using my-scope-name you may already have a default scope name configured and therefore this should be used here.
```json
{
  "teambit.generator/generator": {
    "aspects": ["my-scope-name/my-components"]
  },
  "my-scope-name/my-components": {}
}
```

This registers your generator component aspect so that your templates will appear in the CLI when you run `bit templates`.
```shell
bit templates
```

The output should now look something like this:

```shell
The following template(s) are available with the command bit create:

teambit.generator/generator
    component-generator (create your own component generator)


my-scope-name/my-components
    component1 (description for component1)
    component2 (description for component2)
```

### Modifying your Generator
The `*.main.runtime.ts` file contains an array of templates that you can modify and add to to create different templates and numerous files to be generated. Make sure you also modify the name and description of these templates as this will be shown in the CLI when you run `bit templates`.
```js
generator.registerComponentTemplate([
  {
    name: 'component1',
    description: 'description for component1',
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
          content: `import React from 'react';`,
        },

        // docs file
        {
          relativePath: `${context.name}.docs.mdx`,
          content: `docs content goes here`,
        },

        // composition file
        {
          relativePath: `${context.name}.composition.tsx`,
          content: `composition content goes here
`,
        },

        // test file
        {
          relativePath: `${context.name}.spec.tsx`,
          content: `test content goes here`,
        },
        // add more files here such as css/sass
      ];
    },
  },

  // component 2
  {
    name: 'component2',
    description: 'description for component2',
    generateFiles: (context: ComponentContext) => {
      return [
        // index file
        {
          relativePath: 'index.ts',
          isMain: true,
          content: `add content here`,
        },
        // add more files
      ];
    },
  },
  // add more components
]);
```

### Compiling the Generator
Make sure you run `bit compile` after any changes to your generator.
```shell
bit compile
```

### Using your Generator
Use your generator to create the component files. In our example we used the name component1 as our template name. We can use then `bit create component1` followed by the name of the component we want to create, for example a button component.
```shell
bit create component1 button
```

### Exporting your Generator
You can export your generator as a component so that other members of your team can use it in other workspaces/projects and therefore everyone will be creating components just how you want them to.
https://harmony-docs.bit.dev/extending-bit/creating-a-custom-generator#exporting-your-generator

## Creating a Custom Workspace Generator
https://harmony-docs.bit.dev/extending-bit/creating-a-custom-workspace-generator/

## Thinking in Components
