import EquipmentList from './components/EquipmentList';
import { mockEquipment } from './data/mockData';

export default function App() {
  return (
    <div>
      <h1>Equipment Borrowing System</h1>
      <EquipmentList items={mockEquipment} />
    </div>
  );
}