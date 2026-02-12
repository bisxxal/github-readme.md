 
export const ignorePatterns = [
  /node_modules/,
  /dist/,
  /build/,
  /tests?/,
  /\.github/,
  /\.vscode/,
  /coverage/,
  /\.next/,
  /\.turbo/,
  /\.git/,
  /yarn\.lock/,
  /package-lock\.json/,
  /pnpm-lock\.yaml/,
  /README\.md$/,
];
export const allowedExtensions = [
  // JS / TS
  /\.js$/, /\.jsx$/, /\.ts$/, /\.tsx$/, /\.mjs$/, /\.cjs$/,

  // Python
  /\.py$/,

  // JVM
  /\.java$/, /\.kt$/, /\.kts$/, /\.scala$/, /\.groovy$/,

  // C / C++
  /\.c$/, /\.cpp$/, /\.cc$/, /\.h$/, /\.hpp$/,

  // C#
  /\.cs$/,

  // Go
  /\.go$/,

  // Rust
  /\.rs$/,

  // PHP
  /\.php$/,

  // Ruby
  /\.rb$/,

  // Swift
  /\.swift$/,

  // Dart
  /\.dart$/,

  // Shell
  /\.sh$/, /\.bash$/, /\.zsh$/, /\.ps1$/,

  // Web
  /\.html$/, /\.css$/, /\.scss$/, /\.sass$/, /\.less$/,

  // Docs
  /\.md$/, /\.mdx$/,

  // Config
  /\.json$/, /\.yaml$/, /\.yml$/, /\.toml$/,
]; 
export function repoToCollectionName(url: string) {
  const cleaned = url
    .replace("https://github.com/", "")
    .replaceAll("/", "_")
    .replaceAll("-", "_")
    .toLowerCase();
  return cleaned.substring(0, 50);  
}

export function shouldIncludeFile(path: string) {
  if (!path) return false;

  const ignored = ignorePatterns.some((pattern) => pattern.test(path));
  if (ignored) return false;

  const allowed = allowedExtensions.some((ext) => ext.test(path));
  return allowed;
}
  