import prisma from "../../lib/prisma";

// Récupérer tous les sports canins
export async function GET() {
  try {
    const sportsCanins = await prisma.sportCanin.findMany();
    return new Response(JSON.stringify(sportsCanins), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la récupération des sports canins' }),
      { status: 500 }
    );
  }
}

// Créer un nouveau sport canin
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

    const { name, description, image } = body;

    // Création du sport canin
    const newSportCanin = await prisma.sportCanin.create({
      data: {
        name,
        description,
        image,
      },
    });

    return new Response(JSON.stringify(newSportCanin), { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création du sport canin:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la création du sport canin' }),
      { status: 500 }
    );
  }
}

// Mettre à jour un sport canin existant
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, name, description, image } = body;

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'L\'ID du sport canin est nécessaire pour la mise à jour' }),
        { status: 400 }
      );
    }

    const updatedSportCanin = await prisma.sportCanin.update({
      where: { id },
      data: {
        name,
        description,
        image,
      },
    });

    return new Response(JSON.stringify(updatedSportCanin), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du sport canin:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la mise à jour du sport canin' }),
      { status: 500 }
    );
  }
}

// Supprimer un sport canin
export async function DELETE(req) {
  try {
    const { id } = await req.json();

    if (!id) {
      return new Response(
        JSON.stringify({ error: 'L\'ID du sport canin est nécessaire pour la suppression' }),
        { status: 400 }
      );
    }

    await prisma.sportCanin.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ message: 'Sport canin supprimé' }), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la suppression du sport canin:', error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la suppression du sport canin' }),
      { status: 500 }
    );
  }
}
