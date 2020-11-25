const app = require("../app")

const port = process.env.PORT || 4000
// TODO: Use logger here instead
app.listen(port, () => console.log(`Listening on port ${port}!`))
