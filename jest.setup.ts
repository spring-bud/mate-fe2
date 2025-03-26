// jest.setup.ts
import '@testing-library/jest-dom';

// 타입 에러를 해결하기 위한 변경
import { jest } from '@jest/globals';

jest.spyOn(console, 'error').mockImplementation((message) => {
  if (message.includes('fetchPriority')) {
    return;
  }
});
