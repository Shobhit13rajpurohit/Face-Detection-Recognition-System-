import React from 'react';
import { ChevronDown } from 'lucide-react';

const Help: React.FC = () => {
  const faqs = [
    {
      question: 'How accurate is the face detection system?',
      answer: 'Our system achieves 99.9% accuracy in controlled environments and 95%+ accuracy in varying conditions.',
    },
    {
      question: 'What happens if the system goes offline?',
      answer: 'The system includes offline processing capabilities and will continue to function with reduced features.',
    },
    {
      question: 'How is the data stored and protected?',
      answer: 'All data is encrypted and stored locally with enterprise-grade security protocols.',
    },
  ];

  return (
    <div className="w-full max-w-4xl px-4 sm:px-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Help & Support
      </h1>

      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-gray-800 rounded-lg border border-cyan-900/30"
          >
            <summary className="flex items-center justify-between p-3 sm:p-4 cursor-pointer">
              <span className="font-medium text-gray-100 text-sm sm:text-base pr-2">{faq.question}</span>
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-3 sm:px-4 pb-3 sm:pb-4 text-gray-400 text-sm sm:text-base">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-cyan-900/30">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-cyan-400">
            Quick Start Guide
          </h2>
          <ol className="list-decimal list-inside space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
            <li>Connect your camera to the system</li>
            <li>Start the detection service</li>
            <li>Configure recognition parameters</li>
            <li>Monitor the dashboard for results</li>
          </ol>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 border border-cyan-900/30">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-cyan-400">
            Troubleshooting
          </h2>
          <ul className="space-y-1 sm:space-y-2 text-gray-400 text-sm sm:text-base">
            <li>Check camera connections</li>
            <li>Verify system requirements</li>
            <li>Update to latest version</li>
            <li>Contact support for assistance</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Help;