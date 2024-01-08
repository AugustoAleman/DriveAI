package com.driveai.vehiclesms.client;

import com.driveai.vehiclesms.dto.CreatDocumentDto;
import com.driveai.vehiclesms.dto.DocumentDto;
import com.driveai.vehiclesms.dto.DocumentRequiredDto;
import com.driveai.vehiclesms.dto.S3AssetDto;
import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.Map;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@FeignClient(name="documents-ms", url="https://documents-pwtzgfjlpa-uw.a.run.app", configuration = ExampleClientConfig.class)
public interface DocumentsClient {
    @PostMapping("/v1/document/file/upload")
    String uploadFile(@RequestParam("fileName") String fileName, @RequestParam("file") MultipartFile file);

    @PostMapping(value = "/v1/s3/upload-document", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    S3AssetDto  uploadDocument(@RequestParam(value = "filePath") String filePath, @RequestPart(value = "file") MultipartFile file, @RequestParam(value="externalTable") String externalTable, @RequestParam(value="externalId") int externalId, @RequestParam(value="reqDocId") int reqDocId);

    @PostMapping("/v1/document/create")
    DocumentDto createDocument(@RequestBody CreatDocumentDto document, @RequestHeader Principal principal);

    @PostMapping(value = "/v1/s3/upload-images", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    List<S3AssetDto> uploadImages(@RequestPart("formData") Map<String, MultipartFile> formData,
                            @RequestParam ("filePath") String filePath);
    @GetMapping(value="/v1/document-required/get-documents-required-for-test-drive/{id}")
    List<DocumentRequiredDto> forDemo(@PathVariable("id") int id, Principal principal);

}
@Configuration
class ExampleClientConfig {

    @Autowired
    private JwtDecoder jwtDecoder;

    @Bean
    public JwtTokenInterceptor jwtTokenInterceptor() {
        return new JwtTokenInterceptor(jwtDecoder);
    }

    @Bean
    public RequestInterceptor requestInterceptor() {
        return new RequestInterceptor() {
            @Override
            public void apply(RequestTemplate template) {
                jwtTokenInterceptor().apply(template);
            }
        };
    }
}

