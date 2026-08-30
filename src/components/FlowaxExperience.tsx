"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { CinematicBackground } from "@/components/CinematicBackground";
import { MissionStatement } from "@/components/MissionStatement";
import { OverlayShell } from "@/components/OverlayShell";

type Language = "ko" | "en";

type OverlayState =
  | { type: "archive"; stage: number }
  | { type: "partnership" }
  | { type: "day-one" }
  | null;

const MISSION_STATS = [
  { value: "12", label: { ko: "자율 탐사 임무", en: "AUTONOMOUS MISSIONS" } },
  { value: "3", label: { ko: "달 전초기지", en: "LUNAR OUTPOSTS" } },
  { value: "148", label: { ko: "자율 로봇", en: "AUTONOMOUS ROBOTS" } },
  { value: "1", label: { ko: "화성 선행 기지", en: "MARS FORWARD BASE" } },
] as const;

const MISSION_LOGS = [
  {
    phase: "PHASE 01",
    date: "2049.08",
    image: "/media/mission-01.png",
    alt: { ko: "거대한 행성을 바라보는 우주인", en: "An astronaut looking toward a vast planet" },
    name: "PATHFINDER",
    title: { ko: "새로운 정착 가능 구역을 발견하다", en: "A New Settlement Zone Discovered" },
    ratio: "card-media--portrait",
    archiveStage: 2,
  },
  {
    phase: "PHASE 02",
    date: "2050.01",
    image: "/media/mission-02.png",
    alt: { ko: "화성을 향해 발사되는 우주선", en: "A spacecraft launching toward Mars" },
    name: "GENESIS",
    title: { ko: "인류보다 먼저 화성을 향하다", en: "Bound for Mars Before Humanity" },
    ratio: "card-media--landscape",
    archiveStage: 4,
  },
  {
    phase: "PHASE 03",
    date: "2050.11",
    image: "/media/mission-03.png",
    alt: { ko: "화성 표면에 도착한 우주인", en: "An astronaut arriving on the surface of Mars" },
    name: "ARRIVAL",
    title: { ko: "준비된 세계에 첫발을 내딛다", en: "First Steps into a World Prepared" },
    ratio: "card-media--landscape",
    archiveStage: 6,
  },
] as const;

const ARCHIVE_RECORDS = [
  {
    stage: 1,
    date: "2047.02",
    name: "GENESIS CORE",
    status: "VERIFIED",
    description: {
      ko: "자율 판단 코어의 장기 화성 모의 임무 완료",
      en: "The autonomous decision core completes its long-duration Mars simulation.",
    },
  },
  {
    stage: 2,
    date: "2049.08",
    name: "PATHFINDER",
    status: "SITE CONFIRMED",
    description: {
      ko: "엘리시움 평원 첫 정착 가능 구역 확인",
      en: "The first viable settlement zone is confirmed in Elysium Planitia.",
    },
  },
  {
    stage: 3,
    date: "2049.10",
    name: "HABITAT ALPHA",
    status: "DESIGN LOCKED",
    description: {
      ko: "자율 건설과 생명유지 모듈 최종 설계 확정",
      en: "The final design is locked for autonomous construction and life-support modules.",
    },
  },
  {
    stage: 4,
    date: "2050.01",
    name: "GENESIS LAUNCH",
    status: "IN TRANSIT",
    description: {
      ko: "FX-01 기지 모듈 지구 궤도 출발",
      en: "The FX-01 habitat modules depart Earth orbit.",
    },
  },
  {
    stage: 5,
    date: "2050.08",
    name: "STORM PROTOCOL",
    status: "RECOVERED",
    description: {
      ko: "모래폭풍 통신 두절 중 AI가 전력과 생명유지 자율 복구",
      en: "AI restores power and life support during a storm communications loss.",
    },
  },
  {
    stage: 6,
    date: "2050.11",
    name: "ARRIVAL",
    status: "CREW ARRIVED",
    description: {
      ko: "첫 승무원이 가동 준비를 마친 화성 기지에 도착",
      en: "The first crew arrives at the fully operational Mars habitat.",
    },
  },
] as const;

