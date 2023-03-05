export const selectCategoriesMap = (state) => {
  const val = state.categories.categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  console.log(val);
  return val;
};
