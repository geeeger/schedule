declare type TaskWithStep = (step: number) => any;
declare type TaskWithoutStep = () => any;
declare type Task = TaskWithStep | TaskWithoutStep;
declare class Schedule {
    tasks: Task[] | null;
    interval: number;
    step: number;
    destroyed: boolean;
    suspended: boolean;
    private timer;
    constructor(interval?: number);
    run(): this;
    suspend(): this;
    resume(): this;
    cleanTask(): this;
    addTask(task: Task): this;
    toStep(step: number): this;
    removeTask(task: Task): this;
    destroy(): void;
}
export default Schedule;
