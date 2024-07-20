import { type Mention, type MentionResponse } from '@models/WebMention';

import { onMount, useFetchData } from '@utils/hooks';

import AvatarBoard from './AvatarBoard';
import MastodonReminder from './MastodonReminder';
import MentionForm from './MentionForm';
import Replies from './Replies';

interface WebMentionProps {
	target: string;
	mastodonRepost?: string;
}

function WebMention({ target, mastodonRepost }: WebMentionProps) {
	const [mentions, fetchMentions] = useFetchData<Mention[]>(
		[],
		`https://webmention.io/api/mentions.jf2?target=${target}`,
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
			<MentionForm url={target} />
			<MastodonReminder mastodonRepost={mastodonRepost} />
		</div>
	);
}

export default WebMention;
