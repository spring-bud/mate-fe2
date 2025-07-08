'use client';

interface JobTypeInputProps {
  value: string;
  onChange: (jobType: string) => void;
}

const JobTypeInput: React.FC<JobTypeInputProps> = ({ value, onChange }) => {
  return (
    <div className='w-full'>
      <label className='block text-sm font-medium text-textLight mb-2'>
        직업 타입
      </label>
      <input
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder='직업 타입을 입력하세요 (예: 개발자, 디자이너, 기획자 등)'
        className='w-full px-4 py-3 bg-bgLight border border-border rounded-lg text-textLight placeholder-textDim focus:outline-none focus:ring-2 focus:ring-active focus:border-active transition-all'
      />
    </div>
  );
};

export default JobTypeInput;
