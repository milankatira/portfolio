const stats = [
  { title: 'Total Users', value: '1,245', icon: '👥' },
  { title: 'Feedback Received', value: '342', icon: '📝' },
  { title: 'Revenue (This Month)', value: '$12,400', icon: '💸' },
];

const StatsCards = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-3 gap-6'>
      {stats.map((stat) => (
        <div key={stat.title} className='p-6 rounded-lg shadow-md'>
          <div className='text-3xl'>{stat.icon}</div>
          <h2 className='text-xl font-semibold mt-2'>{stat.title}</h2>
          <p className='text-2xl font-bold mt-1'>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
