export const saveFormToLocalStorage = (key: string, data: any) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error("Failed to save form data:", error);
  }
};

export const loadFormFromLocalStorage = (key: string) => {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return null;
    return JSON.parse(saved);
  } catch (error) {
    console.error("Failed to load form data:", error);
    return null;
  }
};

export const clearFormFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};
