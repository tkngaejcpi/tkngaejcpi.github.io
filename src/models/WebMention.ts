export interface Author {
  name: string;
  url: string;
  photo: string;
}

type WithAuthor = { author: Author };

export interface MentionLike extends WithAuthor {
  wmProperty: 'like-of';
}

export interface MentionRepost extends WithAuthor {
  wmProperty: 'repost-of';
}

export interface MentionReply extends WithAuthor {
  wmProperty: 'in-reply-to';
}

/**
 * @description a mention (Webmention)
 */
export type Mention = MentionLike | MentionRepost | MentionReply;

/**
 * @description data of schema that `/mention.jf2` will return
 */
export interface MentionResponse {
  children: _Mention[];
}

/**
 * @description constructor of Mention[], takes MentionRepsonse
 */
export function mkMentions(res: MentionResponse): Mention[] {
  return res.children.map((_mention) => ({
    author: _mention.author,
    wmProperty: _mention['wm-property'],
  }));
}

/**
 * @description adhoc type for http data handling
 */
interface _Mention {
  author: Mention['author'];
  'wm-property': Mention['wmProperty'];
}
