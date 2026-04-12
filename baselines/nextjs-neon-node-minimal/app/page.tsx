const setupSteps = [
  "Copy or rename this starter for your project.",
  "Set DATABASE_URL or NEON_DATABASE_URL in server-only env files.",
  "Run pnpm db:migrate before trying the todo endpoints.",
  "Keep the homepage build-safe: no DB access required here.",
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Starter baseline</p>
        <h1>Next.js + Neon Postgres foundation</h1>
        <p className="lead">
          This homepage is intentionally build-safe. It does not require a
          database connection or environment variables during build.
        </p>

        <div className="action-row" role="group" aria-label="Example API links">
          <a className="button primary" href="/api/health/db">
            Open DB health API
          </a>
          <a className="button secondary" href="/api/todos">
            Open todos API
          </a>
        </div>
      </section>

      <section className="info-grid" aria-label="Setup notes">
        <article className="info-card">
          <h2>What is included</h2>
          <ul>
            <li>Mobile-first baseline UI</li>
            <li>Server-only lazy Postgres access with pg</li>
            <li>Safe migration runner</li>
            <li>Validated CRUD API example</li>
          </ul>
        </article>

        <article className="info-card">
          <h2>Setup checklist</h2>
          <ol>
            {setupSteps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </article>
      </section>
    </main>
  );
}
