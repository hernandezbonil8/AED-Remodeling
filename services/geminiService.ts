export const translateText = async (text: string, targetLang: 'en' | 'es'): Promise<string> => {
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        text, 
        targetLanguage: targetLang === 'en' ? 'English' : 'Spanish' 
      }),
    });

    if (!response.ok) {
      console.warn("Translation API failed. Fallback to original text.");
      return text;
    }

    const data = await response.json();
    return data.translation || text;
  } catch (error) {
    console.error("Translation error:", error);
    return text; // Fallback to original text
  }
};
