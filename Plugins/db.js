import mongoose from 'mongoose';

// Tato funkce připojuje MongoDB k Fastify
export async function connectDB(fastify) {
  try {
    // Připojení k MongoDB pomocí URL z environmentální proměnné
    await mongoose.connect(process.env.MONGO_URL, {});

    // Logování úspěšného připojení
    fastify.log.info('MongoDB připojeno!');
    
    // Po úspěšném připojení připojte mongoose k Fastify
    fastify.decorate('mongo', mongoose.connection);
  } catch (err) {
    // Chyby při připojování k databázi
    fastify.log.error('MongoDB connection error:', err);
    process.exit(1); // Ukončete aplikaci, pokud není možné připojit k databázi
  }
}
