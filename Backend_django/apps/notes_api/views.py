from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.db import connection

@api_view(['POST'])
@permission_classes([AllowAny])
def etudiant_login(request):
    """
    Corps JSON attendu :
    {
        "email": "...",
        "mot_de_passe": "..."
    }
    """
    email = request.data.get('email')
    mot_de_passe = request.data.get('mot_de_passe')

    if not email or not mot_de_passe:
        return Response({"success": False, "message": "Email ou mot de passe manquant"}, status=400)

    try:
        with connection.cursor() as cursor:
            # Authentification
            cursor.execute("""
                SELECT utilisateur.id, etudiant.id
                FROM utilisateur
                JOIN etudiant ON etudiant.utilisateur_id = utilisateur.id
                WHERE utilisateur.email = %s AND utilisateur.mot_de_passe = %s
            """, [email, mot_de_passe])
            user = cursor.fetchone()

            if not user:
                return Response({"success": False, "message": "Identifiants invalides"}, status=401)

            utilisateur_id, etudiant_id = user

            # Récupération des notes
            cursor.execute("""
                SELECT n.id, n.etudiant_id, n.ue_id, u.nom AS ue_nom,
                       n.valeur, n.session, n.semestre
                FROM notes n
                JOIN ue u ON n.ue_id = u.id
                WHERE n.etudiant_id = %s
            """, [etudiant_id])
            rows = cursor.fetchall()
            
        print("Notes récupérées en backend:", rows)
        notes = [{
            "id": row[0],
            "etudiantId": row[1],
            "ueId": row[2],
            "ueNom": row[3],
            "valeur": float(row[4]),
            "session": row[5],
            "semestre": row[6]
        } for row in rows]

        return Response({
            "success": True,
            "etudiantId": etudiant_id,
            "notes": notes
        }, status=200)

    except Exception as e:
        return Response({"success": False, "message": str(e)}, status=500)
