export default class PasswordlessOptions {
    private _baseUrl: string = "https://v4.passwordless.dev";
    private _secret!: string;

    public get baseUrl(): string {
        return this._baseUrl;
    }

    public get secret(): string {
        return this._secret;
    }

    public static createWithDotEnv(): PasswordlessOptions {
        const options = new PasswordlessOptions();
        if (process.env.PASSWORDLESS_API) {
            options._baseUrl = process.env.PASSWORDLESS_API as string;
        }
        options._secret = process.env.PASSWORDLESS_SECRET as string;
        return options;
    }

    public static createCloud(secret: string): PasswordlessOptions {
        const options = new PasswordlessOptions();
        options._secret = secret;
        return options;
    }

    public static createHosted(baseUrl: string, secret: string): PasswordlessOptions {
        const options = new PasswordlessOptions();
        options._baseUrl = baseUrl;
        options._secret = secret;
        return options;
    }
}