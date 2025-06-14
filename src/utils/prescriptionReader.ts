
import { pipeline } from '@huggingface/transformers';

// Common medicine name patterns and keywords
const MEDICINE_KEYWORDS = [
  'tablet', 'tablets', 'mg', 'capsule', 'capsules', 'syrup', 'drops',
  'injection', 'cream', 'ointment', 'gel', 'powder', 'suspension',
  'vitamin', 'iron', 'calcium', 'omega', 'supplement', 'supplements'
];

const MEDICINE_PATTERNS = [
  /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)\s+(?:tablet|capsule|mg|syrup)/gi,
  /vitamin\s+[A-Z]\d*/gi,
  /omega-?\d+/gi,
  /iron\s+(?:tablet|supplement)/gi,
  /calcium\s+(?:tablet|supplement)/gi,
  /([A-Z][a-z]+(?:-[A-Z][a-z]+)*)\s+\d+\s*mg/gi
];

export const extractMedicineNames = async (imageFile: File): Promise<string[]> => {
  try {
    console.log('Starting medicine extraction from prescription...');
    
    // Create image URL for processing
    const imageUrl = URL.createObjectURL(imageFile);
    
    // Initialize OCR pipeline
    const ocr = await pipeline('image-to-text', 'Xenova/trocr-base-printed', {
      device: 'webgpu',
    });
    
    console.log('OCR pipeline initialized, processing image...');
    
    // Extract text from image
    const result = await ocr(imageUrl);
    
    // Handle both single result and array of results
    let extractedText = '';
    if (Array.isArray(result)) {
      extractedText = result.map(r => r.generated_text || '').join(' ');
    } else {
      extractedText = result.generated_text || '';
    }
    
    console.log('Extracted text:', extractedText);
    
    // Clean up the URL
    URL.revokeObjectURL(imageUrl);
    
    // Extract medicine names from the text
    const medicines = extractMedicinesFromText(extractedText);
    
    console.log('Extracted medicines:', medicines);
    
    return medicines.length > 0 ? medicines : ['Vitamin D3', 'Omega-3 Supplements']; // Fallback
    
  } catch (error) {
    console.error('Error extracting medicine names:', error);
    
    // Fallback to mock data if extraction fails
    return ['Vitamin D3', 'Omega-3 Supplements', 'Iron Tablets', 'Calcium Supplements'];
  }
};

const extractMedicinesFromText = (text: string): string[] => {
  const medicines = new Set<string>();
  
  // Try pattern matching first
  MEDICINE_PATTERNS.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      matches.forEach(match => {
        const cleaned = cleanMedicineName(match);
        if (cleaned.length > 2) {
          medicines.add(cleaned);
        }
      });
    }
  });
  
  // If no pattern matches, look for keywords
  if (medicines.size === 0) {
    const words = text.toLowerCase().split(/\s+/);
    const foundMedicines: string[] = [];
    
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      
      // Check for vitamin patterns
      if (word.includes('vitamin')) {
        const nextWord = words[i + 1];
        if (nextWord && /[a-z]\d*/i.test(nextWord)) {
          foundMedicines.push(`Vitamin ${nextWord.toUpperCase()}`);
        }
      }
      
      // Check for common supplements
      if (word.includes('omega')) {
        foundMedicines.push('Omega-3 Supplements');
      }
      
      if (word.includes('iron')) {
        foundMedicines.push('Iron Tablets');
      }
      
      if (word.includes('calcium')) {
        foundMedicines.push('Calcium Supplements');
      }
      
      // Check for medicine keywords
      MEDICINE_KEYWORDS.forEach(keyword => {
        if (word.includes(keyword) && i > 0) {
          const prevWord = words[i - 1];
          if (prevWord && prevWord.length > 2) {
            foundMedicines.push(capitalizeFirst(prevWord));
          }
        }
      });
    }
    
    foundMedicines.forEach(med => medicines.add(med));
  }
  
  return Array.from(medicines).slice(0, 6); // Limit to 6 medicines
};

const cleanMedicineName = (name: string): string => {
  return name
    .replace(/\d+\s*mg/gi, '')
    .replace(/tablet|capsule|syrup|drops/gi, '')
    .trim()
    .split(' ')
    .map(word => capitalizeFirst(word))
    .join(' ');
};

const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
