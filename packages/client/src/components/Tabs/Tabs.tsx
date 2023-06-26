import { LiHTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './tabs.module.scss';

interface TabsProps extends LiHTMLAttributes<HTMLLIElement> {
  tabNames: string[];
  activeTab?: number;
  setActiveTab?: (num: number) => void;
}

export const Tabs = (props: TabsProps) => {
  const { tabNames, className, activeTab, setActiveTab, ...otherProps } = props;

  return (
    <div className={styles.container}>
      <ul className={cn(styles.ul, className)}>
        {tabNames.map((tab, i) => (
          <li
            {...otherProps}
            className={cn(styles.li, { [styles.active]: i === activeTab })}
            key={i}
            id={i.toString()}>
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};
