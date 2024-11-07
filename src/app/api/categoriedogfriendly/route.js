import prisma from "../../lib/prisma";

// Récupérer toutes les catégories de lieux dog friendly
export async function GET() {
  try {
    const categoriesDogFriendly = await prisma.categorieDogFriendly.findMany();
    return new Response(JSON.stringify(categoriesDogFriendly), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la récupération des catégories de lieux dog friendly' }),
      { status: 500 }
    );
  }
}

// Créer une nouvelle catégorie de lieu dog friendly
export async function POST(req) {
  try {
    const body = await req.json();

    // Vérifier que le nom est présent
    if (!body.name) {
      return new Response(
        JSON.stringify({ error: 'Le champ "name" est obligatoire' }),
        { status: 400 }
      );
    }

    const { name } = body;

    // Création de la catégorie
    const newCategorieDogFriendly = await prisma.categorieDogFriendly.create({
      data: {
        name,
      },
    });

    return new Response(JSON.stringify(newCategorieDogFriendly), { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de la catégorie de lieu dog friendly:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la création de la catégorie de lieu dog friendly' }),
      { status: 500 }
    );
  }
}

// Mettre à jour une catégorie de lieu dog friendly
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, name } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'L\'ID de la catégorie est nécessaire pour la mise à jour' }),
        { status: 400 }
      );
    }

    const updatedCategorie = await prisma.categorieDogFriendly.update({
      where: { id },
      data: {
        name,
      },
    });

    return new Response(JSON.stringify(updatedCategorie), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la catégorie de lieu dog friendly:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la mise à jour de la catégorie de lieu dog friendly' }),
      { status: 500 }
    );
  }
}

// Supprimer une catégorie de lieu dog friendly
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'L\'ID de la catégorie est nécessaire pour la suppression' }),
        { status: 400 }
      );
    }

    await prisma.categorieDogFriendly.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ message: 'Catégorie de lieu dog friendly supprimée' }), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la suppression de la catégorie de lieu dog friendly:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la suppression de la catégorie de lieu dog friendly' }),
      { status: 500 }
    );
  }
}
