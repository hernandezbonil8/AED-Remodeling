import React, { useState } from 'react';
import { EstimateData } from './types';
import { Trash2, Edit, FileText } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface SavedEstimatesProps {
  onLoad: (estimate: EstimateData) => void;
}

const SavedEstimates: React.FC<SavedEstimatesProps> = ({ onLoad }) => {
  const { t } = useApp();
  const [estimates, setEstimates] = useState<EstimateData[]>(() => {
    const saved = localStorage.getItem('gmi_estimates');
    return saved ? JSON.parse(saved) : [];
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this estimate?')) {
      const updated = estimates.filter(e => e.id !== id);
      setEstimates(updated);
      localStorage.setItem('gmi_estimates', JSON.stringify(updated));
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-2xl font-serif font-bold text-[#C9A84C] mb-6">{t('est_tab_saved')}</h2>
      
      {estimates.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No saved estimates found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {estimates.map((est) => (
            <div key={est.id} className="bg-slate-50 border border-slate-200 rounded-lg p-4 hover:border-[#C9A84C] transition-colors group shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-bold text-slate-900">{est.clientName || 'Unnamed Client'}</h3>
                  <p className="text-sm text-slate-500">{est.estimateNumber}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs uppercase font-bold ${est.status === 'saved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {est.status}
                </span>
              </div>
              
              <div className="text-sm text-slate-600 mb-4">
                <p>Date: {est.estimateDate}</p>
                <p>Total: ${est.totalDue.toFixed(2)}</p>
              </div>

              <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => onLoad(est)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors shadow-sm"
                  title="Edit"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(est.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors shadow-sm"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedEstimates;
