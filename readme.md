This library is meant for helping you integrate 'Passwordless.dev' with your Node.js backend.

# Requirements
- ES6 or newer, read more [here](https://node.green/).

# Getting Started
## .env
When using .env to configure your web application you'll need to set the following properties:

| Key                   | Value example           | Description                                                  |
|-----------------------|-------------------------|--------------------------------------------------------------|
| `PASSWORDLESS_API`    | https://v4.passwordless.dev | The base url where your Passwordless.dev back-end is running |
| `PASSWORDLESS_SECRET` | demo:secret:f831e39c29e64b77aba547478a4b3ec6 | This is your secret obtained from the AdminConsole. |

You would then use the PasswordlessClient as:

```TSX
const options: PasswordlessOptions = PasswordlessOptions.createWithDotEnv();
const client: IPasswordlessClient = PasswordlessClient.create(options);
```

## manually

If you want to specify the parameters manually or from a different source.

```TSX
const options: PasswordlessOptions = PasswordlessOptions.createWithConfiguration('https://v4.passwordless.dev', 'demo:secret:f831e39c29e64b77aba547478a4b3ec6');
const client: IPasswordlessClient = PasswordlessClient.create(options);
```