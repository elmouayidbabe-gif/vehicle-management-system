import { useState, useEffect } from 'react';
import { getAllVehicles, createVehicle, updateVehicle, deleteVehicle, getAllPurchases } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const empty = { marque: '', modele: '', annee: '', immatriculation: '', prix: '', statut: 'disponible', description: '' };

export default function AdminPage() {
  const [vehicles, setVehicles] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('vehicles');
  const [msg, setMsg] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') { navigate('/login'); return; }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [vRes, pRes] = await Promise.all([getAllVehicles(), getAllPurchases()]);
      setVehicles(vRes.data);
      setPurchases(pRes.data);
    } catch (e) { console.error(e); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateVehicle(editing, form);
        setMsg('✅ Véhicule modifié avec succès');
      } else {
        await createVehicle(form);
        setMsg('✅ Véhicule ajouté avec succès');
      }
      setForm(empty); setEditing(null); setShowForm(false);
      loadData();
      setTimeout(() => setMsg(''), 3000);
    } catch (e) { setMsg('❌ Erreur: ' + (e.response?.data || e.message)); }
  };

  const handleEdit = (v) => {
    setForm({ ...v });
    setEditing(v.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce véhicule ?')) return;
    try {
      await deleteVehicle(id);
      setMsg('✅ Véhicule supprimé');
      loadData();
      setTimeout(() => setMsg(''), 3000);
    } catch (e) { setMsg('❌ Erreur suppression'); }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="admin-container">
        <h2 className="admin-title">🛡️ Panneau Administrateur</h2>
        {msg && <div className={`alert ${msg.startsWith('✅') ? 'alert-success' : 'alert-danger'}`}>{msg}</div>}

        <div className="tab-bar">
          <button className={`tab-btn ${activeTab === 'vehicles' ? 'active' : ''}`} onClick={() => setActiveTab('vehicles')}>
            🚗 Véhicules ({vehicles.length})
          </button>
          <button className={`tab-btn ${activeTab === 'purchases' ? 'active' : ''}`} onClick={() => setActiveTab('purchases')}>
            💳 Achats ({purchases.length})
          </button>
        </div>

        {activeTab === 'vehicles' && (
          <>
            <button className="btn btn-primary mb-3" onClick={() => { setForm(empty); setEditing(null); setShowForm(!showForm); }}>
              {showForm ? '✕ Annuler' : '+ Ajouter un véhicule'}
            </button>

            {showForm && (
              <form className="vehicle-form card" onSubmit={handleSubmit}>
                <h3>{editing ? 'Modifier le véhicule' : 'Nouveau véhicule'}</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Marque</label>
                    <input className="form-control" value={form.marque} onChange={e => setForm({...form, marque: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Modèle</label>
                    <input className="form-control" value={form.modele} onChange={e => setForm({...form, modele: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Année</label>
                    <input type="number" className="form-control" value={form.annee} onChange={e => setForm({...form, annee: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Immatriculation</label>
                    <input className="form-control" value={form.immatriculation} onChange={e => setForm({...form, immatriculation: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Prix (MRU)</label>
                    <input type="number" className="form-control" value={form.prix} onChange={e => setForm({...form, prix: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Statut</label>
                    <select className="form-control" value={form.statut} onChange={e => setForm({...form, statut: e.target.value})}>
                      <option value="disponible">Disponible</option>
                      <option value="vendu">Vendu</option>
                    </select>
                  </div>
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea className="form-control" value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows="2" />
                  </div>
                </div>
                <button type="submit" className="btn btn-success">{editing ? 'Modifier' : 'Ajouter'}</button>
              </form>
            )}

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th><th>Marque</th><th>Modèle</th><th>Année</th>
                    <th>Immat.</th><th>Prix</th><th>Statut</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map(v => (
                    <tr key={v.id}>
                      <td>{v.id}</td>
                      <td><strong>{v.marque}</strong></td>
                      <td>{v.modele}</td>
                      <td>{v.annee}</td>
                      <td><code>{v.immatriculation}</code></td>
                      <td>{v.prix?.toLocaleString()} MRU</td>
                      <td><span className={`badge ${v.statut === 'disponible' ? 'badge-success' : 'badge-secondary'}`}>{v.statut}</span></td>
                      <td>
                        <button className="btn btn-sm btn-warning me-1" onClick={() => handleEdit(v)}>✏️</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(v.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'purchases' && (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr><th>ID</th><th>Acheteur</th><th>Véhicule</th><th>Montant</th><th>Méthode</th><th>Téléphone</th><th>Statut</th><th>Date</th></tr>
              </thead>
              <tbody>
                {purchases.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.user?.username}</td>
                    <td>{p.vehicle?.marque} {p.vehicle?.modele}</td>
                    <td>{p.amount?.toLocaleString()} MRU</td>
                    <td><span className={`badge ${p.paymentMethod === 'BANKILI' ? 'badge-bankili' : 'badge-sedad'}`}>{p.paymentMethod}</span></td>
                    <td>{p.phoneNumber}</td>
                    <td><span className="badge badge-success">{p.status}</span></td>
                    <td>{new Date(p.purchaseDate).toLocaleDateString('fr-FR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
