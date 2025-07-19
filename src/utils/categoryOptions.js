const categoryOptions = [
  {
    value: 'Food',
    label: 'Food',
  },
  {
    value: 'Transport',
    label: 'Transportation',
  },
  {
    value: 'Entertainment',
    label: 'Entertainment',
  },
  {
    value: 'Shopping',
    label: 'Shopping',
  },
  {
    value: 'Utilities',
    label: 'Utilities',
  },
  {
    value: 'Health',
    label: 'Health & Care',
  },
  {
    value: 'Others',
    label: 'Others',
  },
];
export const formCategoryOptions = [
  ...categoryOptions,
  { value: 'all', label: 'all' },
];

export default categoryOptions;
