/**
 * Fictional demonstration data. No real applicant information is used.
 */

export const DEMO_STATS = {
  totalApplications: 128,
  incompleteApplications: 24,
  pendingResponses: 17,
  upcomingDeadlines: 8,
};

export type ActivityItem = {
  id: string;
  applicant: string;
  programme: string;
  action: string;
  status: "complete" | "incomplete" | "pending" | "deadline";
  time: string;
};

export const DEMO_ACTIVITY: ActivityItem[] = [
  {
    id: "APP-10241",
    applicant: "Thandi Nkosi",
    programme: "BSc Computer Science",
    action: "Transcript uploaded — awaiting verification",
    status: "pending",
    time: "12 min ago",
  },
  {
    id: "APP-10236",
    applicant: "Liam Fourie",
    programme: "BCom Accounting",
    action: "Missing ID document request sent",
    status: "incomplete",
    time: "48 min ago",
  },
  {
    id: "APP-10229",
    applicant: "Aisha Patel",
    programme: "BA Psychology",
    action: "Application file marked complete",
    status: "complete",
    time: "2 hrs ago",
  },
  {
    id: "APP-10218",
    applicant: "Sipho Dlamini",
    programme: "BEng Civil Engineering",
    action: "Applicant query awaiting response",
    status: "pending",
    time: "3 hrs ago",
  },
  {
    id: "APP-10205",
    applicant: "Nadia Coetzee",
    programme: "LLB Law",
    action: "Document submission window closing",
    status: "deadline",
    time: "Yesterday",
  },
  {
    id: "APP-10198",
    applicant: "Kagiso Mabaso",
    programme: "BSc Data Science",
    action: "Acknowledgement email drafted",
    status: "complete",
    time: "Yesterday",
  },
];

export type Deadline = {
  label: string;
  detail: string;
  due: string;
  urgency: "high" | "medium" | "low";
};

export const DEMO_DEADLINES: Deadline[] = [
  {
    label: "Late application window closes",
    detail: "Faculty of Science — 14 files outstanding",
    due: "In 2 days",
    urgency: "high",
  },
  {
    label: "Outstanding document follow-ups",
    detail: "12 applicants require reminder emails",
    due: "In 4 days",
    urgency: "high",
  },
  {
    label: "Residence placement confirmations",
    detail: "Batch response to 9 applicants",
    due: "In 1 week",
    urgency: "medium",
  },
  {
    label: "Faculty intake report",
    detail: "Summary for Head of Admissions",
    due: "In 2 weeks",
    urgency: "low",
  },
];

export const DEMO_NOTES = `File notes — APP-10241 (DEMO DATA, fictional applicant)

Applicant: Thandi Nkosi, applying for BSc Computer Science, 2027 intake.
Called the office on 14 Aug asking about her application status. Confirmed we received her online application form and her Grade 11 results. Her final Grade 12 statement of results has NOT been uploaded yet, and the certified copy of her ID is missing from the portal.
She mentioned she will visit the campus office on 3 September to hand in documents in person if the upload keeps failing. Advised her to email the admissions inbox if the portal error repeats.
Second note (18 Aug): the applicant emailed asking whether her application fee payment reflected. Finance confirmed payment reference received on 16 Aug. Still need to attach the proof of payment to the file.
Outstanding: request final results + certified ID, attach proof of payment, respond to her portal error query. Team meeting on 29 Aug will review all incomplete Science faculty files.`;

export const DEMO_TASKS = `I have 45 applications to review, 12 outstanding document requests, and 8 applicants waiting for responses. I also need to prepare a short incomplete-files report for the faculty meeting.`;
