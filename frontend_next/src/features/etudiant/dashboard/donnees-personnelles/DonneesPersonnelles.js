"use client";
import React, { useState, useEffect } from "react";
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaVenusMars, FaGraduationCap, FaBook, 
  FaCalendarAlt, FaSpinner, FaEdit 
} from "react-icons/fa";
import { authAPI } from "@/services/authService";

export default function DonneesPersonnelles() {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      const response = await authAPI.apiInstance().get('/utilisateurs/etudiants/me/');
      console.log('Données reçues:', response.data);
      setStudentData(response.data);
      setFormData(response.data);
    } catch (err) {
      console.error('Erreur complète:', err.response?.data || err.message);
      setError("Erreur lors du chargement des données");
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
      // Envoyer seulement les champs modifiables
      const editableData = {
        email: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        telephone: formData.telephone,
        autre_prenom: formData.autre_prenom
      };
      
      const response = await authAPI.apiInstance().put('/utilisateurs/etudiants/me/', editableData);
      setStudentData(response.data);
      setIsEditing(false);
      alert('Modifications enregistrées avec succès!');
    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err.response?.data || err.message);
      setError("Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  // ... (loading et error states restent identiques)

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
              onClick={() => {
                setFormData(studentData);
                setIsEditing(false);
              }}
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
            {studentData?.photo ? (
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
        </div>
        
        {/* Informations personnelles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center flex-1">
          {/* Champs modifiables */}
          <div className="flex items-center gap-2">
            <FaUser className="text-black" />
            <div className="w-full">
              <div className="text-gray-500 text-sm">Nom</div>
              {isEditing ? (
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name || ""}
                  onChange={handleInputChange}
                  className="font-bold text-lg text-black w-full px-2 py-1 border rounded"
                />
              ) : (
                <div className="font-bold text-lg text-black">
                  {studentData?.last_name || "Non spécifié"}
                </div>
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
                  name="first_name"
                  value={formData.first_name || ""}
                  onChange={handleInputChange}
                  className="font-bold text-lg text-black w-full px-2 py-1 border rounded"
                />
              ) : (
                <div className="font-bold text-lg text-black">
                  {studentData?.first_name || "Non spécifié"}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaUser className="text-black" />
            <div className="w-full">
              <div className="text-gray-500 text-sm">Autre prénom</div>
              {isEditing ? (
                <input
                  type="text"
                  name="autre_prenom"
                  value={formData.autre_prenom || ""}
                  onChange={handleInputChange}
                  className="font-bold text-lg text-black w-full px-2 py-1 border rounded"
                />
              ) : (
                <div className="font-bold text-lg text-black">
                  {studentData?.autre_prenom || "Non spécifié"}
                </div>
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
                <div className="font-bold text-lg text-black">
                  {studentData?.email || "Non spécifié"}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FaPhone className="text-black" />
            <div className="w-full">
              <div className="text-gray-500 text-sm">Téléphone</div>
              {isEditing ? (
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone || ""}
                  onChange={handleInputChange}
                  className="font-bold text-lg text-black w-full px-2 py-1 border rounded"
                />
              ) : (
                <div className="font-bold text-lg text-black">
                  {studentData?.telephone || "Non spécifié"}
                </div>
              )}
            </div>
          </div>
          
          {/* Champs en lecture seule */}
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-black" />
            <div className="w-full">
              <div className="text-gray-500 text-sm">Date de naissance</div>
              <div className="font-bold text-lg text-black">
                {studentData?.date_naiss 
                  ? new Date(studentData.date_naiss).toLocaleDateString() 
                  : "Non spécifié"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-black" />
            <div className="w-full">
              <div className="text-gray-500 text-sm">Lieu de naissance</div>
              <div className="font-bold text-lg text-black">
                {studentData?.lieu_naiss || "Non spécifié"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaGraduationCap className="text-black" />
            <div className="w-full">
              <div className="text-gray-500 text-sm">Parcours</div>
              <div className="font-bold text-lg text-black">
                {studentData?.parcours_info || "Non spécifié"}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FaBook className="text-black" />
            <div className="w-full">
              <div className="text-gray-500 text-sm">Filière</div>
              <div className="font-bold text-lg text-black">
                {studentData?.filiere_info || "Non spécifié"}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <FaGraduationCap className="text-black" />
            <div className="w-full">
              <div className="text-gray-500 text-sm">Année</div>
              <div className="font-bold text-lg text-black">
                {studentData?.annee_etude_info || "Non spécifié"}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FaUser className="text-black" />
            <div className="w-full">
              <div className="text-gray-500 text-sm">Numéro de carte</div>
              <div className="font-bold text-lg text-black">
                {studentData?.num_carte || "Non attribué"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}