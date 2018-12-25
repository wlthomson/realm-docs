const Realm = require('realm');

const PersonSchema = {
  name: 'Person',
  properties: {
    name: 'string',
    dogs: 'Dog[]'
  }
};

const DogSchema = {
  name: 'Dog',
  properties: {
    name: 'string',
    owner: { type: 'linkingObjects', objectType: 'Person', property: 'dogs' }
  }
};

Realm.open({ schema: [PersonSchema, DogSchema] })
  .then(realm => {
    realm.write(() => {
      const charlie = realm.create('Person', { name: 'Charlie' });
      console.log(charlie);

      const fido = realm.create('Dog', { name: 'Fido' });
      charlie.dogs.push(fido);
      console.log(charlie);
      console.log(fido);
    });
  })
  .catch(err => {
    console.log(err);
  });
