export type Action = () => void;
export type Action1<TArgument> = (argument: TArgument) => void;
export type Action2<TArgument1, TArgument2> = (argument1: TArgument1, argument2: TArgument2) => void;
export type Action3<TArgument1, TArgument2, TArgument3> = (
	argument1: TArgument1,
	argument2: TArgument2,
	argument3: TArgument3
) => void;
export type Action4<TArgument1, TArgument2, TArgument3, TArgument4> = (
	argument1: TArgument1,
	argument2: TArgument2,
	argument3: TArgument3,
	argument4: TArgument4
) => void;
export type Action5<TArgument1, TArgument2, TArgument3, TArgument4, TArgument5> = (
	argument1: TArgument1,
	argument2: TArgument2,
	argument3: TArgument3,
	argument4: TArgument4,
	argument5: TArgument5
) => void;