const COPY = {
  ko: {
    skip: "본문으로 바로가기",
    homeAria: "FLOWAX SPACE 홈",
    mainNav: "주요 메뉴",
    footerNav: "하단 메뉴",
    nav: ["홈", "연구소", "연구 기술", "임무"],
    languageButton: "EN",
    languageAria: "영어로 전환",
    enterMission: "임무 진입",
    heroTitle: ["인류가 도착하기 전,", "새로운 세계를", "준비합니다."],
    heroIntro: ["AI와 로봇이 먼저 도착해,", "인간을 위한 최초의 거주 환경을 구축합니다."],
    visionTitle: ["새로운 행성의", "첫 번째 설계자"],
    visionStrong: "FLOWAX SPACE는 AI와 자율 로봇을 통해",
    visionBody: ["인간이 도착하기 전에 탐사하고, 건설하며,", "생존 가능한 환경을 준비합니다."],
    visionLink: "우리의 비전",
    deeper: "더 깊이",
    deeperAria: "우리의 임무로 이동",
    missionLabel: "/ 우리의 임무",
    missionTitle: "FLOWAX SPACE의 임무",
    statsAria: "핵심 임무 현황",
    logsLabel: "임무 기록",
    logsTitle: ["인류보다 먼저", "시작된 여정"],
    allLogs: "전체 임무 기록",
    allLogsAria: "전체 임무 기록 열기",
    arrivalLabel: "/ 첫 도착",
    arrivalTitle: ["2050년,", "새로운 세계의 첫날이", "시작됩니다."],
    arrivalSummary: [
      "FX-01 GENESIS의 자율 시스템이 탐사와 건설, 생명유지 준비를 마쳤습니다.",
      "이제 첫 승무원이 화성에서의 새로운 하루를 시작합니다.",
    ],
    coordinatesAria: "첫 도착 시간과 위치",
    dayOne: "DAY ONE 진입",
    partnership: "협력 제안",
    close: "닫기",
  },
  en: {
    skip: "Skip to main content",
    homeAria: "FLOWAX SPACE home",
    mainNav: "Main navigation",
    footerNav: "Footer navigation",
    nav: ["HOME", "INSTITUTE", "RESEARCH", "MISSIONS"],
    languageButton: "KR",
    languageAria: "한국어로 전환",
    enterMission: "ENTER MISSION",
    heroTitle: ["Before we arrive,", "a new world", "will be ready."],
    heroIntro: ["AI and autonomous machines arrive first,", "building humanity’s first living environment."],
    visionTitle: ["THE FIRST ARCHITECTS", "OF A NEW WORLD"],
    visionStrong: "FLOWAX SPACE sends autonomous systems ahead.",
    visionBody: ["They explore, build, and prepare a world", "capable of sustaining human life."],
    visionLink: "OUR VISION",
    deeper: "GO DEEPER",
    deeperAria: "Move to our mission",
    missionLabel: "/ OUR MISSION",
    missionTitle: "The mission of FLOWAX SPACE",
    statsAria: "Core mission status",
    logsLabel: "MISSION LOG",
    logsTitle: ["THE JOURNEY", "BEFORE US"],
    allLogs: "VIEW ALL LOGS",
    allLogsAria: "Open the complete mission archive",
    arrivalLabel: "/ FIRST ARRIVAL",
    arrivalTitle: ["IN 2050,", "DAY ONE BEGINS", "IN A NEW WORLD."],
    arrivalSummary: [
      "The autonomous systems of FX-01 GENESIS have completed exploration, construction, and life-support preparation.",
      "The first crew now begins a new day on Mars.",
    ],
    coordinatesAria: "First arrival time and location",
    dayOne: "ENTER DAY ONE",
    partnership: "PARTNERSHIP",
    close: "CLOSE",
  },
} as const;

