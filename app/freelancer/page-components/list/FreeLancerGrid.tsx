'use client';

import { User } from '@/schemas/api/user.schema';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface FreeLancerGridProps {
  freeLancers: User[];
}

const FreeLancerGrid: React.FC<FreeLancerGridProps> = ({ freeLancers }) => {
  const router = useRouter();
  return (
    <div className='space-y-4'>
      {freeLancers.map((freeLancer) => (
        <div
          key={freeLancer.user_id}
          className='bg-bgLight border border-border rounded-lg p-4 sm:p-6 hover:border-active transition-colors cursor-pointer'
          onClick={() => router.push(`/user/${freeLancer.user_id}`)}
        >
          <div className='flex items-center gap-4 lg:gap-8'>
            {/* 좌측 프로필 이미지 (가운데 고정) */}
            <div className='flex-shrink-0'>
              <div className='w-12 h-12 sm:w-16 sm:h-16 bg-selection rounded-full flex items-center justify-center'>
                {freeLancer.profile_url ? (
                  <Image
                    width={64}
                    height={64}
                    src={freeLancer.profile_url}
                    alt={freeLancer.nickname}
                    className='w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover'
                  />
                ) : (
                  <span className='text-textLight font-medium text-sm sm:text-lg'>
                    {freeLancer.nickname?.[0]?.toUpperCase() || 'U'}
                  </span>
                )}
              </div>
            </div>

            {/* 우측 정보 섹션 */}
            <div className='flex-1 min-w-0'>
              {/* 닉네임 크게 */}
              <h3 className='text-lg sm:text-xl lg:text-2xl font-bold text-textLight mb-1 sm:mb-2'>
                {freeLancer.nickname}
              </h3>

              {/* 경력과 직업 같은 라인 */}
              <div className='flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap'>
                {freeLancer.job_year && (
                  <span className='text-textLight text-xs sm:text-sm font-medium'>
                    경력 {freeLancer.job_year}년
                  </span>
                )}
                {freeLancer.job_type && (
                  <span className='text-active text-xs sm:text-sm font-medium px-2 py-1 bg-active/10 rounded'>
                    {freeLancer.job_type}
                  </span>
                )}
              </div>

              {/* 이메일과 연락처 - 반응형으로 한줄씩 또는 나란히 */}
              <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-2 sm:mb-3'>
                {freeLancer.email && (
                  <div className='flex items-center gap-2 min-w-0'>
                    <span className='text-textDim text-xs sm:text-sm flex-shrink-0'>
                      📧
                    </span>
                    <span className='text-textLight text-xs sm:text-sm truncate'>
                      {freeLancer.email}
                    </span>
                  </div>
                )}
                {freeLancer.contact && (
                  <div className='flex items-center gap-2 min-w-0'>
                    <span className='text-textDim text-xs sm:text-sm flex-shrink-0'>
                      📞
                    </span>
                    <span className='text-textLight text-xs sm:text-sm truncate'>
                      {freeLancer.contact}
                    </span>
                  </div>
                )}
              </div>

              {/* 소개 */}
              {freeLancer.intro && (
                <p className='text-textDim text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3'>
                  {freeLancer.intro}
                </p>
              )}

              {/* 기술 스택 한줄에 모두 */}
              {freeLancer.user_stacks && freeLancer.user_stacks.length > 0 && (
                <div className='flex flex-wrap gap-1'>
                  {freeLancer.user_stacks.map((stack) => (
                    <span
                      key={stack.stack_id}
                      className='px-2 py-1 bg-selection text-textLight rounded text-xs'
                    >
                      {stack.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FreeLancerGrid;
