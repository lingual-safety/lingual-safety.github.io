/**
 * LingualSafety 1.0 - Site Configuration
 * ==========================================
 * Edit ONLY this file to update links, dates, and placeholder content.
 * All values marked "TODO - TO BE ANNOUNCED" should be filled in
 * before publishing the final version of the site.
 *
 * Do NOT hard-code these values elsewhere in the codebase.
 */

const CONFIG = {
  // Task identity
  taskName: "LingualSafety 1.0",
  taskFullTitle: "Building Jailbreak Defences Against Multilingual Jailbreak Attacks",
  taskSubtitle: "ICON 2026 Shared Task",
  conference: "ICON 2026",
  conferenceLocation: "Guwahati, India",

  // External links
  codalabURL: "https://www.codabench.org/competitions/17783/",
  codabenchURL: "https://www.codabench.org/competitions/17783/",
  githubURL: "TODO",
  baselineURL: "TODO",
  datasetURL: "TODO",
  iconConferenceURL: "TODO",
  contactEmail: "TODO",
  registrationURL: "TODO",

  // Important dates & Timeline Events
  // The website automatically calculates event status (completed, current/upcoming, future)
  // based on today's date. The vertical timeline bar remains stationary.
  timelineEvents: [
    {
      date: "2026-08-31",
      displayDate: "31 Aug 2026",
      title: "Task website goes live",
      description: "Official release of the LingualSafety 1.0 task website and documentation."
    },
    {
      date: "2026-09-04",
      displayDate: "04 Sep 2026",
      title: "Starter kit released",
      description: "Baseline scripts, validation tools, and submission templates available."
    },
    {
      date: "2026-09-10",
      displayDate: "10 Sep 2026",
      title: "Training and validation data released",
      description: "Release of multilingual prompts and dataset splits for training and dev."
    },
    {
      date: "2026-09-15",
      displayDate: "15 Sep 2026",
      title: "Evaluation (test) set released",
      description: "Evaluation phase opens on the competition platform."
    },
    {
      date: "2026-09-25",
      displayDate: "25 Sep 2026",
      title: "Final date for run submissions",
      description: "Submission deadline for final model outputs and defences."
    },
    {
      date: "2026-09-26",
      displayDate: "26 Sep 2026",
      title: "Task results and rankings published",
      description: "Official leaderboard rankings and evaluation metrics announced."
    },
    // {
    //   date: "2026-10-25",
    //   displayDate: "25 Oct 2026",
    //   title: "Participant system papers due",
    //   description: "Deadline for system description papers detailing defence methodologies."
    // },
    // {
    //   date: "2026-11-25",
    //   displayDate: "25 Nov 2026",
    //   title: "Acceptance decisions communicated",
    //   description: "Notification of acceptance for workshop presentations and proceedings."
    // },
    // {
    //   date: "2026-12-10",
    //   displayDate: "10 Dec 2026",
    //   title: "Camera-ready working notes",
    //   description: "Final camera-ready papers submitted for ICON 2026 proceedings."
    // }
  ],

  dates: {
    registrationOpen: "07 Aug 2026",
    trainingDataRelease: "20 Aug 2026",
    developmentPhaseStart: "10 Aug 2026",
    developmentPhaseEnd: "01 Oct 2026",
    submissionDeadline: "01 Oct 2026",
    resultsLeaderboard: "04 Oct 2026",
    systemPaperDeadline: "25 Oct 2026",
    conference: "ICON 2026 - Guwahati, India",
  },

  // Submission details
  submission: {
    format: "To be announced",
    maxSubmissions: "To be announced",
    evaluationInstructions: "To be announced",
  },

  // Statistics
  stats: {
    prompts: "18,235+",
    languages: "5",
    persuasionTechniques: "6",
    safetyCategories: "13",
  },
};

window.SITE_CONFIG = CONFIG;
