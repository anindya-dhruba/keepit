ServiceConfiguration.configurations.remove({
    service: 'facebook'
});
 
ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: 'abc',
    secret: 'abc'
});


ServiceConfiguration.configurations.remove({
    service: 'google'
});
 
ServiceConfiguration.configurations.insert({
    service: 'google',
    clientId: 'abc',
    secret: 'abc'
});

ServiceConfiguration.configurations.remove({
    service: 'twitter'
});
 
ServiceConfiguration.configurations.insert({
    service: 'twitter',
    consumerKey: 'abc',
    secret: 'abc'
});
