class IntType {

    constructor(minVal, maxVal) {
        this.minVal = minVal
        this.maxVal = maxVal

    }
    validate(value) {
        if (typeof (value) !== "number") {
            console.log("Should be IntType")
            return
        }
        if (value < this.minVal || value > this.maxValue) {
            console.log("Should be in range")
            return
        }
        return value
    }
}

class StrType {

    constructor(len) {
        this.len = len
    }

    validate(value) {
        if (typeof (value) !== "string") {
            console.log("Should be String")
            return
        }
        if (value.length == 0 || value.length > this.len) {
            console.log("Should be in range of length")
            return
        }
        return value
    }
}

class SchemaMember {
    constructor(columnName, columnType, allowNull = true) {
        this.columnName = columnName
        this.columnType = columnType
        this.allowNull = allowNull
    }

    validate() {
        if (!typeof (this.columnName) == "string") {
            console.log("Column name should be string")
            return
        }

    }
}

class Table {
    totalSchema = {}
    dataStore = []
    constructor(tableName) {
        this.tableName = tableName
    }
    addSchema(schema) {
        schema.validate(schema.columnName)
        this.totalSchema[schema.columnName] = schema
    }

    insertData(data) {
        for (let dt in data) {
            if (!this.totalSchema.hasOwnProperty(dt)) {
                console.log("Schema is not given")
                return
            }
            if (this.totalSchema.hasOwnProperty(dt)) {
                if (data[dt] == null && !this.totalSchema[dt].allowNull) {
                    console.log(dt + " value shouldn't be null")
                    return
                }
                if (!this.totalSchema[dt].columnType.validate(data[dt])) return false
            }

        }
        this.dataStore.push(data)
    }
    getAllData() {
        return this.dataStore
    }

    filterData(condition) {
        return this.dataStore.filter(dt => dt.user_age < condition)
    }
}


const userTable = new Table("user_table")
userTable.addSchema(new SchemaMember("user_id", new StrType(20), false))
userTable.addSchema(new SchemaMember("user_age", new IntType(-1000, 1000), false))
// console.log(userTable)
userTable.insertData({ "user_id": "user1", "user_age": 12 })
userTable.insertData({ "user_id": "user2", "user_age": 1000 })
console.log(userTable.getAllData())
console.log(userTable.filterData(12))







