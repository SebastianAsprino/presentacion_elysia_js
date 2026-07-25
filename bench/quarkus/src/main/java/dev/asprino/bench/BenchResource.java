package dev.asprino.bench;

import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/")
public class BenchResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public Response root() {
        return respond();
    }

    @GET
    @Path("/quarkus")
    @Produces(MediaType.TEXT_PLAIN)
    public Response quarkus() {
        return respond();
    }

    private Response respond() {
        return Response.ok("hello world")
                .header("Access-Control-Allow-Origin", "*")
                .header("Cache-Control", "no-store")
                .build();
    }
}
