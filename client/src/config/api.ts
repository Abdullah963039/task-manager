import axios from "axios";

const BASE_URL: string = import.meta.env.VITE_BASE_URL!;

export const baseUrl = axios.create({ baseURL: BASE_URL });
