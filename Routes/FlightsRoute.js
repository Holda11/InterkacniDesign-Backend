import {getJson} from  'serpapi'
import { configDotenv } from "dotenv";

configDotenv()
async function FlightsRoute (fastify, options) {
    fastify.get('/Flights', async (req, rep) => {
        try {
            let data = getJson({
                api_key: process.env.SERP_API,
                engine: "google",
                q: "Coffee",
                location: "Austin, Texas, United States",
                google_domain: "google.com",
                gl: "us",
                hl: "en"
              }, (json) => {
                console.log(json);
              });
              return "Uspech"
        } catch (error) {
            
        }

        return {hello: 'world'}
    })
}

 export default FlightsRoute