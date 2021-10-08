# BEhive Bit Components
These are core / CMS components to be used with React and and eventually React Native using the [react-native-web](https://necolas.github.io/react-native-web/) library. This repo is still a work in progress for components on [bit.dev](https://bit.dev/behivetech/). Currently it's only about 30% complete. The goal of this repo is to build global reusable components to reduce the amount of repeated code often used across different projects.


## High Level Overview for the Key CMS Components
The following is a high level overview for global CMS components to be used in React (and eventually React Native) projects. The goal is to keep them as unopinionated as possible so they can be used within a multitude of frameworks such as Gatsby, Next.js or Create React App. The functionality of these components offers a simplified way to add customized components ranging from something that simply displays static content all the way up to full blown [micro-frontends](https://micro-frontends.org/) (aka micro-apps). For more details on the components, check the `*.docs.mdx` file within the comopnent's folder or go to the [BEhive Tech area](https://bit.dev/behivetech/) on bit.dev to see a richer view of their docs and functionality.

### [CmsPageProvider](/behivetech/components/cms/cms-provider)
This should wrap the entire app so all child CMS components can access the cmsParams and other functionality from the context passed down from this [React provider](https://reactjs.org/docs/context.html).

### [CmsArea](/behivetech/components/cms/cms-area)
The CMSArea component has the functionality to choose which custom block level components to import which is an array of blocks defined within the `areas` key in the `cmsParams`. The list of available blocks could be any of the blocks made available for this `CMSArea` component.`This component also contains a menu in edit mode which gives the ability to add/edit/delete blocks and any additional functionality you may want to pass in through the menuItems prop.
