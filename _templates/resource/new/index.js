// my-generator/my-action/index.js
module.exports = {
  prompt: ({ prompter, args }) => {
    let fields = [];
    let path = args?.name || 'index';

    return prompter
      .prompt({
        type: 'input',
        name: 'table',
        message: 'what is the table name?',
      })
      .then(async (table) => {
        console.log('table', table);
        while (true) {
          const { add, ...rest } = await prompter.prompt([
            {
              type: 'input',
              name: 'name',
              message: 'feiled name?',
            },
            {
              type: 'select',
              name: 'type',
              message: 'feiled type?',
              choices: [
                'string', //<= choice object
                'number', //<= choice object
                'boolean', //<= choice object
              ],
            },
            {
              type: 'confirm',
              name: 'add',
              message: 'do you want another field?',
            },
          ]);
          fields.push(rest);
          if (!add)
            return {
              path,
              name: table.table,
              fields,
            };
        }
      });
  },
};
