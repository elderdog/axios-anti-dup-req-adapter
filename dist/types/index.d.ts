import { type AxiosRequestConfig } from 'axios';
declare module 'axios' {
    interface AxiosRequestConfig {
        /**
         * Whether or not to use cache, default to `true`
         */
        useAdra?: boolean;
    }
}
declare const adapter: (config: AxiosRequestConfig) => Promise<any>;
export default adapter;
