package com.driveai.salesprocessms.receivedcontrollers;

import com.driveai.salesprocessms.receiveddto.DealershipNameAddressDto;
import com.driveai.salesprocessms.receiveddto.InvoiceDtoo;
import com.driveai.salesprocessms.receiveddto.NameDto;
import com.driveai.salesprocessms.receiveddto.UserDto;
import com.driveai.salesprocessms.receivedservices.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
class VehicleOrderDetailRepository {
    private final JdbcTemplate jdbcTemplate;

    public VehicleOrderDetailRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<InvoiceDto> findCompletedVehicleIds() {
        String query = "SELECT id, dealership_id, user_id, date_created, statuss FROM invoice";
        return jdbcTemplate.query(query, (rs, rowNum) -> {
            InvoiceDto invoiceDto = new InvoiceDto();
            invoiceDto.setId(rs.getString("id"));
            invoiceDto.setDealershipId(rs.getString("dealership_id"));
            invoiceDto.setUserId(rs.getString("user_id"));
            invoiceDto.setDateCreated(rs.getString("date_created"));
            invoiceDto.setStatuss(rs.getString("statuss"));
            return invoiceDto;
        });
    }
    public List<InvoiceDto> findCompletedVehicleIdss(String dealership_id) {
        String query = "SELECT id, seller_id, user_id, date_created, statuss FROM invoice WHERE dealership_id = ?";
        return jdbcTemplate.query(query, new Object[]{dealership_id}, (rs, rowNum) -> {
            InvoiceDto invoiceDto = new InvoiceDto();
            invoiceDto.setId(rs.getString("id"));
            invoiceDto.setDealershipId(rs.getString("seller_id"));
            invoiceDto.setUserId(rs.getString("user_id"));
            invoiceDto.setDateCreated(rs.getString("date_created"));
            invoiceDto.setStatuss(rs.getString("statuss"));
            return invoiceDto;
        });
    }

    public List<InvoiceDto> findCompletedVehicleIdsss(String seller_id) {
        String query = "SELECT id, seller_id, user_id, date_created, statuss FROM invoice WHERE seller_id = ?";
        return jdbcTemplate.query(query, new Object[]{seller_id}, (rs, rowNum) -> {
            InvoiceDto invoiceDto = new InvoiceDto();
            invoiceDto.setId(rs.getString("id"));
            invoiceDto.setDealershipId(rs.getString("seller_id"));
            invoiceDto.setUserId(rs.getString("user_id"));
            invoiceDto.setDateCreated(rs.getString("date_created"));
            invoiceDto.setStatuss(rs.getString("statuss"));
            return invoiceDto;
        });
    }

}

@RestController
@RequestMapping("/v1/sales-process/sale")
class VehicleController {
    private final VehicleOrderDetailRepository vehicleOrderDetailRepository;
    private final UserService userService;

    @Autowired
    public VehicleController(VehicleOrderDetailRepository vehicleOrderDetailRepository, UserService userService) {
        this.vehicleOrderDetailRepository = vehicleOrderDetailRepository;
        this.userService = userService;
    }

    @GetMapping("/invoice")
    public List<InvoiceDto> getCompletedVehicleIds() {
        return vehicleOrderDetailRepository.findCompletedVehicleIds();
    }

    @GetMapping("/invoice/details")
    public List<InvoiceDtoo> getInvoiceDetails() {
        List<InvoiceDto> invoices = vehicleOrderDetailRepository.findCompletedVehicleIds();
        List<InvoiceDtoo> invoiceDetailsList = new ArrayList<>();

        for (InvoiceDto invoice : invoices) {
            Optional<NameDto> userr = (Optional<NameDto>) userService.findNameById(Integer.parseInt(invoice.getDealershipId()));

            Optional<UserDto> user = (Optional<UserDto>) userService.findById(Integer.parseInt(invoice.getUserId()));


            if (userr.isPresent()) {
                String fechaInicio = invoice.getDateCreated();

                LocalDateTime dateTime = LocalDateTime.parse(fechaInicio, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

                        InvoiceDtoo invoiceDetails = new InvoiceDtoo();
                invoiceDetails.setFechaInicio(dateTime.toLocalDate().toString());
                invoiceDetails.setVendedor(userr.get().getName());

                invoiceDetails.setIdVenta(invoice.getId());
                invoiceDetails.setCliente(user.get().getName()); // Mantén el dealershipId como una cadena de texto
                invoiceDetails.setEstado(invoice.getStatuss());

                invoiceDetailsList.add(invoiceDetails);
            }
        }

        return invoiceDetailsList;
    }

    @GetMapping("/invoice/details/dealership_id/{id}")
    public List<InvoiceDtoo> getInvoiceDetails(@PathVariable("id") String id) {
        List<InvoiceDto> invoices = vehicleOrderDetailRepository.findCompletedVehicleIdss(id);
        List<InvoiceDtoo> invoiceDetailsList = new ArrayList<>();

        for (InvoiceDto invoice : invoices) {
            Optional<NameDto> userr = (Optional<NameDto>) userService.findNameById(Integer.parseInt(invoice.getDealershipId()));

            Optional<UserDto> user = (Optional<UserDto>) userService.findById(Integer.parseInt(invoice.getUserId()));



            if (userr.isPresent()) {
                String fechaInicio = invoice.getDateCreated();

                LocalDateTime dateTime = LocalDateTime.parse(fechaInicio, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));


                InvoiceDtoo invoiceDetails = new InvoiceDtoo();
                invoiceDetails.setFechaInicio(dateTime.toLocalDate().toString());
                invoiceDetails.setVendedor(userr.get().getName());
                invoiceDetails.setIdVenta(invoice.getId());
                invoiceDetails.setCliente(user.get().getName());
                invoiceDetails.setEstado(invoice.getStatuss());

                invoiceDetailsList.add(invoiceDetails);
            }
        }

        return invoiceDetailsList;
    }

    @GetMapping("/invoice/details/seller_id/{id}")
    public List<InvoiceDtoo> getInvoiceDetailss(@PathVariable("id") String id) {
        List<InvoiceDto> invoices = vehicleOrderDetailRepository.findCompletedVehicleIdsss(id);
        List<InvoiceDtoo> invoiceDetailsList = new ArrayList<>();

        for (InvoiceDto invoice : invoices) {
            Optional<NameDto> userr = (Optional<NameDto>) userService.findNameById(Integer.parseInt(invoice.getDealershipId()));

            Optional<UserDto> user = (Optional<UserDto>) userService.findById(Integer.parseInt(invoice.getUserId()));



            if (userr.isPresent()) {
                String fechaInicio = invoice.getDateCreated();

                LocalDateTime dateTime = LocalDateTime.parse(fechaInicio, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));


                InvoiceDtoo invoiceDetails = new InvoiceDtoo();
                invoiceDetails.setFechaInicio(dateTime.toLocalDate().toString());
                invoiceDetails.setVendedor(userr.get().getName());
                invoiceDetails.setIdVenta(invoice.getId());
                invoiceDetails.setCliente(user.get().getName());
                invoiceDetails.setEstado(invoice.getStatuss());

                invoiceDetailsList.add(invoiceDetails);
            }
        }

        return invoiceDetailsList;
    }
}
