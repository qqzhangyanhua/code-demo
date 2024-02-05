import React from "react";

export type Style = React.CSSProperties;
export interface ICanvas {
  title: string;
  style: Style;
  cmps: Array<ICmpWithKey>;
}

export interface ICmp {
  style: Style;
  type: number;
  value: string;
  onClick?: string;
}
export interface ICmpWithKey extends ICmp {
  key?: string;
}
export interface IEditStoreState {
  canvas: ICanvas;
}
export type AddCmpFc = (cmp: ICmp) => void;

export interface IEditStoreAction {
  addCmp: AddCmpFc;
}

export interface IEditStore extends IEditStoreState, IEditStoreAction {}
