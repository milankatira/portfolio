const Header = () => {
  return (
    <div className='flex justify-between items-center'>
      <div>
        <h1 className='text-3xl font-bold'>📊 Dashboard Overview</h1>
        <p className='text-gray-600'>{`Monitor your platform's performance`}</p>
      </div>
      <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'>
        Generate Report
      </button>
    </div>
  );
};

export default Header;
