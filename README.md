# UniAssist Pro

Build a modern, professional, responsive web application called **UniAssist AI — University Admissions Productivity Assistant**.

## 1. PURPOSE

UniAssist AI is an AI-powered workplace productivity platform designed specifically for **university admissions staff**.

The application should help admissions officers reduce repetitive administrative work when processing university applications, communicating with applicants, organizing workloads, and summarizing application-related information.

The application is a **productivity assistant only**. It must NOT make admission, rejection, eligibility, or other high-stakes decisions about applicants.

The application should demonstrate:

* Practical AI implementation

* Strong prompt engineering

* Real-world workplace problem solving

* Responsible AI usage

* Modern UI/UX design

* Professional workplace functionality

## 2. TARGET USER

The primary user is a **university admissions officer or admissions administrator**.

Design the interface for a professional workplace environment. It should feel like a polished SaaS application that could realistically be used by an admissions department.

## 3. MAIN DASHBOARD

Create a professional dashboard homepage with:

* Welcome message: "Good morning, Admissions Officer"

* Total Applications

* Incomplete Applications

* Pending Responses

* Upcoming Deadlines

* Recent Activity

* Quick Actions

Quick action buttons:

* Generate Applicant Email

* Summarize Application Notes

* Create Task Plan

* Ask UniAssist AI

Include realistic demo data so the dashboard looks functional when first opened.

Use cards, clear typography, icons, spacing, status indicators, and visual hierarchy.

## 4. SIDEBAR NAVIGATION

Create a persistent sidebar with:

* Dashboard

* Email Generator

* Application Summarizer

* AI Task Planner

* AI Research Assistant

* AI Workplace Assistant

* Settings

On mobile, convert the sidebar into a responsive navigation menu.

## 5. FEATURE 1 — SMART APPLICANT EMAIL GENERATOR

Create an AI-powered email generator for admissions staff.

Inputs:

* Applicant name

* Email purpose/category

* Relevant information

* Additional instructions

* Tone selector

Tone options:

* Formal

* Friendly

* Empathetic

* Persuasive

* Urgent

Example use cases:

* Request missing documents

* Application status update

* Application acknowledgement

* Deadline reminder

* Request additional information

* General applicant response

The AI should generate a professional email based ONLY on the information provided.

Output section should include:

* Generated subject

* Generated email

* Copy button

* Edit button

* Regenerate button

* Clear button

The output must remain editable before use.

Use structured prompt engineering behind the feature. The AI should be instructed to:

* Act as a professional university admissions administrative assistant

* Follow the selected tone

* Use only supplied information

* Never invent university policies, deadlines, requirements, fees, or applicant information

* Clearly communicate the required action

* Produce concise and professional communication

* Flag missing information instead of making assumptions

## 6. FEATURE 2 — AI APPLICATION NOTES SUMMARIZER

Create a tool that allows admissions staff to paste lengthy application notes, applicant correspondence, or administrative notes.

The AI should transform the information into a structured summary.

Display the output in separate sections:

### Application Summary

A concise overview.

### Missing Documents

List documents that are explicitly identified as missing.

### Action Items

List actions that admissions staff need to take.

### Important Dates

Extract dates mentioned in the provided information.

### Decisions / Information

Summarize important decisions or information contained in the notes.

### Follow-Up Required

Identify issues requiring staff attention.

Do NOT allow the AI to determine whether an applicant should be accepted or rejected.

The AI must distinguish between information explicitly provided and assumptions. If information is unavailable, display "Not provided" rather than inventing an answer.

Include:

* Copy summary

* Edit output

* Regenerate

* Clear

## 7. FEATURE 3 — AI TASK PLANNER

Create an AI-powered admissions workload planner.

Allow the user to enter tasks such as:

"I have 45 applications to review, 12 outstanding document requests, and 8 applicants waiting for responses."

Inputs should include:

* Tasks

* Deadlines

* Priority

* Estimated time

* Optional notes

The AI should generate a practical daily or weekly work plan.

Output should include:

### Today's Priorities

Organize tasks into:

* High priority

* Medium priority

* Low priority

### Suggested Schedule

Create a realistic schedule with time blocks.

### Outstanding Tasks

Show unfinished work.

### Recommendations

Provide practical productivity suggestions.

The AI should prioritize tasks based on urgency, deadlines, and information provided by the user.

Do not invent deadlines. If no deadline is provided, clearly indicate that the deadline is unknown.

Allow users to edit tasks after the AI generates the plan.

## 8. FEATURE 4 — AI RESEARCH ASSISTANT

Create an AI research assistant designed for admissions-related workplace research.

Allow users to enter a topic or paste information.

Examples:

* "Summarize this university admissions policy."

* "Extract the important application requirements from these notes."

* "Summarize this admissions procedure."

* "Identify the key deadlines mentioned in this document."

The output should contain:

* Summary

* Key Points

* Important Requirements

* Important Dates

* Practical Insights

IMPORTANT: The AI must not present unverified information as official university policy.

Include a visible notice:

"AI-generated research should be verified against official university policies and sources before being used for administrative decisions."

## 9. FEATURE 5 — AI WORKPLACE ASSISTANT

