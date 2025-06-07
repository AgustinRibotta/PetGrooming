// petApi.ts
import axiosClient from "./axiosClients";
import type { PetDTO } from "../types/Pet";

export const getAllPets = () => axiosClient.get<PetDTO[]>("/pets");
export const getPetById = (id: number) => axiosClient.get<PetDTO>(`/pets/${id}`);
export const createPet = (data: Omit<PetDTO, "id">) => axiosClient.post<PetDTO>("/pets", data);
export const updatePet = (id: number, data: PetDTO) => axiosClient.put<PetDTO>(`/pets/${id}`, data);
export const deletePet = (id: number) => axiosClient.delete(`/pets/${id}`);