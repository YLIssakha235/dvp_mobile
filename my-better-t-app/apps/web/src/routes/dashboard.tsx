import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";

import { getUser } from "@/functions/get-user";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await getUser();
    return { session };
  },
  loader: async ({ context }) => {
    if (!context.session) {
      throw redirect({ to: "/login" });
    }
  },
});

function RouteComponent() {
  const { session } = Route.useRouteContext();

  // ✅ récupère orpc depuis le Router context (déjà prévu dans __root.tsx)
  const { orpc } = Route.useRouteContext();

  // Private test
  const privateData = useQuery(orpc.privateData.queryOptions());

  // ✅ LIST incidents
  const incidentsQuery = useQuery(
    orpc.incidents.list.queryOptions({
      input: { take: 10, skip: 0 },
    })
  );

  // ✅ CREATE incident
  const createIncident = useMutation(
    orpc.incidents.create.mutationOptions({
      onSettled: () => {
        // refresh la liste
        incidentsQuery.refetch();
      },
    })
  );

  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>
      <p>Welcome {session?.user.name}</p>
      <p>API: {privateData.data?.message}</p>

      <hr style={{ margin: "16px 0" }} />

      <h2>Incidents</h2>

      <button
        onClick={() =>
          createIncident.mutate({
            title: "Test Incident",
            description: "Created from dashboard",
          })
        }
        disabled={createIncident.isPending}
      >
        {createIncident.isPending ? "Creating..." : "Create Incident"}
      </button>

      {incidentsQuery.isLoading && <p>Loading incidents...</p>}
      {incidentsQuery.error && <p>Error loading incidents</p>}

      <ul>
        {(incidentsQuery.data ?? []).map((inc: any) => (
          <li key={inc.id}>
            {inc.title} — {inc.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

