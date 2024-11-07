import prisma from "../../lib/prisma";

// Récupérer toutes les catégories professionnelles
export async function GET() {
  try {
    const categoriesPro = await prisma.categoriePro.findMany();  // Correction ici
    return new Response(JSON.stringify(categoriesPro), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la récupération des catégories professionnelles' }),
      { status: 500 }
    );
  }
}

// Créer une catégorie professionnelle
export async function POST(req) {
  try {
    const body = await req.json();

    // Vérifier si le champ 'nom' est présent
    if (!body || !body.nom) {
      return new Response(
        JSON.stringify({ error: 'Le champ nom est obligatoire pour la catégorie professionnelle.' }),
        { status: 400 }
      );
    }

    const { nom } = body;

    // Création de la catégorie professionnelle
    const newCategoryPro = await prisma.categoriePro.create({  // Correction ici
      data: { name: nom }, // Le champ doit correspondre à 'name' dans Prisma
    });

    return new Response(JSON.stringify(newCategoryPro), { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la création de la catégorie professionnelle' }),
      { status: 500 }
    );
  }
}
