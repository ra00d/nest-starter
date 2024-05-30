// my-generator/my-action/index.js

module.exports = {
  prompt: ({ prompter, args }) => {
    return prompter.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the migration?',
      },
      {
        type: 'input',
        skip: true,
        initial: Date.now(),
        name: 'timestamp',
      },
    ]);
  },
};
