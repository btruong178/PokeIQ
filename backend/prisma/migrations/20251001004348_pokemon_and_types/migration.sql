-- CreateTable
CREATE TABLE "public"."Pokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "damage_relations" JSONB NOT NULL,

    CONSTRAINT "Types_pkey" PRIMARY KEY ("id")
);
