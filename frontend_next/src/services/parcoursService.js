import api from "./api";
const ParcoursService = {
  getParcours: async () => {
    const response = await api.get("/inscription/parcours/");
    return response.data;
  },
};

export default ParcoursService;
