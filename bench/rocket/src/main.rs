#[macro_use]
extern crate rocket;

use rocket::fairing::{Fairing, Info, Kind};
use rocket::http::Header;
use rocket::{Request, Response};

pub struct Headers;

#[rocket::async_trait]
impl Fairing for Headers {
    fn info(&self) -> Info {
        Info {
            name: "CORS + no-store",
            kind: Kind::Response,
        }
    }

    async fn on_response<'r>(&self, _request: &'r Request<'_>, response: &mut Response<'r>) {
        response.set_header(Header::new("Access-Control-Allow-Origin", "*"));
        response.set_header(Header::new("Cache-Control", "no-store"));
    }
}

#[get("/")]
fn index() -> &'static str {
    "hello world"
}

#[get("/rocket")]
fn rocket_route() -> &'static str {
    "hello world"
}

#[launch]
fn rocket() -> _ {
    rocket::build()
        .attach(Headers)
        .mount("/", routes![index, rocket_route])
}
