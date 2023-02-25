import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Complexity, CreateTodoFormGroup, Status} from "../../private-module.interfaces";
import {complexityValues, statusValues} from "../../private-module.constants";

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent {

  complexityValues: Complexity[] = complexityValues;
  statusValues: Status[] = statusValues;

  form: FormGroup<CreateTodoFormGroup> = new FormGroup<CreateTodoFormGroup>({
    title: new FormControl('', [Validators.required]),
    subTitle: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
    complexity: new FormControl('MEDIUM', [Validators.required]),
    status: new FormControl('BACKLOG', [Validators.required])
  });

  onCreateTodo() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  //////////////////////////////
  // GETTERS for FormControls //
  //////////////////////////////

  get title(): FormControl {
    return this.form.get('title') as FormControl;
  }

  get subTitle(): FormControl {
    return this.form.get('subTitle') as FormControl;
  }

  get text(): FormControl {
    return this.form.get('text') as FormControl;
  }

}
