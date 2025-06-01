export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "FeedSpark has transformed how we collect and manage customer feedback. It's now an integral part of our product development process.",
      author: 'Sarah Johnson',
      role: 'Product Manager',
      company: 'TechCorp',
    },
    {
      quote:
        'The automation features save us hours of work every week. We can now focus on acting on feedback rather than managing it.',
      author: 'Michael Chen',
      role: 'Customer Success Lead',
      company: 'GrowthStart',
    },
    {
      quote:
        'Setting up feedback forms has never been easier. The integration with our existing tools makes it a perfect fit for our workflow.',
      author: 'Emma Williams',
      role: 'UX Designer',
      company: 'DesignPro',
    },
  ];

  return (
    <section className='py-24 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl font-bold mb-4'>Loved by Teams Like Yours</h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            See how other companies are using FeedSpark to improve their
            products and delight their customers
          </p>
        </div>
        <div className='grid md:grid-cols-3 gap-8'>
          {testimonials.map((testimonial, index) => (
            <div key={index} className='bg-white p-8 rounded-lg shadow-sm'>
              <p className='text-gray-600 mb-6'>{testimonial.quote}</p>
              <div>
                <p className='font-semibold'>{testimonial.author}</p>
                <p className='text-sm text-gray-500'>{testimonial.role}</p>
                <p className='text-sm text-gray-500'>{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
