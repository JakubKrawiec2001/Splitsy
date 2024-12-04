const Balance = () => {
  return (
    <div className="bg-white shadow-sm rounded-[5px] p-6 flex flex-col gap-6 justify-center col-start-5 col-end-7 row-start-1 row-end-2">
      <div className="flex flex-col justify-center gap-2">
        <p className="text-customTextColor font-medium text-base mt-2">
          My Balance
        </p>
        <p className="text-4xl text-customBlack font-medium">
          {/* ${totalRevenues.toFixed(2)} */}
          $5500
        </p>
      </div>
    </div>
  );
};

export default Balance;
