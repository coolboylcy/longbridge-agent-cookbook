import { PageHeader } from "@cookbook/ui";

export default function AppPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="App Name"
        description="Short description of what this app does."
      />
      <section className="px-6 py-10">
        <p className="text-[var(--color-lb-muted)]">App content goes here.</p>
      </section>
    </div>
  );
}
