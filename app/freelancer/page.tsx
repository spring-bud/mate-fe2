import { Metadata } from 'next';
import FreeLancerListClient from './page-components/FreeLancerListClient';

export const metadata: Metadata = {
  title: '프리랜서 찾기 | MATE',
  description: '다양한 분야의 전문 프리랜서들을 찾아보세요.',
};

export default function FreeLancerPage() {
  return (
    <div>
      <FreeLancerListClient />
    </div>
  );
}
