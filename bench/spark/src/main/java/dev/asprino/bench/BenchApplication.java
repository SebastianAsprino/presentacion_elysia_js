package dev.asprino.bench;

import static spark.Spark.get;
import static spark.Spark.afterAfter;
import static spark.Spark.port;

public class BenchApplication {

    public static void main(String[] args) {
        port(3000);

        afterAfter((req, res) -> {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Cache-Control", "no-store");
        });

        get("/", (req, res) -> {
            res.type("text/plain");
            return "hello world";
        });

        get("/spark", (req, res) -> {
            res.type("text/plain");
            return "hello world";
        });
    }
}
