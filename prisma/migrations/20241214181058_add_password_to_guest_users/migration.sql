/*
  Warnings:

  - Added the required column `password` to the `guest_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `guest_users` ADD COLUMN `password` VARCHAR(191) NOT NULL;
