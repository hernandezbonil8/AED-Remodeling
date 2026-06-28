import React, { useState } from 'react';
import { EstimateData, DEFAULT_TERMS } from './types';
import EstimateForm from './EstimateForm';
import SavedEstimates from './SavedEstimates';
import { generatePDF } from './PDFGenerator';
import { Save, FileText, Plus, List, Download } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Estimator: React.FC = () => {
  const { t, language } = useApp();
  const [activeTab, setActiveTab] = useState<'builder' | 'saved'>('builder');
  const [data, setData] = useState<EstimateData>(() => {
    // Initial empty state
    return {
      id: crypto.randomUUID(),
      clientName: '',
      clientAddress: '',
      clientCity: '',
      clientState: '',
      clientZip: '',
      clientPhone: '',
      clientEmail: '',
      estimateNumber: `EST-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
      estimateDate: new Date().toISOString().split('T')[0],
      startDate: '',
      endDate: '',
      projectType: 'Interior',
      description_en: '',
      description_es: '',
      items: [],
      subtotal: 0,
      discountType: 'fixed',
      discountValue: 0,
      taxRate: 0,
      totalDue: 0,
      deposit: 0,
      balance: 0,
      notes_en: '',
      notes_es: '',
      terms_en: DEFAULT_TERMS,
      terms_es: '',
      colorSelections_en: '',
      colorSelections_es: '',
      clientSignature: null,
      signatureDate: '',
      status: 'draft',
      lastModified: Date.now(),
    };
  });

  const handleSave = () => {
    const savedEstimates = JSON.parse(localStorage.getItem('gmi_estimates') || '[]');
    const updatedEstimates = savedEstimates.filter((e: EstimateData) => e.id !== data.id);
    
    const estimateToSave = {
      ...data,
      status: 'saved',
      lastModified: Date.now()
    };
    
    updatedEstimates.push(estimateToSave);
    localStorage.setItem('gmi_estimates', JSON.stringify(updatedEstimates));
    alert('Estimate saved successfully!');
  };

  const handleLoad = (estimate: EstimateData) => {
    setData(estimate);
    setActiveTab('builder');
  };

  const handleNew = () => {
    if (confirm('Are you sure? Unsaved changes will be lost.')) {
      setData({
        id: crypto.randomUUID(),
        clientName: '',
        clientAddress: '',
        clientCity: '',
        clientState: '',
        clientZip: '',
        clientPhone: '',
        clientEmail: '',
        estimateNumber: `EST-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
        estimateDate: new Date().toISOString().split('T')[0],
        startDate: '',
        endDate: '',
        projectType: 'Interior',
        description_en: '',
        description_es: '',
        items: [],
        subtotal: 0,
        discountType: 'fixed',
        discountValue: 0,
        taxRate: 0,
        totalDue: 0,
        deposit: 0,
        balance: 0,
        notes_en: '',
        notes_es: '',
        terms_en: DEFAULT_TERMS,
        terms_es: '',
        colorSelections_en: '',
        colorSelections_es: '',
        clientSignature: null,
        signatureDate: '',
        status: 'draft',
        lastModified: Date.now(),
      });
    }
  };

  const handleDownloadPDF = () => {
    generatePDF(data, language || 'en');
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-slate-200 pb-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#C9A84C]">{t('est_title')}</h1>
            <p className="text-slate-500">{t('est_subtitle')}</p>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button 
              onClick={() => setActiveTab('builder')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${activeTab === 'builder' ? 'bg-[#C9A84C] text-white font-bold shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
            >
              <FileText className="w-4 h-4 mr-2" /> {t('est_tab_builder')}
            </button>
            <button 
              onClick={() => setActiveTab('saved')}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${activeTab === 'saved' ? 'bg-[#C9A84C] text-white font-bold shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
            >
              <List className="w-4 h-4 mr-2" /> {t('est_tab_saved')}
            </button>
          </div>
        </header>

        {activeTab === 'builder' ? (
          <div className="space-y-6 animate-fade-in">
            {/* Toolbar */}
            <div className="flex justify-end space-x-3 mb-4">
              <button onClick={handleNew} className="flex items-center px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded text-slate-700 transition-colors font-medium">
                <Plus className="w-4 h-4 mr-2" /> {t('est_new')}
              </button>
              <button onClick={handleSave} className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white transition-colors font-medium shadow-sm">
                <Save className="w-4 h-4 mr-2" /> {t('est_save')}
              </button>
              <button onClick={handleDownloadPDF} className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white transition-colors font-medium shadow-sm">
                <Download className="w-4 h-4 mr-2" /> {t('est_export')}
              </button>
            </div>

            <EstimateForm data={data} setData={setData} />
          </div>
        ) : (
          <SavedEstimates onLoad={handleLoad} />
        )}
      </div>
    </div>
  );
};

export default Estimator;
