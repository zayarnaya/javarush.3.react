import type { Train } from 'src/api/mocks';

export const getBasePrice = (train: Train, classCode: string): number => {
  const { classes } = train;
  const trainClass = classes.find((item) => item.classCode.toLowerCase() === classCode.toLowerCase());
  if (!trainClass) return 0;
  return trainClass.price;
};

// export const
