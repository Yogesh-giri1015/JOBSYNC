const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    companyLogo: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    workMode: {
      type: String,
      enum: ["Remote", "Hybrid", "On-site"],
      default: "On-site",
    },

    type: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship"],
      required: true,
    },

    experience: {
      type: String,
      enum: ["0-1 Years", "1-3 Years", "3-5 Years", "5+ Years"],
      default: "0-1 Years",
    },

    salary: {
      type: Number,
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);