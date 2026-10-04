import { Award, BookOpen, GraduationCap, Users } from 'lucide-react';

export default function Dashboard({ students }) {
  const totalStudents = students.length;
  const averageScore = totalStudents
    ? students.reduce((sum, student) => sum + Number(student.average || 0), 0) / totalStudents
    : 0;
  const topStudent = students.reduce((best, student) => {
    if (!best || Number(student.average) > Number(best.average)) {
      return student;
    }
    return best;
  }, null);
  const departments = new Set(students.map((student) => student.department).filter(Boolean)).size;

  const stats = [
    ['Students', totalStudents, Users],
    ['Class Average', averageScore.toFixed(2), Award],
    ['Departments', departments, BookOpen],
    ['Top Grade', topStudent?.grade || '-', GraduationCap]
  ];

  return (
    <section className="dashboard-grid">
      {stats.map(([label, value, Icon]) => (
        <div className="stat-card" key={label}>
          <Icon size={24} />
          <span>{label}</span>
          <strong>{value}</strong>
        </div>
      ))}
    </section>
  );
}
