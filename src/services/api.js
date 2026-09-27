const API_BASE_URL = "http://localhost:8000";


export async function processDischargeSummary(file) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/process-discharge`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(
      "Unable to process the discharge summary."
    );
  }

  return await response.json();
}