package com.driveai.salesprocessms.Payments.web.controller;
import com.driveai.salesprocessms.Payments.dto.CreatePayment;
import com.driveai.salesprocessms.Payments.dto.CreatePaymentResponse;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializer;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.net.RequestOptions;
import com.stripe.param.CustomerListParams;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/v1/sales-process/pay")


public class PaymentController {

    @Value("${stripe.PUBLISHABLE_KEY}")
    private String publishableKey;
    @Value("${stripe.SECRET_KEY}")
    private String SECRET_KEY;

    @PostMapping("/create-payment-intent")
    public CreatePaymentResponse createPaymentIntent(@RequestBody CreatePayment request) {
        try {
            Stripe.apiKey = SECRET_KEY; // Reemplaza con tu Stripe Secret Key

            Map<String, Object> bankTransfer = new HashMap<String, Object>();

            bankTransfer.put("type", "mx_bank_transfer");

            Map<String, Object> customerBalance = new HashMap<String, Object>();
            customerBalance.put("funding_type", "bank_transfer");
            customerBalance.put("bank_transfer", bankTransfer);

            PaymentIntentCreateParams.PaymentMethodOptions pmo =
                    PaymentIntentCreateParams.PaymentMethodOptions.builder()
                            .putExtraParam("customer_balance", customerBalance)
                            .build();



            RequestOptions requestOptions = RequestOptions.builder().setApiKey(SECRET_KEY).build();

            Customer customer = Customer.create((Map<String, Object>) null, requestOptions);




            List<String> metodos = new ArrayList<>();
            metodos.add("customer_balance");

            PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder()

                    .setCurrency("mxn") // Reemplaza con la moneda deseada
                    .setAmount(1000L) // Reemplaza con el monto deseado
                    .setDescription("uuwu")
                    .setCustomer("cus_NrqZuXNiuXF4Ph")
                    .addAllPaymentMethodType(metodos)
                    .setPaymentMethodData(PaymentIntentCreateParams.PaymentMethodData.builder()
                            .putExtraParam("type", "customer_balance")
                            .build())
                    .setPaymentMethodOptions(pmo)
                    .build();



//
//              .setPaymentMethod("pm_1N6AmPAW1QMD0rARguKU7ehI")
////                    .setSetupFutureUsage(PaymentIntentCreateParams.SetupFutureUsage.OFF_SESSION)
//                    .setAutomaticPaymentMethods(
//                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
//                                    .setEnabled(true)
//                                    .build()
//                    )




            PaymentIntent paymentIntent = PaymentIntent.create(createParams);

            return new CreatePaymentResponse(paymentIntent.getClientSecret());
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }




    @GetMapping("/customers")
    public ResponseEntity<String> getAllTransactions() throws StripeException {
        Stripe.apiKey = SECRET_KEY;

        List<Map<String, Object>> allTransactions = new ArrayList<>();

        CustomerListParams.Builder customerParamsBuilder = CustomerListParams.builder()
                .setLimit(100L); // Establece el número de clientes que se recuperarán por página

        while (true) {
            CustomerCollection customers = Customer.list(customerParamsBuilder.build());

            for (Customer customer : customers.getData()) {
                // Obtén todas las transacciones para el cliente, incluidas las transacciones de prueba
                List<Map<String, Object>> transactions = getAllCustomerTransactions(customer.getId());

                // Agrega las transacciones a la lista general
                allTransactions.addAll(transactions);
            }

            if (!customers.getHasMore()) {
                break;
            }

            customerParamsBuilder.setStartingAfter(customers.getData().get(customers.getData().size() - 1).getId());
        }

        Gson gson = new GsonBuilder()
                .registerTypeAdapter(LocalDateTime.class, (JsonDeserializer<LocalDateTime>) (json, typeOfT, context) ->
                        LocalDateTime.ofInstant(Instant.ofEpochSecond(json.getAsJsonPrimitive().getAsLong()), ZoneOffset.UTC))
                .create();

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(gson.toJson(allTransactions));
    }

    private List<Map<String, Object>> getAllCustomerTransactions(String customerId) throws StripeException {
        List<Map<String, Object>> transactions = new ArrayList<>();

        Map<String, Object> params = new HashMap<>();
        params.put("customer", customerId);
        params.put("limit", 10); // Establece el número de transacciones que se recuperarán por página

        ChargeCollection chargeCollection = Charge.list(params);

        for (Charge charge : chargeCollection.getData()) {
            Map<String, Object> transactionData = new HashMap<>();
            transactionData.put("fecha", formatTimestamp(charge.getCreated()));
            transactionData.put("tipo", charge.getObject());
            transactionData.put("monto", charge.getAmount());
            transactionData.put("cuentaOrigen", customerId);
            transactionData.put("id", charge.getId());
            transactionData.put("referencia", charge.getPaymentMethod());

            transactions.add(transactionData);
        }

        return transactions;
    }

    private String formatTimestamp(Long timestamp) {
        LocalDateTime date = LocalDateTime.ofInstant(Instant.ofEpochSecond(timestamp), ZoneOffset.UTC);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return date.format(formatter);
    }

}

//package com.example.demo.web.controller;
//
//import com.example.demo.dto.CreatePayment;
//import com.example.demo.dto.CreatePaymentResponse;
//import com.stripe.exception.StripeException;
//import com.stripe.model.PaymentIntent;
//import com.stripe.param.PaymentIntentCreateParams;
//import lombok.Value;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//@RestController
//public class PaymentController {
//
////    @PostMapping("/create-payment-intent")
////    public CreatePaymentResponse createPaymentIntent(@RequestBody CreatePayment createPayment) throws StripeException {
////        PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder()
////                .setCurrency("usd")
////                .setAmount(10L)
////                .build();
////        // Create a PaymentIntent with the order amount and currency
////        PaymentIntent intent = PaymentIntent.create(createParams);
////
////        return new CreatePaymentResponse(intent.getClientSecret());
////    }
//
//
//
//}