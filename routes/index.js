import restaurantRoutes from './restaurants.js';

const constructorMethod = (app) => {
  app.use('/', restaurantRoutes);
  app.use('*', (req, res) => {
    return res.status(404).render('../views/error', {title: "Error 404", error: "Error 404: Webpage Not Found"});
  });
};

export default constructorMethod;