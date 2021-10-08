# BEhive Bit Components
These are core / CMS components to be used with React and React Native using the [react-native-web](https://necolas.github.io/react-native-web/) library.



## High Level Overview for the Key CMS Components

### [CMSPageProvider](src/cms/components/CMSPageProvider.tsx)
This should wrap the entire app so all child CMS components can access the pageData and other functionality from the context passed down from this [React provider](https://reactjs.org/docs/context.html). In this project, it utilizes the [`_app.tsx`](https://nextjs.org/docs/advanced-features/custom-app) component from Next.js which is utilized on every page in the Next.js framework. This component requires props for `children` and `pageData`. The `pageData` prop is an object that defines all the components to be used for page layouts, area, blocks and any data needed for a block level component. To learn more specifics on the CMSPageProvider component and the `pageData` prop, open the [component file](src/cms/components/CMSPageProvider.tsx) and review the comments in the TypeScript defnitions.

### [CMSPageThemplate](src/cms/components/CMSPageThemplate.tsx)
The CMSPageThemplate component has the functionality to choose which page template component to import. The page template to be used is defined within the `pageData`. For this project, it should be imported into each [Next.js page](https://nextjs.org/docs/basic-features/pages). Ideally, the `pageData` prop for this project should be defined within one of the [three unique Next.js functions](https://nextjs.org/docs/basic-features/data-fetching) to assist in pre-rendering (as in server side rendering or static generation). Then you can pass that into the CMSPageProvider in the `_app.js` app component for Next.js. The page template components that are dynamically imported will utilize the CMSArea component. The [DefaultPageTemplate component](/src/components/page-templates/DefaultPageTemplate) demonstrates how to set this up.

An ideal setup would use a custom `Layout` component to include components that are repeated throughout the app. For instance, you might have a `Header` component which includes all menus, title, etc that would be used in the header and a `Footer` component to the same sort of thing. It would take a `children` prop to display whatever should be shown between the `Header` and `Footer` components.

There may be sub-layout components that are also reused throught the main area of the site (between header and footer) such as a common vertical or horizontal two-column layout either. If the main area of the page template is more of a one off, then sub-layouts would not be necessary.

The different types of layout components are just suggestions to reduce repeated code. Evertyhing within the page templates are unopinionated.

### [CMSArea](src/cms/components/CMSArea.tsx)
The CMSArea component has the functionality to choose which custom block level components to import which is an array of blocks defined within the `areas` key in the `pageData`. The list of available blocks could be any of the blocks made available for this `CMSArea` component.`This component also contains a menu in edit mode which gives the ability to add/edit/delete blocks and any additional functionality you may want to pass in through the menuItems prop.
