import {useQuery} from "@tanstack/react-query";
import { JobApplication } from "../types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export function useApplications() {
    return useQuery<JobApplication[]>({
        queryKey: ["applications"],
        queryFn: async () => {
            const response = await fetch(`${API_BASE}`);
            
            if (!response.ok) {
                throw new Error("Failed to fetch applications");
            }
            return response.json();
        }
    })
}