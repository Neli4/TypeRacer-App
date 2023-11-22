const loremIpsum =
  'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum';

export const getWords = (level) => {
  const words = loremIpsum.split(' ').map((word) => word.trim());

  let numberOfWords;
  switch (level) {
    case 'easy':
      numberOfWords = 10;
      break;
    case 'medium':
      numberOfWords = 20;
      break;
    case 'hard':
      numberOfWords = 30;
      break;
    default:
      throw new Error('Invalid level');
  }

  return words.slice(0, numberOfWords);
};
