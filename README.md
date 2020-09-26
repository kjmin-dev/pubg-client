[![TypeScript version][ts-badge]][typescript-4-0]
[![Node.js version][nodejs-badge]][nodejs]
[![][license-badge]][license]

# pubg-client

🚀 A TypeScript wrapper for official [PUBG API][pubg_api]

👩🏻‍💻 This project was setup by [node-typescript-boilerplate][repo-template]

🌟 pubg-client offers:
- [Promise][promise] based API
- All of [PUBG API][pubg_api] except [Telemetry][pubg_api_telemetry]

# Installation
To start, just install the `pubg-client` into your node.js project.

use npm
```sh
npm install pubg-client
```
or yarn
```sh
yarn add pubg-client
```

# Usage
You can import `pubg-client` module in two ways:

1. import the module and set api key
```javascript
    import api from 'pubg-client';
    api.key = 'your_api_key';
```
2. create new instance
```javascript
    import { createInstance } from 'pubg-client';
    const api = new createInstance('your_api_key');
```
To start, just click the **[Use template][repo-template-action]** link (or the green button). Now start adding your code in the `src` and unit tests in the `__tests__` directories.

🏃🏽 pubg-client library was developed by using:

- [TypeScript][typescript] [4.0][typescript-4-0]
- [ESLint][eslint] with some initial rules recommendation
- [Jest][jest] for fast unit testing and code coverage
- Type definitions for Node.js and Jest
- [Prettier][prettier] to enforce consistent code style
- Simple example of TypeScript code and unit test
- .editorconfig for consistent file format

## License

Licensed under the APLv2. See the [LICENSE][license] file for details.

[ts-badge]: https://img.shields.io/badge/TypeScript-4.0-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2012.13-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v12.x/docs/api/
[typescript]: https://www.typescriptlang.org/
[typescript-4-0]: https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html
[license-badge]: https://img.shields.io/badge/license-APLv2-blue.svg
[license]: https://github.com/schnellehand/pubg-client/blob/master/LICENSE
[jest]: https://facebook.github.io/jest/
[eslint]: https://github.com/eslint/eslint
[prettier]: https://prettier.io
[repo-template]: https://github.com/jsynowiec/node-typescript-boilerplate
[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[pubg_api]: https://documentation.pubg.com/en/introduction.html
[pubg_api_request]: https://documentation.pubg.com/en/making-requests.html
[pubg_api_lifetime]: https://documentation.pubg.com/en/lifetime-stats.html
[pubg_api_telemetry]: https://documentation.pubg.com/en/telemetry.html
