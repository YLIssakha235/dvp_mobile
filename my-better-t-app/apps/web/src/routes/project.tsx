import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/project")({
  head: () => ({ meta: [{ title: "Project" }] }),
  component: ProjectPage,
});

function ProjectPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-semibold">
        Maintenance Incidents Management Platform
      </h1>

      <p className="mt-2 text-muted-foreground">
        Web & Mobile platform to report, assign, track, validate and export
        maintenance incidents in a structured workflow.
      </p>

      <div className="mt-6 grid gap-4">

        {/* Workflow */}
        <section className="rounded-lg border p-4">
          <h2 className="font-medium">Incident Workflow</h2>
          <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
            <li>Technician creates an incident (OPEN)</li>
            <li>Manager assigns it (ASSIGNED)</li>
            <li>Intervention phase (IN_PROGRESS → RESOLVED)</li>
            <li>Validation and cost approval (APPROVED / READY_TO_EXPORT)</li>
            <li>Export to external system (EXPORTED)</li>
          </ul>
        </section>

        {/* Backend Architecture */}
        <section className="rounded-lg border p-4">
          <h2 className="font-medium">Backend Architecture</h2>
          <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
            <li><strong>User</strong> – Authentication & role management</li>
            <li><strong>Incident</strong> – Core maintenance ticket entity</li>
            <li><strong>Asset</strong> – Media attachments (images/videos)</li>
            <li><strong>Comment</strong> – Incident discussion & traceability</li>
          </ul>
        </section>

        {/* Technical Stack */}
        <section className="rounded-lg border p-4">
          <h2 className="font-medium">Technical Stack</h2>
          <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
            <li>Frontend: React + TanStack Router</li>
            <li>Data fetching: TanStack Query</li>
            <li>API layer: ORPC</li>
            <li>Backend: Node.js + Prisma</li>
            <li>Database: PostgreSQL</li>
          </ul>
        </section>

        {/* Navigation */}
        <section className="rounded-lg border p-4">
          <h2 className="font-medium">Try the Application</h2>
          <div className="mt-3 flex gap-3">
            <Link
              to="/dashboard"
              className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
            >
              Open Dashboard
            </Link>

            <Link
              to="/login"
              className="rounded-md border px-3 py-2 text-sm hover:bg-muted"
            >
              Log In
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

