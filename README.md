<p>
  <img width="100%" src="https://raw.githubusercontent.com/solidjs/solid/master/banner.png" alt="SolidJS">
</p>

[![Build Status](https://github.com/solidjs/solid/workflows/Solid%20CI/badge.svg)](https://github.com/solidjs/solid/actions/workflows/main-ci.yml)
[![Coverage Status](https://img.shields.io/coveralls/github/solidjs/solid.svg?style=flat)](https://coveralls.io/github/solidjs/solid?branch=main)
[![NPM Version](https://img.shields.io/npm/v/solid-js.svg?style=flat)](https://www.npmjs.com/package/solid-js)
[![](https://img.shields.io/npm/dm/solid-js.svg?style=flat)](https://www.npmjs.com/package/solid-js)
[![Discord](https://img.shields.io/discord/722131463138705510)](https://discord.com/invite/solidjs)
[![Subreddit subscribers](https://img.shields.io/reddit/subreddit-subscribers/solidjs?style=social)](https://www.reddit.com/r/solidjs/)

Solid is a declarative JavaScript library for creating user interfaces. It does not use a Virtual DOM. Instead it opts to compile its templates down to real DOM nodes and wrap updates in fine grained reactions. This way when your state updates only the code that depends on it runs.

## ! Trusted Types integration !

This branch is PoC of of Trusted Types integration into solid.js library. From my testing, no direct changes to solid.js
code needs to be performed - however there needs to be a change in the JSX preprocessing code. This code is included in
a dependency called `dom-expressions`. The integration code can be found in
https://github.com/Siegrift/dom-expressions/tree/trusted-types.

### Getting started

I had some problem using a custom build of `dom-expression` library, so I ended up replacing the necessary files inside
node modules directly. This is a fragile setup, but it's good enough for this PoC. To correctly build the Trusted Types
compliant version of solid.js, follow these steps:

1. Clone this (`solid`) repository

```sh
git clone --branch trusted-types https://github.com/Siegrift/solid/
```

2. Clone `dom-expressions` alongside this project

```sh
git clone --branch trusted-types https://github.com/Siegrift/dom-expressions
```

The two projects should be alongside each other:

```sh
# tree -L 1 .
├── solid
├── dom-expressions
...
```

3. Download dependencies and build the `dom-expressions` project:

```sh
cd dom-expressions
npm install && npm run build
```

This will build the `dom-expressions` project and prepare it for use inside `solid` library.

4. From this (`solid`) repository run:

```sh
npm install
```

5. The library is ready to be built (using `yarn build`) and used in solid applications

### Integration description

Solid transforms the JSX into code chunks using HTML templates which are then directly updated in the DOM when
necessary. These templates are populated via `innerHTML` property which sets the content of the template based on the
JSX expression. This JSX transformation is performed by babel at compile time. This by definition means that no
dangerous (attacker controlled values) can be passed to the template. For this reason it is safe to allow all templates
created by JSX transformation, which we do so using a Trusted Types policy called `solid-dom-expressions`.

Note that the updates of the JSX or dynamic JSX values are handled via updates, for which standard Trusted Types rules
apply.

### Key Features

- Real DOM with fine-grained updates (<b>No Virtual DOM! No Dirty Checking Digest Loop!</b>).
- Declarative data
  - Simple composable primitives without the hidden rules.
  - Function Components with no need for lifecycle methods or specialized configuration objects.
  - Render once mental model.
- Fast!
  - Almost indistinguishable performance vs optimized painfully imperative vanilla DOM code. See Solid on [JS Framework Benchmark](https://github.com/krausest/js-framework-benchmark).
  - Fastest at Server Rendering in the [Isomorphic UI Benchmarks](https://github.com/ryansolid/isomorphic-ui-benchmarks/tree/updated)
- Small! Completely tree-shakeable Solid's compiler will only include parts of the library you use.
- Supports and is built on TypeScript.
- Supports modern features like JSX, Fragments, Context, Portals, Suspense, Streaming SSR, Progressive Hydration, Error Boundaries and Concurrent Rendering.
- Works in serverless environments including AWS Lambda and Cloudflare Workers.
- Webcomponent friendly and can author Custom Elements
  - Context API that spans Custom Elements
  - Implicit event delegation with Shadow DOM Retargeting
  - Shadow DOM Portals
- Transparent debugging: a `<div>` is just a div.

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## The Gist

```jsx
import { render } from "solid-js/web";

const HelloMessage = props => <div>Hello {props.name}</div>;

render(() => <HelloMessage name="Taylor" />, document.getElementById("hello-example"));
```

A Simple Component is just a function that accepts properties. Solid uses a `render` function to create the reactive mount point of your application.

The JSX is then compiled down to efficient real DOM expressions:

```js
import { render, template, insert, createComponent } from "solid-js/web";

const _tmpl$ = template(`<div>Hello </div>`);

const HelloMessage = props => {
  const _el$ = _tmpl$.cloneNode(true);
  insert(_el$, () => props.name);
  return _el$;
};

render(
  () => createComponent(HelloMessage, { name: "Taylor" }),
  document.getElementById("hello-example")
);
```

That `_el$` is a real div element and `props.name`, `Taylor` in this case, is appended to its child nodes. Notice that `props.name` is wrapped in a function. That is because that is the only part of this component that will ever execute again. Even if a name is updated from the outside only that one expression will be re-evaluated. The compiler optimizes initial render and the runtime optimizes updates. It's the best of both worlds.

Want to see what code Solid generates:

### [Try it Online](https://playground.solidjs.com/)

## Quick Start

You can get started with a simple app by running the following in your terminal:

```sh
> npx degit solidjs/templates/js my-app
> cd my-app
> npm i # or yarn or pnpm
> npm run dev # or yarn or pnpm
```

Or for TypeScript:

```sh
> npx degit solidjs/templates/ts my-app
> cd my-app
> npm i # or yarn or pnpm
> npm run dev # or yarn or pnpm
```

This will create a minimal client-rendered application powered by [Vite](https://vitejs.dev/).

Or you can install the dependencies in your own project. To use Solid with JSX (recommended) run:

```sh
> npm install solid-js babel-preset-solid
```

The easiest way to get setup is add `babel-preset-solid` to your .babelrc, or babel config for webpack, or rollup:

```js
"presets": ["solid"]
```

For TypeScript remember to set your TSConfig to handle Solid's JSX by:

```js
"compilerOptions": {
  "jsx": "preserve",
  "jsxImportSource": "solid-js",
}
```

## Documentation

Check out the [Documentation](https://www.solidjs.com/guide) website.

[Examples](https://github.com/solidjs/solid/blob/main/documentation/resources/examples.md)

## Browser Support

The last 2 versions of modern evergreen browsers and Node LTS.

<img src="https://saucelabs.github.io/images/opensauce/powered-by-saucelabs-badge-gray.svg?sanitize=true" alt="Testing Powered By SauceLabs" width="300"/>

## Community

Come chat with us on [Discord](https://discord.com/invite/solidjs)

### Contributors

<a href="https://github.com/solidjs/solid/graphs/contributors"><img src="https://opencollective.com/solid/contributors.svg?width=890&amp;button=false" style="max-width:100%;"></a>

### Open Collective

Support us with a donation and help us continue our activities. [[Contribute](https://opencollective.com/solid)]

<a href="https://opencollective.com/solid/backer/0/website" target="_blank"><img src="https://opencollective.com/solid/backer/0/avatar.svg"></a>
<a href="https://opencollective.com/solid/backer/1/website" target="_blank"><img src="https://opencollective.com/solid/backer/1/avatar.svg"></a>
<a href="https://opencollective.com/solid/backer/2/website" target="_blank"><img src="https://opencollective.com/solid/backer/2/avatar.svg"></a>
<a href="https://opencollective.com/solid/backer/3/website" target="_blank"><img src="https://opencollective.com/solid/backer/3/avatar.svg"></a>
<a href="https://opencollective.com/solid/backer/4/website" target="_blank"><img src="https://opencollective.com/solid/backer/4/avatar.svg"></a>
<a href="https://opencollective.com/solid/backer/5/website" target="_blank"><img src="https://opencollective.com/solid/backer/5/avatar.svg"></a>
<a href="https://opencollective.com/solid/backer/6/website" target="_blank"><img src="https://opencollective.com/solid/backer/6/avatar.svg"></a>
<a href="https://opencollective.com/solid/backer/7/website" target="_blank"><img src="https://opencollective.com/solid/backer/7/avatar.svg"></a>
<a href="https://opencollective.com/solid/backer/8/website" target="_blank"><img src="https://opencollective.com/solid/backer/8/avatar.svg"></a>
<a href="https://opencollective.com/solid/backer/9/website" target="_blank"><img src="https://opencollective.com/solid/backer/9/avatar.svg"></a>
<a href="https://opencollective.com/solid/backer/10/website" target="_blank"><img src="https://opencollective.com/solid/backer/10/avatar.svg"></a>

### Sponsors

Become a sponsor and get your logo on our README on GitHub with a link to your site. [[Become a sponsor](https://opencollective.com/solid#sponsor)]

<a href="https://opencollective.com/solid/sponsor/0/website" target="_blank"><img src="https://opencollective.com/solid/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/solid/sponsor/1/website" target="_blank"><img src="https://opencollective.com/solid/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/solid/sponsor/2/website" target="_blank"><img src="https://opencollective.com/solid/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/solid/sponsor/3/website" target="_blank"><img src="https://opencollective.com/solid/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/solid/sponsor/4/website" target="_blank"><img src="https://opencollective.com/solid/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/solid/sponsor/5/website" target="_blank"><img src="https://opencollective.com/solid/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/solid/sponsor/6/website" target="_blank"><img src="https://opencollective.com/solid/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/solid/sponsor/7/website" target="_blank"><img src="https://opencollective.com/solid/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/solid/sponsor/8/website" target="_blank"><img src="https://opencollective.com/solid/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/solid/sponsor/9/website" target="_blank"><img src="https://opencollective.com/solid/sponsor/9/avatar.svg"></a>
<a href="https://opencollective.com/solid/sponsor/10/website" target="_blank"><img src="https://opencollective.com/solid/sponsor/10/avatar.svg"></a>
