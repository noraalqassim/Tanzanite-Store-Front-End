import React from "react";

export default function CategoryFilters(props) {
  const { selectedCategories, setSelectedCategories, categories } = props;

  const handleCategoryToggle = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleSelectAll = () => {
    setSelectedCategories(categories);
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
  };

  return (
    <div>
      <select
        value={selectedCategories}
        onChange={(e) => handleCategoryToggle(e.target.value)}
        multiple
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <button onClick={handleSelectAll}>Select All</button>
      <button onClick={handleClearAll}>Clear All</button>
    </div>
  );
}