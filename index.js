import { fastify } from "fastify";
import FlightsRoute from "./Routes/FlightsRoute.js";

const app = fastify({
    logger: true
}) 

app.register(FlightsRoute)

app.listen({port: 3000}, (err, address)=>{
    if(err){
        fastify.log.error(err)
        process.exit(1)
    }
})