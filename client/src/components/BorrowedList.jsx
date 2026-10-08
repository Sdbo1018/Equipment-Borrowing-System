export default function BorrowedList({ borrowings = [] }) {
  const active = borrowings.filter((b) => b.status === 'borrowed');

  if (active.length === 0) {
    return <p>You have no borrowed equipment.</p>;
  }

  return (
    <section>
      <h2>Borrowed Equipment</h2>
      <ul>
        {active.map((b) => (
          <li key={b._id}>
            <strong>{b.equipment?.name || 'Unknown equipment'}</strong>
            {' — Due: '}
            {new Date(b.dueDate).toLocaleDateString()}
            {' — '}
            {b.status}
          </li>
        ))}
      </ul>
    </section>
  );
}