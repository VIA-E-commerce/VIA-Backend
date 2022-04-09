import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export const QuestionDoc = {
  title() {
    return applyDecorators(
      ApiProperty({
        description: '문의 제목',
        example: 'M 사이즈 언제쯤 재입고 될까요?',
      }),
    );
  },

  content() {
    return applyDecorators(
      ApiProperty({
        description: '문의 내용',
        example: '한 달째 기다리고 있는 1인입니다ㅠㅠ 언제 재입고 될까요?',
      }),
    );
  },

  isPrivate() {
    return applyDecorators(
      ApiProperty({
        description: '비밀글 여부',
        example: false,
      }),
    );
  },
};
