import * as React from 'react';

export class Component<
	TExternalProps = {},
	TState = {},
	TActualProps extends TExternalProps = TExternalProps
> extends React.Component<TExternalProps, TState> {
	public constructor(props: TExternalProps) {
		super(props);
	}

	protected get properties(): TActualProps {
		return this.props as TActualProps;
	}
}
