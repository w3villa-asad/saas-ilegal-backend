const app = require('./src/app');
// const { port } = require('./src/config');
// const {job} = require('./src/contracts/web3_functions/cron_job')

// try {
    
//     job.start()
// } catch (error) {
//     console.log(error)
// }
const server = app.listen(5000, () => {
    console.log(`Express is running on port ${server.address().port}`);
});