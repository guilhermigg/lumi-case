/*
  Warnings:

  - A unique constraint covering the columns `[referenceNumber]` on the table `Customer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Customer_referenceNumber_key" ON "Customer"("referenceNumber");
