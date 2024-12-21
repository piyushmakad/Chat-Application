import Env from "./env";

//all routes for Backend .
export const BASE_URL = Env.BACKEND_URL;
export const API_URL = BASE_URL + "/api";
export const LOGIN_URL = API_URL +"/auth/login";
export const CHAT_GROUP_URL = API_URL + "/chat-group";
export const CHAT_GROUP_USER_URL = API_URL + "/chat-group-users";
export const CHATS_URL = API_URL + "/chats";