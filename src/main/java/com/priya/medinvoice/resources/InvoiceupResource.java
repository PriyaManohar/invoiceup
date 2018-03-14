package com.priya.medinvoice.resources;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.priya.medinvoice.InvoiceupConfiguration;
import com.priya.medinvoice.model.ClinicalCode;
import com.priya.medinvoice.model.InsuranceProvider;
import com.priya.medinvoice.service.InvoiceupService;
import org.bson.Document;


import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/webapi/invoiceup/")
@Produces (MediaType.APPLICATION_JSON)
public class InvoiceupResource {

    private MongoDatabase db;
    InvoiceupService myService = new InvoiceupService();

    public InvoiceupResource(MongoDatabase db){
        this.db = db;
    }

    @Path("/chaptercodes")
    @GET
    public Response getChapterInformation(@QueryParam("provider") String provider, @QueryParam("chapter") String chapter){
        List<ClinicalCode> clist = myService.retrieveCodesByChapter(db,provider,chapter);
        return Response.status(Response.Status.OK).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT").entity(clist).build();
    }

    @Path("/provider")
    @GET
    public Response getProviderInformation(@QueryParam("provider") String provider){
        List<InsuranceProvider> iList = myService.retrieveProviderInformation(db,provider);
        return Response.status(Response.Status.OK).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT").entity(iList).build();
    }

    @Path("/search")
    @GET
    public Response getSearchInformation(@QueryParam("provider") String provider,@QueryParam("searchString") String searchString){
        List<ClinicalCode> clinList = myService.retrieveSearchInformation(db,provider,searchString);
        return Response.status(Response.Status.OK).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT").entity(clinList).build();
    }

    @Path("/providerdb")
    @GET
    public Response getProviderDB(@QueryParam("provider") String provider){
        List<ClinicalCode> provdbList = myService.getProviderDB(db,provider);
        return Response.status(Response.Status.OK).header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT").entity(provdbList).build();

    }

}
