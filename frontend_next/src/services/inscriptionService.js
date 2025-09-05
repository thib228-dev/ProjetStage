import api from "./api";

const inscriptionService = {
  // Récupérer les UE filtrées
  getUEs: async (params) => {
    const response = await api.get("/ues/", { params });
    return response.data;
  },

  // Créer une inscription
  createInscription: async (data) => {
    const response = await api.post("/inscriptions/", data);
    return response.data;
  }
};

export default inscriptionService;