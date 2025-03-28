'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// 샘플 인기 게시글 데이터
const popularPosts = [
  {
    id: 1,
    title: '웹 애플리케이션 리디자인 및 프론트엔드 개발',
    category: '웹 개발',
    price: '300만원',
    deadline: '30일',
    desc: '기존 웹사이트의 UX/UI를 개선하고 React.js를 활용한 프론트엔드 리팩토링이 필요합니다.',
    authorName: '테크스타트업',
    authorImage: '/api/placeholder/40/40',
  },
  {
    id: 2,
    title: '브랜드 아이덴티티 디자인 및 로고 개발',
    category: '그래픽 디자인',
    price: '150만원',
    deadline: '15일',
    desc: '신규 스타트업을 위한 브랜드 아이덴티티와 로고 디자인이 필요합니다. 현대적이고 미니멀한 스타일을 선호합니다.',
    authorName: '비즈니스솔루션',
    authorImage: '/api/placeholder/40/40',
  },
  {
    id: 3,
    title: '모바일 앱 MVP 개발 (iOS/Android)',
    category: '앱 개발',
    price: '500만원',
    deadline: '45일',
    desc: '헬스케어 관련 모바일 앱의 MVP 버전 개발이 필요합니다. Flutter 또는 React Native 경험자 우대.',
    authorName: '헬스테크',
    authorImage: '/api/placeholder/40/40',
  },
  {
    id: 4,
    title: 'SEO 최적화 및 퍼포먼스 개선',
    category: '웹 개발',
    price: '200만원',
    deadline: '20일',
    desc: '기존 웹사이트의 검색 엔진 최적화와 로딩 속도 개선이 필요합니다. 핵심 웹 지표 개선에 집중해주세요.',
    authorName: '디지털마케팅',
    authorImage: '/api/placeholder/40/40',
  },
  {
    id: 5,
    title: '프로덕트 랜딩 페이지 디자인',
    category: '웹 디자인',
    price: '100만원',
    deadline: '10일',
    desc: '신규 출시 제품을 위한 랜딩 페이지 디자인이 필요합니다. 컨버전에 최적화된 디자인 경험자 우대.',
    authorName: '이커머스솔루션',
    authorImage: '/api/placeholder/40/40',
  },
];

export default function PopularPostsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  // 모바일에서 터치 스와이프 처리
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let startX: number;
    let isDragging = false;

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      isDragging = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diff = startX - currentX;

      // 오른쪽으로 스와이프
      if (diff < -50 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
        isDragging = false;
      }
      // 왼쪽으로 스와이프
      else if (diff > 50 && activeIndex < popularPosts.length - 1) {
        setActiveIndex(activeIndex + 1);
        isDragging = false;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    carousel.addEventListener('touchstart', handleTouchStart);
    carousel.addEventListener('touchmove', handleTouchMove);
    carousel.addEventListener('touchend', handleTouchEnd);

    return () => {
      carousel.removeEventListener('touchstart', handleTouchStart);
      carousel.removeEventListener('touchmove', handleTouchMove);
      carousel.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeIndex]);

  const nextSlide = () => {
    if (activeIndex < popularPosts.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const prevSlide = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <div
      ref={containerRef}
      className='flex flex-col items-center justify-center min-h-screen px-6 md:px-12 lg:px-24 bg-bgDarker'
    >
      <div className='max-w-6xl w-full mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className='text-center mb-8 md:mb-16'
        >
          <h2 className='typo-head2 mb-2 md:mb-4'>인기 프로젝트</h2>
          <p className='typo-body1 max-w-2xl mx-auto text-textDim sm:px-4'>
            MATE에서 가장 뜨거운 관심을 받고 있는 프로젝트들입니다. 당신의
            역량을 발휘할 최적의 기회를 찾아보세요.
          </p>
        </motion.div>

        <div className='relative'>
          {/* 이전/다음 버튼 (태블릿 이상) */}
          <div className='hidden md:block'>
            <button
              onClick={prevSlide}
              disabled={activeIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 md:-translate-x-12 rounded-full w-10 h-10 flex items-center justify-center bg-bgLight border border-border z-10 ${
                activeIndex === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:border-active'
              }`}
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M15 18l-6-6 6-6' />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              disabled={activeIndex === popularPosts.length - 1}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 md:translate-x-12 rounded-full w-10 h-10 flex items-center justify-center bg-bgLight border border-border z-10 ${
                activeIndex === popularPosts.length - 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:border-active'
              }`}
            >
              <svg
                width='20'
                height='20'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
              >
                <path d='M9 18l6-6-6-6' />
              </svg>
            </button>
          </div>

          {/* 카드 캐러셀 */}
          <div ref={carouselRef} className='overflow-hidden'>
            <motion.div
              className='flex transition-transform duration-500 ease-out'
              animate={{ x: `calc(-${activeIndex * 100}%)` }}
            >
              {popularPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className='min-w-full'
                >
                  <div className='bg-bgLight p-4 sm:p-6 md:p-8 rounded-lg border border-border hover:border-active transition-all duration-300'>
                    <div className='flex flex-col sm:flex-row justify-between items-start mb-4 gap-2 sm:gap-0'>
                      <div>
                        <span className='typo-caption1 px-3 py-1 bg-bgDark rounded-full text-active'>
                          {post.category}
                        </span>
                        <h3 className='typo-head3 mt-4'>{post.title}</h3>
                      </div>
                      <div className='text-left sm:text-right w-full sm:w-auto mt-2 sm:mt-0'>
                        <p className='typo-head4 text-active'>{post.price}</p>
                        <p className='typo-caption1 text-textDim'>
                          기한: {post.deadline}
                        </p>
                      </div>
                    </div>
                    <p className='typo-body1 mb-6 text-textDim'>{post.desc}</p>
                    <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0'>
                      <div className='flex items-center gap-3'>
                        <img
                          src={post.authorImage}
                          alt={post.authorName}
                          className='w-8 h-8 rounded-full'
                        />
                        <span className='typo-caption1'>{post.authorName}</span>
                      </div>
                      <button className='typo-button2 w-full sm:w-auto px-4 py-2 border border-active text-active rounded-md hover:bg-active hover:text-textLight transition-colors'>
                        자세히 보기
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* 모바일 인디케이터 */}
          <div className='flex justify-center gap-2 mt-8 md:hidden'>
            {popularPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === activeIndex ? 'bg-active' : 'bg-border'
                }`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className='text-center mt-8 md:mt-12'
        >
          <button className='typo-button1 px-8 py-3 border border-border hover:bg-hover transition-colors rounded-md'>
            모든 프로젝트 보기
          </button>
        </motion.div>
      </div>
    </div>
  );
}
