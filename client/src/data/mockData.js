export const mockEquipment = [
  { _id: 'mock-1', name: 'Projector A', category: 'AV', isAvailable: true },
  { _id: 'mock-2', name: 'Laptop 01', category: 'Computers', isAvailable: true },
  { _id: 'mock-3', name: 'Camera X200', category: 'Photography', isAvailable: false }
];

export const mockBorrowings = [
  {
    _id: 'mock-b1',
    equipment: { _id: 'mock-2', name: 'Laptop 01' },
    dueDate: '2026-12-01T00:00:00.000Z',
    status: 'borrowed'
  }
];