ServiceConfiguration.configurations.upsert({
  service:"twitter" },
                                           {
  $set: {
    "consumerKey" : "consumerKey",
    "secret" : "secret"
  }
}
                                          );