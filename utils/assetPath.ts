// Base path for raw HTML asset references (video, audio, etc.)
// next/image handles basePath automatically — only use this for <video src>, etc.
export const BASE_PATH =
  process.env.NODE_ENV === 'production' ? '/healy-gymnastics' : '';
