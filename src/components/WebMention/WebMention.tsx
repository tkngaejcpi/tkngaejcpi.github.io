import type { CollectionEntry } from 'astro:content';

import { useWebMention } from '@models/WebMention';

import { onMount } from '@utils/hooks';

import AvatarBoard from './AvatarBoard';
import MastodonReminder from './MastodonReminder';
import MentionForm from './MentionForm';
import Replies from './Replies';

type Slug = CollectionEntry<'posts'>['slug'];

interface WebMentionProps {
	slug: Slug;
	mastodonRepost?: string;
}

function WebMention({ slug, mastodonRepost }: WebMentionProps) {
	const [mentions, fetchMentions] = useWebMention(slug);

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
			<h2 className="text-xl font-bold text-neutral-900">
				來自 Webmention 的回應
			</h2>

			<AvatarBoard emoji="⭐" label="讚好" mentions={likes} />
			<AvatarBoard emoji="🔁" label="轉發" mentions={reposts} />
			<Replies replies={replies} />
			<MentionForm {...{ slug }} />
			<MastodonReminder mastodonRepost={mastodonRepost} />
		</div>
	);
}

export default WebMention;
