import axiosClient from "./axiosClients";
import { type OwnerDTO } from "../types/Owner";

export const getAllOwners = () => axiosClient.get<OwnerDTO[]>("/owners");
export const getOwnerById = (id: number) => axiosClient.get(`/owners/${id}`);
export const createOwner = (data: OwnerDTO) => axiosClient.post("/owners", data);
export const updateOwner = (id: number, data: OwnerDTO) => axiosClient.put(`/owners/${id}`, data);
export const deleteOwner = (id: number) => axiosClient.delete(`/owners/${id}`);

