import {
  cloneElement,
  useEffect,
  createRef,
  useState,
  JSXElementConstructor,
  ReactElement,
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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!trigger && entry.isIntersecting) {
          props.onChange(true);
          if (props.once) setTrigger(true);
        } else if (!props.once) {
          props.onChange(entry.isIntersecting);
        }
      },
      { rootMargin: '-90px 0px' },
    );

    observer.observe(ref.current as Element);

    return () => observer.disconnect();
  }, []);

  return cloneElement(
    props.children as ReactElement<any, string | JSXElementConstructor<any>>,
    { ref },
  );
}
