import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ORPC = any;


export function useIncidents(
  orpc: ORPC,
  input?: { status?: string; take?: number; skip?: number }
) {
  const query = useQuery(
    orpc.incidents.list.queryOptions({
      input,
    })
  );

  return {
    incidents: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}


export function useIncidentById(orpc: ORPC, id: string | null) {
  if (!id) {
    return {
      incident: null as null,
      isLoading: false,
      error: null as any,
      refetch: () => {},
    };
  }

  const query = useQuery(
    orpc.incidents.getById.queryOptions({
      input: { id },
    })
  );

  return {
    incident: query.data ?? null,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}


export function useCreateIncident(orpc: ORPC) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    orpc.incidents.create.mutationOptions({
      onSettled: () => {
        // Après création, on invalide la liste pour rafraîchir
        queryClient.invalidateQueries();
      },
    })
  );

  return {
    create: mutation.mutate,
    createAsync: mutation.mutateAsync,
    isCreating: mutation.isPending,
    error: mutation.error,
  };
}