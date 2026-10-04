package com.example.student_result_manager;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.example.student_result_manager.entity.Student;
import org.junit.jupiter.api.Test;

class StudentResultManagerApplicationTests {

    @Test
    void calculatesTotalAverageAndGrade() {
        Student student = new Student();
        student.setJavaMarks(90);
        student.setDbmsMarks(85);
        student.setDsaMarks(80);
        student.setWebMarks(95);
        student.setNetworksMarks(100);

        assertEquals(450, student.getTotal());
        assertEquals(90.0, student.getAverage());
        assertEquals("A+", student.getGrade());
    }
}
