/*
  Warnings:

  - Added the required column `roomId` to the `user_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_items" ADD COLUMN     "roomId" TEXT NOT NULL;
