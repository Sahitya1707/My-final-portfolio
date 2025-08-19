import React, { useEffect, useState } from "react";
import ButtonTypeOne from "./ButtonTypeOne";
import BackgroundText from "./BackgroundText";

const GITHUB_USERNAME =
  process.env.NEXT_PUBLIC_GITHUB_USERNAME || "Sahitya1707";

const HomePageDescription = () => {
  const roles = [
    "Software Developer",
    "Full-Stack Developer",
    "Python • TypeScript • React • Angular • Node.js",
  ];
  const [roleIndex, setRoleIndex] = useState(0);

  // activity / feed state
  const [activeTab, setActiveTab] = useState("github"); // 'today' | 'activity' | 'github'
  const [githubEvents, setGithubEvents] = useState(null);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [eventsError, setEventsError] = useState(null);

  // today items loaded from API (Google Sheets)
  const [todayItems, setTodayItems] = useState([]);
  const [loadingToday, setLoadingToday] = useState(false);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((p) => (p + 1) % roles.length),
      2600
    );
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (activeTab !== "github" || !GITHUB_USERNAME) return;

    const fetchEvents = async () => {
      setLoadingEvents(true);
      setEventsError(null);
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/events/public`
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const data = await res.json();
        setGithubEvents(data.slice(0, 6)); // keep small
      } catch (err) {
        setEventsError("Unable to load GitHub activity.");
        setGithubEvents([]);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, [activeTab]);

  // load today items from our API (which reads Google Sheets)
  useEffect(() => {
    const loadToday = async () => {
      setLoadingToday(true);
      try {
        const res = await fetch("/api/today");
        const json = await res.json();
        if (!res.ok) {
          setTodayItems([]);
          setEventsError(
            json.error || json.detail || "Failed to load today items"
          );
        } else {
          setTodayItems(json.items || []);
          setEventsError(null);
        }
      } catch (err) {
        setEventsError("Network error while loading today items");
      } finally {
        setLoadingToday(false);
      }
    };
    loadToday();
  }, []);

  return (
    <section
      className="relative flex items-center justify-center w-full px-4 overflow-hidden"
      style={{
        minHeight: "calc(100vh - var(--header-height, 64px))",
        paddingTop: "2.25rem",
        paddingBottom: "2.25rem",
      }}
    >
      <BackgroundText
        text="</>"
        style={{
          WebkitTextStroke: "2px rgb(var(--primary-clr))",
          opacity: "0.06",
          position: "absolute",
          top: "48%",
          left: "52%",
          transform: "translate(-50%, -50%) scale(1.35) rotate(-10deg)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <div className="relative z-10 max-w-6xl w-full flex flex-col lg:flex-row items-stretch gap-8">
        <div className="flex-1 flex flex-col justify-center text-center lg:text-left px-2 lg:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Hey, I am Sahitya
            </span>
            <span className="block mt-1 text-colorText">Neupane!</span>
          </h1>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-4 justify-center lg:justify-start">
            <p
              aria-live="polite"
              className="text-lg sm:text-xl md:text-2xl text-primary font-semibold tracking-wide transition-opacity duration-400"
              key={roleIndex}
            >
              {roles[roleIndex]}
            </p>
          </div>
          <div className="flex gap-3 items-center md:justify-start justify-center">
            <ButtonTypeOne
              color={"colorText"}
              bgColor={"primary"}
              text={"About Me"}
              link={"/about"}
            />
            <ButtonTypeOne
              color={"primary"}
              bgColor={"colorText"}
              text={"Projects"}
              link={"/projects"}
            />
          </div>

          <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-xl mx-auto lg:mx-0">
            Recent graduate with strong React & Node experience. Currently
            learning Python, TypeScript, Angular and practicing algorithms on
            LeetCode. Open to software developer roles.
          </p>
        </div>

        {/* Activity Card */}
        <aside className="w-full lg:w-[320px] flex-shrink-0">
          <div className="bg-gradient-to-b from-white/40 to-white/10 backdrop-blur-sm rounded-xl p-4 h-full flex flex-col shadow-lg border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-colorText">
                  What I'm up to
                </p>
                <p className="text-xs text-gray-400">
                  Live updates & recent activity
                </p>
              </div>
            </div>

            {/* tabs */}
            <div className="mt-3 flex gap-2">
              {/* <button
                onClick={() => setActiveTab("activity")}
                className={`flex-1 text-xs py-1 rounded-md ${
                  activeTab === "activity"
                    ? "bg-primary text-white"
                    : "bg-colorNav/40 text-colorText"
                }`}
              >
                Activity
              </button> */}
              <button
                onClick={() => setActiveTab("github")}
                className={`flex-1 text-xs py-1 rounded-md ${
                  activeTab === "github"
                    ? "bg-primary text-white"
                    : "bg-colorNav/40 text-colorText"
                }`}
              >
                GitHub
              </button>
            </div>

            {/* content */}
            <div className="mt-3 flex-1 overflow-auto min-h-[120px] max-h-[260px]">
              {activeTab === "activity" && (
                <div className="text-sm text-gray-400">
                  <p className="mb-2">Recent project highlights:</p>
                  <ul className="list-disc pl-4 text-sm text-gray-300">
                    <li>
                      Refactoring portfolio for better accessibility & mobile
                      layout
                    </li>
                    <li>Implementing a small activity feed (this card)</li>
                    <li>Improving projects page with project filters & tags</li>
                  </ul>

                  <p className="mt-4 mb-2 font-medium text-colorText">Today</p>
                  <ul className="list-disc pl-4 text-sm text-gray-300">
                    {loadingToday && <li>Loading today's items...</li>}
                    {!loadingToday &&
                      todayItems.length === 0 &&
                      "No items found for today."}
                    {!loadingToday &&
                      todayItems.length > 0 &&
                      todayItems.map((item) => (
                        <li
                          key={item.id}
                          className="flex flex-col sm:flex-row gap-1"
                        >
                          <span className="text-primary font-medium">
                            {item.title}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {item.meta}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {activeTab === "github" && (
                <div>
                  {!GITHUB_USERNAME && (
                    <div className="text-sm text-gray-400">
                      <p className="mb-2">GitHub feed is disabled.</p>
                      <p className="text-xs">
                        Set NEXT_PUBLIC_GITHUB_USERNAME in your environment to
                        show recent public activity.
                      </p>
                    </div>
                  )}

                  {GITHUB_USERNAME && loadingEvents && (
                    <p className="text-sm text-gray-400">
                      Loading GitHub activity...
                    </p>
                  )}
                  {GITHUB_USERNAME && eventsError && (
                    <p className="text-sm text-red-400">{eventsError}</p>
                  )}

                  {GITHUB_USERNAME &&
                    githubEvents &&
                    githubEvents.length === 0 && (
                      <p className="text-sm text-gray-400">
                        No recent public activity found.
                      </p>
                    )}

                  {GITHUB_USERNAME &&
                    githubEvents &&
                    githubEvents.length > 0 && (
                      <ul className="flex flex-col gap-2">
                        {githubEvents.map((ev) => {
                          const time = new Date(
                            ev.created_at
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          });
                          const repoUrl = `https://github.com/${
                            ev.repo?.name || ""
                          }`;
                          let title = ev.type;
                          if (ev.type === "PushEvent") {
                            const commitMsg =
                              ev.payload?.commits?.[0]?.message ||
                              "pushed commits";
                            title = `Pushed: ${commitMsg}`;
                          } else if (ev.type === "CreateEvent") {
                            title = `Created ${ev.payload?.ref_type || "ref"}`;
                          } else if (ev.type === "WatchEvent") {
                            title = `Starred ${ev.repo?.name || ""}`;
                          }

                          return (
                            <li
                              key={ev.id}
                              className="p-2 rounded-md bg-colorNav/30"
                            >
                              <a
                                href={repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="text-sm text-colorText truncate">
                                    {title}
                                  </div>
                                  <div className="text-xs text-gray-400 ml-2">
                                    {time}
                                  </div>
                                </div>
                                <div className="text-xs text-gray-400 mt-1 truncate">
                                  {ev.repo?.name}
                                </div>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <a
                href={
                  GITHUB_USERNAME
                    ? `https://github.com/${GITHUB_USERNAME}`
                    : "https://github.com"
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-xs py-2 text-center rounded-md bg-colorNav/60 hover:bg-colorNav/80 transition"
              >
                View profile
              </a>
              <button
                onClick={() => {
                  // small quick action: toggle tabs to show "today"
                  setActiveTab("github");
                }}
                className="text-xs px-3 py-2 rounded-md bg-colorNav/30"
              >
                Quick
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default HomePageDescription;
