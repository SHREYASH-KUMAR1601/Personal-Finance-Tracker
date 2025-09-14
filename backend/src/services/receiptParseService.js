const fs = require('fs');
const pdfParse = require('pdf-parse');
const Tesseract = require('tesseract.js');

const tryParseFloat = (s) => {
  const n = parseFloat(String(s).replace(/,/g, ''));
  return Number.isFinite(n) ? n : null;
};

const extractFields = (text) => {
  if (!text) return { amountMinor: null, currency: 'INR', category: 'Misc', merchant: '', date: null };

  // amount: prefer lines with "total/amount", else first number
  const m1 = text.match(/(?:grand\s*total|total\s*amount|amount|total)[^\d]{0,12}(\d+(?:[.,]\d{2})?)/i);
  const m2 = text.match(/\b(\d+(?:[.,]\d{2})?)\b/);
  const amt = tryParseFloat((m1 && m1[1]) || (m2 && m2[1]));
  const amountMinor = amt != null ? Math.round(amt * 100) : null;

  // date (simple dd-mm-yyyy / yyyy-mm-dd / dd/mm/yyyy)
  const d = text.match(/\b(\d{4}[-/]\d{2}[-/]\d{2}|\d{2}[-/]\d{2}[-/]\d{4})\b/);
  const date = d ? new Date(d[1].replace(/-/g, '/')) : null;

  // merchant: first non-empty line (rough)
  const firstLine = (text.split('\n').map(s => s.trim()).filter(Boolean)[0]) || '';

  return {
    amountMinor,
    currency: 'INR',
    category: 'Misc',
    merchant: firstLine.slice(0, 100),
    date
  };
};

exports.readToText = async (filePath, mimeType) => {
  if (mimeType === 'application/pdf') {
    const buf = fs.readFileSync(filePath);
    const data = await pdfParse(buf);
    return data.text || '';
  }
  const ocr = await Tesseract.recognize(filePath, 'eng');
  return ocr.data.text || '';
};

exports.parseFile = async ({ path, mimetype }) => {
  const text = await exports.readToText(path, mimetype);
  const parsed = extractFields(text);
  return { text, parsed };
};

exports.extractFields = extractFields;