Create a conversational AI chatbot called **UniAssist AI**.

The chatbot should help admissions staff with administrative productivity tasks.

Example prompts:

* "Help me write an email requesting missing documents."

* "Turn these notes into action items."

* "Help me prioritize these admissions tasks."

* "Summarize the information below."

* "Help me create a professional response to an applicant."

The chatbot should maintain a clean conversation interface with:

* User messages

* AI responses

* Suggested prompts

* Clear conversation button

The chatbot should follow the same responsible AI rules as the other features.

## 10. PROMPT ENGINEERING

Use carefully structured AI prompts for every AI feature.

Prompts should clearly define:

* Role

* Context

* Task

* User-provided information

* Constraints

* Output format

* Responsible AI requirements

Do not use one generic prompt for every feature.

Each AI tool should have a specialized system instruction appropriate to its task.

Design the prompts to minimize hallucination by instructing the AI to:

* Use only information provided by the user

* Clearly identify missing information

* Never fabricate facts

* Never invent deadlines, requirements, policies, or applicant information

* Ask for clarification when necessary

* Separate facts from suggestions

## 11. RESPONSIBLE AI

Create a visible **Responsible AI** section accessible from the dashboard and/or sidebar.

Include the following principles:

### Human Oversight

AI-generated outputs must be reviewed by an authorized admissions staff member before being used.

### No Automated Admission Decisions

The system must never make admission, rejection, eligibility, ranking, or selection decisions.

### Privacy

Users should avoid entering unnecessary sensitive or personally identifiable applicant information.

### Accuracy

AI-generated information should be verified against official university information.

### Transparency

Clearly label AI-generated content.

### Bias Awareness

AI outputs should not be used to make decisions based on protected or sensitive characteristics.

Include a persistent but unobtrusive disclaimer:

"UniAssist AI provides administrative assistance only. AI-generated outputs may contain errors and must be reviewed by an authorized staff member. The system does not make admission or eligibility decisions."

## 12. UI/UX DESIGN

Use a clean, modern SaaS-style interface.

Design characteristics:

* Professional university/workplace aesthetic

* Clean dashboard

* Consistent cards

* Clear typography

* Accessible contrast

* Generous spacing

* Modern icons

* Clear buttons

* Form validation

* Loading states

* Empty states

* Error states

* Success notifications

* Responsive layout

The application must work well on:

* Desktop

* Tablet

* Mobile

Use a consistent design system throughout the application.

## 13. INPUT AND OUTPUT EXPERIENCE

Every AI feature should clearly separate:

INPUT → AI PROCESSING → OUTPUT

Use labeled input fields and structured output cards.

AI-generated content should always be editable.

Include:

* Loading animation while AI is processing

* Error handling

* Empty states

* Regenerate functionality

* Copy-to-clipboard functionality

* Clear/reset functionality

## 14. DEMO EXPERIENCE

When the application opens, populate the dashboard with realistic fictional demonstration data.

Clearly label all demonstration applicant data as **DEMO DATA**.

Do not use real people's personal information.

Create realistic examples such as:

* 128 applications

* 24 incomplete applications

* 17 pending responses

* 8 upcoming deadlines

Use fictional applicant names and fictional information.

## 15. VISUAL IDENTITY

Application name:

**UniAssist AI**

Tagline:

**"Smarter administration. Better applicant support."**

Create a simple professional logo/icon representing AI + university administration.

Use a polished SaaS dashboard aesthetic rather than a generic chatbot design.

## 16. TECHNICAL REQUIREMENTS

Build the application as a functional web application.

Use reusable components and clean project structure.

Ensure:

* Navigation works

* Buttons work

* Forms work

* Tabs/pages work

* AI outputs are displayed correctly

* Copy functionality works

* Responsive design works

* No broken links

* No placeholder buttons that appear functional but do nothing

If an actual AI API connection is not configured, create a clearly structured mock/demo AI layer so the application can still be demonstrated, while keeping the architecture ready for an AI API integration.

Do not expose API keys in frontend code.

## 17. EVALUATION ALIGNMENT

The application should visibly demonstrate the following assessment criteria:

### Problem Relevance

Clearly solve real administrative problems experienced by university admissions departments.

### Prompt Engineering

Use specialized, structured prompts with roles, context, constraints, and output formats.

### Functionality

All major features should have functional user flows and editable AI outputs.

### Innovation

Combine several admissions-specific AI productivity tools into one integrated platform rather than creating unrelated AI tools.

### Responsible AI

Include human oversight, privacy considerations, hallucination prevention, transparency, bias awareness, and a strict prohibition on automated admission decisions.

### Presentation Quality

Create a polished, professional, responsive SaaS dashboard suitable for a workplace demonstration.

## 18. IMPORTANT PRODUCT PRINCIPLE

This must be ONE integrated application, not separate mini-projects.

All features should operate as part of the same **UniAssist AI** platform and share the same navigation, visual design, user experience, and responsible AI principles.

Prioritize quality and functionality over unnecessary features.

Make the application look like a realistic prototype of a workplace product that could be presented to a university admissions department.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/31a1db86-5f4d-4fb4-91a3-9a0d59b27fe5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
