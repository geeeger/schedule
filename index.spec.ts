import Schedule from './index'
import chai from 'chai'
import spies from 'chai-spies'

chai.use(spies)

const { expect, spy } = chai

describe('test', function () {
  it('addTask', function (done) {
    const schedule = new Schedule(800)
    function task(): void {
      // nothing
    }
    const t = spy(task)
    schedule
      .addTask(t)
      .addTask(t)
      .addTask(t)
      .removeTask(t)
      .addTask((step) => {
        if (step === 2) {
          schedule.destroy()
          expect(t).to.have.been.called.exactly(4)
          done()
        }
      })
      .run()
  })
})
