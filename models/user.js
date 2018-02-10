import mongoose from 'mongoose';

const { Schema } = mongoose;

export default new Schema(
  {
    userType: {
      type: String,
      required: true,
      enum: ['student', 'teacher']
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    isEmailVerified: Boolean,
    firstName: String,
    familyName: String,
    location: {
      country: String,
      address: String,
      city: String,
      state: String,
      province: String,
      zip: String,
      loc: {
        // first type is a key of loc, second type if the type of type
        type: { type: String },
        coordinates: [Number]
      }
    },
    lastLogin: Date,
    loginCounts: { type: Number, default: 0 },
    activeClasses: [ { type: Schema.Types.ObjectId, ref: 'Class' } ],
    archievedClasses: [ { type: Schema.Types.ObjectId, ref: 'Class' } ],
    resetPasswordExpires: Date,
    resetPasswordToken: String,
    notifications: [ { type: Schema.Types.ObjectId, ref: 'Notification' } ]
  },
  {
    timestamps: true,
    toObject: {
      // remove password when converting from document to Javascript object using toObject method
      // toObject is usually called when sending the document to api through res.json
      transform: (doc, ret, opts) => {
        delete ret.password;
        return ret;
      }
    }
  }
);
