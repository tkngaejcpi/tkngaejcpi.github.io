import type { Mention } from '@models/WebMention';

interface Props {
	emoji: string;
	label: string;
	mentions: Mention[];
}

/**
 * @description this component shows the avatar list of the mentioned authors
 */
function AvatarBoard({ emoji, label, mentions }: Props) {
	return (
		<div>
			<h3 className="mb-2 text-lg font-bold text-neutral-900">
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

export default AvatarBoard;
