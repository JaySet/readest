import clsx from 'clsx';
import React from 'react';

import { useReaderStore } from '@/store/readerStore';
import useTrafficLight from '@/hooks/useTrafficLight';

interface SectionInfoProps {
  section?: string;
  gapLeft: string;
}

const SectionInfo: React.FC<SectionInfoProps> = ({ section, gapLeft }) => {
  const { isSideBarVisible } = useReaderStore();
  const { isTrafficLightVisible } = useTrafficLight();
  return (
    <div
      className={clsx(
        'pageinfo absolute right-0 top-0 flex items-end',
        isTrafficLightVisible && !isSideBarVisible ? 'h-[44px]' : 'h-[30px]',
      )}
      style={{ left: gapLeft }}
    >
      <h2 className='text-neutral-content text-center font-sans text-xs font-light'>
        {section || ''}
      </h2>
    </div>
  );
};

export default SectionInfo;
