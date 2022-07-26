interface Link {
    RELATIONSHIP_ID: number;
    IS_FORWARD: boolean;
    DETAILS: string | null;
    ROLE: string | null;
    LINK_ID: number;
    OBJECT_ID: number;
    OBJECT_NAME: string;
    LINK_OBJECT_NAME: string;
    LINK_OBJECT_ID: number;
}

export default Link;
