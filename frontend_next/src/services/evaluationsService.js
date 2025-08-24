import api from "./api"; 

const EvaluationService = {
  getEvaluationsByUE: async (ueId) => {
    console.log("Fetching evaluations for UE ID:", ueId);
  if (!ueId) {
    throw new Error("ueId est null ou undefined !");
  }
    const response = await api.get(`/notes/ues/${ueId}/evaluations/`);
    console.log("evaluations:", response.data);
    return response.data;
  },
};

export default EvaluationService;
