package com.driveai.salesprocessms.controllers;
import com.driveai.salesprocessms.dto.totalSoldCarsByAgencyDto;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@Hidden
public class totalSoldCarsByAgencyDtoController {
    @PersistenceContext
    private EntityManager entityManager;

    @GetMapping("/autos/{nombreAgencia}")
    @ResponseBody
    @Transactional
    public ResponseEntity<List<totalSoldCarsByAgencyDto>> getAutosVendidos(@PathVariable String nombreAgencia) {
        Query query = entityManager.createNamedQuery("agency_name");
        query.setParameter("nombreAgencia", nombreAgencia);
        List<totalSoldCarsByAgencyDto> autosVendidos = query.getResultList();
        return ResponseEntity.ok().body(autosVendidos);
    }





}
