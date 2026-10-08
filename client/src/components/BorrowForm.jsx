import { useState } from 'react';

export default function BorrowForm({ equipment = [], onSubmit }) {
  const [equipmentId, setEquipmentId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    if (!equipmentId || !dueDate) {
      setError('Please select equipment and a due date.');
      return;
    }
    setError('');
    onSubmit({ equipmentId, dueDate });
  }

  const available = equipment.filter((item) => item.isAvailable);

  return (
    <section>
      <h2>Borrow Equipment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Equipment:{' '}
          <select value={equipmentId} onChange={(e) => setEquipmentId(e.target.value)}>
            <option value="">-- Select --</option>
            {available.map((item) => (
              <option key={item._id} value={item._id}>{item.name}</option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Due date:{' '}
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </label>
        <br />
        <button type="submit">Borrow</button>
      </form>
      {error && <p role="alert">{error}</p>}
    </section>
  );
}