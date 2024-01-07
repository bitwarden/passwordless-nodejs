import express, { Express } from "express";
import dotenv from 'dotenv';
import {
    PasswordlessClient,
    PasswordlessOptions,
    RegisterOptions,
    RegisterTokenResponse, VerifiedUser
} from "@passwordlessdev/passwordless-nodejs";
import SignupRequest from "./SignupRequest";
import UserRepository from "./repositories/UserRepository";
import SigninRequest from "./SigninRequest";

dotenv.config()

const app: Express = express();
app.use(express.json());

app.post('/users/register', async (req, res) => {
    const signupRequest: SignupRequest = req.body;
    const repository: UserRepository = new UserRepository();
    let id: string = null;
    try {
        id = await repository.create(signupRequest.username);
    } catch {
        // do error handling, creating user failed.
    } finally {
        repository.close();
    }

    if (!id) {
        // Do not proceed to create a token, we failed to create a user.
        res.send(400);
    }

    let registerOptions = new RegisterOptions();
    registerOptions.userId = id;
    registerOptions.username = signupRequest.username;

    // Setting an alias is optional, you can define multiple unique aliases, but we're only setting one.
    if (signupRequest.alias) {
        registerOptions.aliases = new Array(1);
        registerOptions.aliases[0] = signupRequest.alias;
    }

    registerOptions.discoverable = true;

    const passwordlessOptions: PasswordlessOptions = {
        baseUrl: process.env.PASSWORDLESS_API as string
    }
    const passwordlessClient = new PasswordlessClient(
        process.env.PASSWORDLESS_SECRET as string,
        passwordlessOptions
    );
    const token: RegisterTokenResponse = await passwordlessClient.createRegisterToken(registerOptions);
    res.send(token);
});

app.post('/users/login', async (req, res) => {
    const signinRequest: SigninRequest = req.body;

    // before we do anything, verify the token.
    const passwordlessOptions: PasswordlessOptions = {
        baseUrl: process.env.PASSWORDLESS_API as string
    };
    const passwordlessClient = new PasswordlessClient(
        process.env.PASSWORDLESS_SECRET as string,
        passwordlessOptions
    );
    const verifiedToken: VerifiedUser = await passwordlessClient.verifyToken(signinRequest.token);

    if (!verifiedToken) {
        // if empty, invalid user
        res.status(400).send("invalid token");
        return;
    }

    const userRepository = new UserRepository();

    // retrieve the user to do something such as building a JWT token.
    const user = await userRepository.get(verifiedToken.userId);

    // do more here

    res.send(verifiedToken);
});

app.get('/.well-known/assetlinks.json', (req, res) => {
    const assetlinks = [];
    const relation = [
      'delegate_permission/common.handle_all_urls',
      'delegate_permission/common.get_login_creds',
    ];
    assetlinks.push({
      relation: relation,
      target: {
        namespace: 'web',
        site: process.env.ORIGIN,
      },
    });
    if (process.env.ANDROID_PACKAGENAME && process.env.ANDROID_SHA256HASH) {
      assetlinks.push({
        relation: relation,
        target: {
          namespace: 'android_app',
          package_name: process.env.ANDROID_PACKAGENAME,
          sha256_cert_fingerprints: [process.env.ANDROID_SHA256HASH],
        },
      });
    }
    res.json(assetlinks);
});

const server = app.listen(5014, () => {
    console.log("App running on 5014 port")
});

// serve static/html files
app.use(express.static("public"));

const shutdown = () => {
    console.log('Stopping ...');
    server.close(() => {
        console.log('Stopped');
    });
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}