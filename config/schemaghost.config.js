// User mock config overrides example

module.exports = {
  User: {
    email: (faker) => faker.internet.email(),
    posts: { count: 3 }
  }
}
