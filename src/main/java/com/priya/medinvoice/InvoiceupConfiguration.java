package com.priya.medinvoice;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.dropwizard.Configuration;
import org.hibernate.validator.constraints.NotEmpty;

public class InvoiceupConfiguration extends Configuration {

    @NotEmpty
    private String mongoHost,mongoDB,mongoPort;


    @JsonProperty
    public String getMongoDB() {
        return mongoDB;
    }

    @JsonProperty
    public void setMongoDB(String mongoDB) {
        this.mongoDB = mongoDB;
    }

    @JsonProperty
    public String getMongoPort() {
        return mongoPort;
    }

    @JsonProperty
    public void setMongoPort(String mongoPort) {
        this.mongoPort = mongoPort;
    }

    @JsonProperty
    public String getMongoHost() {
        return mongoHost;
    }

    @JsonProperty
    public void setMongoHost(String mongoHost) {
        this.mongoHost = mongoHost;
    }
}
