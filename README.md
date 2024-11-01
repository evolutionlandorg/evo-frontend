# Evolution Land Interface

Welcome to Evolution Land, view the user docs by visiting [Immigration Office](https://docs.evolution.land/)

## Installation and Running the Project

To get started with the Evolution Land project, follow these steps:

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14) It is recommended to use nvm management, the configuration file can be found in /.nvmrc
- [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

```shell
git clone https://github.com/evolutionlandorg/evo-frontend.git
cd evo-frontend
```

2. **Install dependencies:**

```shell
yarn install
```

### Running the Project

1. **Start the development server:**

```shell
yarn start
```

This will start the development server and open the application in your default web browser. The server will automatically reload if you make changes to the code.

2. **Build for production:**

```shell
yarn build
```

This will create an optimized production build of the application in the `build` directory.

Follow these steps to set up and run the Evolution Land project on your local machine. If you encounter any issues, please refer to the project's documentation or seek help from the community.

## Project Directory Structure

The project key directory is organized as follows:

```
evolution-interface/
├── public/ # Static files and locales file.
│   ├── images/
│   └── locales/
├── src/
│   ├── api/
│   ├── components/ # EvolutionLand related components
│   ├── config/ # module config
│   ├── contexts/
│   ├── pages/ # Contains the interface page content.
│   ├── store/
│   ├── style/
│   ├── types/
│   ├── ui/ # Reusable UI components.
│   ├── utils/
├── .gitignore
├── commitlint.config.js
├── package.json
├── README.md
└── tsconfig.json

/src/ContinentLayout/index.tsx # Main router
```

## Configuration

| Configuration Name           | Value            | Description            |
| ---------------------------- | ---------------- | ---------------------- |
| REACT_APP_API_HOST           |                  | api host               |
| REACT_APP_ASSETS_HOST        |                  | land images host       |
| REACT_APP_PUBLIC_ASSETS_HOST |                  | wallet token icon host |
| REACT_APP_CHAIN              | mainnet, testnet |                        |

## Fast authoring of commit messages

Fast authoring of commit messages and ensures they adhere to the commit convention configured in [commitlint.config.js](./commitlint.config.js).

```shell
$ git add .
$ git commit
cz-cli@4.2.4, cz-conventional-changelog@3.3.0

? Select the type of change that you're committing: feat:     A new feature
? What is the scope of this change (e.g. component or file name): (press enter to skip)
? Write a short, imperative tense description of the change (max 94 chars):
 (10) commitlint
? Provide a longer description of the change: (press enter to skip)

? Are there any breaking changes? No
? Does this change affect any open issues? No
[branch-name 20b37b1] feat: commitlint
 1 file changed, 8 insertions(+)
```

## Links

- Dev: https://evolutionland-dev.vercel.app

- Staging: https://evolutionland-staging.vercel.app

## Convention

- CSS classes and image resource files are named using `xxx-xxxx` instead of camel case
- The export of `export default`, `import` will cause random naming, and the editor prompt is not smart enough, so try to use `export` instead of `export default`
- `Mobile first breakpoint system`, so `@media screen and (min-width: xxx)` should be used instead of `@media screen and (max-width: xxx)`

## Responsive Design

breakpointMap `src/ui/theme/base.ts`

- Media queries

```javascript
${({ theme }) => theme.mediaQueries.sm} {
  // style
}
```

- Determine device type

```javascript
const { isMobile, isTablet, isDesktop } = useMatchBreakpoints()

```

## Copyright Statement

This project is licensed under the terms of the MIT license, see [LICENSE.txt](https://github.com/evolutionlandorg/evo-frontend/blob/master/LICENSE.txt)