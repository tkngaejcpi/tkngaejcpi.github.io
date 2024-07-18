export interface Author {
  name: string;
  url: string;
  photo: string;
}

type WithAuthor = { author: Author };

export interface MentionLike extends WithAuthor {
  'wm-property': 'like-of';
}

export interface MentionRepost extends WithAuthor {
  'wm-property': 'repost-of';
}

export interface MentionReply extends WithAuthor {
  'wm-property': 'in-reply-to';

  content: {
    html: string;
  };
}

/**
 * @description a mention (Webmention)
 */
export type Mention = MentionLike | MentionRepost | MentionReply;

/**
 * @description data of schema that `/mention.jf2` will return
 */
export interface MentionResponse {
  children: Mention[];
}
