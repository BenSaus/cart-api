const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const { DataTypes } = require("sequelize")

const db = {
    inst: null,

    connect: (modelPaths, logging = console.log) => {
        const config = {
            dialect: "sqlite",
            storage: "tmp/data.sqlite",
            logging,
        }

        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config
        )
        const dbInst = db._loadModels(sequelize, modelPaths)

        // Add models and sequelize instance methods into one object
        dbInst.sequelize = sequelize

        // Make sequelize sync method more accesible
        dbInst.sync = async () => {
            dbInst.sequelize.sync()
        }

        // Set the singleton instance
        db.inst = dbInst

        return dbInst
    },

    _loadModels: (sequelize, modelPaths) => {
        const db = {}

        for (let modelPath of modelPaths) {
            // TOOD: Remove or use logger
            // console.log(modelPath)

            fs.readdirSync(path.join(__dirname, modelPath))
                .filter((file) => {
                    // TOOD: Remove or use logger
                    // console.log("filtering file:", file)
                    return file.indexOf(".") !== 0 && file.slice(-3) === ".js"
                })
                .forEach((file) => {
                    // TOOD: Remove or use logger
                    // console.log("loading model:", file)
                    const model = require(path.join(
                        path.join(__dirname, modelPath),
                        file
                    ))(sequelize, DataTypes)
                    db[model.name] = model
                })

            Object.keys(db).forEach((modelName) => {
                if (db[modelName].associate) {
                    db[modelName].associate(db)
                }
            })
        }

        return db
    },
}

module.exports = db
