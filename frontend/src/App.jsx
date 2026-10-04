import { useEffect, useMemo, useState } from 'react';
import { Filter, Plus, RefreshCw, Search } from 'lucide-react';
import StudentDetails from './components/StudentDetails.jsx';
import StudentForm, { createEmptyStudentForm } from './components/StudentForm.jsx';
import StudentTable from './components/StudentTable.jsx';
import Dashboard from './pages/Dashboard.jsx';
import {
  addStudent,
  deleteStudent,
  filterStudentsByDepartment,
  getAllStudents,
  searchStudentsByName,
  updateStudent
} from './services/studentService.js';

const views = ['Dashboard', 'Students', 'Add Student', 'Search', 'Department Filter'];

function normalizeForm(student) {
  if (!student) {
    return createEmptyStudentForm();
  }

  return {
    name: student.name || '',
    department: student.department || '',
    javaMarks: student.javaMarks ?? '',
    dbmsMarks: student.dbmsMarks ?? '',
    dsaMarks: student.dsaMarks ?? '',
    webMarks: student.webMarks ?? '',
    networksMarks: student.networksMarks ?? ''
  };
}

function toPayload(formData) {
  return {
    name: formData.name.trim(),
    department: formData.department.trim(),
    javaMarks: Number(formData.javaMarks),
    dbmsMarks: Number(formData.dbmsMarks),
    dsaMarks: Number(formData.dsaMarks),
    webMarks: Number(formData.webMarks),
    networksMarks: Number(formData.networksMarks)
  };
}

export default function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState(createEmptyStudentForm());
  const [activeView, setActiveView] = useState('Dashboard');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [apiErrors, setApiErrors] = useState({});
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  const visibleStudents = useMemo(() => students, [students]);

  async function runAction(action, successMessage) {
    setLoading(true);
    setError('');
    setMessage('');
    setApiErrors({});

    try {
      const result = await action();
      if (successMessage) {
        setMessage(successMessage);
      }
      return result;
    } catch (err) {
      setError(err.message || 'Something went wrong.');
      setApiErrors(err.details || {});
      return null;
    } finally {
      setLoading(false);
    }
  }

  async function loadStudents() {
    const data = await runAction(() => getAllStudents());
    if (data) {
      setStudents(data);
      setSelectedStudent(data[0] || null);
    }
  }

  function handleFormEvent(event) {
    if (event.type === 'change') {
      setFormData((current) => ({ ...current, [event.name]: event.value }));
      return;
    }

    saveStudent();
  }

  async function saveStudent() {
    const payload = toPayload(formData);
    const savedStudent = editingStudent
      ? await runAction(() => updateStudent(editingStudent.id, payload), 'Student updated successfully.')
      : await runAction(() => addStudent(payload), 'Student added successfully.');

    if (savedStudent) {
      await loadStudents();
      setFormData(createEmptyStudentForm());
      setEditingStudent(null);
      setSelectedStudent(savedStudent);
      setActiveView('Students');
    }
  }

  function startAdd() {
    setEditingStudent(null);
    setFormData(createEmptyStudentForm());
    setActiveView('Add Student');
  }

  function startEdit(student) {
    setEditingStudent(student);
    setFormData(normalizeForm(student));
    setActiveView('Add Student');
  }

  async function removeStudent(student) {
    const confirmed = window.confirm(`Delete ${student.name}?`);
    if (!confirmed) {
      return;
    }

    const deleted = await runAction(async () => {
      await deleteStudent(student.id);
      return true;
    }, 'Student deleted successfully.');

    if (deleted) {
      await loadStudents();
      setSelectedStudent(null);
    }
  }

  async function searchStudents(event) {
    event.preventDefault();
    if (!query.trim()) {
      await loadStudents();
      return;
    }

    const data = await runAction(() => searchStudentsByName(query.trim()));
    if (data) {
      setStudents(data);
    }
  }

  async function filterByDepartment(event) {
    event.preventDefault();
    if (!department.trim()) {
      await loadStudents();
      return;
    }

    const data = await runAction(() => filterStudentsByDepartment(department.trim()));
    if (data) {
      setStudents(data);
    }
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span>SRM</span>
          <div>
            <h1>Student Result Manager</h1>
            <p>College results dashboard</p>
          </div>
        </div>

        <nav>
          {views.map((view) => (
            <button
              key={view}
              className={activeView === view ? 'active' : ''}
              onClick={() => setActiveView(view)}
            >
              {view}
            </button>
          ))}
        </nav>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">{activeView}</p>
            <h2>Manage student marks and results</h2>
          </div>
          <div className="topbar-actions">
            <button className="secondary-button" onClick={loadStudents} disabled={loading}>
              <RefreshCw size={18} /> Refresh
            </button>
            <button className="primary-button" onClick={startAdd}>
              <Plus size={18} /> Add Student
            </button>
          </div>
        </header>

        {loading && <div className="notice">Loading...</div>}
        {message && <div className="notice success">{message}</div>}
        {error && <div className="notice error">{error}</div>}

        {activeView === 'Dashboard' && <Dashboard students={visibleStudents} />}

        {activeView === 'Students' && (
          <div className="split-layout">
            <StudentTable students={visibleStudents} onView={setSelectedStudent} onEdit={startEdit} onDelete={removeStudent} />
            <StudentDetails student={selectedStudent} />
          </div>
        )}

        {activeView === 'Add Student' && (
          <StudentForm
            student={formData}
            submitLabel={editingStudent ? 'Update Student' : 'Save Student'}
            onSubmit={handleFormEvent}
            onCancel={() => setActiveView('Students')}
            apiErrors={apiErrors}
          />
        )}

        {activeView === 'Search' && (
          <section>
            <form className="search-bar" onSubmit={searchStudents}>
              <Search size={18} />
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name" />
              <button className="primary-button" type="submit">Search</button>
            </form>
            <StudentTable students={visibleStudents} onView={setSelectedStudent} onEdit={startEdit} onDelete={removeStudent} />
          </section>
        )}

        {activeView === 'Department Filter' && (
          <section>
            <form className="search-bar" onSubmit={filterByDepartment}>
              <Filter size={18} />
              <input value={department} onChange={(event) => setDepartment(event.target.value)} placeholder="Filter by department" />
              <button className="primary-button" type="submit">Filter</button>
            </form>
            <StudentTable students={visibleStudents} onView={setSelectedStudent} onEdit={startEdit} onDelete={removeStudent} />
          </section>
        )}
      </section>
    </main>
  );
}
