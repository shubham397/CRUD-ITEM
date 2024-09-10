import axios from "axios";
import { getToken } from "./authAPI";

const API_URL = "http://localhost:3000/api/items";

export interface Item {
  _id?: string;
  name: string;
  quantity: number;
  price: number;
}

const token = getToken();

export const getItems = async () => {
  const response = await axios.get<Item[]>(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getItemById = async (id: string) => {
  const response = await axios.get<Item>(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createItem = async (item: Item) => {
  const response = await axios.post<Item>(API_URL, item, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateItem = async (id: string, item: Item) => {
  const response = await axios.put<Item>(`${API_URL}/${id}`, item, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deleteItem = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
