export default function arrayRemove<Value = any>(array: Array<Value>, index: number) {
  return array.filter((item: Value, i: number) => i !== index);
}
