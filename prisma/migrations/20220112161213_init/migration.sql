-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('RESET_PASSWORD');

-- CreateEnum
CREATE TYPE "PlanRateType" AS ENUM ('Variable', 'Fixed', 'Indexed');

-- CreateEnum
CREATE TYPE "PlanLanguage" AS ENUM ('English', 'Spanish');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" TEXT NOT NULL DEFAULT E'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "handle" TEXT NOT NULL,
    "hashedSessionToken" TEXT,
    "antiCSRFToken" TEXT,
    "publicData" TEXT,
    "privateData" TEXT,
    "userId" UUID,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "sentTo" TEXT NOT NULL,
    "userId" UUID NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tdu" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "ptcName" TEXT NOT NULL,
    "charges" DECIMAL(4,2)[],
    "rates" DECIMAL(6,6)[],

    CONSTRAINT "Tdu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Provider" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "ptcName" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "rating" INTEGER DEFAULT -1,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "ptcIdKey" INTEGER NOT NULL,
    "eflNumbers" DECIMAL(10,6)[],
    "chargeFunction" JSONB[],
    "rateFunction" JSONB[],
    "lowUsageRate" DECIMAL(4,4),
    "midUsageRate" DECIMAL(4,4),
    "highUsageRate" DECIMAL(4,4),
    "kwh500" DECIMAL(3,3) NOT NULL,
    "kwh1000" DECIMAL(3,3) NOT NULL,
    "kwh2000" DECIMAL(3,3) NOT NULL,
    "rateType" "PlanRateType" NOT NULL,
    "isPrepaid" BOOLEAN NOT NULL,
    "isTimeOfUse" BOOLEAN NOT NULL,
    "isPromotion" BOOLEAN NOT NULL,
    "promotionDescription" TEXT NOT NULL,
    "isNewCustomer" BOOLEAN NOT NULL,
    "percentRenewable" INTEGER NOT NULL,
    "term" INTEGER NOT NULL,
    "cancellationFee" TEXT NOT NULL,
    "language" "PlanLanguage" NOT NULL,
    "termsUrl" VARCHAR(500) NOT NULL,
    "factsUrl" VARCHAR(500) NOT NULL,
    "enrollUrl" VARCHAR(500) NOT NULL,
    "enrollPhone" TEXT NOT NULL,
    "tduId" UUID NOT NULL,
    "providerId" UUID NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_handle_key" ON "Session"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Token_hashedToken_type_key" ON "Token"("hashedToken", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Tdu_name_key" ON "Tdu"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tdu_ptcName_key" ON "Tdu"("ptcName");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_name_key" ON "Provider"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Provider_ptcName_key" ON "Provider"("ptcName");

-- CreateIndex
CREATE UNIQUE INDEX "Plan_ptcIdKey_key" ON "Plan"("ptcIdKey");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_tduId_fkey" FOREIGN KEY ("tduId") REFERENCES "Tdu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "Provider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
