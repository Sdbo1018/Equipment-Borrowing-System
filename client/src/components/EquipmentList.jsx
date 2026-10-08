export default function EquipmentList({ items = [] }) {
  const available = items.filter((item) => item.isAvailable);

  if (available.length === 0) {
    return <p>No equipment is currently available.</p>;
  }

  return (
    <section>
      <h2>Available Equipment</h2>
      <ul>
        {available.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong> — {item.category}
          </li>
        ))}
      </ul>
    </section>
  );
}