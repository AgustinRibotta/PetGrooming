export type PetDTO = {
  id?: number;
  ownerId?: number;
  name: string;
  race: string;
  color: string;
  allergic?: boolean;
  specialAttention: boolean;
  observations: string;
  shidtDateTime: string; 
};

