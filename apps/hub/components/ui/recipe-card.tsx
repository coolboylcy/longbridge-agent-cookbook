import { cn } from "./utils";
import { Tag } from "./tag";
import { RecipeThumbnail } from "./thumbnails";
import type { RecipeCard as RecipeCardData } from "../../content/types";

export function RecipeCard({
  recipe,
  className,
}: {
  recipe: RecipeCardData;
  className?: string;
}) {
  return (
    <a
      href={recipe.href}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border border-[var(--color-lb-border)] bg-[var(--color-lb-surface)] transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-[var(--color-lb-border-strong)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]",
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--color-lb-bg)]">
        <RecipeThumbnail
          kind={recipe.thumbnail}
          className="h-full w-full transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {/* Meta pill on top-left */}
        <div className="absolute left-3 top-3 rounded-md bg-[var(--color-lb-bg)]/85 px-2 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--color-lb-text-dim)] backdrop-blur">
          {recipe.meta}
        </div>
        {/* Tags on top-right */}
        <div className="absolute right-3 top-3 flex flex-wrap justify-end gap-1">
          {recipe.tags.slice(0, 2).map((t) => (
            <Tag key={t.label} color={t.color}>
              {t.label}
            </Tag>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-base font-bold text-[var(--color-lb-text)] transition-colors group-hover:text-[var(--color-lb-green)]">
          {recipe.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-[var(--color-lb-muted)]">
          {recipe.description}
        </p>
        {/* All tags */}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {recipe.tags.map((t) => (
            <Tag key={t.label} color={t.color}>
              {t.label}
            </Tag>
          ))}
        </div>
      </div>
    </a>
  );
}
