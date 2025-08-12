export async function loginAndGetNotes(email, mot_de_passe) {
  const res = await fetch("http://localhost:8000/api/etudiant", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, mot_de_passe }),
  });

  if (!res.ok) {
    throw new Error(`Erreur HTTP ${res.status}`);
  }

  // On suppose que le backend renvoie un objet comme :
  // { success: true, etudiantId: 1, notes: [...] }
  const data = await res.json();
  return data;
}
