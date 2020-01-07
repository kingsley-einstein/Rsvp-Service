export default (sequelize: any, DataTypes: any) => {
  const Rsvp = sequelize.define("rsvp", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First name is required."
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last name is required."
        }
      }
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Event ID is required."
        }
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "User ID is required."
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "User's email is required."
        }
      }
    }
  });

  Rsvp.findByEventIdAndUserId = (eventId: any, userId: any) => Rsvp.findOne({ where: { eventId, userId } });
  Rsvp.findByEventId = (eventId: any) => Rsvp.findAll({ where: { eventId } });
  Rsvp.findByUserId = (userId: any) => Rsvp.findAll({ where: { userId } });

  return Rsvp;
};
