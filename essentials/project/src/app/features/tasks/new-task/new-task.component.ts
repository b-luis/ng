import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTask } from '../../../shared/models/task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  cancel = output<boolean>();
  add = output<NewTask>();

  title$$ = signal<string>('');
  summary$$ = signal<string>('');
  date$$ = signal<string>('');

  public onCancel(): void {
    return this.cancel.emit(false);
  }

  public onSubmit(): void {
    return this.add.emit({
      title: this.title$$(),
      summary: this.summary$$(),
      dueDate: this.date$$(),
    });
  }
}