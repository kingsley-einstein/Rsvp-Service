import db from "../db";

const { Rsvp } = db;

export default class RsvpController {
  async create(req: any, res: any): Promise<void> {
    try {
      const { body } = req;
      const rsvp = await Rsvp.create(body);
      res.status(201).json({
        statusCode: 201,
        body: rsvp
      })
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  async getByEventId(req: any, res: any): Promise<void> {
    try {
      const { eventId } = req.params;
      const body = await Rsvp.findByEventId(eventId);
      res.status(200).json({
        statusCode: 200,
        body
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  async getByUserId(req: any, res: any): Promise<void> {
    try {
      const { user } = req;
      const body = await Rsvp.findByUserId(user.id);
      res.status(200).json({
        statusCode: 200,
        body
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  async deleteRsvp(req: any, res: any): Promise<void> {
    try {
      const { id } = req.params;
      const body = await Rsvp.destroy({ where: { id } });
      res.status(200).json({
        statusCode: 200,
        body
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  async deleteAllRsvpByUser(req: any, res: any): Promise<void> {
    try {
      const { user } = req;
      const userId = user.id;
      const body = await Rsvp.destroy({ where: { userId } });
      res.status(200).json({
        statusCode: 200,
        body
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }

  async deleteAllRsvpByEventId(req: any, res: any): Promise<void> {
    try {
      const { eventId } = req.params;
      const body = await Rsvp.destroy({ where: { eventId } });
      res.status(200).json({
        statusCode: 200,
        body
      });
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        body: error
      });
    }
  }
}
