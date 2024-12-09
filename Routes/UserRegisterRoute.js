import { User } from '../Models/user.model.js';
import bcrypt from 'bcrypt';

export async function UserRegisterRoute(fastify, options) {
    fastify.post('/register', async (req, res) => {
        const { userName, firstName, lastName, email, password } = req.body;

        if (!userName || !firstName || !lastName || !email || !password) {
            return res.code(400).send({ error: 'Missing informations' });
        }

        // Zkontroluj, jestli je připojení k databázi
        if (!fastify.mongo || !fastify.mongo.db) {
            fastify.log.error('MongoDB is not initialized or available');
            return res.code(500).send({ error: 'Database not connected' });
        }

        try {
            // Zkontroluj, jestli už uživatel s tímto jménem existuje
            const existingUser = await User.findOne({ userName });
            if (existingUser) {
                return res.code(400).send({ error: 'Username already taken' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // Vytvoření nového uživatele a uložení do databáze
            const user = new User({ userName, firstName, lastName, email, password: hashedPassword });
            await user.save();

            // Generování JWT tokenu
            const token = fastify.jwt.sign({ userId: user._id, email: user.email });

            // Odeslání odpovědi
            res.status(201).send({ userName, userId: user._id, token });
        } catch (err) {
            fastify.log.error(err);
            res.status(500).send({ error: 'Chyba při registraci' });
        }
    });
}
