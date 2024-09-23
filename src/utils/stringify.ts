export default function stringify<Value = any>(value: Value) {
  switch (typeof value) {
    case 'string':
    case 'object':
      return JSON.stringify(value);
  }

  return String(value);
}
