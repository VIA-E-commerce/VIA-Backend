interface ImpRestApiResponse {
  access_token: string;
  now: number;
  expired_at: number;
}

export class ImpRestApiDto {
  code?: number;
  message?: string | null;
  response?: ImpRestApiResponse;
}
