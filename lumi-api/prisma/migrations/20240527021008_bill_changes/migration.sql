/*
  Warnings:

  - Added the required column `electricityGDIKwh` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electricityGDIPrice` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electricityKwh` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electricityPrice` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electricitySCEEKwh` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `electricitySCEEPrice` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthReference` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipalPublicLightingContribution` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bill" ADD COLUMN     "electricityGDIKwh" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "electricityGDIPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "electricityKwh" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "electricityPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "electricitySCEEKwh" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "electricitySCEEPrice" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "monthReference" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "municipalPublicLightingContribution" DOUBLE PRECISION NOT NULL;
