import { type AxiosAdapter } from 'axios';
declare module 'axios' {
    interface AxiosRequestConfig {
        /**
         * Whether or not to use cache, default to `true`
         */
        useAdra?: boolean;
    }
}
declare const adapterEnhancer: (adapter?: AxiosAdapter) => AxiosAdapter;
declare const _default: AxiosAdapter;
export default _default;
export { adapterEnhancer };
