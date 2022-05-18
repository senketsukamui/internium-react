import { InternStatuses } from "store/auth/types";
import { Ability } from "store/specializations/types";

export interface InternUpdateInterface {
  location: string;
  description: string;
  status: string;
  birthdate: string;
  gender: boolean;
  firstName: string;
  lastName: string;
  middleName: string;
}

export interface Intern {
  abilities: Ability[];
  status: InternStatuses;
  id: number;
  email: string;
  firstName: string;
  middleName: string;
  lastName: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  gender: boolean;
  location: string;
  description: string;
  avatar: string;
  phone: string;
}
