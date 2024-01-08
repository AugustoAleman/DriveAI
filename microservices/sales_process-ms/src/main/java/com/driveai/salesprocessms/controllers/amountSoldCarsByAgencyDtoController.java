package com.driveai.salesprocessms.controllers;

import com.driveai.salesprocessms.dto.amountSoldCarsByAgencyDto;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/v1/sales-process/")
@Hidden
public class amountSoldCarsByAgencyDtoController {
    @PersistenceContext
    private EntityManager entityManager2;

    @GetMapping("autos2/{nombreAgencia}")
    @ResponseBody
    @Transactional
    public ResponseEntity<List<amountSoldCarsByAgencyDto>> getAutosVendidos(@PathVariable String nombreAgencia) {
        Query query = entityManager2.createNamedQuery("agency_namee");
        query.setParameter("nombreAgencia", nombreAgencia);
        List<amountSoldCarsByAgencyDto> autosVendidos = query.getResultList();
        return ResponseEntity.ok().body(autosVendidos);
    }





}
