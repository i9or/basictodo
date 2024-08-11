import { db } from "~/db.ts";
import { TaskListsRepository } from "~/repositories/TaskListsRepository.ts";
import { TaskListsService } from "~/services/TaskListsService.ts";

/**
 * Application explicit dependency injection module, where all entities
 * are instantiated and injected as dependencies
 */

// Repositories
export const taskListsRepository = new TaskListsRepository(db);

// Services
export const taskListsService = new TaskListsService(taskListsRepository);
