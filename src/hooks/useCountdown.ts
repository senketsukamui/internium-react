import { useEffect, useState } from "react";

function useCountdown(intervalTime: number, countdownSeconds: number) {
  const [timeLeft, setTimeLeft] = useState<number>(countdownSeconds);
  console.log(timeLeft);
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((current: number) => {
        if (current <= 0) {
          clearInterval(interval);

          return 0;
        }

        return current - intervalTime;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [intervalTime]);

  return timeLeft / 1000;
}

export default useCountdown;
