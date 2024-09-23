export default function arrayWith<Value = any>(array: Array<Value>, index: number, newValue: Value) {
  return Object.assign([...array], {[index]: newValue});
}
