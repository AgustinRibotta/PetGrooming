import axiosClient from "./axiosClients";
import { type PetDTO } from "../types/Pet";

export const getAllPets = () => axiosClient.get<PetDTO[]>("/pets");
export const getPetById = (id: number) => axiosClient.get(`/pets/${id}`);
export const createPet = (data: PetDTO) => axiosClient.post("/pets", data);
export const updatePet = (id: number, data: PetDTO) => axiosClient.put(`/pets/${id}`, data);
export const deletePet = (id: number) => axiosClient.delete(`/pets/${id}`);

