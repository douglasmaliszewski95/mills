import type { Rewrite } from "next/dist/lib/load-custom-routes";

export type ExtendedRewrite = Rewrite & {
  productSearchCode?: string;
};

declare module "./rewrites" {
  export const rewrites: ExtendedRewrite[];
  export function buildRewrites(): Promise<Rewrite[]>;
}
