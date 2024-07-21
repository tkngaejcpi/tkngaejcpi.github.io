import { blogConfig } from '@config/blog';

interface Props {
	url: string;
}

function MentionForm({ url }: Props) {
	return (
		<div>
			<h3 className="mb-2 flex flex-row text-lg font-medium text-neutral-700">
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
					className="flex-grow rounded-sm border-2 border-neutral-300 px-2 py-1 text-neutral-700"
				/>
				<input type="hidden" name="target" value={url} />
				<input type="submit" value="🚀" className="p-1" />
			</form>
		</div>
	);
}

export default MentionForm;
