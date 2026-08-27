# UniAssist AI — University Admissions Productivity Assistant

## Project Overview

UniAssist AI is an AI-powered workplace productivity platform designed to support university admissions staff with repetitive administrative tasks. It uses generative AI to help staff draft professional applicant communications, summarize application notes, organize workloads, and assist with everyday administrative tasks.

The platform is designed to improve productivity while keeping humans in control of important admissions processes.

## Features

### 1. Smart Applicant Email Generator

Helps admissions staff quickly create professional applicant communications.

* Generate professional emails
* Multiple tone options: Formal, Friendly, Empathetic, Persuasive, and Urgent
* Generate email subjects and body content
* Edit AI-generated responses
* Copy generated emails
* Regenerate responses
* Supports common admissions scenarios such as missing documents, application updates, and deadline reminders

### 2. AI Application Notes Summarizer

Transforms lengthy application notes or applicant correspondence into an easy-to-understand structured summary.

The tool identifies:

* Application summary
* Missing documents
* Action items
* Important dates
* Key information
* Follow-up requirements

The AI is instructed to use only the information provided and avoid making assumptions.

### 3. AI Task Planner

Helps admissions staff organize and prioritize their daily or weekly workload.

Users can provide:

* Tasks
* Deadlines
* Priority levels
* Estimated completion time
* Additional notes

The AI generates:

* High-priority tasks
* Medium-priority tasks
* Low-priority tasks
* Suggested schedules
* Outstanding tasks
* Productivity recommendations

### 4. AI Workplace Assistant

A conversational AI assistant designed to support everyday admissions administration.

It can help users:

* Draft applicant emails
* Summarize information
* Turn notes into action items
* Prioritize tasks
* Create professional workplace responses

## Responsible AI

UniAssist AI is designed as an administrative productivity tool and **does not make automated admissions decisions**.

The application follows responsible AI principles including:

* **Human Oversight:** AI-generated content must be reviewed by an authorized admissions staff member.
* **No Automated Admission Decisions:** The system does not make admission, rejection, eligibility, ranking, or selection decisions.
* **Privacy:** Users should avoid entering unnecessary personal or sensitive applicant information.
* **Accuracy:** AI-generated information should be verified against official university information.
* **Transparency:** AI-generated content is clearly identified.
* **Bias Awareness:** AI should not be used to make decisions based on protected or sensitive characteristics.
* **Hallucination Prevention:** AI prompts instruct the system not to fabricate information, requirements, deadlines, policies, or applicant details.

> **Responsible AI Notice:** UniAssist AI provides administrative assistance only. AI-generated outputs may contain errors and must be reviewed by an authorized staff member. The system does not make admission or eligibility decisions.

## Prompt Engineering

Each AI feature uses specialized prompts designed for its specific task.

The prompts incorporate:

* Role
* Context
* Task
* User-provided information
* Output format
* Constraints
* Responsible AI instructions

The AI is instructed to use only information provided by the user, identify missing information, avoid assumptions, and never fabricate university policies, requirements, deadlines, or applicant information.

## User Interface

UniAssist AI uses a modern SaaS-style dashboard designed for a professional university admissions environment.

The application includes:

* Dashboard layout
* Sidebar navigation
* Responsive design for desktop and mobile
* Input and output sections
* Editable AI-generated responses
* Loading states
* Error handling
* Copy-to-clipboard functionality
* Regenerate and reset options
* Responsible AI notifications

## Technologies Used

* Lovable AI
* GitHub
* Generative AI
* HTML
* CSS
* JavaScript

## Project Structure

```text
UniAssist AI
│
├── Dashboard
├── Smart Applicant Email Generator
├── AI Application Notes Summarizer
├── AI Task Planner
├── AI Workplace Assistant
├── Responsible AI
└── Settings
```

## Getting Started

### Prerequisites

* Modern web browser
* Git
* Access to the project repository
* Required AI API credentials, if applicable

### Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project folder:

```bash
cd YOUR_PROJECT_FOLDER
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local development URL provided in the terminal.

## Environment Variables

If an AI API is used, create a `.env` file and add the required environment variables.

**Never commit API keys or other sensitive credentials to GitHub.**

## Demo Data

The application uses fictional demonstration data to showcase the dashboard and its features.

No real applicant information should be used in demonstrations.

## Future Improvements

Possible future improvements include:

* Integration with university application management systems
* Secure authentication
* Role-based access control
* Document upload and analysis
* Application status tracking
* Integration with official university knowledge bases
* Productivity analytics
* AI audit logs
* Enhanced privacy and data protection features

## Team

**Developer:** Ayanda Malembe

## Project Goal

UniAssist AI demonstrates how generative AI can be responsibly applied to a real workplace environment to reduce repetitive administrative tasks, improve productivity, and support university admissions staff while keeping important decisions under human control.


Prioritize quality and functionality over unnecessary features.
university admissions department.

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
