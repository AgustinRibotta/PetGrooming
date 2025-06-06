import axiosClient from "./axiosClients";
import { type OwnerDTO } from "../types/Owner";

export const getAllOwners = () => axiosClient.get<OwnerDTO[]>("/owner");
export const getOwnerById = (id: number) => axiosClient.get(`/owner/${id}`);
export const createOwner = (data: OwnerDTO) => axiosClient.post("/owner", data);
export const updateOwner = (id: number, data: OwnerDTO) => axiosClient.put(`/owner/${id}`, data);
export const deleteOwner = (id: number) => axiosClient.delete(`/owner/${id}`);

