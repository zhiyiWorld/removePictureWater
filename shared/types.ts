export type VerifyPasswordRequest = {
  password: string;
};

export type VerifyPasswordResponse = {
  success: boolean;
  message: string;
};

export type ParseRequest = {
  link: string;
};

export type ParseResult = {
  title: string;
  cover: string;
  url: string;
  type: string;
  originalLink: string;
};

export type ParseResponse = {
  success: boolean;
  message: string;
  data?: ParseResult;
};

export type ExternalApiSuccessResponse = {
  code: string;
  msg: string;
  content?: {
    cover?: string;
    originText?: string;
    shortUrl?: string;
    success?: boolean;
    title?: string;
    type?: string;
    url?: string;
  };
};
