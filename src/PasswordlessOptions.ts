import PasswordlessConfigurationException from "./exceptions/PasswordlessConfigurationException";

export default class PasswordlessOptions {
    private _baseUrl!: string;
    private _secret!: string;

    public get baseUrl(): string {
        return this._baseUrl;
    }

    private set baseUrl(value: string) {
        if (!value) {
            const exception = new PasswordlessConfigurationException();
            exception.name = 'MISSING_API';
            exception.message = "'process.env.PASSWORDLESS_API' has not been set.";
            throw exception;
        }
        this._baseUrl = value;
    }

    public get secret(): string {
        return this._secret;
    }

    private set secret(value: string) {
        if (!value) {
            const exception = new PasswordlessConfigurationException();
            exception.name = 'MISSING_SECRET';
            exception.message = "'process.env.PASSWORDLESS_SECRET' has not been set.";
            throw exception;
        }
        this._secret = value;
    }

    public static createWithDotEnv(): PasswordlessOptions {
        const options = new PasswordlessOptions();
        options._baseUrl = process.env.PASSWORDLESS_API as string;
        options._secret = process.env.PASSWORDLESS_SECRET as string;
        return options;
    }

    public static createWithConfiguration(baseUrl: string, secret: string): PasswordlessOptions {
        const options = new PasswordlessOptions();
        options._baseUrl = baseUrl;
        options._secret = secret;
        return options;
    }
}