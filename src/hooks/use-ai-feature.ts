import { useCallback, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { generateAi } from "@/lib/ai.functions";
import type { FeatureKey } from "@/lib/ai-prompts";

export function useAiFeature(feature: FeatureKey) {
  const call = useServerFn(generateAi);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (prompt: string) => {
      setLoading(true);
      setError(null);
      try {
        const result = await call({
          data: { feature, messages: [{ role: "user", content: prompt }] },
        });
        setOutput(result.text);
        toast.success("AI draft ready for your review");
        return result.text;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong generating the output.";
        setError(message);
        toast.error(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [call, feature],
  );

  const clear = useCallback(() => {
    setOutput("");
    setError(null);
  }, []);

  return { output, setOutput, loading, error, run, clear };
}
