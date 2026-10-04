import { Eye, Pencil, Trash2 } from 'lucide-react';

export default function StudentTable({ students, onView, onEdit, onDelete }) {
  if (students.length === 0) {
    return <div className="empty-state">No students found.</div>;
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Total</th>
            <th>Average</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.department}</td>
              <td>{student.total}</td>
              <td>{Number(student.average).toFixed(2)}</td>
              <td><span className={`grade grade-${student.grade.replace('+', 'plus').toLowerCase()}`}>{student.grade}</span></td>
              <td>
                <div className="icon-actions">
                  <button title="View student" onClick={() => onView(student)}><Eye size={17} /></button>
                  <button title="Edit student" onClick={() => onEdit(student)}><Pencil size={17} /></button>
                  <button title="Delete student" onClick={() => onDelete(student)}><Trash2 size={17} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
