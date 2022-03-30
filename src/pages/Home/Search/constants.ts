export enum SortTypes {
  Date = "Date",
  Title = "Title",
  Popularity = "Popularity",
}

export const SortLabels: Record<SortTypes, string> = {
  [SortTypes.Date]: "По дате",
  [SortTypes.Title]: "По названию",
  [SortTypes.Popularity]: "По популярности",
};
