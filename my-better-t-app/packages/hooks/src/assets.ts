import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type ORPC = any;


export function useAssetsByIncident(orpc: ORPC, incidentId: string | null) {
  if (!incidentId) {
    return {
      assets: [] as any[],
      isLoading: false,
      error: null as any,
      refetch: () => {},
    };
  }

  const query = useQuery(
    orpc.assets.listByIncident.queryOptions({
      input: { incidentId },
    })
  );

  return {
    assets: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
}


export function useCreateAsset(orpc: ORPC) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    orpc.assets.create.mutationOptions({
      onSettled: () => {
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


export function useDeleteAsset(orpc: ORPC) {
  const queryClient = useQueryClient();

  const mutation = useMutation(
    orpc.assets.delete.mutationOptions({
      onSettled: () => {
        queryClient.invalidateQueries();
      },
    })
  );

  return {
    remove: mutation.mutate,
    removeAsync: mutation.mutateAsync,
    isRemoving: mutation.isPending,
    error: mutation.error,
  };
}