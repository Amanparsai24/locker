export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  [key: string]: unknown; // baki fields dynamic
}
