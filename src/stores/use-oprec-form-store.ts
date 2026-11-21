import { create } from "zustand";
import { DevtoolsOptions, devtools } from "zustand/middleware";

export interface FileAttachment {
  portfolio_asset: File | null;
  Ktm: File | null;
  CurriculumVitae: File | null;
  Twibbon: File | null;
  RepostFeeds: File | null;
  followed_ig_futurest: File | null;
  followed_ig_sre: File | null;
}

type RegisterFormState = {
  fileAttachment: FileAttachment;
  setFile: (type: keyof FileAttachment, file: File | null) => void;
  resetFiles: () => void;
};

const initialFile: FileAttachment = {
  portfolio_asset: null,
  Ktm: null,
  CurriculumVitae: null,
  Twibbon: null,
  RepostFeeds: null,
  followed_ig_futurest: null,
  followed_ig_sre: null,
};

const useOprecFormStore = create<RegisterFormState>()(
  devtools(
    (set) => ({
      fileAttachment: initialFile,

      setFile: (type, file) => {
        set((state: RegisterFormState) => ({
          fileAttachment: {
            ...state.fileAttachment,
            [type]: file,
          },
        }));
      },

      resetFiles: () => {
        set({ fileAttachment: initialFile });
      },
    }),
    { name: "oprec-staff-form" } as DevtoolsOptions,
  ),
);

export default useOprecFormStore;
