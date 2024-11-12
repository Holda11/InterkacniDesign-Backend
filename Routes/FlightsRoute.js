import {getJson} from  'serpapi'

async function FlightsRoute (fastify, options) {
    fastify.get('/Flights', async (req, rep) => {
        try {
            let data = getJson
        } catch (error) {
            
        }

        return {hello: 'world'}
    })
}

 export default FlightsRoute