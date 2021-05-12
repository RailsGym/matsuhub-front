import { User } from "./users";
import { Label } from "./labels";

export type AreaIndex = "purpose" |
  "vision" |
  "solution" |
  "superiority" |
  "indicator" |
  "value" |
  "explicitProblem" |
  "implicitProblem" |
  "substitute" |
  "channel" |
  "situation" |
  "trend" |
  "profit" |
  "market" |
  "future" |
  "mission" |
  "resource" |
  "mainMeans" |
  "skillValue" |
  "semanticValue" |
  "desire" |
  "action" |
  "relation" |
  "currentMeans";

export type Area = {
  id: string;
  type: AreaIndex;
  typeText: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  labels: Array<Label>;
}

export interface Canvas {
  id: string;
  title: string;
  owner_id: number;
  areas?: { [key: string] : Area }
  createdAt?: Date;
  updatedAt?: Date;
}
