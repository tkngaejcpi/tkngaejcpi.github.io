interface Props {
	mastodonRepost?: string;
}

function MastodonReminder({ mastodonRepost }: Props) {
	return (
		mastodonRepost && (
			<div>
				<h3 className="mb-2 flex flex-row text-lg font-medium text-neutral-700">
					<span className="mr-1">🐘</span>
					<span className="underline">在 Mastodon 發送 Webmention</span>
				</h3>

				<div className="prose prose-sm prose-neutral">
					<p>
						你在
						<a href={mastodonRepost} target="_blank">
							此條嘟文
						</a>
						下的公開點星、轉嘟和回覆都會發送 Webmention 給本站。
					</p>
				</div>
			</div>
		)
	);
}

export default MastodonReminder;
