import axios, { AxiosInstance, AxiosStatic, AxiosResponse, AxiosError } from 'axios';

export abstract class HttpClient {
    protected readonly http: AxiosInstance;

    constructor(baseURL: string) {
        this.http = axios.create({ baseURL, });
        this.responseInterceptor();
    }

    private responseInterceptor(): void {
        this.http.interceptors.response.use(
            this.handleResponse,
            this.handleError
        )
    }

    private handleResponse({ data }: AxiosResponse) {
        return data;
    }

    private handleError(error: AxiosError) {
        return Promise.reject(error);
    }
}