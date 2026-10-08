import { useEffect, useState } from 'react';
import EquipmentList from './components/EquipmentList';
import BorrowForm from './components/BorrowForm';
import BorrowedList from './components/BorrowedList';
import { getEquipment, getBorrowings, createBorrowing, returnBorrowing } from './services/api';

export default function App() {
  const [equipment, setEquipment] = useState([]);
  const [borrowings, setBorrowings] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getEquipment().then(setEquipment).catch((e) => setMessage(e.message));
    getBorrowings().then(setBorrowings).catch(() => {});
  }, []);

  async function handleBorrow(data) {
    try {
      await createBorrowing(data);
      setMessage('Borrow successful');
      setEquipment(await getEquipment());
      setBorrowings(await getBorrowings());
    } catch (e) {
      setMessage(e.message);
    }
  }

  async function handleReturn(id) {
    try {
      await returnBorrowing(id);
      setMessage('Item returned');
      setEquipment(await getEquipment());
      setBorrowings(await getBorrowings());
    } catch (e) {
      setMessage(e.message);
    }
  }

  return (
    <div>
      <h1>Equipment Borrowing System</h1>
      <p>{message}</p>
      <EquipmentList items={equipment} />
      <BorrowForm
        equipment={equipment}
        onSubmit={(data) =>
          handleBorrow({ ...data, dueDate: new Date(data.dueDate).toISOString() })
        }
      />
      <BorrowedList borrowings={borrowings} onReturn={handleReturn} />
    </div>
  );
}