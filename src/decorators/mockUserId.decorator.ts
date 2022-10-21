import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const MockedUserId = createParamDecorator(() => {
  return '0f0834ce-83b1-41a2-b1e1-69f8d80a1c60';
});
