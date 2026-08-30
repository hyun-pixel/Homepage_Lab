"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";

type Language = "ko" | "en";

const MISSION_SENTENCES: Record<Language, readonly string[]> = {
  ko: [
    "우리는 인류의 다음 정착지가 인간의 도착과 함께 시작되어서는 안 된다고 믿습니다.",
    "FLOWAX SPACE는 AI와 자율 로봇을 먼저 보내 낯선 세계를 이해하고, 기지를 건설하며, 생존 가능한 환경을 준비합니다.",
    "우리가 도착하는 순간, 그곳은 이미 살아갈 수 있는 세계가 되어 있을 것입니다.",
  ],
  en: [
    "We believe humanity’s next settlement should not begin with human arrival.",
    "FLOWAX SPACE sends AI and autonomous machines ahead. They understand an unfamiliar world, construct its first habitat, and prepare the conditions for life.",
    "By the time we arrive, that world will already be ready for us.",
  ],
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export function MissionStatement({ language }: { language: Language }) {
  const statementRef = useRef<HTMLParagraphElement>(null);
  const [revealedWordCount, setRevealedWordCount] = useState(0);
  const sentences = MISSION_SENTENCES[language];

  const indexedSentences = useMemo(() => {
    let nextWordIndex = 0;

    return sentences.map((sentence) =>
      sentence.split(" ").map((word) => ({
        word,
        index: nextWordIndex++,
        isAccent: word === "FLOWAX" || word.startsWith("SPACE"),
      })),
    );
  }, [sentences]);

  const wordCount = indexedSentences.reduce(
    (total, sentence) => total + sentence.length,
    0,
  );

  useEffect(() => {
    let animationFrame = 0;

    const updateReveal = () => {
      const statement = statementRef.current;

      if (statement) {
        const rect = statement.getBoundingClientRect();
        const progress = clamp(
          (window.innerHeight * 0.85 - rect.top) / (window.innerHeight * 0.65),
          0,
          1,
        );
        const nextCount = Math.round(progress * wordCount);

        setRevealedWordCount((previous) =>
          previous === nextCount ? previous : nextCount,
        );
      }

      animationFrame = window.requestAnimationFrame(updateReveal);
    };

    animationFrame = window.requestAnimationFrame(updateReveal);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [wordCount]);

  return (
    <p
      ref={statementRef}
      className="mission__statement"
      aria-label={sentences.join(" ")}
    >
      {indexedSentences.map((sentence, sentenceIndex) => (
        <span className="mission__sentence" key={sentences[sentenceIndex]}>
          {sentence.map((token, wordIndex) => (
            <Fragment key={token.index}>
              <span
                className={
                  "mission-word" +
                  (token.index < revealedWordCount ? " is-revealed" : "") +
                  (token.isAccent ? " is-accent" : "")
                }
                translate={token.isAccent ? "no" : undefined}
                aria-hidden="true"
              >
                {token.word}
              </span>
              {wordIndex < sentence.length - 1 ? " " : null}
            </Fragment>
          ))}
        </span>
      ))}
    </p>
  );
}
