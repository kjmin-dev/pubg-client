[![TypeScript version][ts-badge]][typescript-4-0]
[![Node.js version][nodejs-badge]][nodejs]
[![][license-badge]][license]

# pubg-client

🚀 A TypeScript wrapper for official [PUBG API][pubg_api]

👩🏻‍💻 This project was setup by [node-typescript-boilerplate][repo-template]

🌟 pubg-client offers:
- [Promise][promise] based API
- All of [PUBG API][pubg_api] except [Telemetry][pubg_api_telemetry]

# API Documentation
see [Generated document](https://schnellehand.github.io/pubg-client/)

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

## Import module
You can import `pubg-client` module in two ways:
1. import the module and set api key
```javascript
import api from 'pubg-client';
// or const api = require('pubg-client').default;
api.key = 'your_api_key';
```
2. create new instance
```javascript
import { createInstance } from 'pubg-client';
// or const { createInstance } = require('pubg-client');
const api = new createInstance('your_api_key');
```
## Set environment
You can change API host and `gzip` compression option
```javascript
// change API host to your custom API server
api.prefix = 'http://example.com'
// enable gzip compression on response
api.gzip = true
// disable gzip compression on response (default value: false)
api.gzip = false
```
# Usage
## Basic API example
### **Ex1.** Search player 'leichtjoon' in 'steam' region
```javascript
api.players('steam', 'leichtjoon')
```
### **Ex2.** Search one player by player's unique id
```javascript
api.player('steam', 'account.183bc4b2c3404935baf3d56fb434b393')
```
### **Ex3.** Get all available seasons in 'xbox' region
```javascript
api.seasons('xbox')
api.seasons('kakao')
api.seasons('console')
api.seasons('steam')
```
### **Ex4.** Get seasons that player have been played
```javascript
api.lifetime('steam', 'account.183bc4b2c3404935baf3d56fb434b393')
```
### **Ex5.** Get stat of player
```javascript
api.stat('steam', 'account.183bc4b2c3404935baf3d56fb434b393', 'division.bro.official.pc-2018-08')
```
## Functional API example
[`$platform`](https://schnellehand.github.io/pubg-client/interfaces/_lib_pubg_.api_season.html) and [`$user`](https://schnellehand.github.io/pubg-client/docs/interfaces/_lib_pubg_.api_user.html) properties provide API calls through functional interfaces. See [Documentation](https://schnellehand.github.io/pubg-client/interfaces/_lib_pubg_.api_season.html)
```javascript
api.$platform('steam').players('leichtjoon')
api.$platform('steam').$user('account.183bc4b2c3404935baf3d56fb434b393').lifetime()
```

# Parameters
The range of values of the `platform` and `region` parameters follows the official PUBG document. See [Making Requests](https://documentation.pubg.com/en/making-requests.html)

# Development
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