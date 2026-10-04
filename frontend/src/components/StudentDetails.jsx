export default function StudentDetails({ student }) {
  if (!student) {
    return <div className="empty-state">Select a student to view details.</div>;
  }

  const marks = [
    ['Java', student.javaMarks],
    ['DBMS', student.dbmsMarks],
    ['DSA', student.dsaMarks],
    ['Web', student.webMarks],
    ['Networks', student.networksMarks]
  ];

  return (
    <div className="details-panel">
      <div>
        <p className="eyebrow">Student Details</p>
        <h2>{student.name}</h2>
        <p>{student.department}</p>
      </div>

      <div className="result-strip">
        <span>Total <strong>{student.total}</strong></span>
        <span>Average <strong>{Number(student.average).toFixed(2)}</strong></span>
        <span>Grade <strong>{student.grade}</strong></span>
      </div>

      <div className="marks-grid">
        {marks.map(([label, value]) => (
          <div key={label} className="mark-card">
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
