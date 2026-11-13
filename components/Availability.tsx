import { site } from "@/content/site";

const LABEL = {
  available: "Available for new projects",
  limited: "Limited availability",
  unavailable: "Not taking new projects right now",
} as const;

export function Availability({ withNote = false, className = "" }: { withNote?: boolean; className?: string }) {
  const { status, note } = site.availability;
  const colour = status === "available" ? "bg-leaf" : status === "limited" ? "bg-signal" : "bg-muted";
  return (
    <p className={`flex items-start gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className={`mt-[0.42em] inline-block h-2 w-2 shrink-0 rounded-full ${colour} ${status === "available" ? "dot-live" : ""}`}
      />
      <span>
        <span className="font-medium">{LABEL[status]}</span>
        {withNote && note ? <span className="text-muted"> — {note}</span> : null}
      </span>
    </p>
  );
}
