import React, { useState, useEffect } from "react";
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaVenusMars, FaGraduationCap, FaBook, 
  FaCalendarAlt, FaSpinner, FaEdit 
} from "react-icons/fa";
import { authAPI } from '@/services/authService';

export default function DonneesPersonnelles() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Fonction pour récupérer les données depuis le backend
  const fetchStudentData = async () => {
    try {
      setLoading(true);
      // Utiliser le service d'authentification pour récupérer le profil
      const profileData = await authAPI.getProfile('/utilisateurs/etudiants/me/');
      setStudentData(profileData);
      setFormData(profileData);
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      // Envoyer les données modifiées au backend
      const response = await authAPI.apiInstance().put('/utilisateurs/etudiants/me/', formData);
      setStudentData(response.data);
      setIsEditing(false);
      alert('Modifications enregistrées avec succès!');
    } catch (err) {
      setError(err.message);
      console.error('Erreur lors de la mise à jour:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData(studentData);
    setIsEditing(false);
  };

  if (loading) {
    return (
      <div className="bg-transparent backdrop-blur-2xl shadow-1xl px-10 py-12 w-full animate-fade-in flex justify-center items-center h-64">
        <div className="text-center">
          <FaSpinner className="animate-spin text-blue-700 text-4xl mx-auto mb-3" />
          <p className="text-blue-900">Chargement des données...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-transparent backdrop-blur-2xl shadow-1xl px-10 py-12 w-full animate-fade-in">
        <div className="text-center text-red-600 py-8">
          <p>Erreur: {error}</p>
          <button 
            onClick={fetchStudentData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent backdrop-blur-2xl shadow-1xl px-10 py-12 w-full animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h2 className="flex items-center gap-3 text-3xl font-extrabold text-blue-900 drop-shadow">
          <FaUser className="text-blue-700 text-3xl" /> Mes données personnelles
        </h2>
        
        {!isEditing ? (
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <FaEdit /> Modifier
          </button>
        ) : (
          <div className="flex gap-2">
            <button 
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Enregistrer
            </button>
            <button 
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Annuler
            </button>
          </div>
        )}
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Photo de profil */}
        <div className="flex flex-col items-center mb-6 md:mb-0">
          <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-blue-100">
            {studentData.photo ? (
              <img 
                src={studentData.photo} 
                alt="Photo de profil" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-blue-100">
                <FaUser className="text-blue-400 text-4xl" />
              </div>
            )}
          </div>
          {isEditing && (
            <button className="mt-3 text-sm text-blue-600 hover:text-blue-800">
              Modifier la photo
            </button>
          )}
        </div>
        
        {/* Informations personnelles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center flex-1">
          <div className="flex items-center gap-2">
            <FaUser className="text-black" />
            <div className="w-full">
              <div className="text-gray-500 text-sm">Nom</div>
              {isEditing ? (
                <input
                  type="text"
                  name="nom"
                  value={formData.nom || ""}
                  onChange={handleInputChange}
                  className="font-bold text-lg text-black w-full px-2 py-1 border rounded"
                />
              ) : (
                <div className="font-bold text-lg text-black">{studentData.nom || "Non spécifié"}</div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FaUser className="text-black" />
            <div className="w-full">
              <div className="text-gray-500 text-sm">Prénom</div>
              {isEditing ? (
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom || ""}
                  onChange={handleInputChange}
                  className="font-bold text-lg text-black w-full px-2 py-1 border rounded"
                />
              ) : (
                <div className="font-bold text-lg text-black">{studentData.prenom || "Non spécifié"}</div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-black" />
            <div className="w-full">
              <div className="text-gray-500 text-sm">Date de naissance</div>
              {isEditing ? (
                <input
                  type="date"
                  name="date_naissance"
                  value={formData.date_naissance || ""}
                  onChange={handleInputChange}
                  className="font-bold text-lg text-black w-full px-2 py-1 border rounded"
                />
              ) : (
                <div className="font-bold text-lg text-black">{studentData.date_naissance || "Non spécifié"}</div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-black" />
            <div className="w-full">
              <div className="text-gray-500 text-sm">Email</div>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleInputChange}
                  className="font-bold text-lg text-black w-full px-2 py-1 border rounded"
                />
              ) : (
                <div className="font-bold text-lg text-black">{studentData.email || "Non spécifié"}</div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FaPhone className="text-black" />
            <div className="w-full">
              <div className="text-gray-500 text-sm">Contact</div>
              {isEditing ? (
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone || ""}
                  onChange={handleInputChange}
                  className="font-bold text-lg text-black w-full px-2 py-1 border rounded"
                />
              ) : (
                <div className="font-bold text-lg text-black">{studentData.telephone || "Non spécifié"}</div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FaGraduationCap className="text-black" />
            <div className="w-full">
              <div className="text-gray-500 text-sm">Parcours</div>
              <div className="font-bold text-lg text-black">{studentData.parcours || "Non spécifié"}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FaBook className="text-black" />
            <div className="w-full">
              <div className="text-gray-500 text-sm">Filière</div>
              <div className="font-bold text-lg text-black">{studentData.filiere || "Non spécifié"}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FaGraduationCap className="text-black" />
            <div className="w-full">
              <div className="text-gray-500 text-sm">Année</div>
              <div className="font-bold text-lg text-black">{studentData.annee_etude || "Non spécifié"}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}