import React, { useState } from 'react';
import { EstimateData, LineItem } from './types';
import ContractSection from './ContractSection';
import { translateText } from '../../services/geminiService';
import { Plus, Trash2, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface EstimateFormProps {
  data: EstimateData;
  setData: React.Dispatch<React.SetStateAction<EstimateData>>;
}

const EstimateForm: React.FC<EstimateFormProps> = ({ data, setData }) => {
  const { t } = useApp();
  const [isTranslating, setIsTranslating] = useState(false);

  const updateDataWithCalculations = (newData: EstimateData) => {
    const subtotal = newData.items.reduce((sum, item) => sum + item.total, 0);
    const discountAmount = newData.discountType === 'fixed' 
      ? newData.discountValue 
      : subtotal * (newData.discountValue / 100);
    const taxableAmount = Math.max(0, subtotal - discountAmount);
    const taxAmount = taxableAmount * (newData.taxRate / 100);
    const totalDue = taxableAmount + taxAmount;
    const deposit = totalDue * 0.5;
    const balance = totalDue - deposit;

    setData({
      ...newData,
      subtotal,
      totalDue,
      deposit,
      balance
    });
  };

  const handleTranslateAll = async () => {
    setIsTranslating(true);
    try {
      const translatedData = { ...data };

      if (data.description_en) {
        translatedData.description_es = await translateText(data.description_en, 'es');
      }
      
      if (data.notes_en) {
        translatedData.notes_es = await translateText(data.notes_en, 'es');
      }

      if (data.terms_en) {
        translatedData.terms_es = await translateText(data.terms_en, 'es');
      }

      if (data.colorSelections_en) {
        translatedData.colorSelections_es = await translateText(data.colorSelections_en, 'es');
      }

      // Translate all line items
      const translatedItems = await Promise.all(
        data.items.map(async (item) => {
          if (item.description_en) {
            return { ...item, description_es: await translateText(item.description_en, 'es') };
          }
          return item;
        })
      );
      translatedData.items = translatedItems;

      updateDataWithCalculations(translatedData);
    } finally {
      setIsTranslating(false);
    }
  };

  const addLineItem = () => {
    const newItem: LineItem = {
      id: crypto.randomUUID(),
      description_en: '',
      description_es: '',
      quantity: 1,
      price: 0,
      total: 0
    };
    updateDataWithCalculations({ ...data, items: [...data.items, newItem] });
  };

  const updateLineItem = (id: string, field: keyof LineItem, value: string | number) => {
    const newItems = data.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'price') {
          updatedItem.total = Number(updatedItem.quantity) * Number(updatedItem.price);
        }
        return updatedItem;
      }
      return item;
    });
    updateDataWithCalculations({ ...data, items: newItems });
  };

  const removeLineItem = (id: string) => {
    const newItems = data.items.filter(item => item.id !== id);
    updateDataWithCalculations({ ...data, items: newItems });
  };

  return (
    <div className="space-y-8">
      {/* Client Info */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-serif font-bold text-[#C9A84C] mb-4 flex items-center">
          {t('est_client_info')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Client Name"
            value={data.clientName}
            onChange={(e) => setData({ ...data, clientName: e.target.value })}
            className="bg-slate-50 border border-slate-300 rounded px-4 py-2 text-slate-900 focus:ring-1 focus:ring-[#C9A84C]"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={data.clientEmail}
            onChange={(e) => setData({ ...data, clientEmail: e.target.value })}
            className="bg-slate-50 border border-slate-300 rounded px-4 py-2 text-slate-900 focus:ring-1 focus:ring-[#C9A84C]"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={data.clientPhone}
            onChange={(e) => setData({ ...data, clientPhone: e.target.value })}
            className="bg-slate-50 border border-slate-300 rounded px-4 py-2 text-slate-900 focus:ring-1 focus:ring-[#C9A84C]"
          />
          <input
            type="text"
            placeholder="Street Address"
            value={data.clientAddress}
            onChange={(e) => setData({ ...data, clientAddress: e.target.value })}
            className="bg-slate-50 border border-slate-300 rounded px-4 py-2 text-slate-900 focus:ring-1 focus:ring-[#C9A84C]"
          />
          <div className="grid grid-cols-3 gap-2 md:col-span-2">
            <input
              type="text"
              placeholder="City"
              value={data.clientCity}
              onChange={(e) => setData({ ...data, clientCity: e.target.value })}
              className="bg-slate-50 border border-slate-300 rounded px-4 py-2 text-slate-900 focus:ring-1 focus:ring-[#C9A84C]"
            />
            <input
              type="text"
              placeholder="State"
              value={data.clientState}
              onChange={(e) => setData({ ...data, clientState: e.target.value })}
              className="bg-slate-50 border border-slate-300 rounded px-4 py-2 text-slate-900 focus:ring-1 focus:ring-[#C9A84C]"
            />
            <input
              type="text"
              placeholder="Zip Code"
              value={data.clientZip}
              onChange={(e) => setData({ ...data, clientZip: e.target.value })}
              className="bg-slate-50 border border-slate-300 rounded px-4 py-2 text-slate-900 focus:ring-1 focus:ring-[#C9A84C]"
            />
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-xl font-serif font-bold text-[#C9A84C] mb-4">{t('est_project_details')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block text-xs text-slate-500 mb-1">Estimate Number</label>
            <input
              type="text"
              value={data.estimateNumber}
              readOnly
              className="w-full bg-slate-100 border border-slate-300 rounded px-4 py-2 text-slate-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Estimate Date</label>
            <input
              type="date"
              value={data.estimateDate}
              onChange={(e) => setData({ ...data, estimateDate: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-2 text-slate-900 focus:ring-1 focus:ring-[#C9A84C]"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Project Type</label>
            <select
              value={data.projectType}
              onChange={(e) => setData({ ...data, projectType: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-2 text-slate-900 focus:ring-1 focus:ring-[#C9A84C]"
            >
              <option value="Interior">Interior Painting</option>
              <option value="Exterior">Exterior Painting</option>
              <option value="Cabinetry">Cabinet Refinishing</option>
              <option value="Commercial">Commercial</option>
              <option value="Deck/Fence">Deck & Fence</option>
            </select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
           <div>
            <label className="block text-xs text-slate-500 mb-1">Start Date</label>
            <input
              type="date"
              value={data.startDate}
              onChange={(e) => setData({ ...data, startDate: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-2 text-slate-900 focus:ring-1 focus:ring-[#C9A84C]"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">End Date</label>
            <input
              type="date"
              value={data.endDate}
              onChange={(e) => setData({ ...data, endDate: e.target.value })}
              className="w-full bg-slate-50 border border-slate-300 rounded px-4 py-2 text-slate-900 focus:ring-1 focus:ring-[#C9A84C]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <label className="block text-xs text-slate-500 mb-1">{t('est_desc')} (EN)</label>
            <textarea
              value={data.description_en}
              onChange={(e) => setData({ ...data, description_en: e.target.value })}
              className="w-full h-32 bg-slate-50 border border-slate-300 rounded p-4 text-slate-900 focus:ring-1 focus:ring-[#C9A84C]"
              placeholder="Detailed description of the work to be performed..."
            />
          </div>
          <div className="relative">
            <label className="block text-xs text-slate-500 mb-1">{t('est_desc')} (ES)</label>
            <textarea
              value={data.description_es}
              onChange={(e) => setData({ ...data, description_es: e.target.value })}
              className="w-full h-32 bg-slate-50 border border-slate-300 rounded p-4 text-slate-900 focus:ring-1 focus:ring-[#C9A84C]"
              placeholder="Descripción detallada..."
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={handleTranslateAll}
            disabled={isTranslating}
            className="text-sm bg-[#C9A84C] hover:bg-yellow-600 text-white font-bold px-4 py-2 rounded flex items-center transition-colors shadow-sm disabled:opacity-50"
          >
            <Globe className="w-4 h-4 mr-2" />
            {isTranslating ? 'Translating Document...' : 'Translate All to Spanish'}
          </button>
        </div>
      </div>

      {/* Line Items */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-serif font-bold text-[#C9A84C]">{t('est_line_items')}</h3>
          <button
            onClick={addLineItem}
            className="flex items-center px-3 py-1.5 bg-[#C9A84C] text-white font-bold rounded hover:bg-yellow-600 transition-colors text-sm shadow-sm"
          >
            <Plus className="w-4 h-4 mr-1" /> {t('est_add_item')}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-sm uppercase bg-slate-50">
                <th className="py-3 px-2 w-1/2 rounded-tl-lg">{t('est_desc')}</th>
                <th className="py-3 px-2 w-20 text-center">{t('est_qty')}</th>
                <th className="py-3 px-2 w-32 text-right">{t('est_price')}</th>
                <th className="py-3 px-2 w-32 text-right">{t('est_total')}</th>
                <th className="py-3 px-2 w-10 rounded-tr-lg"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.items.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="p-2 space-y-1">
                    <input
                      type="text"
                      value={item.description_en}
                      onChange={(e) => updateLineItem(item.id, 'description_en', e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-slate-900 placeholder-slate-400 text-sm"
                      placeholder="Item description (EN)..."
                    />
                    <input
                      type="text"
                      value={item.description_es}
                      onChange={(e) => updateLineItem(item.id, 'description_es', e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-2 py-1 text-slate-900 placeholder-slate-400 text-sm"
                      placeholder="Item description (ES)..."
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => updateLineItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full bg-white border border-slate-300 rounded px-2 py-1 text-center text-slate-900 focus:ring-1 focus:ring-[#C9A84C]"
                    />
                  </td>
                  <td className="p-2">
                    <div className="relative">
                      <span className="absolute left-2 top-1.5 text-slate-500">$</span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => updateLineItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                        className="w-full bg-white border border-slate-300 rounded pl-6 pr-2 py-1 text-right text-slate-900 focus:ring-1 focus:ring-[#C9A84C]"
                      />
                    </div>
                  </td>
                  <td className="p-2 text-right font-mono text-[#C9A84C] font-bold">
                    ${item.total.toFixed(2)}
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => removeLineItem(item.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {data.items.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500 italic">
                    No items added yet. Click "Add Item" to begin.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Calculations */}
        <div className="mt-6 flex flex-col md:flex-row justify-end items-end space-y-4 md:space-y-0">
          <div className="w-full md:w-1/3 bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-3">
            <div className="flex justify-between text-slate-600">
              <span>{t('est_subtotal')}:</span>
              <span className="font-medium text-slate-900">${data.subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center text-slate-600">
              <div className="flex items-center space-x-2">
                <span>{t('est_discount')}:</span>
                <select
                  value={data.discountType}
                  onChange={(e) => updateDataWithCalculations({ ...data, discountType: e.target.value as 'fixed' | 'percent' })}
                  className="bg-white border border-slate-300 rounded text-xs px-1 py-0.5 focus:ring-0 text-slate-900"
                >
                  <option value="fixed">$</option>
                  <option value="percent">%</option>
                </select>
              </div>
              <input
                type="number"
                min="0"
                value={data.discountValue}
                onChange={(e) => updateDataWithCalculations({ ...data, discountValue: parseFloat(e.target.value) || 0 })}
                className="w-20 bg-white border border-slate-300 rounded px-2 py-1 text-right text-sm focus:ring-1 focus:ring-[#C9A84C] text-slate-900"
              />
            </div>

            <div className="flex justify-between items-center text-slate-600">
              <span>{t('est_tax')}:</span>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={data.taxRate}
                onChange={(e) => updateDataWithCalculations({ ...data, taxRate: parseFloat(e.target.value) || 0 })}
                className="w-20 bg-white border border-slate-300 rounded px-2 py-1 text-right text-sm focus:ring-1 focus:ring-[#C9A84C] text-slate-900"
              />
            </div>

            <div className="border-t border-slate-200 pt-3 flex justify-between text-xl font-bold text-[#C9A84C]">
              <span>{t('est_total_due')}:</span>
              <span>${data.totalDue.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-slate-500 text-sm">
              <span>{t('est_deposit')}:</span>
              <span>${data.deposit.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-slate-500 text-sm">
              <span>{t('est_balance')}:</span>
              <span>${data.balance.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contract Section */}
      <ContractSection data={data} setData={setData} />
    </div>
  );
};

export default EstimateForm;
