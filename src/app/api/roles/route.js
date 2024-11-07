import prisma from "../../lib/prisma";

// Récupérer tous les rôles
export async function GET() {
  try {
    const roles = await prisma.role.findMany();
    return new Response(JSON.stringify(roles), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la récupération des rôles' }),
      { status: 500 }
    );
  }
}

// Créer un rôle
export async function POST(req) {
  try {
    // Vérifier si le corps de la requête est vide ou non valide
    const body = await req.json();

    if (!body || !body.nom) {
      return new Response(
        JSON.stringify({ error: 'Le champ nom est obligatoire pour le rôle.' }),
        { status: 400 }
      );
    }

    const { nom } = body;

    const newRole = await prisma.role.create({
      data: { name: nom }, // Note : ici le champ de l'objet doit être 'name' et non 'nom'
    });

    return new Response(JSON.stringify(newRole), { status: 201 });
  } catch (error) {
    console.error('Error creating role:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la création du rôle' }),
      { status: 500 }
    );
  }
}
