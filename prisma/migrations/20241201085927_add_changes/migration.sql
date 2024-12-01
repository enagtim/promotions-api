-- DropForeignKey
ALTER TABLE "PromotionTag" DROP CONSTRAINT "PromotionTag_promotionId_fkey";

-- AddForeignKey
ALTER TABLE "PromotionTag" ADD CONSTRAINT "PromotionTag_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "Promotion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
