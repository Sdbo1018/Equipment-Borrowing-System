const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });
  const body = await response.json();

  if (!response.ok || !body.success) {
    throw new Error(body.error?.message || 'Request failed');
  }
  return body.data;
}

export function getEquipment() {
  return request('/equipment');
}

export function createBorrowing({ equipmentId, dueDate }) {
  return request('/borrowings', {
    method: 'POST',
    body: JSON.stringify({ equipmentId, dueDate })
  });
}

export function getBorrowings() {
  return request('/borrowings');
}

export function returnBorrowing(id) {
  return request(`/borrowings/${id}/return`, { method: 'PATCH' });
}