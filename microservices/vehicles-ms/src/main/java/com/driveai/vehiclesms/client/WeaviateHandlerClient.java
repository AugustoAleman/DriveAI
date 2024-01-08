package com.driveai.vehiclesms.client;

import com.driveai.vehiclesms.dto.AddressDto;
import com.driveai.vehiclesms.dto.VehicleDto;
import io.weaviate.client.Config;
import io.weaviate.client.WeaviateClient;
import io.weaviate.client.base.Result;
import io.weaviate.client.v1.data.model.WeaviateObject;
import io.weaviate.client.v1.data.replication.model.ConsistencyLevel;
import io.weaviate.client.v1.graphql.model.GraphQLResponse;
import io.weaviate.client.v1.graphql.query.argument.NearTextArgument;
import io.weaviate.client.v1.graphql.query.fields.Field;
import io.weaviate.client.v1.graphql.query.fields.GenerativeSearchBuilder;
import io.weaviate.client.v1.schema.model.DataType;
import io.weaviate.client.v1.schema.model.Property;
import io.weaviate.client.v1.schema.model.WeaviateClass;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WeaviateHandlerClient {


    private static Config config = new Config("https", "weaviate-kubd27z4aq-uc.a.run.app");
    private static WeaviateClient client = new WeaviateClient(config);
    public static Boolean dropWeaviateInstace(){
        Result<Boolean> result = client.schema().classDeleter()
                .withClassName("Vehicle")
                .run();
        if (result.hasErrors()) {
            System.out.println(result.getError());
            return false;
        }
        System.out.println(result.getResult());
        return true;
    }
    public Boolean initializeWeaviateInstance(){

        WeaviateClass vehicleClass = WeaviateClass.builder()
                .className("Vehicle")
                .description("The vehicle characteristics and information.")
                .vectorizer("text2vec-openai")
                .properties(new ArrayList<>(){{
                    add(Property.builder()
                            .dataType(new ArrayList<>(){{add(DataType.TEXT);}})
                            .description("Vehicle ID in MySql Database")
                            .name("vehicle_ID")
                            .build());
                    add(Property.builder()
                            .dataType(new ArrayList<>(){{add(DataType.TEXT);}})
                            .description("Vehicle Brand / marca del automovil")
                            .name("marca")
                            .build());
                    add(Property.builder()
                            .dataType(new ArrayList<>(){{add(DataType.TEXT);}})
                            .description("Vehicle Sub-Brand / sub-marca del automovil")
                            .name("sub_marca")
                            .build());
                    add(Property.builder()
                            .dataType(new ArrayList<>(){{add(DataType.TEXT);}})
                            .description("Vehicle Model(year) / modelo(año) del automovil")
                            .name("modelo")
                            .build());
                    add(Property.builder()
                            .dataType(new ArrayList<>(){{add(DataType.TEXT);}})
                            .description("Amount of doors / número de puertas del vehiculo")
                            .name("puertas")
                            .build());
                    add(Property.builder()
                            .dataType(new ArrayList<>(){{add(DataType.TEXT);}})
                            .description("Vehicle cost / precio del vehiculo")
                            .name("costo")
                            .build());
                    add(Property.builder()
                            .dataType(new ArrayList<>(){{add(DataType.TEXT);}})
                            .description("This refers to the amount of kilometers travel per liter. The less kilometers per liter, the worst the performance. In Spanish this is known as rendimiento de combustible.")
                            .name("rendimiento")
                            .build());
                    add(Property.builder()
                            .dataType(new ArrayList<>(){{add(DataType.TEXT);}})
                            .description("Type of fuel / tipo de combustible")
                            .name("combustible")
                            .build());
                    add(Property.builder()
                            .dataType(new ArrayList<>(){{add(DataType.TEXT);}})
                            .description("bolsas_de_aire")
                            .name("bolsas_de_aire")
                            .build());
                    add(Property.builder()
                            .dataType(new ArrayList<>(){{add(DataType.TEXT);}})
                            .description("Type of traction / tipo de tracción")
                            .name("traccion")
                            .build());
                    add(Property.builder()
                            .dataType(new ArrayList<>(){{add(DataType.TEXT);}})
                            .description("vehicle options  /  Opciones de colores")
                            .name("colores")
                            .build());
                   add(Property.builder()
                           .dataType(new ArrayList<>(){{add(DataType.TEXT);}})
                           .description("Dealership Name  / Ubicación de agencia")
                           .name("agencia")
                           .build());
                    add(Property.builder()
                            .dataType(new ArrayList<>(){{add(DataType.TEXT);}})
                            .description("Vehicle Information / Información del vehiculo")
                            .name("informacion")
                            .build());
                }})
                .build();

        Result<Boolean> result = client.schema().classCreator().withClass(vehicleClass).run();
        if(result.hasErrors()){
            System.out.println(result.getError());
            return false;
        }
        System.out.println(result.getResult());
        System.out.println("Created Class Vehicle on Weaviate Instance");
        return true;
    }

    public String createNewObject(VehicleDto vehicleDto, AddressDto addressDto){
        Map<String, Object> dataSchema = new HashMap<>();
        dataSchema.put("vehicle_ID",     "vehicle_id: "+vehicleDto.getVehicleId());
        dataSchema.put("marca",          (String)vehicleDto.getBrand());
        dataSchema.put("sub_marca",      (String)vehicleDto.getSubBrand());
        dataSchema.put("modelo",         ""+vehicleDto.getModel());
        dataSchema.put("puertas",        ""+vehicleDto.getDoors());
        dataSchema.put("costo",          "$"+vehicleDto.getPrice()+" MXN");
        dataSchema.put("rendimiento",    ""+vehicleDto.getPerformance()+" kml/");
        dataSchema.put("combustible",    ""+vehicleDto.getFuel());
        dataSchema.put("bolsas_de_aire", ""+vehicleDto.getAirbags());
        dataSchema.put("traccion",       ""+vehicleDto.getTraction());
        dataSchema.put("colores",        ""+vehicleDto.getColors().toString());
        dataSchema.put("agencia",        ""+vehicleDto.getDealershipName()+", "+addressDto.getAddress()+" " + addressDto.getNo_appartment()+", "+addressDto.getCity()+", "+addressDto.getState());
        dataSchema.put("informacion",    ""+vehicleDto.getInfo());

        Result<WeaviateObject> result = client.data().creator()
                .withClassName("Vehicle")
                .withProperties(dataSchema)
                .withConsistencyLevel(ConsistencyLevel.ALL)
                .run();

        if (result.hasErrors()) {
            System.out.println(result.getError());
            return "error";
        }
        System.out.println(result.getResult());
        return result.getResult().getId();
    }

    public Boolean updateObject(VehicleDto vehicleDto, AddressDto addressDto, String weaviateId){
        Map<String, Object> dataSchema = new HashMap<>();
        dataSchema.put("vehicle_ID",     "vehicle_id: "+vehicleDto.getVehicleId());
        dataSchema.put("marca",          ""+vehicleDto.getBrand());
        dataSchema.put("sub_marca",      ""+vehicleDto.getSubBrand());
        dataSchema.put("modelo",         ""+vehicleDto.getModel());
        dataSchema.put("puertas",        ""+vehicleDto.getDoors());
        dataSchema.put("costo",          "$"+vehicleDto.getPrice()+" MXN");
        dataSchema.put("rendimiento",    ""+vehicleDto.getPerformance()+" kml/");
        dataSchema.put("combustible",    ""+vehicleDto.getFuel());
        dataSchema.put("bolsas_de_aire", ""+vehicleDto.getAirbags());
        dataSchema.put("traccion",       ""+vehicleDto.getTraction());
        dataSchema.put("colores",        ""+vehicleDto.getColors().toString());
        dataSchema.put("agencia",        ""+vehicleDto.getDealershipName()+", "+addressDto.getAddress()+" " + addressDto.getNo_appartment()+", "+addressDto.getCity()+", "+addressDto.getState());
        dataSchema.put("informacion",    ""+vehicleDto.getInfo());

        Result<Boolean> result = client.data().updater()
                .withID(weaviateId)
                .withClassName("Vehicle")
                .withProperties(dataSchema)
                .withConsistencyLevel(ConsistencyLevel.ALL)
                .run();

        if (result.hasErrors()) {
            System.out.println(result.getError());
            return false;
        }
        System.out.println(result.getResult());
        return true;
    }
    public List<Integer> generativeOpenAiSearch(String userNatLangQuery){
        Field vehicle_ID = Field.builder().name("vehicle_ID").build();
        Field marca = Field.builder().name("marca").build();
        Field sub_marca = Field.builder().name("sub_marca").build();
        Field modelo = Field.builder().name("modelo").build();
        Field puertas = Field.builder().name("puertas").build();
        Field costo = Field.builder().name("costo").build();
        Field rendimiento = Field.builder().name("rendimiento").build();
        Field combustible = Field.builder().name("combustible").build();
        Field bolsas_de_aire = Field.builder().name("bolsas_de_aire").build();
        Field traccion = Field.builder().name("traccion").build();
        Field colores = Field.builder().name("colores").build();
        Field agencia = Field.builder().name("agencia").build();
        Field informacion = Field.builder().name("informacion").build();

        // instruction for the generative module
        GenerativeSearchBuilder generativeSearch = GenerativeSearchBuilder.builder()
                .groupedResultTask("Dame una lista con los vehicle_ID de los autos que cumplan con la descripción" +
                        " " + userNatLangQuery  + "; la lista con esta estructura : [12, 9, 34, ... , n, n+1], " +
                        "sin identificadores como 'vehicle_Id'. Únicamente dame la lista, sin ninguna descripción." +
                        "En caso de no encontrar ningún auto que cumpla con la descripción, sólo regresame '[]'.")
                .build();

       NearTextArgument nearText = client.graphQL().arguments().nearTextArgBuilder()
               .concepts(userNatLangQuery.split(" "))
               .certainty(0.75f)
               .build();

        Result<GraphQLResponse> result = client.graphQL().get()
                .withClassName("Vehicle")
                .withFields(vehicle_ID, marca, sub_marca,
                        modelo, puertas, costo, rendimiento,
                        combustible, bolsas_de_aire, traccion,
                        colores, agencia,informacion)
                .withNearText(nearText)
                .withLimit(50)
                .withGenerativeSearch(generativeSearch)
                .run();
        Result<GraphQLResponse> resultTwo = client.graphQL().get()
                .withClassName("Vehicle")
                .withFields(vehicle_ID, marca, sub_marca,
                        modelo, puertas, costo, rendimiento,
                        combustible, bolsas_de_aire, traccion,
                        colores, agencia,informacion)
                .withNearText(nearText)
                .withLimit(50)
                .run();

        System.out.println(result.getResult());
        List<Integer> ids = new ArrayList<>();
        try{
            List<Map<String, Object>> vehicles = extractResult(result, "Vehicle");
            Map _additional = (Map) vehicles.get(0).get("_additional");
            Map generate = (Map) _additional.get("generate");
            String groupedResult = (String) generate.get("groupedResult");
            ids = extractIntegers(groupedResult);
        }catch (Exception e){
            System.out.println(e.getMessage());
        }
        try{
            List<Map<String, Object>> vehicles_two = extractResult(resultTwo, "Vehicle");
            Integer currentId;
            for(Map<String, Object> vehicle : vehicles_two){
                // ids.add((Integer) vehicle.get("vehicle_ID"));
                currentId = extractIntegers(vehicle.get("vehicle_ID").toString()).get(0);
                if(!ids.contains(currentId)){
                    ids.add(currentId);
                }
            }
            System.out.println(ids);
            return ids;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        System.out.println(result.getError());
        return new ArrayList<>();
    }

    public Boolean objectExists(String weaviateId){
        Result<Boolean> result = client.data().checker()
                .withClassName("Vehicle")
                .withID(weaviateId)
                .run();

        if (result.hasErrors()) {
            System.out.println(result.getError());
            return false;
        }
        System.out.println(result.getResult());
        return true;
    }
    public List<WeaviateObject> getObject(String weaviateId){
        Result<List<WeaviateObject>> result = client.data().objectsGetter()
                .withClassName("Vehicle")
                .withID(weaviateId)
                .withConsistencyLevel(ConsistencyLevel.ALL)  // default QUORUM
                .run();

        if (result.hasErrors()) {
            return result.getResult();
        }
        return result.getResult();
    }

    private static List<Map<String, Object>> extractResult(Result<GraphQLResponse> result, String className) {
        GraphQLResponse resp = result.getResult();
        Map data = (Map) resp.getData();
        Map get = (Map) data.get("Get");
        return (List) get.get(className);
    }
    public static List<Integer> extractIntegers(String input) {
        List<Integer> integers = new ArrayList<>();

        StringBuilder currentNumber = new StringBuilder();
        boolean isNumber = false;

        for (char c : input.toCharArray()) {
            if (Character.isDigit(c)) {
                currentNumber.append(c);
                isNumber = true;
            } else {
                if (isNumber) {
                    integers.add(Integer.parseInt(currentNumber.toString()));
                    currentNumber.setLength(0);
                    isNumber = false;
                }
            }
        }

        if (isNumber) {
            integers.add(Integer.parseInt(currentNumber.toString()));
        }

        return integers;
    }

}
