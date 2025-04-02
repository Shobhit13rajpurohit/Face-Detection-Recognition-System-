import React, { useState } from 'react';
import { Upload, Save, User } from 'lucide-react';

interface PersonData {
  name: string;
  age: string;
  image: string;
}

const DataStore: React.FC = () => {
  const [formData, setFormData] = useState<PersonData>({
    name: '',
    age: '',
    image: ''
  });
  const [savedData, setSavedData] = useState<PersonData | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save the current form data to savedData state
    setSavedData({...formData});
    setShowPreview(true);
    console.log('Saving person data:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        Data Store
      </h1>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-cyan-900/30 p-6 mb-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full bg-gray-900/50 rounded-lg border border-gray-700 p-3 text-gray-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={e => setFormData(prev => ({ ...prev, age: e.target.value }))}
                className="w-full bg-gray-900/50 rounded-lg border border-gray-700 p-3 text-gray-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                placeholder="Enter age"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Photo
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-lg hover:border-cyan-500/50 transition-colors">
              <div className="space-y-1 text-center">
                {formData.image ? (
                  <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border-2 border-cyan-500">
                    <img src={formData.image} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                )}
                <div className="flex text-sm text-gray-400">
                  <label className="relative cursor-pointer rounded-md font-medium text-cyan-400 hover:text-cyan-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-cyan-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors"
          >
            <Save className="w-5 h-5" />
            <span>Save Person Data</span>
          </button>
        </form>
      </div>

      {/* Live Preview Section */}
      {showPreview && savedData && (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-cyan-900/30 p-6 mb-6 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 text-cyan-400">Saved Data Preview</h2>
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              {savedData.image ? (
                <div className="h-32 w-32 overflow-hidden rounded-full border-2 border-cyan-500">
                  <img src={savedData.image} alt={savedData.name} className="h-full w-full object-cover" />
                </div>
              ) : (
                <div className="h-32 w-32 rounded-full bg-gray-700 flex items-center justify-center">
                  <User className="h-16 w-16 text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                <div className="mb-2">
                  <span className="text-gray-400 text-sm">Name:</span>
                  <p className="text-lg text-white font-medium">{savedData.name || 'Not provided'}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Age:</span>
                  <p className="text-lg text-white font-medium">{savedData.age || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-400">
            <p>Data successfully saved!</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataStore;