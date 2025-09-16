import api from "@/services/api";

const etudiantService = {
  getAllEtudiants: async (filters = {}) => {
    try {
      const response = await api.get("/utilisateurs/etudiants/", { params: filters });
      return response.data;
    } catch (error) {
      console.error("Erreur getAllEtudiants :", error);
      throw error;
    }
  },
  deleteEtudiant: async (id) => {
  try {
    await api.delete(`/utilisateurs/etudiants/${id}/`);
  } catch (error) {
    console.error("Erreur deleteEtudiant :", error);
    throw error;
  }
},

updateEtudiant: async (id, data) => {
  try {
    const response = await api.put(`/utilisateurs/etudiants/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error("Erreur updateEtudiant :", error);
    throw error;
  }
},


  getParcours: async () => {
    try {
      const response = await api.get("/inscription/parcours/");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erreur getParcours :", error);
      throw error;
    }
  },

  getFilieresByParcours: async (parcoursId) => {
    try {
      const response = await api.get("/inscription/filiere/", { params: { parcours: parcoursId } });
      return response.data;
    } catch (error) {
      console.error("Erreur getFilieresByParcours :", error);
      throw error;
    }
  },

  getAnneesByParcours: async (parcoursId) => {
    try {
      const response = await api.get("/inscription/annee-etude/", { params: { parcours: parcoursId } });
      return response.data;
    } catch (error) {
      console.error("Erreur getAnneesByParcours :", error);
      throw error;
    }
  },
};



export default etudiantService;
