import { useMemo, useState } from 'react';
import { formatNumber, getFeedFormulaStats } from '../utils/formulas';

const initialIngredient = () => ({ id: crypto.randomUUID(), name: '', quantity: '', cp: '', price: '' });

export default function FeedFormulaPage({ ingredients, updateIngredients }) {
  const [localIngredients, setLocalIngredients] = useState(ingredients);

  const stats = useMemo(() => getFeedFormulaStats(localIngredients), [localIngredients]);

  const handleChange = (id, field, value) => {
    const next = localIngredients.map((item) => (item.id === id ? { ...item, [field]: value } : item));
    setLocalIngredients(next);
    updateIngredients(next);
  };

  const addIngredient = () => {
    const next = [...localIngredients, initialIngredient()];
    setLocalIngredients(next);
    updateIngredients(next);
  };

  const removeIngredient = (id) => {
    const next = localIngredients.filter((item) => item.id !== id);
    setLocalIngredients(next);
    updateIngredients(next);
  };

  return (
    <div className="page">
      <section className="card">
        <div className="section-head">
          <h2>Feed Formula Builder</h2>
          <button className="btn btn-secondary" onClick={addIngredient}>Add Ingredient</button>
        </div>
        {localIngredients.map((ingredient) => (
          <div key={ingredient.id} className="list-item" style={{ marginBottom: '0.75rem' }}>
            <div className="row">
              <div className="input-group">
                <label>Ingredient</label>
                <input value={ingredient.name} onChange={(e) => handleChange(ingredient.id, 'name', e.target.value)} placeholder="Ingredient name" />
              </div>
              <div className="input-group">
                <label>Quantity</label>
                <input type="number" value={ingredient.quantity} onChange={(e) => handleChange(ingredient.id, 'quantity', Number(e.target.value))} />
              </div>
            </div>
            <div className="row">
              <div className="input-group">
                <label>CP %</label>
                <input type="number" value={ingredient.cp} onChange={(e) => handleChange(ingredient.id, 'cp', Number(e.target.value))} />
              </div>
              <div className="input-group">
                <label>Price/kg</label>
                <input type="number" value={ingredient.price} onChange={(e) => handleChange(ingredient.id, 'price', Number(e.target.value))} />
              </div>
            </div>
            <button className="btn btn-danger" onClick={() => removeIngredient(ingredient.id)}>Remove</button>
          </div>
        ))}
      </section>

      <section className="card result-box">
        <div className="section-head" style={{ color: 'white' }}>
          <h2>Formula Results</h2>
        </div>
        <div className="result-grid">
          <div className="result-item"><span className="small">Total Feed Weight</span><strong>{formatNumber(stats.totalFeedWeight)} kg</strong></div>
          <div className="result-item"><span className="small">Total Protein</span><strong>{formatNumber(stats.totalProtein)} kg</strong></div>
          <div className="result-item"><span className="small">Feed CP</span><strong>{formatNumber(stats.feedCp)}%</strong></div>
          <div className="result-item"><span className="small">Total Cost</span><strong>{formatNumber(stats.totalCost)} USD</strong></div>
          <div className="result-item"><span className="small">Cost per Kg</span><strong>{formatNumber(stats.costPerKg)} USD</strong></div>
        </div>
        {stats.totalFeedWeight !== 1000 && <div className="small" style={{ marginTop: '0.7rem' }}>Total feed weight must equal 1000 kg.</div>}
      </section>
    </div>
  );
}
