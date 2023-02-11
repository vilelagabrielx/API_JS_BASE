import { Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
const routes = Router();
routes.use('/products', productsRouter);
// routes.get('/', (request, response) => {
//   return response.json({ message: 'Hello DEV!' });
// });

export default routes;
