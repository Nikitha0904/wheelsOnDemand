/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `guest_users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `guest_users_email_key` ON `guest_users`(`email`);
