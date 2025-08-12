export async function login(email, password) {
  const res = await fetch('http://127.0.0.1:8000/api/etudiant', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      mot_de_passe: password
    })
  });

  if (!res.ok) {
    throw new Error(`Erreur HTTP ${res.status}`);
  }

  return res.json(); // Pas besoin de type ici
}
