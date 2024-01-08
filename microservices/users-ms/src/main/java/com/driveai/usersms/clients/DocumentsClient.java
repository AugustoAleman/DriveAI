package com.driveai.usersms.clients;

// Importing factories
import com.driveai.usersms.dto.DocumentDto;
import com.driveai.usersms.dto.DocumentRequiredDto;

// Importing FeignClient dependencies
import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@FeignClient(name="documents-ms", url = "https://documents-pwtzgfjlpa-uw.a.run.app/ ")
public interface DocumentsClient {
    // Get the other services endpoints
    @GetMapping("/get-req-document-status")
    public String getDocumentStatus(@RequestParam("id") int externalId, @RequestParam("table") String externalTable);

    @GetMapping("/v1/document-required/get-documents-required-for-test-drive/{id}")
    public Optional<List<DocumentRequiredDto>> forDemo(@PathVariable("id") int id);

    @GetMapping("/v1/document-required/get-documents-required-for-sale/{id}")
    public Optional<List<DocumentRequiredDto>> forSale(@PathVariable("id") int id);

    @GetMapping("/v1/document/get-documents-for-user/{id}")
    public Optional<List<DocumentDto>> getDocumentsForUser(@PathVariable int id);
}