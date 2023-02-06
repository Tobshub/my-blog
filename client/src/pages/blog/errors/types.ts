export type Solution =
  | {
      link: string;
      text: string;
    }
  | { text: string; action(): void };
