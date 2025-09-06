import api from "./api";

const UEService = {
  getEtudiantsByUE: async (ueId) => {
    console.log("Fetching students for UE ID:", ueId);
    if (!ueId) {
      throw new Error("ueId est null ou undefined !");
    }
    const response = await api.get(`/notes/ues/${ueId}/etudiantsInscrits/`);
    console.log("Données reçues du backend:", response.data);
    return response.data;
  },
};

export default UEService;
