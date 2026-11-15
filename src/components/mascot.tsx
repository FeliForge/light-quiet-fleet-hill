import { useId } from "react";
import type { Avatar } from "@/lib/store";

export function Mascot({
  avatar,
  className = "size-28",
  label = "Personagem",
}: {
  avatar: Avatar;
  className?: string;
  label?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const skin = `st-${Math.min(4, Math.max(0, avatar.skin))}`;
  const hair = `hc-${Math.min(5, Math.max(0, avatar.hairColor))}`;
  const outfit = `outfit-${Math.min(2, Math.max(0, avatar.outfit))}`;

  return (
    <svg viewBox="0 0 160 200" className={className} role="img" aria-label={label}>
      <ellipse cx="80" cy="190" rx="34" ry="6" fill="var(--color-border)" />
      {avatar.accessory === 6 ? (
        <circle
          cx="80"
          cy="104"
          r="78"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          strokeDasharray="5 6"
        />
      ) : null}
      {avatar.outfit === 2 ? (
        <path className={outfit} d="M36 146c-8 18-6 42 4 50h80c10-8 12-32 4-50-14 14-28 16-44 6-16 10-30 8-44-6z" />
      ) : null}
      <rect className={outfit} x="46" y="128" width="68" height="58" rx="26" />
      {avatar.outfit === 1 ? <rect className={outfit} x="66" y="118" width="28" height="22" rx="10" /> : null}
      <rect className={skin} x="68" y="116" width="24" height="18" rx="8" />
      <circle className={skin} cx="40" cy="92" r="8" />
      <circle className={skin} cx="120" cy="92" r="8" />
      {avatar.hair === 1 ? (
        <path
          className={hair}
          d="M36 100c2-46 20-66 44-66s42 20 44 66v22c-8 12-18 6-24-4 2-14-4-22-20-22s-22 8-20 22c-6 10-16 16-24 4z"
        />
      ) : null}
      <circle className={skin} cx="80" cy="90" r="42" />
      {avatar.hair === 0 ? (
        <path className={hair} d="M40 86c2-32 18-46 40-46s38 14 40 46c-10-14-24-20-40-20s-30 6-40 20z" />
      ) : null}
      {avatar.hair === 1 ? (
        <path className={hair} d="M42 78c6-28 18-38 38-38s32 10 38 38c-12-8-24-12-38-12s-26 4-38 12z" />
      ) : null}
      {avatar.hair === 2 ? (
        <g className={hair}>
          <path d="M46 78l12-30 12 26z" />
          <path d="M66 70l12-34 14 30z" />
          <path d="M90 68l12-34 16 32z" />
          <path d="M40 86c4-24 16-36 40-36" fill="none" stroke="currentColor" strokeWidth="0" />
          <path d="M42 84c4-26 18-40 38-40s34 12 38 36c-12-10-24-14-38-14s-26 4-38 18z" />
        </g>
      ) : null}
      {avatar.hair === 3 ? (
        <g className={hair}>
          <path d="M42 84c4-30 18-42 38-42s34 12 38 42c-10-14-22-18-38-18s-28 4-38 18z" />
          <circle cx="80" cy="40" r="13" />
        </g>
      ) : null}
      {avatar.hair === 4 ? (
        <path className={hair} d="M40 92c2-36 16-52 40-52s38 16 40 52c-8-4-14 2-18 12-4-16-10-22-22-22s-18 6-22 22c-4-10-10-16-18-12z" />
      ) : null}
      {avatar.hair === 5 ? <ellipse cx="98" cy="68" rx="12" ry="6" fill="white" opacity="0.35" /> : null}
      {avatar.accessory === 3 ? (
        <g className="hc-3">
          <ellipse cx="80" cy="52" rx="40" ry="16" />
          <rect x="42" y="50" width="76" height="8" rx="3" />
        </g>
      ) : null}
      {avatar.accessory === 4 ? (
        <path className="blush" d="M112 58c10-12 22-8 22 2-10 6-16 4-22-2zm22 2c8-10 20-6 16 4-8 2-14 0-16-4z" />
      ) : null}
      <ellipse className="blush" cx="52" cy="104" rx="7" ry="3.5" opacity="0.4" />
      <ellipse className="blush" cx="108" cy="104" rx="7" ry="3.5" opacity="0.4" />
      <g className="ink">
        {avatar.face === 1 ? (
          <>
            <path d="M54 78l14 5" fill="none" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M106 78l-14 5" fill="none" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinecap="round" />
          </>
        ) : null}
        {avatar.face === 2 ? (
          <>
            <circle cx="64" cy="98" r="3.6" />
            <path d="M90 98h16" fill="none" stroke="var(--color-ink)" strokeWidth="2.6" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="64" cy="98" r="3.8" />
            <circle cx="98" cy="98" r="3.8" />
          </>
        )}
        <circle cx="62" cy="96" r="1.2" fill="white" />
        {avatar.face === 2 ? null : <circle cx="96" cy="96" r="1.2" fill="white" />}
        {avatar.face === 3 ? (
          <ellipse cx="80" cy="116" rx="6" ry="7" fill="none" stroke="var(--color-ink)" strokeWidth="2.2" />
        ) : avatar.face === 1 ? (
          <path d="M68 114h24" fill="none" stroke="var(--color-ink)" strokeWidth="2.4" strokeLinecap="round" />
        ) : (
          <path d="M66 112c6 8 22 8 28 0" fill="none" stroke="var(--color-ink)" strokeWidth="2.5" strokeLinecap="round" />
        )}
      </g>
      {avatar.accessory === 1 ? (
        <g id={`${uid}-glasses`} fill="none" stroke="var(--color-ink)" strokeWidth="2.6">
          <circle cx="64" cy="98" r="12" />
          <circle cx="98" cy="98" r="12" />
          <path d="M76 98h10" />
          <path d="M52 96h-6M110 96h6" />
        </g>
      ) : null}
      {avatar.accessory === 2 ? (
        <g>
          <path d="M46 92c2-30 16-46 34-46s32 16 34 46" fill="none" stroke="var(--color-ink)" strokeWidth="4" />
          <rect className="ink" x="34" y="86" width="14" height="20" rx="5" />
          <rect className="ink" x="112" y="86" width="14" height="20" rx="5" />
        </g>
      ) : null}
      {avatar.accessory === 5 ? (
        <polygon className="fill-accent" points="80,146 84,156 95,157 86,164 89,175 80,169 71,175 74,164 65,157 76,156" />
      ) : null}
    </svg>
  );
}
