import { merge } from "lodash";
import React from "react";

import type { FormSettings, Route } from "..";
import { UITexts as DefaultUITexts, UITextsType } from "../texts";

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
