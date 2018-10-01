export type ActionAlias = () => void;
export type ActionAlias1<TArgument> = (argument: TArgument) => void;
export type ActionAlias2<TArgument1, TArgument2> = (argument1: TArgument1, argument2: TArgument2) => void;
export type ActionAlias3<TArgument1, TArgument2, TArgument3> = (
	argument1: TArgument1,
	argument2: TArgument2,
	argument3: TArgument3
) => void;
export type ActionAlias4<TArgument1, TArgument2, TArgument3, TArgument4> = (
	argument1: TArgument1,
	argument2: TArgument2,
	argument3: TArgument3,
	argument4: TArgument4
) => void;
export type ActionAlias5<TArgument1, TArgument2, TArgument3, TArgument4, TArgument5> = (
	argument1: TArgument1,
	argument2: TArgument2,
	argument3: TArgument3,
	argument4: TArgument4,
	argument5: TArgument5
) => void;
