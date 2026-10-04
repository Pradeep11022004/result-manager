package com.example.student_result_manager.service;

import com.example.student_result_manager.entity.Student;
import com.example.student_result_manager.exception.ResourceNotFoundException;
import com.example.student_result_manager.repository.StudentRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getStudentById(Integer id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id: " + id));
    }

    public Student addStudent(Student student) {
        student.setId(null);
        return studentRepository.save(student);
    }

    public Student updateStudent(Integer id, Student updatedStudent) {
        Student existingStudent = getStudentById(id);

        existingStudent.setName(updatedStudent.getName());
        existingStudent.setDepartment(updatedStudent.getDepartment());
        existingStudent.setJavaMarks(updatedStudent.getJavaMarks());
        existingStudent.setDbmsMarks(updatedStudent.getDbmsMarks());
        existingStudent.setDsaMarks(updatedStudent.getDsaMarks());
        existingStudent.setWebMarks(updatedStudent.getWebMarks());
        existingStudent.setNetworksMarks(updatedStudent.getNetworksMarks());

        return studentRepository.save(existingStudent);
    }

    public void deleteStudent(Integer id) {
        Student student = getStudentById(id);
        studentRepository.delete(student);
    }

    public List<Student> searchStudentsByName(String name) {
        return studentRepository.findByNameContainingIgnoreCase(name);
    }

    public List<Student> filterStudentsByDepartment(String department) {
        return studentRepository.findByDepartmentIgnoreCase(department);
    }
}
