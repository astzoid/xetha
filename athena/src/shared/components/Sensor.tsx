import {
  cloneElement,
  useEffect,
  createRef,
  isValidElement,
  useState,
} from 'react';
import type { ReactNode } from 'react';

export default function Sensor(props: {
  onChange: (visible: boolean) => any;
  children: ReactNode;
  once?: boolean;
}) {
  const ref = createRef<Element>();

  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const observer = new IntersectionObserver(([entry]) => {
      if (!trigger && entry.isIntersecting) {
        timeout = setTimeout(() => {
          props.onChange(true);
          if (props.once) setTrigger(true);
        }, 400);
      } else if (!props.once) {
        props.onChange(entry.isIntersecting);
      }
    });

    observer.observe(ref.current as Element);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  return isValidElement(props.children)
    ? cloneElement(props.children, { ref })
    : props.children;
}
