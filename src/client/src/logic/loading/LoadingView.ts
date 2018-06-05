
class LoadingView extends core.UIView {

	private t_loading: eui.Label;

	public constructor() {
		super("resource/skins/LoadingSkin.exml");
	}

	protected loaderSkinComplete(): void {

	}

	public setProgress(current: number, total: number): void {
		this.t_loading.text = Math.floor(current * 100 / total) + "%";
	}
}
