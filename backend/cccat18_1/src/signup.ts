import express from "express";
import routes from "./infra/rest/UserRoutes"

const app = express();
app.use(express.json());
app.use(routes);
app.listen(3000);

export default app;