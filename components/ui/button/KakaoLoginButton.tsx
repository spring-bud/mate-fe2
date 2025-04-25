import Link from 'next/link';
import { authURL } from '@/service/endpoints/endpoints';

const KakaoLoginButton = () => {
  return (
    <Link
      href={authURL.login}
      className='flex items-center justify-center w-full bg-[#FEE500] hover:bg-[#F5DC00] transition-colors py-3 px-4 rounded-md'
    >
      <svg
        width='22'
        height='21'
        viewBox='0 0 22 21'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='mr-2'
      >
        <path
          d='M11 0C4.92444 0 0 3.90007 0 8.70907C0 11.8536 1.99444 14.6043 5.02 16.1703C4.80778 16.9182 4.22444 19.2572 4.11444 19.8178C3.97556 20.5213 4.40111 20.5187 4.69111 20.3271C4.91889 20.1731 7.6 18.3537 8.80889 17.5238C9.52444 17.6247 10.2578 17.6778 11 17.6778C17.0756 17.6778 22 13.7777 22 8.96873C22 4.15975 17.0756 0 11 0Z'
          fill='#111111'
        />
      </svg>
      <span className='typo-button1 text-black'>카카오로 시작하기</span>
    </Link>
  );
};

export default KakaoLoginButton;
