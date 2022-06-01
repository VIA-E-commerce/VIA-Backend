import { LocalStrategy } from './local.strategy';
import { KakaoStrategy } from './kakao.strategy';
import { NaverStrategy } from './naver.strategy';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { GuestStrategy } from './guest.strategy';

export const strategies = [
  LocalStrategy,
  KakaoStrategy,
  NaverStrategy,
  JwtStrategy,
  JwtRefreshStrategy,
  GuestStrategy,
];
