import type { FormGroupProps } from "@tkcrm/ui";

import { model, Model, prop, tProp, types } from "mobx-keystone";

export const userForm: FormGroupProps[] = [
  {
    title: "User info",
    fields: [
      {
        type: "text",
        name: ["firstName"],
        label: "First name",
        required: true,
        colSize: 6,
      },
      {
        type: "text",
        name: ["lastName"],
        label: "Last name",
        colSize: 6,
      },
      {
        type: "number",
        name: ["age"],
        label: "Age",
        colSize: 4,
      },
      {
        type: "date",
        name: ["birthday"],
        label: "Birthday",
        required: true,
        colSize: 4,
      },
      {
        type: "switch",
        name: ["isActive"],
        label: "Is Active",
        colSize: 4,
      },
    ],
  },
  {
    title: "Notification settings",
    fields: [
      {
        type: "switch",
        name: ["notifyEmail"],
        label: "Email",
        colSize: 4,
      },
      {
        type: "switch",
        name: ["notifySMS"],
        label: "SMS",
        colSize: 4,
      },
      {
        type: "switch",
        name: ["notifyPush"],
        label: "Push",
        colSize: 4,
      },
    ],
  },
];

export const organizationForm: FormGroupProps[] = [
  {
    title: "Organization info",
    fields: [
      {
        type: "text",
        name: ["shortName"],
        label: "Short name",
        required: true,
        colSize: 6,
      },
      {
        type: "text",
        name: ["fullName"],
        label: "Full name",
        colSize: 6,
      },
      {
        type: "text",
        name: ["address"],
        label: "Address",
        colSize: 10,
      },
      {
        type: "switch",
        name: ["isActive"],
        label: "Is active",
        colSize: 2,
      },
    ],
  },
];

@model("frontend/user")
export class UserModel extends Model({
  firstName: tProp(types.string, "").withSetter(),
  lastName: tProp(types.string, "").withSetter(),
  age: tProp(types.number, 0).withSetter(),
  birthday: tProp(types.maybe(types.dateString)).withSetter(),
  isActive: tProp(types.boolean, false).withSetter(),
  notifyEmail: tProp(types.boolean, false).withSetter(),
  notifySMS: tProp(types.boolean, false).withSetter(),
  notifyPush: tProp(types.boolean, false).withSetter(),
}) {}

@model("frontend/users")
export class UsersModel extends Model({
  getResponse: prop<UserModel>().withSetter(),
}) {}
