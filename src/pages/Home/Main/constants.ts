export enum ButtonModes {
    Students,
    Companies,
}

export const ROLE_MESSAGES: Record<ButtonModes, string> = {
    [ButtonModes.Students]: 'Хотите найти стажировку в IT?',
    [ButtonModes.Companies]: 'Хотите найти новых сотрудников?'
}
  