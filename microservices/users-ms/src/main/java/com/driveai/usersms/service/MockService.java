package com.driveai.usersms.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@Service
public class MockService {

    public List<Map<String, String>> getLastTransactions() {
        List<Map<String, String>> transactions = new ArrayList<>();

        for (int i = 1; i <= 15; i++) {
            Map<String, String> transaccion = new HashMap<>();
            transaccion.put("id", Integer.toString(i));
            transaccion.put("fecha", "06-07-2023");
            transaccion.put("referencia", getRandomNumber());
            transaccion.put("cuentaOrigen", getRandomNumberSameSize());
            transaccion.put("monto", "$" + getRandomMoneyNumber());
            transaccion.put("tipo", "Vehiculo");

            transactions.add(transaccion);
        }

        System.out.println("transactions: " + transactions);

        return transactions;
    }

    public List<Map<String, String>> getBankAccounts() {
        List<Map<String, String>> accounts = new ArrayList<>();

        for (int i = 1; i <= 15; i++) {
            Map<String, String> account = new HashMap<>();
            account.put("NumeroCuenta", getRandomNumberAccountSameSize());
            account.put("Banco", getRandomBank());
            account.put("ClaveInterbancaria", getRandomNumberAccountSameSize());
            account.put("FechaModificacion", getRandomDate());
            account.put("AgenciaVinculado", getRandomAgency());
            account.put("Estatus", getRandomStatus());

            accounts.add(account);
        }

        System.out.println("accounts: " + accounts);

        return accounts;
    }

    public List<Map<String, String>> getBankAccountsHistory() {
        List<Map<String, String>> accounts = new ArrayList<>();

        for (int i = 1; i <= 15; i++) {
            Map<String, String> account = new HashMap<>();
            account.put("IDTransaccion", "TXN"+getRandomNumberSameSize());
            account.put("Referencia", "REF"+getRandomNumberSameSize());
            account.put("CuentaOrigen", getRandomNumberAccountSameSize());
            account.put("Fecha", getRandomDate());
            account.put("AgenciaVinculado", getRandomAgency());
            account.put("Tipo", getRandomType());
            account.put("Monto","$" +  getRandomMoneyNumber());

            accounts.add(account);
        }

        System.out.println("accounts: " + accounts);

        return accounts;
    }

    public List<Map<String, String>> getSalesProcess() {
        List<Map<String, String>> accounts = new ArrayList<>();

        for (int i = 1; i <= 15; i++) {
            Map<String, String> account = new HashMap<>();
            account.put("IDVenta", getRandomNumber());
            account.put("Vendedor", getRandomName());
            account.put("Cliente", getRandomName());
            account.put("FechaInicio", getRandomDate());
            account.put("Estado", getRandomStatus());

            accounts.add(account);
        }

        System.out.println("accounts: " + accounts);

        return accounts;
    }

    private String getRandomName(){
        String[] banks = {"Andres Torres", "German Wong", "Abraham Chalita", "Eduardo Angeles", "Jesus Rivas"};
        Random random = new Random();
        int index = random.nextInt(banks.length);
        return banks[index];
    }


    private String getRandomNumberAccountSameSize() {
        Random random = new Random();
        long max = 99999999999999999L;
        long min = (long) Math.pow(10, String.valueOf(max).length() - 1);
        long randomNumber = random.nextLong() % (max - min + 1) + min;
        return String.format("%018d", Math.abs(randomNumber));
    }


    private String getRandomBank() {
        String[] banks = {"BBVA", "HSBC", "City Banamex", "Santander", "Banco Azteca"};
        Random random = new Random();
        int index = random.nextInt(banks.length);
        return banks[index];
    }

    private String getRandomType() {
        String[] banks = {"Credito", "Debito"};
        Random random = new Random();
        int index = random.nextInt(banks.length);
        return banks[index];
    }


    private String getRandomDate() {
        Random random = new Random();
        int year = random.nextInt(30) + 1990; // Random year between 1990 and 2019
        int month = random.nextInt(12) + 1; // Random month between 1 and 12
        int day = random.nextInt(28) + 1; // Random day between 1 and 28
        return String.format("%02d-%02d-%04d", day, month, year);
    }

    private String getRandomAgency() {
        String[] agencies = {"Nissan Norte", "Nissan Sur", "Kia Acoxpa", "Chevrolet Ajusco", "Ferrari Polanco"};
        Random random = new Random();
        int index = random.nextInt(agencies.length);
        return agencies[index];
    }

    private String getRandomStatus() {
        String[] statuses = {"Active", "Inactive", "Pending", "Closed"};
        Random random = new Random();
        int index = random.nextInt(statuses.length);
        return statuses[index];
    }

    private String getRandomNumber() {
        Random random = new Random();
        return Integer.toString(random.nextInt(100000));
    }

    private String getRandomNumberSameSize() {
        Random random = new Random();
        int max = 99999;
        int min = (int) Math.pow(10, String.valueOf(max).length() - 1);
        int randomNumber = random.nextInt(max - min + 1) + min;
        return Integer.toString(randomNumber);
    }

    private String getRandomMoneyNumber() {
        Random random = new Random();
        int dollars = random.nextInt(1000);
        int cents = random.nextInt(99);
        return String.format("%d.%02d", dollars, cents);
    }
}
