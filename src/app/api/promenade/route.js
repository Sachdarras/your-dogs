import prisma from "../../lib/prisma";

// Récupérer toutes les promenades
export async function GET() {
  try {
    const promenades = await prisma.promenade.findMany();
    return new Response(JSON.stringify(promenades), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la récupération des promenades' }),
      { status: 500 }
    );
  }
}

// Créer une nouvelle promenade
export async function POST(req) {
  try {
    const body = await req.json();
    
    // Vérifier que les informations nécessaires sont présentes
    if (!body.name || !body.description) {
      return new Response(
        JSON.stringify({ error: 'Les champs "name" et "description" sont obligatoires' }),
        { status: 400 }
      );
    }

    const { name, description, adresse, codePostale, latitude, longitude, image } = body;

    // Création de la promenade
    const newPromenade = await prisma.promenade.create({
      data: {
        name,
        description,
        adresse,
        codePostale,
        latitude,
        longitude,
        image,
      },
    });

    return new Response(JSON.stringify(newPromenade), { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de la promenade:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la création de la promenade' }),
      { status: 500 }
    );
  }
}

// Mettre à jour une promenade existante
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, name, description, adresse, codePostale, latitude, longitude, image } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'L\'ID de la promenade est nécessaire pour la mise à jour' }),
        { status: 400 }
      );
    }

    const updatedPromenade = await prisma.promenade.update({
      where: { id },
      data: {
        name,
        description,
        adresse,
        codePostale,
        latitude,
        longitude,
        image,
      },
    });

    return new Response(JSON.stringify(updatedPromenade), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la promenade:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la mise à jour de la promenade' }),
      { status: 500 }
    );
  }
}

// Supprimer une promenade
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'L\'ID de la promenade est nécessaire pour la suppression' }),
        { status: 400 }
      );
    }

    await prisma.promenade.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ message: 'Promenade supprimée' }), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la suppression de la promenade:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la suppression de la promenade' }),
      { status: 500 }
    );
  }
}
