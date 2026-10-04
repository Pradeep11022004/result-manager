import { Save, X } from 'lucide-react';

const initialFormData = {
  name: '',
  department: '',
  javaMarks: '',
  dbmsMarks: '',
  dsaMarks: '',
  webMarks: '',
  networksMarks: ''
};

const markFields = [
  ['javaMarks', 'Java'],
  ['dbmsMarks', 'DBMS'],
  ['dsaMarks', 'DSA'],
  ['webMarks', 'Web'],
  ['networksMarks', 'Networks']
];

export function createEmptyStudentForm() {
  return initialFormData;
}

export default function StudentForm({ student, submitLabel, onSubmit, onCancel, apiErrors = {} }) {
  const formData = student || initialFormData;

  function handleChange(event) {
    const { name, value } = event.target;
    onSubmit({
      type: 'change',
      name,
      value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({ type: 'submit' });
  }

  return (
    <form className="form-panel" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Student Name
          <input name="name" value={formData.name} onChange={handleChange} placeholder="Arun Kumar" required />
          {apiErrors.name && <span className="field-error">{apiErrors.name}</span>}
        </label>

        <label>
          Department
          <input name="department" value={formData.department} onChange={handleChange} placeholder="Computer Science" required />
          {apiErrors.department && <span className="field-error">{apiErrors.department}</span>}
        </label>

        {markFields.map(([name, label]) => (
          <label key={name}>
            {label} Marks
            <input
              name={name}
              value={formData[name]}
              onChange={handleChange}
              type="number"
              min="0"
              max="100"
              required
            />
            {apiErrors[name] && <span className="field-error">{apiErrors[name]}</span>}
          </label>
        ))}
      </div>

      <div className="form-actions">
        <button className="primary-button" type="submit">
          <Save size={18} /> {submitLabel}
        </button>
        <button className="secondary-button" type="button" onClick={onCancel}>
          <X size={18} /> Cancel
        </button>
      </div>
    </form>
  );
}
