import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import ArrowDown from 'assets/icons/arrow-down.svg';
import cn from 'classnames';

interface IProps {
  title: string;
  variants: ReactNode[];
  defaultActiveItem?: number;
  onSelect?: (label: string) => void;
  defaultPosition?: 'left' | 'right';
  hideAfterSelect?: boolean;
}

export const Dropdown = ({
  title,
  variants,
  defaultActiveItem,
  defaultPosition = 'left',
  hideAfterSelect = true,
}: IProps) => {
  const dropdownWidth = 262;
  const [showList, setShowList] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [activeItem, setActiveItem] = useState(defaultActiveItem);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { current } = dropdownRef;
    if (!current) return;
    if (current.offsetLeft <= dropdownWidth) setPosition('right');
    else if (current.offsetLeft + dropdownWidth >= window.innerWidth)
      setPosition('left');
  }, []);

  const onClickEvent = useCallback((e: MouseEvent) => {
    if (
      e.target === dropdownRef.current ||
      dropdownRef.current?.contains(e.target as Node)
    ) {
      return;
    }
    setShowList(false);
    window.removeEventListener('click', onClickEvent);
  }, []);

  const handleClick = () => {
    if (showList) {
      window.removeEventListener('click', onClickEvent);
    } else {
      window.addEventListener('click', onClickEvent);
    }
    setShowList(!showList);
  };

  const handleSelect = (index: number) => {
    setActiveItem(index);
    if (hideAfterSelect) {
      setShowList(false);
      window.removeEventListener('click', onClickEvent);
    }
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <span className={styles.title} onClick={handleClick}>
        {title}
        <img
          className={cn({ [styles.isUp]: showList })}
          src={ArrowDown}
          alt="arrow-down"
        />
      </span>
      <div
        className={cn(styles.menu, styles[position], {
          [styles.isOpen]: showList,
        })}>
        <ul className={styles.list}>
          {variants.map((elem, index) => (
            <div
              key={index}
              className={cn({ [styles.isActive]: index === activeItem })}
              onClick={() => handleSelect(index)}>
              {elem}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
