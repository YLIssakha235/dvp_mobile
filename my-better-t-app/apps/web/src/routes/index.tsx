import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

//import { orpc } from "@/utils/orpc";

import { queryClient, orpc } from "@/utils/orpc";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});


const TITLE_TEXT = `
 ██████╗ ███████╗████████╗████████╗███████╗██████╗
 ██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
 ██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
 ██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
 ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

 ████████╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
 ╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
    ██║       ███████╗   ██║   ███████║██║     █████╔╝
    ██║       ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
    ██║       ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
    ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 `;
 const TitlE_TEXT_2 = `
  __  __       _       ____        _   _   _             ____  _             _ 
 |  \\/  |_   _| |__   / ___| _   _| |_| |_| | ___  _ __ / ___|| |_ _   _  __| |
 | |\\/| | | | | '_ \\  \\___ \\| | | | __| __| |/ _ \\| '_ \\\\___ \\| __| | | |/ _\` |
 | |  | | |_| | |_) |  ___) | |_| | |_| |_| | (_) | |_) |___) | |_| |_| | (_| |
 |_|  |_|\\__,_|_.__/  |____/ \\__,_|\\__|\\__|_|\\___/| .__/____/ \\__|\\__,_|\\__,_|
                                                   |_|                         
 `;

 const imageUrl = "https://raw.githubusercontent.com/ts-stack/my-better-t-app/main/assets/logo.png";

 
function HomeComponent() {
  const healthCheck = useQuery(orpc.healthCheck.queryOptions());
  // Example query to demonstrate functionality
  //const test = useQuery(orpc.tasks.list.queryOptions());

  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <pre className="overflow-x-auto font-mono text-sm">{TITLE_TEXT}</pre>
      <pre className="overflow-x-auto font-mono text-sm">{TitlE_TEXT_2}</pre>
      <img src={imageUrl} alt="Better T Stack Logo" className="w-64 h-auto my-4" />
      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">API Status</h2>
          <div className="flex items-center gap-2">
            <div
              className={`h-2 w-2 rounded-full ${healthCheck.data ? "bg-green-500" : "bg-red-500"}`}
            />
            <span className="text-muted-foreground text-sm">
              {healthCheck.isLoading
                ? "Checking..."
                : healthCheck.data
                  ? "Connected"
                  : "Disconnected"}
            </span>
          </div>
        </section>
                {/* Example data from tasks query
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">Example Tasks</h2>
          {test.isLoading ? (
            <p className="text-sm text-muted-foreground">Loading tasks...</p>
          ) : test.data && test.data.length > 0 ? (
            <ul className="list-disc list-inside">
              {test.data.map((task) => (
                <li key={task.id} className="text-sm">
                  {task.title} - {task.done ? "Done"  : "Pending"}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No tasks found.</p>
          )}
        </section> */}
      </div>
    </div>
  );
}
