const Realm = require('realm');

const PersonSchema = {
  name: 'Person',
  properties: {
    name: 'string',
    testScores: 'double?[]'
  }
};

let realm = new Realm({ schema: [PersonSchema] });

Realm.open(realm)
  .then(realm => {
    realm.write(() => {
      let charlie = realm.create('Person', {
        name: 'Charlie',
        testScores: [100.0]
      });
      console.log(charlie);

      charlie.testScores.push(null);
      console.log(charlie);

      charlie.testScores.push(70.0);
      console.log(charlie);
    });
  })
  .catch(err => console.log(err));
