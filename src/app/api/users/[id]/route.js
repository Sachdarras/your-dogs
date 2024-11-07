// pages/api/users/[id].js

import prisma from '../../../lib/prisma';

export async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: {
          categoriePro: true,
          role: true,
        },
      });
      if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur' });
    }
  } else if (method === 'PUT') {
    const { nom, prenom, email, password, roleId, nomSociete, categorieProId, descriptionPro, descriptionChien, image } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
          nom,
          prenom,
          email,
          password,
          roleId,
          nomSociete,
          categorieProId,
          descriptionPro,
          descriptionChien,
          image,
        },
      });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur' });
    }
  } else if (method === 'DELETE') {
    try {
      const deletedUser = await prisma.user.delete({
        where: { id: parseInt(id) },
      });
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
