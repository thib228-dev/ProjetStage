import api from "@/services/api"; 

const inscriptionService = {
  // Récupérer les UE filtrées
  getUEs: async (params) => {
    try {
      console.log("Envoi requête GET UE avec param s:", params);
      const response = await api.get("/notes/ues/filtrer", { params });
      console.log("Réponse UE reçue:", response.data);
      return response.data; 
    } catch (error) {
      console.error("Erreur dans getUEs:", error);
      throw error;
    }
  },

  // Créer une inscription
  createInscription: async (data) => {
    try {
      console.log("Envoi requête POST inscription:", data);
      const response = await api.post("inscriptions/inscription/", data);
      console.log("Réponse inscription reçue:", response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur dans createInscription:", error);
      throw error;
    }
  }
};

export default inscriptionService;
