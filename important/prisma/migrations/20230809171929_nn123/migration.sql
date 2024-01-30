-- CreateTable
CREATE TABLE "Logs_user" (
    "logID" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "fk_user" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Logs_user_pkey" PRIMARY KEY ("logID")
);

-- AddForeignKey
ALTER TABLE "Logs_user" ADD CONSTRAINT "Logs_user_fk_user_fkey" FOREIGN KEY ("fk_user") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
