const BASE_PATH =
  process.env.NODE_ENV === 'production' ? '/healy-gymnastics' : '';

/** Prefix any local asset path with the basePath in production. */
export function assetPath(path: string): string {
  return `${BASE_PATH}${path}`;
}
