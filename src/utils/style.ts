import type { Component, JSX, ComponentProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';

import type { Operator } from '@models/Logic';

export type PropsOperator<T extends keyof JSX.HTMLElementTags> = Operator<
  JSX.HTMLElementTags[T]
>;

/**
 * @description takes tailwind class, return a Operator that merging tailwind class
 */
export function mergeTailwindClass<T extends { class?: string }>(
  twClass: string,
): Operator<T> {
  return function (props) {
    /* merge tw class to original class if needed */
    const mergedClass =
      props.class === undefined ? twClass : `${twClass} ${props.class}`;

    return {
      ...props,
      class: mergedClass,
    };
  };
}

/**
 * @description takes html tag, return component
 */
export function mkComponent<T extends keyof JSX.HTMLElementTags>(
  tag: T,
): Component<ComponentProps<T>> {
  return function StyledComponent(props) {
    return Dynamic({
      ...props,
      component: tag,
    });
  };
}
