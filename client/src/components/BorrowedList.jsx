export default function BorrowedList({ borrowings = [], onReturn }) {
  const items = borrowings;

  const active = items.filter((b) => b.status === 'borrowed');

  function handleReturn(id) {
    if (onReturn) onReturn(id);
  }

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
            {' '}
            <button type="button" onClick={() => handleReturn(b._id)}>
              Return
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}