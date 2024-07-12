'use client';
import React, { useEffect } from 'react';

interface IMenuData {
  title: string;
  value: any;
}

interface IProps {
  title: string;
  icon?: JSX.Element;
  data: IMenuData[];
}

const SideMenu = ({ title, data }: IProps) => {
  const [headerHeight, setHeaderHeight] = React.useState(0);
  useEffect(() => {
    const headerHeight = document.getElementById('header')?.clientHeight;
    setHeaderHeight(headerHeight || 0);
  }, []);

  return (
    <div
      className={`w-full px-4 border-r-[0.1rem] pt-4 overflow-y-auto`}
      style={{ height: `calc(100vh - ${headerHeight}px)` }}
    >
      <h2 className='text-2xl'>{data.length} {title}</h2>
      <div className="flex flex-col gap-2 pt-4">
        {data.map((item, index) => (
          <div className="w-full py-2 px-4" key={item.value}>
            {item.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
