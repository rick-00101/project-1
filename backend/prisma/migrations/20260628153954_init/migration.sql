-- CreateTable
CREATE TABLE "user_details" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_details_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "user_items" (
    "item_id" TEXT NOT NULL,
    "createdAT" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "thumbnailURl" TEXT,

    CONSTRAINT "user_items_pkey" PRIMARY KEY ("item_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_details_email_key" ON "user_details"("email");

-- AddForeignKey
ALTER TABLE "user_items" ADD CONSTRAINT "user_items_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user_details"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
