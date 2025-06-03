'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import WithdrawModal from './withdraw/WithdrawModal';

const SettingPage = () => {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  const settingMenus = [
    {
      title: '계정 설정',
      items: [
        {
          name: '프로필 수정',
          href: '/setting/profile',
          icon: '👤',
        },
        {
          name: '보안 설정',
          href: '/setting/security',
          icon: '🔒',
        },
      ],
    },
    {
      title: '알림 설정',
      items: [
        {
          name: '알림 환경설정',
          href: '/setting/notifications',
          icon: '🔔',
        },
      ],
    },
  ];

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <h1 className='text-3xl font-bold mb-8 text-textLight'>설정</h1>

      <div className='grid md:grid-cols-2 gap-6'>
        {settingMenus.map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className='bg-bgLight rounded-lg p-6 shadow-md'
          >
            <h2 className='text-xl font-semibold mb-4 text-textLight'>
              {section.title}
            </h2>
            <div className='space-y-3'>
              {section.items.map((item, itemIndex) => (
                <Link
                  key={itemIndex}
                  href={item.href}
                  className='flex items-center p-3 rounded-lg hover:bg-hover transition-colors'
                >
                  <span className='mr-3 text-lg'>{item.icon}</span>
                  <span className='text-textPrimary'>{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className='bg-bgLight rounded-lg p-6 shadow-md md:col-span-2'>
          <h2 className='text-xl font-semibold mb-4 text-textLight'>
            계정 관리
          </h2>
          <button
            onClick={() => setIsWithdrawModalOpen(true)}
            className='w-full py-3 rounded-lg bg-error text-white font-semibold hover:bg-error/80 transition-colors'
          >
            회원 탈퇴
          </button>
        </div>
      </div>

      {isWithdrawModalOpen && (
        <WithdrawModal onClose={() => setIsWithdrawModalOpen(false)} />
      )}
    </div>
  );
};

export default SettingPage;
