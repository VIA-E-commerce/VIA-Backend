export interface JwtPayload {
  id: number;
}

export interface NaverProfileResponse {
  resultcode: string;
  message: string;
  response: {
    id: string;
    nickname: string;
    name: string;
    email: string;
    gender: string;
    age: string;
    birthday: string;
    profile_image: string;
    birthyear: string;
    mobile: string;
    mobile_e164: string;
  };
}

export interface NaverProfile {
  provider: 'naver';
  id: string;
  nickname?: string;
  name?: string;
  email?: string;
  gender?: string;
  age?: string;
  birthday?: string;
  profileImage?: string;
  birthyear?: string;
  mobile?: string;
  mobileE164?: string;
  _raw: any;
  _json: any;
}
