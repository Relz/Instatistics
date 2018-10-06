export class StringHelper {
	public static isEmpty(value: string): boolean {
		return value.length === 0;
	}

	public static isAnyEmpty(...values: string[]): boolean {
		return values.find(StringHelper.isEmpty) !== undefined;
	}
}
