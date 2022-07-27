# insightlyjs

## This package is under development. It is not yet ready for use.

insightlyjs is a lightweight __Node.js__ library for the Insightly API v3.1.

The goal of InsightlyJS is to provide a simple and intuitive way to interact with the Insightly API.

<!-- TOC -->
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Loading and configuring the module](#loading-and-configuring-the-module)
- [Usage](#usage)
- [Examples](#examples)
- [TypeScript](#typescript)
- [License](https://github.com/j-labbe/insightlyjs/blob/master/LICENSE)
- [Contact](#contact)

## Prerequisites
### Node v18.0.0 or higher is recommended.

The fetch API will be polyfilled if it is not available.

InsightlyJS will throw an error if you are using an unsupported runtime environment and is unable to polyfill.

## Installation

```bash
npm install insightlyjs --save
```

## Loading and configuring the module

### ES Modules (ESM)
```ts
import InsightlyJS from 'insightlyjs';
```

### CommonJS (CJS)
```ts
const InsightlyJS = require('insightlyjs').default;
```
Alternatively, you can use the async `import()` function from CommonJS to load `insightlyjs`:
```ts
const InsightlyJS = await import('insightlyjs');
```

### Configuration
```ts
const insightly = new InsightlyJS({
  apiKey: '<your-api-key>',
  apiUrl: 'https://api.insight.ly/v3.1',
});
```

# Usage
InsightlyJS is in development. Many of the methods are not yet implemented, but will be added soon. If you would like to help, please [contact me](#contact).

## Activity Sets

### `getActivitySetList(options)`
Retrieves a list of activity sets.

```ts
const activitySets = await insightly.getActivitySetList({
    // Only return the top level properties of the activity sets.
    brief?: boolean,
    // Number of records to skip
    skip?: number,
    // Limit the number of records returned
    top?: number,
    // Reutrn the total amount of records
    countTotal?: boolean
});
```

### `getActivitySet(id)`
Retrieves an activity set by its ID.

```ts
const activitySet = await insightly.getActivitySet(12345);
```

## Comments

### `getCommentFileAttachments(options)`
Retrieves a list of comment file attachments.

```ts
const commentFileAttachments = await insightly.getCommentFileAttachments({
    // Required - the ID of the comment
    id: number,
    // Required - ISO 8601 date string in the format YYYY-MM-DDTHH:MM:SSZ of the earliest date the file attachment was last updated
    updatedAfterUtc?: string,
    // Number of records to skip
    skip?: number,
    // Limit the number of records returned
    top?: number,
    // Reutrn the total amount of records
    countTotal?: boolean
});
```

## Contacts

### `getContacts(options)`
Retrieves a list of all contacts.

```ts
const contacts = await insightly.getContacts({
    // Only return the top level properties of the contacts.
    brief?: boolean,
    // Number of records to skip
    skip?: number,
    // Limit the number of records returned
    top?: number,
    // Reutrn the total amount of records
    countTotal?: boolean
});
```

### `getContact(id)`
Retrieves a contact by its ID.

```ts
const contact = await insightly.getContact(12345);
```

### `getContactDates(id)`
Retrieves a list of contact dates by the contact's ID.

```ts
const contactDates = await insightly.getContactDates(12345);
```

### `getContactEmails(id)`
Retrieves a list of contact emails by the contact's ID.

```ts
const contactEmails = await insightly.getContactEmails({
    // The ID of the contact
    contactId: number,
    // Earliest date the email was last updated
    updatedAfterUtc?: string,
    // Maximum number of records to return
    top?: number,
    // Number of records to skip
    skip?: number,
    // Reutrn the total amount of records
    countTotal?: boolean,
    // Return only the top level properties of the emails
    brief?: boolean
});
```

### `getContactEvents(options)`
Retrieves a list of contact events by the contact's ID.

```ts
const contactEvents = await insightly.getContactEvents({
    // The ID of the contact
    contactId: number,
    // Earliest date the event was last updated
    updatedAfterUtc?: string,
    // Maximum number of records to return
    top?: number,
    // Number of records to skip
    skip?: number,
    // Reutrn the total amount of records
    countTotal?: boolean,
    // Return only the top level properties of the events
    brief?: boolean
});
```

### `getContactFileAttachments(options)`
Retrieves a list of contact file attachments by the contact's ID.

```ts
const contactFileAttachments = await insightly.getContactFileAttachments({
    // The ID of the contact
    contactId: number,
    // Earliest date the file attachment was last updated
    updatedAfterUtc?: string,
    // Maximum number of records to return
    top?: number,
    // Number of records to skip
    skip?: number,
    // Reutrn the total amount of records
    countTotal?: boolean,
});
```

### `getContactFollowState(id)`
Retrieves the follow state of a contact by its ID.

```ts
const contactFollowState = await insightly.getContactFollowState(12345);
```

### `getContactLinks(id)`
Retrieves a list of contact links by the contact's ID.

```ts
const contactLinks = await insightly.getContactLinks(12345);
```

### `getContactNotes(options)`
Retrieves a list of contact notes by the contact's ID.

```ts
const contactNotes = await insightly.getContactNotes({
    // The ID of the contact
    contactId: number,
    // Earliest date the note was last updated
    updatedAfterUtc?: string,
    // Maximum number of records to return
    top?: number,
    // Number of records to skip
    skip?: number,
    // Reutrn the total amount of records
    countTotal?: boolean,
    // Return only the top level properties of the notes
    brief?: boolean
});
```

### `getContactTags(id)`
Retrieves a list of contact tags by the contact's ID.

```ts
const contactTags = await insightly.getContactTags(12345);
```

### `getContactTasks(options)`
Retrieves a list of contact tasks by the contact's ID.

```ts
const contactTasks = await insightly.getContactTasks({
    // The ID of the contact
    contactId: number,
    // Earliest date the task was last updated
    updatedAfterUtc?: string,
    // Maximum number of records to return
    top?: number,
    // Number of records to skip
    skip?: number,
    // Reutrn the total amount of records
    countTotal?: boolean,
    // Return only the top level properties of the tasks
    brief?: boolean
});
```

### `searchContacts(options)`
Retrieves a list of contacts that match the search criteria.

```ts
const searchResults = await insightly.searchContacts({
    query: {
        first_name: string
    },
    top?: number,
    skip?: number,
    countTotal?: boolean
    brief?: boolean
});
```

### `searchContactsByTag(options)`
Retrieves a list of contacts that match the tag provided.

```ts
const searchResults = await insightly.searchContactsByTag({
    tagName: string,
    top?: number,
    skip?: number,
    countTotal?: boolean
    brief?: boolean
});
```

## Examples

I am looking for someone to help build examples while I focus on the core functionalities of the library. Please [contact me](#contact) if you would like to help. 

## TypeScript
Types are bundled with the library, so you don't need to insstall any additional packages.

To use the types, import them into your project like so:

```ts
import { Contact } from "insightlyjs";
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
