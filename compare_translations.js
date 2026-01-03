const fs = require('fs');
const path = require('path');

// Use relative paths directly from the project root
const itTranslationsPath = 'public/locales/it/translation.json';
const enTranslationsPath = 'public/locales/en/translation.json';

function readJsonFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading or parsing ${filePath}:`, error.message);
    return null;
  }
}

function findMissingKeys(source, target, prefix = '') {
  const missingKeys = [];
  for (const key in source) {
    const sourceValue = source[key];
    const targetValue = target ? target[key] : undefined;
    const currentPath = prefix ? `${prefix}.${key}` : key;

    if (typeof sourceValue === 'object' && sourceValue !== null && !Array.isArray(sourceValue)) {
      if (typeof targetValue !== 'object' || targetValue === null || Array.isArray(targetValue)) {
        // If source is an object but target is not an object or is an array,
        // then all subkeys are missing or incorrectly translated in target.
        // We'll just mark the parent key as missing for simplicity in this case.
        missingKeys.push(currentPath);
      } else {
        missingKeys.push(...findMissingKeys(sourceValue, targetValue, currentPath));
      }
    } else {
      if (!(key in target)) {
        missingKeys.push(currentPath);
      }
    }
  }
  return missingKeys;
}


const itTranslations = readJsonFile(itTranslationsPath);
const enTranslations = readJsonFile(enTranslationsPath);

if (itTranslations && enTranslations) {
  const missingInEn = findMissingKeys(itTranslations, enTranslations);

  if (missingInEn.length > 0) {
    console.log('The following keys are present in Italian (it) but missing or not fully translated in English (en):');
    missingInEn.forEach(key => console.log(`- ${key}`));
  } else {
    console.log('All keys in Italian (it) translation file have corresponding entries in English (en) translation file.');
  }
}