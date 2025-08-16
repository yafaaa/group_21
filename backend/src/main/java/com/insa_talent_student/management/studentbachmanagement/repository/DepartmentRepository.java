package com.insa_talent_student.management.studentbachmanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.insa_talent_student.management.studentbachmanagement.entity.Department;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

}
