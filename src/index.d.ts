/**
 * GC tracker for Luau that provides more predictable (compared to `__gc`...) destructor
 * invocation for dead objects. Supports ~constant time update cost by limiting the
 * iteration count such that update can be called every frame with a small n for
 * negligible performance cost.
 *
 * @author zeux
 */
interface GcTracker {
	/**
	 * Track the lifetime of object `object`; {@link update} will call
	 * `deconstructor` when `object` is dead.
	 *
	 * Note: `deconstructor` should not reference `object` directly or
	 * transitively since tracker keeps a strong reference to it
	 *
	 * @param object The object you want to track.
	 * @param deconstructor The function to call when the object is dead.
	 */
	track<T extends defined>(this: void, object: T, deconstructor: () => void): symbol;

	/**
	 * Forget previously tracked object; note, this needs to be passed
	 * the token that was returned by {@link track}.
	 *
	 * @param token The token to forget.
	 */
	forget(this: void, token: symbol): void;

	/**
	 * update tracker, calling destructors for dead objects; if `iterations`
	 * is specified, do at most `iterations` iterations to amortize cost.
	 *
	 * @param iterations The amount of iterations to do.
	 */
	update(this: void, iterations?: number): void;
}

declare const GcTracker: new () => GcTracker;

export = GcTracker;
