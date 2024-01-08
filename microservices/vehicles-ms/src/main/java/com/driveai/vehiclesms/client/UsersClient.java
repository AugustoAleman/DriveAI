package com.driveai.vehiclesms.client;

import com.driveai.vehiclesms.dto.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@FeignClient(name="users-ms" , url = "https://usersms-rdewcgcrza-uw.a.run.app")
public interface UsersClient {
    @GetMapping("/v1/user/findIdByEmail/{email}")
    UserDto findUserByEmail(@PathVariable String email);

    @GetMapping("/v1/dealership/{dealershipId}/address")
    AddressDto getDealershipAddress(@PathVariable Integer dealershipId);

    @GetMapping("/v1/user/findNameById/{userId}")
    UserFullNameDto getFullNameById(@PathVariable Integer userId);

    @GetMapping("/v1/user/getInfoDealership/{salesman_id}")
    SalesmanInformationDto getSalesmanInformationById(@PathVariable Integer salesman_id);

    @GetMapping("/v1/user/getInfoDealershipsFromMultipleIds/{salesman_ids}")
    SalesmanInfoDtoWrapper getSalesmanInformationListByIds(@PathVariable List<Integer> salesman_ids);

    @GetMapping("/v1/dealership/listSalesmenByManager/{managerId}")
    List<SalesmanDealershipDto> listSalesmanByManager(@PathVariable Integer managerId);

    @GetMapping("/v1/dealership/listDealershipsUnderManager/{id}")
    List<DealershipInfoDto> listDealershipsUnderManager(@PathVariable Integer id);
}