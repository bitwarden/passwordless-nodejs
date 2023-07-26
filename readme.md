This library is meant for helping you integrate 'Passwordless.dev' with your Node.js backend.

# Requirements
- ES6 or newer, read more [here](https://node.green/).

# Getting Started
## .env
When using .env to configure your web application you'll need to set the following properties:

| Key                   | Value example                                | Description                                                  | Optional |
|-----------------------|----------------------------------------------|--------------------------------------------------------------|----------|
| `PASSWORDLESS_API`    | https://v4.passwordless.dev                  | The base url where your Passwordless.dev back-end is running | Yes      |
| `PASSWORDLESS_SECRET` | demo:secret:f831e39c29e64b77aba547478a4b3ec6 | This is your secret obtained from the AdminConsole.          | No       |

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