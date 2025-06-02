// types/address.ts

import { ReactNode } from "react";

export type Address = {
  [x: string]: ReactNode;
  id: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};

