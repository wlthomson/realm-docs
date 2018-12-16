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
    cars: { type: 'list', objectType: 'Car' },
    vans: 'Car[]'
  }
};

Realm.open({ schema: [CarSchema, PersonSchema] })
  .then(realm => {
    realm.write(() => {
      const charlie = realm.create('Person', { name: 'Charlie' });
      console.log(charlie);

      let carList = charlie.cars;
      let vanList = charlie.vans;

      let hondaAccord = { make: 'Honda', model: 'Accord', miles: 100 };
      let toyotaPrius = { make: 'Toyota', model: 'Prius', miles: 200 };
      let fordTransit = { make: 'Ford', model: 'Transit', miles: 300 };

      carList.push(hondaAccord);
      console.log(charlie);

      carList.push(toyotaPrius);
      console.log(charlie);

      vanList.push(fordTransit);
      console.log(charlie);

      // Does not work.
      fordTransit.miles = 1200;
      console.log(charlie);

      // Works.
      vanList[0].miles = 1200;
      console.log(charlie);
    });
  })
  .catch(err => {
    console.log(err);
  });