const DAY_ONE_LINES = [
  "ATMOSPHERE STABLE",
  "HABITAT ONLINE",
  "CREW ARRIVED",
  "DAY ONE HAS BEGUN",
] as const;

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={"brand" + (compact ? " brand--compact" : "")} translate="no">
      <span className="brand__mark" aria-hidden="true"><span>FX</span></span>
      <span className="brand__wordmark">FLOWAX SPACE</span>
    </span>
  );
}

function MissionArchive({
  initialStage,
  language,
}: {
  initialStage: number;
  language: Language;
}) {
  const [selectedStage, setSelectedStage] = useState(initialStage);
  const selectedRecord = ARCHIVE_RECORDS[selectedStage - 1];

  return (
    <div className="archive-panel">
      <div className="archive-panel__intro">
        <p className="overlay-kicker">MISSION ARCHIVE / 2047-2050</p>
        <h2 id="archive-title">
          {language === "ko" ? (
            <>
              인류보다 먼저 기록된
              <span>6단계 임무 아카이브</span>
            </>
          ) : (
            <>
              THE SIX-STAGE MISSION
              <span>RECORDED BEFORE US</span>
            </>
          )}
        </h2>
        <p>
          {language === "ko"
            ? "첫 판단 코어부터 첫 승무원의 도착까지, 새로운 세계가 준비된 시간을 단계별로 확인합니다."
            : "Follow the sequence that prepared a new world, from the first decision core to the arrival of its first crew."}
        </p>
      </div>

      <div className="archive-panel__workspace">
        <ol className="archive-stages" aria-label={language === "ko" ? "임무 단계" : "Mission stages"}>
          {ARCHIVE_RECORDS.map((record) => (
            <li key={record.stage}>
              <button
                type="button"
                className={record.stage === selectedStage ? "is-active" : ""}
                onClick={() => setSelectedStage(record.stage)}
                aria-current={record.stage === selectedStage ? "step" : undefined}
              >
                <span className="archive-stage__number">{String(record.stage).padStart(2, "0")}</span>
                <span className="archive-stage__name">{record.name}</span>
                <span className="archive-stage__date">{record.date}</span>
              </button>
            </li>
          ))}
        </ol>

        <article className="archive-detail" aria-live="polite">
          <p className="archive-detail__index">
            STAGE {String(selectedRecord.stage).padStart(2, "0")} / 06
          </p>
          <time>{selectedRecord.date}</time>
          <h3 translate="no">{selectedRecord.name}</h3>
          <p className="archive-detail__status" translate="no">{selectedRecord.status}</p>
          <p className="archive-detail__description">{selectedRecord.description[language]}</p>
          <div className="archive-detail__coordinates" aria-hidden="true">
            <span>34.8°N</span>
            <span>141.0°E</span>
            <span>MARS / VERIFIED</span>
          </div>
        </article>
      </div>
    </div>
  );
}

