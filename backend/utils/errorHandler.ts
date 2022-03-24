import chalk from 'chalk';

export const errorHandler = (
  errorTitleOrLocation: string,
  error: any,
  // eslint-disable-next-line no-empty-function
  optionalCallback = () => {}
) => {
  console.log(chalk.bgCyan('='.repeat(45 + errorTitleOrLocation.length)));
  console.log(
    `----------------------${errorTitleOrLocation}-----------------------`
  );

  console.log(chalk.red(error));
  console.log(chalk.bgCyan('='.repeat(45 + errorTitleOrLocation.length)));
  optionalCallback();
};
