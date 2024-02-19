import {Role} from "./enum";
import {PersonName,Technology} from "./types";

interface IRoleDescription extends PersonName {
  roleName: Role,
  responsibilities: string;
  result: string;
}

export interface IReport {
  projectName: string;
  mentor: PersonName;
  repository: string;
  design: string;
  jira: string;
  sprintsReports: string;
  app: string;
  shortProjectDescription: string;
  technologies: {
    [key: string]: Technology
  };
  introduction: string;
  rolesDescription: {
    [key: string]: IRoleDescription
  }
  additions: string;
}