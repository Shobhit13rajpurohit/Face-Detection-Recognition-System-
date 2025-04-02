import React, { useState } from 'react';
import { Mail, User, Users } from 'lucide-react';

const Contact: React.FC = () => {
  // State for form inputs
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Team member data
  const teamMembers = [
    { name: 'Shobhit Rajpurohit', role: 'Lead Developer(ML,python)', email: 'shobhit13rajpurohit@gmail.com' },
    { name: 'Nimika', role: 'Backend Developer', email: 'nimika@faceai.com' },
    { name: 'Jatin', role: 'UX Designer', email: 'jatin@faceai.com' },
    { name: 'Mukul', role: 'Frontend Developer', email: 'mukul@faceai.com' }
  ];

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitMessage('Thank you for your message! Our team will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center">
        <Mail className="w-8 h-8 mr-3 text-cyan-400" />
        Contact Us
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Team Section - Takes 2 columns on xl screens */}
        <div className="xl:col-span-2">
          <div className="relative h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-xl"></div>
            <div className="relative bg-gray-800/60 backdrop-blur-sm rounded-lg p-6 border border-cyan-900/30 h-full">
              <h2 className="text-xl font-semibold mb-6 text-cyan-400 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Meet Our Team
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                    <div className="p-2 rounded-full bg-cyan-500/20 text-cyan-400 mr-3">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-100">{member.name}</p>
                      <p className="text-sm text-gray-400">{member.role}</p>
                      <p className="text-xs text-cyan-400">{member.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form - Takes 3 columns on xl screens */}
        <div className="xl:col-span-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-xl"></div>
            <div className="relative bg-gray-800/60 backdrop-blur-sm rounded-lg p-6 border border-cyan-900/30">
              <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                Send us a Message
              </h2>
              
              {submitMessage && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300">
                  {submitMessage}
                </div>
              )}
              
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900/80 rounded-lg border border-gray-700 p-3 text-gray-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900/80 rounded-lg border border-gray-700 p-3 text-gray-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Message</label>
                  <textarea
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900/80 rounded-lg border border-gray-700 p-3 text-gray-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-8 py-3 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-colors disabled:opacity-50 font-medium"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;