import { fastify } from 'fastify';
import FlightsRoute from './Routes/FlightsRoute.js';
import UserLoginRoute from './Routes/UserLoginRoute.js';
import { UserRegisterRoute } from './Routes/UserRegisterRoute.js';
import { connectDB } from './Plugins/db.js';
import cors from '@fastify/cors';
import authPlugin from './Plugins/authPlugin.js';
import { configDotenv } from 'dotenv';
import FlightGetAll from './Routes/FlightGetAll.js';
import FlightCreationRoute from './Routes/FlightCreationRoute.js';

configDotenv();
const app = fastify({ logger: true });

await connectDB(app);

// Registrace pluginů
app.register(cors, { origin: '*' });
app.register(authPlugin); // Registrace authPlugin

// Registrace rout
app.register(FlightsRoute);
app.register(UserLoginRoute);
app.register(UserRegisterRoute);
app.register(FlightGetAll)
app.register(FlightCreationRoute)
console.log('Authenticate function exists?', typeof app.authenticate); // Ověříme, že authenticate existuje.

// Zde můžeš mít chráněnou route pouze jednou
app.get('/protected', { preHandler: app.authenticate }, async (request, reply) => {
  reply.send({ message: 'Úspěšně ověřeno!', user: request.user });
});

app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server běží na ${address}`);
});
