import Cookies from "universal-cookie";

const cookies = new Cookies();

export const getToken = (): string => cookies.get("petrolida2026-token");

export const setToken = (token: string) => {
  cookies.set("petrolida2026-token", token, { path: "/" });
};

export const removeToken = () =>
  cookies.remove("petrolida2026-token", { path: "/" });
