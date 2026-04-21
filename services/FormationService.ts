import { formationsData } from "@/data/portfolio";
import { Formation } from "@/types/portfolio";

export const getAllFormations = async (): Promise<Formation[]> => formationsData;

export const getFormationById = async (id: number): Promise<Formation | undefined> => {
  const formations = await getAllFormations();
  return formations.find((formation) => formation.id === id);
};
