import { useEffect, useRef, useState } from 'react';

type Step = {
  retryable: boolean;
  action?: () => void;
};

export function useAutoStepRunner(steps: Step[], isProcessing: boolean, delaySeconds = 5) {
  const [nextStepIndex, setNextStepIndex] = useState<number | null>(null);
  const [countdown, setCountdown] = useState<number>(delaySeconds);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const cancel = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setNextStepIndex(null);
    setCountdown(0);
  };

  useEffect(() => {
    cancel();

    if (isProcessing) return;

    const next = steps.findIndex((step) => step.retryable);
    if (next === -1) return;

    setNextStepIndex(next);
    setCountdown(delaySeconds);

    timer.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          cancel();
          steps[next].action?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return cancel;
  }, [steps, isProcessing, delaySeconds]);

  return { nextStepIndex, countdown, cancel };
}