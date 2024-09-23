import { DateTime } from 'luxon';

type Entity = Record<PropertyKey, unknown>;

export default function changeDate<Type extends Entity>(obj: Type, prop: string, newDate: Date) {
  return Object.assign({...obj}, { [prop]: DateTime.fromJSDate(newDate) });
}
