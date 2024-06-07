import { AuthController } from "~/controllers/AuthController.tsx";
import { HomeController } from "~/controllers/HomeController.tsx";
import { TaskListsController } from "~/controllers/TaskListsController.tsx";
import { TasksController } from "~/controllers/TasksController.ts";
import { database } from "~/database.ts";
import { TaskListsRepository } from "~/repositories/TaskListsRepository.ts";
import { TaskListsService } from "~/services/TaskListsService.ts";

/**
 * Whole application explicit dependency injection class, where all entities are
 * instantiated and injected as dependencies
 */
export abstract class App {
  // Repositories
  public static taskListsRepository = new TaskListsRepository(database);

  // Services
  public static taskListsService = new TaskListsService(
    App.taskListsRepository,
  );

  // Controllers
  public static homeController = new HomeController();
  public static taskListsController = new TaskListsController(
    App.taskListsService,
  );
  public static authController = new AuthController();
  public static tasksController = new TasksController();
}
