type CategoryProps = {
    categoryName: string;
    categoryScore: number;
};

const ResultsCategory = ({ categoryName, categoryScore }: CategoryProps) => {
  return (
    <div className="flex flex-col items-center">
        <span className="text-gray-700 text-sm">{categoryName}: {categoryScore.toString()}</span>
        <div className="flex items-center">
            {categoryScore >= 30 ? (
                <span className="rounded-full h-4 w-4 bg-red-500"></span>
            ) : categoryScore >= 20 && categoryScore <= 29 ? (
                <span className="rounded-full h-4 w-4 bg-yellow-500"></span>
            ) : (
                <span className="rounded-full h-4 w-4 bg-green-500"></span>
            )}
            <span className="ml-2 text-gray-700">{categoryScore >= 30 ? 'Very Likely' : categoryScore >= 20 && categoryScore <= 29 ? 'Likely' : 'Not Likely'}</span>
        </div>
    </div>
  );
};

export default ResultsCategory;