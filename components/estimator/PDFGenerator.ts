import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { EstimateData } from './types';
import { Language } from '../../types';

export const generatePDF = (data: EstimateData, lang: Language = 'en') => {
  const doc = new jsPDF();
  const goldColor = '#C9A84C';
  const slateColor = '#1e293b'; // Slate-800

  // --- Header ---
  doc.setFillColor(slateColor);
  doc.rect(0, 0, 210, 40, 'F'); // Header background

  doc.setTextColor(goldColor);
  doc.setFontSize(22);
  doc.setFont('times', 'bold');
  doc.text('AED Remodeling LLC', 15, 20);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('123 Painter Lane, Cityville, ST 12345', 15, 28);
  doc.text('Phone: (571) 445-1287 | Email: aedremodeling@gmail.com', 15, 34);

  // --- Estimate Info ---
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('ESTIMATE', 150, 20);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Estimate #: ${data.estimateNumber}`, 150, 26);
  doc.text(`Date: ${data.estimateDate}`, 150, 32);

  // --- Client Info ---
  let yPos = 55;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Client:', 15, yPos);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPos += 6;
  doc.text(data.clientName, 15, yPos);
  yPos += 5;
  doc.text(data.clientAddress, 15, yPos);
  yPos += 5;
  doc.text(`${data.clientCity}, ${data.clientState} ${data.clientZip}`, 15, yPos);
  yPos += 5;
  doc.text(`Phone: ${data.clientPhone}`, 15, yPos);
  yPos += 5;
  doc.text(`Email: ${data.clientEmail}`, 15, yPos);

  // --- Project Info ---
  yPos = 55;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Project Details:', 110, yPos);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPos += 6;
  doc.text(`Type: ${data.projectType}`, 110, yPos);
  yPos += 5;
  doc.text(`Start Date: ${data.startDate}`, 110, yPos);
  yPos += 5;
  doc.text(`End Date: ${data.endDate}`, 110, yPos);

  // --- Description ---
  yPos = 90;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(lang === 'es' ? 'Descripción:' : 'Description:', 15, yPos);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  yPos += 6;
  const descText = lang === 'es' && data.description_es ? data.description_es : data.description_en;
  const splitDescription = doc.splitTextToSize(descText, 180);
  doc.text(splitDescription, 15, yPos);
  
  yPos += (splitDescription.length * 5) + 10;

  // --- Line Items Table ---
  const tableColumn = lang === 'es' ? ["Descripción", "Cant", "Precio", "Total"] : ["Description", "Qty", "Price", "Total"];
  const tableRows: any[] = [];

  data.items.forEach(item => {
    const itemDesc = lang === 'es' && item.description_es ? item.description_es : item.description_en;
    const itemData = [
      itemDesc,
      item.quantity,
      `$${item.price.toFixed(2)}`,
      `$${item.total.toFixed(2)}`
    ];
    tableRows.push(itemData);
  });

  autoTable(doc, {
    startY: yPos,
    head: [tableColumn],
    body: tableRows,
    headStyles: { fillColor: goldColor, textColor: [0, 0, 0], fontStyle: 'bold' },
    styles: { fontSize: 10, cellPadding: 3 },
    theme: 'grid',
  });

  // --- Totals ---
  // @ts-expect-error - lastAutoTable is added by the plugin but typescript might complain
  let finalY = (doc as any).lastAutoTable.finalY + 10;
  
  // Check if we need a new page for totals
  if (finalY > 250) {
    doc.addPage();
    finalY = 20;
  }

  const rightAlignX = 195;
  
  doc.setFontSize(10);
  doc.text(`Subtotal: $${data.subtotal.toFixed(2)}`, rightAlignX, finalY, { align: 'right' });
  finalY += 6;
  
  if (data.discountValue > 0) {
    const discountText = data.discountType === 'percent' 
      ? `Discount (${data.discountValue}%): -$${((data.subtotal * data.discountValue) / 100).toFixed(2)}`
      : `Discount: -$${data.discountValue.toFixed(2)}`;
    doc.text(discountText, rightAlignX, finalY, { align: 'right' });
    finalY += 6;
  }
  
  if (data.taxRate > 0) {
    const taxAmount = (data.subtotal - (data.discountType === 'fixed' ? data.discountValue : (data.subtotal * data.discountValue / 100))) * (data.taxRate / 100);
    doc.text(`Tax (${data.taxRate}%): $${taxAmount.toFixed(2)}`, rightAlignX, finalY, { align: 'right' });
    finalY += 6;
  }
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text(`Total Due: $${data.totalDue.toFixed(2)}`, rightAlignX, finalY, { align: 'right' });
  finalY += 8;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Deposit Required (50%): $${data.deposit.toFixed(2)}`, rightAlignX, finalY, { align: 'right' });
  finalY += 6;
  doc.text(`Balance Due: $${data.balance.toFixed(2)}`, rightAlignX, finalY, { align: 'right' });

  // --- Contract Section ---
  doc.addPage();
  
  doc.setFillColor(slateColor);
  doc.rect(0, 0, 210, 20, 'F');
  doc.setTextColor(goldColor);
  doc.setFontSize(16);
  doc.setFont('times', 'bold');
  doc.text('Contract Agreement', 15, 13);

  let contractY = 30;
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');

  // Terms
  doc.setFont('helvetica', 'bold');
  doc.text(lang === 'es' ? 'Términos y Condiciones:' : 'Terms & Conditions:', 15, contractY);
  contractY += 6;
  doc.setFont('helvetica', 'normal');
  const termsText = lang === 'es' && data.terms_es ? data.terms_es : data.terms_en;
  const splitTerms = doc.splitTextToSize(termsText, 180);
  doc.text(splitTerms, 15, contractY);
  contractY += (splitTerms.length * 5) + 10;

  // Color Selections
  doc.setFont('helvetica', 'bold');
  doc.text(lang === 'es' ? 'Selecciones de Color:' : 'Color Selections:', 15, contractY);
  contractY += 6;
  doc.setFont('helvetica', 'normal');
  const colorsText = lang === 'es' && data.colorSelections_es ? data.colorSelections_es : data.colorSelections_en;
  const splitColors = doc.splitTextToSize(colorsText, 180);
  doc.text(splitColors, 15, contractY);
  contractY += (splitColors.length * 5) + 20;

  // Signature
  if (data.clientSignature) {
    doc.setFont('helvetica', 'bold');
    doc.text('Client Signature:', 15, contractY);
    contractY += 5;
    doc.addImage(data.clientSignature, 'PNG', 15, contractY, 60, 30);
    contractY += 35;
    doc.setFont('helvetica', 'normal');
    doc.text(`Date: ${data.signatureDate}`, 15, contractY);
  } else {
    doc.text('Client Signature: __________________________', 15, contractY);
    contractY += 10;
    doc.text('Date: __________________________', 15, contractY);
  }

  doc.save(`Estimate_${data.estimateNumber}.pdf`);
};
