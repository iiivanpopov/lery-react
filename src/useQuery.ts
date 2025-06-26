import { Lery, type QueryState } from 'lery'
import { useEffect, useState } from 'react'

const globalClient = new Lery()

/**
 * React hook for fetching and subscribing to asynchronous data with caching and loading state.
 *
 * @template T The type of the data being fetched.
 * @param {string} key - Unique key to identify the cached query.
 * @param {() => Promise<T>} fetcher - Function that returns a promise resolving to the data.
 * @returns {QueryState<T>} The current state of the query (data, error, isLoading).
 *
 * @example
 * const { data, error, isLoading } = useQuery('user', () => fetchUser())
 */
export function useQuery<T>(
	key: string,
	fetcher: () => Promise<T>
): QueryState<T> {
	const [state, setState] = useState<QueryState<T>>({
		data: null,
		error: null,
		isLoading: false,
	})

	useEffect(() => {
		const unsubscribe = globalClient.subscribe<T>(key, setState)
		globalClient.fetch<T>(key, fetcher)
		return unsubscribe
	}, [key])

	return state
}
