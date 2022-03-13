/*
  Warnings:

  - You are about to drop the column `user_id` on the `exercise` table. All the data in the column will be lost.
  - Added the required column `userId` to the `exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "exercise" DROP CONSTRAINT "exercise_user_id_fkey";

-- AlterTable
ALTER TABLE "exercise" DROP COLUMN "user_id",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
