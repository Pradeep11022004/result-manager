const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const STUDENTS_URL = `${API_BASE_URL}/students`;

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (response.status === 204) {
    return null;
  }

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message = data?.message || data?.error || 'Request failed. Please try again.';
    const error = new Error(message);
    error.details = data?.messages || null;
    throw error;
  }

  return data;
}

export function getAllStudents() {
  return request(STUDENTS_URL);
}

export function getStudentById(id) {
  return request(`${STUDENTS_URL}/${id}`);
}

export function addStudent(student) {
  return request(STUDENTS_URL, {
    method: 'POST',
    body: JSON.stringify(student)
  });
}

export function updateStudent(id, student) {
  return request(`${STUDENTS_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(student)
  });
}

export function deleteStudent(id) {
  return request(`${STUDENTS_URL}/${id}`, {
    method: 'DELETE'
  });
}

export function searchStudentsByName(name) {
  return request(`${STUDENTS_URL}/search?name=${encodeURIComponent(name)}`);
}

export function filterStudentsByDepartment(department) {
  return request(`${STUDENTS_URL}/department/${encodeURIComponent(department)}`);
}
