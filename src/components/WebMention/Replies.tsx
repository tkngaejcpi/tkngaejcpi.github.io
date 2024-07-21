import type { MentionReply } from '@models/WebMention';

interface Props {
	replies: MentionReply[];
}

function Replies({ replies }: Props) {
	return (
		<div>
			<h3 className="mb-2 flex flex-row text-lg font-bold text-neutral-900">
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
							<span className="font-medium text-neutral-700">
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

export default Replies;
