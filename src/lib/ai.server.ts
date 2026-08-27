import { SYSTEM_PROMPTS, type FeatureKey } from "./ai-prompts";

export type ChatMessage = { role: "user" | "assistant"; content: string };

export async function runAi(feature: FeatureKey, messages: ChatMessage[]) {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    throw new Error("AI is not configured on the server (missing API key).");
  }

  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": apiKey,
      "X-Lovable-AIG-SDK": "fetch",
    },
    body: JSON.stringify({
      model: "google/gemini-3.7-flash",
      messages: [{ role: "system", content: SYSTEM_PROMPTS[feature] }, ...messages],
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    if (res.status === 429) {
      throw new Error("The AI service is busy right now. Please try again in a moment.");
    }
    if (res.status === 402) {
      throw new Error(
        "AI credits are exhausted for this workspace. Please add credits to continue.",
      );
    }
    if (res.status === 403) {
      throw new Error("AI access is currently blocked by workspace policy.");
    }
    throw new Error(`AI request failed (${res.status}). ${detail.slice(0, 300)}`);
  }

  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const text = data.choices?.[0]?.message?.content?.trim();
  if (!text) {
    throw new Error("The AI returned an empty response. Please try regenerating.");
  }
  return text;
}
