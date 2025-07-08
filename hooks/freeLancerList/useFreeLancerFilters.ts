import { FreeLancerSearchBody } from '@/schemas/api/freeLancer.schema';

interface UseFreeLancerFiltersProps {
  searchParams: FreeLancerSearchBody;
  setSearchParams: (params: FreeLancerSearchBody) => void;
  updateUrlParams: (params: FreeLancerSearchBody) => void;
}

const useFreeLancerFilters = ({
  searchParams,
  setSearchParams,
  updateUrlParams,
}: UseFreeLancerFiltersProps) => {
  // 직업 타입 변경 핸들러
  const handleJobTypeChange = (jobtype: string) => {
    const updatedParams = { ...searchParams, jobtype };
    setSearchParams(updatedParams);
    updateUrlParams(updatedParams);
  };

  // 닉네임 검색 변경 핸들러
  const handleNicknameChange = (nickname: string) => {
    const updatedParams = { ...searchParams, nickname };
    setSearchParams(updatedParams);
    updateUrlParams(updatedParams);
  };

  // 태그 추가 핸들러
  const handleTagAdd = (tag: string) => {
    if (!Array.isArray(searchParams.tag) || searchParams.tag.includes(tag))
      return false;

    const updatedParams = {
      ...searchParams,
      tag: [...(Array.isArray(searchParams.tag) ? searchParams.tag : []), tag],
    };

    setSearchParams(updatedParams);
    updateUrlParams(updatedParams);

    // 모바일에서 태그 추가 후 자동으로 태그 필터 닫기 (UX 개선)
    return typeof window !== 'undefined' && window.innerWidth < 1024;
  };

  // 태그 제거 핸들러
  const handleTagRemove = (tag: string) => {
    if (!Array.isArray(searchParams.tag)) return;

    const updatedParams = {
      ...searchParams,
      tag: Array.isArray(searchParams.tag)
        ? searchParams.tag.filter((t) => t !== tag)
        : [],
    };

    setSearchParams(updatedParams);
    updateUrlParams(updatedParams);
  };

  return {
    handleJobTypeChange,
    handleNicknameChange,
    handleTagAdd,
    handleTagRemove,
  };
};

export default useFreeLancerFilters;
