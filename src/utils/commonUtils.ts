export function prepend<Type>(array: Array<Type>, value: Type) {
  array.unshift(value);
  return array;
}
