import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/project")({
  head: () => ({ meta: [{ title: "Project" }] }),
  component: ProjectPage,
});

function ProjectPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-semibold">Maintenance Incidents Platform</h1>
      <p className="mt-2 text-muted-foreground">
        Plateforme Web & Mobile pour signaler, suivre, assigner, valider et exporter des incidents de maintenance.
      </p>

      <div className="mt-6 grid gap-4">
        <section className="rounded-lg border p-4">
          <h2 className="font-medium">Workflow</h2>
          <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
            <li>Tech crée incident (OPEN)</li>
            <li>Manager assigne (ASSIGNED)</li>
            <li>Intervention (IN_PROGRESS → RESOLVED)</li>
            <li>Validation + coût (APPROVED / READY_TO_EXPORT)</li>
            <li>Export + traçabilité (EXPORTED)</li>
          </ul>
        </section>

        <section className="rounded-lg border p-4">
          <h2 className="font-medium">Tables (backend)</h2>
          <ul className="mt-2 list-disc list-inside text-sm text-muted-foreground">
            <li>User</li>
            <li>Incident</li>
            <li>Asset (photos/vidéos)</li>
            <li>Comment</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
