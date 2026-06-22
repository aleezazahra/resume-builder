import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    title: { type: String, default: "Untitled Resume" },
    public: { type: Boolean, default: true },
    template: { type: String, default: "classic" },
    accent_color: { type: String, default: "#3B82F6" },

    personal_info: {
      full_name:  { type: String, default: "" },
      headline:   { type: String, default: "" },
      title:      { type: String, default: "" },
      email:      { type: String, default: "" },
      phone:      { type: String, default: "" },
      location:   { type: String, default: "" },
      website:    { type: String, default: "" },
      image:      { type: String, default: "" },
    },

    professional_summary: { type: String, default: "" },

    experience: [
      {
        position:{ type: String, default: "" },
        company:    { type: String, default: "" },
        start_date: { type: String, default: "" },
        end_date:  { type: String, default: "" },
        is_current: { type: Boolean, default: false },
        description:{ type: String, default: "" },
      },
    ],

    education: [
      {
        degree:{ type: String, default: "" },
        field:{ type: String, default: "" },
        institution:{ type: String, default: "" },
        graduation_date:{ type: String, default: "" },
        gpa:{ type: String, default: "" },
      },
    ],

    project: [
      {
        name:        { type: String, default: "" },
        type:        { type: String, default: "" },
        description: { type: String, default: "" },
        date:        { type: String, default: "" },
      },
    ],

    skills: [{ type: String }],

    languages: [
      {
        name:  { type: String, default: "" },
        level: { type: String, default: "" },
      },
    ],

    socials: [
      {
        platform: { type: String, default: "" },
        label:    { type: String, default: "" },
        url:      { type: String, default: "" },
      },
    ],

    profiles: [
      {
        name: { type: String, default: "" },
        url:  { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Resume", ResumeSchema);