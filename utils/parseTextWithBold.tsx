export const parseTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <span key={index} className="font-bold text-white">
            {part.slice(2, -2)}
          </span>
        );
      }
      return <span key={index} className="font-light">{part}</span>;
    });
  };
