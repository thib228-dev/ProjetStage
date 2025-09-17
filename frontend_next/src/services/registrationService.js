// services/registrationService.js
import { authAPI } from './authService';
import inscriptionService from './inscriptionService';
import api from './api';

class RegistrationService {
  /**
   * Convertit une chaîne base64 en objet File
   */
  base64ToFile(base64String, filename, mimeType) {
    if (!base64String) return null;
    
    try {
      const byteCharacters = atob(base64String.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      return new File([byteArray], filename, { type: mimeType });
    } catch (error) {
      console.error('Erreur conversion base64 vers File:', error);
      return null;
    }
  }

  /**
   * Valide les données avant création
   */
  validateRegistrationData(data) {
    const errors = [];

    // Validation étape 1
    if (!data.step1?.username) errors.push("Nom d'utilisateur manquant");
    if (!data.step1?.email) errors.push("Email manquant");
    if (!data.step1?.password) errors.push("Mot de passe manquant");

    // Validation étape 2
    if (!data.step2?.nom) errors.push("Nom manquant");
    if (!data.step2?.prenom) errors.push("Prénom manquant");
    if (!data.step2?.date_naissance) errors.push("Date de naissance manquante");
    if (!data.step2?.lieu_naiss) errors.push("Lieu de naissance manquant");

    // Validation étape 3
    if (!data.step3?.parcours_id) errors.push("Parcours non sélectionné");
    if (!data.step3?.filiere_id) errors.push("Filière non sélectionnée");
    if (!data.step3?.annee_etude_id) errors.push("Année d'étude non sélectionnée");

    return errors;
  }

  /**
   * Création atomique complète de l'inscription
   */
  async createCompleteRegistration(allData, selectedUEIds, progressCallback = null) {
    try {
      // Étape 0 : Validation des données
      if (progressCallback) progressCallback(0, "Validation des données...");
      
      const validationErrors = this.validateRegistrationData(allData);
      if (validationErrors.length > 0) {
        throw new Error(`Données invalides: ${validationErrors.join(', ')}`);
      }

      // Étape 1 : Préparation des données utilisateur/étudiant
      if (progressCallback) progressCallback(20, "Préparation des données...");
      
      const formData = new FormData();
      
      // Données utilisateur (étape 1)
      formData.append('username', allData.step1.username);
      formData.append('password', allData.step1.password);
      formData.append('email', allData.step1.email);
      formData.append('first_name', allData.step2.prenom);
      formData.append('last_name', allData.step2.nom);
      
      if (allData.step2.contact) {
        formData.append('telephone', allData.step2.contact);
      }
      
      // Données étudiant (étape 2)
      formData.append('date_naiss', allData.step2.date_naissance);
      formData.append('lieu_naiss', allData.step2.lieu_naiss);
      
      if (allData.step2.autre_prenom) {
        formData.append('autre_prenom', allData.step2.autre_prenom);
      }
      if (allData.step2.num_carte) {
        formData.append('num_carte', allData.step2.num_carte);
      }
      
      // Gérer la photo si elle existe
      if (allData.step2.photoBase64 && allData.step2.photoNom) {
        const photoFile = this.base64ToFile(
          allData.step2.photoBase64, 
          allData.step2.photoNom, 
          allData.step2.photoNom.toLowerCase().endsWith('.png') ? 'image/png' : 'image/jpeg'
        );
        if (photoFile) {
          formData.append('photo', photoFile);
        }
      }

      // Étape 2 : Création utilisateur + étudiant
      if (progressCallback) progressCallback(40, "Création du compte utilisateur...");
      
      const userResponse = await authAPI.apiInstance().post('/auth/register-etudiant/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { user_id, etudiant_id } = userResponse.data;

      if (!etudiant_id) {
        throw new Error("Erreur lors de la création de l'étudiant");
      }

      // Étape 3 : Récupération année académique active
      if (progressCallback) progressCallback(60, "Récupération de l'année académique...");
      
      const anneeResponse = await api.get("/inscription/annee-academique/", {
        params: { ordering: "-libelle" },
      });
      
      const anneeAcademiqueId = anneeResponse.data?.results?.[0]?.id || anneeResponse.data?.[0]?.id;

      if (!anneeAcademiqueId) {
        throw new Error("Aucune année académique disponible");
      }

      // Étape 4 : Création de l'inscription pédagogique
      if (progressCallback) progressCallback(80, "Finalisation de l'inscription...");
      
      const inscriptionData = {
        etudiant: etudiant_id,
        parcours: allData.step3.parcours_id,
        filiere: allData.step3.filiere_id,
        annee_etude: allData.step3.annee_etude_id,
        anneeAcademique: anneeAcademiqueId,
        ues: selectedUEIds,
        numero: `INS-${Date.now()}-${etudiant_id}`, // Numéro unique
      };

      const inscriptionResponse = await inscriptionService.createInscription(inscriptionData);

      if (progressCallback) progressCallback(100, "Inscription terminée avec succès !");

      return {
        success: true,
        user: userResponse.data,
        inscription: inscriptionResponse,
        message: "Inscription créée avec succès"
      };

    } catch (error) {
      console.error('❌ Erreur création inscription:', error);

      // Gestion spécifique des erreurs
      let errorMessage = "Erreur lors de l'inscription";
      
      if (error.response?.status === 400) {
        const errors = error.response.data;
        if (errors.username) {
          errorMessage = "Ce nom d'utilisateur existe déjà";
        } else if (errors.email) {
          errorMessage = "Cette adresse email est déjà utilisée";
        } else if (typeof errors === 'object') {
          // Extraire le premier message d'erreur
          const firstError = Object.values(errors)[0];
          errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
        }
      } else if (error.response?.status === 500) {
        errorMessage = "Erreur serveur. Veuillez réessayer plus tard.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  }

  /**
   * Nettoie toutes les données d'inscription du localStorage
   */
  clearRegistrationData() {
    const keysToRemove = [
      'inscription_step1',
      'inscription_step2', 
      'inscription_step3'
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
  }

  /**
   * Récupère toutes les données d'inscription depuis localStorage
   */
  getAllRegistrationData() {
    try {
      const step1Data = localStorage.getItem("inscription_step1");
      const step2Data = localStorage.getItem("inscription_step2");
      const step3Data = localStorage.getItem("inscription_step3");
      
      return {
        step1: step1Data ? JSON.parse(step1Data) : null,
        step2: step2Data ? JSON.parse(step2Data) : null,
        step3: step3Data ? JSON.parse(step3Data) : null,
        isComplete: !!(step1Data && step2Data && step3Data)
      };
    } catch (error) {
      console.error('Erreur récupération données inscription:', error);
      return { step1: null, step2: null, step3: null, isComplete: false };
    }
  }
}

export default new RegistrationService();