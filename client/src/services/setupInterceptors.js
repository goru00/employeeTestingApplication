import AxiosInstance from "../api/api";
import TokenService from './token.service';
import { refreshToken } from "../actions/auth";

const setup = (store) => {
    AxiosInstance.interceptors.request.use(
        (config) => {
            const token = TokenService.getLocalAccessToken();
            if (token) {
                config.headers["x-access-token"] = token;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );
    const { dispatch } = store;
    AxiosInstance.interceptors.response.use(
        (res) => {
            return res;
        },
        async (err) => {
            const originalConfig = err.config;
            if (originalConfig.url !== '/auth/signin' && err.response) {
                if (err.response.status === 401 && !originalConfig._retry) {
                    originalConfig._retry = true;
                    try {
                        const rs = await AxiosInstance.get('/auth/refreshToken', {
                            refreshToken: TokenService.getLocalRefreshToken()
                        });
                        const { token } = rs.data;
                        dispatch(refreshToken(token));
                        TokenService.updateLocalAccessToken(token);
                        return AxiosInstance(originalConfig);
                    } catch(err) {
                        return Promise.reject(err);
                    }
                }
            }
            return Promise.reject(err);
        }
    );
};

export default setup;