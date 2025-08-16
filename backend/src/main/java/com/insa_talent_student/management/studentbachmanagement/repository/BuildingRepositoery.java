package com.insa_talent_student.management.studentbachmanagement.repository;

import com.insa_talent_student.management.studentbachmanagement.entity.Building;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BuildingRepositoery extends  JpaRepository<Building,Long> {
    
}
