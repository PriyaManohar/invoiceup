package com.priya.medinvoice.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonArrayFormatVisitor;
import com.mongodb.Block;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.priya.medinvoice.model.ClinicalCode;
import com.priya.medinvoice.model.InsuranceProvider;
import org.bson.Document;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.*;

public class InvoiceupService {


    public InvoiceupService(){

    }


    public List<ClinicalCode> retrieveCodesByChapter(MongoDatabase db,String provider,String chapter){

        final ArrayList<ClinicalCode> codeList = new ArrayList<ClinicalCode>();
        final ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        MongoCollection<Document> collection = db.getCollection(provider);
        System.out.println("chapter"+chapter+"same");
        FindIterable<Document> iterable =  collection.find(eq("chapter_number", chapter));
        iterable.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document) {

                try {
                    ClinicalCode cCode = objectMapper.readValue(document.toJson(), ClinicalCode.class);
                    codeList.add(cCode);
                    System.out.println(cCode.getCode());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
        return codeList;
    }

    public List<ClinicalCode> getProviderDB(MongoDatabase db,String provider){

        final ArrayList<ClinicalCode> cList = new ArrayList<ClinicalCode>();
        final ObjectMapper objectMapper = new ObjectMapper();
        String prov = Character.toUpperCase(provider.charAt(0)) + provider.substring(1);
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        MongoCollection<Document> collection = db.getCollection(provider);
        FindIterable<Document> iterable =  collection.find(eq("provider", prov));
        iterable.forEach(new Block<Document>() {

            @Override
            public void apply(final Document document) {

                try {
                    ClinicalCode cCode = objectMapper.readValue(document.toJson(), ClinicalCode.class);
                    cList.add(cCode);
                    System.out.println(cCode.getCode());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
        System.out.println(cList);
        return cList;
    }

    public List<InsuranceProvider> retrieveProviderInformation(MongoDatabase db,String provider){

        final ArrayList<InsuranceProvider> providerList = new ArrayList<InsuranceProvider>();
        final ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        MongoCollection<Document> collection = db.getCollection("providerscontact");
        FindIterable<Document> iterable =  collection.find(eq("name", provider));
        iterable.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document) {

                try {
                    InsuranceProvider inProvider = objectMapper.readValue(document.toJson(), InsuranceProvider.class);
                    providerList.add(inProvider);
                    System.out.println(inProvider.getPostcode());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
        return providerList;

    }

    public List<ClinicalCode> retrieveSearchInformation(MongoDatabase db,String provider,String searchString){

        final ArrayList<ClinicalCode> clincodeList = new ArrayList<ClinicalCode>();
        final ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        MongoCollection<Document> collection = db.getCollection(provider);
        FindIterable<Document> iterable =  collection.find(Filters.text(searchString));
        iterable.forEach(new Block<Document>() {
            @Override
            public void apply(final Document document) {

                try {
                    ClinicalCode clin_code = objectMapper.readValue(document.toJson(), ClinicalCode.class);
                    clincodeList.add(clin_code);
                    System.out.println(clin_code.getCode());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        });
        return clincodeList;
    }

}


