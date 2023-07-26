This library is meant for helping you integrate 'Passwordless.dev' with your Node.js backend.

# Requirements
- ES6 or newer, read more [here](https://node.green/).

# Getting Started
## .env
When using .env to configure your web application you'll need to set the following properties:

| Key                   | Value example                                  | Description                                                  | Optional |
|-----------------------|------------------------------------------------|--------------------------------------------------------------|----------|
| `PASSWORDLESS_API`    | `https://v4.passwordless.dev`                  | The base url where your Passwordless.dev back-end is running | Yes      |
| `PASSWORDLESS_SECRET` | `demo:secret:f831e39c29e64b77aba547478a4b3ec6` | This is your secret obtained from the AdminConsole.          | No       |

You would then use the PasswordlessClient as:

# Using
## Dotenv
In your `.env` file you can write your configuration as follows. Note that `PASSWORDLESS_API` is optional and will default to `https://v4.passwordless.dev`.
```
PASSWORDLESS_API=https://v4.passwordless.dev
PASSWORDLESS_SECRET=demo:secret:f831e39c29e64b77aba547478a4b3ec6
```

```TSX
const options: PasswordlessOptions = PasswordlessOptions.createWithDotEnv();
const client: IPasswordlessClient = PasswordlessClient.create(options);
```

## Manually

If you want to specify the parameters manually or from a different source.

```TSX
const options: PasswordlessOptions = PasswordlessOptions.createCloud('demo:secret:f831e39c29e64b77aba547478a4b3ec6');
const client: IPasswordlessClient = PasswordlessClient.create(options);
```

```TSX
const options: PasswordlessOptions = PasswordlessOptions.createHosted('https://v4.passwordless.dev', 'demo:secret:f831e39c29e64b77aba547478a4b3ec6');
const client: IPasswordlessClient = PasswordlessClient.create(options);
```

## Registration
If you had for example a 'UserController.ts' with a 'signup' arrow function. You could register a new token as shown below.

You'll first want to proceed to store the new user in your database and verifying it has succeeded, before registering the token.

```TSX
signup = async (request: express.Request, response: express.Response) => {
        const signupRequest: SignupRequest = request.body;
        const repository: UserRepository = new UserRepository();
        let id: string = null;
        try {
            id = repository.create(signupRequest.username, signupRequest.firstName, signupRequest.lastName);
        } catch {
            repository.close();
        }

        const passwordlessOptions: PasswordlessOptions = PasswordlessOptions.createWithDotEnv();
        const passwordlessClient: PasswordlessClient = PasswordlessClient.create(passwordlessOptions);
        let registerOptions = new RegisterOptions();
        registerOptions.userId = id;
        registerOptions.username = signupRequest.username;
        if (signupRequest.deviceName) {
            registerOptions.aliases = new Array(1);
            registerOptions.aliases[0] = signupRequest.alias;
        }
        registerOptions.discoverable = true;
        const token: RegisterTokenResponse = await passwordlessClient.createRegisterToken(registerOptions);
        response.send(token);
    }
```

## Logging in

```TSX
signin = async (request: express.Request, response: express.Response) => {
        try {
            const token: string = request.query.token as string;
            const verifiedUser: VerifiedUser = await this._passwordlessClient.verifyToken(token);

            if (verifiedUser && verifiedUser.success === true) {
                // If you want to build a JWT token for your application that are rendered client-side, you can do this here.
                response.send(JSON.stringify(verifiedUser));
                return;
            }
        } catch {
            // error handling
        }
        response.send(401);
    }
```