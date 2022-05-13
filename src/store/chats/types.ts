export interface ChatCompanyUserInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  position: string;
}

export interface ChatCompanyUser {
  role: string;
  id: number;
  userInfo: ChatCompanyUserInfo;
}

export interface Message {
  id: number;
  roomId: number;
  isRead: boolean;
  content: string;
  createdAt: string;
  isMine: boolean;
  companyUser: ChatCompanyUser;
}
