import { LocalStrategy } from './local.strategy';
import { KakaoStrategy } from './kakao.strategy';
import { NaverStrategy } from './naver.strategy';
import { JwtStrategy } from './jwt.strategy';

export const strategies = [
  LocalStrategy,
  KakaoStrategy,
  NaverStrategy,
  JwtStrategy,
];
