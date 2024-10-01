export interface Extensions {
    cdr: Cdr[];
    extensions: Extension[];
}

export interface Extension {
    extension_id: number;
    extension: string;
    name: string;
    contact: Contact;
    did_number: string;
}

export interface Cdr {
    calldate: string;
    cdr_id: number;
    linkedid: string;
    sequence: number;
    uniqueid: string;
}

interface Contact {
    contact_id: number;
    extension_id: number;
    location: string;
    organization: string;
}