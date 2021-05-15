let config = {
    db_name: "UsersDB",
    db_user: "admin",
    password: "Luis1234",
    getUrl() {
        return `mongodb+srv://${this.db_user}:${this.password}@cluster0.bus1b.mongodb.net/${this.db_name}?retryWrites=true&w=majority`
    } 
}
 
module.exports = config;