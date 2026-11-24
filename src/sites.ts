export interface Site {
	name: string;
	message: string;
	lang: string;
}

const DEFAULTS: Omit<Site, "name"> = {
	message: "Diese Domain ist geparkt.",
	lang: "de",
};

// Optional per-domain overrides; every other domain shows its hostname with DEFAULTS.
const SITES: Record<string, Partial<Site>> = {
	// "example.com": { message: "This domain is parked.", lang: "en" },
};

export function resolveSite(hostname: string): Site {
	return { ...DEFAULTS, name: hostname, ...SITES[hostname] };
}
