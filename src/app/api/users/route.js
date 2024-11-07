import prisma  from "../../lib/prisma";

// Créer un utilisateur
export async function POST(req) {
  try {
    const body = await req.json();

    // Vérifier si le corps de la requête est null ou vide
    if (!body) {
      return new Response(
        JSON.stringify({ error: 'Le corps de la requête est vide ou mal formé.' }),
        { status: 400 }
      );
    }

    const { 
      nom, 
      prenom, 
      email, 
      password, 
      roleId, 
      nomSociete, 
      categorieProId, 
      descriptionPro, 
      descriptionChien, 
      image 
    } = body;

    // Validation des champs obligatoires
    if (!nom || !prenom || !email || !password || !roleId || !categorieProId) {
      return new Response(
        JSON.stringify({ error: 'Les champs nom, prenom, email, password, roleId et categorieProId sont obligatoires.' }),
        { status: 400 }
      );
    }

    // Vérification de l'email unique
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: 'Un utilisateur avec cet email existe déjà.' }),
        { status: 400 }
      );
    }

    // Création de l'utilisateur dans la base de données
    const newUser = await prisma.user.create({
      data: {
        nom,
        prenom,
        email,
        password, // Pensez à hasher le mot de passe dans un cas réel
        roleId, // Lien avec la table des rôles
        nomSociete,        // Peut être null
        categorieProId,    // Lien avec la table des catégories professionnelles
        descriptionPro,    // Peut être null
        descriptionChien,  // Peut être null
        image,             // Peut être null
      },
    });

    // Retourner la réponse avec l'utilisateur créé
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la création de l\'utilisateur' }),
      { status: 500 }
    );
  }
}

// Récupérer tous les utilisateurs
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: 'Erreur lors de la récupération des utilisateurs' }),
      { status: 500 }
    );
  }
}
