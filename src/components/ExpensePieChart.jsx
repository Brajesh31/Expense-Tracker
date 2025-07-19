import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';

const CATEGORY_COLORS = {
  Food: '#6366F1',
  Transport: '#06B6D4',
  Entertainment: '#A855F7',
  Utilities: '#14B8A6',
  Health: '#22C55E',
  Shopping: '#597316',
  Others: '#64748B',
};

export const ExpensePieChart = ({ data }) => {
  console.log(data);
  if (data.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No expense Data to Display
      </div>
    );
  }
  const getColor = (name) => {
    return CATEGORY_COLORS[name] || '#8E9196';
  };

  const customToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      const total = data.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((value / total) * 100).toFixed(0);

      return (
        <div className="bg-white p-4 rounded-md shadow-md border border-gray-100">
          <p className="font-medium">{name}</p>
          <p className="text-lg">PKR{value.toFixed(2)}</p>
          <span className="text-sm text-gray-500 ml-1">({percentage}%)</span>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={80}
          labelLine={false}
          fill="#8884d8"
          animationDuration={750}
          animationBegin={0}
          animationEasing="ease-out"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getColor(entry.name)} />
          ))}
        </Pie>
        <Tooltip content={customToolTip} />
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          formatter={(value) => (
            <span className="text-sm font-medium">{value}</span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
