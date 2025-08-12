import { faker } from '@faker-js/faker';

// Map scalar types to faker generators

export function generateFakeValue(fieldType: string) {
  switch(fieldType) {
    case 'String':
      return faker.lorem.words();
    case 'Int':
      return faker.datatype.number();
    case 'Boolean':
      return faker.datatype.boolean();
    case 'DateTime':
      return faker.date.recent();
    default:
      return null;
  }
}
