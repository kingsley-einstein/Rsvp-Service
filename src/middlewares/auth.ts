import rp from "request-promise";
import helpers from "../helpers";
import db from "../db";
import env from "../env";

const { Keys } = helpers;
const { Rsvp } = db;
const { services } = env;

export default class Auth {
  static async checkKeys(req: any, res: any, next: any): Promise<void> {
    try {
      const { body } = req;
      const hasKeys = await Keys.hasKeys(body, ["firstName", "lastName", "email", "eventId", "userId"]);
      if (!hasKeys) {
        res.status(400).json({
          statusCode: 400,
          body: "Missing required keys."
        });
        return;
      }
      next();
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  static async checkAuth(req: any, res: any, next: any): Promise<void> {
    try {
      const { authorization } = req.headers;
      const token = authorization.substring(7, authorization.length);
      const opts = {
        json: true,
        resolveWithFullResponse: true,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      };
      const { body: { statusCode, body } } = await rp.get(`${services.auth}/api/v1/auth`, opts);
      console.log(body);
      if (statusCode === 401) {
        res.status(401).json({
          statusCode: 401,
          body
        });
        return;
      }
      req.user = body;
      next();
    } catch (error) {
      res.status(error.statusCode || 500).json({
        statusCode: error.statusCode || 500,
        body: error
      });
    }
  }

  static populateBody(req: any, res: any, next: any): void {
    try {
      const { user, body, params } = req;
      const { firstName, lastName } = body;
      const newBody = {
        firstName,
        lastName,
        email: user.email,
        userId: user.id,
        eventId: params.eventId
      };
      req.body = newBody;
      next();
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  static async checkIfRsvped(req: any, res: any, next: any): Promise<void> {
    try {
      const { body } = req;
      const rsvped = await Rsvp.findByEventIdAndUserId(body.eventId, body.userId);
      if (rsvped) {
        res.status(400).json({
          statusCode: 400,
          body: "You already RSVPed to this event."
        });
        return;
      }
      next();
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }
}
