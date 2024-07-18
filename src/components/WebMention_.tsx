import { blogConfig } from '@config/blog';

import {
  type Mention,
  type MentionReply,
  type MentionResponse,
} from '@models/WebMention';

import { onMount, useFetchData } from '@utils/hooks';

interface AvatarBoardProps {
  emoji: string;
  label: string;
  mentions: Mention[];
}

function AvatarBoard({ emoji, label, mentions }: AvatarBoardProps) {
  return (
    <div>
      <h3 className="mb-2 text-lg font-medium">
        <span className="mr-1">{emoji}</span>
        <span className="underline">{label}</span>
      </h3>

      <div className="flex flex-row gap-2">
        {mentions.map((mention, i) => (
          <a key={i} href={mention.author.url}>
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
  );
}

interface RepliesProps {
  replies: MentionReply[];
}

function Replies({ replies }: RepliesProps) {
  return (
    <div>
      <h3 className="mb-2 flex flex-row text-lg font-medium">
        <span className="mr-1">↩️</span>
        <span className="underline">回覆</span>
      </h3>

      <div className="flex flex-col gap-2 pt-1">
        {replies.map((reply, i) => (
          <div key={i} className="flex flex-col gap-3">
            <a className="flex flex-row gap-2" href={reply.author.url}>
              <img
                className="h-6 w-6"
                height="32px"
                width="32px"
                title={reply.author.name}
                alt={reply.author.name}
                src={reply.author.photo}
              />
              <span className="font-medium text-neutral-800">
                {reply.author.name}
              </span>
            </a>
            <div
              className="prose prose-sm"
              dangerouslySetInnerHTML={{ __html: reply.content.html }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

interface WebMentionProps {
  url: string;
}

function WebMention({ url }: WebMentionProps) {
  const [mentions, fetchMentions] = useFetchData<Mention[]>(
    [],
    `https://webmention.io/api/mentions.jf2?target=${url}`,
    (res) => res.json().then((res) => (res as MentionResponse).children),
  );

  const likes = mentions.filter(
    (mention) => mention['wm-property'] == 'like-of',
  );
  const reposts = mentions.filter(
    (metion) => metion['wm-property'] == 'repost-of',
  );
  const replies = mentions.filter(
    (mention) => mention['wm-property'] == 'in-reply-to',
  );

  /* fetch data on mount */
  onMount(() => {
    fetchMentions();
  });

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">來自 Webmention 的回應</h2>

      <AvatarBoard emoji="⭐" label="讚好" mentions={likes} />
      <AvatarBoard emoji="🔁" label="轉發" mentions={reposts} />
      <Replies replies={replies} />

      <div>
        <h3 className="mb-2 flex flex-row text-lg font-medium">
          <span className="mr-1">📩</span>
          <span className="underline">發送你的 Webmention</span>
        </h3>
        <form
          action={`https://webmention.io/${blogConfig.site}/webmention`}
          method="post"
          className="flex flex-row gap-2"
        >
          <input
            type="url"
            name="source"
            placeholder="Webmention 的來源"
            required
            className="flex-grow rounded-sm border-2 border-neutral-300 px-2 py-1 text-neutral-800"
          />
          <input type="hidden" name="target" value={url} />
          <input type="submit" value="🚀" className="p-1" />
        </form>
      </div>
    </div>
  );
}

export default WebMention;
