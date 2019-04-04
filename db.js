module.exports = (function Database() {
  const dbData = {

  };

  let sqlQuery = "";

  return function _db(options = { devMode: false }) {
    const { devMode } = options;

    function _getQuery() {
      if (!devMode) return;
      return sqlQuery;
    }

    function raw(query) {
      sqlQuery = query;
      return this;
    }

    function from(tableName) {
      sqlQuery += `FROM ${tableName.toUpperCase()}`;
      return this;
    }

    function where(key, value) {
      if (!key || !value) {
        sqlQuery += ` WHERE`;
      } else {
        sqlQuery += ` WHERE ${key.toUpperCase()} EQUALS ${value}`;
      }
      return this;
    }

    function insert(object) {
      sqlQuery += ` INSERT ${JSON.stringify(object)}`;
      return this;
    }

    function run() {
      const [from, tableName, action, ...stuff] = sqlQuery.split(" ");
      sqlQuery = "";

      if (action === 'INSERT') {
        if (!dbData[tableName]) {
          dbData[tableName] = [];
        }

        dbData[tableName].push(JSON.parse(stuff[0]));
        return stuff[0];
      } else if (action === 'WHERE') {
        const [key, equals, value] = stuff;

        if (!key || !value) {
          return dbData[tableName];
        }

        if (!dbData[tableName]) {
          return [];
        }

        return dbData[tableName].filter(row => row[key.toLowerCase()] === value);
      }
    }

    return {
      _getQuery,
      from,
      raw,
      where,
      insert,
      run
    }
   }
})();