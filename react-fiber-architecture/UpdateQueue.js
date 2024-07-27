export type UpdateQueue<State> = {
    baseState: State,
    firstBaseUpdate: Update<State> | null,
    lastBaseUpdate: Update<State> | null,
    shared: SharedQueue<State>,
    callbacks: Array<() => mixed> | null,
};
