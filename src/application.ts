import { database } from "~/database.ts";
import { TaskListsRepository } from "~/repositories/TaskListsRepository.ts";
import { TaskListsService } from "~/services/TaskListsService.ts";

/**
 * Application explicit dependency injection module, where all entities
 * are instantiated and injected as dependencies
 */

// Repositories
export const taskListsRepository = new TaskListsRepository(database);

// Services
export const taskListsService = new TaskListsService(taskListsRepository);
