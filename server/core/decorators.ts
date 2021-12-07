interface DecoratorOptions<T> {
	runBefore?: (...args: any[]) => T | null,
	runAfter?: (result: T) => void
}

export const buildDecorator = <T = any>(options: DecoratorOptions<T>) => {

	return (target: any, key: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<T>>) => {

		const originalMethod = descriptor.value as () => Promise<T>;

		descriptor.value = async (...args: any[]) => {
			if (options.runBefore) {
				const response = options.runBefore(...args)

				if (response) {
					return response
				}
			}

			const result = await originalMethod.apply(target, args) as T;

			if (options.runAfter) {
				options.runAfter(result)
			}

			return result;
		}

		return descriptor;
	}
}
