import RegisterTokenResponse from "./models/RegisterTokenResponse";
import IPasswordlessClient from "./IPasswordlessClient";
import RegisterOptions from "./models/RegisterOptions";
import AliasPointer from "./models/AliasPointer";
import Credential from "./models/Credential";
import VerifiedUser from "./models/VerifiedUser";
import ProblemDetails from "./models/ProblemDetails";
import axios, {AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig, isAxiosError, AxiosResponse, AxiosInstance} from "axios";
import ApiException from "./exceptions/ApiException";
import VerifyTokenRequest from "./models/VerifyTokenRequest";
import DeleteUserRequest from "./models/DeleteUserRequest";
import ListResponse from "./models/ListResponse";
import PasswordlessOptions from "./PasswordlessOptions";
import DeleteCredentialRequest from "./models/DeleteCredentialRequest";
import UsersCount from "./models/UsersCount";

export default class PasswordlessClient implements IPasswordlessClient {
    private readonly _httpClient!: AxiosInstance;

    private constructor(options: PasswordlessOptions) {
        this._httpClient = axios.create({
            baseURL: options.baseUrl,
            headers: {
                'ApiSecret': options.secret
            }
        });
        this._httpClient.interceptors.response.use(
            (onFulfilled: any)=> onFulfilled,
            (onRejected: any) => {
                if (onRejected.response.headers['content-type'] === 'application/problem+json') {
                    throw new ApiException(onRejected.response.data);
                }
                return onRejected;
            }
        );

    }

    public static create(options: PasswordlessOptions): PasswordlessClient {
        if (!options) {
            throw new Error("'options' cannot be null.");
        }
        return new PasswordlessClient(options);
    }

    createRegisterToken = async (registerOptions: RegisterOptions): Promise<RegisterTokenResponse> => {
        return this._httpClient.post('register/token', registerOptions)
            .then((response: AxiosResponse<any, any>) => response.data)
            .catch((error: AxiosError<any, any>) => {
                if (isAxiosError(error) && error.response) {
                    const details = (error.response?.data as ProblemDetails);
                    throw new ApiException(details);
                }
            });
    }

    deleteCredential = (credentialId: Uint8Array): Promise<void> => {
        if (!credentialId) {
            throw new Error("'credentialId' is empty or was not specified.")
        }
        const request = new DeleteCredentialRequest(credentialId);
        return this._httpClient.post('credentials/delete', request);
    }

    deleteUser = (userId: string): Promise<void> => {
        const request = new DeleteUserRequest(userId);
        return this._httpClient.post('users/delete', request);
    }

    listAliases = (userId: string): Promise<AliasPointer[]> => {
        return this._httpClient.get<ListResponse<AliasPointer>>(`alias/list?userid=${userId}`)
            .then((response: AxiosResponse<ListResponse<AliasPointer>>) => response.data.values);
    }

    listCredentials = (userId: string): Promise<Credential[]> => {
        return this._httpClient.get<ListResponse<Credential>>(`credentials/list?userid=${userId}`)
            .then((response: AxiosResponse<ListResponse<Credential>>) => response.data.values);
    }

    verifyToken = (verifyToken: string): Promise<VerifiedUser | null> => {
        const request = new VerifyTokenRequest(verifyToken);
        return this._httpClient.post('signin/verify', request)
            .then((response: AxiosResponse<VerifiedUser>) => response.data)
            .catch(() => null);
    }

    getUsersCount = (): Promise<UsersCount> => {
        return this._httpClient.get('users/count').then((response: AxiosResponse<UsersCount>) => response.data);
    }
}