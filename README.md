# insightlyjs

## This package is under development. It is not yet ready for use.

insightlyjs is a JavaScript / TypeScript library for the Insightly API v3.1.

The goal of insightlyjs is to provide a simple, intuitive, and easy to use SDK for the Insightly API that makes development easier and more efficient.

## Installation

```bash
npm install insightlyjs --save
```

## Usage

```typescript
import InsightlyJS from 'insightlyjs';

const insightly = new InsightlyJS('<your-api-key>');

// Example: get all contacts from Insightly
await insightly.getContacts();
```

## Completed modules
- [x] Activity Sets
- [ ] __Comments__ (in progress)
- [ ] Contacts
- [ ] Countries
- [ ] Currencies
- [ ] Custom Fields
- [ ] Custom Objects
- [ ] Custom Objects Records
- [ ] Emails
- [ ] Events
- [ ] File Attachments
- [ ] File Categories
- [ ] Follows
- [ ] Forum Categories
- [ ] Forum Posts
- [ ] Instance
- [ ] Knowledge Article Categories
- [ ] Knowledge Article Folders
- [ ] Knowledge Articles
- [ ] Leads
- [ ] Lead Sources
- [ ] Lead Statuses
- [ ] Milestones
- [ ] Notes
- [ ] Opportunities
- [ ] Opportunity Categories
- [ ] Opportunity Products
- [ ] Opportunity State Reasons
- [ ] Organisations (Organizations)
- [ ] Permissions
- [ ] Pipelines
- [ ] Pipeline Stages
- [ ] Price Book Entries
- [ ] Price Books
- [ ] Products
- [ ] Project Categories
- [ ] Projects
- [ ] Prospects
- [ ] Quote Products
- [ ] Quotes
- [ ] Relationships
- [ ] Scim
- [ ] Tags
- [ ] Task Categories
- [ ] Tasks
- [ ] Team Members
- [ ] Teams
- [ ] Tickets
- [ ] Users

## Other milestones to be completed
- [ ] Input Validation
    - [ ] ISO 8601
    - [ ] String
    - [ ] Number

## Contact
You can [email me](mailto:jack@jacklabbe.com) with any question, suggestions, or concerns.