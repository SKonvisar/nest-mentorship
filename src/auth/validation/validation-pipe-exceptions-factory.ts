import {
  BadRequestException,
  ValidationPipe as NestValidationPipe,
} from '@nestjs/common';

const exceptionFactory = (errors) => {
  const formattedErrors = errors.reduce((acc, error) => {
    return {
      ...acc,
      [error.property]: Object.values(error.constraints),
    };
  }, {});

  throw new BadRequestException(formattedErrors);
};

export const ValidationPipe = new NestValidationPipe({
  exceptionFactory,
});
