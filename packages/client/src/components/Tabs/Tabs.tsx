import { LiHTMLAttributes, MouseEvent, useState } from 'react';
import cn from 'classnames';
import styles from './tabs.module.scss';

interface TabsProps extends LiHTMLAttributes<HTMLLIElement> {
  tabNames: string[];
  activeTab?: string;
}

export const Tabs = (props: TabsProps) => {
  const { tabNames, activeTab, ...otherProps } = props;
  const [currentTab, setCurrentTab] = useState(activeTab);

  //Заглушка для прощелкивания табов
  const toggleTab = (e: MouseEvent<HTMLUListElement>) => {
    setCurrentTab((e.target as HTMLLIElement).innerText);
  };

  return (
    <div className={styles.container}>
      <ul onClick={toggleTab} className={styles.ul}>
        {tabNames.map(tab => (
          <li
            {...otherProps}
            className={cn(styles.li, { [styles.active]: tab === currentTab })}
            key={tab}>
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
};
