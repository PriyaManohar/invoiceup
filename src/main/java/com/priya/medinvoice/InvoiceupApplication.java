package com.priya.medinvoice;

import com.mongodb.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.priya.medinvoice.database.MongoManaged;
import com.priya.medinvoice.resources.InvoiceupResource;
import io.dropwizard.Application;
import io.dropwizard.assets.AssetsBundle;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

public class InvoiceupApplication extends Application<InvoiceupConfiguration> {

    public static void main(String[] args) throws Exception {
        new InvoiceupApplication().run(args);
    }



    @Override
    public void initialize(Bootstrap<InvoiceupConfiguration> bootstrap) {
        bootstrap.addBundle(new AssetsBundle("/assets/", "/","index.html"));
    }


    @Override
    public void run(InvoiceupConfiguration config, Environment environment) throws Exception {
        MongoClient mongoClient = new MongoClient(config.getMongoHost(),Integer.parseInt(config.getMongoPort()));
        MongoManaged mongoManaged = new MongoManaged(mongoClient);
        environment.lifecycle().manage(mongoManaged);
        MongoDatabase db = mongoClient.getDatabase(config.getMongoDB());
        environment.jersey().setUrlPattern("/api/*");
        environment.jersey().register(new InvoiceupResource(db));
    }
}
