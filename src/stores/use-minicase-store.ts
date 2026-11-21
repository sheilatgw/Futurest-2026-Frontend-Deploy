import { create } from "zustand";
import { DevtoolsOptions, devtools } from "zustand/middleware";

export interface FileAttachment {
  team_leader_instagram_story: File | null;
  team_leader_instagram_repost: File | null;
  team_leader_instagram_follow: File | null;
  team_member_2_instagram_story: File | null;
  team_member_2_instagram_repost: File | null;
  team_member_2_instagram_follow: File | null;
  team_member_3_instagram_story: File | null;
  team_member_3_instagram_repost: File | null;
  team_member_3_instagram_follow: File | null;
  // study_case_abstract_file: File | null;
}

type RegisterFormState = {
  fileAttachment: FileAttachment;
  setFile: (type: keyof FileAttachment, file: File | null) => void;
  resetFiles: () => void;
};

const initialFile: FileAttachment = {
  team_leader_instagram_story: null,
  team_leader_instagram_repost: null,
  team_leader_instagram_follow: null,
  team_member_2_instagram_story: null,
  team_member_2_instagram_repost: null,
  team_member_2_instagram_follow: null,
  team_member_3_instagram_story: null,
  team_member_3_instagram_repost: null,
  team_member_3_instagram_follow: null,
  // study_case_abstract_file: null,
};

const useMinicaseFormStore = create<RegisterFormState>()(
  devtools(
    (set) => ({
      fileAttachment: initialFile,

      setFile: (type, file) => {
        set((state) => {
          const newFileAttachment = {
            ...state.fileAttachment,
            [type]: file,
          };

          return {
            fileAttachment: newFileAttachment,
          };
        });
      },

      resetFiles: () => {
        set({ fileAttachment: initialFile });
      },
    }),
    { name: "minicase-form" } as DevtoolsOptions,
  ),
);

export default useMinicaseFormStore;
