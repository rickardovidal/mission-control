import { useState } from 'react';

const initialForm = {
  name: '',
  model: '',
  serialNumber: '',
  status: 'available',
  batteryLevel: '100',
};

export default function RobotForm({ onCreate, saving }) {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const created = await onCreate({
      ...form,
      batteryLevel: Number(form.batteryLevel),
    });

    if (created) {
      setForm(initialForm);
    }
  }

  return (
    <form className="robot-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Nome
          <input name="name" value={form.name} onChange={handleChange} required maxLength="100" />
        </label>
        <label>
          Modelo
          <input name="model" value={form.model} onChange={handleChange} required maxLength="100" />
        </label>
        <label>
          Número de série
          <input name="serialNumber" value={form.serialNumber} onChange={handleChange} required maxLength="50" />
        </label>
        <label>
          Estado
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="available">Disponível</option>
            <option value="assigned">Em missão</option>
            <option value="maintenance">Manutenção</option>
            <option value="offline">Offline</option>
          </select>
        </label>
        <label>
          Bateria
          <input
            name="batteryLevel"
            type="number"
            value={form.batteryLevel}
            onChange={handleChange}
            min="0"
            max="100"
            required
          />
        </label>
      </div>

      <button type="submit" disabled={saving}>
        {saving ? 'A guardar…' : 'Registar robot'}
      </button>
    </form>
  );
}
