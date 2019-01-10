const execSync = require('child_process').execSync;

const daysInMonth = (bsYear, month) => exec('daysInMonth', bsYear, month);
const toGreg = (year, month, day) => exec('toGreg', year, month, day);

function exec(method, ...args) {
  args = args.map(arg => arg.toString()).join(' ');

  const cmd = `java -classpath .:bikram-sambat-generated.jar JavaImplementationWrapper ${method} ${args}`;

  return execSync(cmd, { encoding:'utf-8' });
}

module.exports = { daysInMonth, toGreg };
