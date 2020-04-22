/* eslint-disable @typescript-eslint/no-explicit-any */
type TaskWithStep = (step: number) => any
type TaskWithoutStep = () => any
type Task = TaskWithStep | TaskWithoutStep

class Schedule {
  tasks: Task[] | null = []
  interval = 1000
  step = 0
  destroyed = false
  suspended = true
  private timer: number | null = null
  constructor(interval?: number) {
    if (interval) {
      this.interval = interval
    }
  }

  run(): this {
    if (this.destroyed) {
      return this
    }
    if (this.timer) {
      clearInterval(this.timer)
    }

    this.suspended = false

    this.timer = setInterval(() => {
      if (this.suspended || this.destroyed) {
        return
      }
      this.step++
      if (this.tasks) {
        this.tasks.map((fn) => fn(this.step))
      }
    }, this.interval)
    return this
  }

  suspend(): this {
    this.suspended = true
    this.timer && clearInterval(this.timer)
    this.timer = null
    return this
  }

  resume(): this {
    this.run()
    return this
  }

  cleanTask(): this {
    this.tasks = []
    return this
  }

  addTask(task: Task): this {
    this.tasks && this.tasks.push(task)
    return this
  }

  toStep(step: number): this {
    this.step = step
    return this
  }

  removeTask(task: Task): this {
    if (this.tasks) {
      const index = this.tasks.findIndex((item) => item === task)
      this.tasks.splice(index, 1)
    }
    return this
  }

  destroy(): void {
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.destroyed = true
    this.tasks = null
  }
}

export default Schedule
