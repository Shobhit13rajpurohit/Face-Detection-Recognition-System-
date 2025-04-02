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
    <div className="max-w-4xl">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Help & Support
      </h1>

      <div className="space-y-4 mb-8">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group bg-gray-800 rounded-lg border border-cyan-900/30"
          >
            <summary className="flex items-center justify-between p-4 cursor-pointer">
              <span className="font-medium text-gray-100">{faq.question}</span>
              <ChevronDown className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-4 pb-4 text-gray-400">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-cyan-900/30">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            Quick Start Guide
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-400">
            <li>Connect your camera to the system</li>
            <li>Start the detection service</li>
            <li>Configure recognition parameters</li>
            <li>Monitor the dashboard for results</li>
          </ol>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-cyan-900/30">
          <h2 className="text-xl font-semibold mb-4 text-cyan-400">
            Troubleshooting
          </h2>
          <ul className="space-y-2 text-gray-400">
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