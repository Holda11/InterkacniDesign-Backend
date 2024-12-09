import { configDotenv } from "dotenv";
import data from "../Data/DummyData.js";
import { getJson } from "serpapi";

configDotenv();

async function FlightsRoute(fastify, options) {
    fastify.get('/Flights', async (req, rep) => {
        try {
            const { departure, arrival, departureDate } = req.query;

            // Zpracování lokálních dat
            const results = data.map(airport => ({
                name: airport.city,
                state: airport.state,
                airport: airport.airport,
                iata: airport.iata
            }));

            const departureIATA = results.find(airport => airport.iata === departure)?.iata;
            const arrivalIATA = results.find(airport => airport.iata === arrival)?.iata;

            if (!departureIATA || !arrivalIATA) {
                return rep.status(400).send({ error: "Invalid departure or arrival IATA code" });
            }

            const apiKey = process.env.SERP_API;
            if (!apiKey) {
                return rep.status(500).send({ error: "Missing API key" });
            }

            // Zavolání SerpAPI s promisem
            const json = await new Promise((resolve, reject) => {
                getJson({
                    api_key: apiKey,
                    engine: "google_flights",
                    hl: "cs",
                    gl: "cz",
                    departure_id: departureIATA,
                    arrival_id: arrivalIATA,
                    outbound_date: departureDate,
                    currency: "CZK",
                    type: 2
                }, (json) => {
                    if (json.error) {
                        reject(json.error);
                    } else {
                        resolve(json);
                    }
                });
            });

            // Odeslání výsledků zpět jako JSON
            return rep.send(json);
        } catch (error) {
            console.error("Error:", error);
            return rep.status(500).send({ error: "An error occurred", details: error.message });
        }
    });
}

export default FlightsRoute;
