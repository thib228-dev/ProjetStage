// src/services/EtudiantService.js
import api from "./api";
const API_URL = "http://127.0.0.1:8000/api"; // adapte selon ton backend

class EtudiantService {
  // Récupérer les notes d'une UE
  static async getNotesByUE(ueId) {
    try {
      const response = await api.get(`${API_URL}/notes/ues/${ueId}/notes/`);
      return response.data; // JSON contenant etudiants + evaluations + notes
    } catch (error) {
      console.error("Erreur lors de la récupération des notes :", error);
      throw error;
    }
  }
}

export default EtudiantService;
