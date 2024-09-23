export default function isText(data: unknown): data is string {
  return typeof data === 'string';
}
