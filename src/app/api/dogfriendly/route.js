import prisma from "../../lib/prisma";

// Récupérer tous les lieux dog friendly
export async function GET() {
  try {
    const dogFriendlyPlaces = await prisma.dogFriendly.findMany({
      include: {
        categorie: true,  // Inclure la catégorie si nécessaire
        users: true,      // Inclure les utilisateurs associés si nécessaire
      },
    });
    return new Response(JSON.stringify(dogFriendlyPlaces), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la récupération des lieux dog friendly' }),
      { status: 500 }
    );
  }
}

// Créer un nouveau lieu dog friendly
export async function POST(req) {
  try {
    const body = await req.json();

    // Vérifier que les champs obligatoires sont présents
    const { name, adresse, codePostale, ville, categorieId, image } = body;

    if (!name || !adresse || !codePostale || !ville) {
      return new Response(
        JSON.stringify({ error: 'Les champs "name", "adresse", "codePostale" et "ville" sont obligatoires' }),
        { status: 400 }
      );
    }

    // Création du lieu dog friendly
    const newDogFriendlyPlace = await prisma.dogFriendly.create({
      data: {
        name,
        adresse,
        codePostale,
        ville,
        categorieId,
        image,
      },
    });

    return new Response(JSON.stringify(newDogFriendlyPlace), { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du lieu dog friendly:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la création du lieu dog friendly' }),
      { status: 500 }
    );
  }
}

// Mettre à jour un lieu dog friendly
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, name, adresse, codePostale, ville, categorieId, image } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'L\'ID du lieu dog friendly est nécessaire pour la mise à jour' }),
        { status: 400 }
      );
    }

    const updatedDogFriendlyPlace = await prisma.dogFriendly.update({
      where: { id },
      data: {
        name,
        adresse,
        codePostale,
        ville,
        categorieId,
        image,
      },
    });

    return new Response(JSON.stringify(updatedDogFriendlyPlace), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du lieu dog friendly:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la mise à jour du lieu dog friendly' }),
      { status: 500 }
    );
  }
}

// Supprimer un lieu dog friendly
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'L\'ID du lieu dog friendly est nécessaire pour la suppression' }),
        { status: 400 }
      );
    }

    await prisma.dogFriendly.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ message: 'Lieu dog friendly supprimé' }), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la suppression du lieu dog friendly:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la suppression du lieu dog friendly' }),
      { status: 500 }
    );
  }
}
