export function ProductStructuredData() {
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SaaS',
          name: 'FeedSpark',
          description: 'User feedback collection and analysis platform',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
        }),
      }}
    />
  );
}
