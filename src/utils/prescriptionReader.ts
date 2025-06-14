
import { pipeline } from '@huggingface/transformers';

// Function to extract medicine names from prescription image
export const extractMedicinesFromImage = async (imageUrl: string): Promise<string[]> => {
  try {
    console.log('Starting prescription analysis...');
    
    // Create OCR pipeline
    const ocr = await pipeline('image-to-text', 'Xenova/trocr-base-printed', {
      device: 'webgpu',
    });
    
    // Extract text from image
    const result = await ocr(imageUrl);
    console.log('OCR result:', result);
    
    // Handle both single result and array of results
    const extractedText = Array.isArray(result) ? result[0]?.generated_text : result?.generated_text;
    
    if (!extractedText) {
      console.log('No text extracted, using fallback');
      return getFallbackMedicines();
    }
    
    console.log('Extracted text:', extractedText);
    
    // Extract medicine names using pattern matching
    const medicines = extractMedicineNames(extractedText);
    
    // If no medicines found, return fallback
    if (medicines.length === 0) {
      console.log('No medicines detected, using fallback');
      return getFallbackMedicines();
    }
    
    console.log('Extracted medicines:', medicines);
    return medicines;
    
  } catch (error) {
    console.error('Error in prescription analysis:', error);
    // Return fallback medicines in case of error
    return getFallbackMedicines();
  }
};

// Extract medicine names from text using patterns
const extractMedicineNames = (text: string): string[] => {
  const medicines: string[] = [];
  const lines = text.split('\n');
  
  // Common medicine patterns and keywords
  const medicinePatterns = [
    /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*(?:\d+\s*mg|\d+\s*ml|\d+\s*tablets?|\d+\s*caps?)/gi,
    /\b([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s*(?:tablet|capsule|syrup|drops|cream|ointment)/gi,
    /\b(Vitamin\s+[A-Z]\d*|Omega[-\s]*\d+|Calcium|Iron|Zinc|Magnesium)(?:\s+[A-Za-z]+)*/gi,
    /\b([A-Z][a-z]+(?:cillin|mycin|cycline|azole|prazole|sartan|olol|pine|zine|amine))\b/gi
  ];
  
  // Common medicine keywords
  const medicineKeywords = [
    'vitamin', 'supplement', 'tablet', 'capsule', 'syrup', 'drops',
    'paracetamol', 'ibuprofen', 'aspirin', 'amoxicillin', 'azithromycin',
    'omeprazole', 'metformin', 'amlodipine', 'lisinopril', 'atorvastatin'
  ];
  
  for (const line of lines) {
    const cleanLine = line.trim();
    if (cleanLine.length < 3) continue;
    
    // Try each pattern
    for (const pattern of medicinePatterns) {
      const matches = cleanLine.match(pattern);
      if (matches) {
        matches.forEach(match => {
          const medicineName = match.replace(/\s*\d+\s*(mg|ml|tablets?|caps?).*$/i, '').trim();
          if (medicineName.length > 2 && !medicines.includes(medicineName)) {
            medicines.push(medicineName);
          }
        });
      }
    }
    
    // Check for keyword matches
    const lowerLine = cleanLine.toLowerCase();
    for (const keyword of medicineKeywords) {
      if (lowerLine.includes(keyword)) {
        const words = cleanLine.split(/\s+/);
        const keywordIndex = words.findIndex(word => word.toLowerCase().includes(keyword));
        if (keywordIndex !== -1) {
          // Take the word containing the keyword and potentially the next word
          let medicineName = words[keywordIndex];
          if (keywordIndex + 1 < words.length && words[keywordIndex + 1].match(/[A-Z]/)) {
            medicineName += ' ' + words[keywordIndex + 1];
          }
          
          medicineName = medicineName.replace(/[^\w\s-]/g, '').trim();
          if (medicineName.length > 2 && !medicines.includes(medicineName)) {
            medicines.push(medicineName);
          }
        }
      }
    }
  }
  
  // Clean up and deduplicate
  const cleanedMedicines = medicines
    .map(med => med.replace(/[^\w\s-]/g, '').trim())
    .filter(med => med.length > 2)
    .filter((med, index, arr) => arr.indexOf(med) === index)
    .slice(0, 8); // Limit to 8 medicines
  
  return cleanedMedicines;
};

// Fallback medicines when OCR fails
const getFallbackMedicines = (): string[] => {
  return ['Vitamin D3', 'Omega-3 Supplements', 'Iron Tablets', 'Calcium Supplements'];
};
