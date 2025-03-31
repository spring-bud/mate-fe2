"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Freelancer {
  id: number;
  name: string;
  role: string;
  skills: string[];
  rating: number;
  completedProjects: number;
  image: string;
}

interface MobileFreelancerCardProps {
  freelancer: Freelancer;
  index: number;
}

const MobileFreelancerCard: React.FC<MobileFreelancerCardProps> = ({
  freelancer,
  index,
}) => {
  const cardVariants = {
    offscreen: {
      y: 30,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      key={freelancer.id}
      variants={cardVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * 0.1 }}
      className="bg-bgLight p-3 rounded-lg border border-border hover:border-active transition-all duration-300"
    >
      <div className="flex items-center gap-3">
        <Image
          src={freelancer.image}
          alt={freelancer.name}
          className="w-10 h-10 rounded-full object-cover border-2 border-selection"
        />
        <div>
          <div className="flex flex-col">
            <h3 className="typo-head4 line-clamp-1">{freelancer.name}</h3>
            <p className="typo-caption1 text-active line-clamp-1">
              {freelancer.role}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-warning"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
            </svg>
            <span className="typo-caption2 ml-1">{freelancer.rating}</span>
          </div>
          <span className="mx-1 text-border text-xs">•</span>
          <span className="typo-caption2 text-textDim">
            {freelancer.completedProjects}개 완료
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mt-2 mb-3">
        {freelancer.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="typo-caption2 px-1.5 py-0.5 bg-bgDark rounded text-xs whitespace-nowrap"
          >
            {skill}
          </span>
        ))}
        {freelancer.skills.length > 3 && (
          <span className="typo-caption2 px-1.5 py-0.5 bg-bgDark rounded text-xs">
            +{freelancer.skills.length - 3}
          </span>
        )}
      </div>

      <button className="typo-caption1 w-full px-3 py-1.5 border border-active text-active rounded-md hover:bg-active hover:text-textLight transition-colors">
        프로필 보기
      </button>
    </motion.div>
  );
};

export default MobileFreelancerCard;
