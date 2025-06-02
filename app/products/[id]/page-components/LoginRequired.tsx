import KakaoLoginButton from '@/components/ui/button/KakaoLoginButton';

// 로그인 필요 컴포넌트
const LoginRequired = () => {
  return (
    <div className='relative mt-12 pt-8 border-t border-border'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-semibold text-textLight'>리뷰</h2>
      </div>

      {/* 블러 처리된 리뷰 백그라운드 */}
      <div className='relative'>
        {/* 더미 리뷰 아이템 (블러 처리) */}
        <div className='space-y-0 blur-sm pointer-events-none select-none'>
          {[1, 2, 3].map((index) => (
            <div key={index} className='border-b border-border py-6 first:pt-0'>
              <div className='flex items-start gap-4'>
                <div className='flex-shrink-0 w-10 h-10 bg-bgLight rounded-full'></div>
                <div className='flex-grow'>
                  <div className='flex items-center justify-between mb-1'>
                    <div className='h-4 bg-bgLight rounded w-24'></div>
                  </div>
                  <div className='mb-3 flex'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        className='w-5 h-5 bg-bgLight rounded-full mr-1'
                      ></div>
                    ))}
                  </div>
                  <div className='space-y-2'>
                    <div className='h-3 bg-bgLight rounded w-full'></div>
                    <div className='h-3 bg-bgLight rounded w-2/3'></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 로그인 유도 오버레이 */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='bg-bgDarker bg-opacity-90 p-6 rounded-lg border border-border shadow-lg max-w-md w-full mx-4 text-center'>
            <h3 className='text-xl font-semibold text-textLight mb-2'>
              로그인이 필요합니다
            </h3>
            <p className='text-textDim mb-6'>
              리뷰를 확인하려면 로그인이 필요합니다.
            </p>

            <KakaoLoginButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRequired;
