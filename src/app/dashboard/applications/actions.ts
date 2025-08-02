"use server";
import { PayloadType } from "@/lib/types";

 

const API_BASE = process.env.API_URL || 'https://g6yd8c09q4.execute-api.us-east-1.amazonaws.com/Prod/applications';

export async function createApplication(payload: PayloadType) {
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });


  if (!res.ok) {
    throw new Error("Failed to create application");
  }

  return res.json();
}

export async function updateApplication(id: string, payload: PayloadType) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  console.log("Update PUT response:", res);

  if (!res.ok) {
    throw new Error("Failed to update application");
  }

  return res.json();
}

export async function deleteApplication(id: string) {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });

  console.log("Delete response:", res);
  
  if (!res.ok) {
    throw new Error("Failed to delete application");
  }

  return res.json();
}