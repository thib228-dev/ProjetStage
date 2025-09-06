// src/services/authService.js - VERSION CORRIGÉE
import api from "./api";

const TokenStorage = {
  getAccess: () => localStorage.getItem("access"),
  getRefresh: () => localStorage.getItem("refresh"),
  setTokens: ({ access, refresh }) => {
    if (access) localStorage.setItem("access", access);
    if (refresh) localStorage.setItem("refresh", refresh);
  },
  clear: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user_role");
  },
};

let isRefreshing = false;
let refreshQueue = [];

function processQueue(error, token = null) {
  refreshQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  refreshQueue = [];
}

api.interceptors.request.use((config) => {
  const token = TokenStorage.getAccess();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
}, (error) => Promise.reject(error));

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = TokenStorage.getRefresh();
      if (!refreshToken) {
        TokenStorage.clear();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      isRefreshing = true;
      try {
        const res = await api.post("/auth/token/refresh/", { refresh: refreshToken });
        const newAccess = res.data.access;
        TokenStorage.setTokens({ access: newAccess });
        processQueue(null, newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        TokenStorage.clear();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  login: async (username, password) => {
    const res = await api.post("/auth/login/", { username, password });
    const { access, refresh, user } = res.data;
    TokenStorage.setTokens({ access, refresh });
    localStorage.setItem("user_role", user.role);
    return { access, refresh, user };
  },

  register: async (userPayload) => {
    const res = await api.post("/auth/register/", userPayload);
    return res.data;
  },

  logout: async () => {
    const refresh = TokenStorage.getRefresh();
    TokenStorage.clear();
    if (refresh) {
      try {
        await api.post("/auth/logout/", { refresh });
      } catch (e) {
        // ignore
      }
    }
  },

  getProfile: async () => {
    const res = await api.get("/auth/profile/");
    return res.data;
  },

  apiInstance: () => api,
};

export default authAPI;