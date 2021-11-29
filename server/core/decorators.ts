interface DecoratorOptions<T> {
	runBefore?: (...args: any[]) => any,
	runAfter?: (result: T) => void
}

export const buildDecorator = <T = any> (options: DecoratorOptions<T>) => {

	return (target: any, key: string, descriptor: TypedPropertyDescriptor<(...args: any[]) => T>) => {

		const originalMethod = descriptor.value as () => T;

        descriptor.value = (...args: any[]) => {
            if (options.runBefore) {
				const response = options.runBefore(...args)

				if (response) {
					return response
				}
			}

            const result = originalMethod.apply(target, args) as T;

			if (options.runAfter) {
				options.runAfter(result)
			}

			return result;
        }

        return descriptor;
    }
}
