const fs = require('fs').promises;
const { join } = require('path');

const file = join(__dirname, '../talker.json');

const read = async () => {
  try {
    const content = await fs.readFile(file, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

const write = async (content) => {
  try {
    await fs.writeFile(file, JSON.stringify(content));
  } catch (error) {
    console.error(error);
    return error.message;
  }
};

module.exports = {
  read,
  write,
};