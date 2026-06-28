import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Phone, Mail, MapPin, Send, MessageSquare, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const { addAppointment, t } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
    preferredDate: '',
    projectType: 'Interior Painting',
    budgetRange: 'Standard',
    'bot-field': '',
  });
  
  const [fileError, setFileError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('');
    const file = e.target.files?.[0];
    if (file) {
      // 8MB limit for Netlify
      if (file.size > 8 * 1024 * 1024) {
        setFileError(t('form_file_error'));
        e.target.value = ''; // Reset input
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fileError) return; // Prevent submit if there's a file error
    
    setIsSubmitting(true);
    
    const form = e.currentTarget;
    const submitData = new FormData(form);

    fetch('/', {
      method: 'POST',
      body: submitData,
    })
      .then(() => {
        addAppointment({
          customerName: formData.name,
          email: formData.email,
          phone: formData.phone,
          projectDescription: formData.description,
          preferredDate: formData.preferredDate,
          budgetRange: formData.budgetRange,
        });
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', description: '', preferredDate: '', projectType: 'Interior Painting', budgetRange: 'Standard', 'bot-field': '' });
        form.reset(); // Clear the file input and other native fields
        
        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      })
      .catch((error) => console.error(error))
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen">
       <div className="bg-slate-900 py-16 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{t('contact_title')}</h1>
          <p className="text-slate-300 max-w-2xl mx-auto">{t('contact_subtitle')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-slate-800 mb-6">{t('contact_info')}</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-3 rounded-full text-primary mr-4">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{t('info_phone')}</h4>
                    <p className="text-slate-600 mb-1">{t('info_phone_desc')}</p>
                    <a href="tel:+15551234567" className="text-primary font-bold hover:underline">(555) 123-4567</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 p-3 rounded-full text-green-600 mr-4">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{t('info_text')}</h4>
                    <p className="text-slate-600 mb-1">{t('info_text_desc')}</p>
                    <a href="sms:+15551234567" className="text-primary font-bold hover:underline">(555) 123-4567</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-orange-100 p-3 rounded-full text-orange-600 mr-4">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{t('info_email')}</h4>
                    <a href="mailto:info@precisionpainters.com" className="text-primary hover:underline">info@precisionpainters.com</a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-slate-100 p-3 rounded-full text-slate-600 mr-4">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800">{t('info_area')}</h4>
                    <p className="text-slate-600">{t('info_area_desc')}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary p-8 rounded-xl text-white shadow-lg">
              <h3 className="text-xl font-bold mb-4">{t('emergency_title')}</h3>
              <p className="text-blue-100 mb-4">{t('emergency_desc')}</p>
              <button className="w-full bg-white text-primary font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors">
                {t('call_emergency')}
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-accent">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">{t('schedule_appt')}</h2>
              
              {success ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-lg flex items-center justify-center flex-col text-center">
                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                     <CheckCircle2 className="w-8 h-8" />
                   </div>
                   <h3 className="text-xl font-bold mb-2">{t('request_received')}</h3>
                   <p>{t('request_thanks').replace('{name}', formData.name)}</p>
                   <button onClick={() => setSuccess(false)} className="mt-4 text-green-800 font-semibold underline">{t('send_another')}</button>
                </div>
              ) : (
                <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-6">
                  <input type="hidden" name="form-name" value="contact" />
                  <p className="hidden">
                    <label>
                      Don’t fill this out if you're human: <input name="bot-field" onChange={handleChange} value={formData['bot-field']} />
                    </label>
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">{t('form_name')}</label>
                      <input 
                        type="text" 
                        name="name" 
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">{t('form_email')}</label>
                      <input 
                        type="email" 
                        name="email" 
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">{t('form_phone')}</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">{t('form_date')}</label>
                      <input 
                        type="date" 
                        name="preferredDate" 
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('form_service')}</label>
                        <select 
                            name="projectType"
                            value={formData.projectType}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none bg-white"
                        >
                            <option value="Interior Painting">Interior Painting</option>
                            <option value="Exterior Painting">Exterior Painting</option>
                            <option value="Cabinet Refinishing">Cabinet Refinishing</option>
                            <option value="Commercial">Commercial</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">{t('form_budget')}</label>
                        <select 
                            name="budgetRange"
                            value={formData.budgetRange}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary outline-none bg-white"
                        >
                            <option value="Standard">Standard</option>
                            <option value="Premium">Premium</option>
                            <option value="Budget">Budget Friendly</option>
                            <option value="Unsure">Unsure</option>
                        </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('form_desc')}</label>
                    <textarea 
                      name="description" 
                      required
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                      placeholder={t('form_desc_placeholder')}
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">{t('form_upload')}</label>
                    <input 
                      type="file" 
                      name="projectImage" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary hover:file:bg-blue-100"
                    />
                    {fileError && <p className="text-red-500 text-xs mt-2">{fileError}</p>}
                    <p className="text-slate-400 text-xs mt-2">{t('form_max_size')}</p>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full bg-accent text-slate-900 font-bold py-4 rounded-lg hover:bg-yellow-400 transition-all flex items-center justify-center shadow-md ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? t('submit_sending') : <><Send className="w-5 h-5 mr-2" /> {t('submit_btn')}</>}
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-4">{t('submit_agree')}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
