-- CreateTable
CREATE TABLE "MoistureLog" (
    "id" SERIAL NOT NULL,
    "moisture" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MoistureLog_pkey" PRIMARY KEY ("id")
);
