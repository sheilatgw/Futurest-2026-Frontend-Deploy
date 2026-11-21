const REGISTER_TOKEN_KEY = "google_register_token";

export const authStorage = {
  set(token: string, user: any) {
    const userData = { token, user };
    localStorage.setItem("user", JSON.stringify(userData));
  },

  clear() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    localStorage.removeItem("user");
    localStorage.removeItem(REGISTER_TOKEN_KEY);
  },

  setTempRegisterToken(token: string) {
    localStorage.setItem(REGISTER_TOKEN_KEY, token);
  },

  getTempRegisterToken() {
    return localStorage.getItem(REGISTER_TOKEN_KEY);
  },

  clearTempRegisterToken() {
    localStorage.removeItem(REGISTER_TOKEN_KEY);
  },
};
