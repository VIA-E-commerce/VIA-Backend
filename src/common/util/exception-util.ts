import { NotFoundException } from '@nestjs/common';

import { ErrorObject } from '@/docs';

export function checkExistence(isExist: boolean, description: ErrorObject) {
  if (!isExist) {
    throw new NotFoundException(description);
  }
}
