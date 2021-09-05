const path = require('path');

module.exports = {
  client: {
    service: {
      name: "open-spotify",
      localSchemaFile: path.resolve(__dirname, 'schema.gql.json')
    },
    includes: ['src/**/*.gql', 'src/**/*.ts', 'src/**/*.tsx']
  },
};
