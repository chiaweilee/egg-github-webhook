# [egg-github-webhook](#) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/chiaweilee/egg-github-webhook/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/egg-github-webhook.svg?style=flat)](https://www.npmjs.com/package/egg-github-webhook) [![npm downloads](https://img.shields.io/npm/dm/egg-github-webhook.svg)](https://npmcharts.com/compare/egg-github-webhook?minimal=true) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](#)

🥚Egg plugin for processing GitHub Webhooks. 

## Installation

```
npm install egg-github-webhook
```

## BeforeUse

*Content type must be `application/json`, `application/x-www-form-urlencoded` won't work at present.*

## Usage

```js
// plugin.js
githubWebhook: {
  enable: true,
  package: 'egg-github-webhook',
}
```

```js
// config.default.js
githubWebhook: {
  path: '/',
  secret: 'your-github-webhook-password',
  event: {
    push: './scripts/githook.js',
  }
}
```

*tips: It is possiable to use YAML.*

## Options

option | intro | type |  default  
-|-|-|-
path | Path of Payload URL | string | |
secret | secret | string | |
event | event object | object<Function> | object<string> | |

## Example

```js
event: {
  push: function(event) {
    if (event.payload) {
      const { ref, commits } = event.payload;

      if (ref === 'refs/heads/master') {
        if (!commits.every(commit => commit.message !== 'build: release')) {
          cmd.run('git pull');
        }
      }
    }
  };
}
```
