export interface JobApplication {
    id: string;
    company: string;
    createdAt: string;
    position: string;
    processedAt: string;
    status: string;
}

export interface PayloadType {
   company: FormDataEntryValue | null
    position: FormDataEntryValue | null
    status: FormDataEntryValue | null
    resume?: string
}