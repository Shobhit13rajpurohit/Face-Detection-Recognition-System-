import React from 'react';
import { Brain, Shield, Zap } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Advanced AI',
      description: 'Powered by state-of-the-art deep learning models for accurate face detection and recognition.',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Processing',
      description: 'All data is processed locally with enterprise-grade security protocols.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Real-time Analysis',
      description: 'Process and analyze video feeds in real-time with minimal latency.',
    },
  ];

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        About FaceAI System
      </h1>
      
      <p className="text-gray-400 mb-6 md:mb-8 text-sm md:text-base">
        FaceAI System is a cutting-edge face detection and recognition platform designed
        for enterprise security and surveillance applications. Our system combines
        advanced artificial intelligence with real-time processing capabilities.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 md:p-6 border border-cyan-900/30"
          >
            <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400 w-fit mb-4">
              {feature.icon}
            </div>
            <h3 className="text-md md:text-lg font-semibold mb-2 text-gray-100">
              {feature.title}
            </h3>
            <p className="text-gray-400 text-xs md:text-sm">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl"></div>
        <div className="relative bg-gray-800 rounded-lg p-4 md:p-6 border border-cyan-900/30">
          <h2 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-cyan-400">
            How It Works
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Our system uses deep neural networks trained on millions of faces to
            detect and recognize individuals in real-time. The process involves
            multiple stages of analysis, from initial face detection to feature
            extraction and matching against known identities.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;