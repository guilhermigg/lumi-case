-- AlterTable
ALTER TABLE "Bill" ALTER COLUMN "electricityGDIKwh" DROP NOT NULL,
ALTER COLUMN "electricityGDIPrice" DROP NOT NULL,
ALTER COLUMN "electricityKwh" DROP NOT NULL,
ALTER COLUMN "electricityPrice" DROP NOT NULL,
ALTER COLUMN "electricitySCEEKwh" DROP NOT NULL,
ALTER COLUMN "electricitySCEEPrice" DROP NOT NULL,
ALTER COLUMN "monthReference" DROP NOT NULL,
ALTER COLUMN "municipalPublicLightingContribution" DROP NOT NULL;
