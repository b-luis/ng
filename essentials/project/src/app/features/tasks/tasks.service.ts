import { computed, Injectable, InputSignal, signal } from '@angular/core';
import { DUMMY_TASKS } from '../../shared/data/dummy-tasks';
import { NewTaskData, Task } from '../../shared/models/task.model';
import { User } from '../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  #tasks$$ = signal<Task[]>(DUMMY_TASKS);
  isAddingTask$$ = signal<boolean>(false);

  allTasks = computed(() => this.#tasks$$);
  isAddingTask = computed(() => this.isAddingTask$$());

  constructor() {}

  public getUserTasks(userId: string | undefined): Task[] {
    if (!userId) return [];

    return this.#tasks$$().filter((task) => task.userId === userId);
  }

  public addTask(taskData: NewTaskData, userId: string): void {
    const newTask = {
      id: new Date().getTime().toString(),
      userId: userId,
      dueDate: taskData.date,
      ...taskData,
    };

    this.#tasks$$.update((currentTasks: any) => [...currentTasks, newTask]);
    this.updateAddingTaskState(false); // to dismiss the add new task dialog
  }

  public removeTask(id: string): void {
    this.#tasks$$.update((currentTasks: any) =>
      currentTasks.filter((task: Task) => task.id !== id)
    );
  }

  public cancelTask(bool: boolean): void {
    this.updateAddingTaskState(false);
  }

  public updateAddingTaskState(state: boolean): void {
    this.isAddingTask$$.set(state);
  }

  public toggleAddingTaskState(): void {
    this.isAddingTask$$.update((currentState) => !currentState);
  }
}