import { PRODUCTS, getProductBySlug, getAllProductSlugs } from "@/lib/products";
import { ProductPurchaseExperience } from "@/components/product/ProductPurchaseExperience";
import { ProductStory } from "@/components/product/ProductStory";
import { ProductDetailsGrid } from "@/components/product/ProductDetailsGrid";
import { ProductReviewsAndFAQ } from "@/components/product/ProductReviewsAndFAQ";
import { RelatedProduct } from "@/components/product/RelatedProduct";
import { Container } from "@/components/ui/Container";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: { slug: string };
}

/** Pre-renders both product pages at build time — only two exist, ever. */
export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: ProductPageProps): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription,
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const relatedProduct = PRODUCTS.find((p) => p.slug !== product.slug);

  return (
    <>
      <div className="pt-32">
        <Container>
          <p className="mb-10 font-body text-xs tracking-[0.16em] uppercase text-charcoal/45">
            <Link href="/" className="transition-colors hover:text-charcoal">المتجر</Link>
            <span aria-hidden="true"> · </span>
            <span className="text-charcoal">{product.name}</span>
          </p>
          <ProductPurchaseExperience product={product} />
        </Container>
      </div>

      <ProductStory product={product} />
      <ProductDetailsGrid product={product} />
      <ProductReviewsAndFAQ product={product} />
      {relatedProduct && <RelatedProduct product={relatedProduct} />}
    </>
  );
}
