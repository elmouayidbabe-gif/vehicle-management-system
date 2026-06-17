import { useState, useEffect } from 'react';
import { getAvailableVehicles, searchVehicles, createPurchase } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function CataloguePage() {
  const [vehicles, setVehicles] = useState([]);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [payment, setPayment] = useState({ method: 'BANKILI', phone: '' });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const res = await getAvailableVehicles();
      setVehicles(res.data);
    } catch (e) { console.error(e); }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      if (query.trim()) {
        const res = await searchVehicles(query);
        setVehicles(res.data.filter(v => v.statut === 'disponible'));
      } else {
        loadVehicles();
      }
    } catch (e) { console.error(e); }
  };

  const handleBuy = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      await createPurchase({
        vehicleId: selected.id,
        userId: user.id,
        paymentMethod: payment.method,
        phoneNumber: payment.phone,
      });
      setMsg(`✅ Achat confirmé ! Paiement via ${payment.method} au ${payment.phone}`);
      setSelected(null);
      loadVehicles();
      setTimeout(() => setMsg(''), 5000);
    } catch (err) {
      setMsg('❌ ' + (err.response?.data || 'Erreur lors de l\'achat'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="catalogue-container">
        <h2 className="page-title">🚗 Catalogue des Véhicules</h2>

        {msg && <div className={`alert ${msg.startsWith('✅') ? 'alert-success' : 'alert-danger'} mb-3`}>{msg}</div>}

        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher par marque ou modèle..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">🔍 Rechercher</button>
          {query && <button type="button" className="btn btn-outline" onClick={() => { setQuery(''); loadVehicles(); }}>✕</button>}
        </form>

        {vehicles.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p>Aucun véhicule disponible pour le moment.</p>
          </div>
        ) : (
          <div className="vehicle-grid">
            {vehicles.map(v => (
              <div key={v.id} className="vehicle-card">
                <div className="vehicle-card-header">
                  <span className="vehicle-icon">🚙</span>
                  <span className="badge badge-success">Disponible</span>
                </div>
                <h3>{v.marque} {v.modele}</h3>
                <div className="vehicle-details">
                  <span>📅 {v.annee}</span>
                  <span>🔖 {v.immatriculation}</span>
                </div>
                {v.description && <p className="vehicle-desc">{v.description}</p>}
                <div className="vehicle-price">{v.prix?.toLocaleString()} MRU</div>
                <button
                  className="btn btn-primary w-100"
                  onClick={() => { setSelected(v); setMsg(''); }}
                >
                  💳 Acheter
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Payment Modal */}
        {selected && (
          <div className="modal-overlay" onClick={() => setSelected(null)}>
            <div className="modal-box" onClick={e => e.stopPropagation()}>
              <h3>💳 Paiement</h3>
              <div className="modal-vehicle-info">
                <strong>{selected.marque} {selected.modele} ({selected.annee})</strong>
                <div className="modal-price">{selected.prix?.toLocaleString()} MRU</div>
              </div>

              <form onSubmit={handleBuy}>
                <div className="form-group">
                  <label>Méthode de paiement</label>
                  <div className="payment-options">
                    <label className={`payment-option ${payment.method === 'BANKILI' ? 'selected' : ''}`}>
                      <input type="radio" name="method" value="BANKILI"
                        checked={payment.method === 'BANKILI'}
                        onChange={e => setPayment({ ...payment, method: e.target.value })} />
                      <div className="payment-logo bankili">
                        <span>🏦</span>
                        <span>Bankili</span>
                      </div>
                    </label>
                    <label className={`payment-option ${payment.method === 'SEDAD' ? 'selected' : ''}`}>
                      <input type="radio" name="method" value="SEDAD"
                        checked={payment.method === 'SEDAD'}
                        onChange={e => setPayment({ ...payment, method: e.target.value })} />
                      <div className="payment-logo sedad">
                        <span>📱</span>
                        <span>Sedad</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label>Numéro de téléphone {payment.method}</label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder={`Ex: +222 XX XX XX XX`}
                    value={payment.phone}
                    onChange={e => setPayment({ ...payment, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-outline" onClick={() => setSelected(null)}>Annuler</button>
                  <button type="submit" className="btn btn-success" disabled={loading}>
                    {loading ? 'Traitement...' : `✅ Confirmer l'achat`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
