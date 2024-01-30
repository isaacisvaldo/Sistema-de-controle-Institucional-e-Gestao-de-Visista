/*
  Warnings:

  - Added the required column `sigla` to the `Orgao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orgao" ADD COLUMN     "sigla" TEXT NOT NULL;
