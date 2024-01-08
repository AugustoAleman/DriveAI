package com.driveai.salesprocessms.clients;
import com.driveai.salesprocessms.receiveddto.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

//ClientExample
@FeignClient(name = "users-ms", url = "https://usersms-rdewcgcrza-uw.a.run.app/")
public interface UserClient {
    @GetMapping("/v1/user/findSalesmanNameById/{id}")
    public Optional<NameDto> findSalesmanNameById(@PathVariable int id);

    @GetMapping("/v1/dealership/findDealershipNameAddress/{id}")
    public Optional<DealershipNameAddressDto> findDealershipById(@PathVariable("id") int id);
    @GetMapping("/v1/user/findNameById/{id}")
    public NameDto findNameById(@PathVariable int id);
    @GetMapping("/v1/user/findById/{id}")
    public UserDto findById(@PathVariable int id);

    @GetMapping("/v1/user/findById/{id}")
    public UserDataDto findDataById(@PathVariable int id);
    @GetMapping("/v1/insurance/getInsurance")
    public InsuranceDto getInsurance(@RequestParam("insuranceId") int insuranceId);


}
