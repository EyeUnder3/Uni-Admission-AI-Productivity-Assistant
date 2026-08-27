import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { runAi } from "./ai.server";
import { FEATURE_KEYS } from "./ai-prompts";

const AiInput = z.object({
  feature: z.enum(FEATURE_KEYS),
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(20000),
      }),
    )
    .min(1)
    .max(30),
});

export const generateAi = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => AiInput.parse(input))
  .handler(async ({ data }) => ({
    text: await runAi(data.feature, data.messages),
  }));
