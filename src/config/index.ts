import actuator from "express-actuator";
import router from "../routes";
import middlewares from "../middlewares";

const { Cors } = middlewares;

export default (app: any) => {
  return (logger: any, { json, urlencoded }) => {
    app.use(json());
    app.use(urlencoded({ extended: false }));
    app.use(Cors("*"));
    app.use(logger("dev"));
    app.use(actuator());

    // Healthcheck route for Kintohub's consumption
    app.get("/", (req: any, res: any) => {
      res.status(200).json({
        status: "UP"
      });
    });

    app.use("/api/v1", router);
  }
}
