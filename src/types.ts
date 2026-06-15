export type ActiveTab =
  | 'home'
  | 'data-structures'
  | 'sorting'
  | 'searching'
  | 'recursion'
  | 'graph'
  | 'tree'
  | 'quiz'
  | 'about';

export interface Complexity {
  timeBest: string;
  timeAverage: string;
  timeWorst: string;
  space: string;
}

export interface CodeTemplates {
  pseudocode: string;
  c: string;
  cpp: string;
  java: string;
  javascript: string;
}

export interface ConceptInfo {
  id: string;
  title: string;
  definition: string;
  advantages: string[];
  disadvantages: string[];
  applications: string[];
  complexity: Complexity;
  code: CodeTemplates;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}
