import { CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import ArrowDown from 'assets/icons/arrow-down.svg';
import cn from 'classnames';

interface IVariant {
  label: string;
  className?: string;
  style?: CSSProperties;
}

interface IProps {
  title: string;
  variants: (IVariant | string)[];
  defaultActiveItem?: string;
  onSelect?: (label: string) => void;
  defaultPosition?: 'left' | 'right';
}

export const Dropdown = ({
  title,
  variants,
  defaultActiveItem,
  onSelect,
  defaultPosition = 'left',
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

  const selectItem = (label: string) => {
    setActiveItem(label);
    if (onSelect) onSelect(label);
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
          {variants.map(variant => {
            const {
              label,
              className = undefined,
              style = undefined,
            } = typeof variant === 'string' ? { label: variant } : variant;
            return (
              <div
                key={label}
                className={cn({ [styles.isActive]: label === activeItem })}>
                <li
                  onClick={() => selectItem(label)}
                  className={className}
                  style={style}>
                  {label}
                </li>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
