import {Complexity, Status, TodoItem} from "./private-module.interfaces";

export const complexityValues: Complexity[] = ['EASY', 'MEDIUM', 'HARD'];
export const statusValues: Status[] = ['BACKLOG', 'TODO', 'DONE'];

export const todoExampleItems: TodoItem[] = [
  {
    title: 'Hard Item',
    complexity: 'HARD',
    subTitle: 'Hard Subtitle',
    text: 'Hard Text',
    status: 'BACKLOG'
  },
  {
    title: 'Medium Item',
    complexity: 'MEDIUM',
    subTitle: 'Medium Subtitle',
    text: 'Medium Text',
    status: 'TODO'
  },
  {
    title: 'Easy Item',
    complexity: 'EASY',
    subTitle: 'Easy Subtitle',
    text: 'Easy Text',
    status: 'DONE'
  },
  {
    title: 'Example Item',
    complexity: 'MEDIUM',
    subTitle: 'Example Subtitle',
    text: 'Example Text',
    status: 'DONE'
  }
]
