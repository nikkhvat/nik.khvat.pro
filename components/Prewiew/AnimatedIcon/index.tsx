import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import Image, { StaticImageData } from "next/image";

interface IconAnimationProps {
  items: {
    icon: string | StaticImageData
    alt: string
    link: string
  }[]
}

const IconAnimation: React.FC<IconAnimationProps> = ({ items }) => {
  const [translateX, setTranslateX] = useState<number>(0);

  useEffect(() => {
    const targetTranslateX = window.innerWidth < 1060 ? window.innerWidth < 810 ? 0 : -224 : -298;

    const timeoutId = setTimeout(() => {
      setTranslateX(targetTranslateX);
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);


  return (
    <div className={styles.icons}>
      {items.map((item, index) => (
        <div
          key={index}
          className={styles.icons__item}
          style={{
            transform: `translateX(${translateX}px)`,
            transitionDelay: `${index * 0.1}s`,
          }}
        >
          <div key={item.alt} className={styles.icons__item}>
            <a href={item.link}>
              <Image src={item.icon} alt={item.alt} width={24} height={24} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IconAnimation;