import { ProductSearchBody } from '@/schemas/api/product.schema';

interface UseProductFiltersProps {
  searchParams: ProductSearchBody;
  setSearchParams: (params: ProductSearchBody) => void;
  updateUrlParams: (params: ProductSearchBody) => void;
}

const useProductFilters = ({
  searchParams,
  setSearchParams,
  updateUrlParams,
}: UseProductFiltersProps) => {
  // 카테고리 변경 핸들러
  const handleCategoryChange = (category: string) => {
    const updatedParams = { ...searchParams, category };
    setSearchParams(updatedParams);
    updateUrlParams(updatedParams);
  };

  // 정렬 옵션 변경 핸들러
  const handleSortChange = (sort: string) => {
    const updatedParams = { ...searchParams, sort };
    setSearchParams(updatedParams);
    updateUrlParams(updatedParams);
  };

  // 검색어 변경 핸들러
  const handleSearchChange = (title: string) => {
    const updatedParams = { ...searchParams, title };
    setSearchParams(updatedParams);
    updateUrlParams(updatedParams);
  };

  // 태그 추가 핸들러
  const handleTagAdd = (tag: string) => {
    if (!Array.isArray(searchParams.tag) || searchParams.tag.includes(tag))
      return;

    const updatedParams = {
      ...searchParams,
      tag: [...(Array.isArray(searchParams.tag) ? searchParams.tag : []), tag],
    };

    setSearchParams(updatedParams);
    updateUrlParams(updatedParams);

    // 모바일에서 태그 추가 후 자동으로 태그 필터 닫기 (UX 개선)
    return window.innerWidth < 1024;
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
    handleCategoryChange,
    handleSortChange,
    handleSearchChange,
    handleTagAdd,
    handleTagRemove,
  };
};

export default useProductFilters;
