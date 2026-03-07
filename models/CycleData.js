import mongoose from "mongoose";

const cycleDataSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 12,
      max: 60,
    },
    cycleLength: {
      type: Number,
      default: 28,
      min: 0,
      max: 60,
    },
    periodDuration: {
      type: Number,
      default: 5,
      min: 0,
      max: 30,
    },
    lastPeriodStart: {
      type: String,
      required: true,
    },
    lastPeriodEnd: {
      type: String,
      default: null,
    },
    ovulationDay: {
      type: Number,
      default: null,
      min: 1,
      max: 60,
    },
    region: {
      type: String,
      default: "general",
      enum: ["general", "mexico", "colombia", "argentina", "peru", "chile", "centroamerica", "espana"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.CycleData || mongoose.model("CycleData", cycleDataSchema);
