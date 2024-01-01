import Fuse from 'fuse.js'

export function createSearchInstance(data, opts) {
	if (!data) {
		throw new Error('Missing data')
	}

	const defaultOpts = {
		// isCaseSensitive: false,
		includeScore: true,
		// shouldSort: true,
		// includeMatches: false,
		// findAllMatches: false,
		minMatchCharLength: 2,
		// location: 0,
		threshold: 0.4,
		// distance: 100,
		// useExtendedSearch: false,
		// ignoreLocation: false,
		// ignoreFieldNorm: false,
		// fieldNormWeight: 1,
		keys: ['description', 'code'],
	}

	return new Fuse(data, { ...defaultOpts, ...opts })
}
