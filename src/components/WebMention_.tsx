import { createSignal, onMount } from 'solid-js';

import { type Mention, type MentionResponse } from '@models/WebMention';

/* props */
interface Props {
  url: string;
}

function WebMention({ url }: Props) {
  const [mentions, setMentions] = createSignal<Mention[]>([]);

  const likes = () =>
    mentions().filter((mention) => mention['wm-property'] == 'like-of');
  const reposts = () =>
    mentions().filter((metion) => metion['wm-property'] == 'repost-of');
  const replies = () =>
    mentions().filter((mention) => mention['wm-property'] == 'in-reply-to');

  /* fetch data on mount */
  onMount(() => {
    fetch(`https://webmention.io/api/mentions.jf2?target=${url}`)
      .then((res) => res.json())
      .then((res: MentionResponse) => {
        setMentions(res.children);
      });
  });

  return (
    <div class="flex flex-col gap-4">
      <h2 class="text-xl font-bold">來自 Webmention 的回應</h2>

      <div>
        <p class="mb-2 text-lg font-medium">
          <span class="mr-1">⭐</span>
          <span class="underline">讚好</span>
        </p>

        <div class="flex flex-row gap-2">
          {likes().map((like) => (
            <a href={like.author.url}>
              <img
                height="32px"
                width="32px"
                title={like.author.name}
                alt={like.author.name}
                src={like.author.photo}
              />
            </a>
          ))}
        </div>
      </div>

      <div>
        <p class="mb-2 flex flex-row text-lg font-medium">
          <span class="mr-1">🔁</span>
          <span class="underline">轉發</span>
        </p>

        <div class="flex flex-row gap-2">
          {reposts().map((repost) => (
            <a href={repost.author.url}>
              <img
                height="32px"
                width="32px"
                title={repost.author.name}
                alt={repost.author.name}
                src={repost.author.photo}
              />
            </a>
          ))}
        </div>
      </div>

      <div>
        <p class="mb-2 flex flex-row text-lg font-medium">
          <span class="mr-1">📩</span>
          <span class="underline">回覆</span>
        </p>

        <div class="flex flex-col gap-2 pt-1">
          {replies().map((reply) => (
            <div class="flex flex-col gap-3">
              <a class="flex flex-row gap-2" href={reply.author.url}>
                <img
                  class="h-6 w-6"
                  height="32px"
                  width="32px"
                  title={reply.author.name}
                  alt={reply.author.name}
                  src={reply.author.photo}
                />
                <span class="font-medium text-neutral-800">
                  {reply.author.name}
                </span>
              </a>
              <div class="prose prose-sm" innerHTML={reply.content.html} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WebMention;
