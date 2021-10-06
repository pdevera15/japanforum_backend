db.getCollectionInfos({ name: "users" });

db.runCommand({
  collMod: "users",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "password", "email"],
      properties: {
        name: {
          bsonType: "string",
        },
        password: {
          bsonType: "string",
        },
        email: {
          bsonType: "string",
        },
        date_created: {
          bsonType: "date",
        },
        date_updated: {
          bsonType: "date",
        },
        delete_flag: {
          bsonType: "bool",
        },
      },
    },
  },
  validationLevel: "moderate",
});