function PartnershipForm({ language }: { language: Language }) {
  const labels = language === "ko"
    ? {
        kicker: "PARTNERSHIP / SECURE CHANNEL",
        title: "연구의 다음 좌표를 함께 설정하세요",
        body: [
          "새로운 세계를 준비하는 연구는 혼자 완성되지 않습니다.",
          "FLOWAX SPACE와 함께 다음 기술과 임무의 좌표를 설계해 주세요.",
        ],
        organization: "기관명",
        contact: "담당자명",
        email: "업무 이메일",
        field: "협력 분야",
        proposal: "제안 내용",
        consent: "개인정보 수집 안내를 확인했으며, 정식 전송 기능 연결 전까지 입력 정보가 저장되지 않음을 이해했습니다.",
        select: "협력 분야 선택",
        options: ["공동 연구", "기술 개발", "임무 협력", "기타"],
        placeholder: "예: 공동 연구 목표와 기대하는 연구 범위를 작성해 주세요…",
        offline: "현재는 전송 기능이 연결되지 않은 디자인 검토 단계입니다.",
      }
    : {
        kicker: "PARTNERSHIP / SECURE CHANNEL",
        title: "DEFINE THE NEXT COORDINATE",
        body: [
          "Research for a new world is never completed alone.",
          "Design the next coordinate in technology and exploration with FLOWAX SPACE.",
        ],
        organization: "ORGANIZATION",
        contact: "CONTACT NAME",
        email: "WORK EMAIL",
        field: "COLLABORATION FIELD",
        proposal: "PROPOSAL",
        consent: "I understand that no information is stored until the official transmission system is connected.",
        select: "Select a collaboration field",
        options: ["JOINT RESEARCH", "TECHNOLOGY DEVELOPMENT", "MISSION PARTNERSHIP", "OTHER"],
        placeholder: "Example: Describe your collaboration goal and proposed research scope…",
        offline: "Transmission is unavailable during this design review stage.",
      };

  return (
    <div className="partnership-panel">
      <div className="partnership-panel__intro">
        <p className="overlay-kicker">{labels.kicker}</p>
        <h2 id="partnership-title">{labels.title}</h2>
        <p>
          {labels.body[0]}
          <br />
          {labels.body[1]}
        </p>
      </div>

      <form className="partnership-form" onSubmit={(event) => event.preventDefault()} autoComplete="off">
        <div className="partnership-form__grid">
          <label>
            <span>{labels.organization}</span>
            <input type="text" name="organization" autoComplete="organization" />
          </label>
          <label>
            <span>{labels.contact}</span>
            <input type="text" name="contact" autoComplete="name" />
          </label>
        </div>
        <label>
          <span>{labels.email}</span>
          <input type="email" name="email" inputMode="email" autoComplete="email" spellCheck={false} />
        </label>
        <label>
          <span>{labels.field}</span>
          <select name="collaboration" defaultValue="">
            <option value="" disabled>{labels.select}</option>
            {labels.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span>{labels.proposal}</span>
          <textarea name="proposal" rows={6} placeholder={labels.placeholder} />
        </label>
        <label className="partnership-form__consent">
          <input type="checkbox" name="consent" />
          <span>{labels.consent}</span>
        </label>
        <div className="partnership-form__offline">
          <button type="submit" disabled aria-describedby="transmission-status">
            TRANSMISSION OFFLINE
          </button>
          <p id="transmission-status" role="status">{labels.offline}</p>
        </div>
      </form>
    </div>
  );
}

function DayOneSequence({ language }: { language: Language }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timers = DAY_ONE_LINES.slice(1).map((_, index) =>
      window.setTimeout(() => setActiveIndex(index + 1), (index + 1) * 1150),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div className={"day-one-panel" + (activeIndex === DAY_ONE_LINES.length - 1 ? " is-complete" : "")}>
      <p className="overlay-kicker">SOL 001 / 06:40 MTC</p>
      <h2 id="day-one-title" className="visually-hidden">
        {language === "ko" ? "새로운 세계의 첫날" : "Day one in a new world"}
      </h2>
      <div className="day-one-sequence" aria-hidden="true">
        {DAY_ONE_LINES.map((line, index) => (
          <p
            key={line}
            className={
              "day-one-sequence__line" +
              (index <= activeIndex ? " is-visible" : "") +
              (index === activeIndex ? " is-current" : "")
            }
          >
            {line}
          </p>
        ))}
      </div>
      <p className="visually-hidden" aria-live="polite">{DAY_ONE_LINES[activeIndex]}</p>
      <div className="day-one-panel__footer">
        <span>2050.11.27</span>
        <span>ELYSIUM PLANITIA, MARS</span>
        <span>{String(activeIndex + 1).padStart(2, "0")} / 04</span>
      </div>
    </div>
  );
}

export function FlowaxExperience() {
  const [language, setLanguage] = useState<Language>("ko");
  const [overlay, setOverlay] = useState<OverlayState>(null);
  const copy = COPY[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => current === "ko" ? "en" : "ko");
  }, []);

  const closeOverlay = useCallback(() => {
    setOverlay(null);
  }, []);

  return (
    <>
      <CinematicBackground />
      <a className="skip-link" href="#main-content">{copy.skip}</a>

      <main
        className={"site-shell" + (language === "en" ? " site-shell--en" : "")}
        id="main-content"
        inert={overlay !== null}
        aria-hidden={overlay !== null}
      >
        <section className="hero" id="hero" aria-labelledby="hero-title">
          <div className="hero__grid" aria-hidden="true">
            {Array.from({ length: 5 }, (_, index) => <span key={index} />)}
          </div>

          <header className="site-header">
            <a className="site-header__brand brand-link" href="#hero" aria-label={copy.homeAria}><Brand /></a>
            <nav className="site-nav" aria-label={copy.mainNav}>
              <a href="#hero">{copy.nav[0]}</a>
              <a href="#mission">{copy.nav[1]}</a>
              <a href="#mission">{copy.nav[2]}</a>
              <a href="#logs">{copy.nav[3]}</a>
            </nav>
            <div className="site-header__actions">
              <button
                className="language-toggle"
                type="button"
                onClick={toggleLanguage}
                aria-label={copy.languageAria}
              >
                {copy.languageButton}
              </button>
              <a className="outline-action" href="#arrival">{copy.enterMission}</a>
            </div>
          </header>

          <div className="hero__headline">
            <h1 id="hero-title">
              <span>{copy.heroTitle[0]}</span>
              <span className="accent-text">{copy.heroTitle[1]}</span>
              <span>{copy.heroTitle[2]}</span>
            </h1>
            <p>
              <span className="hero__intro-line">{copy.heroIntro[0]}</span>
              <span className="hero__intro-line">{copy.heroIntro[1]}</span>
            </p>
          </div>

          <div className="hero__vision">
            <h2>
              <span>{copy.visionTitle[0]}</span>
              <span>{copy.visionTitle[1]}</span>
            </h2>
            <p className="hero__vision-copy">
              <strong>{copy.visionStrong}</strong>
              <span>{copy.visionBody[0]}</span>
              <span>{copy.visionBody[1]}</span>
            </p>
            <a href="#mission">{copy.visionLink}</a>
          </div>

          <a className="deep-link" href="#mission" aria-label={copy.deeperAria}>
            <span>{copy.deeper}</span>
            <span className="deep-link__arrow" aria-hidden="true">↓</span>
          </a>
        </section>

        <section className="mission" id="mission" aria-labelledby="mission-title">
          <div className="mission__copy">
            <p className="section-label">{copy.missionLabel}</p>
            <h2 id="mission-title" className="visually-hidden">{copy.missionTitle}</h2>
            <MissionStatement language={language} />
          </div>

          <dl className="mission-stats" aria-label={copy.statsAria}>
            {MISSION_STATS.map((stat) => (
              <div className="mission-stats__item" key={stat.value}>
                <dd>{stat.value}</dd>
                <dt>{stat.label[language]}</dt>
              </div>
            ))}
          </dl>
        </section>

        <section className="logs" id="logs" aria-labelledby="logs-title">
          <header className="logs__header">
            <div>
              <p className="section-label">{copy.logsLabel}</p>
              <h2 id="logs-title">
                <span>{copy.logsTitle[0]}</span>
                <span>{copy.logsTitle[1]}</span>
              </h2>
            </div>
            <button
              className="logs__all"
              type="button"
              onClick={() => setOverlay({ type: "archive", stage: 1 })}
              aria-label={copy.allLogsAria}
            >
              {copy.allLogs} <span aria-hidden="true">↗</span>
            </button>
          </header>

          <div className="mission-cards">
            {MISSION_LOGS.map((log) => (
              <article className="mission-card" key={log.name}>
                <div className={"card-media " + log.ratio}>
                  <Image
                    src={log.image}
                    alt={log.alt[language]}
                    fill
                    sizes="(max-width: 768px) calc(100vw - 48px), (max-width: 1100px) 32vw, 38vw"
                  />
                </div>
                <p className="mission-card__meta">
                  <span>{log.phase}</span>
                  <span aria-hidden="true">•</span>
                  <time>{log.date}</time>
                </p>
                <h3><span translate="no">{log.name}</span>{log.title[language]}</h3>
                <button
                  className="mission-card__open"
                  type="button"
                  onClick={() => setOverlay({ type: "archive", stage: log.archiveStage })}
                  aria-label={`${log.name}: ${log.title[language]}`}
                />
              </article>
            ))}
          </div>
        </section>

        <section className="arrival" id="arrival" aria-labelledby="arrival-title">
          <p className="section-label">{copy.arrivalLabel}</p>
          <h2 id="arrival-title">
            <span className="arrival__title-line">{copy.arrivalTitle[0]}</span>
            <span className="arrival__title-line">
              <span className="accent-text">{copy.arrivalTitle[1]}</span>
            </span>
            <span className="arrival__title-line">{copy.arrivalTitle[2]}</span>
          </h2>
          <p className="arrival__summary">
            <strong className="arrival__summary-line">{copy.arrivalSummary[0]}</strong>
            <span className="arrival__summary-line">{copy.arrivalSummary[1]}</span>
          </p>
          <div className="arrival__coordinates" aria-label={copy.coordinatesAria}>
            <time dateTime="2050-11-27">2050.11.27</time>
            <span aria-hidden="true">/</span>
            <span>ELYSIUM PLANITIA, MARS</span>
            <span aria-hidden="true">/</span>
            <span>SOL 001 · 06:40 MTC</span>
          </div>
          <button
            className="arrival__button"
            type="button"
            onClick={() => setOverlay({ type: "day-one" })}
          >
            {copy.dayOne}
          </button>

          <footer className="site-footer">
            <a className="brand-link" href="#hero" aria-label={copy.homeAria}><Brand compact /></a>
            <nav className="footer-nav" aria-label={copy.footerNav}>
              <a href="#hero">{copy.nav[0]}</a>
              <a href="#mission">{copy.nav[2]}</a>
              <a href="#logs">{copy.nav[3]}</a>
              <button type="button" onClick={() => setOverlay({ type: "partnership" })}>
                {copy.partnership}
              </button>
            </nav>
            <p>© 2050 FLOWAX SPACE</p>
          </footer>
        </section>
      </main>

      {overlay?.type === "archive" ? (
        <OverlayShell
          closeLabel={copy.close}
          languageLabel={copy.languageButton}
          languageToggleLabel={copy.languageAria}
          onClose={closeOverlay}
          onLanguageToggle={toggleLanguage}
          titleId="archive-title"
          variant="archive"
        >
          <MissionArchive initialStage={overlay.stage} language={language} />
        </OverlayShell>
      ) : null}

      {overlay?.type === "partnership" ? (
        <OverlayShell
          closeLabel={copy.close}
          languageLabel={copy.languageButton}
          languageToggleLabel={copy.languageAria}
          onClose={closeOverlay}
          onLanguageToggle={toggleLanguage}
          titleId="partnership-title"
          variant="partnership"
        >
          <PartnershipForm language={language} />
        </OverlayShell>
      ) : null}

      {overlay?.type === "day-one" ? (
        <OverlayShell
          closeLabel={copy.close}
          languageLabel={copy.languageButton}
          languageToggleLabel={copy.languageAria}
          onClose={closeOverlay}
          onLanguageToggle={toggleLanguage}
          titleId="day-one-title"
          variant="day-one"
        >
          <DayOneSequence language={language} />
        </OverlayShell>
      ) : null}
    </>
  );
}
