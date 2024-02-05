const TextSide = () => {
  const settings = [
    {
      title: "编辑",
      style: {
        width: 320,
        height: 569,
        backgroundColor: "red",
      },
    },
    {
      title: "编辑222",
      style: {
        width: 320,
        height: 569,
        backgroundColor: "yellow",
      },
    },
  ];
  return (
    <ul className="flex gap-6 p-4">
      {settings.map((item, index) => {
        return (
          <li
            key={index}
            className="border border-amber-200 w-[100px] h-[100px] text-center bg-white leading-none"
          >
            {item.title}
          </li>
        );
      })}
    </ul>
  );
};
export default TextSide;
