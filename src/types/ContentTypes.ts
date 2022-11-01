export type ContentTypeRequirements = "application/json" | "application/octet-stream";

interface ContentTypeStructure {
    json: "application/json";
    octetStream: "application/octet-stream";
}

export default ContentTypeStructure;