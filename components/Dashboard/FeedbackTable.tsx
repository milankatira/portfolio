const feedbackData = [
  {
    id: 1,
    user: 'Alice Johnson',
    feedback: 'Add dark mode',
    status: 'Pending',
  },
  {
    id: 2,
    user: 'Bob Smith',
    feedback: 'Improve performance',
    status: 'Under Review',
  },
  {
    id: 3,
    user: 'Charlie Davis',
    feedback: 'Add export feature',
    status: 'Completed',
  },
];

const FeedbackTable = () => {
  return (
    <div className='p-6 rounded-lg shadow-md'>
      <h2 className='text-xl font-semibold mb-4'>📝 Recent Feedback</h2>
      <table className='w-full'>
        <thead>
          <tr className='text-left border-b'>
            <th className='pb-2'>User</th>
            <th className='pb-2'>Feedback</th>
            <th className='pb-2'>Status</th>
          </tr>
        </thead>
        <tbody>
          {feedbackData.map((item) => (
            <tr key={item.id} className='border-b'>
              <td className='py-2'>{item.user}</td>
              <td className='py-2'>{item.feedback}</td>
              <td className='py-2'>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    item.status === 'Completed'
                      ? 'bg-green-100 text-green-600'
                      : item.status === 'Under Review'
                        ? 'bg-yellow-100 text-yellow-600'
                        : 'bg-red-100 text-red-600'
                  }`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;
