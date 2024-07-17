import { createSignal, onMount } from 'solid-js';

import {
  mkMentions,
  type Mention,
  type MentionResponse,
} from '@models/WebMention';

import { pipe } from '@utils/function';

/* props */
interface Props {
  url: string;
}

function WebMention({ url }: Props) {
  const [mentions, setMentions] = createSignal<Mention[]>([]);

  const likes = () =>
    mentions().filter((mention) => mention.wmProperty == 'like-of');
  const reposts = () =>
    mentions().filter((metion) => metion.wmProperty == 'repost-of');

  /* fetch data on mount */
  onMount(() => {
    fetch(`https://webmention.io/api/mentions.jf2?target=${url}`)
      .then((res) => res.json())
      .then((res: MentionResponse) => pipe(res, mkMentions, setMentions));
  });

  return (
    <div class="flex flex-col gap-3">
      <h2 class="text-xl font-bold">來自 Webmention 的回應</h2>

      <div class="mb-1">
        <p class="mb-2 font-medium">
          <span class="mr-1">⭐</span>
          <span class="underline">讚好</span>
        </p>

        <div class="flex flex-row gap-2">
          {likes().map((mention) => (
            <a href={mention.author.url}>
              <img
                height="32px"
                width="32px"
                title={mention.author.name}
                alt={mention.author.name}
                src={mention.author.photo}
              />
            </a>
          ))}
        </div>
      </div>

      <div>
        <p class="mb-2 flex flex-row font-medium">
          <span class="mr-1">🔁</span>
          <span class="underline">轉發</span>
        </p>

        <div class="flex flex-row gap-2">
          {reposts().map((mention) => (
            <a href={mention.author.url}>
              <img
                height="32px"
                width="32px"
                title={mention.author.name}
                alt={mention.author.name}
                src={mention.author.photo}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WebMention;
