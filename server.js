console.log(process.env.SPM_PM2)
const app = require('./app')
app.listen(process.env.PORT || 3000, () => console.log('Server is running on port 3000'))
