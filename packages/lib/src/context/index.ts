import React from "react";
import { merge } from "lodash";

import { UITextsType, UITexts as DefaultUITexts } from "../texts";
import type { FormSettings, Route } from "..";

interface UIContextParameters {
  routes?: Route[];
  UITexts?: UITextsType;
  defaultFormSettings?: FormSettings;
}

export class UIContextClass {
  constructor(params: UIContextParameters) {
    this.routes = params.routes;
    this.UITexts = merge(DefaultUITexts, params.UITexts);
    this.defaultFormSettings = params.defaultFormSettings || {};
  }
  routes?: Route[];
  UITexts: UITextsType;
  defaultFormSettings: FormSettings;
}

export const UIContext = React.createContext<UIContextClass>(
  {} as UIContextClass
);
