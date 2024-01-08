package com.driveai.salesprocessms.others;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

@Converter
public class JSONObjectConverter implements AttributeConverter<JSONObject, String> {
    @Override
    public String convertToDatabaseColumn(JSONObject attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.toJSONString();
    }

    @Override
    public JSONObject convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        try {
            JSONParser parser = new JSONParser();
            return (JSONObject) parser.parse(dbData);
        } catch (ParseException e) {
            throw new RuntimeException("Failed to parse JSON data: " + dbData, e);
        }
    }
}
