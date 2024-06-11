import type { TaskList } from "~/schema.ts";

import { Layout } from "./Layout.ts";

type ListsPageProps = {
  taskLists: TaskList[];
};

export const TaskListsPage = ({ taskLists }: ListsPageProps) => (
  <Layout>
    <main class="vw-100 vh-100 d-flex">
      <ul>
        {taskLists.map((list) => (
          <li>{list.name}</li>
        ))}
      </ul>
    </main>
  </Layout>
);