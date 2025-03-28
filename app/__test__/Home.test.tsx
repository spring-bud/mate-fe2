// app/__tests__/Home.test.tsx
import { render, screen } from '@testing-library/react';
import Home from '../(home)/page';

describe('Home page', () => {
  it('renders Next.js logo', () => {
    render(<Home />);

    // 실제로 존재하는 요소를 확인합니다
    const logo = screen.getByAltText('Next.js logo');
    expect(logo).toBeInTheDocument();
  });
});
