/*
  Warnings:

  - You are about to drop the `typeofpro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_categorieProId_fkey`;

-- DropTable
DROP TABLE `typeofpro`;

-- CreateTable
CREATE TABLE `categoriePro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `categoriePro_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_categorieProId_fkey` FOREIGN KEY (`categorieProId`) REFERENCES `categoriePro`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
