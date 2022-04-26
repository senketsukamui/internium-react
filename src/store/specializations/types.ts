export interface Ability {
  id: number;
  title: string;
  engTranslationTitle: string;
  position: number;
  specializationId: number;
}

export interface Specialization {
  id: number;
  title: string;
  engTranslationTitle: string;
  position: number;
  abilities: Ability[];
}
