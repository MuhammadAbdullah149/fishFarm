const STORAGE_KEY = 'fish-feed-calculator-pro-data';

const defaultData = () => ({
  pools: [],
  formulaIngredients: [
    { id: crypto.randomUUID(), name: 'Soybean Meal', quantity: 0, cp: 0, price: 0 },
    { id: crypto.randomUUID(), name: 'Fish Meal', quantity: 0, cp: 0, price: 0 },
    { id: crypto.randomUUID(), name: 'Rice Polish', quantity: 0, cp: 0, price: 0 },
  ],
  settings: {
    darkMode: false,
  },
});

export const loadAppData = () => {
  if (typeof window === 'undefined') return defaultData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    const parsed = JSON.parse(raw);
    return {
      pools: parsed.pools || [],
      formulaIngredients: parsed.formulaIngredients || defaultData().formulaIngredients,
      settings: { ...defaultData().settings, ...(parsed.settings || {}) },
    };
  } catch {
    return defaultData();
  }
};

export const saveAppData = (data) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const resetAppData = () => {
  const fresh = defaultData();
  saveAppData(fresh);
  return fresh;
};

export const importAppData = (jsonString) => {
  const parsed = JSON.parse(jsonString);
  const fresh = {
    pools: parsed.pools || [],
    formulaIngredients: parsed.formulaIngredients || defaultData().formulaIngredients,
    settings: { ...defaultData().settings, ...(parsed.settings || {}) },
  };
  saveAppData(fresh);
  return fresh;
};

export const exportAppData = (data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'fish-feed-data.json';
  link.click();
  URL.revokeObjectURL(url);
};
