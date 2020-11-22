import { Router } from 'express';
import bookingRouter from './bookings';
import propertiesRouter from './properties';

const rootApiRouter = Router();

rootApiRouter.use('/properties', propertiesRouter);

rootApiRouter.use('/booking', bookingRouter);

export default rootApiRouter;
