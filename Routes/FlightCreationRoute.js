import { Flight } from "../Models/flight.model.js";
import { User } from "../Models/user.model.js";

export default async function FlightCreationRoute(fastify) {
    fastify.post('/flights', async (req, res) =>{
        const { userId, departure_Airport, arrival_Airport, return_departure_Airport, return_arrival_Airport, departure_Date, return_Date, departure_IATA, arrival_IATA, price, layovers} = req.body
        
        try {
            const user = await User.findById(userId)
            if(!user){
                return res.status(404).send({error: 'User not found'})
            }
            
            const flight = new Flight({
                user: userId,
                departure_Airport: departure_Airport,
                arrival_Airport: arrival_Airport,
                return_departure_Airport: return_departure_Airport,
                return_arrival_Airport: return_arrival_Airport,
                departure_Date: departure_Date,
                return_Date: return_Date,
                departure_IATA: departure_IATA,
                arrival_IATA: arrival_IATA,
                price: price,
                layovers: layovers,
            })
            console.log(flight)
            await flight.save()

            user.flights.push(flight._id)
            await user.save();

            return res.status(201).send(flight);

        } catch (error) {
            return res.status(500).send({ error: 'Error occured'})
        }
    })
}