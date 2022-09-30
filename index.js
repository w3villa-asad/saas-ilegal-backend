const app = require('./src/app');
// const { port } = require('./src/config');
// const {job} = require('./src/contracts/web3_functions/cron_job')

app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });