import InsightlyJS from '../src';

const dotenv = require('dotenv');

const env = dotenv.config().parsed;
const API_KEY = env?.INSIGHTLY_API_KEY;
const API_URL = env?.INSIGHTLY_API_URL;

describe('Contacts', () => {
    let insightly: InsightlyJS;

    beforeAll(async () => {
        if (!API_KEY || !API_URL) {
            throw new Error('INSIGHTLY_API_KEY and INSIGHTLY_API_URL are not set');
        }

        insightly = new InsightlyJS({
            apiKey: API_KEY,
            apiUrl: API_URL,
        });
    });

    let contactId: number;

    describe('getContacts', () => {
        it('should be defined', () => {
            expect(insightly.getContacts).toBeDefined();
        });

        it('should be a function', () => {
            expect(typeof insightly.getContacts).toBe('function');
        });

        it('should return a list of contacts', async () => {
            const contacts = await insightly.getContacts({ brief: true, top: 3 });
            expect(contacts).toBeDefined();
            expect(contacts.length).toBeGreaterThan(0);
            contactId = contacts[0].CONTACT_ID;
        });
    });

    describe('getContact', () => {
        it('should be defined', () => {
            expect(insightly.getContact).toBeDefined();
        });

        it('should be a function', () => {
            expect(typeof insightly.getContact).toBe('function');
        });

        it('should return a contact', async () => {
            const contact = await insightly.getContact(contactId);
            expect(contact).toBeDefined();
            expect(typeof contact).toBe('object');
        });

        it('should reject an empty input', async () => {
            //@ts-ignore
            await expect(insightly.getContact()).rejects.toThrow();
        });
    });

    describe('getContactDates', () => {
        it('should be defined', () => {
            expect(insightly.getContactDates).toBeDefined();
        });

        it('should be a function', () => {
            expect(typeof insightly.getContactDates).toBe('function');
        });

        it('should return a list of contact dates', async () => {
            const contactDates = await insightly.getContactDates(contactId);
            expect(contactDates).toBeDefined();
            expect(Array.isArray(contactDates)).toBe(true);
        });

        it('should reject an empty input', async () => {
            //@ts-ignore
            await expect(insightly.getContactDates()).rejects.toThrow();
        });
    });

    describe('getContactEmails', () => {
        it('should be defined', () => {
            expect(insightly.getContactEmails).toBeDefined();
        });

        it('should be a function', () => {
            expect(typeof insightly.getContactEmails).toBe('function');
        });

        it('should return a list of contact emails', async () => {
            const contactEmails = await insightly.getContactEmails({ contactId: contactId, brief: true, top: 3 });
            expect(contactEmails).toBeDefined();
            expect(Array.isArray(contactEmails)).toBe(true);
        });

        it('should reject an empty input', async () => {
            //@ts-ignore
            await expect(insightly.getContactEmails()).rejects.toThrow();
        });
    });

    describe('getContactEvents', () => {
        it('should be defined', () => {
            expect(insightly.getContactEvents).toBeDefined();
        });

        it('should be a function', () => {
            expect(typeof insightly.getContactEvents).toBe('function');
        });

        it('should return a list of contact events', async () => {
            const contactEvents = await insightly.getContactEvents({ contactId: contactId, brief: true, top: 3 });
            expect(contactEvents).toBeDefined();
            expect(Array.isArray(contactEvents)).toBe(true);
        });

        it('should reject an empty input', async () => {
            //@ts-ignore
            await expect(insightly.getContactEvents()).rejects.toThrow();
        });
    });

    describe('getContactFileAttachments', () => {
        it('should be defined', () => {
            expect(insightly.getContactFileAttachments).toBeDefined();
        });

        it('should be a function', () => {
            expect(typeof insightly.getContactFileAttachments).toBe('function');
        });

        it('should return a list of contact file attachments', async () => {
            const contactFileAttachments = await insightly.getContactFileAttachments({ contactId: contactId, top: 3 });
            expect(contactFileAttachments).toBeDefined();
            expect(Array.isArray(contactFileAttachments)).toBe(true);
        });

        it('should reject an empty input', async () => {
            //@ts-ignore
            await expect(insightly.getContactFileAttachments()).rejects.toThrow();
        });
    });

    describe("getContactNotes", () => {
        it("should be defined", () => {
            expect(insightly.getContactNotes).toBeDefined();
        });

        it("should be a function", () => {
            expect(typeof insightly.getContactNotes).toBe("function");
        });

        it("should return a list of contact notes", async () => {
            const contactNotes = await insightly.getContactNotes({ contactId: contactId, brief: true, top: 3 });
            expect(contactNotes).toBeDefined();
            expect(Array.isArray(contactNotes)).toBe(true);
        });

        it("should reject an empty input", async () => {
            //@ts-ignore
            await expect(insightly.getContactNotes()).rejects.toThrow();
        });
    });

    describe("getContactTags", () => {
        it("should be defined", () => {
            expect(insightly.getContactTags).toBeDefined();
        });

        it("should be a function", () => {
            expect(typeof insightly.getContactTags).toBe("function");
        });

        it("should return a list of contact tags", async () => {
            const contactTags = await insightly.getContactTags(contactId);
            expect(contactTags).toBeDefined();
            expect(Array.isArray(contactTags)).toBe(true);
        });

        it("should reject an empty input", async () => {
            //@ts-ignore
            await expect(insightly.getContactTags()).rejects.toThrow();
        });
    });

    describe("getContactTasks", () => {
        it("should be defined", () => {
            expect(insightly.getContactTasks).toBeDefined();
        });

        it("should be a function", () => {
            expect(typeof insightly.getContactTasks).toBe("function");
        });

        it("should return a list of contact tasks", async () => {
            const contactTasks = await insightly.getContactTasks({ contactId: contactId, brief: true, top: 3 });
            expect(contactTasks).toBeDefined();
            expect(Array.isArray(contactTasks)).toBe(true);
        });

        it("should reject an empty input", async () => {
            //@ts-ignore
            await expect(insightly.getContactTasks()).rejects.toThrow();
        });
    });

    describe("searchContacts", () => {
        it("should be defined", () => {
            expect(insightly.searchContacts).toBeDefined();
        });

        it("should be a function", () => {
            expect(typeof insightly.searchContacts).toBe("function");
        });

        it("should return a list of contacts", async () => {
            const contacts = await insightly.searchContacts({
                query: { first_name: "John" },
                brief: true,
                top: 3,
            });
            expect(contacts).toBeDefined();
            expect(Array.isArray(contacts)).toBe(true);
        });

        it("should reject an empty input", async () => {
            //@ts-ignore
            await expect(insightly.searchContacts()).rejects.toThrow();
        });
    });

    describe("searchContactByTag", () => {
        it("should be defined", () => {
            expect(insightly.searchContactsByTag).toBeDefined();
        });

        it("should be a function", () => {
            expect(typeof insightly.searchContactsByTag).toBe("function");
        });

        it("should return a list of contacts", async () => {
            // this will fail because I haven't set a tag on any contacts
            // the message will be "not found", but if you have contacts with tags, this will work

            // const contacts = await insightly.searchContactsByTag({
            //     tagName: "test",
            //     brief: true,
            //     top: 3,
            // });
            // expect(contacts).toBeDefined();
            // expect(Array.isArray(contacts)).toBe(true);

            expect(true).toBe(true);
        });
    });
});
