# insightlyjs

## This package is under development. It is not yet ready for use.

insightlyjs is a zero-dependancy JavaScript / TypeScript library for the Insightly API v3.1.

The goal of InsightlyJS is to provide a lightweight, simple, and intuitive SDK for the Insightly API.

## Prerequisites
### Node v18.0.0 or higher is __required__.
InsightlyJS makes use of the fetch API, which is availble in Node v18.0.0 and higher.

If you are using this package in a browser, you will need to use a [compatible browser version](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API#browser_compatibility).

InsightlyJS will throw an error if you are using an unsupported runtime environment.

## Installation

```bash
npm install insightlyjs --save
```

## Usage

```typescript
import InsightlyJS from 'insightlyjs';

const insightly = new InsightlyJS({
    apiKey: '<your-api-key>',

    // can either include or omit protocol
    apiHost: 'api.<pod>.insightly.com',
});

// Example: get all contacts from Insightly
const contacts = await insightly.getContacts();

// Example: get one contact
const contact = await insightly.getContact(12345);
```

## Completed modules

-   [x] Activity Sets
-   [x] Comments *(needs testing)*
-   [ ] __Contacts (in progress)__
-   [ ] Countries
-   [ ] Currencies
-   [ ] Custom Fields
-   [ ] Custom Objects
-   [ ] Custom Objects Records
-   [ ] Emails
-   [ ] Events
-   [ ] File Attachments
-   [ ] File Categories
-   [ ] Follows
-   [ ] Forum Categories
-   [ ] Forum Posts
-   [ ] Instance
-   [ ] Knowledge Article Categories
-   [ ] Knowledge Article Folders
-   [ ] Knowledge Articles
-   [ ] Leads
-   [ ] Lead Sources
-   [ ] Lead Statuses
-   [ ] Milestones
-   [ ] Notes
-   [ ] Opportunities
-   [ ] Opportunity Categories
-   [ ] Opportunity Products
-   [ ] Opportunity State Reasons
-   [ ] Organisations (Organizations)
-   [ ] Permissions
-   [ ] Pipelines
-   [ ] Pipeline Stages
-   [ ] Price Book Entries
-   [ ] Price Books
-   [ ] Products
-   [ ] Project Categories
-   [ ] Projects
-   [ ] Prospects
-   [ ] Quote Products
-   [ ] Quotes
-   [ ] Relationships
-   [ ] Scim
-   [ ] Tags
-   [ ] Task Categories
-   [ ] Tasks
-   [ ] Team Members
-   [ ] Teams
-   [ ] Tickets
-   [ ] Users

## Other milestones to be completed

-   [ ] Input Validation
    -   [ ] ISO 8601
    -   [ ] String
    -   [ ] Number

## Contact

You can [email me](mailto:jack@jacklabbe.com) with any question, suggestions, or concerns.
