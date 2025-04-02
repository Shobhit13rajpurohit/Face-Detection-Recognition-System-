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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent flex items-center">
        <Mail className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 text-cyan-400" />
        Contact Us
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Team Section - Takes 1 column on lg screens */}
        <div className="lg:col-span-1">
          <div className="relative h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-xl"></div>
            <div className="relative bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-cyan-900/30 h-full">
              <h2 className="text-xl font-semibold mb-4 sm:mb-6 text-cyan-400 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Meet Our Team
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center p-2 sm:p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors">
                    <div className="p-2 rounded-full bg-cyan-500/20 text-cyan-400 mr-2 sm:mr-3">
                      <User className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-medium text-gray-100 text-sm sm:text-base truncate">{member.name}</p>
                      <p className="text-xs sm:text-sm text-gray-400 truncate">{member.role}</p>
                      <p className="text-xs text-cyan-400 truncate">{member.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form - Takes 2 columns on lg screens */}
        <div className="lg:col-span-2">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-xl"></div>
            <div className="relative bg-gray-800/60 backdrop-blur-sm rounded-lg p-4 sm:p-6 border border-cyan-900/30">
              <h2 className="text-xl font-semibold mb-4 text-cyan-400">
                Send us a Message
              </h2>
              
              {submitMessage && (
                <div className="mb-6 p-3 sm:p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm sm:text-base">
                  {submitMessage}
                </div>
              )}
              
              <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1 sm:mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900/80 rounded-lg border border-gray-700 p-2 sm:p-3 text-gray-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1 sm:mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-900/80 rounded-lg border border-gray-700 p-2 sm:p-3 text-gray-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors text-sm sm:text-base"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1 sm:mb-2">Message</label>
                  <textarea
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-900/80 rounded-lg border border-gray-700 p-2 sm:p-3 text-gray-100 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors text-sm sm:text-base"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-colors disabled:opacity-50 font-medium text-sm sm:text-base"
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