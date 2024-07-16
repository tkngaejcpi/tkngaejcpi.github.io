import type { Component, ComponentProps, JSX } from 'solid-js';

import { pipe, preHook } from '@utils/function';
import { mergeTailwindClass, mkComponent } from '@utils/style';

/* styled component pipeline */
function mkStyledComponent(
  tag: keyof JSX.HTMLElementTags,
  twClass: string,
): Component<ComponentProps<typeof tag>> {
  return function (props) {
    return pipe(props, mergeTailwindClass(twClass), mkComponent(tag));
  };
}

function deriveViewComponent(direction: 'row' | 'col') {
  const NoGap = mkStyledComponent('div', `flex flex-${direction}`);

  return {
    NoGap,

    _: preHook(mergeTailwindClass('gap-2'))(NoGap),
    SmallGap: preHook(mergeTailwindClass('gap-1'))(NoGap),
  };
}

function deriveTextComponent(twClass: string) {
  return {
    _: mkStyledComponent('span', twClass),
    Block: mkStyledComponent('span', `${twClass} block`),
    Para: mkStyledComponent('p', twClass),
    CenterHeader: mkStyledComponent('h1', twClass),
    Header: mkStyledComponent('h2', twClass),
    SmallHeader: mkStyledComponent('h3', twClass),
  };
}

/* adhoc styled components */
const TopBorderContainer = mkStyledComponent(
  'div',
  'border-t-2 border-neutral-400',
);
const BottomBorderContainer = mkStyledComponent(
  'div',
  'border-b-2 border-neutral-400',
);
const RoundedContainer = mkStyledComponent(
  'div',
  'rounded-md border-2 border-neutral-300 px-1',
);

const MarkdownContainer = mkStyledComponent(
  'article',
  'prose prose-neutral overflow-y-scroll',
);

const BlogTitle = mkStyledComponent(
  'h1',
  'text-3xl font-bold text-neutral-800',
);
const PostTitle = mkStyledComponent(
  'h1',
  'text-2xl font-bold text-neutral-800',
);
const PostSummaryText = mkStyledComponent('p', 'text-sm text-neutral-800');

const S = {
  VerticalView: deriveViewComponent('col'),
  HorizontalView: deriveViewComponent('row'),

  MainText: deriveTextComponent('text-lg font-bold text-neutral-900'),
  NormalText: deriveTextComponent('font-medium text-neutral-900'),
  SubText: deriveTextComponent('text-sm font-medium text-neutral-600'),
  GrayerSubText: deriveTextComponent('text-sm font-medium text-neutral-400'),
  SupportingText: deriveTextComponent('text-xs text-neutral-400'),

  TopBorderContainer,
  BottomBorderContainer,
  RoundedContainer: RoundedContainer,

  MarkdownContainer,

  /* adhoc styled components */
  BlogTitle,
  PostTitle,
  PostSummaryText,
  AboutMeText: deriveTextComponent(
    'text-[0.925rem] font-medium text-neutral-700',
  ),
};

export default S;
