import { Fragment } from "react";

/**
 * Parses a string containing inline Markdown-style links `[text](url)`
 * and returns a JSX fragment with clickable <a> tags. External links open
 * in a new tab. Plain text outside links is preserved as-is.
 *
 * Used in content dictionaries so authors can drop a registration link
 * inline (e.g. "Free to [sign up](https://...)") without restructuring
 * each piece of copy into a complex component prop.
 */
export function RichText({ text }: { text: string }) {
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  const out: React.ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(<Fragment key={key++}>{text.slice(last, m.index)}</Fragment>);
    const isExternal = /^https?:\/\//.test(m[2] ?? "");
    out.push(
      <a
        key={key++}
        href={m[2] ?? "#"}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-[var(--color-lb-green)] underline-offset-4 hover:underline"
      >
        {m[1]}
      </a>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return <>{out}</>;
}
