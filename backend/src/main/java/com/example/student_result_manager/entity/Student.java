package com.example.student_result_manager.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotBlank(message = "Student name is required")
    @Size(min = 2, max = 80, message = "Student name must be between 2 and 80 characters")
    private String name;

    @NotBlank(message = "Department is required")
    @Size(max = 80, message = "Department must be 80 characters or less")
    private String department;

    @NotNull(message = "Java marks are required")
    @Min(value = 0, message = "Java marks must be at least 0")
    @Max(value = 100, message = "Java marks must be at most 100")
    private Integer javaMarks;

    @NotNull(message = "DBMS marks are required")
    @Min(value = 0, message = "DBMS marks must be at least 0")
    @Max(value = 100, message = "DBMS marks must be at most 100")
    private Integer dbmsMarks;

    @NotNull(message = "DSA marks are required")
    @Min(value = 0, message = "DSA marks must be at least 0")
    @Max(value = 100, message = "DSA marks must be at most 100")
    private Integer dsaMarks;

    @NotNull(message = "Web marks are required")
    @Min(value = 0, message = "Web marks must be at least 0")
    @Max(value = 100, message = "Web marks must be at most 100")
    private Integer webMarks;

    @NotNull(message = "Networks marks are required")
    @Min(value = 0, message = "Networks marks must be at least 0")
    @Max(value = 100, message = "Networks marks must be at most 100")
    private Integer networksMarks;

    public Student() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public Integer getJavaMarks() {
        return javaMarks;
    }

    public void setJavaMarks(Integer javaMarks) {
        this.javaMarks = javaMarks;
    }

    public Integer getDbmsMarks() {
        return dbmsMarks;
    }

    public void setDbmsMarks(Integer dbmsMarks) {
        this.dbmsMarks = dbmsMarks;
    }

    public Integer getDsaMarks() {
        return dsaMarks;
    }

    public void setDsaMarks(Integer dsaMarks) {
        this.dsaMarks = dsaMarks;
    }

    public Integer getWebMarks() {
        return webMarks;
    }

    public void setWebMarks(Integer webMarks) {
        this.webMarks = webMarks;
    }

    public Integer getNetworksMarks() {
        return networksMarks;
    }

    public void setNetworksMarks(Integer networksMarks) {
        this.networksMarks = networksMarks;
    }

    @Transient
    public int getTotal() {
        return safeMark(javaMarks) + safeMark(dbmsMarks) + safeMark(dsaMarks) + safeMark(webMarks) + safeMark(networksMarks);
    }

    @Transient
    public double getAverage() {
        return getTotal() / 5.0;
    }

    @Transient
    public String getGrade() {
        double average = getAverage();

        if (average >= 90) {
            return "A+";
        }
        if (average >= 80) {
            return "A";
        }
        if (average >= 70) {
            return "B";
        }
        if (average >= 60) {
            return "C";
        }
        if (average >= 50) {
            return "D";
        }
        return "F";
    }

    private int safeMark(Integer mark) {
        return mark == null ? 0 : mark;
    }
}
