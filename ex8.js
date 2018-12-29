const Realm = require("realm");

const CarSchema = {
  name: "Car",
  properties: {
    model: { type: "string" },
    drive: { type: "string", defaults: "fwd" },
    miles: { type: "int", default: 0 }
  }
};

Realm.open({ schema: [CarSchema] }).then(realm => {
  realm.write(() => {
    const honda = realm.create("Car", {
      model: "Accord",
      make: "Honda",
      drive: "awd"
    });
    console.log(honda);
  });
});
