import { site } from "@/content/site";
import { services } from "@/content/services";

/** Site-wide JSON-LD: who you are, the business you run, and the website itself. */
export function siteJsonLd() {
  const url = site.url.replace(/\/$/, "");
  const priceNumber = (p?: string) => (p ? p.replace(/[^0-9.]/g, "") : undefined);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${url}/#person`,
        name: site.name,
        url: `${url}/`,
        email: `mailto:${site.email}`,
        jobTitle: site.role,
        image: `${url}/images/sahitya-portrait.webp`,
        address: { "@type": "PostalAddress", addressRegion: "ON", addressCountry: "CA" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "Georgian College" },
        knowsAbout: ["Web design", "Web development", "Next.js", "React", "WordPress", "Node.js", "ASP.NET Core", "React Native"],
        sameAs: site.socials.map((s) => s.url),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${url}/#business`,
        name: `${site.name}, web design and development`,
        url: `${url}/`,
        email: site.email,
        description: site.description,
        founder: { "@id": `${url}/#person` },
        image: `${url}/og.png`,
        address: { "@type": "PostalAddress", addressRegion: "ON", addressCountry: "CA" },
        areaServed: site.areaServed.map((a) => ({ "@type": "Place", name: a })),
        priceRange: "$$",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web design and development services",
          itemListElement: services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.name, description: s.description, url: `${url}/services/#${s.id}` },
            ...(site.showPrices && s.startingPrice && !s.startingPrice.includes("/")
              ? { priceSpecification: { "@type": "PriceSpecification", minPrice: priceNumber(s.startingPrice), priceCurrency: "CAD" } }
              : {}),
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url: `${url}/`,
        name: site.name,
        publisher: { "@id": `${url}/#person` },
        inLanguage: "en-CA",
      },
    ],
  };
}
