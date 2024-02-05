import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  ICanvas,
  ICmp,
  IEditStoreAction,
  IEditStoreState,
} from "./editStore.type";
const useEditStore = create(
  immer<IEditStoreState & IEditStoreAction>((set) => {
    return {
      canvas: getDefaultCanvas(),
      addCmp: (cmp: ICmp) => {
        set((state) => {
          state.canvas.cmps.push({ ...cmp, key: Math.random().toString() });
        });
      },
    };
  })
);

function getDefaultCanvas(): ICanvas {
  return {
    title: "New Canvas",
    style: {
      width: 320,
      height: 569,
      backgroundColor: "red",
    },
    cmps: [],
  };
}

export default useEditStore;
