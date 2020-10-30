function extendSession(user:string) {
  var cache = CacheService.getUserCache();
  const time = 30*60; //cache stores time in seconds, so this is 30min
  var value = cache.get(user);
  cache.put(user, value, time);
}

/*I don't know if this is necessary, but this is to delete sessions:
function deleteSession(user){
  var value = cache.get(user);
  cache.put(user, value, 0);
}
*/
