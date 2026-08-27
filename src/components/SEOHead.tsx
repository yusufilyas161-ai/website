import React, { useEffect } from 'react';
import { useSchool } from '../context/SchoolContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  slug?: string;
  image?: string;
  article?: {
    datePublished: string;
    author: string;
    category: string;
  };
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  slug,
  image,
  article
}) => {
  const { schoolInfo, faqs } = useSchool();

  const finalTitle = title 
    ? `${title} | ${schoolInfo.name}`
    : schoolInfo.seoTitle || `${schoolInfo.name} | SD Tahfizh Muara Tembesi`;

  const finalDescription = description || schoolInfo.seoDescription;
  const canonicalUrl = slug ? `https://sdquranparasahabat.sch.id/#${slug}` : 'https://sdquranparasahabat.sch.id/';
  const ogImage = image || "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1200&q=80";

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', finalDescription);

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', finalTitle);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', finalDescription);

    // Update or inject Schema.org JSON-LD structured data
    let scriptTag = document.getElementById('json-ld-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'json-ld-schema';
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }

    const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["EducationalOrganization", "School", "LocalBusiness"],
          "@id": "https://sdquranparasahabat.sch.id/#organization",
          "name": schoolInfo.name,
          "alternateName": "SD Qur'an Para Sahabat",
          "description": schoolInfo.description,
          "url": "https://sdquranparasahabat.sch.id",
          "logo": "https://sdquranparasahabat.sch.id/logo.png",
          "image": ogImage,
          "telephone": schoolInfo.phone,
          "email": schoolInfo.email,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": schoolInfo.address,
            "addressLocality": schoolInfo.district,
            "addressRegion": schoolInfo.province,
            "addressCountry": "ID"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -1.7289,
            "longitude": 103.1192
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
              "opens": "07:30",
              "closes": "14:00"
            },
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Friday", "Saturday"],
              "opens": "07:30",
              "closes": "11:00"
            }
          ],
          "sameAs": [
            schoolInfo.facebook,
            schoolInfo.instagram,
            schoolInfo.youtube
          ]
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Beranda",
              "item": "https://sdquranparasahabat.sch.id/"
            },
            ...(slug ? [{
              "@type": "ListItem",
              "position": 2,
              "name": title || slug,
              "item": canonicalUrl
            }] : [])
          ]
        },
        {
          "@type": "FAQPage",
          "mainEntity": faqs.slice(0, 6).map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        },
        ...(article ? [{
          "@type": "Article",
          "headline": title || finalTitle,
          "description": finalDescription,
          "image": ogImage,
          "datePublished": article.datePublished,
          "author": {
            "@type": "Organization",
            "name": article.author
          },
          "publisher": {
            "@id": "https://sdquranparasahabat.sch.id/#organization"
          }
        }] : [])
      ]
    };

    scriptTag.textContent = JSON.stringify(schemaData);
  }, [finalTitle, finalDescription, canonicalUrl, ogImage, schoolInfo, faqs, article, title, slug]);

  return null;
};
