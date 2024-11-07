/*
  Warnings:

  - You are about to alter the column `codePostale` on the `dogfriendly` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `codePostale` on the `promenade` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - Made the column `roleId` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roleId_fkey`;

-- AlterTable
ALTER TABLE `dogfriendly` MODIFY `codePostale` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `promenade` MODIFY `codePostale` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `roleId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
