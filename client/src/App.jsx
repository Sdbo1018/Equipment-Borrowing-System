import EquipmentList from './components/EquipmentList';
import BorrowForm from './components/BorrowForm';
import { mockEquipment } from './data/mockData';

export default function App() {
  return (
    <div>
      <h1>Equipment Borrowing System</h1>
      <EquipmentList items={mockEquipment} />
      <BorrowForm
        equipment={mockEquipment}
        onSubmit={(data) => console.log('Borrow request (mock):', data)}
      />
    </div>
  );
}