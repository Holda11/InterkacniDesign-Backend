import fastifyPlugin from 'fastify-plugin';

export default fastifyPlugin(async (fastify) => {
  fastify.register(import('@fastify/jwt'), {
    secret: process.env.JWT_SECRET || 'tajny-klic',
  });

  fastify.decorate('authenticate', async (request, reply) => {
    console.log('authenticate called');
    try {
      await request.jwtVerify();
    } catch (err) {
      console.error('Authentication error:', err);
      reply.code(401).send({ message: 'Unauthorized' });
    }
  });

  console.log('authPlugin: authenticate method successfully decorated.');
});
