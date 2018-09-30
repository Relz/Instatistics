export type Function<TResult> = () => TResult;
export type Function1<TArgument1, TResult> = (argument1: TArgument1) => TResult;
export type Function2<TArgument1, TArgument2, TResult> = (argument1: TArgument1, argument2: TArgument2) => TResult;
export type Function3<TArgument1, TArgument2, TArgument3, TResult> = (
	value1: TArgument1,
	value2: TArgument2,
	value3: TArgument3
) => TResult;
export type Function4<TArgument1, TArgument2, TArgument3, TArgument4, TResult> = (
	value1: TArgument1,
	value2: TArgument2,
	value3: TArgument3,
	value4: TArgument4
) => TResult;
export type Function5<TArgument1, TArgument2, TArgument3, TArgument4, TArgument5, TResult> = (
	value1: TArgument1,
	value2: TArgument2,
	value3: TArgument3,
	value4: TArgument4,
	value5: TArgument5
) => TResult;
