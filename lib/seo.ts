import { Metadata } from "next";
import { SITE_CONFIG, OG_IMAGE_CONFIG } from "./seo-constants";

export type { Metadata };

export function getBaseMetadata(
  title: string,
  description: string,
  options?: { canonical?: string; image?: string }
): Metadata {
  const imageUrl = options?.image || SITE_CONFIG.ogImageWithVersion;
  const canonicalUrl = options?.canonical || SITE_CONFIG.url;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      locale: SITE_CONFIG.locale,
      siteName: SITE_CONFIG.name,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: OG_IMAGE_CONFIG.width,
          height: OG_IMAGE_CONFIG.height,
          alt: OG_IMAGE_CONFIG.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: SITE_CONFIG.twitter,
    },
  };
}

export function getArticleMetadata(
  title: string,
  description: string,
  canonical: string,
  options?: { image?: string; publishedAt?: string; author?: string }
): Metadata {
  const imageUrl = options?.image || SITE_CONFIG.ogImageWithVersion;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: SITE_CONFIG.locale,
      siteName: SITE_CONFIG.name,
      type: "article",
      images: [
        {
          url: imageUrl,
          width: OG_IMAGE_CONFIG.width,
          height: OG_IMAGE_CONFIG.height,
          alt: OG_IMAGE_CONFIG.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: SITE_CONFIG.twitter,
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        url: canonical,
        datePublished: options?.publishedAt,
        author: {
          "@type": "Person",
          name: options?.author || SITE_CONFIG.name,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.url,
        },
        image: imageUrl,
      }),
    },
  };
}

export function getDiscussionMetadata(
  title: string,
  description: string,
  canonical: string,
  options?: { image?: string; publishedAt?: string; author?: string }
): Metadata {
  const imageUrl = options?.image || SITE_CONFIG.ogImageWithVersion;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      locale: SITE_CONFIG.locale,
      siteName: SITE_CONFIG.name,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: OG_IMAGE_CONFIG.width,
          height: OG_IMAGE_CONFIG.height,
          alt: OG_IMAGE_CONFIG.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: SITE_CONFIG.twitter,
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "DiscussionForumPosting",
        headline: title,
        text: description,
        url: canonical,
        datePublished: options?.publishedAt,
        author: {
          "@type": "Person",
          name: options?.author || SITE_CONFIG.name,
        },
        publisher: {
          "@type": "Organization",
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.url,
        },
      }),
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo-new.png`,
    sameAs: [
      SITE_CONFIG.socialLinks.twitter,
      SITE_CONFIG.socialLinks.github,
    ],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.url}/community/discussions?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: getOrganizationSchema(),
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getFAQPageSchema(faqs: Array<{ question: string | Record<string, string>; answer: string | Record<string, string> }>, locale = 'en') {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: typeof faq.question === 'object' ? (faq.question[locale] || faq.question.en) : faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof faq.answer === 'object' ? (faq.answer[locale] || faq.answer.en) : faq.answer,
      },
    })),
  };
}

export function getJSONLDScript(schemas: object[]) {
  return {
    type: "application/ld+json" as const,
    children: JSON.stringify(schemas),
  };
}
