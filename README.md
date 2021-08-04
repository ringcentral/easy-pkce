# EASY-PKCE #

[![Build Status](https://github.com/ringcentral/easy-pkce/workflows/CI%20Pipeline/badge.svg?branch=develop)](https://github.com/ringcentral/easy-pkce/actions)
[![NPM version](https://img.shields.io/npm/v/@ringcentral/easy-pkce/latest.svg)](https://www.npmjs.com/package/@ringcentral/easy-pkce)
## Description ##

EASY-PKCE project is a small lib that generates strings for PKCE, as known as Proof Key for Code Exchange. PKCE is a mechanism that came into being to make the use of OAuth 2.0 Authorization Code grant more secure in certain cases. It was originally designed to protect mobile apps, but its ability to prevent authorization code injection makes it useful for every OAuth client, even web apps that use a client secret.

## Usages ##

```ts
import {
  generateCodeChallenge,
  generateCodeVerifier,
  generateState,
  generateRandomString,
} from 'easy-pkce';

// get a base64url-encoded random string from a 32-octet sequence
const randomString = generateRandomString(32);

// get a url safe code verifier from a random 42-octet sequence
const codeVerifier_1 = generateCodeVerifier(42);
const codeVerifier_2 = generateCodeVerifier(); // default octet length is 32

// get a url safe state from a random 12-octet sequence
const state_1 = generateState(12);
const state_2 = generateState(); // default octet length is 32

// get the code challenge from the code verifier
const codeChallenge_1 = generateCodeChallenge(codeVerifier_1, 'plain'); // plain version
const codeChallenge_2 = generateCodeChallenge(codeVerifier_2, 'S256'); // S256 version

// get a pair of code verifier and code challenge
const {codeVerifier, codeChallenge} = generatePair("S256", 32);
```

## LICENSE [MIT](LICENSE) ##