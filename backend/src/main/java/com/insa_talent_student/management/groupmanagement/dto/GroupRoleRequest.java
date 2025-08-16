package com.insa_talent_student.management.groupmanagement.dto;

import com.insa_talent_student.management.groupmanagement.entity.MemberRole;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GroupRoleRequest {
    private Memberdto member;
    private MemberRole role;
}
