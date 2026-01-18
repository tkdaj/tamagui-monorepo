import type { Database, Json } from './types/database.gen';

export type { Database, Json };

export type TableRows<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T] extends { Row: infer R } ? R : never;
