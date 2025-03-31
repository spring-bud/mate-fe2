"use client";

import { motion } from "framer-motion";

export default function FloatingElements() {
  const desktopElements = [
    // 코드 브래킷 요소
    {
      element: (
        <motion.div
          className="text-active text-6xl font-mono opacity-20"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {"{ }"}
        </motion.div>
      ),
      position: { top: "15%", left: "15%" },
    },
    // 설계 도형
    {
      element: (
        <motion.div
          className="opacity-15"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <svg
            width="70"
            height="70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-selection"
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
            <line x1="15" y1="3" x2="15" y2="21"></line>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="3" y1="15" x2="21" y2="15"></line>
          </svg>
        </motion.div>
      ),
      position: { top: "25%", right: "20%" },
    },
    // 개발 아이콘
    {
      element: (
        <motion.div
          className="opacity-20"
          animate={{
            y: [0, 15, 0],
            x: [0, 10, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <svg
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-active"
          >
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </motion.div>
      ),
      position: { bottom: "25%", left: "18%" },
    },
    // 디자인 요소
    {
      element: (
        <motion.div
          className="opacity-15"
          animate={{
            y: [0, -20, 0],
            x: [0, -10, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          <svg
            width="70"
            height="70"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-warning"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="4"></circle>
            <line x1="21.17" y1="8" x2="12" y2="8"></line>
            <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
            <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
          </svg>
        </motion.div>
      ),
      position: { bottom: "20%", right: "15%" },
    },
    // 추가 도형 1 (삼각형)
    {
      element: (
        <motion.div
          className="w-20 h-20 opacity-10"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-info"
          >
            <polygon
              points="50,10 90,90 10,90"
              fill="rgba(55, 148, 255, 0.1)"
            />
          </svg>
        </motion.div>
      ),
      position: { top: "40%", left: "10%" },
    },
    // 추가 도형 2 (동그라미)
    {
      element: (
        <motion.div
          className="w-16 h-16 rounded-full opacity-5 bg-active"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ),
      position: { top: "50%", right: "10%" },
    },
  ];

  // 모바일용 요소들 (상하로 배치)
  const mobileElements = [
    // 상단 코드 아이콘
    {
      element: (
        <motion.div
          className="text-active text-3xl font-mono opacity-20"
          animate={{
            x: [0, 10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {"< />"}
        </motion.div>
      ),
      position: { top: "5%", right: "15%" },
    },
    // 상단 원형 요소
    {
      element: (
        <motion.div
          className="w-10 h-10 rounded-full opacity-10 bg-warning"
          animate={{
            scale: [1, 1.2, 1],
            x: [-5, 5, -5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
      ),
      position: { top: "8%", left: "10%" },
    },
    // 하단 삼각형
    {
      element: (
        <motion.div
          className="w-12 h-12 opacity-15"
          animate={{
            rotate: [0, 180, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
            delay: 0.2,
          }}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-info"
          >
            <polygon
              points="50,10 90,90 10,90"
              fill="rgba(55, 148, 255, 0.1)"
            />
          </svg>
        </motion.div>
      ),
      position: { bottom: "8%", left: "20%" },
    },
    // 하단 활성 아이콘
    {
      element: (
        <motion.div
          className="opacity-15"
          animate={{
            y: [0, 5, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-active"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 8v4l3 3"></path>
          </svg>
        </motion.div>
      ),
      position: { bottom: "5%", right: "15%" },
    },
  ];

  return (
    <>
      {/* 데스크탑용 요소 - lg 이상에서만 표시 */}
      <div className="hidden lg:block absolute inset-0">
        {desktopElements.map((item, index) => (
          <div
            key={`desktop-${index}`}
            className="absolute"
            style={{
              ...item.position,
              zIndex: 1,
            }}
          >
            {item.element}
          </div>
        ))}
      </div>

      {/* 모바일용 요소 - lg 미만에서만 표시 */}
      <div className="block lg:hidden absolute inset-0">
        {mobileElements.map((item, index) => (
          <div
            key={`mobile-${index}`}
            className="absolute"
            style={{
              ...item.position,
              zIndex: 1,
            }}
          >
            {item.element}
          </div>
        ))}
      </div>
    </>
  );
}
