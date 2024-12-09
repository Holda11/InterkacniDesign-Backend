import { User } from '../Models/user.model.js';
import bcrypt from 'bcrypt'

export default async function UserLoginRoute(fastify) {
    fastify.post('/login', async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send({ error: 'Chybí email nebo heslo' });
        }

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).send({ error: 'Neplatné přihlašovací údaje' });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).send({ error: 'Neplatné přihlašovací údaje' });
            }

            const token = fastify.jwt.sign({ id: user._id, email: user.email });
            res.send({ token, userId: user._id, userName: user.userName }); // Vrátíme i userName
        } catch (error) {
            res.status(500).send({ error: 'Chyba při přihlášení' });
        }
    });
}
