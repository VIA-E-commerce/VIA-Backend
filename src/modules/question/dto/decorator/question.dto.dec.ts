import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { SwaggerValidation } from '@/common';
import { QuestionDoc } from '@/docs';
import { QuestionValidation } from '@/models';

export const QuestionRequestDec = {
  questionId() {
    return applyDecorators(QuestionDoc.questionId(), SwaggerValidation.id());
  },

  title() {
    return applyDecorators(QuestionDoc.title(), QuestionValidation.title());
  },

  content() {
    return applyDecorators(QuestionDoc.content(), QuestionValidation.content());
  },

  isPrivate() {
    return applyDecorators(
      QuestionDoc.isPrivate(),
      QuestionValidation.isPrivate(),
    );
  },
};

export const QuestionResponseDec = {
  questionId() {
    return applyDecorators(QuestionDoc.questionId());
  },

  title() {
    return applyDecorators(QuestionDoc.title());
  },

  content() {
    return applyDecorators(QuestionDoc.content());
  },

  isPrivate() {
    return applyDecorators(QuestionDoc.isPrivate());
  },

  username() {
    return applyDecorators(
      ApiProperty({
        description: '작성자 이름',
        example: '홍**',
      }),
    );
  },
};
