import kue from "kue";
import config from "../config";

import journalModel from "../models/journal"

const REDIS_ADDR = config.redisUrl;

let queue = kue.createQueue({
    redis: `redis://${REDIS_ADDR}`
});

queue.watchStuckJobs(1000 * 10);

queue.on('ready', () => {
    console.info('Queue is ready!');
});

queue.on('error', (err) => {
    console.error('There was an error in the main queue!');
    console.error(err);
    console.error(err.stack);
});


queue.process('test', function(job, done){
    return testTask(job.data, done);
});

async function testTask(data, done) {
    queue.create('task', data)
        .priority('critical')
        .attempts(8)
        .backoff(true)
        .removeOnComplete(false)
        .save(err => {
            if (err) {
                console.error(err);
                done(err);
            }
            if (!err) {
                done();
            }
        });
}

queue.process('task', 20, async function (data, done) {
    // TODO some operations in providers
    await journalModel.save(data);
    done();
});



kue.app.listen(config.kuePort);
kue.app.set('title', 'Kue');

module.exports = {
    create: (data, done) => {
        testTask(data, done);
    }
};
