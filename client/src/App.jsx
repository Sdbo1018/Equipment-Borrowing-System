import EquipmentList from './components/EquipmentList';
import BorrowForm from './components/BorrowForm';
import BorrowedList from './components/BorrowedList';
import { mockEquipment, mockBorrowings } from './data/mockData';

export default function App() {
  return (
    <div>
      <h1>Equipment Borrowing System</h1>
      <EquipmentList items={mockEquipment} />
      <BorrowForm
        equipment={mockEquipment}
        onSubmit={(data) => console.log('Borrow request (mock):', data)}
      />
      <BorrowedList
        borrowings={mockBorrowings}
        onReturn={(id) => console.log('Return requested (mock):', id)}
      />
    </div>
  );
}