import { create } from 'zustand';
import type { ParseResult } from '../../shared/types';

const ACCESS_STORAGE_KEY = 'remove-water-access';

type AppStore = {
  verified: boolean;
  rawInput: string;
  extractedLink: string;
  parseResult: ParseResult | null;
  parseStatus: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string;
  noticeMessage: string;
  setVerified: (verified: boolean) => void;
  setRawInput: (value: string) => void;
  setExtractedLink: (value: string) => void;
  setParseResult: (result: ParseResult | null) => void;
  setParseStatus: (status: AppStore['parseStatus']) => void;
  setErrorMessage: (message: string) => void;
  setNoticeMessage: (message: string) => void;
  resetResult: () => void;
};

function getInitialVerifiedState() {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.sessionStorage.getItem(ACCESS_STORAGE_KEY) === 'verified';
}

export const useAppStore = create<AppStore>((set) => ({
  verified: getInitialVerifiedState(),
  rawInput: '',
  extractedLink: '',
  parseResult: null,
  parseStatus: 'idle',
  errorMessage: '',
  noticeMessage: '',
  setVerified: (verified) => {
    if (typeof window !== 'undefined') {
      if (verified) {
        window.sessionStorage.setItem(ACCESS_STORAGE_KEY, 'verified');
      } else {
        window.sessionStorage.removeItem(ACCESS_STORAGE_KEY);
      }
    }

    set({ verified });
  },
  setRawInput: (rawInput) => set({ rawInput }),
  setExtractedLink: (extractedLink) => set({ extractedLink }),
  setParseResult: (parseResult) => set({ parseResult }),
  setParseStatus: (parseStatus) => set({ parseStatus }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  setNoticeMessage: (noticeMessage) => set({ noticeMessage }),
  resetResult: () =>
    set({
      parseResult: null,
      parseStatus: 'idle',
      errorMessage: '',
      noticeMessage: '',
      extractedLink: '',
    }),
}));
