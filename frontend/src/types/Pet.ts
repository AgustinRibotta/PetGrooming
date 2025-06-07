export interface PetDTO {
    id?: number;
    name: string;
    race: string;
    color: string;
    allergic: boolean;
    specialAttention: boolean;
    observations: string;
    ownerId: number;
}