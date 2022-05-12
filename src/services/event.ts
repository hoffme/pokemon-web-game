type CB<T> = (params: T) => Promise<void> | void

class Subscription<T> {

    public readonly event: Event<T>;
    public readonly callback: CB<T>;
    public readonly order: number;

    constructor(event: Event<T>, callback: CB<T>, order: number) {
        this.event = event;
        this.order = order;
        this.callback = callback;
    }

    public unsubscribe() {
        this.event.unsubscribe(this);
    }

}

interface EventOptions<T> {
    onSubscribe?: (subscription: Subscription<T>) => void
    onUnsubscribe?: (subscription: Subscription<T>) => void
    onNotify?: (value: T, subscriptions: Subscription<T>[]) => void
}

interface EventClient<T> {
    subscribe: (cb: CB<T>, order?: number) => Subscription<T>
    unsubscribe: (s: Subscription<T>) => void
}

class Event<T> {

    private readonly options: EventOptions<T>
    private readonly subscriptions = new Set<Subscription<T>>();

    public readonly client: EventClient<T>;

    constructor(actions: EventOptions<T> = {}) {
        this.options = actions;

        this.client = {
            subscribe: (cb: CB<T>, order?: number): Subscription<T> => this.subscribe(cb, order),
            unsubscribe: (s: Subscription<T>) => this.unsubscribe(s),
        }
    }

    public async notify(value: T): Promise<void> {
        const subscriptions = Array.from(this.subscriptions.values());
        const ordersListeners = subscriptions.sort((a, b) => a.order - b.order);

        await Promise.all(ordersListeners.map(l => l.callback(value)));

        if (this.options?.onNotify) this.options.onNotify(value, subscriptions);
    }

    public notifySync(value: T): void {
        this.notify(value).catch(console.error)
    }

    public subscribe(callback: CB<T>, order: number = 0): Subscription<T> {
        const subscription = new Subscription(this, callback, order);
        this.subscriptions.add(subscription);

        if (this.options?.onSubscribe) this.options.onSubscribe(subscription);

        return subscription;
    }

    public unsubscribe(subscription: Subscription<T>) {
        this.subscriptions.delete(subscription);

        if (this.options?.onUnsubscribe) this.options.onUnsubscribe(subscription);
    }

}

export default Event;
export type {
    CB,
    Subscription,
    EventOptions,
    EventClient
}