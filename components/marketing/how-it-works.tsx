'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Link } from 'lucide-react';
import Image from 'next/image';

export default function HowItWorks() {
  const steps = [
    {
      title: 'Create Your Form',
      description:
        'Design beautiful, branded feedback forms in minutes with our intuitive builder.',
      icon: '✨',
      color: 'bg-blue-50',
      accent: 'border-blue-500',
      image: '/assets/form-builder.webp',
    },
    {
      title: 'Collect Responses',
      description:
        'Share your form across multiple channels and start gathering valuable insights.',
      icon: '📝',
      color: 'bg-purple-50',
      accent: 'border-purple-500',
      image: '/assets/responses.webp',
    },
    {
      title: 'Automate Workflows',
      description:
        'Set up automated actions based on feedback to streamline your process.',
      icon: '⚡',
      color: 'bg-orange-50',
      accent: 'border-orange-500',
      image: '/assets/automation.webp',
    },
    {
      title: 'Analyze & Act',
      description:
        'Turn feedback into actionable insights with powerful analytics and reporting.',
      icon: '📊',
      color: 'bg-green-50',
      accent: 'border-green-500',
      image: '/assets/analytics.webp',
    },
  ];

  return (
    <section
      id='how-it-works'
      className='py-32 bg-gradient-to-b from-gray-50 to-white'
    >
      <div className='container mx-auto px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-20'
        >
          <h2 className='text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent'>
            How FeedSpark Works
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
            A simple yet powerful process to transform your feedback collection
            and management
          </p>
        </motion.div>

        <div className='relative max-w-5xl mx-auto'>
          {/* Connection Lines */}
          <div className='absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 hidden md:block' />

          <div className='grid md:grid-cols-4 gap-8 relative'>
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className='relative'
              >
                <div
                  className={`${step.color} p-8 rounded-2xl border-2 ${step.accent} hover:shadow-xl transition-all duration-300 group`}
                >
                  {/* Step Number */}
                  <div className='absolute -top-4 -right-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold'>
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className='text-4xl mb-6 transform group-hover:scale-110 transition-transform'>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className='text-xl font-bold mb-3'>{step.title}</h3>
                  <p className='text-gray-600 leading-relaxed'>
                    {step.description}
                  </p>

                  {/* Arrow */}
                  {index < steps.length - 1 && (
                    <div className='hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10'>
                      <ArrowRight className='w-6 h-6 text-primary' />
                    </div>
                  )}
                </div>

                {/* Image Preview */}
                <div className='mt-4 overflow-hidden rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <Image
                    src={step.image}
                    alt={step.title}
                    width={500}
                    height={300}
                    className='w-full h-auto transform group-hover:scale-105 transition-transform duration-500'
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center mt-16'
          >
            <Link
              href={'/sign-in'}
              className='inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-colors'
            >
              Get Started Free
              <ArrowRight className='ml-2 w-4 h-4' />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
