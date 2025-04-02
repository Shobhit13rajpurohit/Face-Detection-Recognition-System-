import React, { useState } from 'react';
import CameraFeed from '../components/CameraFeed';

interface PersonData {
  name: string;
  age: string;
  confidence: number;
}

const Dashboard: React.FC = () => {
  const [detectedPerson, setDetectedPerson] = useState<PersonData | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2">
          <CameraFeed onPersonDetected={setDetectedPerson} />
        </div>
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-cyan-900/30 p-4 md:p-6">
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">Detected Person</h2>
          {detectedPerson ? (
            <div className="space-y-4">
              <div className="p-4 bg-gray-900/50 rounded-lg border border-cyan-500/20">
                <div className="space-y-2">
                  <div>
                    <span className="text-gray-400">Name:</span>
                    <span className="ml-2 text-gray-100">{detectedPerson.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Age:</span>
                    <span className="ml-2 text-gray-100">{detectedPerson.age}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Confidence:</span>
                    <span className="ml-2 text-cyan-400">{detectedPerson.confidence}%</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 text-center py-8">
              No person detected
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;