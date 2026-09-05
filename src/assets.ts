/** Bump this when image assets change to bust browser caches. */
export const ASSET_V = "3";

export const imgSrc = (name: string) => `/img/${name}.webp?v=${ASSET_V}`;
