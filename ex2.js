const Realm = require('realm');

const PersonSchema = {
  name: 'Person',
  properties: {
    realName: 'string',
    displayName: 'string?',
    birthday: { type: 'data', optional: true }
  }
};

const realm = new Realm({ schema: [PersonSchema] });

realm.write(() => {
  const charlie = realm.create('Person', {
    realName: 'Charlie',
    birthDay: new Date(1995, 11, 25)
  });

  charlie.birthday = undefined;
  charlie.displayName = 'Charles';
});
