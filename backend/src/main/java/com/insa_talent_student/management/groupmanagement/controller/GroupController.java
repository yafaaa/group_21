package com.insa_talent_student.management.groupmanagement.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.insa_talent_student.management.groupmanagement.dto.GroupDTO;
import com.insa_talent_student.management.groupmanagement.dto.GroupRoleRequest;
import com.insa_talent_student.management.groupmanagement.dto.Memberdto;
import com.insa_talent_student.management.groupmanagement.dto.groupMessage;
import com.insa_talent_student.management.groupmanagement.service.GroupService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/group")
@RequiredArgsConstructor
public class GroupController {

    private final GroupService groupService;

    @PostMapping("/start/base/grouping/{batchId}")
    public ResponseEntity<GroupDTO> startBaseGrouping(@PathVariable Long batchId) {
        GroupDTO createdGroup = groupService.startBaseGrouping(batchId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdGroup);
    }
    @PutMapping("/Add/Tobase/user")
    public ResponseEntity<String> addTobasegroup(@RequestBody Memberdto member ){
        groupService.addTobasegroup(member);
        return ResponseEntity.ok("added sucsasfully");
    }

    @PutMapping("/grantRole/user")
    public ResponseEntity<String> grantGroupRole(@RequestBody GroupRoleRequest Requst ){
        groupService.grantGroupRole(Requst);
        return ResponseEntity.ok("role granted sucsasfully");
    }



    @PostMapping("/start/team/grouping")
    public ResponseEntity<GroupDTO> startTeamGrouping(@RequestBody GroupDTO groupDTO) {
        GroupDTO group = groupService.startTeamGrouping(groupDTO);
        return ResponseEntity.ok(group);
    }
    @PutMapping("/remove/user")
    public ResponseEntity<String> removefromGroup(@RequestBody Memberdto member){
        groupService.removefromGroup(member); 
        return ResponseEntity.ok("user removed sucsasfully");
    }

    @PostMapping("/chat/message")
    public ResponseEntity<String> sandGroupChat(@RequestBody groupMessage message){
        groupService.sandMessage(message);
        return ResponseEntity.ok("added sucsasfully");
    }


    

    @PutMapping("/groups/{id}")
    public ResponseEntity<GroupDTO> updateGroup(@PathVariable Long id, @RequestBody GroupDTO groupDTO) {
        GroupDTO updatedGroup = groupService.updateGroup(id, groupDTO);
        return ResponseEntity.ok(updatedGroup);
    }

    @DeleteMapping("/groups/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long id) {
        groupService.deleteGroup(id);
        return ResponseEntity.noContent().build();
    }
}
