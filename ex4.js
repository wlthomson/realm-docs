const Realm = require('realm');

const CarSchema = {
  name: 'Car',
  properties: {
    make: 'string',
    model: 'string',
    miles: { type: 'int', default: 0 }
  }
};

const PersonSchema = {
  name: 'Person',
  properties: {
    name: 'string',
    car: { type: 'Car', optional: true },
    van: 'Car?'
  }
};

Realm.open({ schema: [CarSchema, PersonSchema] })
  .then(realm => {
    realm.write(() => {
      const charlie = realm.create('Person', { name: 'Charlie' });
      console.log(charlie);

      charlie.car = { make: 'Honda', model: 'Civic' };
      console.log(charlie);

      charlie.car.miles = 1100;
      console.log(charlie);

      charlie.van = { make: 'Ford', model: 'Transit' };
      console.log(charlie);

      charlie.car = charlie.van;
      console.log(charlie);

      charlie.van.miles = 1200;
      console.log(charlie);
    });
  })
  .catch(err => {
    console.log(err);
  });
