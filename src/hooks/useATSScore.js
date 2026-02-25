import { useMemo } from "react";

export const useATSScore = (description) => {
  return useMemo(() => {
    if (!description) return 0;

    const keywords = [ "java", "springboot"];
    let score = 0;

    keywords.forEach(word => {
      if (description.toLowerCase().includes(word)) {
        score += 25;
      }
    });

    return score;
  }, [description]);
};