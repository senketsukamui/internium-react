export interface Vacancy {
  paid: string;
  location: string;
  title: string;
  companyId: number;
  description: string;
  abilities: number[];
}

export interface VacancyModel {
  paid: string;
  location: string;
  id: number;
  createdAt: string;
  companyId: number;
  archived: true;
  title: string;
  description: string;
}
