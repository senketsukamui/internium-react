import { differenceInYears } from "date-fns";

export const plural = (number: number) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const declension = ["год", "года", "лет"];
  return declension[
    number % 100 > 4 && number % 100 < 20
      ? 2
      : cases[number % 10 < 5 ? number % 10 : 5]
  ];
};

export const calculateAge = (dob: string): string => {
  const age = differenceInYears(new Date(), new Date(dob));
  return `${age} ${plural(Number(age))}`;
};

export * from "./localStorage";
export * from "./tokens";
