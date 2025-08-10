// frontend/services/authService.js
import api from "./api"; // Assurez-vous que le chemin est correct

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
  },
};

/* ---------------------------
  Interceptor : ajoute Authorization automatiquement
  et gère le refresh quand on reçoit 401.
---------------------------- */
let isRefreshing = false;
let refreshQueue = []; // queue des requêtes en attendant le refresh

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
    // Si 401 et que ce n'est pas la requête refresh elle-même
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = TokenStorage.getRefresh();
      if (!refreshToken) {
        TokenStorage.clear();
        return Promise.reject(error);
      }

      if (isRefreshing) {
        // attendre la fin d'un refresh en cours
        return new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        }).catch(err => Promise.reject(err));
      }

      isRefreshing = true;
      try {
        const res = await api.post("token/refresh/", { refresh: refreshToken });
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

/* ---------------------------
  Fonctions exportées
---------------------------- */

export const authAPI = {
  /**
   * login(username, password)
   * attend { access, refresh } en retour
   */
  login: async (username, password) => {
    const res = await api.post("token/", { username, password });
    const { access, refresh } = res.data;
    TokenStorage.setTokens({ access, refresh });
    return res.data;
  },

  /**
   * register(userPayload)
   * envoie toutes les données d'inscription (utilisateur + profil) à l'endpoint /auth/register/
   * ex: { username, email, password, role, num_carte, date_naiss, ... }
   */
  register: async (userPayload) => {
    const res = await api.post("auth/register/", userPayload);
    return res.data;
  },

  /**
   * refresh()
   * rafraîchit manuellement le token si besoin
   */
  refresh: async () => {
    const refresh = TokenStorage.getRefresh();
    if (!refresh) throw new Error("Pas de refresh token");
    const res = await api.post("token/refresh/", { refresh });
    const { access } = res.data;
    TokenStorage.setTokens({ access });
    return res.data;
  },

  /**
   * logout()
   * - supprime les tokens côté client
   * - (optionnel) appeler un endpoint pour invalider le refresh côté backend si tu l'as implémenté
   */
  logout: async (callBackendInvalidate = false) => {
    const refresh = TokenStorage.getRefresh();
    TokenStorage.clear();
    if (callBackendInvalidate && refresh) {
      try {
        await api.post("auth/logout/", { refresh });
      } catch (e) {
        // ignore
      }
    }
  },

  /**
   * getProfile()
   * récupère /utilisateurs/me/ (ou l'endpoint profil que tu as)
   */
  getProfile: async () => {
    const res = await api.get("utilisateurs/me/");
    return res.data;
  },

  /**
   * utilitaire pour récupérer l'api instance (utile si tu veux faire d'autres appels)
   */
  apiInstance: () => api,
};

/* Optionnel : auto-refresh périodique (ex: avant expiration)
   Tu peux mettre un setInterval pour appeler refresh() si tu veux.
*/
export default authAPI;
