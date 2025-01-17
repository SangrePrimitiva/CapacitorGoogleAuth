<h1 align="center">CapacitorGoogleAuth</h1>
<p align="center"><strong><code>@SangrePrimitiva/capacitor-google-auth</code></strong></p>
<p align="center"><strong>CAPACITOR 5</strong></p>
<p align="center">
Capacitor plugin for Google Auth.
</p>
<br>

## Contributions

If you want to contribute, you can do so in [the original repo by CodetrixStudio](https://github.com/CodetrixStudio/CapacitorGoogleAuth). This fork is intended for custom adjustments.

## Install

#### 1. Install package

```sh
npm i --save @SangrePrimitiva/capacitor-google-auth

# pnpm 
pnpm add @SangrePrimitiva/capacitor-google-auth

# yarn 
yarn add @SangrePrimitiva/capacitor-google-auth
```

#### 2. Update capacitor deps

```sh
npx cap update
```

## Updating

If need migrate to different Capacitor versions [see instruction for migrate plugin to new version](#migration-guide).

## Usage

### WEB

Register plugin and manually initialize

```ts
import { GoogleAuth } from '@SangrePrimitiva/capacitor-google-auth';

// use hook after platform dom ready
GoogleAuth.initialize({
  clientId: 'CLIENT_ID.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  grantOfflineAccess: true,
});
```

or if need use meta tags (Optional):

```html
<meta name="google-signin-client_id" content="{your client id here}" />
<meta name="google-signin-scope" content="profile email" />
```

#### Options

- `clientId` - The app's client ID, found and created in the Google Developers Console.
- `scopes` – same as [Configure](#Configure) scopes
- `grantOfflineAccess` – boolean, default `false`, Set if your application needs to refresh access tokens when the user is not present at the browser.

Use it

```ts
GoogleAuth.signIn();
```

#### Angular

init hook

```ts
// app.component.ts
constructor() {
  this.initializeApp();
}

initializeApp() {
  this.platform.ready().then(() => {
    GoogleAuth.initialize()
  })
}
```

sign in function

```ts
async googleSignIn() {
  let googleUser = await GoogleAuth.signIn();

  /*
    If you use Firebase you can forward and use the logged in Google user like this:
  */
  const credential = auth.GoogleAuthProvider.credential(googleUser.authentication.idToken);
  return this.afAuth.auth.signInAndRetrieveDataWithCredential(credential);
}
```

#### Vue 3

```vue
<script setup lang="ts">
import { defineComponent, onMounted } from 'vue';
import { GoogleAuth } from '@SangrePrimitiva/capacitor-google-auth';

onMounted(() => {
  GoogleAuth.initialize();
});

async function logIn() {
  const response = await GoogleAuth.signIn();
  console.log(response);
}
</script>
```

or see more [CapacitorGoogleAuth-Vue3-example](https://github.com/reslear/CapacitorGoogleAuth-Vue3-example)

### iOS

1. Create in Google cloud console credential **Client ID for iOS** and get **Client ID** and **iOS URL scheme**

2. Add **identifier** `REVERSED_CLIENT_ID` as **URL schemes** to `Info.plist` from **iOS URL scheme**<br>
   (Xcode: App - Targets/App - Info - URL Types, click plus icon)

3. Set **Client ID** one of the ways:
   1. Set in `capacitor.config.json`
      - `iosClientId` - specific key for iOS
      - `clientId` - or common key for Android and iOS
   2. Download `GoogleService-Info.plist` file with `CLIENT_ID` and copy to **ios/App/App** necessarily through Xcode for indexing.

plugin first use `iosClientId` if not found use `clientId` if not found use value `CLIENT_ID` from file `GoogleService-Info.plist`

### Android

Set **Client ID** :

1. In `capacitor.config.json`

   - `androidClientId` - specific key for Android
   - `clientId` - or common key for Android and iOS

2. or set inside your `strings.xml`

plugin first use `androidClientId` if not found use `clientId` if not found use value `server_client_id` from file `strings.xml`

```xml
<resources>
  <string name="server_client_id">Your Web Client Key</string>
</resources>
```

**Refresh method**

This method should be called when the app is initialized to establish if the user is currently logged in. If true, the method will return an accessToken, idToken and an empty refreshToken.
```ts
checkLoggedIn() {
    GoogleAuth.refresh()
        .then((data) => {
            if (data.accessToken) {
                this.currentTokens = data;
            }
        })
        .catch((error) => {
            if (error.type === 'userLoggedOut') {
                this.signin()
            }
        });
}
```

## Configure

| Name                     | Type     | Description                                                                                                                   |
| ------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------- |
| clientId                 | string   | The app's client ID, found and created in the Google Developers Console.                                                      |
| iosClientId              | string   | Specific client ID key for iOS                                                                                                |
| androidClientId          | string   | Specific client ID key for Android                                                                                            |
| scopes                   | string[] | Scopes that you might need to request to access Google APIs<br>https://developers.google.com/identity/protocols/oauth2/scopes |
| serverClientId           | string   | This ClientId used for offline access and server side handling                                                                |
| forceCodeForRefreshToken | boolean  | Force user to select email address to regenerate AuthCode <br>used to get a valid refreshtoken (work on iOS and Android)      |

Provide configuration in root `capacitor.config.json`

```json
{
  "plugins": {
    "GoogleAuth": {
      "scopes": ["profile", "email"],
      "serverClientId": "xxxxxx-xxxxxxxxxxxxxxxxxx.apps.googleusercontent.com",
      "forceCodeForRefreshToken": true
    }
  }
}
```

or in `capacitor.config.ts`

```ts
/// <reference types="'@SangrePrimitiva/capacitor-google-auth'" />

const config: CapacitorConfig = {
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: 'xxxxxx-xxxxxxxxxxxxxxxxxx.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
```

## API

<docgen-index>

* [`initialize(...)`](#initialize)
* [`signIn()`](#signin)
* [`refresh()`](#refresh)
* [`signOut()`](#signout)
* [Interfaces](#interfaces)

</docgen-index>
<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### initialize(...)

```typescript
initialize(options?: InitOptions) => void
```

Initializes the GoogleAuthPlugin, loading the gapi library and setting up the plugin.

| Param         | Type                                                | Description                        |
| ------------- | --------------------------------------------------- | ---------------------------------- |
| **`options`** | <code><a href="#initoptions">InitOptions</a></code> | - Optional initialization options. |

**Since:** 3.1.0

--------------------


### signIn()

```typescript
signIn() => Promise<User>
```

Initiates the sign-in process and returns a Promise that resolves with the user information.

**Returns:** <code>Promise&lt;<a href="#user">User</a>&gt;</code>

--------------------


### refresh()

```typescript
refresh() => Promise<Authentication>
```

Refreshes the authentication token and returns a Promise that resolves with the updated authentication details.

**Returns:** <code>Promise&lt;<a href="#authentication">Authentication</a>&gt;</code>

--------------------


### signOut()

```typescript
signOut() => Promise<any>
```

Signs out the user and returns a Promise.

**Returns:** <code>Promise&lt;any&gt;</code>

--------------------


### Interfaces


#### InitOptions

| Prop                     | Type                  | Description                                                                                                                                      | Default            | Since |
| ------------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ | ----- |
| **`clientId`**           | <code>string</code>   | The app's client ID, found and created in the Google Developers Console. Common for Android or iOS. The default is defined in the configuration. |                    | 3.1.0 |
| **`scopes`**             | <code>string[]</code> | Specifies the scopes required for accessing Google APIs The default is defined in the configuration.                                             |                    |       |
| **`grantOfflineAccess`** | <code>boolean</code>  | Set if your application needs to refresh access tokens when the user is not present at the browser. In response use `serverAuthCode` key         | <code>false</code> | 3.1.0 |


#### User

| Prop                 | Type                                                      | Description                                                         |
| -------------------- | --------------------------------------------------------- | ------------------------------------------------------------------- |
| **`id`**             | <code>string</code>                                       | The unique identifier for the user.                                 |
| **`email`**          | <code>string</code>                                       | The email address associated with the user.                         |
| **`name`**           | <code>string</code>                                       | The user's full name.                                               |
| **`familyName`**     | <code>string</code>                                       | The family name (last name) of the user.                            |
| **`givenName`**      | <code>string</code>                                       | The given name (first name) of the user.                            |
| **`imageUrl`**       | <code>string</code>                                       | The URL of the user's profile picture.                              |
| **`serverAuthCode`** | <code>string</code>                                       | The server authentication code.                                     |
| **`authentication`** | <code><a href="#authentication">Authentication</a></code> | The authentication details including access, refresh and ID tokens. |


#### Authentication

| Prop               | Type                | Description                                      |
| ------------------ | ------------------- | ------------------------------------------------ |
| **`accessToken`**  | <code>string</code> | The access token obtained during authentication. |
| **`idToken`**      | <code>string</code> | The ID token obtained during authentication.     |
| **`refreshToken`** | <code>string</code> | The refresh token.                               |

</docgen-api>


## License

[MIT](./LICENSE)
