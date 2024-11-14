import { configDotenv } from "dotenv";
import data from "../Data/DummyData.js";

configDotenv()
async function FlightsRoute (fastify, options) {
    fastify.get('/Flights', async (req, rep) => {
        const {departure, arriver} = req.query

        const results = data.map(airport => ({
            name: airport.city,
            state: airport.state,
            airport: airport.airport,
            iata: airport.iata
        })).filter(airport => airport.iata === departure)
        
        return results[0].name
    })
}

 export default FlightsRoute