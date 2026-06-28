import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { EstimateData } from './types';
import { Eraser, CheckCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ContractSectionProps {
  data: EstimateData;
  setData: React.Dispatch<React.SetStateAction<EstimateData>>;
}

const ContractSection: React.FC<ContractSectionProps> = ({ data, setData }) => {
  const { t } = useApp();
  const sigCanvas = useRef<any>(null);

  const clearSignature = () => {
    sigCanvas.current.clear();
    setData(prev => ({ ...prev, clientSignature: null }));
  };

  const saveSignature = () => {
    if (sigCanvas.current.isEmpty()) {
      alert('Please provide a signature first.');
      return;
    }
    const signatureData = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setData(prev => ({ ...prev, clientSignature: signatureData }));
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mt-8">
      <h2 className="text-2xl font-serif font-bold text-[#C9A84C] mb-6 border-b border-slate-200 pb-2">{t('est_contract')}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Terms & Conditions */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{t('est_terms')} (EN)</label>
            <textarea
              value={data.terms_en}
              onChange={(e) => setData({ ...data, terms_en: e.target.value })}
              className="w-full h-32 bg-slate-50 border border-slate-300 rounded-lg p-4 text-slate-900 focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent resize-none font-mono text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{t('est_terms')} (ES)</label>
            <textarea
              value={data.terms_es}
              onChange={(e) => setData({ ...data, terms_es: e.target.value })}
              className="w-full h-32 bg-slate-50 border border-slate-300 rounded-lg p-4 text-slate-900 focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent resize-none font-mono text-sm"
            />
          </div>
        </div>

        {/* Color Selections & Signature */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t('est_colors')} (EN)</label>
              <textarea
                value={data.colorSelections_en}
                onChange={(e) => setData({ ...data, colorSelections_en: e.target.value })}
                placeholder="e.g., Living Room: SW 7005 Pure White (Satin)"
                className="w-full h-24 bg-slate-50 border border-slate-300 rounded-lg p-4 text-slate-900 focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">{t('est_colors')} (ES)</label>
              <textarea
                value={data.colorSelections_es}
                onChange={(e) => setData({ ...data, colorSelections_es: e.target.value })}
                placeholder="ej., Sala: SW 7005 Pure White (Satin)"
                className="w-full h-24 bg-slate-50 border border-slate-300 rounded-lg p-4 text-slate-900 focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent resize-none"
              />
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <label className="block text-sm font-medium text-[#C9A84C] mb-2">{t('est_signature')}</label>
            <div className="border border-slate-300 bg-white rounded-lg overflow-hidden mb-4 shadow-inner">
              <SignatureCanvas
                ref={sigCanvas}
                penColor="black"
                canvasProps={{ width: 500, height: 200, className: 'sigCanvas w-full h-48' }}
                onEnd={() => setIsSigned(false)} // Reset signed state if they draw again but haven't saved
              />
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <button
                  onClick={clearSignature}
                  className="flex items-center px-3 py-1.5 text-sm text-red-500 hover:text-red-600 transition-colors font-medium"
                >
                  <Eraser className="w-4 h-4 mr-1" /> {t('est_clear')}
                </button>
                <button
                  onClick={saveSignature}
                  className="flex items-center px-4 py-2 bg-[#C9A84C] text-white font-bold rounded hover:bg-yellow-600 transition-colors shadow-sm"
                >
                  <CheckCircle className="w-4 h-4 mr-2" /> {t('est_confirm')}
                </button>
              </div>
              
              {data.clientSignature && (
                <span className="text-green-600 text-sm font-bold flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" /> {t('est_signed')}
                </span>
              )}
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-500 mb-1">{t('est_date_signed')}</label>
              <input
                type="date"
                value={data.signatureDate}
                onChange={(e) => setData({ ...data, signatureDate: e.target.value })}
                className="bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 focus:ring-1 focus:ring-[#C9A84C]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractSection;
