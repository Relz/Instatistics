import { Function, Function1, Function2 } from './Functions';

export type Predicate = Function<boolean>;
export type Predicate1<T1> = Function1<T1, boolean>;
export type Predicate2<T1, T2> = Function2<T1, T2, boolean>;
