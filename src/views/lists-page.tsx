import type { FC } from "hono/jsx";

type ListsPageProps = {
  // TODO: add proper type
  taskLists: { name: string }[];
};

export const ListsPage: FC<ListsPageProps> = ({ taskLists }) => (
  <main class="vw-100 vh-100 d-flex">
    <ul>
      {taskLists.map((list) => (
        <li>{list.name}</li>
      ))}
    </ul>
  </main>
);
