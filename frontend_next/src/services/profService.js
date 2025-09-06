import api from "./api";

const ProfesseurService = {
  getMesUes: async () => {
    try {
      const response = await api.get(`/utilisateurs/professeurs/mes_ues/`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des UEs du professeur connecté", error);
      throw error;
    }
  },

  getAllProfesseurs: async () => {
    try {
      const response = await api.get(`/utilisateurs/professeurs/`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des professeurs", error);
      throw error;
    }
  }
}
export default ProfesseurService;