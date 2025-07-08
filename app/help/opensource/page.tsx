import React from 'react';
import Link from 'next/link';

export default function OpensourcePage() {
  const opensourceProjects = [
    {
      name: 'mate-frontend',
      description: 'MATE 서비스의 메인 프론트엔드 애플리케이션',
      language: 'TypeScript',

      license: 'MIT',
      lastUpdated: '2024-03-28',
      url: 'https://github.com/spring-bud/mate-fe2',
    },
    {
      name: 'mate-backend',
      description: '프로젝트 매칭 및 사용자 관리를 위한 백엔드 서버',
      language: 'Kotlin',

      license: 'Apache-2.0',
      lastUpdated: '2024-03-25',
      url: 'https://github.com/spring-bud/mate-be',
    },
  ];

  return (
    <div className='bg-bgDark text-textPrimary min-h-screen py-12'>
      <div className='container mx-auto px-4 max-w-4xl space-y-8'>
        <header className='text-center mb-10'>
          <h1 className='typo-head1 text-textLight mb-4'>
            MATE 오픈소스 프로젝트
          </h1>
          <p className='typo-body2 text-textDim'>
            우리의 기술과 철학을 공유합니다. 함께 성장하고 발전하는 오픈소스
            커뮤니티에 초대합니다.
          </p>
        </header>

        <section className='bg-bgLight rounded-lg p-6 shadow-md'>
          <h2 className='typo-head2 text-textLight mb-6 border-b border-border pb-3'>
            오픈소스 철학
          </h2>
          <div className='typo-body2 text-textPrimary space-y-4'>
            <p>
              MATE는 개방성, 투명성, 그리고 협업의 가치를 중요하게 생각합니다.
              우리의 주요 프로젝트들을 오픈소스로 공개함으로써 개발자 커뮤니티와
              소통하고 함께 성장하고자 합니다.
            </p>
            <p>
              오픈소스를 통해 우리는 기술적 혁신을 촉진하고, 투명한 개발 문화를
              만들어갑니다. 여러분의 기여와 피드백을 환영합니다.
            </p>
          </div>
        </section>

        <section className='bg-bgLight rounded-lg p-6 shadow-md'>
          <h2 className='typo-head2 text-textLight mb-6 border-b border-border pb-3'>
            주요 오픈소스 프로젝트
          </h2>
          <div className='space-y-6'>
            {opensourceProjects.map((project) => (
              <div
                key={project.name}
                className='border border-border rounded p-4 hover:bg-hover transition-colors'
              >
                <div className='flex justify-between items-center mb-3'>
                  <h3 className='typo-head3 text-textLight'>{project.name}</h3>
                  <span className='typo-caption2 bg-bgDark text-textPrimary px-2 py-1 rounded'>
                    {project.language}
                  </span>
                </div>
                <p className='typo-body2 text-textPrimary mb-3'>
                  {project.description}
                </p>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center space-x-3'>
                    <span className='typo-caption2 flex items-center'>⭐</span>
                    <span className='typo-caption2 text-textDim'>
                      License: {project.license}
                    </span>
                  </div>
                  <Link
                    href={project.url}
                    target='_blank'
                    className='typo-button2 bg-active text-white px-3 py-1 rounded hover:bg-hover transition-colors'
                  >
                    GitHub 보기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='bg-bgLight rounded-lg p-6 shadow-md'>
          <h2 className='typo-head2 text-textLight mb-6 border-b border-border pb-3'>
            기여 방법
          </h2>
          <div className='typo-body2 text-textPrimary space-y-4'>
            <div>
              <h3 className='typo-head3 mb-2 text-textLight'>1. 이슈 제보</h3>
              <p>
                버그를 발견하거나 개선 사항이 있다면 GitHub Issues에
                등록해주세요. 여러분의 피드백은 프로젝트 발전에 큰 도움이
                됩니다.
              </p>
            </div>
            <div>
              <h3 className='typo-head3 mb-2 text-textLight'>2. 풀 리퀘스트</h3>
              <p>
                코드 기여를 원하시는 경우 풀 리퀘스트를 보내주세요. 코드 리뷰 후
                머지될 수 있습니다.
              </p>
            </div>
            <div>
              <h3 className='typo-head3 mb-2 text-textLight'>3. 문서화</h3>
              <p>코드 문서화나 README 개선 등 문서 관련 기여도 중요합니다.</p>
            </div>
          </div>
        </section>

        <div className='text-center mt-8'>
          <Link
            href='https://github.com/mate-dev'
            target='_blank'
            className='typo-button1 bg-info text-white px-6 py-3 rounded-lg hover:bg-hover transition-colors inline-block'
          >
            MATE 깃허브 바로가기
          </Link>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'MATE - 오픈소스 프로젝트',
  description:
    'MATE의 오픈소스 프로젝트를 소개합니다. 기술과 혁신을 함께 나눕니다.',
};
