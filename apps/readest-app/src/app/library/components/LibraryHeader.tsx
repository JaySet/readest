import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { PiPlus } from 'react-icons/pi';
import { PiSelectionAllDuotone } from 'react-icons/pi';

import useTrafficLight from '@/hooks/useTrafficLight';
import WindowButtons from '@/components/WindowButtons';

interface LibraryHeaderProps {
  isSelectMode: boolean;
  onImportBooks: () => void;
  onToggleSelectMode: () => void;
}

const LibraryHeader: React.FC<LibraryHeaderProps> = ({
  isSelectMode,
  onImportBooks,
  onToggleSelectMode,
}) => {
  const { isTrafficLightVisible } = useTrafficLight();
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.shiftKey) {
        onToggleSelectMode();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onToggleSelectMode]);

  const handleMinimize = async () => {
    const { getCurrentWindow } = await import('@tauri-apps/api/window');
    getCurrentWindow().minimize();
  };

  const handleToggleMaximize = async () => {
    const { getCurrentWindow } = await import('@tauri-apps/api/window');
    getCurrentWindow().toggleMaximize();
  };

  const handleClose = async () => {
    const { getCurrentWindow } = await import('@tauri-apps/api/window');
    getCurrentWindow().close();
  };

  return (
    <div
      ref={headerRef}
      className={clsx(
        'titlebar z-10 h-11 w-full py-2 pr-6',
        isTrafficLightVisible ? 'pl-16' : 'pl-2',
      )}
    >
      <div className='flex items-center justify-between space-x-6'>
        <div className='sm:w relative flex w-full items-center pl-4'>
          <span className='absolute left-8 text-gray-500'>
            <FaSearch className='h-4 w-4' />
          </span>
          <input
            type='text'
            placeholder='Search books...'
            spellCheck='false'
            className={clsx(
              'input rounded-badge bg-base-200 h-7 w-full pl-10 pr-10',
              'font-sans text-sm font-light',
              'border-none focus:outline-none focus:ring-0',
            )}
          />
          <div className='absolute right-4 flex items-center space-x-4 text-gray-500'>
            <span className='mx-2 h-5 w-[1px] bg-gray-400'></span>
            <div className='dropdown dropdown-bottom flex h-5 cursor-pointer justify-center'>
              <div className='lg:tooltip lg:tooltip-bottom' data-tip='Add books'>
                <PiPlus tabIndex={-1} className='h-5 w-5' />
              </div>
              <ul
                tabIndex={-1}
                className='dropdown-content dropdown-center menu rounded-box z-[1] mt-3 w-52 p-2 shadow'
              >
                <li>
                  <button className='text-base-content' onClick={onImportBooks}>
                    From Local File
                  </button>
                </li>
              </ul>
            </div>
            <button onClick={onToggleSelectMode} aria-label='Select Multiple Books' className='h-6'>
              <div className='lg:tooltip lg:tooltip-bottom cursor-pointer' data-tip='Select books'>
                <PiSelectionAllDuotone
                  role='button'
                  className={`h-6 w-6 ${isSelectMode ? 'fill-gray-400' : 'fill-gray-500'}`}
                />
              </div>
            </button>
          </div>
        </div>
        <WindowButtons
          headerRef={headerRef}
          showMinimize={!isTrafficLightVisible}
          showMaximize={!isTrafficLightVisible}
          showClose={!isTrafficLightVisible}
          onMinimize={handleMinimize}
          onToggleMaximize={handleToggleMaximize}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};

export default LibraryHeader;
