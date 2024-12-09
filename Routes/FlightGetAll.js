import { User } from "../Models/user.model.js"

export default async function FlightGetAll(fastify){
    fastify.get('/users/:id/flights', async (req, res) =>{
        const { id } = req.params

        try {
            const user = await User.findById(id).populate('flights')

            if(!user){
                return res.status(404).send({ error: 'User not found'})
            }

            return res.send(user.flights)
        } catch (error) {
            
        }
    })
}