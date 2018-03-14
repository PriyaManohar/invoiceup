package com.priya.medinvoice.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class ClinicalCode {

    private String code;
    private String description;
    private String chapter_number;
    private int anaes_fees;
    private int surg_fees;
    private String provider;

    public ClinicalCode(){

    }

    @JsonProperty
    public int getSurg_fees() {
        return surg_fees;
    }

    @JsonProperty
    public void setSurg_fees(int surg_fees) {
        this.surg_fees = surg_fees;
    }

    @JsonProperty
    public int getAnaes_fees() {
        return anaes_fees;
    }

    @JsonProperty
    public void setAnaes_fees(int anaes_fees) {
        this.anaes_fees = anaes_fees;
    }

    @JsonProperty
    public String getChapter_number() {
        return chapter_number;
    }

    @JsonProperty
    public String getProvider() {
        return provider;
    }

    @JsonProperty
    public void setProvider(String provider) {
        this.provider = provider;
    }

    @JsonProperty
    public void setChapter_number(String chapter_number) {
        this.chapter_number = chapter_number;
    }

    @JsonProperty
    public String getDescription() {

        return description;
    }

    @JsonProperty
    public void setDescription(String description) {
        this.description = description;
    }

    @JsonProperty
    public String getCode() {

        return code;
    }

    @JsonProperty
    public void setCode(String code) {
        this.code = code;
    }
}
