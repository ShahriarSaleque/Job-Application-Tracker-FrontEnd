"use server"; 

const API_BASE = process.env.API_URL || 'https://g6yd8c09q4.execute-api.us-east-1.amazonaws.com/Prod/applications';

export async function createApplication(formData: FormData) {
  const payload = {
    company: formData.get("company"),
    position: formData.get("position"),
    status: formData.get("status"),
  };

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
