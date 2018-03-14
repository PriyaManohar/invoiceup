package com.priya.medinvoice.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class InsuranceProvider {

    private String name;
    private String address1,address2,town,postcode;

    public InsuranceProvider(){

    }

    @JsonProperty
    public String getName() {
        return name;
    }

    @JsonProperty
    public void setName(String name) {
        this.name = name;
    }

    @JsonProperty
    public String getPostcode() {
        return postcode;
    }

    @JsonProperty
    public void setPostcode(String postcode) {
        this.postcode = postcode;
    }

    @JsonProperty
    public String getTown() {

        return town;
    }

    @JsonProperty
    public void setTown(String town) {
        this.town = town;
    }

    @JsonProperty
    public String getAddress2() {

        return address2;
    }

    @JsonProperty
    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    @JsonProperty
    public String getAddress1() {

        return address1;
    }

    @JsonProperty
    public void setAddress1(String address1) {
        this.address1 = address1;
    }
}
