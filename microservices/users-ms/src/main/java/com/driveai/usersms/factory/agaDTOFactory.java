package com.driveai.usersms.factory;

import com.driveai.usersms.dto.AutomotiveGroupAdminManagementDTO;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class agaDTOFactory {

    public static AutomotiveGroupAdminManagementDTO createDealershipDTO(int id, String name, String address, Date date, String managerName, int status) {
        AutomotiveGroupAdminManagementDTO agaDTO = new AutomotiveGroupAdminManagementDTO();
        agaDTO.setId(id);
        agaDTO.setName(name);
        agaDTO.setAddress(address);
        agaDTO.setDate(date);
        agaDTO.setManagerName(managerName);
        agaDTO.setStatus(status);
        return agaDTO;
    }

    public static AutomotiveGroupAdminManagementDTO createManagersDTO(int id, String name, String assignedDealership, Date date, int status){
        AutomotiveGroupAdminManagementDTO agaDTO = new AutomotiveGroupAdminManagementDTO();
        agaDTO.setId(id);
        agaDTO.setName(name);
        agaDTO.setAssignedDealership(assignedDealership);
        agaDTO.setDate(date);
        agaDTO.setStatus(status);
        return agaDTO;
    }

    public static AutomotiveGroupAdminManagementDTO createSalesmanDTO(int id, String salesmanName, String assignedManager, Date date, int status, String assignedDealership){
        AutomotiveGroupAdminManagementDTO agaDTO = new AutomotiveGroupAdminManagementDTO();
        agaDTO.setName(salesmanName);
        agaDTO.setAssignedManager(assignedManager);
        agaDTO.setDate(date);
        agaDTO.setId(id);
        agaDTO.setStatus(status);
        agaDTO.setAssignedDealership(assignedDealership);
        return agaDTO;
    }

}
