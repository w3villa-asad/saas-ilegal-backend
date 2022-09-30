const app = require('./src/app');
// const { port } = require('./src/config');
// const {job} = require('./src/contracts/web3_functions/cron_job')

const port =  process.env.port || 5000 ;
// try {
    
//     job.start()
// } catch (error) {
//     console.log(error)
// }
app.listen(port, () => {
    console.log(`Express is running on port `);
});