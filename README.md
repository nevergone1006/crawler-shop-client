## Building and running on localhost

First install dependencies:

```sh
yarn install
```

To run in hot module reloading mode:

```sh
yarn start
```

To create a production build:

```sh
yarn run build
```

To create a development build:

```sh
yarn run build:dev
```

To Extract message IDs from source code:

```sh
yarn run extract-messages
```

## Running

Open the file `build/index.html` in your browser

## Technical stack

  - [React V16.6.*](https://reactjs.org/), JSX, ES6

  - [Lodash v4](https://lodash.com/)

  - [Moment-Timezone](https://momentjs.com/timezone/)

  - [React router v4](https://github.com/ReactTraining/react-router)

  - Mobx and mobx-react [v5](https://mobx.js.org/)
  
  - Code Splitting in React Using [React Loadable](https://github.com/jamiebuilds/react-loadable)
    - Plugin for dynamic import 
      - @babel/plugin-syntax-dynamic-import
      - babel-plugin-dynamic-import-webpack

  - [Normalize.css](https://necolas.github.io/normalize.css/) A modern, HTML5-ready alternative to CSS resets

  - [react-intl](https://github.com/yahoo/react-intl)
    - Extract message IDs from source code by [babel-plugin-react-intl](https://github.com/yahoo/babel-plugin-react-intl)

  - React and boostrap v4 [reactstrap](https://reactstrap.github.io)
  
  ---------

  - [Eslint](https://eslint.org/)
    - parser babel-eslint
    - plugin eslint-plugin-react

  - [webpack v4](https://webpack.js.org/)
    - webpack-cli
    - webpack-dev-server
    - html-webpack-plugin
    - lodash-webpack-plugin
    - loader
      - babel-loader
      - style-loader
      - css-loader
      - sass-loader
      - url-loader

  - [babel](https://babeljs.io/)
    - @babel/cli
    - preset 
      - @babel/preset-env
      - @babel/preset-react

    - plugin
      - @babel/plugin-proposal-class-properties
      - @babel/plugin-proposal-decorators
