'use client';

import { useEffect, useRef, useState } from 'react';
import WelcomeSection from './WelcomeSection';
import HowItWorksSection from './HowItWorksSection';
import PopularFreelancersSection from './PopularFreelancersSection';
import PopularPostsSection from './PopularPostsSection';
import ExploreSection from './ExploreSection';

export default function Home() {
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollLockTimerRef = useRef<NodeJS.Timeout | null>(null);

  // 스크롤 처리 함수
  const navigateToSection = (sectionIndex: number) => {
    // 유효한 섹션 인덱스인지 확인
    if (sectionIndex < 0 || sectionIndex >= sectionsRef.current.length) {
      return;
    }

    // 이미 스크롤 중이면 무시
    if (isScrolling) {
      return;
    }

    // 이전 타이머 제거
    if (scrollLockTimerRef.current) {
      clearTimeout(scrollLockTimerRef.current);
    }

    // 스크롤 상태 설정
    setIsScrolling(true);
    setActiveSection(sectionIndex);

    // 대상 섹션으로 직접 스크롤
    const targetSection = sectionsRef.current[sectionIndex];
    if (targetSection && containerRef.current) {
      containerRef.current.style.transform = `translateY(-${
        sectionIndex * 100
      }vh)`;

      // 애니메이션 완료 후 스크롤 잠금 해제
      scrollLockTimerRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // 트랜지션 시간보다 조금 길게 설정
    }
  };

  // 휠 이벤트 처리
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrolling) return;

      // 스크롤 방향에 따라 다음/이전 섹션으로 이동
      const direction = e.deltaY > 0 ? 1 : -1;
      navigateToSection(activeSection + direction);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeSection, isScrolling]);

  // 키보드 이벤트 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        navigateToSection(activeSection + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        navigateToSection(activeSection - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeSection, isScrolling]);

  // 터치 이벤트 처리
  useEffect(() => {
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isScrolling) return;

      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY - touchEndY;

      // 충분한 스와이프 거리가 있을 때만 처리
      if (Math.abs(diff) > 50) {
        e.preventDefault();
        const direction = diff > 0 ? 1 : -1;
        navigateToSection(activeSection + direction);
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [activeSection, isScrolling]);

  // 화면 크기 변경 대응
  useEffect(() => {
    const handleResize = () => {
      // 화면 크기 변경 시 현재 섹션 위치 재조정
      if (containerRef.current) {
        containerRef.current.style.transform = `translateY(-${
          activeSection * 100
        }vh)`;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  // 섹션 참조 배열 초기화
  const setSectionRef = (index: number) => (el: HTMLDivElement | null) => {
    sectionsRef.current[index] = el;
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (scrollLockTimerRef.current) {
        clearTimeout(scrollLockTimerRef.current);
      }
    };
  }, []);

  return (
    <main className='relative w-full h-screen overflow-hidden'>
      {/* 네비게이션 인디케이터 */}
      <div className='fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-3'>
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            onClick={() => navigateToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === index
                ? 'bg-active w-4 h-4'
                : 'bg-border hover:bg-textDim'
            }`}
            aria-label={`섹션 ${index + 1}로 이동`}
          />
        ))}
      </div>

      {/* 모바일용 페이지 인디케이터 */}
      <div className='fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex md:hidden items-center gap-2'>
        {[0, 1, 2, 3, 4].map((index) => (
          <button
            key={index}
            onClick={() => navigateToSection(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSection === index ? 'bg-active' : 'bg-border'
            }`}
            aria-label={`섹션 ${index + 1}로 이동`}
          />
        ))}
      </div>

      {/* 섹션 컨테이너 - CSS 트랜지션으로 부드러운 전환 구현 */}
      <div
        ref={containerRef}
        className='transform transition-transform duration-1000 ease-in-out'
        style={{ height: '500vh' }} // 5개 섹션을 위한 높이
      >
        <div ref={setSectionRef(0)} className='h-screen w-full'>
          <WelcomeSection />
        </div>

        <div ref={setSectionRef(1)} className='h-screen w-full'>
          <HowItWorksSection />
        </div>

        <div
          ref={setSectionRef(2)}
          className='h-screen w-full overflow-y-auto md:overflow-visible'
        >
          <PopularPostsSection />
        </div>

        <div
          ref={setSectionRef(3)}
          className='h-screen w-full overflow-y-auto md:overflow-visible'
        >
          <PopularFreelancersSection />
        </div>

        <div
          ref={setSectionRef(4)}
          className='h-screen w-full overflow-y-auto md:overflow-visible'
        >
          <ExploreSection />
        </div>
      </div>
    </main>
  );
}
