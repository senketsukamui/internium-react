export enum SortTypes {
  asc = "asc",
  desc = "desc",
}

export const SortLabels: Record<SortTypes, string> = {
  [SortTypes.asc]: "По возрастанию",
  [SortTypes.desc]: "По убыванию",
};

export enum SortByTypes {
  updatedAt = "updatedAt",
  salary = "salary",
  bestMatch = "bestMatch",
}

export const SortByLabels: Record<SortByTypes, string> = {
  [SortByTypes.updatedAt]: "По последнему обновлению",
  [SortByTypes.salary]: "По зарплате",
  [SortByTypes.bestMatch]: "По лучшему совпадению",
};
