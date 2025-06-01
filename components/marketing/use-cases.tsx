export default function UseCases() {
  const cases = [
    {
      title: 'Customer Feedback',
      description:
        'Gather and analyze customer feedback to improve products and services.',
      icon: '👥',
    },
    {
      title: 'Bug Reports',
      description:
        'Streamline bug reporting and tracking for better product quality.',
      icon: '🐛',
    },
    {
      title: 'Feature Requests',
      description: 'Collect and prioritize feature requests from your users.',
      icon: '💡',
    },
    {
      title: 'User Research',
      description:
        'Conduct user research and surveys to inform product decisions.',
      icon: '🔍',
    },
  ];

  return (
    <section className='py-24'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold mb-4'>Perfect For Every Need</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            {`FeedSpark adapts to your unique requirements, whether you're
            collecting customer feedback, bug reports, or feature requests`}
          </p>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {cases.map((useCase, index) => (
            <div key={index} className='bg-white p-6 rounded-lg border'>
              <div className='text-4xl mb-4'>{useCase.icon}</div>
              <h3 className='text-xl font-semibold mb-2'>{useCase.title}</h3>
              <p className='text-gray-600'>{useCase.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
